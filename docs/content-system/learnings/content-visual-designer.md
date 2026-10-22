Lessons carried over on 2026-10-23 from the owner's uiuxdesignservices.us content system (niche-independent lessons only; that site's facts, pages, prices, clients and its SVG house style were dropped — this site builds visuals from its own components, see the agent file).

# Learnings: content-visual-designer

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

- (owner) The owner prefers visuals over long text: tables, checklists, steps and comparisons the page contains become visual blocks, and every item in the visual is worded exactly as the text it represents.
- (owner) Never show the same content twice in the open: a visual either replaces a list/table or shows something the text cannot (a flow, a decision, a relationship, a before/after).
- (owner, layout-aware pages) Every visual must fit the paragraph right above it. Give each visual one clear subject and use that subject in its heading, caption or alt text.
- (owner) Visuals must look designer-made and stay scannable: only the key element large, consistent spacing, the site's own palette and components; no stock art presented as the business, no other brands' logos.

## Lessons (learned from runs, QA, audits and results)

- Validate every SVG with an XML parser, not only a screenshot: a duplicated attribute renders fine at a glance but is invalid.
- Size text for the fallback font when a custom font is not embedded, and check text overflow with getBBox plus a screenshot before finishing.
- Draw a bar, duration or quantity only for values the page states; show untimed or unsized items as labels, and mark illustrative proportions "not to scale" with no numbers on the parts.
- Design for the rendered width, not the native size: measure the container at desktop and phone widths in the built page and judge legibility there.
- When a redesign changes what a visual shows, update the placement map and report the exact page text (labels, alt) the orchestrator must change too.
- When a visual follows a step list, show a relationship the list cannot (time, frequency, a decision); list every label you plan to draw and strike any that already appears in the adjacent text. If fewer than half the labels are new, skip the visual and say so.
- Walk every root-to-leaf path of a decision tree as a real case and check it against the page's prose; order questions gate → smallest scope → largest scope; any "see the table" pointer must match what the table contains.
- When a visual is removed, delete its file; when it is redrawn, update its marker/anchor in the placement map.
- Build the placement map with a script that reads the page as it stands at write time and asserts every anchor text is present (other agents edit the page in parallel).
- Generate tables and lists in a visual from the page's own data at draw time, never by retyping; re-run after every wording repair and prove with a byte diff that no other file changed.
- For items that repeat a small vocabulary (per-row values), check each whole row as one ordered string inside its own group, not each word against the whole image.
- Check pairwise overlap of every text box and every pill against its container's inner width; wrap labels beside icons to (card width − icon offset − padding).
- For illustrative models, recompute the page's results from its stated inputs inside the generator and fail on a mismatch; never hand-place curves.
- Map icons from whole phrases, never short substrings, and check every icon against its label in the screenshot.
- When two or more visuals on one page share a colour family for a scale or tag, write one fill → meaning table for the page and give each fill exactly one meaning.
- Before shading a covered/not-covered or yes/no state, find the sentence in the page that grounds it, across the whole page; carry every hedge in the prose ("ask whether") into the visual's label.
- When a fact-check or QA note suggests new wording for a visual, draw the page's current text and treat the suggestion only as a hint about meaning; when the orchestrator's paraphrase and QA's exact replacement differ, use QA's exact line.
- Capitalise labels with a guard that keeps brand casing (iOS, WooCommerce, GA4) and spell-check every label in the site's house English (here Canadian) before export.
- Take headline and subtitle lines on a visual from the page's title, takeaways or bold answers word for word; never write a slogan of your own.
- When a visual repeats a dense table that cannot fit legibly, report which block to trim (with the exact cells) instead of shrinking the text.
- Check the rendered caption and alt text in the built `out/` HTML, not only the source: templates can lowercase or rewrite labels.
