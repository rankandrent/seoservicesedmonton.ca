// Team members. Each person gets an author page at /team/<slug>/ with ProfilePage + Person schema
// (worksFor, knowsAbout, sameAs, hasCredential), and pages can name them as `author` or `reviewer`.
//
// E-E-A-T rule (plan/README.md): add only real people who have approved their bio. No stock photos,
// invented titles or credentials. Until then this list stays empty and bylines show [[placeholders]].
//
// Example:
// {
//   slug: 'jane-doe', name: 'Jane Doe', job_title: 'Founder and Lead SEO Strategist',
//   bio: ['Jane has worked on local SEO for Edmonton trades since 2015...'],
//   knows_about: ['Local SEO', 'Google Business Profile', 'Technical SEO'],
//   photo: 'jane-doe.jpg', same_as: ['https://www.linkedin.com/in/jane-doe/'],
//   credentials: [{ name: 'Google Analytics Certification', url: 'https://skillshop.credential.net/...' }],
// },
import type { Page, Person } from './types';

export const PEOPLE: Person[] = [];

export const PERSON_BY_SLUG: Record<string, Person> = Object.fromEntries(PEOPLE.map((p) => [p.slug, p]));

/** Author page for one person. Articles they wrote are listed by content/index.ts. */
export function personPage(p: Person, articles: string[]): Page {
  return {
    slug: 'team/' + p.slug, nav_label: p.name, icon: 'user', page_type: 'ProfilePage', crumbs: [['Team', 'team']],
    title: `${p.name} | ${p.job_title}`, card: p.job_title,
    description: `${p.name} is ${p.job_title} at our Edmonton SEO agency, working on ${p.knows_about.slice(0, 3).join(', ')}. Background, credentials and articles.`,
    sections: [
      { type: 'page_hero', eyebrow: 'Our team', h1: `${p.name}, ${p.job_title}`, lead: p.bio[0] ?? '' },
      { type: 'prose', blocks: [['h2', 'Background'], ...p.bio.slice(1).map((b) => ['p', b])] },
      { type: 'checklist', eyebrow: 'Expertise', heading: 'Areas of expertise', bg: '', items: p.knows_about },
      ...(p.credentials?.length
        ? [{ type: 'prose', blocks: [['h2', 'Credentials'], ['ul', p.credentials.map((c) => (c.url ? `${c.name} ({{verify|${c.url}}})` : c.name))]] }]
        : []),
      ...(articles.length ? [{ type: 'posts', eyebrow: 'Writing', heading: `Articles by ${p.name}`, bg: 'soft', items: articles }] : []),
      { type: 'links', eyebrow: 'More', heading: 'Get to know us', items: ['team', 'how-we-work', 'contact'] },
    ],
  };
}
