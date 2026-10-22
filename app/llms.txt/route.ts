import { GROUPS } from '@/content';
import { SITE } from '@/content/site';
import { isPlaceholder, strip, urlOf } from '@/lib/render';

export const dynamic = 'force-static';

// llms.txt: a plain-text map of the site for AI assistants and answer engines.
export function GET() {
  // Until the real brand name exists, the domain stands in for it rather than the BrandName placeholder.
  const brand = isPlaceholder(SITE.brand) ? new URL(SITE.domain).host : SITE.brand;
  const about = isPlaceholder(SITE.org_description) ? SITE.org_description.replaceAll('BrandName', brand) : SITE.org_description;
  const lines = [`# ${brand}`, '', `> ${about}`, '', `Service area: Edmonton, Alberta, Canada. Contact: ${urlOf('contact')}`, ''];
  for (const [name, pages] of GROUPS) {
    // Only public pages; a group with none (e.g. case studies while all are drafts) gets no heading.
    const shown = pages.filter((p) => !p.noindex && !p.draft && p.slug !== '404');
    if (!shown.length) continue;
    lines.push(`## ${name}`, '');
    for (const p of shown) lines.push(`- [${strip(p.nav_label)}](${urlOf(p.slug)}): ${strip(p.description)}`);
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
