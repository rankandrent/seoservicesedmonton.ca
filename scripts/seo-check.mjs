// Audits the static export in ./out. Run after a build:   npm run build && npm run seo:check
//
// Every page that is indexable at launch is checked for: one <h1>, title and description length,
// no ":" in the meta title, og:title or H1 (owner rule), canonical, og:image, img alt text, valid
// JSON-LD, broken internal links, links to draft pages, duplicate titles/descriptions, the plan rules
// (homepage owns the head-term cluster, no town × industry pages, area swap test) and writing rules
// (banned phrases, hedges, Canadian spelling, Yes/No FAQs, plan n-grams).
//
// Live-page lock (owner rule): docs/content-system/locked-pages.json maps route → meta title of every
// live page. A locked route that disappears, or whose title changes, is an error. New indexable routes
// are added automatically, but ONLY once the site is launched (content/site.ts indexable: true).
// Pre-launch nothing is recorded, so titles can still be fixed before launch.
//
// Exit code: 1 on errors once the site is launched, or with --strict (the gate for new pages).
// Name draft routes to check them too: npm run seo:check -- --strict /blog/new-post/
// Pre-launch without --strict it reports the errors that would block launch and exits 0.
import fs from "node:fs";
import path from "node:path";
import { ROOT, OUT, builtPages, lc, loadContent, loadPlan, mainOf, norm, planKeyword, siteIndexable, strip, words } from "./lib/site-data.mjs";

const STRICT = process.argv.includes("--strict");
const content = await loadContent();
const plan = loadPlan();
const launched = siteIndexable(content);
const all = builtPages(content);
// Routes named on the command line are checked even while they are drafts (QA of a new page):
//   npm run seo:check -- --strict /blog/new-post/
const extra = new Set(process.argv.slice(2).filter((a) => a.startsWith("/")));
const pages = all.filter((p) => p.indexable || extra.has(p.route));
const drafts = new Set(all.filter((p) => p.draft || !p.indexable).map((p) => p.route));

const exists = (href) => {
  const p = path.join(OUT, decodeURI(href));
  return (fs.existsSync(p) && fs.statSync(p).isFile()) || fs.existsSync(path.join(p, "index.html"));
};
let errors = 0, warnings = 0;
const report = (lvl, route, msg) => {
  if (lvl === "error") errors++;
  else warnings++;
  console.log(`${lvl === "error" ? "✗" : "!"} ${route}  ${msg}`);
};
const titles = new Map(), descs = new Map(), live = new Map();
const h2Patterns = new Map();
const unescape = (s = "") => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

