import type { Metadata } from 'next';
import type { Page } from '@/content/types';
import { PERSON_BY_SLUG } from '@/content/people';
import { SITE } from '@/content/site';
import { Footer, Header, Marquee } from '@/components/chrome';
import { PageSections } from '@/components/sections';
import { keywordsFor, planFor } from '@/lib/plan';
import { href, isPlaceholder, longDate, rich, strip, urlOf } from '@/lib/render';
import { schemaFor } from '@/lib/schema';

const NO_BYLINE = new Set(['privacy-policy', 'terms', 'thank-you', '404']);

export function robotsFor(p: Page): string {
  if (!SITE.indexable) return 'noindex, nofollow';
  return p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
}

export function metadataFor(p: Page): Metadata {
  const url = urlOf(p.slug);
  // Inline marks never reach the head: {{text|slug}} and **bold** become plain text, [[x]] becomes [x].
  const title = strip(p.title);
  const description = strip(p.description);
  if (!p.noindex && (isPlaceholder(title) || isPlaceholder(description))) {
    console.warn(`[meta] /${p.slug}: title or description still holds a placeholder`);
  }
  const keywords = keywordsFor(p.slug, p.keyword);
  const brand = isPlaceholder(SITE.brand) ? undefined : SITE.brand;
  const image = { url: '/assets/img/og-default.png', width: 1200, height: 630, alt: (brand ? brand + ' ' : '') + 'SEO services in Edmonton' };
  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    robots: robotsFor(p),
    alternates: { canonical: url, languages: { 'en-CA': url } },
    // og and twitter copy the title and description exactly.
    openGraph: {
      type: p.article ? 'article' : 'website', ...(brand ? { siteName: brand } : {}), locale: 'en_CA', title, description, url, images: [image],
      ...(p.article ? { publishedTime: p.article, ...(p.updated ? { modifiedTime: p.updated } : {}) } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

/**
 * E-E-A-T byline: who wrote the page, who reviewed it, when it was last updated, and a link to our
 * editorial policy. Real people come from content/people.ts; until they exist the plan's role placeholders show.
 */
function Byline({ page }: { page: Page }) {
  const date = page.updated ?? page.article;
  if (!date || NO_BYLINE.has(page.slug) || page.slug.startsWith('team/')) return null;
  const eeat = planFor(page.slug)?.eeat;
  const person = (slug?: string, fallback?: string) => {
    const p = slug ? PERSON_BY_SLUG[slug] : undefined;
    if (p) return <a href={href('team/' + p.slug)}>{p.name}</a>;
    return fallback?.startsWith('[[') ? rich(fallback, page.slug) : null;
  };
  const author = person(page.author, eeat?.author ?? '[[Author name]]');
  const reviewer = person(page.reviewer, eeat?.reviewer);
  return (
    <section className="section tight byline-wrap">
      <div className="container">
        <p className="byline">
          {author && <span>Written by {author}</span>}
          {reviewer && <span>Reviewed by {reviewer}</span>}
          {page.updated
            ? <span>Updated <time dateTime={page.updated}>{longDate(page.updated)}</time></span>
            : <span>Published <time dateTime={date}>{longDate(date)}</time></span>}
          <span><a href={href('how-we-work')}>How we write and check our pages</a></span>
        </p>
      </div>
    </section>
  );
}

export function PageView({ page }: { page: Page }) {
  const person = page.slug.startsWith('team/') ? PERSON_BY_SLUG[page.slug.slice(5)] : undefined;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaFor(page, person) }} />
      <a className="skip" href="#main">Skip to content</a>
      <Header page={page} />
      <Marquee />
      <main id="main"><PageSections page={page} byline={<Byline page={page} />} /></main>
      <Footer page={page} />
    </>
  );
}
