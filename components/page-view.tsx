import type { Metadata } from 'next';
import type { Page } from '@/content/types';
import { SITE } from '@/content/site';
import { Footer, Header, Marquee } from '@/components/chrome';
import { PageSections } from '@/components/sections';
import { urlOf } from '@/lib/render';
import { schemaFor } from '@/lib/schema';

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

export function PageView({ page }: { page: Page }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaFor(page) }} />
      <a className="skip" href="#main">Skip to content</a>
      <Header page={page} />
      <Marquee />
      <main id="main"><PageSections page={page} /></main>
      <Footer page={page} />
    </>
  );
}
