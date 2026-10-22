// A page is meta + an ordered list of sections. Each section's `type` picks its component in components/sections.tsx.
// Section fields vary by type, so they stay loosely typed; the components read what they need.
// Entity and E-E-A-T data for schema (about, mentions, areaServed, serviceType, sources) comes from
// plan/content-plan.json by URL, see lib/plan.ts.

export type Section = { type: string; [field: string]: any };

export interface Page {
  slug: string; // '' for the homepage, 'services/local-seo' for nested pages
  nav_label: string;
  title: string;
  description: string;
  keyword?: string;
  card?: string;
  long_card?: string;
  icon?: string;
  illus?: string;
  photo?: string;
  page_type?: string; // schema.org WebPage subtype
  crumbs?: [string, string][]; // [label, slug] between Home and this page
  service?: string; // adds a schema.org Service node
  audience?: string; // industry pages: who the service is for (schema audience)
  offer_price?: string; // adds an Offer to the Service node (e.g. '0' for the free audit)
  area?: string;
  article?: string; // publish date; adds a BlogPosting node
  updated?: string; // ISO date the content was last reviewed; shown in the byline and as dateModified
  author?: string; // slug of a person in content/people.ts once real people are added
  reviewer?: string; // slug of a person in content/people.ts
  tag?: string;
  kpis?: string[];
  noindex?: boolean;
  draft?: boolean; // built but never linked from live pages
  sections: Section[];
}

/** A real team member. Only add people who exist and have approved their bio (see plan/README.md, E-E-A-T). */
export interface Person {
  slug: string; // URL: /team/<slug>/
  name: string;
  job_title: string;
  bio: string[]; // paragraphs
  knows_about: string[]; // e.g. ['Local SEO', 'Google Business Profile']
  photo?: string; // file in public/assets/img/team/
  same_as?: string[]; // LinkedIn and other profile URLs
  credentials?: { name: string; url?: string }[]; // real certifications only, with the issuer's verify link
}
