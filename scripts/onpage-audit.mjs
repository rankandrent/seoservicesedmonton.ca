// On-page SEO audit of every page that is indexable at launch, following
// docs/content-system/ONPAGE-CHECKLIST.md. Run after a build:
//   npm run build && npm run onpage                    # all pages → docs/data/onpage/latest.json + summary
//   npm run onpage -- /services/local-seo/             # one page, printed
//   npm run onpage -- /blog/new-post/ --drafts         # include draft/noindex pages (QA of a draft)
//
// Keyword per route: plan/content-plan.json `primary.kw` (or the page's own `keyword`), overridden by a
// brief in docs/content-system/briefs/ when one exists. Entities, attributes, n-grams, skip-grams and
// FAQs come from the same plan entry (or the brief).
import fs from "node:fs";
import path from "node:path";
import { ROOT, builtPages, compact, lc, loadBriefs, loadContent, loadPlan, mainOf, norm, planKeyword, strip, words } from "./lib/site-data.mjs";

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("/"));
const withDrafts = args.includes("--drafts") || !!only;
const content = await loadContent();
const plan = loadPlan();
const briefs = loadBriefs();
const unescape = (s = "") => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// phrase matcher: "on-page" = "on page" = "onpage"; "St. Albert" = "st albert"
const phraseRe = (kw, flags = "") => new RegExp(`\\b${norm(kw).split(" ").map((w) => esc(w).split("").join("[\\s-]?")).join("[\\s.-]*")}\\b`, flags);
const hasPhrase = (text, kw) => phraseRe(kw).test(lc(text));
// keyword present: exact phrase, or every word longer than 2 letters present (tolerates word order)
const has = (text, kw) => {
  if (!kw) return false;
  if (hasPhrase(text, kw)) return true;
  const t = norm(text), tc = compact(text);
  return norm(kw).split(" ").filter((w) => w.length > 2).every((w) => t.includes(w) || tc.includes(w));
};
const countPhrase = (text, kw) => (lc(text).match(phraseRe(kw, "g")) || []).length;

// an entity from the plan can be "A / B (C)" (alternatives) or "x, y and z" (a list: 60% of items needed)
const entityCovered = (name, text) => {
  const alts = name.split(/\s+\/\s+/).flatMap((a) => { const m = a.match(/^(.*?)\s*\(([^)]+)\)\s*$/); return m ? [m[1], m[2]] : [a]; });
  return alts.some((a) => {
    const items = a.split(/,\s*|\s+and\s+|\s+or\s+/).map((x) => x.trim()).filter((x) => x.length > 1);
    if (items.length <= 1) return hasPhrase(text, a);
    return items.filter((x) => hasPhrase(text, x)).length >= Math.ceil(items.length * 0.6);
  });
};
const entityCount = (name, text) => Math.max(0, ...name.split(/\s+\/\s+/).map((a) => a.replace(/\([^)]*\)/g, "").trim()).filter((a) => !/,/.test(a)).map((a) => countPhrase(text, a)));
const attrCovered = (attr, text) => {
  const t = norm(text);
  const ws = norm(attr.split("(")[0]).split(/[\s,/]+/).filter((w) => w.length > 3);
  return ws.length > 0 && ws.filter((w) => t.includes(w.replace(/s$/, ""))).length >= Math.ceil(ws.length * 0.6);
};

