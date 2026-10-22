Lessons carried over on 2026-10-23 from the owner's uiuxdesignservices.us content system (niche-independent lessons only; that site's facts, pages, prices and clients were dropped).

# Learnings: onpage-seo-auditor

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.

## Owner rules (highest priority — written by the site owner, never removed by agents)

- (owner) Follow the on-page checklist (docs/content-system/ONPAGE-CHECKLIST.md) on every page and guide the writer and QA so every new page has the full checklist.
- (owner) On every page you audit, check the primary keyword in title, description, first meta keyword and OG tags, and the entity checks (`entity-coverage` ≥ 80%, `entity-salience` ≥ 75). Fix what is safe (add the keyword to a lead sentence or an H2, explain a missing entity with an existing fact from the site); send the rest to the writer as lessons. Never add an entity with an invented claim.
- (owner, layout-aware pages) Audit `no-hidden-content`, `figure-caption`, `h2-then-text` and `table-intro` on every page and fix them. Never collapse main content.
- (owner) Service, industry and area section text is 50–70 words per block (90 max). Keep every named entity and attribute; cut filler.
- (owner, concept bindings) For pages built from a brief, report whether its `bindings` synonyms, parent and `essential` concepts appear, and list any fact that conflicts with another page answering the same question. Report only; the owner decides.
- (owner, final) No ":" in any title or H1; the meta title starts with the exact keyword, then " | ".
- (owner) AI Overview and PAA items in a brief must be covered on the page.
- (owner, final) Protect live rankings: after launch never change a live slug, and never change a live meta title without the owner's approval; propose it instead. Pre-launch, titles may still be fixed.

## Lessons (learned from runs, QA, audits and results)

- Fix a short page title through the page's meta `title`, leaving the H1 alone.
- When a page fails only on a spelling variant of the keyword (hyphen, space, "St." vs "St"), fix the matcher in the script; when it fails on a synonym or singular/plural, fix the copy. Never change a URL for a matcher issue.
- Measure description length on the built HTML: an apostrophe renders as `&#x27;` and adds characters; avoid apostrophes near the limit or re-run after each one.
- The score cannot see readability: read the title, description, first sentence and first H2 aloud before accepting a 100. "Keyword present" is the floor, not the bar.
- Template-made text breaks without lowering the score (lowercased acronyms in alt text, "a SEO", mixed-case headings). Once per run grep the built `out/**/index.html` titles, alts and headings for lowercased acronyms and `a [AEIOU]|an [B-DF-HJ-NP-TV-Z]`; fix the template, not the content.
- Before running link tools for a new page, read the brief's `backlinkSuggestions` and `notes`; apply the ones not yet in place and send conditional ones to the owner.
- Before calling a gap new, check every published page for it; if 2 or more pages have it, escalate it now.
- Start each run with `git log --since="2 days ago" --format="%h %s" -- content/` and the routes in latest.json missing from rotation.json: review every new route, not only the one named in the task.
- When content is removed, claims built from it can survive in hard-coded template metadata (hub descriptions, card text): grep `app/`, `components/`, `lib/` and `content/` for it.
- When images or visuals are added, open each one and compare its alt text and caption with what is visible; fix with per-item text, never a shared sentence.
- A site-wide pattern defect is too big for the 10-edit budget: fix the pages under review first, then put the rest in one proposal with the exact old → new strings and their measured lengths (`node -e`), so the next run can apply it mechanically. A batch carried twice gets its own run.
- Once per run, list every description in content that lacks a next-step verb (Book, Get, Request, Call, See, Compare) with its length; treat it as the backlog for the next batch proposal.
- Before writing a trend, diff the failed check ids against the previous `latest.json` and report "check change" vs "content change". Volume gaps are never fixed by editing a page; they go to the owner.
- Once per run, grep content for implied-client and local-presence phrasing ("our work in", "clients in", "local team", "local office") and send each hit to the owner as an honesty proposal with an exact replacement.
- When adding a query phrase to a hero lead, make the lead itself carry every word of the page keyword; the salience check reads the first 60 words after the H1.
- Separate template gaps from page gaps in the report: a check that fails on every page (for example no `<meta name="keywords">` printed by the template) is one template proposal, not 30 page fixes.
