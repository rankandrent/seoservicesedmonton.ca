# Site structure and semantic SEO plan

Plan for seoservicesedmonton.ca: 68 pages, every page with one primary keyword and a semantic brief. Built on 2026-10-23 from Danial Khan's structure doc (Oct 22), the keyword map spreadsheet, and Ahrefs data (Canada).

## Files

| File | What it is |
|---|---|
| `content-plan.json` | One object per page. The Next.js site and writers read this. |
| `ahrefs-ca-2026-10-23.tsv` | Raw Ahrefs volumes and difficulty (KD) for every keyword checked. |
| `entities.json` | Entity glossary: name, schema.org type and verified `sameAs` (Wikidata + Wikipedia) for 112 entities. |
| `keyword-map.tsv` | Text copy of the team's keyword map spreadsheet (titles, H1s, metas). |
| `scripts/gen_plan.py`, `scripts/augment_plan.py` | Regenerate the plan: `python3 plan/scripts/gen_plan.py plan && python3 plan/scripts/augment_plan.py plan`. |
| `README.md` | This file: method, decisions, open questions. |

### Page fields in `content-plan.json`

`url`, `slug`, `type`, `group`, `phase`, `status`, `primary` (kw, volume, kd), `secondary[]`, `title` (≤ 60 chars), `h1`, `meta` (110–160 chars), `breadcrumb[]`, `central_entity`, `entities[]` (name, type, note), `attributes[]` (entity → what to state about it), `ngrams` (bigrams, trigrams), `skipgrams[]` (term pairs), `faqs[]`, `outline[]` (h2 + h3s), `uniqueness`, `internal_links[]` (to, anchor), `schema[]`, `notes`.

JSON-LD fields (for the Next.js build):

- `about[]`: the page's central entities, each `{name, type, sameAs[]}`. Emit as `WebPage.about`.
- `mentions[]`: main related entities in the same shape. Emit as `WebPage.mentions`.
- `area_served[]`: places, same shape. Emit as `Service.areaServed` (and `ProfessionalService.areaServed` on the homepage).
- `service_type`: string for `Service.serviceType` (services, industries, areas, pricing, audit).
- `eeat`: `{author, reviewer?, experience_signals[], trust_signals[], sources[{title, url}]}`. Use for the byline, `author`/`reviewedBy`, `citation` and the visible Sources block.

`sameAs` is only filled when the Wikidata item was found through the Wikidata API and its description matched. Every Wikipedia URL was checked for HTTP 200 on 2026-10-23. Entities without a confident match have no `sameAs`.

## Decisions (final)

- **Geography:** Edmonton plus St. Albert, Sherwood Park, Spruce Grove, Leduc and Fort Saskatchewan. Smaller towns (Stony Plain, Beaumont, Morinville, Devon, Gibbons, etc.) are named on the nearest area page, never given their own URL. No Calgary or Red Deer pages and no town × industry pages.
- **URLs:** `/services/[slug]/`, `/industries/[slug]/`, `/areas/[town]/`, `/blog/[slug]/`. Maximum two levels. Legal practice areas are flat (`/industries/family-lawyers/`).
- **Extra services kept:** Ecommerce SEO and AI Search Optimization (Phase 2), on top of the doc's services.
- **Homepage owns the whole head-term cluster:** "edmonton seo services", "seo services edmonton", "seo edmonton", "edmonton seo", "seo consultant edmonton", "seo company edmonton", "seo expert edmonton", "edmonton seo agency". About 7,500 searches a month combined, KD 0–35. No other page uses these in its title or H1.

## How each primary keyword was chosen

1. Checked the doc's and the spreadsheet's wording plus common variants in Ahrefs (Canada).
2. Picked the variant with the most volume at reasonable difficulty.
3. Almost every "[industry] seo edmonton" phrase has **zero measured volume**. Those pages use the national wording as the primary (for example "hvac seo", 700/mo) and put "Edmonton" in the title, H1 and first paragraph, so they rank for both.

Notable choices:

| Page | Primary | Volume / KD | Why |
|---|---|---|---|
| Plumbers | plumbing seo | 90 / 8 | beats "plumber seo" (60) and "seo for plumbers" (40) |
| Electricians | electrician seo | 150 / 0 | ties with "seo for electricians"; both used |
| HVAC | hvac seo | 700 / 2 | strongest trade term |
| Contractors | contractor seo | 300 / 0 | "seo for contractors" (350) used as secondary |
| Law firms | law firm seo | 500 / 0 | "lawyer seo" (800, KD 7) as secondary in the title |
| Realtors | real estate seo | 350 / 3 | beats "realtor seo" (90) |
| Dentists | dental seo | 800 / 0 | biggest industry term found |
| Med spas | medical spa seo | 100 / 2 | beats "med spa seo" (80) |
| Areas | "[town] seo" | St. Albert 200, Sherwood Park 150, Spruce Grove 50, Fort Sask 40, Leduc 30 | shorter form beats "seo [town]" |
| AI search | ai search optimization | 450 / 37 | consider "ai seo services" (800 / 7) instead |

