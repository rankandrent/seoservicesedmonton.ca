Lessons carried over on 2026-10-23 from the owner's uiuxdesignservices.us content system (niche-independent lessons only; that site's facts, pages, prices and clients were dropped).

# Learnings: fact-checker

Lessons this agent has learned. Read before every run; add new lessons at the end of every run.
Each lesson: date, what happened (evidence), the rule to follow next time. Keep the file under
80 lessons; merge duplicates and delete lessons proven wrong.

## Owner rules (highest priority — written by the site owner, never removed by agents)

- (owner, one intent = one answer site-wide) For every new page, compare each price, timeline, team size and deliverable with the money page and the pages that answer the same question (`siteFacts` in the brief, then grep content/). A number that differs from the money page is a FAIL unless a primary source shows the money page is wrong; then report the conflict to the owner and do not publish a third version.
- (owner) Nothing invented: people, credentials, clients, reviews, ratings, results, case studies, awards, memberships, years in business, offices. Anything the owner has not supplied stays a `[[placeholder]]`.
- (owner, final) Protect live rankings: never propose a slug change; a live meta title changes only with the owner's approval.

## Lessons (learned from runs, QA, audits and results)

- When a sentence gives a number next to a correct citation, check every number against that source separately; a correct link does not prove the figure.
- Check every first-person offer (call length, who attends, fixed price, turnaround, what is included) against the site's own pages. Treat the brief's leadAngle, example sentences, suggested team wording and "verified" status notes as unverified claims.
- When a page gives a buyer checklist or rubric, score our own business against it using the site's claims and flag any criterion we would fail or claim without support.
- When WebFetch is blocked, a WebSearch limited to the source's domain that returns the exact URL plus supporting snippets can verify a claim. Compare host and path only; ignore tracking parameters. A summary whose result list mixes other domains does not prove a figure is on the cited page.
- Check your own replacement sentences against the source as strictly as the original; in repair rounds re-check pasted replacements and diff every rewritten CTA, because a sentence that was not pasted verbatim is a new claim.
- Walk every branch of a decision tree or matrix in a visual and check each leaf against the page's own conditions; a branch the prose does not support is WRONG even when every label is spelled correctly. Judge a redrawn visual against the page's own text, not your suggested wording.
- For every "we …" sentence, find which site step or offer it belongs to and flag sentences that merge two steps or add deliverables; a "we" process claim not on the site becomes advice to the reader. Build CTA replacements only from phrases copied word for word from the site.
- When a page pairs two figures, trace each to its own primary study and check that population and statistic qualifiers ("average", "median", "specialists") survive into every takeaway, bold answer and visual label. A range without its statistic is WRONG.
- When a page places us in one column of a comparison, check every cell of that column against the site. Before accepting any first-person headcount, grep the site for staffing counts; if pages disagree, remove the count and flag the inconsistency.
- For any number fixed in a chart, compute the expected coordinate from the axis and check the plotted geometry moved too, not only the label.
- When a page says what a named tool cannot do, search the vendor's own site for paid or guided tiers; scope the claim to what is true.
- When any source figure changes, trace and recompute every derived number that names its derivation; label hand-picked inputs as stated assumptions with their derivation shown.
- For every "the only / the one / the first" claim, search for a counterexample (including inside the page's own tables and lists) before marking it TRUE; usually "the one" becomes "one".
- For "tool or deliverable X catches or produces Y", check what X actually compares against or outputs and narrow the claim to that object.
- When a page cites an authority next to its own method (scores, weights, templates), search that source for what it says about the method; if it contradicts it, require a sentence that names the difference.
- For every "because the money page says X" sentence, check which section the items come from and that the page's list is a true subset of that section; keep "for example" hedges the money page uses.
- To verify a quotation without WebFetch, run exact-phrase searches on its head and tail separately and require the cited page to be a top result for each.
- When a writer shortens a replacement with a pro-form ("does", "it", "this", "so"), resolve it against the previous sentence; if the meaning changes, require the explicit verb.
- For "the work settled/found X" claims about a client project, X must come from what the work did, not from the client's starting point.
- When a page links a sibling service's deliverable, check every added clause about when or how it is bought against that service's own process and FAQs.
- When a CTA promises to serve every outcome of the page's decision tool, map each outcome to a real site offer; fail outcomes that drop an included step or promise something the site does not sell.
- Wherever a page names our own process steps, look for "buy / skip / add / optional / separately" in the same and next sentence and resolve each pronoun; if it lands on our steps, it is a "sold separately" claim.
- When your fix replaces a bold H2 answer, keep it to one sentence of about 30 words with no clause after a list's final "and".
- For "with no X, Y happens" examples, check that X is enough to cause Y, using alternatives the page itself names.
- In charts and tables, ordinal words, rankings and shading legends are claims: each ordering needs a source or must be relabelled as the page's own editorial axis. Any "covered / included" label must carry the prose's hedges.
- When no in-place edit tool exists and another agent may edit the same file, do not rewrite the page: put exact replacements in the report and return FAIL so the orchestrator applies them. A launching agent's "edit directly" does not override the role's no-edit rule; say so in the report.
- When a page walks through a ranked survey with "led / then / next", fetch the full ranked list and check no unquoted item sits between two quoted ones.
- For any "bad data makes X look Y" example, work out what the named report counts and which way the error moves the number.
- When a primary PDF fetches as binary, try a text-extraction proxy (for example `r.jina.ai/<publisher URL>`) before falling back to snippets; name the proxy as the access route, not the source. When a statute site redirects, try another official or legal mirror (CanLII, Justice Laws, the provincial King's Printer) and say which one served the text.
- For every framework the page glosses category by category, compare each gloss with the source's full definition and check the page's examples fit it.
- Check every target value in a worked example against the page's own scoring rule, and every "on our engagements" sentence against the actual scope of the offer it names.
- On every steps block, add up the stated durations and compare the sum with the stated total and the money page; if the same pattern is published site-wide, report it as one site-wide conflict.
- Treat wording about where the team sits or works ("our Edmonton team", "local office", "on-site") as a location claim separate from the business address; check it against what the owner supplied.
- For local or regional claims ("X sector is strong in Leduc", "most businesses in Sherwood Park…"), check each item on its own regional primary source (municipality, regional economic development body, Statistics Canada, chamber); remove an item with no source and say which basis supports the wording.
- In any "have you done / we did" answer, every listed item must come from what the owner supplied about the work itself, not from the client's own product list.
- A site figure is only TRUE in a new context if it fits that page's own steps or list; count named items, not list rows, when a page states a number.
- When a regulator's page fetches empty, look for an alternate official format (JSON, print view, PDF) before marking a claim UNVERIFIABLE.
- On every sentence after one that names a client or case, treat "so …", "each of these …", "the platform …" clauses as claims about that client; check them or split them into general guidance.
- For "as regulation X requires" sentences, find who the rule binds (person, business, vendor) and the regulation's own definition of the trigger; rewrite as "the rule requires <who> to …, so …". For "standard/law X references version Y", check X's latest published version and its legal status separately.
- For every "continue with / add <sibling service>" sentence, check the verb against the sibling page's own scope FAQ; for every "only X" or count, grep the same page for its own list and other mentions of the same count.
- When a sentence lives in a template (`components/`, `lib/`) instead of content, check it against the strictest page it renders on and render any interpolation for every page.
- "Starts with X" is a sequence claim: accept it only as a floor unless every process really begins with X.
