---
name: content-pipeline
description: Agentic content team for seoservicesedmonton.ca. You are the orchestrator - turn a goal ("2 posts for the HVAC cluster", "build the next Phase 2 industry page", "fill gaps in local SEO") into shipped pages (Page objects in content/*.ts) by coordinating research, build and review agents in parallel with a repair loop. Use when asked to create, write or publish blog posts, service, industry or area pages, or new content.
---

# Agentic content pipeline — you are the orchestrator

```
goal ─▶ orchestrator (you) ─┬─ RESEARCH  keyword researcher × N pages (parallel)
                            ├─ BUILD     writer ─▶ visual designer ∥ link builder (parallel)
                            ├─ REVIEW    content-qa ∥ fact-checker (parallel)
                            │            └─ FAIL → route fixes to the owning agent → review again (≤ 2 loops)
                            └─ SHIP      publish, backlinks, plan status, build checks, ledger
```

Read `docs/content-system/RULES.md`, `plan/README.md`, `docs/content-system/ledger.json` and
`fingerprints.json` first, plus the skill `seo-patent-rules`. Every agent reads its own
`learnings/<agent>.md`; remind each one in its prompt.

## 1. Plan the goal
- Arguments: a goal in plain words, a plan URL, a cluster, or nothing. With nothing, the goal is "the
  next unbuilt page of the lowest open phase in `plan/content-plan.json`" (status `planned`, no Page
  object in `content/` yet), skipping pages blocked by an open owner question (README "Open questions")
  and area pages without the owner's map-pack research.
- Turn the goal into N jobs (default 1, max 3 per run), each with a plan URL or a cluster and an angle.
  Two jobs never share a cluster in the same run. Never create a page outside the plan's URL scheme, a
  town × industry page, or a page that targets the homepage head-term cluster.
- Record the plan in the ledger under `runs` (date, goal, jobs).

## 2. RESEARCH — parallel
Launch one `seo-keyword-researcher` per job in a single message (parallel Agent calls). Each writes
`docs/content-system/briefs/<slug>.json`. Compare the briefs with each other: drop or re-brief any two
with overlapping intent. Drop any job that returned `BLOCKED: no volume data` (report it to the owner).

## 3. BUILD — writer, then designer ∥ link builder
Per job (jobs run in parallel with each other):
1. `semantic-content-writer` → the Page object in `content/*.ts` (`draft: true`, `noindex: true`), hub
   listing, plan status `built`.
2. In one message, launch `content-visual-designer` and `content-link-builder` in parallel. The designer
   writes `briefs/<slug>.visuals.json`; the link builder edits links in the page object.
3. When both finish, insert the visual sections and any new illustration from `visuals.json`.

## 4. REVIEW — parallel, with a repair loop
1. `npm run build`, then in one message launch `content-qa` and `fact-checker` for the page.
2. Apply every exact FIX/replacement they list (fact-checker wording wins on facts, QA on structure).
3. If either says `VERDICT: FAIL`, route each problem to its owner — wording/structure → writer, visuals →
   designer, links/sources → link builder, false claims → writer with the fact-checker's replacement,
   keyword/brief problems → researcher, QA's "Guidance for the writer" → writer item by item — then run
   both reviewers again. Max 2 loops; then leave the page as a draft and report what is left.
4. Both PASS → ship.

## 5. SHIP (only pages where both reviews passed)
1. Remove `draft` and `noindex`; set `article` (blog) and `updated` = today. Pre-launch the whole site
   stays `noindex` through `content/site.ts`; never change `indexable` — launching is the owner's call.
2. Apply the brief's `backlinkSuggestions` marked `required` (2–3 contextual links from relevant pages,
   varied anchors), verified with `npm run links:find -- "/<route>/" "<keyword>"` after the build. Make
   sure the hub lists the page.
3. `npm run build && npm run seo:check -- --strict && npm run onpage && npm run typecheck` — no new error,
   and `npm run onpage -- /<route>/` ≥ 95.
4. Plan status: `built` (pre-launch) or `live` (site launched); mirror it in `plan/scripts/gen_plan.py`.
5. Update `ledger.json` → `posts[]`/`pages[]` (url, slug, cluster, keyword, volume + source, date, words,
   visual blocks, links, qa loops) and append the fingerprint to `fingerprints.json`.
6. If any review loop was needed, make sure the owning agents wrote their lessons.
7. Commit only when the user asks (on the working branch, never `main` directly); deploy is
   `npm run deploy` and is the owner's call.
8. Report: built/shipped URLs, keywords with volume source, QA/fact verdicts, loops used, placeholders the
   owner must fill, anything left as a draft.
