// Shared helpers for the SEO scripts (seo-check, onpage-audit, link-opportunities).
// Reads three things: the static export in out/, the page objects in content/*.ts (bundled on the fly
// with esbuild, which ships with wrangler), and the semantic plan in plan/content-plan.json.
// Routes always use the built form: "/" for the homepage, "/services/local-seo/" for the rest.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const OUT = path.join(ROOT, "out");

export const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

/** "/services/local-seo/" for out/services/local-seo/index.html, "/" for out/index.html. */
export const routeOf = (file) => {
  const rel = path.relative(OUT, path.dirname(file)).replace(/\\/g, "/");
  return rel ? `/${rel}/` : "/";
};
/** content slug ('' = home, 'services/local-seo') → route */
export const routeOfSlug = (slug) => (slug ? `/${slug}/` : "/");

export const strip = (h = "") =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&rsquo;|’/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
export const words = (t) => (t.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
export const lc = (s = "") => String(s).toLowerCase().replace(/\s+/g, " ").trim();
// hyphen/space variants count as the same word: "on-page" = "onpage"; "St. Albert" = "st albert"
export const norm = (s = "") => lc(s).replace(/(?<=[a-z0-9])[-‐‑](?=[a-z0-9])/g, "").replace(/(?<=\bst)\./g, "").replace(/[’']/g, "'");
export const compact = (s = "") => norm(s).replace(/[\s-]+/g, "");

/** The <main> element of a built page (falls back to the whole document). */
export const mainOf = (html) => html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;

/** Load content/index.ts and content/site.ts. Returns null if esbuild is unavailable. */
export async function loadContent() {
  let esbuild;
  try {
    esbuild = await import("esbuild");
  } catch {
    return null;
  }
  const out = {};
  for (const [name, entry] of [["index", "content/index.ts"], ["site", "content/site.ts"]]) {
    const res = (esbuild.buildSync ?? esbuild.default.buildSync)({
      entryPoints: [path.join(ROOT, entry)],
      bundle: true,
      format: "esm",
      platform: "node",
      write: false,
      logLevel: "silent",
    });
    const tmp = path.join(os.tmpdir(), `seo-content-${process.pid}-${name}.mjs`);
    fs.writeFileSync(tmp, res.outputFiles[0].text);
    try {
      out[name] = await import(pathToFileURL(tmp).href);
    } finally {
      fs.rmSync(tmp, { force: true });
    }
  }
  return { PAGES: out.index.PAGES, BY_SLUG: out.index.BY_SLUG, SITE: out.site.SITE };
}

/** Whether the site is launched (content/site.ts indexable: true). */
export function siteIndexable(content) {
  if (content?.SITE) return !!content.SITE.indexable;
  const src = fs.readFileSync(path.join(ROOT, "content/site.ts"), "utf8");
  return /["']?indexable["']?\s*:\s*true/.test(src);
}

/** Plan entries keyed by route. */
export function loadPlan() {
  const f = path.join(ROOT, "plan/content-plan.json");
  if (!fs.existsSync(f)) return new Map();
  const plan = JSON.parse(fs.readFileSync(f, "utf8"));
  return new Map((plan.pages ?? []).map((p) => [p.url, p]));
}

/** Briefs written by the keyword researcher (docs/content-system/briefs/<slug>.json), keyed by route. */
export function loadBriefs() {
  const dir = path.join(ROOT, "docs/content-system/briefs");
  const map = new Map();
  if (!fs.existsSync(dir)) return map;
  for (const f of fs.readdirSync(dir).filter((x) => /^[^.]+\.json$/.test(x))) {
    try {
      const b = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      // every brief carries its target `url`; a brief without one is assumed to be a blog post
      const route = b.url ?? `/blog/${b.slug ?? f.replace(/\.json$/, "")}/`;
      map.set(route, b);
    } catch {
      /* unreadable brief: ignored here, QA reports it */
    }
  }
  return map;
}

/** A usable primary keyword from the plan ("seo services (hub)" → "seo services"; brand/template rows → null). */
export function planKeyword(entry) {
  const kw = entry?.primary?.kw;
  if (!kw || kw === "-" || /[[\]/]/.test(kw)) return null;
  return lc(kw.replace(/\([^)]*\)/g, ""));
}

/** Built pages with their route, html and whether they are indexable at launch. */
export function builtPages(content) {
  if (!fs.existsSync(OUT)) {
    console.error("out/ not found: run `npm run build` first.");
    process.exit(2);
  }
  const launched = siteIndexable(content);
  const bySlug = content?.BY_SLUG ?? {};
  let sitemap = null;
  const sm = path.join(OUT, "sitemap.xml");
  if (fs.existsSync(sm)) sitemap = new Set([...fs.readFileSync(sm, "utf8").matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/"));
  return walk(OUT)
    .filter((f) => f.endsWith("index.html"))
    .map((file) => {
      const route = routeOf(file);
      const html = fs.readFileSync(file, "utf8");
      const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
      const page = bySlug[route === "/" ? "" : route.slice(1, -1)];
      // Launched: trust the robots meta. Pre-launch every page is noindex, so use the page's own flags
      // (noindex/draft in content) or, without content, the sitemap (which lists indexable pages only).
      let indexable;
      if (launched) indexable = !/noindex/.test(robots);
      else if (page) indexable = !page.noindex && !page.draft && page.slug !== "404";
      else indexable = sitemap ? sitemap.has(route) : true;
      return { file, route, html, robots, page, indexable, draft: !!page?.draft };
    });
}

/** Load GSC data if the weekly workflow has written it. */
export function loadGsc() {
  const f = path.join(ROOT, "docs/data/gsc/latest.json");
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null;
}
