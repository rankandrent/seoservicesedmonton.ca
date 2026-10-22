import type { NextConfig } from 'next';

// Fully static export: every page is pre-rendered HTML in out/, served by the Cloudflare Worker.
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
