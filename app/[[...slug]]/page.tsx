import { notFound } from 'next/navigation';
import { BY_SLUG, PAGES } from '@/content';
import { metadataFor, PageView } from '@/components/page-view';

type Params = { params: Promise<{ slug?: string[] }> };

// Every page is pre-rendered at build time; unknown paths fall through to the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.filter((p) => p.slug !== '404').map((p) => ({ slug: p.slug ? p.slug.split('/') : [] }));
}

async function pageFor(params: Params['params']) {
  const { slug = [] } = await params;
  return BY_SLUG[slug.join('/')];
}

export async function generateMetadata({ params }: Params) {
  const page = await pageFor(params);
  return page ? metadataFor(page) : {};
}

export default async function Route({ params }: Params) {
  const page = await pageFor(params);
  if (!page) notFound();
  return <PageView page={page} />;
}
