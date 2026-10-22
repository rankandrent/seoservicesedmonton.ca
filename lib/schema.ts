// JSON-LD for every page: one connected @graph (business, website, page, breadcrumbs, service, post, FAQ).
import type { Page } from '@/content/types';
import { SITE } from '@/content/site';
import { strip, urlOf } from '@/lib/render';

const BUSINESS = SITE.domain + '/#business';
const WEBSITE = SITE.domain + '/#website';
const OG_IMAGE = SITE.domain + '/assets/img/og-default.png';

function business() {
  const socials = SITE.socials as unknown as [string, string, string][];
  return {
    '@type': 'ProfessionalService', '@id': BUSINESS, name: SITE.brand, url: SITE.domain + '/',
    logo: SITE.domain + '/assets/img/logo.svg', image: OG_IMAGE, description: SITE.org_description,
    telephone: SITE.schema_phone, email: SITE.schema_email,
    address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: 'Edmonton', addressRegion: 'AB', postalCode: SITE.postal, addressCountry: 'CA' },
    areaServed: { '@type': 'City', name: 'Edmonton', sameAs: 'https://en.wikipedia.org/wiki/Edmonton' },
    ...(socials.length ? { sameAs: socials.map(([, , u]) => u) } : {}),
  };
}

export function schemaFor(p: Page): string {
  const url = urlOf(p.slug);
  const graph: Record<string, unknown>[] = [
    business(),
    { '@type': 'WebSite', '@id': WEBSITE, url: SITE.domain + '/', name: SITE.brand, publisher: { '@id': BUSINESS }, inLanguage: 'en-CA' },
  ];
  const webpage: Record<string, unknown> = {
    '@type': p.page_type ?? 'WebPage', '@id': url + '#webpage', url, name: p.title, description: p.description,
    isPartOf: { '@id': WEBSITE }, inLanguage: 'en-CA',
  };
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
    graph.push({
      '@type': 'Service', '@id': url + '#service', name: p.service, serviceType: p.service, provider: { '@id': BUSINESS },
      areaServed: { '@type': 'Place', name: p.area ?? 'Edmonton, AB' }, url, description: p.description,
    });
  }
  if (p.article) {
    webpage.mainEntity = { '@id': url + '#article' };
    graph.push({
      '@type': 'BlogPosting', '@id': url + '#article', headline: strip(p.nav_label), description: p.description, url, mainEntityOfPage: { '@id': url + '#webpage' },
      datePublished: p.article, dateModified: p.article, author: { '@type': 'Organization', name: SITE.brand }, publisher: { '@id': BUSINESS }, image: OG_IMAGE,
    });
  }
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
