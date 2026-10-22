// A page is meta + an ordered list of sections. Each section's `type` picks its component in components/sections.tsx.
// Section fields vary by type, so they stay loosely typed; the components read what they need.

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
  area?: string;
  article?: string; // publish date; adds a BlogPosting node
  tag?: string;
  kpis?: string[];
  noindex?: boolean;
  draft?: boolean; // built but never linked from live pages
  sections: Section[];
}
