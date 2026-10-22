---
name: train-agent
description: Teaches a seoservicesedmonton.ca content agent a new rule, preference or correction from the site owner (e.g. "keyword researcher - focus on cost keywords", "writer - shorter intros"), or shows what an agent has learned. Use when the user wants to train, teach, correct or review an agent.
---

# Train a content agent

Agents learn through their memory file `docs/content-system/learnings/<agent>.md`, which they read
before every run. Owner rules there override everything except the RULES.md honesty rules.

Agents: seo-keyword-researcher, semantic-content-writer, content-visual-designer, content-link-builder,
content-qa, fact-checker, onpage-seo-auditor, site-seo-auditor.

1. Work out which agent(s) the instruction is for. If it applies to all, add it to each.
2. Rewrite the instruction as a clear, testable rule (keep the owner's meaning; one line each).
   Instructions in Roman Urdu are fine as input; write the rule in English.
3. Append it under "Owner rules" with today's date. If it conflicts with an existing owner rule, replace
   the old one and say so. If it conflicts with a RULES.md honesty rule (nothing invented, placeholders
   until real data, regulator facts verified), do not add it; explain why.
4. If the rule changes how every page is built (a keyword, title, linking or plan rule), also update
   `docs/content-system/RULES.md` and, when a script can test it, propose the check for
   `scripts/seo-check.mjs` or `scripts/onpage-audit.mjs`.
5. Optional examples: if the owner gives good/bad examples (keywords, pages, URLs), add them under the
   rule as "Good:" / "Bad:" lines — examples teach agents best.
6. "Show what <agent> learned" → summarise its owner rules and lessons; offer to delete wrong ones.
7. When the user asks for a commit: `Train <agent>: <short rule>` on the working branch.
