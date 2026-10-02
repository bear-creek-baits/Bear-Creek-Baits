import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import styles from '../pages.module.css';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about ordering from Bear Creek Baits.',
  alternates: { canonical: '/faq/' },
};

/*
 * DRAFT — answers avoid stating policies that have not been confirmed.
 * Replace with the real shipping, returns and order details before launch.
 */
const faqs = [
  {
    q: 'How much is shipping?',
    a: 'Shipping options and rates are shown at checkout before you pay.',
  },
  {
    q: 'Which jig head should I pair with a soft plastic?',
    a: 'Each product page lists matching baits under “You might also need.” If you’re unsure, send a message and we’ll point you in the right direction.',
  },
  {
    q: 'What’s in a bait box?',
    a: 'Bait boxes are an assortment of soft plastics and jig heads. You choose the size and color lean; exact contents vary.',
  },
  {
    q: 'A color I want is sold out. Will it come back?',
    a: 'Sold-out colors are marked on the product page. Reach out through the contact page to ask about a restock.',
  },
  {
    q: 'Do you take bulk or custom orders?',
    a: 'Ask through the contact page with what you have in mind.',
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Help</p>
          <h1>FAQ</h1>
          <p>Quick answers to common questions.</p>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.narrow}`}>
          <div className={styles.faq}>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q} <Icon name="plus" size={20} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className={styles.faqMore}>
            Still have a question? <Link href="/contact/">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
