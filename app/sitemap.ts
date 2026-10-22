import type { MetadataRoute } from 'next';
import { PAGES } from '@/content';
import { urlOf } from '@/lib/render';

export const dynamic = 'force-static';

// Indexable pages only. lastmod is given only where it is a real date (blog posts), since a build date
// that changes on every deploy teaches Google to ignore lastmod.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.filter((p) => !p.noindex && p.slug !== '404').map((p) => ({
    url: urlOf(p.slug),
    ...(p.article ? { lastModified: p.article } : {}),
  }));
}
