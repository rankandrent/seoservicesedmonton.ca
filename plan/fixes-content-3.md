# Content fixes from audit 2026-10-23, pass 3 of 3 (industries)

Scope: `content/industries.ts` (hub + HVAC, plumbers, electricians, contractors, roofers, law firms, dentists). In `plan/content-plan.json`, only `title`, `h1` and `meta` (plus the derived `title_len` and `meta_len`) of these 8 entries changed. Every other field of those entries matches HEAD.

## Finding → change

| Finding | Change |
|---|---|
| F1 / keyword field | Every page has `keyword` set to the plan primary: `seo for local businesses edmonton` (hub), `plumbing seo`, `electrician seo`, `hvac seo`, `contractor seo`, `roofing seo`, `law firm seo` and `dental seo`. `industry()` passes it to the Page, so meta keywords start with it. |
| F2 | Titles start with the exact keyword, then " \| ". All are 44–60 characters, carry Edmonton and have no colon. Examples: "HVAC SEO Edmonton \| Win Every Furnace Season" and "Law Firm SEO Edmonton \| Compliant Lawyer SEO". The hub uses "SEO for Local Businesses Edmonton \| Trades, Legal, Health". Each H1 carries the exact keyword joined with a comma ("Plumbing SEO in Edmonton, for Plumbers Who Want More Calls"). Each description is 145–160 characters, opens with the exact keyword and ends with "Get a free SEO audit" (the hub keeps the audit's proposed text). Each lead opens with "<keyword> is search engine optimization (SEO) for …", so the keyword sits in the first 60 words. |
| F3 | The FAQ H2 "SEO for X: FAQ" is now "<Keyword> FAQ" (law firms: "Law firm and lawyer SEO FAQ"). There is no colon in any title or H1. |
| F9 | Law firms: "Compliant Lawyer SEO" is in the title and H1, and "SEO for lawyers" is in the lead. |
| F10 | Each Map Pack cards section has an `intro` that names relevance, distance and prominence and says which two the page works on. The wording is different on every page. |
| F11 | Each page now covers its missing entities. HVAC: "electric furnace" (a search row, plus gas and electric furnace pages). Plumbers: EPCOR, "frozen and burst pipes" and "Google reviews". Law: "Code of Conduct Rule 4.2-1" (rule text verified) and "YMYL content". Dentists: Alberta Dental Association (represents dentists; the CDSA regulates them) and "new patient booking". Roofers: COR "earned through a certifying partner such as the Alberta Construction Safety Association" (verified on alberta.ca), plus ice dams. Electricians: "Alberta Master Electrician certificate" and "residential vs commercial electrical". On all 7 pages the Business Profile card names the plan's literal "GBP primary category: "X"" and "Google reviews". |
| F18 | All 10 H2s are written per industry. The central entity is in ≥ 40% of H2s (on-page `h2-share` passes on all 7 pages), and every H2 is followed by a bold one-sentence answer of ≤ 30 words. |
| F19 | "Edmonton, Alberta" appears once in each lead, hub included. |
| F20 | `reviewsAnswer()` ("Ask every happy customer…") is removed. Each page has its own review FAQ and card: ask every customer or client, reply to every review, no payment, discounts or other rewards, and never ask only happy customers. This follows the Google Maps user-generated content policy, fetched 2026-10-22: "selectively solicit positive reviews", "incentive offered by a business". The policy is cited in every page's sources. The law and dental answers add confidentiality: never confirm that the reviewer was a client or patient. |
| F21 | Hero and CTA buttons on all 8 pages are "Get a free SEO audit" → `free-seo-audit`. CTA headings and text are written per industry. |
| F27 | The Map Pack is defined in each lead ("the three businesses Google shows on a map above the regular results"). NAP, GBP, WCB, COR, CDCP and CDSA are expanded on first use. HVAC is expanded on the HVAC page and the hub. The plumbers page no longer prints "HVAC" (its sibling link anchor is "SEO for furnace companies"). |
| F30 / F31 | The checklist, cards, links and FAQ sections all have an `intro`. Each table intro is one real sentence that names the industry, and the proof placeholder sits after it. The hub links sections have answer-style intros. |
| F38 | Each page's 2nd section (`why`) has inline links near the top: `{{Edmonton SEO services|}}` (home), `services/local-seo`, and per the plan GBP optimization, on-page SEO or link building. Each also links one sibling: plumbers → HVAC → electricians → plumbers, contractors ↔ roofers, law firms ↔ dentists. That gives electricians, contractors and roofers their first inline inbound links. Lower on the page, FAQ answers link plan targets: google-ads-management (HVAC), ai-search-optimization (law), technical-seo, content-writing and link-building (HVAC), pricing (law), and the choosing-an-agency post (HVAC, law). |
| F47 | HVAC FAQs added: "What is HVAC SEO?", "What SEO services are available for HVAC companies?" and "What is an SEO contractor?". The last uses Google's own hiring questions, re-fetched from "Do you need an SEO?". "Top 10 SEO companies" is skipped, as the audit advised. |
| F48 | Law firm FAQs added: "Does SEO work for law firms?" (starts "Yes."), "Which SEO company is best for law firms?" (criteria plus the choosing-an-agency post), and timeline split by channel (Map Pack first, organic later; no borrowed numbers). Also added: AI search (Google AI Overviews, ChatGPT, Gemini, Perplexity), cost (links /pricing/, no invented figures), and reviews under Law Society rules. AI Overview entities covered: structured data, Core Web Vitals, backlinks, topical authority, call tracking, missed calls/intake and cost per lead (new results-table rows). The law page's attributes now include hours, device/urgency and review themes. |
| F51 | "anonymised" in placeholders is now "anonymized". "Client Inquiries" is gone, and the site uses "enquiries". |
| F52 | Regulator facts were re-checked on 2026-10-22 on the regulator's own sites (below). Electricians now say "only a Master Electrician certified by the Safety Codes Council can obtain an electrical permit, homeowners aside", citing ALIS. This replaces the unverified "Alberta requires one to run an electrical contracting business". Contractors now give the prepaid contracting licence conditions from alberta.ca, citing that page. GBP primary categories stay worded as "check / confirm the closest match": Google publishes no category list to verify against. |
| F54 (swap test) | 1. **H2s:** each page has its own heading set (`h` object). `seo:check` now reports **no templated-H2 warnings** for industry pages; before, there were 8: "why need local", "what your customers search", "how we get into the map pack", "trust signals trades", "results you can measure", "services we use", "get more calls from google", "serving and nearby towns". 2. **Section order:** each page has its own `order` (HVAC and roofers put seasonality second, law firms put the Law Society rules second, contractors and dentists put trust before the Map Pack). 3. **FAQs:** 6–8 per page, each phrased for the industry. Specific FAQs per industry: plumbers (24-hour listing, frozen pipe page); electricians (separate residential and commercial pages, Master Electrician certificate); HVAC (repair vs replacement first, plus PAA); contractors (prepaid licence, project page); roofers (page per hailstorm, insurance promises); law (Law Society reviews, AI search, cost, PAA); dentists (CDCP on the profile, CDSA rules for agency work). 4. **Distance paragraph:** the shared "Distance limits how far Map Pack rankings reach…" paragraph is replaced on each page by its own reach paragraph. 5. **Tables:** columns differ per page (by season for HVAC, by project type for contractors, by peak for roofers, residential/commercial for electricians, why-it-matters for plumbers, law and dentists). 6. **Card titles:** differ per page (Project pages, Practice-area pages, Treatment pages, Storm and roof pages …). |
| Honesty (implied clients) | "We work with <industry> across Edmonton…" is now "We offer <keyword> across…". "Hundreds of homeowners" (roofers) and "most new patients" (dentists) were softened, because there are no data for them. Law results rows that are not stated site offers ("cost per lead", "missed calls") are framed as "numbers worth tracking", not as our report. |
| Density | The exact keyword is 1.6–1.9% word share on every page (was up to 2.6% on law firms in the first draft). Bold answers and intros use the entity phrasing instead. |

## Regulator and policy facts verified (2026-10-22)

- **Law Society of Alberta, Code of Conduct, version 2026_V1 (September 1, 2026)** at `documents.lawsociety.ab.ca/wp-content/uploads/2017/01/14211909/Code.pdf`. The URL is still current and is linked from the Law Society's August 21, 2025 guidance. Rule 4.2-1 permits marketing that is "(a) demonstrably true, accurate and verifiable; (b) neither misleading, confusing or deceptive, nor likely to mislead…; (c) in the best interests of the public…". The commentary lists qualitative superiority, unjustified expectations, testimonials with emotional appeals, and amounts recovered (which need a past-results disclaimer). Rule 4.3-1 covers specialist claims. The Law Society guidance (`lawsociety.ab.ca/?p=29747`) says "leading", "top", "best" and "most experienced" are prohibited, and that Alberta does not certify specialists.
- **CDSA**: the advertising information page and the *Advertising Statement* (November 2023, PDF): "A regulated member shall not engage in advertising that is untruthful, inaccurate or otherwise capable of misleading…". It adds that owner, responsible and associate dentists must ensure compliance, including by "third-party organizations who may be assisting with advertising".
- **Alberta Dental Association**: it represents the profession, while the CDSA regulates it (albertadentalassociation.ca/about-us).
- **ALIS (Government of Alberta)**: "only Master Electricians awarded a Certificate of Competency by the Safety Codes Council are able to obtain electrical permits (other than homeowners)".
- **alberta.ca prepaid contracting licence**: required for a business that solicits, negotiates or concludes contracts away from its place of business and accepts money before all the work is done, for work on private dwellings.
- **alberta.ca COR certifying partners**: lists the Alberta Construction Safety Association for all construction industries.
- **Google Maps user-generated content policy** (support 7400114): prohibits paid or incentivized reviews and businesses that "discourage or prohibit negative reviews, or selectively solicit positive reviews".
- **Google "Do you need an SEO?"**: lists hiring questions, including examples of previous work and Search Essentials, and says "No one can guarantee a #1 ranking on Google."

## Results

On-page score: **before** is `docs/data/onpage/latest.json` as committed (2026-10-22T23:08Z); **after** is the run following this pass.

| Page | Before | After | Words before → after | Remaining miss |
|---|---|---|---|---|
| /industries/ | 67 | 96 | 311 → 442 | slug-keyword (URL cannot carry the keyword) |
| /industries/plumbers/ | 69 | 98 | 1,002 → 1,616 | slug-keyword ("plumbers" ≠ "plumbing") |
| /industries/dentists/ | 76 | 98 | 871 → 1,487 | slug-keyword ("dentists" ≠ "dental") |
| /industries/hvac/ | 84 | 100 | 981 → 1,602 | none |
| /industries/roofers/ | 84 | 98 | 883 → 1,409 | slug-keyword ("roofers" ≠ "roofing") |
| /industries/contractors/ | 87 | 100 | 938 → 1,435 | none |
| /industries/electricians/ | 87 | 100 | 928 → 1,514 | none |
| /industries/law-firms/ | 89 | 100 | 935 → 1,844 | none |

The slug misses stay, because changing a planned URL is the owner's call. `seo:check` reports 0 errors and 0 warnings on industry pages, including no templated-H2 warning. Remaining site warnings belong to other files (HVAC unexpanded on two service pages; head term in the about/contact title and H1).

## Open for the owner

- Proof placeholders on every page: dated Map Pack screenshots, seasonal data and anonymized results.
- Confirm whether Google Ads management and website design are offered (plumbers, HVAC and roofers list them; the link renders only once the page exists).
- A practising Alberta lawyer and a dentist should review the law and dental pages (plan `eeat.reviewer`).
- GBP primary category names: confirm them in a live Business Profile before launch.
