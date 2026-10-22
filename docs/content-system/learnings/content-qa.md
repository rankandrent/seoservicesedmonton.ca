Lessons carried over on 2026-10-23 from the owner's uiuxdesignservices.us content system (niche-independent lessons only; that site's facts, pages, prices and clients were dropped).

# Learnings: content-qa

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

- (owner) Check semantic completeness, not only correctness. Any incomplete page, section, paragraph or heading (thin H2, missing brief point/entity, trailing sentence, thin FAQ, no next step) is a FAIL, and you must guide the writer: list every gap under "## Guidance for the writer" with where, what is missing, what to add and target length.
- (owner) Duplication is a FAIL: the same content visible twice (a visual and a list/table carrying the same items in the open), or a visual that drops or changes items of the text it represents.
- (owner) FAIL a bold H2 answer longer than ~30 words (one sentence). Report the H2 and a shorter version.
- (owner) Run `npm run onpage -- /<route>/` and fail the page if `keyword-volume`, `og-keyword`, `entity-coverage`, `attribute-coverage` or `entity-salience` (< 75) fails. Also fail any entity that is only name-dropped without a fact or explanation.
- (owner, layout-aware pages) Fail the page if the on-page run reports `no-hidden-content`, `figure-caption`, `h2-then-text` or `table-intro`; check by eye that each visual sits right after the text it explains.
- (owner, concept bindings suitability check, RULES.md) FAIL a new page when any brief synonym, the parent or an essential concept is missing; an H2's first sentence lacks the central entity/synonym plus one essential concept; a composite concept is split; an ambiguous word appears without its context word in the same sentence; or a query variant is not answered. List each failure with the line and the fix.
- (owner, final) FAIL any ":" in a title, og:title or H1, and any meta title that does not start with the exact keyword followed by " | ".
- (owner) FAIL a page that misses any AI Overview entity/attribute/term or any PAA question from the brief.
- (owner, final) Protect live rankings: FAIL a change that alters a live page's slug, or its meta title without the owner's recorded approval.
- (escalated rule from the source site) FAIL a description whose last clause is not a reader next step; quote it and name the next-step clause. Measure length on the built HTML (entities such as `&#x27;` add characters).
- (escalated rule from the source site) FAIL a keyword stacked as a modifier onto another noun, and any "X vs Y" without a head noun or an article on both halves. How to measure: grep the keyword followed directly by a noun and run the "this service" swap on each hit; for every `vs` hit, quote it and mark (a) head noun after the pair? (b) article on each half? FAIL when both are no.
- (escalated rule from the source site) FAIL any "every / always / all / never" claim that contradicts the page's own decision rule, wherever it sits, including text pasted from the fact-checker. `grep -niE '\b(every|always|all|never)\b'` and test each hit.
- (escalated rule from the source site) Before PASS on publish day, list every `backlinkSuggestions` entry with its status (applied with the live anchor and href, skipped with a reason, or conditional with its blocker). An entry with no status is a FAIL.

## Lessons (learned from runs, QA, audits and results)

