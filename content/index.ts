import type { Page } from './types';
import { PAGES as CORE } from './core';
import { PAGES as SERVICES } from './services';
import { PAGES as INDUSTRIES } from './industries';
import { PAGES as CASES } from './cases';
import { PAGES as BLOG } from './blog';
import { PEOPLE, personPage } from './people';

// The case studies hub stays a hidden draft until at least one case study is published
// (remove its 'noindex' and 'draft' flags once the placeholders hold real client data).
const casesHubDraft = CASES.slice(1).every((p) => p.draft);
CASES[0] = { ...CASES[0], noindex: casesHubDraft, draft: casesHubDraft };

// One author page per real team member, listing the posts they wrote.
const TEAM = PEOPLE.map((person) => personPage(person, BLOG.filter((p) => p.author === person.slug).map((p) => p.slug)));

export const GROUPS: [string, Page[]][] = [
  ['Main pages', [...CORE, ...TEAM]],
  ['SEO services', SERVICES],
  ['Industries', INDUSTRIES],
  ['Case studies', CASES],
  ['Blog', BLOG],
];

export const PAGES: Page[] = GROUPS.flatMap(([, pages]) => pages);
export const BY_SLUG: Record<string, Page> = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
// Drafts: pages waiting on real content (case studies). They are built but never linked from live pages.
export const DRAFTS = new Set(PAGES.filter((p) => p.draft).map((p) => p.slug));

export const SERVICE_PAGES = SERVICES.filter((p) => p.slug !== 'services');
export const INDUSTRY_PAGES = INDUSTRIES.filter((p) => p.slug !== 'industries');
// Area pages (/areas/<town>/) arrive in Phase 2; menus and footers pick them up automatically.
export const AREA_PAGES = PAGES.filter((p) => p.slug.startsWith('areas/'));

// Menu groups for the Industries dropdown (plan: Trades, Legal, Professional and health).
export const INDUSTRY_GROUPS: [string, string[]][] = [
  ['Trades', ['plumbers', 'electricians', 'hvac', 'contractors', 'roofers', 'carpenters', 'painters', 'landscapers', 'concrete-contractors', 'garage-door-companies', 'locksmiths', 'pest-control', 'cleaning-companies', 'movers', 'appliance-repair']],
  ['Legal', ['law-firms', 'personal-injury-lawyers', 'family-lawyers', 'immigration-lawyers', 'real-estate-lawyers']],
  ['Professional and health', ['dentists', 'accountants', 'realtors', 'chiropractors', 'physiotherapists', 'med-spas']],
].map(([label, slugs]) => [label as string, (slugs as string[]).map((s) => 'industries/' + s)]);

const seen = new Set<string>();
for (const p of PAGES) {
  if (seen.has(p.slug)) throw new Error('duplicate slug ' + p.slug);
  seen.add(p.slug);
}
