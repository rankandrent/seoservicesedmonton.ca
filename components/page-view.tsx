import type { Metadata } from 'next';
import type { Page } from '@/content/types';
import { PERSON_BY_SLUG } from '@/content/people';
import { SITE } from '@/content/site';
import { Footer, Header, Marquee } from '@/components/chrome';
import { PageSections } from '@/components/sections';
import { planFor } from '@/lib/plan';
import { href, rich, urlOf } from '@/lib/render';
import { schemaFor } from '@/lib/schema';

const NO_BYLINE = new Set(['privacy-policy', 'terms', 'thank-you', '404']);

export function robotsFor(p: Page): string {
  if (!SITE.indexable) return 'noindex, nofollow';
  return p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
}

export function metadataFor(p: Page): Metadata {
  const url = urlOf(p.slug);
  const image = { url: '/assets/img/og-default.png', width: 1200, height: 630, alt: SITE.brand + ' SEO services in Edmonton' };
  return {
    title: p.title,
    description: p.description,
    robots: robotsFor(p),
    alternates: { canonical: url, languages: { 'en-CA': url } },
    openGraph: { type: p.article ? 'article' : 'website', siteName: SITE.brand, locale: 'en_CA', title: p.title, description: p.description, url, images: [image] },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [image.url] },
  };
}

/**
 * E-E-A-T byline: who wrote the page, who reviewed it, when it was last updated, and a link to our
 * editorial policy. Real people come from content/people.ts; until they exist the plan's role placeholders show.
 */
function Byline({ page }: { page: Page }) {
  if (!page.updated || NO_BYLINE.has(page.slug) || page.slug.startsWith('team/')) return null;
  const eeat = planFor(page.slug)?.eeat;
  const person = (slug?: string, fallback?: string) => {
    const p = slug ? PERSON_BY_SLUG[slug] : undefined;
    if (p) return <a href={href('team/' + p.slug)}>{p.name}</a>;
    return fallback?.startsWith('[[') ? rich(fallback, page.slug) : null;
  };
  const author = person(page.author, eeat?.author ?? '[[Author name]]');
  const reviewer = person(page.reviewer, eeat?.reviewer);
  const date = new Date(page.updated + 'T12:00:00Z').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  return (
    <section className="section tight byline-wrap">
      <div className="container">
        <p className="byline">
          {author && <span>Written by {author}</span>}
          {reviewer && <span>Reviewed by {reviewer}</span>}
          <span>Last updated <time dateTime={page.updated}>{date}</time></span>
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
