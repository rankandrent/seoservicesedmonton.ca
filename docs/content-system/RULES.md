# Content system rules (read by every content agent)

Site: seoservicesedmonton.ca, an SEO agency for Edmonton-area businesses (brand name still the
placeholder `BrandName`). Next.js 16 static export on a Cloudflare Worker. **Pre-launch:**
`indexable: false` in `content/site.ts`, so every page is `noindex, nofollow` until the owner launches.
Content lives in `content/*.ts` as Page objects; the topical map is the plan in `plan/`.

Every agent also follows the cross-project skill `.claude/skills/seo-patent-rules/SKILL.md`. Where this
file and the skill differ, the stricter rule wins, and the honesty rules beat everything.

## Topical map: plan/README.md and plan/content-plan.json

The plan is the topical map. Read `plan/README.md` (method, decisions, E-E-A-T, facts checked, open
questions) before any research, and the page's entry in `plan/content-plan.json` before writing it.
68 pages in 3 launch phases; each entry carries `url`, `type`, `phase`, `status`, `primary` (kw, volume,
kd), `secondary[]`, `title`, `h1`, `meta`, `central_entity`, `entities[]`, `attributes[]`, `ngrams`
(bigrams, trigrams), `skipgrams[]`, `faqs[]`, `outline[]`, `uniqueness`, `internal_links[]`, `schema[]`,
`about[]`/`mentions[]`/`area_served[]` (entities with verified `sameAs`), `service_type` and `eeat`.

```
                         homepage  (owns the whole head-term cluster)
                             │
   /services/<slug>/ ────────┼──────── /industries/<slug>/      /areas/<town>/
   (money pages)             │         (trades, legal,           (St. Albert, Sherwood Park,
                             │          professional, health)     Spruce Grove, Leduc, Fort Sask.)
                    /blog/<slug>/  (informational; each post links up to ONE money page)
```

Plan rules that are never broken:
1. **The homepage owns the head-term cluster**: "edmonton seo services", "seo services edmonton",
   "seo edmonton", "edmonton seo", "seo consultant edmonton", "seo company edmonton", "seo expert
   edmonton", "edmonton seo agency" (and the other `secondary` terms of the `/` entry). No other page uses
   them in its title or H1. `npm run seo:check` flags it.
2. **URLs**: `/services/[slug]/`, `/industries/[slug]/`, `/areas/[town]/`, `/blog/[slug]/`. Two levels
   at most. Legal practice areas are flat (`/industries/family-lawyers/`).
3. **No town × industry or town × service pages**, ever (Google spam policies: doorway pages). No Calgary
   or Red Deer pages. Small towns (Stony Plain, Beaumont, Morinville, Devon, Gibbons …) are named on the
   nearest area page, never given a URL.
4. **Swap test for area pages**: replace the town name; if the page still reads fine, rewrite it. Area
   pages need the owner's own map-pack research for that town (dated) before they are written.
   `seo:check` compares area pages with town names masked (limit 12% shared 5-grams).
5. **Industry pages**: most "[industry] seo edmonton" phrases have zero volume, so the primary is the
   national wording ("hvac seo", "dental seo") and "Edmonton" goes in the title, H1 and first paragraph.
6. **One primary keyword per page**, no two pages targeting the same term. Before choosing a keyword,
   check it against every `primary`/`secondary` in the plan and every `title`, `keyword` and H1 in
   `content/*.ts`.
7. **Blog posts** are informational, link up to one money page (service or industry), and never target a
   plan page's primary or the head-term cluster. Blog categories (`/blog/plumbers/`) wait until each has
   3+ posts.
8. Phase order: build Phase 2 before Phase 3 unless the owner says otherwise. Open questions in
   `plan/README.md` ("Open questions") are the owner's to decide; never decide them in a page.

## How content is stored (this repo, not markdown)

- A page is a `Page` object (`content/types.ts`): `slug`, `nav_label`, `title` (meta title), `description`,
  `keyword`, `card`, `icon`, `illus`, `photo`, `page_type`, `crumbs`, `service`, `audience`, `area`,
  `article` (publish date, adds BlogPosting), `updated` (shows the byline and sets dateModified),
  `author`/`reviewer` (slugs in `content/people.ts`, real people only), `tag`, `noindex`, `draft`, and an
  ordered `sections[]`.
