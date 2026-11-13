import type { MetadataRoute } from 'next';
import { categories } from '@/data/categories';
import { getAllProducts } from '@/lib/catalog';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    '',
    '/shop/',
    '/colors/',
    '/about/',
    '/contact/',
    '/faq/',
    '/privacy/',
    '/dealers/',
    '/catches/',
    '/catches/submit/',
    ...(categories.length > 1 ? categories.map((c) => `/shop/${c.slug}/`) : []),
    ...getAllProducts().map((p) => `/products/${p.slug}/`),
  ].map((path) => ({ url: `${base}${path || '/'}` }));
}
