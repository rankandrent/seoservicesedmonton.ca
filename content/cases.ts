// Case studies hub + templates. Every client fact is a [[placeholder]]; drafts stay unlinked until real.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page } from './types';

export const PAGES: Page[] = [
 {
  "slug": "case-studies",
  "nav_label": "Case Studies",
  "icon": "chart",
  "page_type": "CollectionPage",
  "title": "SEO Case Studies | Edmonton Results | BrandName",
  "description": "SEO case studies from Edmonton businesses. See the starting point, what we changed and the measured results for each client.",
  "keyword": "edmonton seo case studies",
  "card": "Real projects and measured results.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case studies",
    "h1": "SEO Results for Edmonton Businesses",
    "lead": "Every case study shows where the client started, what we changed and what the data showed afterwards."
   },
   {
    "type": "posts",
    "eyebrow": "Our work",
    "heading": "Featured case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "stats",
    "eyebrow": "Across all clients",
    "heading": "Combined results",
    "items": [
     [
      "[[00]]+",
      "Clients served"
     ],
     [
      "[[00]]",
      "Industries"
     ],
     [
      "[[00]]+",
      "Keywords on page one"
     ],
     [
      "[[00]]%",
      "Average traffic growth"
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "How we measure",
    "heading": "Results you can check yourself",
    "visual": "cards",
    "bg": "soft",
    "vdata": {
     "items": [
      [
       "search",
       "Search Console",
       "Clicks and impressions"
      ],
      [
       "chart",
       "Google Analytics",
       "Traffic and conversions"
      ],
      [
       "store",
       "Business Profile",
       "Calls and directions"
      ]
     ]
    },
    "body": [
     "Every number in our case studies comes from the client's own Search Console, Google Analytics or Business Profile data, with the date range stated.",
     "We share case studies only with client permission."
    ]
   },
   {
    "type": "cta",
    "heading": "Could your business be our next case study?",
    "text": "Book a free review and let's find out."
   }
  ]
 },
 {
  "illus": "map",
  "slug": "case-studies/local-service-business",
  "nav_label": "[[Local service business]]",
  "tag": "Local service",
  "icon": "pin",
  "card": "[[Short summary of the result for a local service business.]]",
  "page_type": "Article",
  "kpis": [
   "[[+00%]] traffic",
   "[[+00%]] leads"
  ],
  "crumbs": [
   [
    "Case Studies",
    "case-studies"
   ]
  ],
  "keyword": "",
  "title": "[[Local service business]] Case Study | Edmonton SEO | BrandName",
  "noindex": true,
  "draft": true,
  "description": "How BrandName helped an Edmonton local service grow through SEO. [Replace with the real result before publishing.]",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case study · Local service",
    "h1": "[[Client name]]: [[Headline result, for example more calls from Google Maps]]",
    "lead": "[[One sentence on who the client is and what changed after working with us.]]"
   },
   {
    "type": "meta",
    "items": [
     [
      "Client",
      "[[Client name]]"
     ],
     [
      "Industry",
      "[[Industry]]"
     ],
     [
      "Location",
      "[[Neighbourhood]], Edmonton"
     ],
     [
      "Services",
      "Local SEO, Google Business Profile"
     ]
    ]
   },
   {
    "type": "stats",
    "eyebrow": "Results",
    "heading": "The results at a glance",
    "items": [
     [
      "[[+00%]]",
      "[[Organic traffic change]]"
     ],
     [
      "[[+00%]]",
      "[[Calls or leads change]]"
     ],
     [
      "[[00]]",
      "[[Keywords on page one]]"
     ],
     [
      "[[00]] months",
      "[[Time period measured]]"
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "The challenge",
    "heading": "Where [[Client name]] started",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "search",
       "Visibility",
       "[[Starting point]]"
      ],
      [
       "pin",
       "Local presence",
       "[[Starting point]]"
      ],
      [
       "chart",
       "Leads",
       "[[Starting point]]"
      ]
     ]
    },
    "body": [
     "[[Describe the business, its goals and the problem it faced in search.]]",
     "[[Include the baseline numbers you measured before work began, with the date.]]"
    ]
   },
   {
    "type": "steps",
    "eyebrow": "Our approach",
    "heading": "What we did",
    "bg": "soft",
    "items": [
     [
      "[[Phase 1]]",
      "[[What was audited or fixed first.]]"
     ],
     [
      "[[Phase 2]]",
      "[[Content, profile or technical work.]]"
     ],
     [
      "[[Phase 3]]",
      "[[Links, reviews or growth work.]]"
     ],
     [
      "[[Phase 4]]",
      "[[Ongoing optimization and reporting.]]"
     ]
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Work delivered",
    "heading": "Key changes we made",
    "bg": "",
    "items": [
     [
      "[[Change 1]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 2]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 3]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 4]]",
      "[[Why it mattered]]"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Before and after",
    "heading": "Measured results",
    "bg": "soft",
    "cols": [
     "Metric",
     "Before",
     "After",
     "Source"
    ],
    "rows": [
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Search Console, GA4 or Business Profile]]"
     ],
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Source]]"
     ],
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Source]]"
     ]
    ]
   },
   {
    "type": "quote",
    "text": "[[A real quote from the client, used with their written permission.]]",
    "cite": "[[Name, title, company]]"
   },
   {
    "type": "posts",
    "eyebrow": "More work",
    "heading": "Other case studies",
    "items": [
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "cta",
    "heading": "Want results like these?",
    "text": "Book a free review and we will show you where your growth could come from."
   }
  ]
 },
 {
  "illus": "cart",
  "slug": "case-studies/ecommerce-store",
  "nav_label": "[[Edmonton online store]]",
  "tag": "Ecommerce",
  "icon": "cart",
  "card": "[[Short summary of the result for an online store.]]",
  "page_type": "Article",
  "kpis": [
   "[[+00%]] traffic",
   "[[+00%]] leads"
  ],
  "crumbs": [
   [
    "Case Studies",
    "case-studies"
   ]
  ],
  "keyword": "",
  "title": "[[Edmonton online store]] Case Study | Edmonton SEO | BrandName",
  "noindex": true,
  "draft": true,
  "description": "How BrandName helped an Edmonton ecommerce grow through SEO. [Replace with the real result before publishing.]",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case study · Ecommerce",
    "h1": "[[Client name]]: [[Headline result, for example more calls from Google Maps]]",
    "lead": "[[One sentence on who the client is and what changed after working with us.]]"
   },
   {
    "type": "meta",
    "items": [
     [
      "Client",
      "[[Client name]]"
     ],
     [
      "Industry",
      "[[Industry]]"
     ],
     [
      "Location",
      "[[Neighbourhood]], Edmonton"
     ],
     [
      "Services",
      "Ecommerce SEO, Technical SEO"
     ]
    ]
   },
   {
    "type": "stats",
    "eyebrow": "Results",
    "heading": "The results at a glance",
    "items": [
     [
      "[[+00%]]",
      "[[Organic traffic change]]"
     ],
     [
      "[[+00%]]",
      "[[Calls or leads change]]"
     ],
     [
      "[[00]]",
      "[[Keywords on page one]]"
     ],
     [
      "[[00]] months",
      "[[Time period measured]]"
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "The challenge",
    "heading": "Where [[Client name]] started",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "search",
       "Visibility",
       "[[Starting point]]"
      ],
      [
       "pin",
       "Local presence",
       "[[Starting point]]"
      ],
      [
       "chart",
       "Leads",
       "[[Starting point]]"
      ]
     ]
    },
    "body": [
     "[[Describe the business, its goals and the problem it faced in search.]]",
     "[[Include the baseline numbers you measured before work began, with the date.]]"
    ]
   },
   {
    "type": "steps",
    "eyebrow": "Our approach",
    "heading": "What we did",
    "bg": "soft",
    "items": [
     [
      "[[Phase 1]]",
      "[[What was audited or fixed first.]]"
     ],
     [
      "[[Phase 2]]",
      "[[Content, profile or technical work.]]"
     ],
     [
      "[[Phase 3]]",
      "[[Links, reviews or growth work.]]"
     ],
     [
      "[[Phase 4]]",
      "[[Ongoing optimization and reporting.]]"
     ]
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Work delivered",
    "heading": "Key changes we made",
    "bg": "",
    "items": [
     [
      "[[Change 1]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 2]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 3]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 4]]",
      "[[Why it mattered]]"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Before and after",
    "heading": "Measured results",
    "bg": "soft",
    "cols": [
     "Metric",
     "Before",
     "After",
     "Source"
    ],
    "rows": [
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Search Console, GA4 or Business Profile]]"
     ],
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Source]]"
     ],
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Source]]"
     ]
    ]
   },
   {
    "type": "quote",
    "text": "[[A real quote from the client, used with their written permission.]]",
    "cite": "[[Name, title, company]]"
   },
   {
    "type": "posts",
    "eyebrow": "More work",
    "heading": "Other case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "cta",
    "heading": "Want results like these?",
    "text": "Book a free review and we will show you where your growth could come from."
   }
  ]
 },
 {
  "illus": "doc",
  "slug": "case-studies/professional-firm",
  "nav_label": "[[Professional services firm]]",
  "tag": "Professional services",
  "icon": "book",
  "card": "[[Short summary of the result for a professional firm.]]",
  "page_type": "Article",
  "kpis": [
   "[[+00%]] traffic",
   "[[+00%]] leads"
  ],
  "crumbs": [
   [
    "Case Studies",
    "case-studies"
   ]
  ],
  "keyword": "",
  "title": "[[Professional services firm]] Case Study | Edmonton SEO | BrandName",
  "noindex": true,
  "draft": true,
  "description": "How BrandName helped an Edmonton professional services grow through SEO. [Replace with the real result before publishing.]",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case study · Professional services",
    "h1": "[[Client name]]: [[Headline result, for example more calls from Google Maps]]",
    "lead": "[[One sentence on who the client is and what changed after working with us.]]"
   },
   {
    "type": "meta",
    "items": [
     [
      "Client",
      "[[Client name]]"
     ],
     [
      "Industry",
      "[[Industry]]"
     ],
     [
      "Location",
      "[[Neighbourhood]], Edmonton"
     ],
     [
      "Services",
      "Content SEO, Link Building"
     ]
    ]
   },
   {
    "type": "stats",
    "eyebrow": "Results",
    "heading": "The results at a glance",
    "items": [
     [
      "[[+00%]]",
      "[[Organic traffic change]]"
     ],
     [
      "[[+00%]]",
      "[[Calls or leads change]]"
     ],
     [
      "[[00]]",
      "[[Keywords on page one]]"
     ],
     [
      "[[00]] months",
      "[[Time period measured]]"
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "The challenge",
    "heading": "Where [[Client name]] started",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "search",
       "Visibility",
       "[[Starting point]]"
      ],
      [
       "pin",
       "Local presence",
       "[[Starting point]]"
      ],
      [
       "chart",
       "Leads",
       "[[Starting point]]"
      ]
     ]
    },
    "body": [
     "[[Describe the business, its goals and the problem it faced in search.]]",
     "[[Include the baseline numbers you measured before work began, with the date.]]"
    ]
   },
   {
    "type": "steps",
    "eyebrow": "Our approach",
    "heading": "What we did",
    "bg": "soft",
    "items": [
     [
      "[[Phase 1]]",
      "[[What was audited or fixed first.]]"
     ],
     [
      "[[Phase 2]]",
      "[[Content, profile or technical work.]]"
     ],
     [
      "[[Phase 3]]",
      "[[Links, reviews or growth work.]]"
     ],
     [
      "[[Phase 4]]",
      "[[Ongoing optimization and reporting.]]"
     ]
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Work delivered",
    "heading": "Key changes we made",
    "bg": "",
    "items": [
     [
      "[[Change 1]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 2]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 3]]",
      "[[Why it mattered]]"
     ],
     [
      "[[Change 4]]",
      "[[Why it mattered]]"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Before and after",
    "heading": "Measured results",
    "bg": "soft",
    "cols": [
     "Metric",
     "Before",
     "After",
     "Source"
    ],
    "rows": [
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Search Console, GA4 or Business Profile]]"
     ],
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Source]]"
     ],
     [
      "[[Metric]]",
      "[[Value]]",
      "[[Value]]",
      "[[Source]]"
     ]
    ]
   },
   {
    "type": "quote",
    "text": "[[A real quote from the client, used with their written permission.]]",
    "cite": "[[Name, title, company]]"
   },
   {
    "type": "posts",
    "eyebrow": "More work",
    "heading": "Other case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store"
    ]
   },
   {
    "type": "cta",
    "heading": "Want results like these?",
    "text": "Book a free review and we will show you where your growth could come from."
   }
  ]
 }
];