const all = builtPages(content);
const inbound = {};
for (const p of all.filter((x) => x.indexable)) {
  const main = mainOf(p.html);
  for (const [, href] of main.matchAll(/href="(\/[^"#?]*)/g)) if (href !== p.route) (inbound[href] ??= new Set()).add(p.route);
}

const CONTENT_TYPES = /^(Homepage|Service|Industry|Area|Blog post|Lead magnet)$/;
const results = [];
for (const p of all.filter((x) => (only ? x.route === only : withDrafts || x.indexable))) {
  const h = p.html;
  const entry = plan.get(p.route);
  const brief = briefs.get(p.route);
  const kw = lc(brief?.keyword ?? "") || planKeyword(entry) || lc(p.page?.keyword ?? "") || null;
  const volume = brief?.volume ?? entry?.primary?.volume;
  const type = brief?.type ?? entry?.type ?? (p.route.startsWith("/blog/") ? "Blog post" : "Page");
  const isBlog = type === "Blog post";
  const isContent = CONTENT_TYPES.test(type) || p.route === "/about/";
  const main = mainOf(h);
  const title = unescape(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = unescape(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const ogTitle = unescape(h.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? "");
  const ogDesc = unescape(h.match(/<meta property="og:description" content="([^"]*)"/)?.[1] ?? "");
  const metaKw = unescape(h.match(/<meta name="keywords" content="([^"]*)"/)?.[1] ?? "").split(",")[0].trim();
  const h1 = strip(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "");
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]));
  const body = strip(main);
  const afterH1 = body.slice(body.indexOf(h1) + h1.length);
  const first60 = afterH1.split(" ").slice(0, 60).join(" ");
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { try { const d = JSON.parse(m[1]); return [d, ...(d["@graph"] ?? [])]; } catch { return []; } });
  const ldTypes = ld.map((d) => d["@type"]).flat().filter(Boolean);
  const internalOut = new Set([...main.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((x) => x !== p.route)).size;
  const externalOut = [...main.matchAll(/href="(https?:\/\/(?!seoservicesedmonton\.ca)[^"]+)"/g)].length;
  const slugWords = p.route.split("/").filter(Boolean).pop()?.split("-").length ?? 0;
  const placeholders = (main.match(/class="ph"/g) || []).length;
  const checks = [];
  const add = (id, ok, msg, weight = 1) => checks.push({ id, ok, msg, weight });

  if (kw) {
    add("title-keyword", has(title, kw), `title contains "${kw}"`, 2);
    // owner rule: the meta title starts with the exact keyword, then " | "
    add("title-keyword-first", new RegExp(`^\\s*${phraseRe(kw).source}`).test(lc(title)), `title starts with the exact keyword, then " | " (is "${title}")`);
    add("h1-keyword", has(h1, kw), `H1 contains "${kw}"`, 2);
    add("desc-keyword", has(desc, kw), "meta description contains the keyword");
    add("first-60-words", has(first60, kw), "keyword in the first 60 words after the H1");
    add("meta-keywords-keyword", metaKw && norm(metaKw) === norm(kw), `meta keywords start with "${kw}" (${metaKw ? `first is "${metaKw}"` : "no <meta name=keywords> on the page"})`);
    if (p.page) add("keyword-field", lc(p.page.keyword ?? "") === kw, `page \`keyword\` field is the primary keyword "${kw}" (is "${p.page.keyword ?? ""}"; the template builds meta keywords from it)`);
    add("og-keyword", has(ogTitle, kw) && has(ogDesc, kw), "og:title and og:description contain the keyword");
    if (p.route !== "/") add("slug-keyword", norm(kw).split(" ").filter((w) => w.length > 3 && w !== "edmonton").some((w) => compact(p.route).includes(w)), "URL slug carries the keyword");
    if (isContent && type !== "Homepage" && !/hub/i.test(type)) add("keyword-volume", Number(volume) > 0, `keyword has verified search volume (plan/brief: ${volume ?? "not checked"})`);

    const ents = (brief?.entities ?? entry?.entities ?? []).map((e) => (typeof e === "string" ? e : e.name)).filter(Boolean);
    if (isContent && ents.length) {
      const covered = ents.filter((e) => entityCovered(e, body));
      const kwCount = countPhrase(body, kw);
      const kwWords = new Set(norm(kw).split(" "));
      const rivals = ents.filter((e) => !norm(e).split(" ").every((w) => kwWords.has(w)) && !/,/.test(e)).map((e) => entityCount(e, body));
      const kwSig = norm(kw).split(" ").filter((w) => w.length > 3 && w !== "edmonton");
      const h2Share = h2s.length ? h2s.filter((x) => has(x, kw) || kwSig.some((w) => norm(x).includes(w))).length / h2s.length : 0;
      const top = Math.max(0, ...rivals);
      const salience = Math.round(25 * +has(h1, kw) + 25 * +has(first60, kw) + 25 * Math.min(1, h2Share / 0.4) + 25 * +(kwCount >= top * 0.5));
      add("entity-coverage", covered.length / ents.length >= 0.8, `≥ 80% of plan entities in the text (${covered.length}/${ents.length}${covered.length < ents.length ? "; missing: " + ents.filter((e) => !covered.includes(e)).slice(0, 5).join(" · ") : ""})`, 2);
      add("entity-salience", salience >= 75, `central entity salience ≥ 75 (is ${salience}: H1 ${+has(h1, kw)}, first 60 ${+has(first60, kw)}, H2 share ${Math.round(h2Share * 100)}%, keyword ${kwCount}× vs top related entity ${top}×)`, 2);
      add("h2-share", h2Share >= 0.4, `≥ 40% of H2s carry the central entity (${Math.round(h2Share * 100)}%)`);
    }
    const attrs = brief?.attributes ?? (entry?.attributes ?? []).flatMap((a) => (typeof a === "string" ? [a] : a.attributes ?? []));
    if (isContent && attrs.length) {
      const hit = attrs.filter((a) => attrCovered(typeof a === "string" ? a : a.name ?? "", body));
      add("attribute-coverage", hit.length / attrs.length >= 0.7, `≥ 70% of plan attributes covered (${hit.length}/${attrs.length})`);
    }
    const grams = brief?.ngrams ?? [...(entry?.ngrams?.trigrams ?? []), ...(entry?.ngrams?.bigrams ?? [])];
    if (isContent && grams.length) {
      const hit = grams.filter((g) => hasPhrase(body, g));
      add("ngram-coverage", hit.length / grams.length >= 0.7, `≥ 70% of plan n-grams used (${hit.length}/${grams.length}${hit.length < grams.length ? "; missing: " + grams.filter((g) => !hit.includes(g)).slice(0, 4).join(", ") : ""})`);
    }
    const skips = brief?.skipgrams ?? entry?.skipgrams ?? [];
    if (isContent && skips.length) {
      const blocks = [...main.matchAll(/<(p|li|td|summary|h2|h3)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => strip(m[2]));
      const hit = skips.filter(([a, b]) => blocks.some((t) => hasPhrase(t, a) && hasPhrase(t, b)));
      add("skipgram-coverage", hit.length / skips.length >= 0.7, `≥ 70% of skip-gram pairs share a sentence or list item (${hit.length}/${skips.length}${hit.length < skips.length ? "; missing: " + skips.filter((s) => !hit.includes(s)).slice(0, 3).map((s) => s.join(" … ")).join(", ") : ""})`);
    }
    const faqs = brief?.paa ?? entry?.faqs ?? [];
    if (isContent && faqs.length) {
      const qs = [...main.matchAll(/<(summary|h2|h3)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => norm(strip(m[2])));
      const sig = (q) => norm(q).replace(/[?]/g, "").split(" ").filter((w) => w.length > 3);
      const answered = faqs.filter((q) => qs.some((t) => { const ws = sig(q); return ws.length && ws.filter((w) => t.includes(w)).length >= Math.ceil(ws.length * 0.6); }));
      add("plan-faqs", answered.length / faqs.length >= 0.8, `plan FAQ / PAA questions answered in an H2, H3 or FAQ (${answered.length}/${faqs.length})`);
    }
  }
  add("no-colon-title", !title.includes(":") && !h1.includes(":") && !ogTitle.includes(":"), "no \":\" in meta title, og:title or H1 (owner rule)", 2);
  add("title-length", title.length >= 30 && title.length <= 60, `title 30–60 chars (is ${title.length})`);
  add("desc-length", desc.length >= 110 && desc.length <= 160, `meta description 110–160 chars (is ${desc.length})`);
  add("one-h1", (main.match(/<h1[\s>]/g) || []).length === 1, "exactly one H1");
  if (isContent) add("h2-structure", h2s.length >= 3, `≥ 3 H2 sections (has ${h2s.length})`);
  add("slug-short", slugWords <= 6, `slug ≤ 6 words (has ${slugWords})`);
  if (isContent) add("content-depth", words(body) >= (isBlog ? 1200 : 600), `${isBlog ? "≥ 1,200" : "≥ 600"} words of content (has ${words(body)})`, 2);
  add("internal-out", internalOut >= (isContent ? 5 : 3), `≥ ${isContent ? 5 : 3} internal links out (has ${internalOut})`);
  add("internal-in", (inbound[p.route]?.size ?? 0) >= (p.route === "/" ? 0 : 3), `≥ 3 pages link here (has ${inbound[p.route]?.size ?? 0})`, 2);
  if (isBlog) add("external-sources", externalOut >= 2, `≥ 2 external sources (has ${externalOut})`);
  add("img-alt", [...main.matchAll(/<img\b[^>]*>/g)].every((m) => /\balt="[^"]+"/.test(m[0]) || /aria-hidden|role="presentation"|alt=""/.test(m[0])), "every content image has alt text");
  // visual blocks this site's components render: spot illustrations, SERP/map/code mockups, icon cards,
  // tables, step lists, checklists and photos (logo and footer photo excluded)
  const ownMain = main.replace(/<a class="post-thumb[\s\S]*?<\/a>/g, ""); // related-post thumbnails are not this page's visuals
  const visuals = (ownMain.match(/<svg class="illus"|class="(serp|map-viz|code-viz|viz)"|<table\b|class="steps|class="checklist|<figure\b/g) || []).length + [...ownMain.matchAll(/<img\b[^>]*>/g)].filter((m) => !/logo|City skyline/.test(m[0])).length;
  if (isContent) add("visuals", visuals >= (isBlog ? 3 : 2), `${isBlog ? "≥ 3" : "≥ 2"} visual blocks: illustration, mockup, table, steps, checklist or figure (has ${visuals})`);
  add("schema", ldTypes.length > 0, `structured data present (${[...new Set(ldTypes)].join(", ") || "none"})`);
  if (isBlog) add("schema-article", ldTypes.includes("BlogPosting"), "BlogPosting schema");
  if (/^(Service|Industry|Area|Blog post)$/.test(type)) add("faq", ldTypes.includes("FAQPage"), "FAQ section with FAQPage schema");
  if (isContent) {
    add("eeat-byline", /class="byline"/.test(main) && ld.some((d) => d.dateModified), "byline (author, reviewer, last updated) and dateModified");
    // layout-aware pages (patent US12393768B2): nothing important behind a click, right block types,
    // every H2 followed by text, tables introduced, explanatory images in <figure> with <figcaption>
    const faqDetails = [...main.matchAll(/<div class="faq2[\s\S]*?<\/section>/g)].reduce((n, m) => n + (m[0].match(/<details\b/g) || []).length, 0);
    const hidden = (main.match(/<details\b/g) || []).length - faqDetails;
    add("no-hidden-content", hidden <= 0, `no main content behind a click: only FAQs and navigation collapse (${Math.max(0, hidden)} collapsed blocks)`, 2);
    const h2Next = [...main.matchAll(/<\/h2>\s*(?:<\/div>\s*)?<([a-z0-9]+)/g)].map((m) => m[1]);
    const badH2 = h2Next.filter((t) => ["img", "figure", "picture", "svg", "video", "table"].includes(t)).length;
    add("h2-then-text", badH2 === 0, `every H2 is followed by text, not an image or table (${badH2} not)`);
    const tables = [...main.matchAll(/<div class="table-wrap/g)];
    const lone = tables.filter((m) => !/<p class="intro">(?:(?!<\/section>)[\s\S])*$/.test(main.slice(Math.max(0, m.index - 700), m.index)) && !/<\/p>\s*(<\/div>\s*)*$/.test(main.slice(Math.max(0, m.index - 200), m.index)));
    add("table-intro", lone.length === 0, `every table has a sentence that introduces it (${lone.length} without)`);
    const proseImgs = [...main.matchAll(/<div class="prose[\s\S]*?<\/section>/g)].flatMap((m) => [...m[0].matchAll(/<img\b[^>]*>/g)].map((i) => ({ i, block: m[0] })));
    const bare = proseImgs.filter(({ i, block }) => !/<figure[^>]*>(?:(?!<\/figure>)[\s\S])*$/.test(block.slice(0, i.index)) || !/<figcaption/.test(block.slice(i.index, i.index + 600)));
    add("figure-caption", bare.length === 0, `every in-article image sits in <figure> with a <figcaption> (${bare.length} without)`);
  }
  add("canonical", /<link rel="canonical"/.test(h), "canonical tag");
  add("og-image", /property="og:image"/.test(h), "Open Graph image");
  const total = checks.reduce((s, c) => s + c.weight, 0), got = checks.filter((c) => c.ok).reduce((s, c) => s + c.weight, 0);
  results.push({
    type: isBlog ? "blog" : isContent ? "content" : "other",
    planType: type,
    route: p.route,
    indexable: p.indexable,
    keyword: kw,
    keywordSource: brief?.keyword ? "brief" : planKeyword(entry) ? "plan" : p.page?.keyword ? "content" : null,
    pageKeyword: p.page?.keyword ?? null,
    volume: volume ?? null,
    score: Math.round((got / total) * 100),
    failed: checks.filter((c) => !c.ok).map((c) => `${c.id}: ${c.msg}`),
    placeholders,
    title,
    h1,
    words: words(body),
  });
}
results.sort((a, b) => a.score - b.score);
if (only) {
  console.log(JSON.stringify(results[0] ?? { error: "route not found (build first; the route needs a trailing slash)" }, null, 2));
  process.exit(0);
}
const scored = results.filter((r) => r.indexable);
const avg = scored.length ? Math.round(scored.reduce((s, r) => s + r.score, 0) / scored.length) : 0;
fs.mkdirSync(path.join(ROOT, "docs/data/onpage"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "docs/data/onpage/latest.json"), JSON.stringify({ generated: new Date().toISOString(), average: avg, pages: results }, null, 1) + "\n");
console.log(`On-page audit: ${scored.length} pages · average score ${avg}/100 → docs/data/onpage/latest.json\n`);
for (const r of results.slice(0, 25)) console.log(`${String(r.score).padStart(3)}  ${r.route}${r.indexable ? "" : " (draft)"}${r.failed.length ? "\n      - " + r.failed.join("\n      - ") : ""}`);
