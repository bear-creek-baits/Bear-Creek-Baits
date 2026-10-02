import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bear Creek Baits',
    short_name: 'Bear Creek',
    start_url: '/',
    display: 'standalone',
    background_color: '#151613',
    theme_color: '#151613',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
