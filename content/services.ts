// Services hub + service pages. No pricing on any service page.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page } from './types';

export const PAGES: Page[] = [
 {
  "slug": "services",
  "nav_label": "SEO Services",
  "icon": "layers",
  "page_type": "CollectionPage",
  "title": "SEO Services in Edmonton | All Services | BrandName",
  "description": "Explore every SEO service we offer Edmonton businesses: local SEO, technical SEO, on-page, content, link building, ecommerce, audits and AI search.",
  "keyword": "edmonton seo services",
  "card": "Every SEO service we offer in one place.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Our services",
    "h1": "SEO Services for Edmonton Businesses",
    "lead": "Nine services that cover every part of how customers find you on Google. Start with one or combine them into a single plan.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "Find what you need",
    "heading": "Choose a service",
    "cols": 3,
    "items": [
     {
      "icon": "pin",
      "title": "Local SEO",
      "text": "Win more map pack and local results across Edmonton.",
      "link": "services/local-seo"
     },
     {
      "icon": "gear",
      "title": "Technical SEO",
      "text": "Crawling, indexing, speed, structure and structured data.",
      "link": "services/technical-seo"
     },
     {
      "icon": "doc",
      "title": "On-Page SEO",
      "text": "Titles, headings, copy and internal links matched to intent.",
      "link": "services/on-page-seo"
     },
     {
      "icon": "pen",
      "title": "Content SEO",
      "text": "Service pages and guides written for Edmonton customers.",
      "link": "services/content-seo"
     },
     {
      "icon": "link",
      "title": "Link Building",
      "text": "Relevant links and local mentions, earned the right way.",
      "link": "services/link-building"
     },
     {
      "icon": "store",
      "title": "Google Business Profile",
      "text": "Profile setup, reviews, photos, posts and updates.",
      "link": "services/google-business-profile"
     },
     {
      "icon": "cart",
      "title": "Ecommerce SEO",
      "text": "Category and product SEO for online stores.",
      "link": "services/ecommerce-seo"
     },
     {
      "icon": "audit",
      "title": "SEO Audit",
      "text": "A full site review with a prioritized fix list.",
      "link": "services/seo-audit"
     },
     {
      "icon": "spark",
      "title": "AI Search Optimization",
      "text": "Readiness for AI Overviews, AI Mode and assistants.",
      "link": "services/ai-search-optimization"
     }
    ]
   },
   {
    "type": "split",
    "eyebrow": "Not sure where to start?",
    "heading": "Start with an audit, then follow the data",
    "bg": "soft",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "audit",
       "Audit",
       "Find what is holding you back"
      ],
      [
       "target",
       "Prioritize",
       "Biggest impact first"
      ],
      [
       "bolt",
       "Execute",
       "Fixes, content, links"
      ],
      [
       "chart",
       "Measure",
       "Monthly reporting"
      ]
     ]
    },
    "body": [
     "Most businesses do not need every service at once. An audit shows which problems cost you the most, so the first months of work go where they will make a difference."
    ],
    "cta": [
     "About the SEO Audit",
     "services/seo-audit"
    ]
   },
   {
    "type": "table",
    "eyebrow": "Match your goal",
    "heading": "Which service fits your goal?",
    "cols": [
     "Your goal",
     "Start with",
     "Add later"
    ],
    "rows": [
     [
      "More calls from Google Maps",
      "Local SEO, Google Business Profile",
      "Link Building"
     ],
     [
      "Pages not showing in Google",
      "Technical SEO",
      "SEO Audit"
     ],
     [
      "Rank for more services",
      "On-Page SEO, Content SEO",
      "Link Building"
     ],
     [
      "More online sales",
      "Ecommerce SEO",
      "Content SEO"
     ],
     [
      "Be cited in AI answers",
      "AI Search Optimization",
      "Content SEO"
     ],
     [
      "Know what is wrong first",
      "SEO Audit",
      "Any of the above"
     ]
    ]
   },
   {
    "type": "steps",
    "eyebrow": "Every engagement",
    "heading": "How every service runs",
    "bg": "soft",
    "items": [
     [
      "Discover",
      "Goals, competitors and current performance."
     ],
     [
      "Plan",
      "A written roadmap with priorities."
     ],
     [
      "Deliver",
      "Work done and logged every month."
     ],
     [
      "Report",
      "Clear numbers and next steps."
     ]
    ]
   },
   {
    "type": "faq",
    "items": [
     [
      "Can I combine services?",
      "Yes. Most clients combine two or three, and our {{packages|pricing}} show common combinations."
     ],
     [
      "Do you work with our developer?",
      "Yes. We can make changes ourselves or write clear tickets for your developer."
     ],
     [
      "Do you serve areas outside Edmonton?",
      "Our focus is Edmonton. See our {{location pages|locations}} for the neighbourhoods we cover."
     ]
    ]
   },
   {
    "type": "cta",
    "heading": "Not sure which service you need?",
    "text": "Book a free review and we will recommend where to start."
   }
  ]
 },
 {
  "slug": "services/local-seo",
  "nav_label": "Local SEO",
  "icon": "pin",
  "illus": "map",
  "long_card": "Local SEO services in Edmonton. We help you rank in Google Maps and local results with Business Profile work, reviews, citations and local pages.",
  "keyword": "local seo edmonton",
  "title": "Local SEO Edmonton | Rank in Google Maps | BrandName",
  "description": "Local SEO services in Edmonton. We help you rank in Google Maps and local results with Business Profile work, reviews, citations and local pages.",
  "card": "Rank in Google Maps and local results across Edmonton.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "Local SEO in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Local SEO",
    "h1": "Local SEO Services in Edmonton",
    "lead": "Show up in Google Maps and local results when people nearby search for what you offer.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Get found by customers near you",
    "visual": "map",
    "vdata": {
     "title": "Your business",
     "sub": "Top result for your service in Edmonton"
    },
    "body": [
     "Local SEO is the work that helps your business appear in the map pack and local results when someone in Edmonton searches for your service.",
     "It combines your Google Business Profile, your website, your reviews and your presence on other local websites into one consistent picture."
    ],
    "bullets": [
     "Built for storefronts and service area businesses",
     "Focused on calls, directions and bookings",
     "Tracked by neighbourhood, not just city wide"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "Everything local search needs",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "store",
      "title": "Business Profile optimization",
      "text": "Categories, services, hours, attributes, photos and description, kept accurate."
     },
     {
      "icon": "star",
      "title": "Review process",
      "text": "A simple way to ask every customer for an honest review and respond to each one."
     },
     {
      "icon": "map",
      "title": "Local citations",
      "text": "Consistent name, address and phone across directories and listings."
     },
     {
      "icon": "doc",
      "title": "Local landing pages",
      "text": "Useful pages for the services and areas you actually serve."
     },
     {
      "icon": "link",
      "title": "Local links",
      "text": "Mentions from Edmonton organizations, events and partners."
     },
     {
      "icon": "chart",
      "title": "Local rank tracking",
      "text": "Map pack positions tracked across neighbourhoods."
     }
    ]
   },
   {
    "type": "statement",
    "text": "Google says local ranking comes down to [em]relevance, distance and prominence[/em]. We work on the two you can change."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How our local SEO works",
    "items": [
     [
      "Local audit",
      "Profile, citations, reviews and local rankings."
     ],
     [
      "Fix the basics",
      "Accurate details everywhere you are listed."
     ],
     [
      "Build prominence",
      "Reviews, local links and useful local pages."
     ],
     [
      "Track and report",
      "Neighbourhood level ranking reports."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "The three factors",
    "heading": "What Google says drives local ranking",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "target",
       "Relevance",
       "How well you match the search"
      ],
      [
       "pin",
       "Distance",
       "How far you are from the searcher"
      ],
      [
       "star",
       "Prominence",
       "Links, reviews and reputation"
      ]
     ]
    },
    "body": [
     "According to Google Business Profile Help, local results are based mainly on relevance, distance and prominence. Google also says there is no way to request or pay for a better local ranking.",
     "Complete profile information supports relevance. Links to your business and your review count feed prominence. Those are the levers we pull."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Business Profile audit and cleanup",
      "Every field checked against Google guidance"
     ],
     [
      "Category and service mapping",
      "Matched to how customers search"
     ],
     [
      "Citation audit and fixes",
      "Name, address and phone made consistent"
     ],
     [
      "Review request templates",
      "Email and SMS ready to send"
     ],
     [
      "Review response guidelines",
      "Tone and examples for your team"
     ],
     [
      "Local page plan",
      "Only pages with real local substance"
     ],
     [
      "LocalBusiness structured data",
      "Added to your website"
     ],
     [
      "Monthly local ranking report",
      "By neighbourhood and keyword"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Fit",
    "heading": "Storefront or service area business?",
    "bg": "soft",
    "cols": [
     "Setup",
     "Typical examples",
     "What changes in our approach"
    ],
    "rows": [
     [
      "Storefront",
      "Clinics, shops, restaurants",
      "Address shown, photos of the location, directions and hours"
     ],
     [
      "Service area",
      "Plumbers, cleaners, contractors",
      "Service area set in your profile, pages for the services you offer"
     ],
     [
      "Hybrid",
      "Businesses with a shop and mobile service",
      "Both setups handled carefully in one profile"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/professional-firm",
     "case-studies/ecommerce-store"
    ]
   },
   {
    "type": "faq",
    "heading": "Local SEO questions",
    "items": [
     [
      "How is local SEO different from regular SEO?",
      "Local SEO focuses on searches with local intent and on the map pack, so your Business Profile, reviews and local mentions matter as much as your website."
     ],
     [
      "Do reviews really help?",
      "Google says more reviews and positive ratings can help your local ranking. We help you ask every customer for honest reviews, with no incentives, in line with Google's contribution policy."
     ],
     [
      "Can I rank in areas where I do not have an office?",
      "Distance is one of Google's factors, so results vary by where the searcher is. Service area businesses can still be relevant across the areas they serve."
     ],
     [
      "Do I need a website for local SEO?",
      "A Business Profile can rank without one, but a strong website gives Google and customers far more to work with."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside Local SEO",
    "items": [
     "services/google-business-profile",
     "services/link-building",
     "services/content-seo"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about Local SEO in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/technical-seo",
  "nav_label": "Technical SEO",
  "icon": "gear",
  "illus": "code",
  "long_card": "Technical SEO in Edmonton: crawling, indexing, site structure, canonicals, structured data and page experience fixes so Google can read every page.",
  "keyword": "technical seo edmonton",
  "title": "Technical SEO Services Edmonton | Crawl, Index, Speed | BrandName",
  "description": "Technical SEO in Edmonton: crawling, indexing, site structure, canonicals, structured data and page experience fixes so Google can read every page.",
  "card": "Fix the foundations so Google can crawl and index every page.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "Technical SEO in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Technical SEO",
    "h1": "Technical SEO Services in Edmonton",
    "lead": "Make sure Google can find, read and understand every important page on your site.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "The foundation everything else sits on",
    "visual": "code",
    "body": [
     "Great content does not help if Google cannot reach it. Technical SEO makes sure your pages can be crawled, rendered and indexed, and that Google picks the right version of each one.",
     "We find the issues, explain them in plain language and fix them directly or with your developer."
    ],
    "bullets": [
     "Crawling and indexing issues found and fixed",
     "Duplicate URLs consolidated with canonicals",
     "Structured data that matches visible content"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "Technical work we handle",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "search",
      "title": "Crawl and index checks",
      "text": "Search Console coverage, robots.txt and blocked resources reviewed."
     },
     {
      "icon": "layers",
      "title": "Site structure",
      "text": "Descriptive URLs, logical directories and clear internal linking."
     },
     {
      "icon": "shield",
      "title": "Canonicals and duplicates",
      "text": "Preferred URLs set with redirects or rel=\"canonical\"."
     },
     {
      "icon": "code",
      "title": "Structured data",
      "text": "Valid schema markup that can make pages eligible for rich results."
     },
     {
      "icon": "speed",
      "title": "Page experience",
      "text": "Speed and usability improvements measured with Google tools."
     },
     {
      "icon": "map",
      "title": "XML sitemaps",
      "text": "Clean sitemaps submitted and monitored in Search Console."
     }
    ]
   },
   {
    "type": "statement",
    "text": "If Google cannot crawl it, it cannot rank it. Technical SEO makes sure [em]every important page is visible[/em]."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How we run technical SEO",
    "items": [
     [
      "Crawl",
      "A full crawl of your site plus Search Console data."
     ],
     [
      "Diagnose",
      "Issues ranked by impact and effort."
     ],
     [
      "Fix",
      "Changes made and logged, or handed to your developer."
     ],
     [
      "Monitor",
      "Ongoing checks so new issues are caught early."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "What Google recommends",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "eye",
       "Do not hide CSS and JavaScript",
       "Let Google render pages"
      ],
      [
       "layers",
       "Descriptive URLs",
       "Words, not random IDs"
      ],
      [
       "shield",
       "One preferred URL",
       "Canonicals and redirects"
      ]
     ]
    },
    "body": [
     "Google's SEO Starter Guide recommends not blocking the CSS and JavaScript your pages need, using descriptive URLs, grouping similar pages in directories and setting a preferred URL for duplicate content.",
     "It also notes duplicate content is not a penalty but is inefficient. We clean it up so Google spends its time on the pages that matter."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Full technical audit",
      "Every issue explained and prioritized"
     ],
     [
      "Search Console setup review",
      "Ownership, sitemaps and reports"
     ],
     [
      "robots.txt review",
      "Nothing important blocked"
     ],
     [
      "Canonical and redirect map",
      "One preferred URL per page"
     ],
     [
      "Structured data implementation",
      "Validated with the Rich Results Test"
     ],
     [
      "Internal linking fixes",
      "Descriptive anchor text throughout"
     ],
     [
      "Page experience report",
      "Speed and usability findings"
     ],
     [
      "Change log",
      "Every fix documented"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Common issues",
    "heading": "Problems we fix often",
    "bg": "soft",
    "cols": [
     "Issue",
     "What it causes",
     "How we fix it"
    ],
    "rows": [
     [
      "Pages blocked in robots.txt",
      "Pages cannot be crawled",
      "Update rules and recheck in Search Console"
     ],
     [
      "Duplicate URLs",
      "Signals split across versions",
      "Redirects or rel=\"canonical\""
     ],
     [
      "Orphan pages",
      "Pages hard for Google to find",
      "Add internal links from relevant pages"
     ],
     [
      "Invalid structured data",
      "Not eligible for rich results",
      "Fix and validate markup"
     ],
     [
      "Content hidden behind scripts",
      "Key text not seen",
      "Render key content as text"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "Technical SEO questions",
    "items": [
     [
      "Do I need technical SEO if my site is new?",
      "Yes. Getting structure, URLs and indexing right from launch avoids expensive fixes later."
     ],
     [
      "Will you need developer access?",
      "Ideally. If not, we write clear, prioritized tickets for your developer."
     ],
     [
      "Does site speed affect rankings?",
      "Google recommends providing a good page experience. We measure speed with Google tools and fix what slows your pages down."
     ],
     [
      "Which platforms do you work with?",
      "WordPress, Shopify, Webflow, Wix and custom builds. [[Confirm your supported platforms.]]"
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside Technical SEO",
    "items": [
     "services/seo-audit",
     "services/on-page-seo",
     "services/ai-search-optimization"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about Technical SEO in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/on-page-seo",
  "nav_label": "On-Page SEO",
  "icon": "doc",
  "illus": "list",
  "long_card": "On-page SEO in Edmonton: page titles, meta descriptions, headings, copy, images and internal links optimized around what your customers search for.",
  "keyword": "on page seo edmonton",
  "title": "On-Page SEO Services Edmonton | Titles, Copy, Links | BrandName",
  "description": "On-page SEO in Edmonton: page titles, meta descriptions, headings, copy, images and internal links optimized around what your customers search for.",
  "card": "Pages shaped around what your customers search for.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "On-Page SEO in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "On-Page SEO",
    "h1": "On-Page SEO Services in Edmonton",
    "lead": "Turn the pages you already have into pages that match search intent and rank.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Make every page clear to people and Google",
    "visual": "serp",
    "vdata": {
     "query": "emergency plumber edmonton",
     "rows": [
      "Emergency Plumber in Edmonton | 24/7",
      "Plumbing Services",
      "Home"
     ]
    },
    "body": [
     "On-page SEO is everything on the page itself: the title link people see in Google, the headings, the copy, images and the links between your pages.",
     "We match each page to one clear search intent, so it is obvious to Google and to customers what that page is about."
    ],
    "bullets": [
     "One page, one clear purpose",
     "Titles and snippets that earn the click",
     "Internal links that guide people and crawlers"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "On-page work we handle",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "target",
      "title": "Keyword to page mapping",
      "text": "Each target search matched to the best page on your site."
     },
     {
      "icon": "tag",
      "title": "Titles and meta descriptions",
      "text": "Unique, clear and accurate for every page."
     },
     {
      "icon": "doc",
      "title": "Headings and copy",
      "text": "Structure and wording that answers the searcher."
     },
     {
      "icon": "link",
      "title": "Internal linking",
      "text": "Descriptive anchor text between related pages."
     },
     {
      "icon": "image",
      "title": "Images and alt text",
      "text": "Relevant images placed near the text they support."
     },
     {
      "icon": "code",
      "title": "Page level schema",
      "text": "Structured data that matches what is on the page."
     }
    ]
   },
   {
    "type": "statement",
    "text": "Google does not use the keywords meta tag. It reads [em]your titles, headings and content[/em]. That is where we focus."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How we optimize your pages",
    "items": [
     [
      "Research",
      "How your customers phrase their searches."
     ],
     [
      "Map",
      "One primary topic per page, no overlaps."
     ],
     [
      "Optimize",
      "Titles, headings, copy, images and links."
     ],
     [
      "Measure",
      "Rankings and clicks tracked per page."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "What Google says about titles and snippets",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "tag",
       "Unique titles",
       "Clear, concise and accurate"
      ],
      [
       "message",
       "Short descriptions",
       "Unique and relevant"
      ],
      [
       "link",
       "Good link text",
       "Descriptive anchors"
      ]
     ]
    },
    "body": [
     "Google's SEO Starter Guide recommends that every page has a unique, clear, concise and accurate title, and that meta descriptions, when used, are short, unique and relevant.",
     "It also confirms keyword stuffing goes against Google's spam policies. We write for people first and let relevance follow."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Keyword map",
      "Every target search assigned to a page"
     ],
     [
      "Rewritten titles and descriptions",
      "For every priority page"
     ],
     [
      "Heading structure",
      "Clear H1 to H3 for each page"
     ],
     [
      "Copy improvements",
      "Answering the questions searchers have"
     ],
     [
      "Internal link plan",
      "Links between related services"
     ],
     [
      "Image optimization",
      "File names, sizes and alt text"
     ],
     [
      "Cannibalization fixes",
      "Pages no longer competing with each other"
     ],
     [
      "Before and after report",
      "Rankings and clicks per page"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Myths",
    "heading": "What matters and what does not",
    "bg": "soft",
    "cols": [
     "Common belief",
     "What Google says"
    ],
    "rows": [
     [
      "You need the keywords meta tag",
      "Google Search does not use it"
     ],
     [
      "Longer pages rank better",
      "There is no word count target"
     ],
     [
      "Keywords in the domain help a lot",
      "They have hardly any ranking effect"
     ],
     [
      "Repeat the keyword many times",
      "Keyword stuffing violates spam policies"
     ],
     [
      "Headings must be in perfect order",
      "Out of order headings do not matter for Search"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "On-Page SEO questions",
    "items": [
     [
      "Will you change our brand voice?",
      "No. We improve structure and clarity while keeping your voice. You approve every change."
     ],
     [
      "How many pages do you optimize each month?",
      "[[Set your monthly page volume.]] It depends on your plan and page length."
     ],
     [
      "Do you need to rewrite everything?",
      "Rarely. Most gains come from fixing titles, headings and internal links on existing pages."
     ],
     [
      "How do you choose which pages to start with?",
      "We start with pages closest to page one for valuable searches, where small changes move results fastest."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside On-Page SEO",
    "items": [
     "services/content-seo",
     "services/technical-seo",
     "services/local-seo"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about On-Page SEO in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/content-seo",
  "nav_label": "Content SEO",
  "icon": "pen",
  "illus": "doc",
  "long_card": "SEO content writing in Edmonton: service pages, guides and articles planned around real searches and written to be helpful, original and accurate.",
  "keyword": "seo content writing edmonton",
  "title": "Content SEO Edmonton | SEO Content Writing | BrandName",
  "description": "SEO content writing in Edmonton: service pages, guides and articles planned around real searches and written to be helpful, original and accurate.",
  "card": "Helpful content written for Edmonton customers.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "Content SEO in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Content SEO",
    "h1": "SEO Content Writing in Edmonton",
    "lead": "Pages and articles that answer what your customers ask, written by people who understand your business.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Content that earns rankings and trust",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "doc",
       "Service pages",
       "One page per service"
      ],
      [
       "book",
       "Guides",
       "In-depth answers"
      ],
      [
       "message",
       "FAQs",
       "Real customer questions"
      ],
      [
       "pen",
       "Articles",
       "Timely and useful"
      ]
     ]
    },
    "body": [
     "Content SEO means planning and writing pages around the questions customers actually search, then making each page the most useful answer available.",
     "We interview you, use your expertise and write content that sounds like your business."
    ],
    "bullets": [
     "Planned around real search demand",
     "Written with your team's expertise",
     "Fact checked and sourced"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "Content we create",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "compass",
      "title": "Content strategy",
      "text": "Topic clusters mapped to your services and customers."
     },
     {
      "icon": "doc",
      "title": "Service pages",
      "text": "Detailed pages for each service you offer."
     },
     {
      "icon": "book",
      "title": "Guides and articles",
      "text": "In-depth answers to the questions customers ask."
     },
     {
      "icon": "message",
      "title": "FAQ content",
      "text": "Short, direct answers to common questions."
     },
     {
      "icon": "eye",
      "title": "Content refreshes",
      "text": "Older pages updated to stay accurate."
     },
     {
      "icon": "users",
      "title": "Expert interviews",
      "text": "Your knowledge turned into content."
     }
    ]
   },
   {
    "type": "statement",
    "text": "There is no magic word count. Google says length alone does not affect ranking. [em]Usefulness does.[/em]"
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How we create content",
    "items": [
     [
      "Research",
      "Searches, competitors and customer questions."
     ],
     [
      "Brief",
      "Outline, angle and sources agreed with you."
     ],
     [
      "Write",
      "Drafted by writers, reviewed by your expert."
     ],
     [
      "Publish",
      "Optimized, linked and tracked."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "What Google says helpful content looks like",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "eye",
       "Easy to read",
       "Organized with headings"
      ],
      [
       "spark",
       "Unique",
       "Not copied or rehashed"
      ],
      [
       "clock",
       "Up to date",
       "Accurate today"
      ]
     ]
    },
    "body": [
     "Google's SEO Starter Guide describes helpful content as easy to read, well organized, unique, up to date and written for people.",
     "It also suggests thinking about the different words people might use to search for your topic. Our briefs cover both."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Content strategy document",
      "Topics, priorities and timeline"
     ],
     [
      "Content calendar",
      "What is published and when"
     ],
     [
      "Detailed briefs",
      "Shared before writing starts"
     ],
     [
      "Written and edited pages",
      "Ready to publish"
     ],
     [
      "On-page optimization",
      "Titles, headings and links"
     ],
     [
      "Sources for every claim",
      "So you can check the facts"
     ],
     [
      "Publishing support",
      "Uploaded to your CMS if needed"
     ],
     [
      "Performance tracking",
      "Rankings and traffic per piece"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Content types",
    "heading": "Which content fits which goal",
    "bg": "soft",
    "cols": [
     "Content type",
     "Best for",
     "Typical search"
    ],
    "rows": [
     [
      "Service page",
      "Ready to buy visitors",
      "[service] edmonton"
     ],
     [
      "Guide",
      "Researching visitors",
      "how to choose a [service]"
     ],
     [
      "FAQ",
      "Quick answers",
      "how much does [service] take"
     ],
     [
      "Comparison",
      "Deciding visitors",
      "[option a] vs [option b]"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "Content SEO questions",
    "items": [
     [
      "Do you use AI to write content?",
      "Our writers may use tools for research, but every page is planned, written, edited and fact checked by people. Google's spam policies cover scaled low value content however it is made, so quality is what counts."
     ],
     [
      "Who approves the content?",
      "You do. Nothing is published without your sign off."
     ],
     [
      "Can you write for regulated industries?",
      "Yes, with review from your qualified team before publishing."
     ],
     [
      "How do you measure content success?",
      "Rankings, organic traffic and the enquiries each page drives."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside Content SEO",
    "items": [
     "services/on-page-seo",
     "services/link-building",
     "services/ai-search-optimization"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about Content SEO in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/link-building",
  "nav_label": "Link Building",
  "icon": "link",
  "illus": "link",
  "long_card": "Link building in Edmonton that follows Google's spam policies: digital PR, local partnerships, community mentions and content worth linking to.",
  "keyword": "link building edmonton",
  "title": "Link Building Services Edmonton | Earned Local Links | BrandName",
  "description": "Link building in Edmonton that follows Google's spam policies: digital PR, local partnerships, community mentions and content worth linking to.",
  "card": "Earn relevant links without breaking Google's rules.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "Link Building in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Link Building",
    "h1": "Link Building Services in Edmonton",
    "lead": "Earn links and mentions from relevant local and industry websites, without risky shortcuts.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Build a reputation Google can see",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "users",
       "Local partners",
       "Suppliers and associations"
      ],
      [
       "calendar",
       "Community",
       "Events and sponsorships"
      ],
      [
       "message",
       "Digital PR",
       "Stories worth covering"
      ],
      [
       "book",
       "Linkable assets",
       "Guides and data"
      ]
     ]
    },
    "body": [
     "Links from other websites help Google understand how well known and trusted your business is. For local search, Google lists links to your business as part of prominence.",
     "We earn links through real relationships and content worth citing, never through paid schemes."
    ],
    "bullets": [
     "Relevant Edmonton and industry sites",
     "No bought links or link farms",
     "Every link reported to you"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "How we earn links",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "handshake",
      "title": "Local partnerships",
      "text": "Suppliers, associations and partners who already know you."
     },
     {
      "icon": "calendar",
      "title": "Community involvement",
      "text": "Events and sponsorships that earn natural mentions."
     },
     {
      "icon": "message",
      "title": "Digital PR",
      "text": "Pitching useful stories to local and industry media."
     },
     {
      "icon": "book",
      "title": "Linkable content",
      "text": "Guides and resources other sites want to reference."
     },
     {
      "icon": "search",
      "title": "Unlinked mentions",
      "text": "Finding places that mention you without a link."
     },
     {
      "icon": "map",
      "title": "Quality listings",
      "text": "Relevant local and industry directories only."
     }
    ]
   },
   {
    "type": "statement",
    "text": "Google treats buying links for ranking as spam. We build links [em]the slow, safe way[/em], because it lasts."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How our link building works",
    "items": [
     [
      "Profile review",
      "Your current links and competitor gaps."
     ],
     [
      "Opportunity list",
      "Relevant sites and angles."
     ],
     [
      "Outreach",
      "Personal, relevant pitches."
     ],
     [
      "Report",
      "Every link and mention listed."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "What Google counts as link spam",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "tag",
       "Buying or selling links",
       "For ranking purposes"
      ],
      [
       "link",
       "Excessive link exchanges",
       "Link to me and I link to you"
      ],
      [
       "bolt",
       "Automated link programs",
       "Links made by software"
      ]
     ]
    },
    "body": [
     "Google's spam policies list buying or selling links for ranking, excessive link exchanges, automated link programs and low quality directory links as violations.",
     "Paid or sponsored links are fine when marked with rel=\"sponsored\" or rel=\"nofollow\". We follow these rules on every campaign."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Backlink profile audit",
      "Strengths and risks"
     ],
     [
      "Competitor link gap analysis",
      "Where they have links you do not"
     ],
     [
      "Outreach target list",
      "Relevant, real websites"
     ],
     [
      "Pitch templates",
      "Personalized for each target"
     ],
     [
      "Linkable asset plan",
      "Content worth citing"
     ],
     [
      "Monthly link report",
      "Every new link and mention"
     ],
     [
      "Toxic link review",
      "Risky links flagged"
     ],
     [
      "Anchor text guidance",
      "Natural and descriptive"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Safe vs risky",
    "heading": "Link tactics compared",
    "bg": "soft",
    "cols": [
     "Tactic",
     "Our approach"
    ],
    "rows": [
     [
      "Paid links that pass ranking credit",
      "Never"
     ],
     [
      "Sponsorships with rel=\"sponsored\"",
      "Yes, when relevant"
     ],
     [
      "Local partner and supplier mentions",
      "Yes"
     ],
     [
      "Guest posts with optimized anchors",
      "Never"
     ],
     [
      "Original guides and data",
      "Yes"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "Link Building questions",
    "items": [
     [
      "How many links will we get each month?",
      "We do not sell links by volume. Earned links vary month to month, and we report every one."
     ],
     [
      "Do you buy links?",
      "No. Google's spam policies treat buying links for ranking as a violation."
     ],
     [
      "Do directory listings still help?",
      "Accurate listings on relevant local and industry directories help consistency. Low quality directories are listed by Google as link spam, so we avoid them."
     ],
     [
      "Do I have to link back to you?",
      "No. Google advises that you should never have to link to an SEO."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside Link Building",
    "items": [
     "services/content-seo",
     "services/local-seo",
     "services/seo-audit"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about Link Building in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/google-business-profile",
  "nav_label": "Google Business Profile",
  "icon": "store",
  "illus": "store",
  "long_card": "Google Business Profile optimization in Edmonton: verification, categories, hours, photos, posts, products and review management that supports local rankings.",
  "keyword": "google business profile optimization edmonton",
  "title": "Google Business Profile Optimization Edmonton | BrandName",
  "description": "Google Business Profile optimization in Edmonton: verification, categories, hours, photos, posts, products and review management that supports local rankings.",
  "card": "A complete, verified profile that wins the map.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "Google Business Profile in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Google Business Profile",
    "h1": "Google Business Profile Optimization in Edmonton",
    "lead": "A complete, accurate and active profile that helps you win calls and directions from Google Maps.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Your most visible listing on Google",
    "visual": "map",
    "vdata": {
     "title": "Your Business Profile",
     "sub": "Call · Directions · Website"
    },
    "body": [
     "Your Business Profile is often the first thing people see when they search for your business or service in Edmonton. It shows your hours, reviews, photos and contact options.",
     "We set it up properly, keep it accurate and keep it active."
    ],
    "bullets": [
     "Verified and fully completed",
     "Accurate hours, including holidays",
     "Active with photos, posts and replies"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "Profile management we handle",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "shield",
      "title": "Verification",
      "text": "Getting your profile verified, or recovering access."
     },
     {
      "icon": "clock",
      "title": "Hours and details",
      "text": "Address, hours, special hours, category and attributes."
     },
     {
      "icon": "image",
      "title": "Photos and videos",
      "text": "Regular uploads that show what you offer."
     },
     {
      "icon": "star",
      "title": "Review responses",
      "text": "Thoughtful replies to every review."
     },
     {
      "icon": "cart",
      "title": "Products and services",
      "text": "Listed clearly, including in-store products where eligible."
     },
     {
      "icon": "message",
      "title": "Posts and updates",
      "text": "Offers, news and events shared on your profile."
     }
    ]
   },
   {
    "type": "statement",
    "text": "Google says verified businesses are [em]more likely to appear[/em] in local results. Verification is step one."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How we manage your profile",
    "items": [
     [
      "Access and audit",
      "Ownership, verification and every field."
     ],
     [
      "Complete",
      "Details, categories, photos and services."
     ],
     [
      "Activate",
      "Posts, photos and review replies each month."
     ],
     [
      "Report",
      "Calls, directions and website clicks."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "Google's own tips for local ranking",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "shield",
       "Verify your business",
       "Confirm you can represent it"
      ],
      [
       "clock",
       "Keep info current",
       "Address, hours, category"
      ],
      [
       "star",
       "Respond to reviews",
       "Show you value feedback"
      ],
      [
       "image",
       "Add photos and videos",
       "Tell your story"
      ]
     ]
    },
    "body": [
     "Google Business Profile Help recommends verifying your business, keeping your information current, responding to reviews and adding photos and videos.",
     "Each of those is part of our monthly routine, so your profile never goes stale."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Profile audit",
      "Every field reviewed"
     ],
     [
      "Verification support",
      "Or ownership recovery"
     ],
     [
      "Category and attribute setup",
      "Matched to your services"
     ],
     [
      "Photo plan",
      "What to shoot and when to post"
     ],
     [
      "Monthly posts",
      "Offers, news and events"
     ],
     [
      "Review replies",
      "Every review answered"
     ],
     [
      "Special hours updates",
      "Holidays covered"
     ],
     [
      "Monthly insights report",
      "Calls, directions and clicks"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Fields",
    "heading": "Profile fields we keep accurate",
    "bg": "soft",
    "cols": [
     "Field",
     "Why it matters"
    ],
    "rows": [
     [
      "Business category",
      "Helps Google match you to relevant searches"
     ],
     [
      "Address or service area",
      "Shows where you operate"
     ],
     [
      "Hours and special hours",
      "Prevents wasted trips and bad reviews"
     ],
     [
      "Attributes",
      "Details customers filter by, such as parking or Wi-Fi"
     ],
     [
      "Photos and videos",
      "Shows customers what to expect"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/professional-firm",
     "case-studies/ecommerce-store"
    ]
   },
   {
    "type": "faq",
    "heading": "Google Business Profile questions",
    "items": [
     [
      "Can you fix a suspended profile?",
      "We can review the cause and guide the reinstatement request. [[Confirm whether you offer this.]]"
     ],
     [
      "Can I pay Google to rank higher in Maps?",
      "No. Google says there is no way to request or pay for a better local ranking."
     ],
     [
      "How often should we post?",
      "Regular activity keeps your profile current. We agree a cadence that fits your business."
     ],
     [
      "Should we respond to negative reviews?",
      "Yes. Google recommends responding to reviews. A calm, helpful reply shows future customers how you treat people."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside Google Business Profile",
    "items": [
     "services/local-seo",
     "services/content-seo",
     "services/link-building"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about Google Business Profile in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/ecommerce-seo",
  "nav_label": "Ecommerce SEO",
  "icon": "cart",
  "illus": "cart",
  "long_card": "Ecommerce SEO for Edmonton online stores: category and product pages, product structured data, Merchant Center alignment and technical fixes.",
  "keyword": "ecommerce seo edmonton",
  "title": "Ecommerce SEO Edmonton | Shopify and WooCommerce SEO | BrandName",
  "description": "Ecommerce SEO for Edmonton online stores: category and product pages, product structured data, Merchant Center alignment and technical fixes.",
  "card": "More organic sales for online stores.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "Ecommerce SEO in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Ecommerce SEO",
    "h1": "Ecommerce SEO Services in Edmonton",
    "lead": "Help shoppers find your products on Google and turn that traffic into sales.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "SEO built for products and categories",
    "visual": "serp",
    "vdata": {
     "query": "winter boots edmonton",
     "rows": [
      "Winter Boots | Your Store",
      "Marketplace listing",
      "Big box retailer"
     ]
    },
    "body": [
     "Online stores have their own SEO challenges: thousands of similar pages, filters that create duplicate URLs and product details that change often.",
     "We structure your categories, improve product pages and add the structured data that helps products appear in shopping experiences on Google."
    ],
    "bullets": [
     "Shopify, WooCommerce and custom stores",
     "Category pages that rank for broad searches",
     "Product data that stays in sync"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "Ecommerce SEO work we handle",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "layers",
      "title": "Category architecture",
      "text": "Logical categories and URLs that match how people shop."
     },
     {
      "icon": "tag",
      "title": "Product page optimization",
      "text": "Titles, descriptions, images and specs that answer questions."
     },
     {
      "icon": "code",
      "title": "Product structured data",
      "text": "Product, ProductGroup and Review markup done right."
     },
     {
      "icon": "shield",
      "title": "Faceted navigation",
      "text": "Filters handled so they do not create endless duplicates."
     },
     {
      "icon": "cart",
      "title": "Merchant Center alignment",
      "text": "Product data kept consistent with your site."
     },
     {
      "icon": "speed",
      "title": "Store speed",
      "text": "Faster category and product pages."
     }
    ]
   },
   {
    "type": "statement",
    "text": "The goal is not traffic. It is [em]organic revenue[/em], tracked from search to checkout."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How we grow store traffic",
    "items": [
     [
      "Store audit",
      "Structure, duplicates and product data."
     ],
     [
      "Category plan",
      "Map categories to search demand."
     ],
     [
      "Optimize",
      "Categories, products and schema."
     ],
     [
      "Track revenue",
      "Organic sales reported monthly."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "Structured data Google recommends for stores",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "cart",
       "Product and ProductGroup",
       "Products and variants"
      ],
      [
       "star",
       "Review",
       "Review snippets"
      ],
      [
       "layers",
       "BreadcrumbList",
       "Site hierarchy"
      ],
      [
       "store",
       "Organization",
       "Logo and return policy"
      ]
     ]
    },
    "body": [
     "Google Search Central recommends Product and ProductGroup, Review, BreadcrumbList, Organization, LocalBusiness and VideoObject structured data for ecommerce sites.",
     "Product markup can help products appear in shopping experiences on Google. We implement and validate each type your store needs."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Ecommerce SEO audit",
      "Store specific issues ranked"
     ],
     [
      "Category keyword map",
      "Every category matched to demand"
     ],
     [
      "Product page templates",
      "Optimized layouts and copy"
     ],
     [
      "Structured data rollout",
      "Validated across the store"
     ],
     [
      "Duplicate URL plan",
      "Canonicals and filter handling"
     ],
     [
      "Merchant Center review",
      "Data consistency checks"
     ],
     [
      "Collection content",
      "Helpful intro copy for categories"
     ],
     [
      "Revenue report",
      "Organic sales and conversions"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Platforms",
    "heading": "Platform specific focus",
    "bg": "soft",
    "cols": [
     "Platform",
     "Common focus"
    ],
    "rows": [
     [
      "Shopify",
      "Collection structure, duplicate product URLs, theme speed"
     ],
     [
      "WooCommerce",
      "Plugin bloat, category archives, schema"
     ],
     [
      "Custom",
      "Rendering, faceted URLs, sitemaps at scale"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/ecommerce-store",
     "case-studies/local-service-business",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "Ecommerce SEO questions",
    "items": [
     [
      "Do you work with Shopify?",
      "Yes, along with WooCommerce and custom builds."
     ],
     [
      "Do we need Merchant Center?",
      "Product structured data helps on your site. Google links its ecommerce guidance to Merchant Center for shopping experiences, so we usually recommend it."
     ],
     [
      "What about out of stock products?",
      "We set a clear rule for each case: keep, redirect or retire, so you do not lose value."
     ],
     [
      "Can you write product descriptions?",
      "Yes. Unique descriptions help customers and make each product page distinct."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside Ecommerce SEO",
    "items": [
     "services/technical-seo",
     "services/content-seo",
     "services/seo-audit"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about Ecommerce SEO in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/seo-audit",
  "nav_label": "SEO Audit",
  "icon": "audit",
  "illus": "audit",
  "long_card": "A full SEO audit for Edmonton businesses: technical, on-page, content, links and local search reviewed, with a prioritized fix list you can act on.",
  "keyword": "seo audit edmonton",
  "title": "SEO Audit Edmonton | Full Website SEO Audit | BrandName",
  "description": "A full SEO audit for Edmonton businesses: technical, on-page, content, links and local search reviewed, with a prioritized fix list you can act on.",
  "card": "Know exactly what to fix first.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "SEO Audit in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "SEO Audit",
    "h1": "SEO Audit Services in Edmonton",
    "lead": "A complete review of your site with a clear, prioritized list of what to fix and why.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Find out what is holding your site back",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "gear",
       "Technical",
       "Crawling and indexing"
      ],
      [
       "doc",
       "On-page",
       "Titles and content"
      ],
      [
       "link",
       "Links",
       "Profile and risks"
      ],
      [
       "pin",
       "Local",
       "Profile and citations"
      ]
     ]
    },
    "body": [
     "An SEO audit looks at every part of your search presence and tells you what is working, what is broken and what to do about it.",
     "You get a report written in plain language with every issue ranked by impact and effort."
    ],
    "bullets": [
     "A stand-alone project, no ongoing contract",
     "Walkthrough call to explain findings",
     "Usable by your team or ours"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What we check",
    "heading": "Areas covered in every audit",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "gear",
      "title": "Technical health",
      "text": "Crawling, indexing, canonicals, sitemaps and rendering."
     },
     {
      "icon": "doc",
      "title": "On-page",
      "text": "Titles, descriptions, headings and internal links."
     },
     {
      "icon": "pen",
      "title": "Content",
      "text": "Gaps, overlaps and outdated pages."
     },
     {
      "icon": "link",
      "title": "Backlinks",
      "text": "Link profile strengths and risks."
     },
     {
      "icon": "pin",
      "title": "Local presence",
      "text": "Business Profile, citations and reviews."
     },
     {
      "icon": "users",
      "title": "Competitors",
      "text": "Where competitors outrank you and why."
     }
    ]
   },
   {
    "type": "statement",
    "text": "An audit is only useful if it leads to action. Every finding comes with [em]a clear next step[/em]."
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How the audit runs",
    "items": [
     [
      "Kickoff",
      "Goals, access and priorities."
     ],
     [
      "Analysis",
      "Crawl, data review and manual checks."
     ],
     [
      "Report",
      "Findings ranked by impact and effort."
     ],
     [
      "Walkthrough",
      "A call to explain and plan next steps."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "Before you hire",
    "heading": "Questions Google suggests asking any SEO",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "book",
       "Examples of past work",
       "Success stories"
      ],
      [
       "shield",
       "Search Essentials",
       "Do they follow them"
      ],
      [
       "eye",
       "Shared changes",
       "Will they show every change"
      ]
     ]
    },
    "body": [
     "Google suggests asking an SEO for examples of previous work, whether they follow Google Search Essentials and whether they will share every change they make.",
     "Our audit is designed to answer those questions up front, so you can judge our work before committing to anything more."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "Audit report",
      "Plain language findings"
     ],
     [
      "Prioritized fix list",
      "Ranked by impact and effort"
     ],
     [
      "Technical issue log",
      "With affected URLs"
     ],
     [
      "Content gap list",
      "Topics you are missing"
     ],
     [
      "Backlink risk review",
      "Links worth attention"
     ],
     [
      "Local presence review",
      "Profile and citations"
     ],
     [
      "Competitor comparison",
      "Where you can win"
     ],
     [
      "Walkthrough call",
      "Questions answered"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Format",
    "heading": "How findings are presented",
    "bg": "soft",
    "cols": [
     "Priority",
     "Meaning",
     "Example"
    ],
    "rows": [
     [
      "High",
      "Blocking rankings now",
      "Important pages not indexed"
     ],
     [
      "Medium",
      "Holding performance back",
      "Duplicate titles across services"
     ],
     [
      "Low",
      "Worth fixing over time",
      "Missing alt text on older images"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "SEO Audit questions",
    "items": [
     [
      "How long does an audit take?",
      "[[Set your typical turnaround.]] It depends on the size of your site."
     ],
     [
      "What access do you need?",
      "Search Console, Google Analytics and, if relevant, your Business Profile. Read only access is fine."
     ],
     [
      "Can our developer implement the fixes?",
      "Yes. Findings are written so any competent developer can act on them."
     ],
     [
      "Is the audit automated?",
      "We use crawling tools, but every finding is checked and explained by a person."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside SEO Audit",
    "items": [
     "services/technical-seo",
     "services/on-page-seo",
     "services/local-seo"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about SEO Audit in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 },
 {
  "slug": "services/ai-search-optimization",
  "nav_label": "AI Search Optimization",
  "icon": "spark",
  "illus": "spark",
  "long_card": "AI search optimization in Edmonton: make your content ready for Google AI Overviews, AI Mode and AI assistants using proven SEO fundamentals.",
  "keyword": "ai search optimization edmonton",
  "title": "AI Search Optimization Edmonton | AI Overviews and GEO | BrandName",
  "description": "AI search optimization in Edmonton: make your content ready for Google AI Overviews, AI Mode and AI assistants using proven SEO fundamentals.",
  "card": "Be ready for AI Overviews and AI assistants.",
  "crumbs": [
   [
    "Services",
    "services"
   ]
  ],
  "service": "AI Search Optimization in Edmonton",
  "area": "Edmonton, AB",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "AI Search Optimization",
    "h1": "AI Search Optimization in Edmonton",
    "lead": "Get your content ready to be found and cited in Google AI Overviews, AI Mode and AI assistants.",
    "cta": [
     "Get a free SEO review",
     "contact"
    ]
   },
   {
    "type": "split",
    "eyebrow": "What it is",
    "heading": "Search is changing. The fundamentals still matter.",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "spark",
       "AI Overviews",
       "Google Search"
      ],
      [
       "message",
       "AI Mode",
       "Conversational search"
      ],
      [
       "compass",
       "AI assistants",
       "Chat based tools"
      ],
      [
       "search",
       "Classic results",
       "Still essential"
      ]
     ]
    },
    "body": [
     "More people now get answers from AI features in Google and from AI assistants. Businesses want to know how to show up there.",
     "Google says there are no additional requirements or special optimizations needed to appear in AI Overviews or AI Mode. Pages need to be indexed and eligible to show with a snippet. So this service is about doing the fundamentals very well."
    ],
    "bullets": [
     "Indexed, crawlable and eligible pages",
     "Clear, text based answers",
     "Accurate Business Profile and structured data"
    ]
   },
   {
    "type": "cards",
    "eyebrow": "What is included",
    "heading": "How we prepare your site",
    "bg": "soft",
    "cols": 3,
    "items": [
     {
      "icon": "search",
      "title": "Crawl access review",
      "text": "robots.txt, CDN and hosting settings that allow crawling."
     },
     {
      "icon": "link",
      "title": "Internal linking",
      "text": "Important content easy to find through links."
     },
     {
      "icon": "doc",
      "title": "Text first content",
      "text": "Key information available as text, not locked in images."
     },
     {
      "icon": "image",
      "title": "Supporting media",
      "text": "Relevant, high quality images and video beside the text."
     },
     {
      "icon": "code",
      "title": "Structured data checks",
      "text": "Markup that matches what is visible on the page."
     },
     {
      "icon": "store",
      "title": "Profile and feed accuracy",
      "text": "Business Profile and Merchant Center kept current."
     }
    ]
   },
   {
    "type": "statement",
    "text": "Google says no special schema or AI text files are needed for its AI features. [em]Strong SEO is AI search readiness.[/em]"
   },
   {
    "type": "steps",
    "eyebrow": "Process",
    "heading": "How we approach AI search",
    "items": [
     [
      "Eligibility check",
      "Indexing and snippet eligibility."
     ],
     [
      "Content review",
      "Clear answers to real questions."
     ],
     [
      "Technical fixes",
      "Access, links and structured data."
     ],
     [
      "Monitor",
      "Search Console data tracked over time."
     ]
    ]
   },
   {
    "type": "split",
    "eyebrow": "From the source",
    "heading": "Google's best practices for AI features",
    "reverse": true,
    "bg": "cream",
    "visual": "cards",
    "vdata": {
     "items": [
      [
       "shield",
       "Allow crawling",
       "robots.txt and CDN"
      ],
      [
       "link",
       "Internal links",
       "Content easy to find"
      ],
      [
       "eye",
       "Page experience",
       "Good to use"
      ],
      [
       "code",
       "Matching markup",
       "Schema equals visible text"
      ]
     ]
    },
    "body": [
     "Google's guidance on AI features lists the same best practices it gives for Search: allow crawling, use internal links, provide a good page experience, keep important content in text and make structured data match visible text.",
     "It also recommends keeping Business Profile and Merchant Center information current and verifying your site in Search Console."
    ]
   },
   {
    "type": "checklist",
    "eyebrow": "Deliverables",
    "heading": "What you receive",
    "bg": "",
    "items": [
     [
      "AI readiness audit",
      "Against Google's published best practices"
     ],
     [
      "Crawl access report",
      "Including CDN and hosting rules"
     ],
     [
      "Content clarity review",
      "Pages that answer questions directly"
     ],
     [
      "Structured data audit",
      "Markup matches visible text"
     ],
     [
      "Internal link plan",
      "Key pages easy to reach"
     ],
     [
      "Profile accuracy check",
      "Business Profile and feeds"
     ],
     [
      "Search Console setup",
      "Verified and monitored"
     ],
     [
      "Quarterly review",
      "What changed and what to do next"
     ]
    ]
   },
   {
    "type": "table",
    "eyebrow": "Clearing up confusion",
    "heading": "AI search myths and facts",
    "bg": "soft",
    "cols": [
     "Claim",
     "What Google says"
    ],
    "rows": [
     [
      "You need special AI schema",
      "There is no special schema.org markup for AI features"
     ],
     [
      "You need an AI text file",
      "No new machine readable files are needed"
     ],
     [
      "AI search replaces SEO",
      "Pages must still be indexed and snippet eligible"
     ],
     [
      "Being eligible guarantees inclusion",
      "Meeting requirements does not guarantee crawling, indexing or serving"
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Proof",
    "heading": "Related case studies",
    "items": [
     "case-studies/local-service-business",
     "case-studies/ecommerce-store",
     "case-studies/professional-firm"
    ]
   },
   {
    "type": "faq",
    "heading": "AI Search Optimization questions",
    "items": [
     [
      "Can you guarantee we appear in AI Overviews?",
      "No. Google says meeting the requirements does not guarantee your content will be crawled, indexed or served."
     ],
     [
      "Is this different from regular SEO?",
      "Mostly no. Google says no special optimization is needed for its AI features. We focus on the fundamentals that make content eligible and easy to understand."
     ],
     [
      "What about ChatGPT and other assistants?",
      "Each tool works differently and publishes its own guidance. We keep your content clear, accurate and crawlable, which supports discovery across tools."
     ],
     [
      "Do we need an llms.txt file?",
      "Google says AI specific text files are not needed for its AI features. Some other tools read them, so we can add one, but it is optional."
     ]
    ]
   },
   {
    "type": "links",
    "eyebrow": "Related services",
    "heading": "Services that work well alongside AI Search Optimization",
    "items": [
     "services/technical-seo",
     "services/content-seo",
     "services/google-business-profile"
    ]
   },
   {
    "type": "cta",
    "heading": "Talk to us about AI Search Optimization in Edmonton",
    "text": "Book a free review and we will show you the biggest opportunities for your business."
   }
  ]
 }
];
