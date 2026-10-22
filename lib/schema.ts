// JSON-LD for every page: one connected @graph (business, website, page, breadcrumbs, service, post, FAQ, people).
// Entities (about, mentions, areaServed, serviceType) come from the semantic plan via lib/plan.ts.
// People appear only when they exist in content/people.ts: no placeholder or invented authors in schema.
import type { Page, Person } from '@/content/types';
import { PEOPLE, PERSON_BY_SLUG } from '@/content/people';
import { SITE } from '@/content/site';
import { planFor, SITE_AREA, type Entity } from '@/lib/plan';
import { isPlaceholder, strip, urlOf } from '@/lib/render';

const BUSINESS = SITE.domain + '/#business';
const WEBSITE = SITE.domain + '/#website';
const OG_IMAGE = SITE.domain + '/assets/img/og-default.png';

/** Plan entity -> schema.org node. Entities still named by a [[placeholder]] mean "this business". */
function entity(e: Entity): Record<string, unknown> {
  if (e.name.includes('[[')) return { '@id': BUSINESS };
  return { '@type': e.type, name: e.name, ...(e.sameAs?.length ? { sameAs: e.sameAs.length === 1 ? e.sameAs[0] : e.sameAs } : {}) };
}

const personId = (p: Person) => urlOf('team/' + p.slug) + '#person';

export function personNode(p: Person) {
  return {
    '@type': 'Person', '@id': personId(p), name: p.name, jobTitle: p.job_title, url: urlOf('team/' + p.slug),
    worksFor: { '@id': BUSINESS }, knowsAbout: p.knows_about,
    ...(p.photo ? { image: SITE.domain + '/assets/img/team/' + p.photo } : {}),
    ...(p.same_as?.length ? { sameAs: p.same_as } : {}),
    ...(p.credentials?.length
      ? { hasCredential: p.credentials.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c.name, ...(c.url ? { url: c.url } : {}) })) }
      : {}),
  };
}

/** The value, or undefined while it is still a placeholder (so the field is left out of the JSON-LD). */
const real = <T,>(v: T): T | undefined => (isPlaceholder(v) ? undefined : v);

/** Drops every property and array item that still holds a placeholder, and empty objects left behind. */
function prune(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(prune).filter((x) => x !== undefined);
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) {
      const y = prune(x);
      if (y !== undefined) out[k] = y;
    }
    const keys = Object.keys(out);
    return keys.length === 0 || (keys.length === 1 && keys[0] === '@type') ? undefined : out;
  }
  return isPlaceholder(v) ? undefined : v;
}

function business() {
  const socials = SITE.socials as unknown as [string, string, string][];
  const street = real(SITE.street);
  const postal = real(SITE.postal);
  return {
    '@type': 'ProfessionalService', '@id': BUSINESS, name: real(SITE.brand), url: SITE.domain + '/',
    logo: SITE.domain + '/assets/img/logo.svg', image: OG_IMAGE, description: real(SITE.org_description),
    telephone: real(SITE.schema_phone), email: real(SITE.schema_email),
    // The address is only published once it is real (it must match the Google Business Profile exactly).
    ...(street && postal
      ? { address: { '@type': 'PostalAddress', streetAddress: street, addressLocality: 'Edmonton', addressRegion: 'AB', postalCode: postal, addressCountry: 'CA' } }
      : {}),
    areaServed: SITE_AREA.map(entity),
    knowsAbout: ['Search engine optimization', 'Local search engine optimization', 'Google Business Profile', 'Technical SEO', 'Link building'],
    ...(PEOPLE.length ? { employee: PEOPLE.map((p) => ({ '@id': personId(p) })) } : {}),
    ...(socials.length ? { sameAs: socials.map(([, , u]) => u) } : {}),
  };
}

