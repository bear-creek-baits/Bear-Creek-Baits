import type { NextConfig } from 'next';

// Static export keeps the prototype host-anywhere (Netlify, Vercel, GitHub Pages, S3).
// When this becomes a live store, checkout/cart will hand off to Shopify, so no server is needed here.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
