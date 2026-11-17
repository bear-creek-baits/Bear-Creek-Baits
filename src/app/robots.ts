import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return site.prototype
    ? { rules: { userAgent: '*', disallow: '/' } }
    : { rules: { userAgent: '*', allow: '/', disallow: ['/order/', '/search/', '/api/', '/__forms.html', '/email-signature.html'] }, sitemap: `${site.url}/sitemap.xml` };
}
