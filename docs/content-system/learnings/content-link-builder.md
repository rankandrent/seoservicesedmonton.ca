Lessons carried over on 2026-10-23 from the owner's uiuxdesignservices.us content system (niche-independent lessons only; that site's facts, pages, prices and clients were dropped).

# Learnings: content-link-builder

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

- (owner, concept bindings) On new pages, link up to the brief's `bindings.parent` (the money page), across to sibling pages under the same parent, and down to any `children` that already have their own page. The anchor is the target page's concept or its synonym; never an anchor that names a different concept than the target's central entity.
- (owner, click-validated link quality, patent US9558233B1; skill seo-patent-rules §4) Links count when readers click them. For each new page, pick the 1–3 internal source pages by Search Console clicks (`scripts/fetch-gsc.mjs`, then `npm run links:find` for the sentence) and put the link in body text where the reader needs the next step, with an anchor that promises exactly what the target answers first. Keep each page's outbound links few and relevant; never add footer-style link lists or bait anchors.
- (owner, final) No ":" in any title or H1; protect live rankings (never change a live slug; live meta titles only with owner approval). Links never justify a URL change.
- (owner) AI Overview and PAA items in the brief must be covered; when a citation supports one of them, keep it.

## Lessons (learned from runs, QA, audits and results)

- When WebFetch is blocked for a source, verify with a WebSearch restricted to that source's domain and cite the exact URL that search returns; if the brief's URL differs from the canonical one the search shows, cite the canonical one and note the swap in the brief.
- Count link markers per bucket (money page incl. #section links, siblings, industry/area pages, contact) before adding links and cut the excess first: section links to the money page count toward its cap.
- When a snippet shows the source's real scope, rewrite the cited sentence to match that scope rather than linking a loose paraphrase.
- Verify each number on the exact page cited, not just that the URL exists; cite the page whose text shows the figure and rewrite the sentence to that figure. Flag unlinked copies of the old number (takeaways, bold answers, visuals) to the fact-checker.
- Link an external source once, on its first claim; later mentions of the same source stay plain text.
- When the external-link cap is reached, keep the links that carry numbers or claims plain text cannot carry, and turn sources that a name in the sentence identifies exactly (a statute by name, a regulator by name) into named plain-text citations; record removals in the brief.
- Statistics pages that publishers overwrite every year must be re-checked for the current year and figure; update derived arithmetic in the same sentence and flag downstream copies.
- When two pages from the same primary publisher back parallel numbers and the cap is exceeded, cite one parent page that shows both (verified on that exact page).
- Do not break a cap or invent a link target to reach a minimum. Report the count, the rule that stops it, and the next allowed candidate so QA and the orchestrator do not re-litigate it.
- For regulations, search the quoted wording, not the section number, and cite the section whose text the snippet shows; rewrite the sentence to the regulation's own words.
- When a guide exists as PDF and HTML, cite the HTML page a search returned with a matching snippet; drop dates only the brief asserts.
- Never suggest a backlink from another cluster's blog post or from a conversion page (contact, free audit). Money pages, hubs and same-cluster posts are the allowed sources.
- Before suggesting a backlink, check that the source field renders inline marks (most text fields here render through `rich()`; check `components/sections.tsx` for the exact field).
- Section jump links need a real `id` on the target section; check the built HTML for the id before linking `#section`.
- A target's `anchor`/`nav_label` is a concept, not literal text to paste: lower-case it in running text unless it starts the sentence or is a proper name.
- After cutting links, grep the page for sentences that still point at a page the reader can no longer click ("our service page shows…") and rewrite or delete them, including FAQ answers far from the change.
- When you add a sentence to carry a link, keep any quoted fact's own wording word for word and change only the frame around it; expand every abbreviation in a sentence you add.
- Tick every placement clause of each link plan entry; an entry with two placements is only done when both are present, unless a reason is recorded.
- Check every writer-supplied inline URL character for character against the URL a search returned, not only the claim; writer URLs drift from the brief.
- An archived or moved government page can only be replaced by a page whose exact URL a search returned; rewrite the claim to what that snippet supports.
- For a deep link, read the target section and confirm the anchor's head noun is the section's subject; a link that resolves is not proof the anchor describes it.
- Count every `href` to the target in the built page (`out/<route>/index.html` main content, including template-generated links such as related-page cards) before and after adding a link; one contextual link per target plus template links.
