# Content fixes, pass 1 of 3 (core, blog, case studies)

Scope: `content/core.ts`, `content/blog.ts`, `content/cases.ts`, plus title/h1/meta of the changed pages in
`plan/content-plan.json`. Findings come from `plan/audit-2026-10-23.md`. Services and industries are other passes.

## Finding → change

| Finding | Change |
|---|---|
| F1 | `keyword` set on home (`edmonton seo services`), team (`edmonton seo team`), free audit (`free seo audit edmonton`), pricing (`seo pricing edmonton`), blog hub (`local seo blog`), AI post (`google ai overviews seo`), choosing post (`how to choose an seo agency`), case studies hub (`seo case studies`). About and contact left without one (F7). |
| F2 | New titles, H1s, descriptions and leads with the exact keyword: team, about, how-we-work (description), contact, free SEO audit, pricing, blog hub, all 3 posts. Post titles now follow "keyword \| benefit": "How Google Ranks Local Businesses \| Edmonton Guide", "How to Choose an SEO Agency \| Edmonton Buyer's Guide" (owner rule beats the audit's "keep"). |
| F3 | AI post title, H1 and nav label have no colon: "Google AI Overviews SEO \| What Google Tells Site Owners" / "Google AI Overviews SEO, What Google Actually Says". Plan entry updated. Case-study H1s have no colon. |
| F4 | All 3 blog descriptions rewritten (the audit's text, 146–150 chars). |
| F5 | Case drafts: neutral titles without brackets or brand ("Local Service SEO Case Study \| Edmonton Results", etc.), neutral nav labels, H1 "SEO Case Study, [[Client name]] and [[Headline result]]", descriptions without `BrandName` or `[...]`. Hub title "SEO Case Studies \| Edmonton Results", H1 "SEO Case Studies and Results". |
| F6 | Privacy and terms: 160-char descriptions and 30–60-char titles. |
| F8 | Home: "As an SEO company in Edmonton…", "the same SEO services Edmonton companies do…", FAQ "What does an Edmonton SEO agency do?" naming SEO consultant and SEO expert. |
| F17 | Choosing post covers Google Business Profile, the Map Pack and relevance/distance/prominence (step 4, checklist, table); AI post has an Edmonton example; all 3 follow the plan outline. |
| F18 | Home H2s: "Edmonton SEO services we offer", "How our Edmonton SEO services run", "Edmonton SEO services across the region", "Edmonton SEO services pricing" (5/10). Blog H2s name the central entity. |
| F19 | "Edmonton, Alberta" once in the lead of home, about, team, how-we-work, contact, free audit, pricing, blog hub, 3 posts and the case-studies hub. |
| F20 | Ranks post: ask every customer the same way, never only happy ones, never a reward; cites the contribution policy and Google's review tips. |
| F21 | Every "free review" CTA in blog and cases now says "Get a free SEO audit" → `/free-seo-audit/`. Home hero proof, contact and thank-you steps say "Free SEO audit". |
| F22 | About steps renamed to Audit, Plan, Build, Report (shared constants). Contact steps heading "What happens after you contact us". |
| F24 | One `PRICE` constant (per package + term) feeds packages, the pricing table, home FAQ and pricing FAQ. Ecommerce package lists "Business Profile management (optional)". |
| F25 | One exported `FREE_AUDIT` constant (turnaround, format) used 5 times on `/free-seo-audit/`. **services.ts (seo-audit table) should import it** in the services pass. |
| F26 | Home "How Google ranks local businesses" section links the post. |
| F27 | Map Pack defined on first use on home, free audit and the ranks post; NAP expanded on home/pricing packages and the free audit; HVAC expanded on home. |
| F30/F31 | `intro` (bold direct answer) added under every H2 followed by cards, lists, steps, tables, team, packages, contact, posts and FAQ on all core pages, the blog and the case pages (hub and drafts, including the "Measured results" table). Explicit FAQ intros replace the default "questions … ask us most" line. |
| F35 / F56 | All 3 posts and the blog hub have `updated: 2026-10-23` (byline + dateModified). No `author` set: `content/people.ts` is empty (F49). |
| F36/F37 | Home links to all 9 services (service list), inline to technical SEO, plus electrician, roofing and contractor SEO in the trades card. `{{Edmonton SEO services\|}}` up-links added to about, team, how-we-work, contact, free audit, pricing, case-studies hub; choosing post links "our Edmonton SEO team". |
| F40 | Pricing links ecommerce SEO; home posts intro and every post link the blog hub ("local SEO guides", "more guides"). Terms and team now have 3+ inbound content links. |
| F41 | Posts link each other, the free audit and choosing post link each other; the AI post links the ranks post. |
| F44 | Home FAQs added: where to find SEO services in Edmonton, the 80/20 rule (framed as a rule of thumb), Can ChatGPT do SEO (starts "No"). Cost FAQ uses the `PRICE` values. |
| F50 | Choosing post no longer says "we share case studies"; now "will share client results as soon as clients approve them". How-we-work: legal/health review is "to be reviewed", and pages without a named reviewer do not claim one; "each page shows when it was last updated" replaced by a true statement about guides. Home "our home base" → "Core service area"; contact no longer invites visits; about "today we work with…" → "our services are built for…". Combined-results stats intro is future tense. |
| F51 | Canadian spelling checked (favour, neighbourhood, practising, anonymized placeholders). seo:check shows no US spelling on these pages. |
| F53 | All 3 posts rewritten to the plan outline (What Google says → Step by step (`steps`) → comparison `table` → Common mistakes (`checklist`) → Edmonton example (marked illustrative) → FAQ (4, first sentence answers) → Sources), 1,444–1,574 rendered words. Every fact checked with WebFetch on Google's pages: local ranking (7091), Business Profile guidelines (3038177), review tips (3474122), Maps contribution policy, spam policies, AI features and your website, helpful content, Do you need an SEO? |
| other | SEO expanded on first use on every core and blog page; pricing "Is there a minimum contract?" (unanswerable boolean) → "What is the minimum contract term?"; about gains two FAQs (guarantees, ownership). |

## Left for the owner (not changed)

- **F7 keyword choices**: about has no keyword; contact still scores against plan "contact edmonton seo company" (63/100) and has no `keyword` (proposal: "contact our edmonton seo team"); blog post keywords have no verified volume (`keyword-volume` fails on all 3); pricing "seo pricing edmonton" volume 0; head-term warnings on about/contact titles ("edmonton seo").
- **F33 images**: Unsplash photos on home hero and blog thumbnails unchanged; no explanatory figure yet.
- **F49 placeholders**: prices (`PRICE`), contract term, "not included" rows, free-audit turnaround/format (`FREE_AUDIT`), address/phone/hours, team names, founding story, reviewers, AI-use policy, case-study data, anonymized client examples in the posts.
- Plan entries for the other 8 planned posts still hold colon titles/H1s (and `/blog/` `internal_links` anchors with colons); not edited because only changed pages were in scope.
- Case drafts keep shared template H2s (seo:check "templated H2" warnings on named-draft runs); they get rewritten when real data exists.
