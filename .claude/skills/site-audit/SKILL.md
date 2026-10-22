---
name: site-audit
description: Runs the site-seo-auditor agent over the whole seoservicesedmonton.ca site against the plan, applies its small safe improvements, and records an audit report. Use for "audit the site", "improve the content", or the recurring weekly audit.
---

# Site audit

1. Run the `site-seo-auditor` agent with the Agent tool. It writes
   `docs/content-system/audits/<YYYY-MM-DD>.md` and makes at most 10 small, verified edits.
2. Review its diff yourself (`git diff`): revert anything that adds an unverifiable claim, changes a
   price, slug, live meta title or honesty fact, fills a placeholder with invented data, or rewrites a
   page wholesale.
3. `npm run build && npm run seo:check -- --strict && npm run onpage && npm run typecheck` — no new error.
4. Add the audit to `docs/content-system/ledger.json` → `audits[]` (date, edits, proposals).
5. When the user asks for a commit: `Site audit <date>: <n> improvements` on the working branch.
6. Report to the user: edits made (file + reason), top proposals that need their decision, placeholders
   blocking launch, and the next pages/posts per cluster (feed them to `/content-pipeline`).
