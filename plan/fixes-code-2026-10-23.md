# Code fixes from audit 2026-10-23

Template and code findings only. The content fixes (core.ts, services.ts, services-more.json, industries.ts, blog.ts, cases.ts, site.ts) come in a separate pass.

| Finding | Change |
|---|---|
| F28, F36 | `lib/render.tsx`: the `MARKS` regex and `strip()` now accept an empty slug (`{{text\|}}`), so the text links to `/`. Both `rich()` and `strip()` use the new pattern, and so do schema and llms.txt through `strip()`. |
| F1 | `lib/plan.ts`: new `keywordsFor()`. `metadataFor()` emits `<meta name="keywords">` with the page `keyword` first (or the plan primary if the page has none), then the plan's secondary keywords. Placeholders and duplicates are skipped. About has no keyword yet, so it gets no meta keywords. |
| og parity, F5 | `metadataFor()` runs title and description through `strip()` (inline marks never reach the head) and passes exactly the same strings to the title, description, og and twitter tags. It logs a build warning when an indexable page's title or description still holds a placeholder. og:site_name and the image alt leave out `BrandName`. Article pages get `article:published_time` and `article:modified_time`. |
| F29 | `Steps` renders `<ol class="steps">` with `<li class="step">`. The CSS resets list styles, and the step number is `aria-hidden`. |
| F30, F31 | Every section that follows an H2 already renders an optional `intro` through `Head` (cards, checklist, table, links, posts, service_list, feature_cards, steps, packages, stats, team, jobs, faq, contact). `Why` now renders one too. The content pass only needs to add `intro` values. |
| F42 | `components/sections.tsx`: new `anchorFor(slug)`. It replaces "View" (Links), "Learn more" (ServiceList, and Cards when no `link_label` is set) and "Continue reading"/"Read case study" (Posts) with anchors taken from the target page, with no colons. Examples: "SEO for plumbers", "Local SEO services", "Read How to Choose an SEO Agency in Edmonton", "Meet our Edmonton SEO team". The 404 button now reads "Browse our SEO services". |
| F21 (code part) | The default `Cta` button is now "Get a free SEO audit" and links to `free-seo-audit`. CTAs with their own button text in content are unchanged. |
| F32 | `app/globals.css`: the reveal styles only hide content under `html.js .reveal:not(.in)`, so pages are fully visible without JS. An inline head script in `app/layout.tsx` adds `js` before first paint. It has a `data-keep` attribute so `scripts/postbuild.ts` does not strip it. `main.js` also adds the class as a fallback. |
| F35 | The byline shows on pages that have `updated` or `article`, reading "Updated <date>" or "Published <date>". It shows the author when one is set; otherwise it shows the plan's placeholder role as a pre-launch reminder. In the hero eyebrow, `[[Publish date]]`, `[[Date]]` and `[[Updated]]` are replaced by the real date. Post cards show the tag plus the real date instead of `[[Publish date]]`. |
| F56 | WebPage gets `datePublished` and `dateModified` (`updated`, else `article`). The BlogPosting author is the business `@id` instead of "BrandName" until a real person is set. Service and BlogPosting descriptions are stripped of inline marks. A page typed `Article` with no publish date (case drafts) is emitted as `WebPage`. |
| F55 | `lib/schema.ts`: telephone, email, address, name and description are left out while they are placeholders. FAQ items whose question or answer holds a placeholder are skipped. A final `prune()` removes any remaining string with `[...]` or `BrandName` from the graph. |
| F51 (code part) | `knowsAbout` label changed to "Local search engine optimization". |
| F57 | `app/llms.txt/route.ts` skips groups with no public pages, leaves out drafts and strips inline marks from descriptions. Until a real brand exists, the domain stands in for `BrandName`. |

## Verified in out/ after `npm run build` and `npm run typecheck`

- No `{{` or `|}}` left in any HTML file.
- Home links render, for example "Edmonton SEO services" on industry pages and "our Edmonton SEO team" on `/services/`.
- Steps render as `<ol class="steps">` with `<li class="step">`.
- Meta keywords are present with the primary keyword first: home starts with "edmonton seo services", local-seo with "local seo edmonton".
- og:title and og:description match the title and description on every page.
- JSON-LD on every page parses and has no `[...]` or `BrandName` values.
- `[[Publish date]]` is gone everywhere.
- llms.txt has no "Case studies" heading.
