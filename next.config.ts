import type { NextConfig } from 'next';

// Static export keeps the prototype host-anywhere (Netlify, Vercel, GitHub Pages, S3).
// When this becomes a live store, checkout/cart will hand off to Shopify, so no server is needed here.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Set only by `npm run build:preview` (claude.ai artifact preview), whose host reserves top-level paths starting with "_".
  assetPrefix: process.env.ASSET_PREFIX || undefined,
};

export default nextConfig;
