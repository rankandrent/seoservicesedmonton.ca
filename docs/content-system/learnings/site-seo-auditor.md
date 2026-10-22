Lessons carried over on 2026-10-23 from the owner's uiuxdesignservices.us content system (niche-independent lessons only; that site's facts, pages, prices and clients were dropped).

# Learnings: site-seo-auditor

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

- (owner, final) No ":" in any title or H1. The meta title starts with the exact primary keyword, then " | " and a short benefit; the H1 carries the exact keyword joined with plain words or a comma. `npm run seo:check` errors on a colon.
- (owner) Google's AI Overview and People Also Ask for the primary keyword are required inputs: every brief item must be covered with a real fact and every PAA question answered in an H2/H3 or FAQ.
- (owner, final) Protect live rankings: never change a live page's slug; never change a live page's meta title or og:title without the owner's explicit approval for that page; propose it instead. `npm run seo:check` errors when a route in docs/content-system/locked-pages.json disappears or its title changes (the file fills at launch).
- (owner) Nothing invented: never fill a `[[placeholder]]` with made-up data; list open placeholders for the owner instead.

## Lessons (learned from runs, QA, audits and results)

- Ranking edits on live pages are usually FAQ additions and H1/lead/answer rewordings; when adding an FAQ, update any count in the FAQ intro.
- For a query two pages claim, read Search Console `queryPage` rows first and give it to the page Google already associates with it; remove the exact string from the other page.
- When applying another agent's exact replacement, rerun `npm run seo:check` and compare the warning list with the run before the edit.
- Before fixing a price, team-size or timeline conflict, grep all content for the number; fix the in-scope pages and list every other copy as an owner decision, so the site never carries a third version.
