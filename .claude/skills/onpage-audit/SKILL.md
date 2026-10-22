---
name: onpage-audit
description: Runs the onpage-seo-auditor agent over the whole seoservicesedmonton.ca site (home, services, industries, areas, blog, core pages) against the on-page checklist, applies safe fixes, and coaches the writer, QA and researcher agents. Use for "on-page SEO audit/check" or the daily on-page run.
---

# On-page audit

1. Run the `onpage-seo-auditor` agent with the Agent tool (it builds, runs `npm run onpage` and
   `npm run seo:check`, reviews, fixes up to 10 safe items and writes lessons for the writer, QA and
   researcher).
2. Review its diff: revert anything that changes a slug, a live meta title without owner approval, a
   price, an honesty fact, fills a `[[placeholder]]` with invented data, or rewrites a section wholesale.
3. `npm run build && npm run seo:check -- --strict && npm run onpage && npm run typecheck` — no new error.
4. When the user asks for a commit: `docs/data/onpage/`, the edits and the learnings as
   `On-page audit <date>: <n> fixes, avg <score>` on the working branch.
5. Report: average score and trend, lowest pages, fixes, proposals for the owner (template changes such as
   `<meta name="keywords">`, title changes on live pages), lessons sent to the team.