export function schemaFor(p: Page, person?: Person): string {
  const url = urlOf(p.slug);
  const plan = planFor(p.slug);
  const graph: Record<string, unknown>[] = [
    business(),
    { '@type': 'WebSite', '@id': WEBSITE, url: SITE.domain + '/', name: real(SITE.brand), publisher: { '@id': BUSINESS }, inLanguage: 'en-CA' },
  ];
  const webpage: Record<string, unknown> = {
    // Article is not a WebPage type; a page typed Article without a publish date (case-study drafts) stays a WebPage.
    '@type': p.page_type === 'Article' && !p.article ? 'WebPage' : (p.page_type ?? 'WebPage'), '@id': url + '#webpage', url, name: strip(p.title), description: strip(p.description),
    isPartOf: { '@id': WEBSITE }, inLanguage: 'en-CA',
  };
  if (plan?.about?.length) webpage.about = plan.about.map(entity);
  if (plan?.mentions?.length) webpage.mentions = plan.mentions.map(entity);
  if (p.article) webpage.datePublished = p.article;
  if (p.updated ?? p.article) webpage.dateModified = p.updated ?? p.article;
  const author = p.author ? PERSON_BY_SLUG[p.author] : undefined;
  const reviewer = p.reviewer ? PERSON_BY_SLUG[p.reviewer] : undefined;
  if (author) webpage.author = { '@id': personId(author) };
  if (reviewer) webpage.reviewedBy = { '@id': personId(reviewer) };
  graph.push(webpage);

  if (p.slug) {
    const crumbs: [string, string][] = [['Home', ''], ...(p.crumbs ?? []), [p.nav_label, p.slug]];
    webpage.breadcrumb = { '@id': url + '#breadcrumb' };
    graph.push({
      '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
      itemListElement: crumbs.map(([name, slug], i) => ({ '@type': 'ListItem', position: i + 1, name: strip(name), item: urlOf(slug) })),
    });
  }
  if (p.service) {
    webpage.mainEntity = { '@id': url + '#service' };
    const area = plan?.area_served?.length ? plan.area_served.map(entity) : { '@type': 'Place', name: p.area ?? 'Edmonton, AB' };
    graph.push({
      '@type': 'Service', '@id': url + '#service', name: p.service, serviceType: plan?.service_type ?? p.service,
      provider: { '@id': BUSINESS }, areaServed: area, url, description: strip(p.description),
      ...(p.audience ? { audience: { '@type': 'BusinessAudience', audienceType: p.audience } } : {}),
      ...(p.offer_price !== undefined ? { offers: { '@type': 'Offer', price: p.offer_price, priceCurrency: 'CAD' } } : {}),
    });
  }
  if (p.article) {
    webpage.mainEntity = { '@id': url + '#article' };
    graph.push({
      '@type': 'BlogPosting', '@id': url + '#article', headline: strip(p.nav_label), description: strip(p.description), url, mainEntityOfPage: { '@id': url + '#webpage' },
      datePublished: p.article, dateModified: p.updated ?? p.article,
      // A real person once content/people.ts has one; until then the business itself, never a placeholder name.
      author: author ? { '@id': personId(author) } : { '@id': BUSINESS },
      publisher: { '@id': BUSINESS }, image: OG_IMAGE,
    });
  }
  if (person) {
    webpage.mainEntity = { '@id': personId(person) };
    graph.push(personNode(person));
  } else if (author) graph.push(personNode(author));
  if (reviewer && reviewer !== author) graph.push(personNode(reviewer));

  const questions = p.sections
    .filter((s) => s.type === 'faq')
    .flatMap((s) => s.items as [string, string][])
    // Questions whose answer still holds a placeholder are left out until the real value is filled in.
    .filter(([q, a]) => !isPlaceholder(strip(q)) && !isPlaceholder(strip(a)))
    .map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } }));
  if (questions.length) {
    // A page typed FAQPage carries the questions itself; anything else gets one separate FAQPage node.
    if (webpage['@type'] === 'FAQPage') webpage.mainEntity = questions;
    else graph.push({ '@type': 'FAQPage', '@id': url + '#faq', isPartOf: { '@id': url + '#webpage' }, mainEntity: questions });
  }
  // Placeholders never reach JSON-LD: anything still in [brackets] or named BrandName is dropped.
  const clean = prune(graph);
  // Escape "<" so content can never close the script tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': clean }, null, 1).replace(/</g, '\\u003c');
}