**Zero-volume pages** (kept for topical coverage, not traffic): technical SEO, on-page SEO, ecommerce SEO (Edmonton), carpenters, real estate lawyers, cleaning (Edmonton), painters (low). Carpenters and real estate lawyers are flagged as merge candidates.

## Semantic method

For every page:

- **Central entity:** the one thing the page is about (for example "SEO for HVAC companies in Edmonton").
- **Related entities:** the people, places, products, rules and organizations that a complete page about the topic would mention. Includes Google entities (Business Profile, Map Pack, Core Web Vitals), local entities (EPCOR, ATCO, City of Edmonton permits, chambers of commerce) and regulators (Law Society of Alberta, CDSA, RECA, CPA Alberta, Physiotherapy Alberta).
- **Attributes:** what the page must state about each entity (for example the GBP primary category, seasonality, licences, hours).
- **N-grams:** two- and three-word phrases to use naturally in headings and copy. Taken from Ahrefs keyword data and "also talk about" terms on top-ranking pages.
- **Skip-grams:** pairs of terms that should appear in the same sentence or paragraph, even with words between them (for example "furnace repair … no heat", "hail damage … insurance claim"). They tell Google how the entities relate.
- **Outline:** H2/H3 structure that covers the entities in a logical order.
- **Uniqueness:** the angle that keeps the page from being a template copy. Area pages must pass the **swap test**: replace the town name and if the page still reads fine, rewrite it.


## Method and sources

Is the plan built on Google patents? Partly, and only as a secondary layer. Every rule below is labelled with where it comes from:

- **(a) Google public documentation:** Google says this directly. These rules win.
- **(b) Google patent idea:** a possible mechanism described in a Google patent or patent application. A patent only shows that Google invented and protected a method; it does **not** show Google uses it in Search today, or ever did. We use these ideas only where they agree with (a). When they conflict, public guidelines win.
- **(c) Industry convention or third-party data:** common SEO practice or tool estimates, not from Google.

