# On-page SEO checklist (every page: home, services, industries, areas, blog, core pages)

Based on Semrush's on-page SEO checklist, adapted to this site's Page objects (`content/*.ts`) and the
plan (`plan/content-plan.json`). `npm run build && npm run onpage` scores every page that will be
indexable at launch against the automatable items (`docs/data/onpage/latest.json`, 0–100 per page);
the `onpage-seo-auditor` agent reviews the rest. Owner: the auditor; followed by the writer, enforced by QA.

| # | Item | Rule on this site | Where it lives | Auto-checked (id) |
|---|---|---|---|---|
| 1 | Target keyword | One primary keyword per page from the plan (`primary.kw`) or the brief; no two pages share it; homepage owns the head-term cluster | plan entry, page `keyword` | `keyword-volume`, seo:check head terms |
| 2 | Title tag | Starts with the exact keyword, then " \| " and a benefit; 30–60 chars; unique; no ":" | page `title` | `title-keyword`, `title-keyword-first`, `title-length`, `no-colon-title` |
| 3 | H1 | One H1, carries the exact keyword (plain words or a comma, no colon), says what the page is | `page_hero.h1` | `h1-keyword`, `one-h1` |
| 4 | Meta description | 110–160 chars, keyword natural, what the reader gets, a next step | page `description` | `desc-keyword`, `desc-length` |
| 5 | Meta keywords + OG | Page `keyword` field = primary keyword; first meta keyword = primary keyword; og:title and og:description carry it | template + `keyword` | `keyword-field`, `meta-keywords-keyword`, `og-keyword` |
| 6 | URL slug | Keyword words, ≤ 6 words, plan URL scheme, never changed once live | plan `url` | `slug-keyword`, `slug-short` |
| 7 | Keyword placement | Keyword in the first 60 words after the H1 | first section | `first-60-words` |
| 8 | Heading structure | ≥ 3 H2s, plan `outline` followed, every H2 opens with a bold direct answer | section headings | `h2-structure` |
| 9 | Entities and attributes | ≥ 80% plan entities, ≥ 70% attributes, each with a fact; central entity salience ≥ 75; ≥ 40% of H2s carry it | plan `entities`, `attributes` | `entity-coverage`, `entity-salience`, `h2-share`, `attribute-coverage` |
| 10 | N-grams and skip-grams | ≥ 70% plan n-grams used; ≥ 70% skip-gram pairs in one sentence or list item | plan `ngrams`, `skipgrams` | `ngram-coverage`, `skipgram-coverage` |
| 11 | Questions | Every plan FAQ, PAA and AI Overview question answered in an H2/H3 or FAQ | plan `faqs`, brief `paa` | `plan-faqs`, `faq` |
| 12 | Helpful, unique content | Answers fully (RULES.md Completeness), plan `uniqueness` angle delivered, swap test on area pages | body | `content-depth`, seo:check swap test |
| 13 | Internal links | ≥ 5 contextual links out on content pages, ≥ 3 pages linking in; descriptive, varied anchors | `{{text\|slug}}`, hubs | `internal-out`, `internal-in` |
| 14 | Visuals | Content pages ≥ 2, blog ≥ 3 visual blocks (illustration, SERP/map mockup, table, steps, checklist, figure); alt text on every image | sections | `visuals`, `img-alt` |
| 15 | Schema | Service / FAQPage / BlogPosting / BreadcrumbList / ProfessionalService from the template and plan | `lib/schema.ts`, plan | `schema`, `schema-article`, `faq` |
| 16 | E-E-A-T | Byline (author, reviewer, last updated), `dateModified`, sources block, real people only, placeholders until real | `updated`, plan `eeat` | `eeat-byline` (rest manual) |
| 17 | External sources | ≥ 2 verified primary sources on blog posts (Google docs, regulators) | `src` block, inline links | `external-sources` |
| 18 | Layout | Nothing important collapsed (FAQ only), every H2 followed by text, every table introduced, in-article images in figure + caption | sections | `no-hidden-content`, `h2-then-text`, `table-intro`, `figure-caption` |
| 19 | Canonical & OG image | On every page | template | `canonical`, `og-image` |
| 20 | Featured snippets / AI answers | Each section answers its question in the first sentence (≤ 30 words) | body | manual |
| 21 | Speed | Images < 150 KB, no layout shift, LCP < 2.5 s; no client JS (postbuild strips it) | `public/` | manual |
| 22 | Freshness | `updated` changes only when content changed; regulator facts re-checked every 6 months | page `updated` | manual |

Pages under 90 are fixed first. New pages publish only at ≥ 95.

## Owner additions

- [ ] Primary keyword has verified volume (Ahrefs country `ca` or Search Console), with source and date
- [ ] Keyword in meta title (first, then " | "), description, first meta keyword, og:title, og:description, H1, first 60 words
- [ ] No ":" in any title or H1
- [ ] AI Overview entities/attributes/terms and every PAA question covered (brief `aiOverview`, `paa`)
- [ ] ≥ 80% entities and ≥ 70% attributes covered in visible text, each with a fact or explanation
- [ ] Concept bindings: synonyms, parent, children, essential concepts, query variants (RULES.md)
- [ ] No main content behind a click; every H2 followed by its text answer; every table introduced
- [ ] Nothing invented; placeholders where the owner has not supplied data; regulator facts verified on the regulator's site
- [ ] Live page (after launch): slug unchanged, meta title unchanged unless the owner approved it
