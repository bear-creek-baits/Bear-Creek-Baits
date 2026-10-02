import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/big-shoulders-display';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import './globals.css';
import { site, prototypeNotice } from '@/content/site';
import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Crappie Soft Plastics, Hair Jigs & Jig Heads`,
    template: `%s | ${site.name}`,
  },
  description:
    'Bear Creek Baits makes crappie baits: soft plastics, hand-tied hair jigs, jig heads, bass baits and bait boxes. Shop online.',
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
  // Keep the preview out of search engines until launch.
  robots: site.prototype ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#151613',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {site.prototype && <div className="announce">{prototypeNotice}</div>}
        <CartProvider>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
