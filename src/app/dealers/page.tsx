import type { Metadata } from 'next';
import Link from 'next/link';
import { DealerFinder } from '@/components/dealers/DealerFinder';

export const metadata: Metadata = {
  title: 'Find a Dealer',
  description: 'Find Bear Creek Baits at tackle shops around Pickwick Lake and the Shoals. Enter your zip code to see the closest dealer.',
  alternates: { canonical: '/dealers/' },
};

export default function DealersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Local dealers</p>
          <h1>Find a dealer</h1>
          <p>
            Pick up Bear Creek Baits at tackle shops around Pickwick Lake and the Shoals. Enter your zip code to see the closest one. More shops
            carry them too; <Link href="/contact/">ask us</Link> if you don’t see one near you.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <DealerFinder />
        </div>
      </section>
    </>
  );
}