// ---- writing rules (owner + Koray), applied to the visible main text
const BANNED = [/\bAlso,/, /\bAs (stated|mentioned|explained)\b/i, /\bAccording to\b/i, /should know/i, /In today's/i, /It is important to note/i, /\bIn conclusion\b/i, /\bdelve\b/i, /\bleverage\b/i, /\bseamless/i, /cutting-edge/i, /world-class/i, /game[- ]changer/i, /\bunlock\b/i];
const HEDGES = /\b(might|perhaps|possibly)\b/i; // "may/could" are too common in honest legal wording; QA reads them by hand
// Canadian English: flag US-only spellings (Canadian usage keeps -ize, so "optimize" is fine)
const US_SPELLING = /\b(color(s|ed|ful)?|center(s|ed)?|neighborhood(s)?|favorite(s)?|behavior(s|al)?|honor(s|ed)?|labor|catalog(s)?|traveled|traveling|theater(s)?|meter(s)? of|gray)\b/i;
const BOOL_Q = /^(is|are|do|does|did|can|will|should|would|has|have)\b/i;
const ABBR = {
  SEO: "search engine optimization",
  GBP: "Google Business Profile",
  NAP: "name, address",
  PPC: "pay-per-click",
  GEO: "generative engine optimization",
  HVAC: "heating, ventilation",
  KPI: "key performance indicator",
  ROI: "return on investment",
  CTR: "click-through rate",
  RECA: "Real Estate Council of Alberta",
  CDSA: "College of Dental Surgeons of Alberta",
};

// ---- plan rules
const home = plan.get("/");
const headTerms = [planKeyword(home), ...(home?.secondary ?? []).map((s) => norm(s.kw))].filter(Boolean).map(norm);
const TOWNS = ["edmonton", "st albert", "sherwood park", "spruce grove", "leduc", "fort saskatchewan", "stony plain", "beaumont", "morinville", "devon", "gibbons", "nisku", "strathcona", "parkland"];
const INDUSTRY_SLUGS = [...plan.keys()].filter((u) => /^\/industries\/[^/]+\/$/.test(u)).map((u) => u.split("/")[2]);
const areaTexts = new Map();
const abbrMisses = new Map(); // abbreviation → pages where it is never expanded (reported once per abbreviation)
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// phrase matcher that treats "on-page", "on page" and "onpage" alike
const phraseRe = (kw) => new RegExp(`\\b${norm(kw).split(" ").map((w) => esc(w).split("").join("[\\s-]?")).join("[\\s-]*")}\\b`, "g");
const PROPER = /\b(Merchant|Help|Business|Data|Learning|Privacy|Search|Media|Trust) Center\b/g;

for (const p of pages) {
  const { html, route } = p;
  const title = unescape(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = unescape(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const ogTitle = unescape(html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? "");
  const main = mainOf(html);
  const h1s = (main.match(/<h1[\s>]/g) || []).length;
  const h1 = strip(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "");

  if (h1s !== 1) report("error", route, `expected 1 <h1>, found ${h1s}`);
  if (!title) report("error", route, "missing <title>");
  else if (title.length > 60 || title.length < 30) report("warn", route, `title is ${title.length} chars (aim 30–60): "${title}"`);
  // Owner rule 2026-10-21: no colon in any title (meta title, og:title, H1)
  if (title.includes(":")) report("error", route, `title contains ":" (owner rule): "${title}"`);
  if (ogTitle.includes(":") && ogTitle !== title) report("error", route, `og:title contains ":" (owner rule): "${ogTitle}"`);
  if (h1.includes(":")) report("error", route, `H1 contains ":" (owner rule): "${h1}"`);
  if (/\[[^\]]+\]/.test(title)) report("error", route, `title still holds a placeholder: "${title}"`);
  if (!desc) report("error", route, "missing meta description");
  else if (desc.length < 110 || desc.length > 160) report("warn", route, `description is ${desc.length} chars (plan: 110–160)`);
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canon) report("error", route, "missing canonical");
  else if (!canon.endsWith(route)) report("warn", route, `canonical ${canon} does not match the route`);
  const og = html.match(/<meta property="og:image" content="https?:\/\/[^/]+([^"]+)"/)?.[1];
  if (!og) report("error", route, "missing og:image");
  else if (!exists(og.split("?")[0])) report("error", route, `og:image file not found: ${og}`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt="/.test(img)) report("error", route, `img without alt: ${img.slice(0, 80)}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      report("error", route, "invalid JSON-LD");
    }
  }
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith("/_next") || href.startsWith("/api/")) continue;
    if (!exists(href)) report("error", route, `broken link → ${href}`);
    else if (p.indexable && drafts.has(href) && href !== route && !/^\/(thank-you)\/$/.test(href)) report("error", route, `live page links to a draft/noindex page → ${href}`);
  }
  const ph = (main.match(/class="ph"/g) || []).length;
  if (ph && launched) report("warn", route, `${ph} [placeholder]s still on a live page (honesty rule: real data or remove)`);
  titles.set(title, [...(titles.get(title) || []), route]);
  descs.set(desc, [...(descs.get(desc) || []), route]);
  if (p.indexable) live.set(route, title);

  // ---- plan rule: homepage owns the head-term cluster (no other page uses them in title or H1)
  const entry = plan.get(route);
  if (route !== "/" && headTerms.length) {
    const own = planKeyword(entry) ?? norm(p.page?.keyword ?? "");
    for (const [label, text] of [["title", title], ["H1", h1]]) {
      let t = lc(text);
      if (own) t = t.replace(phraseRe(own), " | ");
      for (const term of headTerms) {
        if (!phraseRe(term).test(t)) continue;
        report(term.split(" ").length >= 3 ? "error" : "warn", route, `${label} uses the homepage head term "${term}" (plan: the homepage owns that cluster)`);
      }
    }
  }
  // ---- plan rule: no town × industry pages, max two URL levels
  const segs = route.split("/").filter(Boolean);
  if (segs.length > 2 && /^(services|industries|areas)$/.test(segs[0])) report("error", route, "more than two URL levels (plan: /services|industries|areas/<slug>/ only)");
  const slug = norm(segs.at(-1)?.replace(/-/g, " ") ?? "");
  if (segs.length >= 2 && TOWNS.some((t) => slug.includes(t)) && INDUSTRY_SLUGS.some((i) => slug.includes(norm(i.replace(/-/g, " "))))) report("error", route, "town × industry page (plan rule: never)");

  // ---- writing rules on visible main text (nav/footer excluded by using <main>)
  const text = strip(main);
  for (const re of BANNED) if (re.test(text)) report("warn", route, `[writing] banned phrase ${re}`);
  const hedge = text.match(HEDGES);
  if (hedge) report("warn", route, `[writing] hedge "${hedge[0]}"`);
  const us = text.replace(PROPER, "").match(US_SPELLING);
  if (us) report("warn", route, `[writing] US spelling "${us[0]}" (site writes Canadian English)`);
  for (const [, q, a] of main.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<div class="answer">([\s\S]*?)<\/div>/g)) {
    const qq = strip(q), aa = strip(a);
    if (BOOL_Q.test(qq) && !/\bor\b/i.test(qq) && !/^(yes|no)\b/i.test(aa)) report("warn", route, `[writing] boolean FAQ "${qq}" does not start with Yes/No`);
    if (qq.includes(":")) report("warn", route, `[writing] FAQ question contains ":" "${qq}"`);
  }
  for (const [ab, full] of Object.entries(ABBR)) {
    if (!new RegExp(`\\b${ab}\\b`).test(text)) continue;
    if (!norm(text).includes(norm(full))) (abbrMisses.get(ab) ?? abbrMisses.set(ab, []).get(ab)).push(route);
  }
  if (entry?.ngrams) {
    const t = lc(text);
    const grams = [...(entry.ngrams.trigrams ?? []), ...(entry.ngrams.bigrams ?? [])];
    const missing = grams.filter((g) => !phraseRe(g).test(t));
    if (grams.length && missing.length / grams.length > 0.3) report("warn", route, `[semantic] ${missing.length}/${grams.length} plan n-grams missing: ${missing.slice(0, 6).join(", ")}`);
  }

  // templated H2s: H2 text with the page's own H1/keyword words removed
  const own = new Set(norm(`${h1} ${planKeyword(entry) ?? ""} ${p.page?.nav_label ?? ""}`).match(/[a-z0-9']+/g) || []);
  for (const [, h] of main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const t = norm(strip(h));
    if (/^(common questions|faq|related|ready|talk to us|get in touch|more|recent articles|get to know us)/.test(t)) continue;
    const pattern = t.split(/\s+/).filter((w) => !own.has(w)).join(" ");
    if (pattern.split(" ").length < 3) continue;
    (h2Patterns.get(pattern) ?? h2Patterns.set(pattern, []).get(pattern)).push(route);
  }
  if (/^\/areas\/[^/]+\/$/.test(route)) {
    let t = norm(text);
    for (const town of TOWNS) t = t.split(town).join("TOWN");
    areaTexts.set(route, t);
  }
}

for (const [ab, r] of abbrMisses) report("warn", "(site)", `[writing] abbreviation ${ab} is used but never expanded ("${ABBR[ab]}… (${ab})") on ${r.length} page(s): ${r.join(", ")}`);
for (const [pattern, r] of h2Patterns) if (r.length >= 3) report("warn", "(site)", `templated H2 "${pattern}" repeated on ${r.length} pages: ${r.join(", ")}`);
for (const [t, r] of titles) if (t && r.length > 1) report("warn", "(site)", `duplicate title "${t}" on ${r.join(", ")}`);
for (const [d, r] of descs) if (d && r.length > 1) report("warn", "(site)", `duplicate description on ${r.join(", ")}`);

// ---- area swap test (plan): with town names masked, two area pages must not read the same
const grams5 = (t) => { const w = t.split(" "); const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(" ")); return s; };
const areas = [...areaTexts];
for (let i = 0; i < areas.length; i++)
  for (let j = i + 1; j < areas.length; j++) {
    const a = grams5(areas[i][1]), b = grams5(areas[j][1]);
    const shared = [...a].filter((g) => b.has(g)).length / Math.min(a.size, b.size || 1);
    if (shared > 0.12) report("warn", "(site)", `swap test: ${areas[i][0]} and ${areas[j][0]} share ${Math.round(shared * 100)}% of 5-grams with town names masked (limit 12%)`);
  }

// ---- live-page lock (owner rule 2026-10-22)
const LOCK = path.join(ROOT, "docs/content-system/locked-pages.json");
const NOTE = "Live pages: slug never changes; meta title changes only with owner approval (then edit the entry). Maintained by scripts/seo-check.mjs. Empty until launch: pages are only locked once content/site.ts has indexable: true.";
const locked = fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, "utf8")) : { note: NOTE, pages: {} };
locked.pages ??= {};
for (const [route, title] of Object.entries(locked.pages)) {
  if (!live.has(route)) report("error", route, `locked page is missing: slug changed or page removed/noindexed (owner rule: never change a live slug)`);
  else if (live.get(route) !== title) report("error", route, `meta title of a live page changed without owner approval: "${title}" → "${live.get(route)}" (if approved, update docs/content-system/locked-pages.json)`);
}
if (launched) {
  let added = 0;
  for (const [route, title] of live) if (!(route in locked.pages)) { locked.pages[route] = title; added++; }
  if (added && !errors) fs.writeFileSync(LOCK, JSON.stringify({ note: NOTE, pages: Object.fromEntries(Object.entries(locked.pages).sort()) }, null, 1) + "\n");
  if (added) console.log(`locked-pages: ${added} new live page(s) ${errors ? "not saved (fix errors first)" : "added"}`);
} else {
  console.log(`locked-pages: pre-launch (indexable: false), nothing recorded; ${live.size} pages would be locked at launch`);
}

console.log(`\n${launched ? "LIVE" : "PRE-LAUNCH"} · ${pages.length} pages checked (${pages.filter((p) => !p.indexable).length} named drafts included, ${all.length - pages.length} drafts/noindex skipped) · ${errors} errors · ${warnings} warnings`);
if (!launched && errors && !STRICT) console.log(`Pre-launch: ${errors} error(s) above would block launch. Use --strict to fail on them.`);
process.exit(errors && (launched || STRICT) ? 1 : 0);