| Plan rule | Source | Where it comes from |
|---|---|---|
| Local pages built around relevance, distance and prominence | (a) | [Google Business Profile Help: How to improve your local ranking](https://support.google.com/business/answer/7091?hl=en) |
| No town × industry or town × service pages; area pages must pass the swap test | (a) | [Google Search Central: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) (doorway abuse) |
| Each page has a unique angle and first-hand detail; written for people, not keywords | (a) | [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| E-E-A-T: real authors, credentials, experience, trust pages | (a) | People-first content page above and Google's Search Quality Rater Guidelines (raters assess E-E-A-T; their ratings do not directly rank pages) |
| Review requests without incentives or gating | (a) | [Google Maps contribution policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en) |
| No review markup for the agency's own reviews on its own site | (a) | [Google review snippet docs](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) (self-serving reviews are not eligible) |
| Service, BreadcrumbList, FAQPage and LocalBusiness-type schema | (a) | [Google structured data docs](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) and schema.org |
| No special tricks for AI Overviews; normal SEO applies | (a) | [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) |
| Clear site structure, descriptive internal links, hubs linking to every child page | (a) | [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| N-gram lists and skip-gram pairs (related phrases appear together) | (b) | [US7536408B2, "Phrase-based indexing in an information retrieval system"](https://patents.google.com/patent/US7536408B2/en) describes finding phrases that predict other related phrases in a document. The skip-gram pairs are our own heuristic built on that idea. |
| `about` / `mentions` entities with Wikidata `sameAs` | (b) + schema.org | [WO2014089776A1, "Ranking search results based on entity metrics"](https://patents.google.com/patent/WO2014089776A1/en) (Google application) describes ranking with entities. `about`, `mentions` and `sameAs` are schema.org properties; Google documents no rich result for them, so treat them as help for understanding, not a ranking switch. |
| Each page adds something other pages on the topic do not (unique angle) | (b), agrees with (a) | [US11354342B2, "Contextual estimation of link information gain"](https://patents.google.com/patent/US11354342B2/en) scores documents by new information beyond what the user has seen. The people-first content guidance asks for original information too. |
| Hub-and-spoke clusters and consistent quality across the whole site | (b), loosely | [US9031929B1, "Site quality score"](https://patents.google.com/patent/US9031929B1/en) describes a site-level quality score. The patent is about site-level signals in general; linking it to topic clusters is our interpretation, not what the patent says. |
| One primary keyword per page; no two pages targeting the same term | (c) | Common practice to avoid pages competing with each other |
| Title ≤ 60 characters, meta 110–160 characters | (c) | Rule of thumb; Google truncates by pixel width and may rewrite titles and snippets |
| Search volumes and keyword difficulty | (c) | Ahrefs estimates (Canada, 2026-10-23), not Google data |

In short, the plan follows Google's public guidelines first. The patent ideas explain why the entity, phrase and unique-angle work may help, but none of them is a promise of how Google ranks pages.

## E-E-A-T

Experience, expertise, authoritativeness and trust get special attention across the site. Google uses these signals most for pages that affect money and safety, and this site writes for law firms and clinics too.

**Rule: nothing invented.** No fake people, reviews, ratings, credentials, awards, client logos, results or stats. Every such item stays a `[[placeholder]]` (shown on the page with a dotted underline) until the business supplies the real, approved detail.

### Proof the business must supply before launch

| Item | Who supplies it | Where it shows |
|---|---|---|
| Founder and team bios with real names, roles, years in SEO | Each person, approved by them | /about/, /team/, /team/[name]/ |
| Headshots (real, not stock) | Each person | /team/, /team/[name]/, blog bylines |
| Certifications (Google Analytics, Google Ads, etc.) with verify links | Each person | /team/[name]/ (`hasCredential`) |
| LinkedIn profile URLs | Each person | /team/[name]/ (`sameAs`) |
| Real office address, phone, hours (identical to GBP) | Owner | Footer, /contact/, /about/, homepage schema |
| Founding year and story | Founder | /about/ (`foundingDate`) |
| Client results with written permission (numbers, dates, source tool) | Clients via account manager | /case-studies/, service and industry pages |
| Google reviews from the agency's own GBP | Real clients | Homepage, /about/, /contact/, service pages (link to GBP, never copy fake ones) |
| Testimonials with name, business, town and permission | Real clients | Industry and area pages (quote block) |
| Association memberships (e.g. Edmonton Chamber of Commerce, town chambers) | Owner, only if real | /about/ (`memberOf`), footer |
| Map-pack research per town (dated screenshots) | SEO team | /areas/[town]/ |

### Pages that carry E-E-A-T

- **/about/**: story, values, team summary, credentials, process, real address. Links to /team/ and /how-we-work/.
- **/team/** and **/team/[name]/** (new): one author page per real person, with `Person` schema (`jobTitle`, `worksFor`, `knowsAbout`, `sameAs`, `hasCredential`). Blog bylines link here.
- **/how-we-work/** (new): process and editorial policy. Covers who writes and reviews, how facts are checked against primary sources, how AI tools are used (if at all), update schedule and corrections. Linked from the footer and every blog post.
- **Reviews and testimonials:** Google review summary near the top of the homepage and on /contact/; one relevant testimonial per industry and area page once real; never review schema for the agency's own reviews on its own site (Google ignores self-serving review markup).
- **Case studies:** client named (or anonymised with written permission), industry, town, start date, baseline numbers, what was done, results with source tool and date range, client quote with permission. Stay draft (noindex, unlinked) until real.

### Per-page `eeat` object

Every page in `content-plan.json` now has an `eeat` object:

- `author`: the role (and later the real person) who writes the page. Service pages: lead strategist. Industry pages: a strategist with clients in that industry. Area pages: the person who did that town's map-pack research. Blog posts: a named team member with an author page.
- `reviewer`: technical lead for technical pages; for legal and health industry pages, a practising professional is recommended; legal pages are reviewed by a lawyer.
- `experience_signals`: first-hand details to include (dated map-pack screenshots, anonymised before/after data, Edmonton-specific observations).
- `trust_signals`: cited Google docs, regulator rules followed, the guarantees we do **not** make, visible updated date.
- `sources`: primary sources to cite and link.

Schema the Next.js build should add: `Person` for authors (`author`, `reviewedBy`), `dateModified` on every page, and `Organization` details (`foundingDate`, `knowsAbout`, `memberOf`, `address`, `sameAs`) once real values exist.

## Launch phases

| Phase | Pages | Contents |
|---|---|---|
| 1 | 25 | 5 core, /team/, /team/[name]/ (one per person), /how-we-work/, services hub + 7 services, industries hub + 7 industries (HVAC, plumbers, electricians, contractors, roofers, law firms, dentists), 2 legal |
| 2 | 29 | content writing, ecommerce, AI search, 8 industries, areas hub + 3 towns, case studies hub, blog hub + 11 posts |
| 3 | 14 | website design and Google Ads (optional), 10 smaller industries, Leduc, Fort Saskatchewan |

Roofers and dentists moved into Phase 1 because the data shows strong demand (350 and 800). Blog categories (`/blog/plumbers/`) wait until each has 3+ posts.

## Facts checked (2026-10-23)

- Law Society of Alberta Code of Conduct, Rule 4.2-1: marketing must not be misleading.
- Alberta Care-First auto insurance: for collisions on or after January 1, 2027, most car-crash injury lawsuits are replaced by insurer benefits. Personal injury and physio pages are written around this.
- Locksmiths need a licence under Alberta's Security Services and Investigators Act; Google Ads requires advanced verification for locksmiths in Canada.
- College of Dental Surgeons of Alberta publishes advertising standards.
- RECA: a realtor's brokerage name must be clearly shown on every page of their website.
- City of Edmonton Bylaw 14600 (sidewalk snow and ice); City messaging says clear within 48 hours.
- Commercial pesticide applicators in Alberta need certification (EPEA).
- Greater Parkland Regional Chamber formed in 2020 from the Spruce Grove, Stony Plain and Wabamun chambers.
- Nisku Business Park (Leduc County) has 800+ businesses; Leduc, Nisku & Wetaskiwin Regional Chamber.
- Alberta Diagnostic and Treatment Protocols Regulation covers motor vehicle injury treatment.

## Still to verify before publishing

- Exact names: St. Albert & District Chamber of Commerce, Sherwood Park & District Chamber of Commerce, Fort Saskatchewan Chamber of Commerce.
- Exact Google Business Profile category names for each industry (listed per page).
- Blog post keywords were not checked in Ahrefs (budget).
- Area pages need Danial's own map-pack research per town before writing.

## Ahrefs usage

4,021 API units spent (107 keyword rows plus 110 related terms). About 5,180 units left on the key until 2026-11-09.

## Open questions

1. **About page keyword:** the spreadsheet gave About "edmonton seo agency". It shares a SERP with the homepage, so this plan moves it to the homepage. Agree?
2. **Carpenters and real estate lawyers:** zero measured volume. Merge into Contractors and Law Firms, or keep as Phase 3 pages?
3. **AI search primary:** "ai search optimization" (450, KD 37) or "ai seo services" (800, KD 7)?
4. **Pricing:** publish real CAD price ranges? The spreadsheet recommends it; the current site says "custom quote".
5. **Optional services:** does the agency actually sell website design and Google Ads management? If not, drop both pages.

## Entity glossary

Each entity once, with its verified `sameAs`. Source: Wikidata API lookups on 2026-10-23; every Wikipedia URL returned HTTP 200. "none found" means no confident match, so the build should emit the entity without `sameAs`.

| Key | Entity | schema.org type | Wikidata | Wikipedia |
|---|---|---|---|---|
| `accountant` | Accountant | Occupation | [Q326653](https://www.wikidata.org/wiki/Q326653) | [link](https://en.wikipedia.org/wiki/Accountant) |
| `ai-overviews` | AI Overviews | SoftwareApplication | [Q131861047](https://www.wikidata.org/wiki/Q131861047) | [link](https://en.wikipedia.org/wiki/AI_Overviews) |
| `alberta` | Alberta | AdministrativeArea | [Q1951](https://www.wikidata.org/wiki/Q1951) | [link](https://en.wikipedia.org/wiki/Alberta) |
| `court-of-justice-ab` | Alberta Court of Justice | GovernmentOrganization | [Q7252625](https://www.wikidata.org/wiki/Q7252625) | [link](https://en.wikipedia.org/wiki/Alberta_Court_of_Justice) |
| `industrial-heartland` | Alberta's Industrial Heartland | Place | [Q4711557](https://www.wikidata.org/wiki/Q4711557) | [link](https://en.wikipedia.org/wiki/Alberta's_Industrial_Heartland) |
| `ardrossan` | Ardrossan | Place | [Q4788262](https://www.wikidata.org/wiki/Q4788262) | [link](https://en.wikipedia.org/wiki/Ardrossan,_Alberta) |
| `atco` | ATCO | Organization | [Q4654592](https://www.wikidata.org/wiki/Q4654592) | [link](https://en.wikipedia.org/wiki/ATCO) |
| `backlink` | Backlink | Thing | [Q373952](https://www.wikidata.org/wiki/Q373952) | [link](https://en.wikipedia.org/wiki/Backlink) |
| `beaumont` | Beaumont | City | [Q253903](https://www.wikidata.org/wiki/Q253903) | [link](https://en.wikipedia.org/wiki/Beaumont,_Alberta) |
| `bon-accord` | Bon Accord | Place | [Q3323039](https://www.wikidata.org/wiki/Q3323039) | [link](https://en.wikipedia.org/wiki/Bon_Accord,_Alberta) |
| `botox` | Botulinum toxin | Thing | [Q4095199](https://www.wikidata.org/wiki/Q4095199) | - |
| `cra` | Canada Revenue Agency | GovernmentOrganization | [Q1032002](https://www.wikidata.org/wiki/Q1032002) | [link](https://en.wikipedia.org/wiki/Canada_Revenue_Agency) |
| `cdcp` | Canadian Dental Care Plan | GovernmentService | [Q124668980](https://www.wikidata.org/wiki/Q124668980) | [link](https://en.wikipedia.org/wiki/Canadian_Dental_Care_Plan) |
| `crea` | Canadian Real Estate Association | Organization | [Q5030520](https://www.wikidata.org/wiki/Q5030520) | [link](https://en.wikipedia.org/wiki/Canadian_Real_Estate_Association) |
| `canonical` | Canonical link element | Thing | [Q1033568](https://www.wikidata.org/wiki/Q1033568) | [link](https://en.wikipedia.org/wiki/Canonical_link_element) |
| `carpenter` | Carpenter | Occupation | [Q154549](https://www.wikidata.org/wiki/Q154549) | [link](https://en.wikipedia.org/wiki/Carpenter) |
| `cpa-canada` | Chartered Professional Accountant | Thing | [Q5086848](https://www.wikidata.org/wiki/Q5086848) | [link](https://en.wikipedia.org/wiki/Chartered_Professional_Accountant) |
| `chatgpt` | ChatGPT | SoftwareApplication | [Q115564437](https://www.wikidata.org/wiki/Q115564437) | [link](https://en.wikipedia.org/wiki/ChatGPT) |
| `chiropractic` | Chiropractic | Thing | [Q658096](https://www.wikidata.org/wiki/Q658096) | [link](https://en.wikipedia.org/wiki/Chiropractic) |
| `cdsa` | College of Dental Surgeons of Alberta | Organization | none found | - |
| `cpsa` | College of Physicians and Surgeons of Alberta | Organization | [Q5146803](https://www.wikidata.org/wiki/Q5146803) | [link](https://en.wikipedia.org/wiki/College_of_Physicians_and_Surgeons_of_Alberta) |
| `janitor` | Commercial cleaning | Thing | [Q2590801](https://www.wikidata.org/wiki/Q2590801) | [link](https://en.wikipedia.org/wiki/Commercial_cleaning) |
| `concrete` | Concrete | Thing | [Q22657](https://www.wikidata.org/wiki/Q22657) | [link](https://en.wikipedia.org/wiki/Concrete) |
| `content-marketing` | Content marketing | Thing | [Q558685](https://www.wikidata.org/wiki/Q558685) | [link](https://en.wikipedia.org/wiki/Content_marketing) |
| `conveyancing` | Conveyancing | Thing | [Q759815](https://www.wikidata.org/wiki/Q759815) | [link](https://en.wikipedia.org/wiki/Conveyancing) |
| `copywriting` | Copywriting | Thing | [Q624896](https://www.wikidata.org/wiki/Q624896) | [link](https://en.wikipedia.org/wiki/Copywriting) |
| `core-web-vitals` | Core Web Vitals | Thing | [Q104618838](https://www.wikidata.org/wiki/Q104618838) | - |
| `kings-bench-ab` | Court of King's Bench of Alberta | GovernmentOrganization | [Q5178402](https://www.wikidata.org/wiki/Q5178402) | [link](https://en.wikipedia.org/wiki/Court_of_King's_Bench_of_Alberta) |
| `cpa-alberta` | CPA Alberta | Organization | none found | - |
| `dentist` | Dentist | Occupation | [Q27349](https://www.wikidata.org/wiki/Q27349) | [link](https://en.wikipedia.org/wiki/Dentist) |
| `dentistry` | Dentistry | Thing | [Q12128](https://www.wikidata.org/wiki/Q12128) | [link](https://en.wikipedia.org/wiki/Dentistry) |
| `devon` | Devon | Place | [Q2105198](https://www.wikidata.org/wiki/Q2105198) | [link](https://en.wikipedia.org/wiki/Devon,_Alberta) |
| `digital-marketing` | Digital marketing | Thing | [Q1323528](https://www.wikidata.org/wiki/Q1323528) | [link](https://en.wikipedia.org/wiki/Digital_marketing) |
| `divorce-act` | Divorce Act | Legislation | [Q5284664](https://www.wikidata.org/wiki/Q5284664) | [link](https://en.wikipedia.org/wiki/Divorce_Act_(Canada)) |
| `ecommerce` | E-commerce | Thing | [Q484847](https://www.wikidata.org/wiki/Q484847) | [link](https://en.wikipedia.org/wiki/E-commerce) |
| `eeat` | E-E-A-T | Thing | [Q121693513](https://www.wikidata.org/wiki/Q121693513) | - |
| `edmonton` | Edmonton | City | [Q2096](https://www.wikidata.org/wiki/Q2096) | [link](https://en.wikipedia.org/wiki/Edmonton) |
| `edmonton-chamber` | Edmonton Chamber of Commerce | Organization | none found | - |
| `edmonton-airport` | Edmonton International Airport | Airport | [Q269588](https://www.wikidata.org/wiki/Q269588) | [link](https://en.wikipedia.org/wiki/Edmonton_International_Airport) |
| `edmonton-metro` | Edmonton Metropolitan Region | Place | [Q1133254](https://www.wikidata.org/wiki/Q1133254) | [link](https://en.wikipedia.org/wiki/Edmonton_Metropolitan_Region) |
| `electrician` | Electrician | Occupation | [Q165029](https://www.wikidata.org/wiki/Q165029) | [link](https://en.wikipedia.org/wiki/Electrician) |
| `epcor` | EPCOR Utilities | Organization | [Q5323849](https://www.wikidata.org/wiki/Q5323849) | [link](https://en.wikipedia.org/wiki/EPCOR_Utilities) |
| `express-entry` | Express Entry | Thing | [Q55137548](https://www.wikidata.org/wiki/Q55137548) | [link](https://en.wikipedia.org/wiki/Express_Entry) |
| `family-law` | Family law | Thing | [Q384014](https://www.wikidata.org/wiki/Q384014) | [link](https://en.wikipedia.org/wiki/Family_law) |
| `fort-saskatchewan` | Fort Saskatchewan | City | [Q1007407](https://www.wikidata.org/wiki/Q1007407) | [link](https://en.wikipedia.org/wiki/Fort_Saskatchewan) |
| `furnace` | Furnace (central heating) | Thing | [Q843596](https://www.wikidata.org/wiki/Q843596) | [link](https://en.wikipedia.org/wiki/Central_heating) |
| `garage-door` | Garage door | Thing | [Q627405](https://www.wikidata.org/wiki/Q627405) | [link](https://en.wikipedia.org/wiki/Garage_door) |
| `general-contractor` | General contractor | Occupation | [Q289612](https://www.wikidata.org/wiki/Q289612) | [link](https://en.wikipedia.org/wiki/General_contractor) |
| `geo` | Generative engine optimization | Thing | [Q134083964](https://www.wikidata.org/wiki/Q134083964) | [link](https://en.wikipedia.org/wiki/Generative_engine_optimization) |
| `gibbons` | Gibbons | Place | [Q2650984](https://www.wikidata.org/wiki/Q2650984) | [link](https://en.wikipedia.org/wiki/Gibbons,_Alberta) |
| `google-ads` | Google Ads | SoftwareApplication | [Q271982](https://www.wikidata.org/wiki/Q271982) | [link](https://en.wikipedia.org/wiki/Google_Ads) |
| `google-analytics` | Google Analytics | SoftwareApplication | [Q220577](https://www.wikidata.org/wiki/Q220577) | [link](https://en.wikipedia.org/wiki/Google_Analytics) |
| `gbp` | Google Business Profile | SoftwareApplication | [Q21235252](https://www.wikidata.org/wiki/Q21235252) | [link](https://en.wikipedia.org/wiki/Google_My_Business) |
| `gemini` | Google Gemini | SoftwareApplication | [Q116698014](https://www.wikidata.org/wiki/Q116698014) | [link](https://en.wikipedia.org/wiki/Google_Gemini) |
| `google-maps` | Google Maps | SoftwareApplication | [Q12013](https://www.wikidata.org/wiki/Q12013) | [link](https://en.wikipedia.org/wiki/Google_Maps) |
| `merchant-center` | Google Merchant Center | SoftwareApplication | [Q136907153](https://www.wikidata.org/wiki/Q136907153) | - |
| `google-search` | Google Search | SoftwareApplication | [Q9366](https://www.wikidata.org/wiki/Q9366) | [link](https://en.wikipedia.org/wiki/Google_Search) |
| `search-console` | Google Search Console | SoftwareApplication | [Q328216](https://www.wikidata.org/wiki/Q328216) | [link](https://en.wikipedia.org/wiki/Google_Search_Console) |
| `health-canada` | Health Canada | GovernmentOrganization | [Q1057591](https://www.wikidata.org/wiki/Q1057591) | [link](https://en.wikipedia.org/wiki/Health_Canada) |
| `heat-pump` | Heat pump | Thing | [Q131313](https://www.wikidata.org/wiki/Q131313) | [link](https://en.wikipedia.org/wiki/Heat_pump) |
| `home-appliance` | Home appliance | Thing | [Q212920](https://www.wikidata.org/wiki/Q212920) | [link](https://en.wikipedia.org/wiki/Home_appliance) |
| `painter-decorator` | House painter and decorator | Occupation | [Q288728](https://www.wikidata.org/wiki/Q288728) | [link](https://en.wikipedia.org/wiki/House_painter_and_decorator) |
| `https` | HTTPS | Thing | [Q44484](https://www.wikidata.org/wiki/Q44484) | [link](https://en.wikipedia.org/wiki/HTTPS) |
| `hvac` | HVAC | Thing | [Q1798773](https://www.wikidata.org/wiki/Q1798773) | [link](https://en.wikipedia.org/wiki/Heating,_ventilation,_and_air_conditioning) |
| `immigration-law` | Immigration law | Thing | [Q231147](https://www.wikidata.org/wiki/Q231147) | [link](https://en.wikipedia.org/wiki/Immigration_law) |
| `ircc` | Immigration, Refugees and Citizenship Canada | GovernmentOrganization | [Q1056074](https://www.wikidata.org/wiki/Q1056074) | [link](https://en.wikipedia.org/wiki/Immigration,_Refugees_and_Citizenship_Canada) |
| `landscaping` | Landscaping | Thing | [Q8070591](https://www.wikidata.org/wiki/Q8070591) | [link](https://en.wikipedia.org/wiki/Landscaping) |
| `law-firm` | Law firm | Thing | [Q613142](https://www.wikidata.org/wiki/Q613142) | [link](https://en.wikipedia.org/wiki/Law_firm) |
| `law-society-ab` | Law Society of Alberta | Organization | [Q6503092](https://www.wikidata.org/wiki/Q6503092) | [link](https://en.wikipedia.org/wiki/Law_Society_of_Alberta) |
| `lawyer` | Lawyer | Occupation | [Q40348](https://www.wikidata.org/wiki/Q40348) | [link](https://en.wikipedia.org/wiki/Lawyer) |
| `leduc` | Leduc | City | [Q1207513](https://www.wikidata.org/wiki/Q1207513) | [link](https://en.wikipedia.org/wiki/Leduc,_Alberta) |
| `leduc-county` | Leduc County | AdministrativeArea | [Q6512776](https://www.wikidata.org/wiki/Q6512776) | [link](https://en.wikipedia.org/wiki/Leduc_County) |
| `leduc-no1` | Leduc No. 1 | Thing | [Q6512778](https://www.wikidata.org/wiki/Q6512778) | [link](https://en.wikipedia.org/wiki/Leduc_No._1) |
| `link-building` | Link building | Thing | [Q1569371](https://www.wikidata.org/wiki/Q1569371) | [link](https://en.wikipedia.org/wiki/Link_building) |
| `local-seo` | Local search engine optimisation | Thing | [Q30324357](https://www.wikidata.org/wiki/Q30324357) | [link](https://en.wikipedia.org/wiki/Local_search_engine_optimisation) |
| `locksmith` | Locksmith | Occupation | [Q2304418](https://www.wikidata.org/wiki/Q2304418) | [link](https://en.wikipedia.org/wiki/Locksmithing) |
| `medical-spa` | Medical spa | Thing | none found | - |
| `morinville` | Morinville | Place | [Q1746026](https://www.wikidata.org/wiki/Q1746026) | [link](https://en.wikipedia.org/wiki/Morinville) |
| `mover` | Moving company | Thing | [Q1757263](https://www.wikidata.org/wiki/Q1757263) | [link](https://en.wikipedia.org/wiki/Moving_company) |
| `mls` | Multiple listing service | Thing | [Q1597905](https://www.wikidata.org/wiki/Q1597905) | [link](https://en.wikipedia.org/wiki/Multiple_listing_service) |
| `nisku` | Nisku | Place | [Q1743865](https://www.wikidata.org/wiki/Q1743865) | [link](https://en.wikipedia.org/wiki/Nisku) |
| `north-sask-river` | North Saskatchewan River | Place | [Q2237](https://www.wikidata.org/wiki/Q2237) | [link](https://en.wikipedia.org/wiki/North_Saskatchewan_River) |
| `online-review` | Online review | Thing | [Q5196473](https://www.wikidata.org/wiki/Q5196473) | [link](https://en.wikipedia.org/wiki/Customer_review) |
| `parkland-county` | Parkland County | AdministrativeArea | [Q7138563](https://www.wikidata.org/wiki/Q7138563) | [link](https://en.wikipedia.org/wiki/Parkland_County) |
| `ppc` | Pay-per-click | Thing | [Q29778](https://www.wikidata.org/wiki/Q29778) | [link](https://en.wikipedia.org/wiki/Pay-per-click) |
| `perplexity` | Perplexity AI | Organization | [Q124333951](https://www.wikidata.org/wiki/Q124333951) | [link](https://en.wikipedia.org/wiki/Perplexity_AI) |
| `personal-injury` | Personal injury | Thing | [Q1459068](https://www.wikidata.org/wiki/Q1459068) | [link](https://en.wikipedia.org/wiki/Personal_injury) |
| `pi-lawyer` | Personal injury lawyer | Occupation | [Q6585303](https://www.wikidata.org/wiki/Q6585303) | [link](https://en.wikipedia.org/wiki/Personal_injury_lawyer) |
| `pest-control` | Pest control | Thing | [Q2306047](https://www.wikidata.org/wiki/Q2306047) | [link](https://en.wikipedia.org/wiki/Pest_control) |
| `physiotherapy` | Physical therapy | Thing | [Q186005](https://www.wikidata.org/wiki/Q186005) | [link](https://en.wikipedia.org/wiki/Physical_therapy) |
| `plumber` | Plumber | Occupation | [Q252924](https://www.wikidata.org/wiki/Q252924) | [link](https://en.wikipedia.org/wiki/Plumber) |
| `real-estate-agent` | Real estate agent | Occupation | [Q519076](https://www.wikidata.org/wiki/Q519076) | [link](https://en.wikipedia.org/wiki/Real_estate_agent) |
| `reca` | Real Estate Council of Alberta | GovernmentOrganization | [Q7300903](https://www.wikidata.org/wiki/Q7300903) | [link](https://en.wikipedia.org/wiki/Real_Estate_Council_of_Alberta) |
| `renovation` | Renovation | Thing | [Q2144402](https://www.wikidata.org/wiki/Q2144402) | [link](https://en.wikipedia.org/wiki/Renovation) |
| `robots-txt` | robots.txt | Thing | [Q80776](https://www.wikidata.org/wiki/Q80776) | [link](https://en.wikipedia.org/wiki/Robots.txt) |
| `roofer` | Roofer | Occupation | [Q552378](https://www.wikidata.org/wiki/Q552378) | [link](https://en.wikipedia.org/wiki/Roofer) |
| `schema-org` | Schema.org | Thing | [Q3475322](https://www.wikidata.org/wiki/Q3475322) | [link](https://en.wikipedia.org/wiki/Schema.org) |
| `seo` | Search engine optimization | Thing | [Q180711](https://www.wikidata.org/wiki/Q180711) | [link](https://en.wikipedia.org/wiki/Search_engine_optimization) |
| `serp` | Search engine results page | Thing | [Q2704141](https://www.wikidata.org/wiki/Q2704141) | [link](https://en.wikipedia.org/wiki/Search_engine_results_page) |
| `sherwood-park` | Sherwood Park | Place | [Q3476253](https://www.wikidata.org/wiki/Q3476253) | [link](https://en.wikipedia.org/wiki/Sherwood_Park) |
| `shopify` | Shopify | Organization | [Q7501150](https://www.wikidata.org/wiki/Q7501150) | [link](https://en.wikipedia.org/wiki/Shopify) |
| `sitemaps` | Sitemaps | Thing | [Q1343954](https://www.wikidata.org/wiki/Q1343954) | [link](https://en.wikipedia.org/wiki/Sitemaps) |
| `small-business` | Small business | Thing | [Q1109680](https://www.wikidata.org/wiki/Q1109680) | [link](https://en.wikipedia.org/wiki/Small_business) |
| `snow-removal` | Snow removal | Thing | [Q3044530](https://www.wikidata.org/wiki/Q3044530) | [link](https://en.wikipedia.org/wiki/Snow_removal) |
| `spruce-grove` | Spruce Grove | City | [Q1013456](https://www.wikidata.org/wiki/Q1013456) | [link](https://en.wikipedia.org/wiki/Spruce_Grove) |
| `st-albert` | St. Albert | City | [Q939127](https://www.wikidata.org/wiki/Q939127) | [link](https://en.wikipedia.org/wiki/St._Albert,_Alberta) |
| `stony-plain` | Stony Plain | Place | [Q1744021](https://www.wikidata.org/wiki/Q1744021) | [link](https://en.wikipedia.org/wiki/Stony_Plain,_Alberta) |
| `strathcona-county` | Strathcona County | AdministrativeArea | [Q1768240](https://www.wikidata.org/wiki/Q1768240) | [link](https://en.wikipedia.org/wiki/Strathcona_County) |
| `sturgeon-county` | Sturgeon County | AdministrativeArea | [Q7628998](https://www.wikidata.org/wiki/Q7628998) | [link](https://en.wikipedia.org/wiki/Sturgeon_County) |
| `web-design` | Web design | Thing | [Q190637](https://www.wikidata.org/wiki/Q190637) | [link](https://en.wikipedia.org/wiki/Web_design) |
| `woocommerce` | WooCommerce | SoftwareApplication | [Q15855099](https://www.wikidata.org/wiki/Q15855099) | [link](https://en.wikipedia.org/wiki/WooCommerce) |
| `wcb-ab` | Workers' Compensation Board of Alberta | GovernmentOrganization | [Q43895184](https://www.wikidata.org/wiki/Q43895184) | - |
