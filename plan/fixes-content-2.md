# Content fixes from audit 2026-10-23, pass 2 of 3 (services)

Scope: `content/services.ts` (hub, local SEO, GBP, technical, on-page, link building, SEO audit) and `content/services-more.json` (content writing, ecommerce, AI search). The plan entries in `plan/content-plan.json` were updated for the title, h1 and meta of these 10 pages only.

## Finding → change

| Finding | Change |
|---|---|
| F1 / keyword field | Every service page and the hub now has a `keyword` equal to the plan primary: `seo services` (hub), `local seo edmonton`, `google business profile optimization edmonton`, `technical seo edmonton`, `on page seo edmonton`, `link building edmonton`, `seo audit edmonton`, `content writing edmonton` (was "seo content writing edmonton"), `ecommerce seo edmonton` and `ai search optimization` (was "… edmonton"). `svc()` takes a `keyword` and passes it to the Page. |
| F2 | Titles start with the exact keyword and " \| " (hub: "SEO Services \| Local, Technical and On-Page SEO"; GBP: "Google Business Profile Optimization Edmonton \| More Calls"; content: "Content Writing Edmonton \| SEO Pages and Blogs That Rank"). Every H1 carries the exact keyword with a comma, no colon. Each description (142–158 chars) holds the exact keyword, and most end with "Get a free SEO audit" or "Start with a free SEO audit". Each hero lead opens with the exact keyword in its first sentence. |
| F3 | On-page H2 "Keyword mapping: …" is now "Keyword mapping, the right search for the right page". No colon in any title or H1 on these pages. |
| F12 | GBP: NAP expanded and tied to the website, products added to the services/attributes card, a relevance/distance/prominence sentence linked to local SEO, "Google reviews", "GBP posts and photos" (photos tied to engagement), and the suspension paragraph cites Google's guidelines for representing your business. |
| F13 | AI page: defines AI search optimization and generative engine optimization (GEO), citing the 2023 GEO paper (arXiv 2311.09735). Names ChatGPT, Gemini and Perplexity. New H2s from the plan outline: "How AI search finds local businesses", "What Google says about AI features…", and a 4-card "What our AI search optimization covers" (content clarity, entity and schema work, local signals, citation tracking). Measurement is Search Console, AI referral traffic and a citation log. The plan FAQs are answered (special optimization, GEO vs SEO, ChatGPT via OpenAI's OAI-SearchBot). A sources block cites Google's AI features page, OpenAI's crawler page and the paper. |
| F14, F23 | Content writing: one service name ("SEO content writing") in eyebrow, H2s, FAQ, links and CTA, so "Content SEO" is gone. Location pages, blog posts, people-first content, E-E-A-T (expanded, trust most important) and doorway pages (a new H2 citing Google's spam policies) are added. Interviews and SERP review are in the process, and the volume/turnaround FAQ is a placeholder. Plan FAQs are answered. |
| F15 | Ecommerce: "Product and Offer structured data" card (a nested Offer with price and currency is required for merchant listings, availability recommended), "GA4 ecommerce tracking" in the Report step (view_item, add_to_cart, purchase), Google Merchant Center defined, a Shopify vs WooCommerce table, and plan FAQs answered (Shopify, category vs product first, Merchant Center). |
| F16 | SEO audit price and turnaround are now one named placeholder each (`AUDIT_PRICE`, `AUDIT_TURNAROUND`), used in both the table and the FAQ. They stay placeholders until the owner supplies them. |
| F18 | Central entity in ≥ 40% of H2s on every page. Examples: "What technical SEO is", "Technical SEO handoff to your developer", "What SEO content writing is", "SEO content we write for Edmonton businesses", "Avoiding Business Profile suspensions". |
| F19 | "Edmonton, Alberta" appears once in each page's hero lead. |
| F20 | Review wording on local SEO and GBP: ask every customer, reply to each review, no incentives and no asking only happy customers (Maps contribution policy, verified). |
| F21 | All three JSON pages: hero and CTA buttons now read "Get a free SEO audit" → `free-seo-audit` (were "Get a free SEO review"/"Book a free review" → contact). Each page also has an inline {{free SEO audit}} link. |
| F22 | Service process steps renamed to the site's Audit → Plan → Build → Report on local SEO, ecommerce and AI (hub was already aligned). Content writing keeps its own Research → Brief → Write → Publish because it is a writing workflow. |
| F24 | Price questions point to the one source: local SEO cost FAQ → the Local package on `/pricing/`. No new price values. |
| F25 | `FREE_AUDIT_FORMAT` = "[[Short video or PDF]]" and `FREE_AUDIT_TURNAROUND` = "[[0]] business days" constants in `services.ts` use the same strings as `content/core.ts`. Owner fills them once; core.ts could import or match them (other agent's file). |
| F26, F34, F41 | Local SEO H2 renamed "Local SEO and Google's three ranking factors". It links "how Google ranks local businesses" (blog), and its body was cut from 100 words to under 90 per block. The SEO audit page links the "how to choose an SEO agency" post. The AI page links the AI Overviews post. |
| F27 | Map Pack is defined on first use (local SEO, GBP, SEO audit table). NAP is expanded on every page that uses it. GEO is defined. |
| F30, F31 | Every cards, checklist, table, steps, links and FAQ section on these pages now has an `intro`. Card, checklist, table, steps and links intros open with a bold direct answer. FAQ intros are topic lists, replacing the default "questions … ask us most". Every table has an intro (hub, GBP, link building, content, ecommerce, AI, on-page; the on-page placeholder intro moved to a callout). |
| F36, F39 | Each service page's hero lead links home with `{{Edmonton SEO services\|}}`. Plan internal_links were added: industries per plan, including not-yet-built ones (locksmiths, med-spas, accountants, realtors, immigration-lawyers, appliance-repair), which turn into links when built. JSON pages gained industry links sections and inline links. |
| F40 | Ecommerce gets an inline link from technical SEO's platforms paragraph and from the hub table. It now passes the ≥ 3 inbound check. |
| F43 | Google Ads and website design are not linked from these pages. |
| F45 | Local SEO FAQs added: cost, "Is SEO dead now with AI?" (Google: indexed + snippet-eligible), "Where can I find SEO services in Edmonton?" and the 80/20 rule (framed as a rule of thumb). Timeline answer now opens with a direct answer. |
| F46 | SEO audit: a new "What is an SEO audit?" H2 with a definition and an "audit" disambiguation (not a financial audit). New FAQs: cost (placeholder), "Can ChatGPT do an SEO audit?", where to find SEO services and the 80/20 rule. |
| F50 | No claims of clients, results or reviewers were added. Case-study callouts stay placeholders. Citation tracking frequency is a placeholder. |
| F51 | "anonymised" → "anonymized" in all service placeholders. "summarize", "neighbourhood" and "enquiries" checked. |
| seo:check writing warnings | "search engine optimization (SEO)" is now expanded on all 10 pages. The boolean on-page FAQ starts with "Yes". Templated H2s ("Industries we help with", "Services that work well alongside", "What you receive from") are now unique per page through `industriesHeading`/`relatedHeading` in `svc()`. |

## Facts verified (WebFetch, 2026-10-22)

- Google Search Central, AI features and your website: no additional requirements or special optimizations. A page must be indexed and eligible to show with a snippet. No AI text files or special schema. Indexing and serving are not guaranteed. Keep Merchant Center and Business Profile up to date. AI feature traffic is included in the Search Console Performance report.
- GBP Help 7091: relevance, distance, prominence. "More reviews and positive ratings can help your business's local ranking." No way to pay for a better local ranking. Retail stores can show in-store products.
- Maps contribution policy: no incentives, and businesses must not "discourage or prohibit negative reviews, or selectively solicit positive reviews".
- GBP guidelines 3038177: no extra keywords in the name, no virtual offices or remote mailboxes, service-area businesses hide the address, one profile per location, suspension for violations.
- Spam policies: doorway abuse (pages targeted at regions or cities that funnel users to one page), scaled content abuse, the link spam examples, and "may rank lower in results or not appear in results at all".
- Creating helpful content: E-E-A-T, trust most important, no preferred word count.
- Merchant listing structured data: `offers` (Offer) required, with price and priceCurrency required and availability recommended.
- GA4 ecommerce events (view_item, add_to_cart, begin_checkout, purchase …).
- Merchant Center Help 188924: a free tool to show products across Google.
- Shopify Help: automatic sitemap.xml, themes include structured data.
- OpenAI bots page: sites opted out of OAI-SearchBot are not shown in ChatGPT search answers.
- arXiv 2311.09735: "GEO: Generative Engine Optimization", Aggarwal et al., November 16, 2023.

## Scores (`npm run onpage`, before = docs/data/onpage/latest.json at the start of this pass)

| Page | Before | After |
|---|---|---|
| /services/ | 83 | 100 |
| /services/local-seo/ | 89 | 100 |
| /services/google-business-profile-optimization/ | 73 | 100 |
| /services/technical-seo/ | 93 | 98 (keyword volume 0, owner decision) |
| /services/on-page-seo/ | 87 | 98 (keyword volume 0, owner decision) |
| /services/link-building/ | 80 | 100 |
| /services/seo-audit/ | 87 | 100 |
| /services/content-writing/ | 58 | 100 |
| /services/ecommerce-seo/ | 62 | 98 (keyword volume 0, owner decision) |
| /services/ai-search-optimization/ | 73 | 100 |

`npm run seo:check`: no errors on service pages. One site warning remains: "HVAC" is not expanded on local SEO and GBP. It comes from the HVAC industry card (nav label in `content/industries.ts`), not from the service copy.

## Owner decisions left open

1. Zero-volume primaries (technical SEO, on-page SEO, ecommerce SEO): keep them, change them, or record the exception (F7.5).
2. AI page primary: "ai search optimization" (450) or "ai seo services" (800). "AI SEO services" is now used once in the body (F7.6).
3. Prices on service pages (F45): the local SEO cost FAQ links to the Local package on `/pricing/`. SEO audit price and turnaround stay placeholders (`AUDIT_PRICE`, `AUDIT_TURNAROUND`).
4. Placeholders to fill: free audit format and turnaround (same strings as core.ts), suspension recovery offered?, supported platforms (technical SEO), content volume and turnaround, AI citation tracking frequency, and the real proof callouts on every service page.
5. The plan's `internal_links` for "/" use the anchor "our Edmonton SEO team". This pass used "Edmonton SEO services", as instructed. Align the plan if that anchor should stay.
6. `plan/scripts/gen_plan.py` still holds the old titles, H1s and metas. A regeneration would revert the plan entries changed here.
