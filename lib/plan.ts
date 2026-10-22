// Reads the semantic SEO plan (plan/content-plan.json) so schema and bylines use the same entities,
// service areas and E-E-A-T sources the plan defines. Regenerate the plan with plan/scripts/*.py.
import plan from '@/plan/content-plan.json';

export type Entity = { name: string; type: string; sameAs?: string[] };
export type Source = { title: string; url: string };
export type Keyword = { kw: string; volume?: number | null; kd?: number | null };
export type PlanPage = {
  url: string;
  primary?: Keyword;
  secondary?: Keyword[];
  about?: Entity[];
  mentions?: Entity[];
  area_served?: Entity[];
  service_type?: string;
  eeat?: { author?: string; reviewer?: string; sources?: Source[] };
};

const BY_URL = new Map<string, PlanPage>((plan.pages as unknown as PlanPage[]).map((p) => [p.url, p]));

/** Plan entry for a page slug ('' = home), if the plan covers it. */
export function planFor(slug: string): PlanPage | undefined {
  return BY_URL.get(slug ? `/${slug}/` : '/');
}

/** The homepage's service area: Edmonton plus the nearby towns, used for the business node. */
export const SITE_AREA: Entity[] = planFor('')?.area_served ?? [];

/**
 * Meta keywords for a page: the exact primary keyword first (the page's own `keyword`, else the plan's
 * primary), then the plan's secondary keywords. Placeholder keywords are skipped; duplicates are dropped.
 */
export function keywordsFor(slug: string, keyword?: string): string[] {
  const plan = planFor(slug);
  const all = [keyword || plan?.primary?.kw, ...(plan?.secondary ?? []).map((k) => k.kw)];
  const seen = new Set<string>();
  return all.filter((k): k is string => {
    if (!k || k.includes('[')) return false;
    const key = k.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((k) => k.trim());
}