- Inline marks in any text: `[[placeholder]]` (shows dotted, for data the owner must supply),
  `**bold**`, `{{link text|slug}}` (internal: `services/local-seo`, with `#anchor` allowed; external: a
  full `https://` URL). Links to pages that do not exist yet render as plain text and turn into links
  automatically once the page exists, so plan-ahead links are fine.
- Section types (`components/sections.tsx`): `page_hero` (eyebrow, h1, lead, cta), `split` (eyebrow,
  heading, body[], bullets[], visual: illus | serp | map | code | cards, vdata), `cards` (items {icon,
  title, text, link}), `steps` (items [title, text]), `checklist` (items, or [title, detail]), `table`
  (heading, intro, cols, rows), `faq` (items [q, a]; feeds FAQPage schema), `prose` (blocks: h2, h3, p, ul,
  callout, src = sources list), `posts`, `links`, `cta`, `statement`, `quote`, `stats`, `meta`,
  `feature_cards`, `service_list`, `why`, `testimonial` and the core-page types. Each section's `heading`
  renders as an H2.
- Where pages live: core pages `content/core.ts`, services `content/services.ts` (+
  `services-more.json`), industries `content/industries.ts`, case studies `content/cases.ts` (drafts until
  real), blog `content/blog.ts`, people `content/people.ts`. Area pages (Phase 2) go in a new
  `content/areas.ts` registered in `content/index.ts` (`AREA_PAGES` picks them up).
- **A new blog post** = a new Page object appended to `PAGES` in `content/blog.ts` (slug
  `blog/<slug>`, `crumbs: [['Blog','blog']]`, `article` and `updated` dates, `tag`, `card`, `illus`
  and/or `photo`, `keyword`), AND its slug added to the blog hub's `posts` section `items` (newest
  first). Build the post from sections: `page_hero` → `prose` blocks → visual sections (`table`, `steps`,
  `checklist`, `split`) where they help → `faq` → `prose` with a `src` block (sources) → `posts` (related)
  → `cta`.
- **A new service / industry / area page** = a Page object at the plan's URL in the right file, built
  from that plan entry (title, h1, meta, outline, entities, FAQs, internal_links, schema fields come from
  `lib/plan.ts` automatically by URL).
- **Plan status**: when a page object is added, set its plan entry `status` to `"built"`; after launch
  (or, post-launch, when it ships indexable) set `"live"`. The plan is generated by
  `plan/scripts/gen_plan.py` + `augment_plan.py`; add or update the matching `page(...)` call there too
  (new blog posts go in its `BLOG` list) so a regeneration keeps it, and record the page in
  `docs/content-system/ledger.json → pages[]`.
- Briefs and review reports live in `docs/content-system/briefs/<slug>.json` (brief, with `url`),
  `<slug>.qa.md`, `<slug>.facts.md`, `<slug>.visuals.json`.

## Keywords, meta and entities (owner rules, apply to every new page)

1. **Verified search volume first.** A page's primary keyword has verified volume above 0 from the
   Ahrefs API (`$AHREFS_API_KEY`, **country `ca`**) or Google Search Console impressions for the exact
   query (figure + date range). Semrush (database `ca`) is a third option. The brief records `volume`,
   `kd`, `dataSource` and the date. The plan's Ahrefs figures (2026-10-23, `plan/ahrefs-ca-*.tsv`) count
   as verified; plan entries with `volume: null` (most blog posts, "not checked (budget)") do NOT, so the
   researcher checks them before writing. Never estimate. No number → stop and report "no volume data".
