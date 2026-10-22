// Blog hub + posts, written from Google's primary documentation and linking to it.
// Inline marks: [[placeholder]]  **bold**  {{link text|slug}}
import type { Page } from './types';

export const PAGES: Page[] = [
 {
  "slug": "blog",
  "nav_label": "Blog",
  "icon": "book",
  "page_type": "CollectionPage",
  "title": "SEO Blog | Edmonton SEO Tips | BrandName",
  "description": "Practical SEO advice for Edmonton businesses, checked against Google's own documentation. Local SEO, AI search and choosing an agency.",
  "keyword": "edmonton seo blog",
  "card": "SEO advice, checked against the source.",
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Blog",
    "h1": "SEO Advice for Edmonton Businesses",
    "lead": "Practical guides, checked against Google's own documentation, with sources linked in every article."
   },
   {
    "type": "posts",
    "eyebrow": "Latest",
    "heading": "Recent articles",
    "items": [
     "blog/how-google-ranks-local-businesses",
     "blog/ai-overviews-and-your-website",
     "blog/choosing-an-seo-agency-in-edmonton"
    ]
   },
   {
    "type": "cta",
    "heading": "Prefer to have it done for you?",
    "text": "Book a free review and we will tell you what to fix first."
   }
  ]
 },
 {
  "photo": "https://images.unsplash.com/photo-1531058240690-006c446962d8?auto=format&fit=crop&w=800&q=80",
  "illus": "map",
  "slug": "blog/how-google-ranks-local-businesses",
  "nav_label": "How Google Ranks Local Businesses in Edmonton",
  "tag": "Local SEO",
  "icon": "pin",
  "card": "The three factors Google uses for local results and what you can do about each one.",
  "article": "2026-10-23",
  "page_type": "WebPage",
  "title": "How Google Ranks Local Businesses in Edmonton | BrandName Blog",
  "description": "What Google says decides local rankings, the tips it recommends and what that means for Edmonton businesses competing in the map pack.",
  "keyword": "how google ranks local businesses",
  "crumbs": [
   [
    "Blog",
    "blog"
   ]
  ],
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Local SEO · [[Publish date]]",
    "h1": "How Google Ranks Local Businesses in Edmonton",
    "lead": "The three factors Google uses for local results and what you can do about each one."
   },
   {
    "type": "prose",
    "blocks": [
     [
      "p",
      "If you run a business in Edmonton, the map results are often where customers find you first. Google publishes a short help article that explains how those results are ranked. Here is what it says, in plain language, and how to act on it."
     ],
     [
      "h2",
      "The three factors"
     ],
     [
      "p",
      "Google says local results are based mainly on three things:"
     ],
     [
      "ul",
      [
       "**Relevance:** how well your Business Profile matches what someone searched for. Complete, detailed information helps.",
       "**Distance:** how far your business is from the searcher, or from the location in their search.",
       "**Prominence:** how well known your business is. Google mentions links to your business and your review count as inputs."
      ]
     ],
     [
      "p",
      "Google also states plainly that you cannot request or pay for a better local ranking."
     ],
     [
      "h2",
      "What Google recommends"
     ],
     [
      "ul",
      [
       "Verify your business.",
       "Keep your address, hours, special hours, category and attributes current.",
       "Respond to reviews.",
       "Add photos and videos.",
       "If you are an eligible retailer, add in-store products."
      ]
     ],
     [
      "h2",
      "What this means in Edmonton"
     ],
     [
      "p",
      "Distance is the one factor you cannot change, and it is why results look different in Windermere than they do Downtown. Focus your effort on relevance and prominence: a complete profile, a website that supports it, steady genuine reviews and mentions from local organizations."
     ],
     [
      "callout",
      "A note on reviews: Google's contribution policy does not allow rewards in exchange for reviews, and it does not allow asking only happy customers. Ask every customer, and keep it honest."
     ],
     [
      "h2",
      "Where to start"
     ],
     [
      "p",
      "Open your Business Profile and check every field against your real details. Then read our {{Local SEO|services/local-seo}} page to see how we handle the rest."
     ],
     [
      "src",
      [
       [
        "Google Business Profile Help: How to improve your local ranking",
        "https://support.google.com/business/answer/7091?hl=en"
       ],
       [
        "Google Maps contribution policy: Prohibited and restricted content",
        "https://support.google.com/contributionpolicy/answer/7400114?hl=en"
       ]
      ]
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Keep reading",
    "heading": "More from the blog",
    "bg": "soft",
    "items": [
     "blog/ai-overviews-and-your-website",
     "blog/choosing-an-seo-agency-in-edmonton"
    ]
   },
   {
    "type": "cta",
    "heading": "Want this done for your business?",
    "text": "Book a free SEO review and we will apply it to your site and profile."
   }
  ]
 },
 {
  "photo": "https://images.unsplash.com/photo-1571826945830-5423b80a986c?auto=format&fit=crop&w=800&q=80",
  "illus": "spark",
  "slug": "blog/ai-overviews-and-your-website",
  "nav_label": "AI Overviews and Your Website: What Google Says",
  "tag": "AI search",
  "icon": "spark",
  "card": "Google's own answer on what it takes to appear in AI Overviews and AI Mode.",
  "article": "2026-10-23",
  "page_type": "WebPage",
  "title": "AI Overviews and Your Website: What Google Says | BrandName Blog",
  "description": "Do you need special optimization for Google AI Overviews or AI Mode? What Google's own guidance says and the best practices it recommends.",
  "keyword": "ai overviews seo",
  "crumbs": [
   [
    "Blog",
    "blog"
   ]
  ],
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "AI search · [[Publish date]]",
    "h1": "AI Overviews and Your Website: What Google Says",
    "lead": "Google's own answer on what it takes to appear in AI Overviews and AI Mode."
   },
   {
    "type": "prose",
    "blocks": [
     [
      "p",
      "A lot of advice now promises special tricks for AI search. Google has published its own guidance for site owners on AI Overviews and AI Mode, and it is simpler than the hype suggests."
     ],
     [
      "h2",
      "No extra requirements"
     ],
     [
      "p",
      "Google says there are no additional requirements and no special optimizations needed to appear in AI Overviews or AI Mode. A page needs to be indexed and eligible to show in Search with a snippet. Meeting that bar does not guarantee a page will be shown."
     ],
     [
      "h2",
      "The best practices Google lists"
     ],
     [
      "ul",
      [
       "Allow crawling in robots.txt and in any CDN or hosting settings.",
       "Make content easy to find through internal links.",
       "Provide a good page experience.",
       "Keep important content in text form.",
       "Support text with relevant, high quality images and video.",
       "Make sure structured data matches the visible text.",
       "Keep Merchant Center and Business Profile information current.",
       "Verify your site in Search Console."
      ]
     ],
     [
      "h2",
      "What you do not need"
     ],
     [
      "p",
      "According to the same page, you do not need new machine readable files, AI specific text files or special markup for Google's AI features. There is no special schema.org type for them."
     ],
     [
      "callout",
      "Other AI tools publish their own guidance and may treat things differently. For Google, strong SEO fundamentals are the plan."
     ],
     [
      "h2",
      "Next step"
     ],
     [
      "p",
      "Our {{AI Search Optimization|services/ai-search-optimization}} service checks your site against each of these practices."
     ],
     [
      "src",
      [
       [
        "Google Search Central: AI features and your website",
        "https://developers.google.com/search/docs/appearance/ai-features"
       ]
      ]
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Keep reading",
    "heading": "More from the blog",
    "bg": "soft",
    "items": [
     "blog/how-google-ranks-local-businesses",
     "blog/choosing-an-seo-agency-in-edmonton"
    ]
   },
   {
    "type": "cta",
    "heading": "Want this done for your business?",
    "text": "Book a free SEO review and we will apply it to your site and profile."
   }
  ]
 },
 {
  "photo": "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?auto=format&fit=crop&w=800&q=80",
  "illus": "star",
  "slug": "blog/choosing-an-seo-agency-in-edmonton",
  "nav_label": "How to Choose an SEO Agency in Edmonton",
  "tag": "Hiring",
  "icon": "users",
  "card": "The questions Google suggests asking and the red flags to watch for.",
  "article": "2026-10-23",
  "page_type": "WebPage",
  "title": "How to Choose an SEO Agency in Edmonton | BrandName Blog",
  "description": "Questions to ask before hiring an SEO agency in Edmonton, based on Google's own advice, plus the red flags that should make you walk away.",
  "keyword": "choose seo agency edmonton",
  "crumbs": [
   [
    "Blog",
    "blog"
   ]
  ],
  "sections": [
   {
    "type": "page_hero",
    "eyebrow": "Hiring · [[Publish date]]",
    "h1": "How to Choose an SEO Agency in Edmonton",
    "lead": "The questions Google suggests asking and the red flags to watch for."
   },
   {
    "type": "prose",
    "blocks": [
     [
      "p",
      "Hiring an SEO agency is a big decision. Google has a help page written for exactly this moment. Here are its main points, and how we would apply them when choosing a partner in Edmonton."
     ],
     [
      "h2",
      "Questions to ask"
     ],
     [
      "ul",
      [
       "Can you show examples of previous work and success stories?",
       "Do you follow Google Search Essentials?",
       "What experience do you have in my industry?",
       "How long have you been in business?",
       "Will you share every change you make to my site?",
       "What results do you expect, and in what timeframe?"
      ]
     ],
     [
      "h2",
      "Red flags"
     ],
     [
      "ul",
      [
       "A guaranteed #1 ranking. Google says no one can guarantee that.",
       "Being asked to link back to the agency. Google says you should never have to.",
       "Link buying or link schemes. Google's spam policies treat buying links for ranking as a violation."
      ]
     ],
     [
      "callout",
      "Google also reminds business owners that they are responsible for the actions of any company they hire. Ask questions until the answers are clear."
     ],
     [
      "h2",
      "How we answer these questions"
     ],
     [
      "p",
      "We share {{case studies|case-studies}}, follow Google Search Essentials, log every change and give expected results in writing after an audit. If you want to test us, start with an {{SEO Audit|services/seo-audit}}."
     ],
     [
      "src",
      [
       [
        "Google Search Central: Do you need an SEO?",
        "https://developers.google.com/search/docs/fundamentals/do-i-need-seo"
       ],
       [
        "Google Search Central: Spam policies",
        "https://developers.google.com/search/docs/essentials/spam-policies"
       ]
      ]
     ]
    ]
   },
   {
    "type": "posts",
    "eyebrow": "Keep reading",
    "heading": "More from the blog",
    "bg": "soft",
    "items": [
     "blog/how-google-ranks-local-businesses",
     "blog/ai-overviews-and-your-website"
    ]
   },
   {
    "type": "cta",
    "heading": "Want this done for your business?",
    "text": "Book a free SEO review and we will apply it to your site and profile."
   }
  ]
 }
];
