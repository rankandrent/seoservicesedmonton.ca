# seoservicesedmonton.ca

SEO agency site for Edmonton-area businesses. Next.js 16 static export on a Cloudflare Worker (see
README.md). This Next.js version differs from older training data: read `node_modules/next/dist/docs/`
before changing app code, and `AGENTS.md` if `next dev` has written one.

**Pre-launch:** `indexable: false` in `content/site.ts` (every page noindex). Launching is the owner's call.

## Content system

- Rules for all content work: `docs/content-system/RULES.md` (+ `ONPAGE-CHECKLIST.md`).
- Topical map: `plan/README.md` and `plan/content-plan.json` (68 pages, 3 phases; one entry per URL with
  keyword, entities, attributes, n-grams, skip-grams, FAQs, outline, links, E-E-A-T).
- Pages are Page objects in `content/*.ts`; sections render through `components/sections.tsx`.
- Agents (`.claude/agents/`): seo-keyword-researcher, semantic-content-writer, content-visual-designer,
  content-link-builder, content-qa, fact-checker, onpage-seo-auditor, site-seo-auditor. Each reads and
  updates its memory in `docs/content-system/learnings/<agent>.md`.
- Skills: `/content-pipeline` (new pages and posts, orchestrated), `/onpage-audit`, `/site-audit`,
  `/train-agent`, and `seo-patent-rules` (owner rules for every page in every project).
- Checks: `npm run build && npm run seo:check -- --strict && npm run onpage && npm run typecheck`.
  `npm run links:find -- "/<route>/" "<phrase>"` finds internal-link sources.

## Hard owner rules

1. **Nothing invented**: no fake people, reviews, ratings, credentials, clients, logos, results, stats or
   offices. Keep `[[placeholders]]` until the owner supplies real, approved data. Case studies stay drafts.
2. **Verified volume** for every primary keyword (Ahrefs API `$AHREFS_API_KEY`, country `ca`, or Search
   Console). Never estimate.
3. **Keyword everywhere**: meta title (starts with the exact keyword, then " | "), description, first meta
   keyword, og tags, H1, first 60 words. **No ":" in any title or H1.**
4. **AI Overview + People Also Ask** for the keyword are captured in the brief and covered on the page;
   entity coverage ≥ 80%, attribute coverage ≥ 70% (plan entities, attributes, n-grams, skip-grams).
5. **Plan rules**: the homepage owns the head-term cluster; no town × industry pages; area pages pass the
   swap test; URLs follow `/services|industries|areas|blog/<slug>/`.
6. **Protect live rankings** (after launch): never change a live slug; change a live meta title only
   with the owner's approval (`docs/content-system/locked-pages.json`, enforced by `seo:check`).
7. **Regulator facts verified** on the regulator's own site (Law Society of Alberta, CDSA, RECA, CPSA …).
8. Canadian English (colour, centre, neighbourhood), CAD. Do not commit or push unless asked.
