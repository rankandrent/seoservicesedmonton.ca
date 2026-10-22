import type { Page } from './types';
import { PAGES as CORE } from './core';
import { PAGES as SERVICES } from './services';
import { PAGES as LOCATIONS } from './locations';
import { PAGES as CASES } from './cases';
import { PAGES as BLOG } from './blog';

// The case studies hub stays a hidden draft until at least one case study is published
// (remove its 'noindex' and 'draft' flags once the placeholders hold real client data).
const casesHubDraft = CASES.slice(1).every((p) => p.draft);
CASES[0] = { ...CASES[0], noindex: casesHubDraft, draft: casesHubDraft };

export const GROUPS: [string, Page[]][] = [
  ['Main pages', CORE],
  ['SEO services', SERVICES],
  ['Edmonton locations', LOCATIONS],
  ['Case studies', CASES],
  ['Blog', BLOG],
];

export const PAGES: Page[] = GROUPS.flatMap(([, pages]) => pages);
export const BY_SLUG: Record<string, Page> = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
// Drafts: pages waiting on real content (case studies). They are built but never linked from live pages.
export const DRAFTS = new Set(PAGES.filter((p) => p.draft).map((p) => p.slug));

export const SERVICE_PAGES = SERVICES.filter((p) => p.slug !== 'services');
export const LOCATION_PAGES = LOCATIONS;

const seen = new Set<string>();
for (const p of PAGES) {
  if (seen.has(p.slug)) throw new Error('duplicate slug ' + p.slug);
  seen.add(p.slug);
}
