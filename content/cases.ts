// Case studies hub + templates. Every client fact is a [[placeholder]]; drafts stay unlinked until real.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page } from './types';

export const PAGES: Page[] = [
 {
  "slug": "case-studies",
  "nav_label": "Case Studies",
  "icon": "chart",
  "page_type": "CollectionPage",
  "title": "SEO Case Studies | Edmonton Results",
  "description": "SEO case studies from Edmonton businesses. See the starting point, what we changed and the measured results for each client.",
  "keyword": "seo case studies",
  "card": "Real projects and measured results.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case studies",
    "h1": "SEO Case Studies and Results",
    "lead": "Our SEO case studies will show where each client in Edmonton, Alberta started, what our {{Edmonton SEO services|}} changed and what the data showed afterwards. Each one is published only with the client's written permission."
   },
   {
    "type": "posts",
    "eyebrow": "Our work",
    "heading": "Featured case studies",
    "intro": "**Each search engine optimization (SEO) case study names the industry, the starting point with a date, the work done and the measured results.**",
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
    "intro": "**These combined SEO results will be totals across all clients, taken from their own Search Console, Google Analytics and Business Profile data.**",
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
    "text": "Get a free SEO audit and we will show you where your growth could come from.",
    "button": [
     "Get a free SEO audit",
     "free-seo-audit"
    ]
   }
  ]
 },
 {
  "illus": "map",
  "slug": "case-studies/local-service-business",
  "nav_label": "Local Service Business Case Study",
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
  "title": "Local Service SEO Case Study | Edmonton Results",
  "noindex": true,
  "draft": true,
  "description": "Draft SEO case study for an Edmonton local service business. The starting point, work done and measured results are added once the client approves.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case study · Local service",
    "h1": "SEO Case Study, [[Client name]] and [[Headline result]]",
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
    "intro": "**The results at a glance are the headline numbers for this SEO case study, each with its source and date range.**",
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
    "intro": "**The search engine optimization (SEO) work for this client followed our four steps, audit, plan, build and report.**",
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
    "intro": "**These are the changes that moved the numbers, each with the reason it mattered.**",
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
    "intro": "**This table compares each metric before and after the work, with the tool the number came from.**",
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
    "intro": "**Other SEO case studies show the same method in different industries.**",
    "items": [
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "cta",
    "heading": "Want results like these?",
    "text": "Get a free SEO audit and we will show you where your growth could come from.",
    "button": [
     "Get a free SEO audit",
     "free-seo-audit"
    ]
   }
  ]
 },
 {
  "illus": "cart",
  "slug": "case-studies/ecommerce-store",
  "nav_label": "Ecommerce Store Case Study",
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
  "title": "Ecommerce SEO Case Study | Edmonton Results",
  "noindex": true,
  "draft": true,
  "description": "Draft SEO case study for an Edmonton online store. The starting point, work done and measured results are added once the client approves.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case study · Ecommerce",
    "h1": "SEO Case Study, [[Client name]] and [[Headline result]]",
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
    "intro": "**The results at a glance are the headline numbers for this SEO case study, each with its source and date range.**",
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
    "intro": "**The search engine optimization (SEO) work for this client followed our four steps, audit, plan, build and report.**",
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
    "intro": "**These are the changes that moved the numbers, each with the reason it mattered.**",
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
    "intro": "**This table compares each metric before and after the work, with the tool the number came from.**",
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
    "intro": "**Other SEO case studies show the same method in different industries.**",
    "items": [
     "case-studies/local-service-business",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "cta",
    "heading": "Want results like these?",
    "text": "Get a free SEO audit and we will show you where your growth could come from.",
    "button": [
     "Get a free SEO audit",
     "free-seo-audit"
    ]
   }
  ]
 },
 {
  "illus": "doc",
  "slug": "case-studies/professional-firm",
  "nav_label": "Professional Firm Case Study",
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
  "title": "Professional Firm SEO Case Study | Edmonton Results",
  "noindex": true,
  "draft": true,
  "description": "Draft SEO case study for an Edmonton professional services firm. The starting point, work done and measured results are added once the client approves.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Case study · Professional services",
    "h1": "SEO Case Study, [[Client name]] and [[Headline result]]",
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
    "intro": "**The results at a glance are the headline numbers for this SEO case study, each with its source and date range.**",
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
    "intro": "**The search engine optimization (SEO) work for this client followed our four steps, audit, plan, build and report.**",
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
    "intro": "**These are the changes that moved the numbers, each with the reason it mattered.**",
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
    "intro": "**This table compares each metric before and after the work, with the tool the number came from.**",
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
    "intro": "**Other SEO case studies show the same method in different industries.**",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store"
    ]
   },
   {
    "type": "cta",
    "heading": "Want results like these?",
    "text": "Get a free SEO audit and we will show you where your growth could come from.",
    "button": [
     "Get a free SEO audit",
     "free-seo-audit"
    ]
   }
  ]
 }
];
