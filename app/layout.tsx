import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { SITE } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  icons: { icon: { url: '/assets/img/favicon.svg', type: 'image/svg+xml' } },
  other: { 'geo.region': 'CA-AB', 'geo.placename': 'Edmonton' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#283220' };

export default function RootLayout({ children }: { children: ReactNode }) {
  preload('/assets/fonts/dm-sans-latin-400-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });
  preload('/assets/fonts/fraunces-latin-600-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: content stays visible without JS, and the reveal animation only runs with it. */}
        {/* The data attribute keeps scripts/postbuild.ts from removing it along with the Next.js runtime scripts. */}
        <script data-keep="js-class" dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <script src="/assets/js/main.js" defer></script>
      </body>
    </html>
  );
}
