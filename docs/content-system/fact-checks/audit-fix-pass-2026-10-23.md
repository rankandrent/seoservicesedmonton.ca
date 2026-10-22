# Fact-check: audit fix pass (2026-10-23)

Scope: every factual claim added or changed in `git diff 0a45daa..HEAD -- content` (core.ts, blog.ts incl. the
3 rewritten posts, services.ts, services-more.json, industries.ts, cases.ts). Sources fetched 2026-10-22/23.
QA was editing in parallel: fixes below quote the **working tree as of this run**. Where QA already fixed a
HEAD problem, it is marked "resolved in working tree". Fact-checker did not edit any content file.

## VERDICT: FAIL (6 honesty fixes, 5 accuracy and consistency fixes). Every Google, regulator and paper claim checked below is TRUE.

## A. Claims checked and TRUE

| # | Claim (where) | Verdict | Source |
|---|---|---|---|
| 1 | Local results based mainly on relevance, distance, prominence. Definitions. Prominence includes links and review count. More reviews and positive ratings can help. No way to request or pay for better ranking. If the searcher doesn't share a location, Google uses what it knows (blog, home, local-seo, GBP, industries) | TRUE | https://support.google.com/business/answer/7091?hl=en |
| 2 | Verification makes the profile more likely to show. Complete and accurate info more likely to show. Replying shows you value feedback. Photos and videos. In-store products for eligible retailers (blog) | TRUE | same |
| 3 | Virtual office not eligible. SAB should hide address. "As few categories as possible". Unnecessary info in name not permitted. Special hours (blog, how-we-work, GBP page) | TRUE | https://support.google.com/business/answer/3038177?hl=en |
| 4 | Review incentives (payment, discounts, free goods) prohibited. Selectively soliciting positive reviews not allowed (blog, industries FAQs, local-seo) | TRUE (selective soliciting is in the "Rating manipulation" section of the same page) | https://support.google.com/contributionpolicy/answer/7400114?hl=en |
| 5 | Review link or QR code (blog step 4) | TRUE | https://support.google.com/business/answer/3474122?hl=en |
| 6 | Buying/selling links for ranking = link spam. Excessive link exchanges and automated link programs listed. Low-quality directory links listed. rel=sponsored/nofollow OK. Violating sites may rank lower or not appear. Doorway: "pages targeted at specific regions or cities that funnel users to one page". Scaled content abuse covers content however made (blog, link-building, content-writing, how-we-work) | TRUE | https://developers.google.com/search/docs/essentials/spam-policies |
| 7 | AI features: no additional requirements or special optimizations. Indexed + eligible with snippet. Not guaranteed. Query fan-out. AI Overviews vs AI Mode descriptions. No new machine-readable/AI text files or markup. No special schema.org. Clicks "higher quality", more time on site. All 7 best practices incl. page experience, structured data matches visible text, Merchant Center/Business Profile, Search Console. Performance report "Web" type. nosnippet/data-nosnippet/max-snippet/noindex (blog post 2, ai-search page) | TRUE | https://developers.google.com/search/docs/appearance/ai-features |
| 8 | E-E-A-T, "trust is most important". People-first. No preferred word count. YMYL gets more weight. Raters don't rank pages directly (how-we-work, content-writing, law-firms) | TRUE | https://developers.google.com/search/docs/fundamentals/creating-helpful-content |
| 9 | "Do you need an SEO?": earlier the better, redesign/new site. Owner ultimately responsible. Full list of what an SEO can do incl. "Optimizing for generative AI". The 8 interview questions quoted verbatim (the page has more, and the table does not claim all of them). No one can guarantee #1. Never have to link to an SEO. Be wary of out-of-the-blue emails. Link popularity schemes / thousands of search engines. Server access → explain changes (blog post 3, about, terms, seo-audit) | TRUE | https://developers.google.com/search/docs/fundamentals/do-i-need-seo |
| 10 | Core Web Vitals used by ranking systems. Relevance first ("most relevant content, even if the page experience is sub-par") | TRUE | https://developers.google.com/search/docs/appearance/page-experience |
| 11 | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, 75th percentile of page loads, field data | TRUE | https://web.dev/articles/vitals |
| 12 | Ecommerce structured data list: Product/ProductGroup, Review, BreadcrumbList, Organization, LocalBusiness, VideoObject | TRUE | https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce |
| 13 | Merchant listings require nested Offer with price + currency. Availability recommended. ProductGroup for variants | TRUE | https://developers.google.com/search/docs/appearance/structured-data/merchant-listing |
| 14 | Merchant Center is free. Products show across Search, Maps, YouTube | TRUE | https://support.google.com/merchants/answer/188924?hl=en |
| 15 | GA4 ecommerce events view_item, add_to_cart, purchase | TRUE | https://developers.google.com/analytics/devguides/collection/ga4/ecommerce |
| 16 | GEO paper: "GEO: Generative Engine Optimization", Aggarwal et al., arXiv 2311.09735, Nov 2023, introduces the term | TRUE | https://arxiv.org/abs/2311.09735 |
| 17 | OpenAI: sites opted out of OAI-SearchBot are not shown in ChatGPT search answers | TRUE (OpenAI adds they can still appear as navigational links; the page's "no one can guarantee" framing is fine) | https://developers.openai.com/api/docs/bots |
| 18 | LSA Code Rule 4.2-1 (a)–(c): demonstrably true, accurate and verifiable, not misleading. Commentary: qualitative superiority, testimonials with emotional appeals, raising expectations unjustifiably, amount recovered/past success needs "past results are not necessarily indicative" statement. Rule 4.3-1 specialist only if certified by the Society. Code version 2026_V1, September 1, 2026 | TRUE (read via r.jina.ai text proxy of the Law Society PDF) | https://documents.lawsociety.ab.ca/wp-content/uploads/2017/01/14211909/Code.pdf |
| 19 | LSA marketing guidance (Aug 21, 2025): "best", "top", "leading", "most experienced" prohibited. Specialist/expert prohibited. "Alberta does not certify specialists" | TRUE | https://www.lawsociety.ab.ca/?p=29747 |
| 20 | CDSA: advertising must not be "untruthful, inaccurate or otherwise capable of misleading" (HPA s.102). Owner, responsible and associate dentists must ensure compliance incl. third-party organizations. 2023 statement is the one CDSA links | TRUE | https://cdsab.ca/wp-content/uploads/2023/11/CDSA-Advertising-Statement-2023.pdf, https://cdsab.ca/public-protection/advertising-information/ |
| 21 | ADA represents dentists. CDSA regulates | TRUE | https://www.albertadentalassociation.ca/about-us/ |
| 22 | Only Master Electricians with a Safety Codes Council Certificate of Competency can obtain electrical permits, homeowners aside | TRUE | https://alis.alberta.ca/occinfo/certifications-in-alberta/electrical-contractor-master-electrician |
| 23 | COR = Certificate of Recognition. ACSA is a certifying partner | TRUE | https://www.alberta.ca/find-certifying-partner |
| 24 | EPCOR is Edmonton's water utility (a water main break is EPCOR's, while a private service line is the owner's, so "when" is the right hedge). ATCO distributes natural gas in the Edmonton region | TRUE | epcor.com / atco.com (news coverage confirms both roles) |
| 25 | Leduc, Nisku & Wetaskiwin Regional Chamber exists | TRUE | https://www.leduc.ca/business/commercial-industrial/business-associations |
| 26 | Court of King's Bench of Alberta, Alberta Court of Justice (current names). GBP formerly Google My Business. Shopify auto-generates sitemap.xml | TRUE | — |
| 27 | Illustrative examples in all 3 blog posts are labelled "illustrative example, not a client result/story" | PASS | blog.ts |
| 28 | Case study pages: every client fact a [[placeholder]], `draft: true`, `noindex: true` | PASS | cases.ts |
| 29 | Prices, free-audit turnaround/format, full-audit price/turnaround, contract term all single-source [[placeholders]] (PRICE / FREE_AUDIT constants) | PASS | core.ts, services.ts |

## B. Fixes required (exact current text → replacement)

### Honesty (any one = FAIL)

**F1. content/core.ts:137 (team page description). Claims real names are shown, but `content/people.ts` PEOPLE is empty.**
- Current: `Meet the Edmonton SEO team behind our work, with real names, roles and experience, and the local search topics each strategist and specialist knows best.`
- Replace: `Meet the Edmonton SEO team behind our work. Each person is added with their name, role and experience once they have approved their own bio.`

**F2. content/core.ts:140 (team page hero lead). The page states real people with real experience, but no person is listed.**
- Current: `Our Edmonton SEO team is made of real people with real experience in local search engine optimization (SEO) for businesses in Edmonton, Alberta. Every bio on this page is written and approved by the person it describes, and each person works on our {{Edmonton SEO services|}}.`
- Replace: `This page introduces the people behind our local search engine optimization (SEO) work for businesses in Edmonton, Alberta. Each bio is added only once the person it describes has written and approved it, and each person listed works on our {{Edmonton SEO services|}}. [[Add the team members and their approved bios.]]`

**F3. content/core.ts:125, 145, 148. These lines describe staffing (a strategist plus technical, content, local and outreach specialists) that the owner has not supplied. About already holds team size as a placeholder.**
- 125 current: `A named strategist owns your plan and your monthly review, supported by our technical, content and outreach specialists. You will know who they are before you sign.`
  → `[[Describe who works on a client account (roles and how many people), as supplied by the owner.]] You will know who they are before you sign.`
- 145 current: `**Our Edmonton SEO team\'s specialists cover technical SEO, content, local SEO and outreach, so each part of your plan has an owner.**`
  → `**Our Edmonton SEO team's work covers technical SEO, content, local SEO and outreach, and each person listed here shows which part they own.**`
- 148 current: `**On every account, one strategist leads, specialists do the work and you approve every change.**`
  → `**On every account, one named person owns your plan and you approve every change.**`
  (The "named person owns the plan" wording matches the About and how-we-work pages. Only the team-structure detail is dropped.)

**F4. content/core.ts:201 (contact intro). The agency's own Google Business Profile, address and phone are not supplied (the address is a [[placeholder]]).**
- Current: `our name, address and phone are the same as on our Google Business Profile.**`
- Replace: `our name, address and phone match our Google Business Profile.** [[Confirm once the agency's Business Profile is verified with this address and phone.]]`

**F5. content/cases.ts:12 and :14 (case-studies hub, linked from /about/). These lines claim results for clients, but no case study is published. Every case study is `draft` and `noindex`, and QA already moved the hero lead into the future tense.**
- 12 current: `SEO case studies from Edmonton businesses. See the starting point, what we changed and the measured results for each client.`
  → `SEO case studies from Edmonton businesses, each published only with the client's written permission, showing the starting point, the work and the measured results.`
- 14 current: `Real projects and measured results.`
  → `Client results, published with permission.`

**F6. services-more.json, content-writing FAQ: resolved in working tree.** At HEAD the answer read "No, people write every page… written, edited and fact-checked by a person". That is a first-person AI-use policy the owner has not supplied, because how-we-work still holds it as a [[placeholder]]. QA's working-tree text is acceptable: "Every page is planned, edited and fact-checked by a person and approved by you… [[State the AI-use policy…]]". Keep the placeholder until the owner fills the how-we-work policy. Then use the same words on both pages.

### Accuracy and consistency

**F7. content/industries.ts:437 (law firms, trust checklist). "Plus client consent" is not in the Rule 4.2-1 commentary. Consent comes from the confidentiality rule (Chapter 3).**
- Current: `An amount recovered or a past success needs a statement that past results do not predict future ones, plus client consent`
- Replace: `An amount recovered or a past success needs a statement that past results are not necessarily indicative of future results, and naming a client or their matter also needs the client's consent under the Code's confidentiality rules`
- Source: Code.pdf Rule 4.2-1 commentary [1], Rule 3.3-1.

**F8. content/industries.ts:307 and :333 (contractors). The licence trigger is narrower on the page than on Alberta.ca: soliciting or negotiating the contract in person away from your place of business also triggers it. Alberta.ca also lists exemptions.**
- 307 current: `when you take money before the work on a home is finished and agree the contract away from your place of business`
  → `when you take money before the work on a home is finished and solicit, negotiate or sign the contract in person away from your place of business, with some exemptions`
- 333 current: `when you take a deposit before the work on a home is finished and sign the contract away from your place of business.`
  → `when you take a deposit before the work on a home is finished and solicit, negotiate or sign the contract in person away from your place of business, with some exemptions.`
- Source: https://www.alberta.ca/prepaid-contracting-licence

**F9. content/industries.ts:298 and :303 (contractors). "Especially / very common in Edmonton" is a local frequency claim with no local primary source.**
- 298 current: `Basement development is especially common in Edmonton, alongside kitchen and bathroom renovation work and home additions.`
  → `Basement development, kitchen and bathroom renovation work and home additions are the core project types for Edmonton renovators.`
- 303 current: `very common in Edmonton and high value; the page should explain the building permit steps`
  → `a high-value project; the page should explain the City of Edmonton building permit steps`

**F10. content/industries.ts:102 and :106 (plumbers). "Most plumbing searches…" and "Most of these searches happen on a mobile device" are majority claims with no source.**
- 102 current: `because most plumbing searches are urgent, made on a phone and answered by the first three businesses in Google Maps.**`
  → `because many plumbing searches are urgent, made on a phone and answered by the first three businesses in Google Maps.**`
- 106 current: `Most of these searches happen on a mobile device, so the urgency level`
  → `Many of these searches happen on a mobile device, so the urgency level`

**F11. content/services.ts:117 and :303 ("Canpages"). The directory's current status could not be verified: canpages.ca returns 403, and the last primary statement about it dates from 2012, after the Yellow Pages acquisition. YellowPages.ca and Canada411 are the live Yellow Pages properties.**
- Replace `Canpages` with `Canada411` in both lines (`Yelp.ca, YellowPages.ca, Canada411, Clutch…`).
- Source: Yellow Pages Limited (operates YellowPages.ca and Canada411).

**F12. content/core.ts:60 (homepage). This line conflicts with the same page's 80/20 FAQ and with the four-step process.** The FAQ says "every engagement starts with an audit", and the process lists Audit as step 1 of every engagement.
- Current: `Most businesses start with an audit, then fix {{technical SEO|services/technical-seo}} problems before growth work.`
- Replace: `Every engagement starts with an audit, and most then fix {{technical SEO|services/technical-seo}} problems before growth work.`

## C. Notes (no fix required)
- The law-firm and dental industry pages cover legal and health marketing rules. Per the role file, a professional reviewer (`eeat.reviewer`, an Alberta lawyer and a dentist) should review them before launch. The how-we-work page already says that pages without a named reviewer do not claim a professional review.
- QA's working-tree edits were spot-checked: the free audit's "six areas" FAQ matches the checklist; how-we-work now reads "is to be written… reviewed by a second person". Both are acceptable as commitments, provided the owner really runs a second review before publishing.
- Advisory wording to consider: "Legal clicks are among the most expensive in Google Ads" (law-firms FAQ) has no cited source. "Reply to every review" (blog step 5) is stricter than Google's own tip, which says to avoid generic replies and reply where you add value. Neither is false.
