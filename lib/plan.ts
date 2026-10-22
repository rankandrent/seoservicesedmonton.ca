// Reads the semantic SEO plan (plan/content-plan.json) so schema and bylines use the same entities,
// service areas and E-E-A-T sources the plan defines. Regenerate the plan with plan/scripts/*.py.
import plan from '@/plan/content-plan.json';

export type Entity = { name: string; type: string; sameAs?: string[] };
export type Source = { title: string; url: string };
export type PlanPage = {
  url: string;
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
