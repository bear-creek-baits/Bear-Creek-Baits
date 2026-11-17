import type { NextConfig } from 'next';

// Static export: the site builds to plain files in out/. The only server code is the Netlify Functions in netlify/.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
