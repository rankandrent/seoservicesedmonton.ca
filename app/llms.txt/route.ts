import { GROUPS } from '@/content';
import { SITE } from '@/content/site';
import { strip, urlOf } from '@/lib/render';

export const dynamic = 'force-static';

// llms.txt: a plain-text map of the site for AI assistants and answer engines.
export function GET() {
  const lines = [`# ${SITE.brand}`, '', `> ${SITE.org_description}`, '', `Service area: Edmonton, Alberta, Canada. Contact: ${urlOf('contact')}`, ''];
  for (const [name, pages] of GROUPS) {
    lines.push(`## ${name}`, '');
    for (const p of pages) {
      if (p.noindex || p.slug === '404') continue;
      lines.push(`- [${strip(p.nav_label)}](${urlOf(p.slug)}): ${p.description}`);
    }
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
