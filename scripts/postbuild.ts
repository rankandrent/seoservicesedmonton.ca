// Runs after `next build`. Turns the export in out/ into plain static HTML and writes out/_headers.
//
// Every component is a server component, so pages need no React in the browser. Next.js still adds
// ~170 KB of runtime JS and a second copy of each page as an RSC payload, so this script removes them:
// pages ship as HTML + one CSS file + assets/js/main.js, which is what keeps Core Web Vitals fast.
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../content/site.ts';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'out');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

// Stripping the runtime would silently break a client component, so refuse to build with one.
for (const dir of ['app', 'components', 'lib']) {
  for (const file of walk(join(ROOT, dir))) {
    if (/['"]use client['"]/.test(readFileSync(file, 'utf8'))) {
      throw new Error(`${file} is a client component; scripts/postbuild.ts strips the React runtime. Use public/assets/js/main.js instead.`);
    }
  }
}

let pages = 0;
for (const file of walk(OUT)) {
  if (file.endsWith('.html')) {
    const html = readFileSync(file, 'utf8')
      .replace(/<script\b[^>]*\bsrc="\/_next\/[^"]*"[^>]*><\/script>/g, '')
      .replace(/<script(?:\s+id="[^"]*")?>[\s\S]*?<\/script>/g, '') // inline runtime bootstrap and RSC payload
      .replace(/<link rel="preload" as="script"[^>]*\/>/g, '')
      .replace('<div hidden=""><!--$--><!--/$--></div>', '');
    writeFileSync(file, html);
    pages++;
  } else if (file.endsWith('.txt') && !/\/(llms|robots)\.txt$/.test(file)) {
    rmSync(file); // RSC payloads, only used by client-side navigation
  } else if (file.includes('/_next/') && !file.endsWith('.css')) {
    rmSync(file); // runtime chunks no page references any more
  }
}
// Next also exports the 404 page at /404/ and /_not-found/, which would answer with status 200.
for (const extra of ['404', '_not-found', '_not-found.html']) rmSync(join(OUT, extra), { recursive: true, force: true });

const YEAR = 'Cache-Control: public, max-age=31536000, immutable';
let headers = [
  // Hashed by Next.js, safe to cache forever.
  '/_next/static/*', `  ${YEAR}`, '',
  '/assets/fonts/*', `  ${YEAR}`, '',
  // Not hashed: cache for a day so edits reach visitors.
  '/assets/img/*', '  Cache-Control: public, max-age=86400', '',
  '/assets/js/*', '  Cache-Control: public, max-age=86400', '',
].join('\n');
if (!SITE.indexable) headers += '\n/*\n  X-Robots-Tag: noindex, nofollow\n';
writeFileSync(join(OUT, '_headers'), headers);

console.log(`postbuild: cleaned ${pages} pages, wrote out/_headers`);