2. **Primary keyword in every meta surface**: meta title, meta description, the first meta keyword,
   og:title, og:description, the H1 and the first 60 words. og:title/og:description copy the page `title`
   and `description` (components/page-view.tsx), and `<meta name="keywords">` is built from the page's
   `keyword` field first (then the plan's keywords), so the `keyword` field must be the exact primary
   keyword. If a build ever lacks the meta keywords tag, report it as a template gap, not a page fix.
3. **Titles: exact keyword first, never a colon** (owner rule, final). The meta title starts with the
   exact primary keyword, word for word, then " | " and a short benefit (e.g. "Local SEO Edmonton | Rank in
   Google Maps"). Never a ":" in the meta title, og:title, H1 or a card title. The H1 carries the exact
   keyword joined with plain words or a comma. ≤ 60 characters. `seo:check` errors on a colon.
4. **AI Overview + People Also Ask** (owner rule). For the primary keyword, the brief records
   `aiOverview` (present?, cited source URLs, the entities, attributes, key terms and questions in the
   cited passages) and `paa` (the questions). Source: Ahrefs `serp-overview` (country `ca`; rows typed
   `ai_overview`/`ai_overview_sitelink` = AI Overview sources, `question` = PAA) plus WebFetch of every
   cited page. The page covers every AI Overview entity/attribute/term with a real fact and answers every
   PAA question in an H2/H3 or FAQ, first sentence = direct answer. One missing item fails QA. Never copy
   wording; answer better.
5. **Entity and attribute coverage**: ≥ 80% of the plan/brief `entities` and ≥ 70% of `attributes` in
   visible text, each with a fact or explanation, never a list of names. Also use the plan's `ngrams`
   (≥ 70%) and put each `skipgrams` pair in the same sentence or list item (≥ 70%). The central entity
   leads: in the H1, the first 60 words, ≥ 40% of H2s, and mentioned more often than any single related
   entity. `npm run onpage` scores all of this.
6. **Protect live rankings** (owner rule, final). Once a page is live (after launch): its slug NEVER
   changes, and its meta title/og:title changes ONLY with the owner's explicit approval for that page.
   H1, body, sections, FAQs and links may be improved. `docs/content-system/locked-pages.json` records
   route → title of every live page and `seo:check` errors when a locked route disappears or its title
   changes. **Pre-launch nothing is locked** (the file stays empty while `indexable: false`), so titles
   can still be fixed now. After the owner approves a post-launch title change, edit that one entry in the
   same commit ("owner approved <date>").

## Concept bindings (patent US8126832B2; every NEW page)

1. **Binding table in the brief** for the central entity: `bindings` {synonyms (2–4), plural/variants,
   parent (1–2, usually the service or industry hub), children (3–6), related (3–6)}, all literal phrases
   the page prints. Use each synonym once, name the parent early, give each child its own H3, list item or
   table row.
2. **Composite concepts stay whole** ("Google Business Profile", "Core Web Vitals", "Map Pack", "Law
   Society of Alberta") and are defined in one sentence the first time.
3. **Essential concepts first**: 2–3 `essential` concepts (central entity + key attribute + qualifier,
   usually "Edmonton" or the industry). The first sentence under every H2 names the central entity (or a
   synonym) plus one other essential concept.
4. **Disambiguate**: "audit" (SEO audit vs financial audit), "ranking", "profile", "conversion",
   "St. Albert" (Alberta, not elsewhere), "Leduc" (city vs county) each get a context word in the same
   sentence.
5. **One intent, one answer, site-wide**: `queryVariants` (3–5) answered with ONE answer; prices,
   timelines, deliverables and process steps match the service page and every other page (`siteFacts`).
   On a conflict follow the money page and report it; never publish a third version.
6. **Suitability check (QA fails the page)** if a synonym, the parent or an essential concept is missing,
   an H2 opener lacks entity + essential concept, a composite concept is split, an ambiguous word lacks
   context, a query variant is unanswered, or a fact contradicts the money page.

## Layout-aware pages (patent US12393768B2)

1. Nothing important behind a click: only FAQs and navigation collapse.
2. Right block types: steps → `steps` or an ordered list, items → `checklist`/`ul`, comparisons and
   prices → `table` (with an `intro` sentence), explanatory pictures → `split` visuals or a figure with a
   caption. Every section heading is an H2 followed by its direct answer in text.
3. Order: definition/answer first, detail next, FAQ last. Bold only the direct answer and key terms.
4. Image–text fit: a visual sits next to the text it explains and names the same thing; no stock photo
   presented as our team, office or clients (the Unsplash photos are decorative until the owner supplies
   real ones).
5. Section text on service, industry and area pages stays dense: 50–70 words per paragraph block
   (90 at most), keeping named entities and attributes and cutting filler.

## Links (patents US6285999 PageRank, US9558233B1 click-validated)

- Every new page gets at least one contextual link from an existing relevant page (its hub/parent) in the
  same change; no orphans. Hubs list every child (`services`, `industries`, `areas` hubs, blog hub
  `posts`).
- Links follow the bindings: up to the parent, across to siblings, down to children. Anchors name the
  target's concept or a synonym (lower-case in running text), never "click here", one link per target per
  page body. Use the plan's `internal_links` (to, anchor) as the starting point.
- Blog posts: link up to their one money page early (first 300 words) and once near the end; sideways to
  same-cluster posts; industry or area pages only when genuinely relevant. Counts by funnel: BOFU 5–8,
  MOFU 6–10, TOFU 8–12 contextual links.
- Click-validated: put links in body sentences where the reader needs the next step, top to middle of
  the page. Once Search Console data exists (`docs/data/gsc/latest.json`), take source pages by clicks
  and impressions and find the sentence with `npm run links:find -- "<target>" "<phrase>"`. Keep
  conversion pages (contact, free audit) lean.
- External links: 2–5 per blog post, primary sources only (Google Search Central, Google Business Profile
  Help, regulators, statutes, Statistics Canada, City of Edmonton), each verified with WebFetch. No
  competitor agencies.

## Honesty and E-E-A-T (hard rules, any breach fails QA)

- **Nothing invented.** No fake people, reviews, ratings, testimonials, credentials, certifications,
  awards, client names or logos, results, case studies, stats, years in business, office addresses or
  memberships. Anything the owner has not supplied stays a `[[placeholder]]` until real, approved data
  replaces it (plan/README.md "Proof the business must supply before launch").
- Real people only in `content/people.ts`, with an approved bio; until then bylines show the plan's role
  placeholders (`eeat.author`, `eeat.reviewer`).
- Case studies stay `draft` + `noindex` and unlinked until real client data with written permission
  exists.
- No review schema for the agency's own reviews on its own site; review requests never offer incentives
  or gate reviews (Google Maps contribution policy). Never promise a #1 ranking or guaranteed results
  (Google: nobody can guarantee a #1 ranking).
- **Regulator facts are verified on the regulator's own site before they are stated**: Law Society of
  Alberta (Code of Conduct, rule 4.2-1 marketing), College of Dental Surgeons of Alberta (advertising
  standards), Real Estate Council of Alberta (RECA: brokerage name on every page), College of Physicians
  and Surgeons of Alberta, Physiotherapy Alberta, CPA Alberta, Alberta Security Services and Investigators
  Act (locksmith licences), EPEA pesticide applicator certification, Alberta Care-First auto insurance
  (collisions on or after January 1, 2027), City of Edmonton bylaws, Health Canada advertising rules. The
  plan's "Facts checked (2026-10-23)" list is a starting point, not a substitute for checking the current
  primary source. Legal and health pages get a reviewer from that profession (plan `eeat.reviewer`).
- Every content page sets `updated` (byline + dateModified) only when the content really changed, and
  lists its sources in a visible `src` block (the plan `eeat.sources` first).
- Use the plan `eeat` object: `experience_signals` become first-hand detail the owner supplies (or
  placeholders), `trust_signals` are stated plainly.

## Writing (Koray semantic SEO, Canadian English)

- **Canadian English**: colour, centre, neighbourhood, favourite, behaviour, honour, catalogue, cheque,
  licence (noun) / license (verb), travelled; -ize/-yze is fine (optimize, analyze). Prices in CAD
  ("$1,500 CAD" on first mention). Dates "October 23, 2026". Metric units.
- Reader: an owner or manager of an Edmonton-area trade, law firm, clinic or service business. Plain
  language, local detail (neighbourhoods, seasons, EPCOR/ATCO, permits, chambers) only when true and
  relevant.
- Each H2 is a question or a clear entity statement; the first sentence under it answers it directly in
  `**bold**`, one sentence, ≤ ~30 words. Then the how/why, then an example, number or step.
- One central entity per page; keyword density about 1–2% (word share), never stuffed.
- Expand an abbreviation the first time in visible text: "search engine optimization (SEO)", "Google
  Business Profile (GBP)", "name, address and phone number (NAP)".
- Boolean questions ("Is…", "Does…", "Can…") are answered starting with Yes or No.
- Banned: "Also,", "As mentioned", "According to" (cite instead), "should know", "In today's", "It is
  important to note", "In conclusion", "delve", "leverage", "seamless", "cutting-edge", "world-class",
  "game-changer", "unlock". Avoid hedges (might, perhaps, possibly); "may" only where the law or Google
  really says "may".
- Short paragraphs (2–4 sentences), concrete examples, steps where a process exists, a table where two
  options are compared. Every section ends with what the reader does next.

## Completeness (owner rule)

A page ships only when it is semantically complete: every heading fully answered (bold answer → detail →
example), every brief point, question, entity, attribute and n-gram covered with substance, no
unfinished paragraph, no FAQ answer under 2 sentences, every section ending with a next step. QA lists
each gap as guidance for the writer.

## Funnel and leads

- Blog posts set a funnel stage in the brief: TOFU (problem-aware, service-support ≥ 3), MOFU (comparing
  approaches, ≥ 4), BOFU (cost, choosing an agency, ≥ 5). Target mix per cluster 50 / 30 / 20.
- The goal of every page is a qualified enquiry (call, form, free audit). Offer only what the site
  already offers (free SEO audit, strategy call, contact form); never invent a package, price,
  turnaround or guarantee. Prices only from the owner (plan open question 4).

## Variety and learning

- Before writing, read `fingerprints.json`. A new post differs from the last 5 posts in its cluster and
  the last 3 site-wide in at least 4 of: type, intro style, H2 frames, section order, section types,
  visual types, CTA angle, list/table style. Never reuse an intro, closing or CTA sentence frame.
- Industry and area pages must not share templated H2s (`seo:check` warns when the same H2, with the
  page's own keyword removed, appears on 3+ pages).
- Every agent reads its `learnings/<agent>.md` before starting and appends 1–3 evidence-based lessons
  after finishing. Owner rules at the top of a learnings file (added with `/train-agent`) take priority
  over everything except the honesty rules.

## Competitors (out-do, never copy)

Track ranking competitors (Edmonton agencies, national publishers) in `docs/content-system/competitors.json`.
We may cover the same topic, never their text, outline order, examples, images or data. QA fails a page
whose 5-gram overlap with the brief's `beats` page is above 5%.

## Files each agent writes

| Agent | Writes |
|---|---|
| seo-keyword-researcher | `docs/content-system/briefs/<slug>.json` |
| semantic-content-writer | the Page object in `content/*.ts` (+ hub listing, plan status) |
| content-visual-designer | `docs/content-system/briefs/<slug>.visuals.json` (+ new illustrations in `content/illus.ts` when needed) |
| content-link-builder | links inside the page + `backlinkSuggestions` in the brief |
| content-qa | `docs/content-system/briefs/<slug>.qa.md` |
| fact-checker | `docs/content-system/briefs/<slug>.facts.md` |
| orchestrator (`/content-pipeline`) | applies fixes, publishes, `ledger.json`, `fingerprints.json`, plan status |
| onpage-seo-auditor | `docs/data/onpage/<date>.md` + safe fixes + lessons |
| site-seo-auditor | `docs/content-system/audits/<date>.md` + small safe edits + lessons |
| every agent | its own `docs/content-system/learnings/<agent>.md` |

## Checks every change must pass

```
npm run build && npm run seo:check -- --strict && npm run onpage && npm run typecheck
```

Pre-launch, plain `npm run seo:check` reports errors without failing (existing pages are still being
fixed); the content pipeline uses `--strict` and must add no new error. Name a draft route to check it
before it is published (`npm run seo:check -- --strict /blog/<slug>/`). New pages score ≥ 95 on
`npm run onpage -- /<route>/` (a named route is scored even as a draft).
