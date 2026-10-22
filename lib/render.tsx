import { Fragment, type ReactNode } from 'react';
import { BY_SLUG, DRAFTS } from '@/content';
import { ICONS } from '@/content/icons';
import { ILLUS } from '@/content/illus';
import { SITE } from '@/content/site';

const EXTERNAL = /^(http|#|mailto:|tel:)/;

/** Site-relative href for a slug ('' = home), keeping any #anchor. */
export function href(to: string): string {
  if (EXTERNAL.test(to)) return to;
  const [path, anchor] = to.split('#');
  return (path ? '/' + path + '/' : '/') + (anchor !== undefined ? '#' + anchor : '');
}

/** Absolute URL for canonicals, schema, sitemap and llms.txt. */
export function urlOf(slug: string): string {
  if (EXTERNAL.test(slug)) return slug;
  return SITE.domain + (slug ? '/' + slug + '/' : '/');
}

/**
 * Whether `from` may link to `to`. Pages that are not built yet (later plan phases) are never linked, so
 * links in the content appear on their own once the target page exists. Live pages never link to drafts;
 * drafts may link to each other so they still preview properly.
 */
export function linkable(to: string, from: string): boolean {
  if (EXTERNAL.test(to)) return true;
  const slug = to.split('#')[0];
  if (!(slug in BY_SLUG)) return false;
  return !DRAFTS.has(slug) || DRAFTS.has(from);
}

// {{text|}} (empty slug) links to the homepage.
const MARKS = /\[\[(.+?)\]\]|\*\*(.+?)\*\*|\{\{(.+?)\|(.*?)\}\}/g;

/** Render content text with its inline marks: [[placeholder]], **bold** and {{link text|slug}}. */
export function rich(text: string, from: string): ReactNode {
  const s = String(text);
  const out: ReactNode[] = [];
  const re = new RegExp(MARKS.source, 'g');
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const k = m.index;
    if (m[1] !== undefined) out.push(<span key={k} className="ph">[{m[1]}]</span>);
    else if (m[2] !== undefined) out.push(<strong key={k}>{rich(m[2], from)}</strong>);
    else if (linkable(m[4], from)) out.push(<a key={k} href={href(m[4])}>{rich(m[3], from)}</a>);
    else out.push(<Fragment key={k}>{rich(m[3], from)}</Fragment>);
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}

/** Plain text version of content text (for schema, alt text and llms.txt). */
export function strip(text: string): string {
  return String(text)
    .replace(/\[\[(.+?)\]\]/g, '[$1]')
    .replace(/\{\{(.+?)\|(.*?)\}\}/g, '$1')
    .replaceAll('**', '');
}

/** True when a value still holds a placeholder ([[x]], [x] or the BrandName stand-in) and must not be published as a fact. */
export function isPlaceholder(text: unknown): boolean {
  return typeof text === 'string' && (/\[[^\]]*\]/.test(text) || text.includes('BrandName'));
}

/** Long-form date for bylines and post cards, e.g. "October 23, 2026". */
export function longDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function Icon({ name, color = '#283220' }: { name: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  );
}

export const Arrow = () => <Icon name="arrow" color="currentColor" />;

export function Illus({ name }: { name?: string }) {
  const svg = ILLUS[name ?? 'search'] ?? ILLUS.search;
  const m = svg.match(/^<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>$/)!;
  return (
    <svg className="illus" viewBox={m[1]} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: m[2] }} />
  );
}

/** Photo slot. External URL = licensed stock photo. Local name = placeholder until the owner adds public/assets/img/<file>. */
export function Photo({ file, alt, cls = '' }: { file: string; alt: string; cls?: string }) {
  const className = ['photo', cls].filter(Boolean).join(' ');
  if (file.startsWith('http')) {
    return <div className={className}><img src={file} alt={alt} loading="lazy" decoding="async" data-fallback="hide" /></div>;
  }
  return (
    <div className={className}>
      <div className="photo-ph"><Icon name="image" color="#4d5748" /><span>Add photo: assets/img/{file}</span></div>
      <img src={'/assets/img/' + file} alt={alt} loading="lazy" data-fallback="remove" />
    </div>
  );
}

export const PASTELS = ['p-lilac', 'p-mint', 'p-cream', 'p-sky'];
export const CHIPS = ['chip-mint', 'chip-cream', 'chip-lilac', 'chip-sky'];