- Judge visual legibility in the built page at desktop and phone widths, not at native size; scroll lazy images into view before measuring.
- Always print each FAQPage `acceptedAnswer.text` from `out/<route>/index.html` and check it holds only its answer (closing paragraphs and multi-paragraph answers leak or glue together in schema).
- When the competitor page cannot be fetched, compare structure from search snippets, say the numeric overlap could not be computed, and still require every SERP gap to be covered.
- For every visual, list its labels and tick each one off against the adjacent text; if nearly all are present, FAIL it whatever other agents report. An axis change is not new content.
- Walk every path of any decision tree or flow as a concrete case and compare it with the prose; check every "see the table/section" pointer against the real content.
- After any removal or redraw, check the built output for leftovers (files, glued headings, stale placement-map entries).
- Before serving `out/` locally, record existing server PIDs with `ps`; read your own server's PID from `ps`, not `$!`, and confirm it is gone with `ps` after the kill.
- Paste the on-page `score` and `failed` list into the report; FAIL below 95 and FAIL any `title-keyword`, `desc-keyword` or `h1-keyword` miss whatever the total.
- Count entity mentions twice: in the full body and with collapsed blocks stripped; an entity found only in collapsed text counts as "mentioned in passing". Check abbreviation expansion on the same stripped text.
- When `seo:check` errors come from pages the change did not touch, show they are pre-existing (`git status`/`git log`), report them separately as orchestrator FIXes, and still list the gate as blocked if they block it.
- In every repair loop, diff the page against the previous version and reread each changed bold answer with the sentence after it: repairs create new repetitions and new logic errors that a check of the old items alone misses. In the final loop, read each added sentence as a claim or formula on its own terms first.
- For every place the script checks (title, H1, description, first 60 words), quote the keyword sentence and pass it only if it reads naturally with the keyword swapped for "this service". The script checks presence, never grammar.
- Before moving a post to another funnel stage, check what the template will print for that stage (CTA boxes, related cards) and whether it implies a result we do not have.
- Re-derive every assumption in an illustrative model from the figures the page cites, and check the model includes every cost the page itself warns about.
- For every bold answer and description that lists 3+ subjects or objects sharing one verb, quote each pair and FAIL any pair that is false or ungrammatical on its own.
- When a repair rewrites a sentence that summarises a list (order, steps, sections), check it still describes the list's first and last items.
- A stray shape that appears only in some screenshots may be a page overlay (sticky header, progress bar): render the asset natively before calling it a defect; hide overlays with `visibility: hidden`, never `display: none` (that changes layout widths).
- To prove a draft is not live: no `out/<route>/index.html` linked from live pages, no sitemap entry, 0 hits for `grep -rl 'href="/<route>/'` over the live pages.
- Before flagging a repeated CTA sentence, check the learnings for an orchestrator policy on it; if one exists, record it as an owner note and verify the offer appears exactly once.
- n-gram scores miss paraphrase: for a same-frame page, set the takeaways, the intro's last 2 sentences, the price sentence and the closing side by side with the nearest relative and FAIL matching shapes. Print the first 2 and last 2 paragraphs of the last 5 pages beside the new page's and FAIL a matching sentence frame even at near-zero overlap.
- Walk one counter-case through every routing summary (intro, takeaways, routing FAQ, bullets) and test each superlative ("most", "the main") against the page's own tables and visuals.
- Grep for left-over HTML comments or editor notes in the page source and the built HTML; FIX each into a real citation or delete it.
- Before writing a replacement or guidance sentence, run the shared-verb pair test and the hedge check on your own text.
- Decide near-repeat flags visual by visual with the label tick-off; when a visual repeats only the bold answer, rewrite the bold answer so it no longer enumerates the items.
- Before writing a links FIX, check the link-builder spec and earlier QA reports for the funnel's link range and any recorded exception; never fix a count by breaking a cap.
- Count open text only (strip collapsed blocks and alt text) before asking for a trim, report both numbers, and judge length caps by parity with the last published pages of the same shape. Never cut a brief entity, attribute or SERP gap to hit a number.
- `awk '/^## Why/…'`-style check: no bold answer under a "Why" H2 or FAQ starts with "Because"; give a rewrite that restates the subject in ≤ 30 words.
- A failed `entity-coverage` item is not proof of thin content: grep the head noun in the open text and sort each missing item into "covered, other words" (give the writer one sentence to print the exact noun, or send a format fix to the researcher) or "not covered" (a writer gap). FAIL only on the second bucket plus anything still failing after the fix.
- Before writing a FIX that removes the keyword from a heading, recount keyword H2s after the change; below 40%, keep the heading and send a lesson to the researcher instead.
- When a G-instruction appends a paragraph at a section's end, the instruction must say "end on a reader action"; in the repair loop reread the last sentence of every section that got new text.
- The on-page script may skip noindex/draft pages or score some checks only for some page types; know which checks apply (`npm run onpage -- /<route>/` scores a named draft) and tick the rest by hand.
- After making any direct edit, read the parallel fact-check report first and merge its replacements into one string for any text you both touch, so the orchestrator never gets a stale old → new pair.
- The build gate reports errors only: always run `npm run seo:check | grep '<route>'` and treat every page-specific warning as a QA item.
- On every industry and area page, list every rendered client or trust signal (logos, stats, testimonials, review widgets, "trusted by" rows) and trace each to its source; anything not supplied by the owner is a FAIL or an owner decision, never a pass.
- When a page has 2+ visuals sharing a colour family, print every legend and tag into one fill → meaning table and FIX any fill with two meanings.
- For each brief `queryVariants` entry, quote the one sentence that answers it on its own; "the whole page" is not an answer.
- On every area page, compute 5-gram overlap against all sibling area pages (town names masked), sort shared grams into required facts and copied phrasing, and rewrite copied phrasing until under 12%.
- When rewriting any sentence about what a town's businesses do, run the implied-client test on your own text: modal capability ("can hire") or an offer description ("we offer X to Y"), never a present-tense habit.
- For rule-7 consistency, diff every process step BODY against the money page's step body, not only names and durations. Grep every string field and trace where it renders (hubs, cards, menus): fields invisible on the page can be live elsewhere.
- Compare the modification time of changed content files with `out/<route>/index.html` before trusting a build; rebuild when a source is newer. For every internal deep link, read the target section and confirm the anchor describes it.
- After pasting any fact-check replacement, rerun `npm run seo:check` and compare the warning list with the pre-edit run.
- When a run edits 2+ pages, print every shared FAQ question side by side and rewrite any answer whose first two sentences share a frame.
- For a query two pages claim, read Search Console `queryPage` rows first and give it to the page Google already associates with it.
- Before fixing a team-size, price or timeline conflict, grep all content for the number and noun; fix the in-scope pages and list every other copy as an owner decision, so the site never carries a third version.
