import type { Metadata } from 'next';
import Link from 'next/link';
import { catches, toCards } from '@/data/catches';
import { site } from '@/content/site';
import { CatchGrid } from '@/components/catches/CatchGrid';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Customer Catches',
  description: 'Crappie caught on Bear Creek Baits, sent in by the people who caught them. Send in yours.',
  alternates: { canonical: '/catches/' },
};

export default function CatchesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Caught on Bear Creek</p>
          <h1>Customer Catches</h1>
          <p>Slabs caught on Bear Creek Baits, sent in by the folks who caught them. Got one? Send it in and it might end up here.</p>
          <p style={{ marginTop: 20 }}>
            <Link href="/catches/submit/" className="btn">
              <Icon name="camera" size={20} /> Send in your catch
            </Link>
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CatchGrid catches={toCards(catches)} filter />
          <p style={{ marginTop: 32, color: 'var(--muted)' }}>
            More catches get posted on{' '}
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              our Facebook page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
