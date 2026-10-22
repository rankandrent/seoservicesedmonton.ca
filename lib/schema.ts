// JSON-LD for every page: one connected @graph (business, website, page, breadcrumbs, service, post, FAQ, people).
// Entities (about, mentions, areaServed, serviceType) come from the semantic plan via lib/plan.ts.
// People appear only when they exist in content/people.ts: no placeholder or invented authors in schema.
import type { Page, Person } from '@/content/types';
import { PEOPLE, PERSON_BY_SLUG } from '@/content/people';
import { SITE } from '@/content/site';
import { planFor, SITE_AREA, type Entity } from '@/lib/plan';
import { strip, urlOf } from '@/lib/render';

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

function business() {
  const socials = SITE.socials as unknown as [string, string, string][];
  return {
    '@type': 'ProfessionalService', '@id': BUSINESS, name: SITE.brand, url: SITE.domain + '/',
    logo: SITE.domain + '/assets/img/logo.svg', image: OG_IMAGE, description: SITE.org_description,
    telephone: SITE.schema_phone, email: SITE.schema_email,
    address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: 'Edmonton', addressRegion: 'AB', postalCode: SITE.postal, addressCountry: 'CA' },
    areaServed: SITE_AREA.map(entity),
    knowsAbout: ['Search engine optimization', 'Local search engine optimisation', 'Google Business Profile', 'Technical SEO', 'Link building'],
    ...(PEOPLE.length ? { employee: PEOPLE.map((p) => ({ '@id': personId(p) })) } : {}),
    ...(socials.length ? { sameAs: socials.map(([, , u]) => u) } : {}),
  };
}

export function schemaFor(p: Page, person?: Person): string {
  const url = urlOf(p.slug);
  const plan = planFor(p.slug);
  const graph: Record<string, unknown>[] = [
    business(),
    { '@type': 'WebSite', '@id': WEBSITE, url: SITE.domain + '/', name: SITE.brand, publisher: { '@id': BUSINESS }, inLanguage: 'en-CA' },
  ];
  const webpage: Record<string, unknown> = {
    '@type': p.page_type ?? 'WebPage', '@id': url + '#webpage', url, name: strip(p.title), description: strip(p.description),
    isPartOf: { '@id': WEBSITE }, inLanguage: 'en-CA',
  };
  if (plan?.about?.length) webpage.about = plan.about.map(entity);
  if (plan?.mentions?.length) webpage.mentions = plan.mentions.map(entity);
  if (p.updated) webpage.dateModified = p.updated;
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
      provider: { '@id': BUSINESS }, areaServed: area, url, description: p.description,
      ...(p.audience ? { audience: { '@type': 'BusinessAudience', audienceType: p.audience } } : {}),
      ...(p.offer_price !== undefined ? { offers: { '@type': 'Offer', price: p.offer_price, priceCurrency: 'CAD' } } : {}),
    });
  }
  if (p.article) {
    webpage.mainEntity = { '@id': url + '#article' };
    graph.push({
      '@type': 'BlogPosting', '@id': url + '#article', headline: strip(p.nav_label), description: p.description, url, mainEntityOfPage: { '@id': url + '#webpage' },
      datePublished: p.article, dateModified: p.updated ?? p.article,
      author: author ? { '@id': personId(author) } : { '@type': 'Organization', name: SITE.brand },
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
    .map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } }));
  if (questions.length) {
    // A page typed FAQPage carries the questions itself; anything else gets one separate FAQPage node.
    if (webpage['@type'] === 'FAQPage') webpage.mainEntity = questions;
    else graph.push({ '@type': 'FAQPage', '@id': url + '#faq', isPartOf: { '@id': url + '#webpage' }, mainEntity: questions });
  }
  // Escape "<" so content can never close the script tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1).replace(/</g, '\\u003c');
}
