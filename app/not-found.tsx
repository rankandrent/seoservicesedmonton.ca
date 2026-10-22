import { BY_SLUG } from '@/content';
import { metadataFor, PageView } from '@/components/page-view';

export const metadata = metadataFor(BY_SLUG['404']);

export default function NotFound() {
  return <PageView page={BY_SLUG['404']} />;
}
