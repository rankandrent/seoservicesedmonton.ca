// Internal-link opportunities ("use the topical authority you already have").
// Finds built pages that already talk about a topic but do not link to the target page yet, so one
// contextual link can move that relevance to the page that best satisfies the intent.
//
//   npm run build && npm run links:find -- "<target route>" "<phrase>" ["<phrase>" ...]
//   e.g. npm run links:find -- /services/local-seo/ "map pack" "google business profile"
//
// Output per source page: the section (H2 text, plus #id when the section has one, for a jump link),
// the sentence that holds the phrase, whether the page already links the target, whether it is a
// conversion page (contact, free audit: link sparingly), and its Search Console clicks/impressions when
// docs/data/gsc/latest.json exists (click-validated links: borrow from pages people actually visit).
// Pre-launch, every page that will be indexable at launch is searched; drafts are skipped.
import { builtPages, loadContent, loadGsc, mainOf, strip } from "./lib/site-data.mjs";

const [target, ...phrases] = process.argv.slice(2);
if (!target || !phrases.length) {
  console.error('usage: npm run links:find -- "/target/route/" "phrase" ["phrase" ...]');
  process.exit(1);
}
const content = await loadContent();
const CONVERSION = /^\/(contact|free-seo-audit|thank-you|privacy-policy|terms)\/$/;
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const res = phrases.map((p) => new RegExp(`\\b${esc(p).replace(/\s+/g, "[\\s-]+")}\\b`, "i"));
const gsc = loadGsc();
const traffic = new Map((gsc?.pages ?? []).map((r) => [new URL(r.page).pathname, r]));

const rows = [];
for (const p of builtPages(content).filter((x) => x.indexable && x.route !== target)) {
  const main = mainOf(p.html);
  const linked = main.includes(`href="${target}"`);
  // split main into blocks at each section and each h2
  for (const part of main.split(/(?=<section\b|<h2\b)/)) {
    const id = part.match(/^<(?:section|h2)[^>]*\sid="([^"]+)"/)?.[1] ?? "";
    const h2 = strip(part.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "");
    for (const para of part.match(/<(p|li|td)[^>]*>[\s\S]*?<\/\1>/g) ?? []) {
      if (para.includes(`href="${target}"`) || /^<p class="date"/.test(para)) continue;
      const text = strip(para);
      if (text.length < 30) continue; // labels, tags and placeholders are not sentences a link can sit in
      const hit = res.find((r) => r.test(text));
      if (!hit) continue;
      const sentence = text.split(/(?<=[.!?])\s+/).find((s) => hit.test(s)) ?? text;
      const t = traffic.get(p.route);
      rows.push({ route: p.route, section: (id ? `#${id} ` : "") + (h2 ? `"${h2}"` : ""), alreadyLinksTarget: linked, conversionPage: CONVERSION.test(p.route), clicks: t?.clicks ?? null, impressions: t?.impressions ?? null, phrase: text.match(hit)[0], sentence: sentence.slice(0, 220) });
    }
  }
}
// best sources first: pages that do not link yet, informational before conversion, most clicks first
rows.sort((a, b) => Number(a.alreadyLinksTarget) - Number(b.alreadyLinksTarget) || Number(a.conversionPage) - Number(b.conversionPage) || (b.clicks ?? -1) - (a.clicks ?? -1) || a.route.localeCompare(b.route));
const seen = new Set();
const unique = rows.filter((r) => { const k = r.route + r.sentence; if (seen.has(k)) return false; seen.add(k); return true; });
console.log(`Target ${target} — ${unique.length} mentions on ${new Set(unique.map((r) => r.route)).size} pages${gsc ? "" : " (no GSC data yet: run the Search Console workflow for click-validated sources)"}\n`);
for (const r of unique.slice(0, 60)) {
  const flags = [r.alreadyLinksTarget && "already links target", r.conversionPage && "conversion page: skip", r.clicks !== null && `${r.clicks} clicks / ${r.impressions} impr.`].filter(Boolean).join(", ");
  console.log(`${r.route} ${r.section}${flags ? `  (${flags})` : ""}\n   "${r.phrase}" → ${r.sentence}\n`);
}
