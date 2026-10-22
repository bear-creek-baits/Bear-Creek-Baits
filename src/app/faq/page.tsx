import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ordering } from '@/content/site';
import styles from '../pages.module.css';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'How ordering works at Bear Creek Baits: picking a profile and color, the pour list, shipping and custom orders.',
  alternates: { canonical: '/faq/' },
};

/*
 * DRAFT — answers avoid stating policies that have not been confirmed.
 * Replace with the real shipping, returns and order details before launch.
 */
const orderingFaqs =
  ordering.mode === 'request'
    ? [
        {
          q: 'How does ordering work?',
          a: 'Add the baits you want to your order list and send it as an order request. Nothing is charged online. We check your list against what’s already poured, then reach out by email, text or phone to confirm your total and shipping. Once you say go, we pack it up.',
        },
        {
          q: 'Why can’t I pay on the site?',
          a: 'We pour one or two colors at a time. Confirming each order first means you only pay for baits that are ready to ship, and nobody waits on something that hasn’t been poured yet.',
        },
        {
          q: 'How much is shipping?',
          a: 'We’ll confirm shipping when we reach out about your order, before anything is charged.',
        },
        {
          q: 'What does “Orders paused” mean?',
          a: 'When orders stack up, we pause new ones so we can keep up with the ones we have. You can still browse and build your list, and it stays saved on your device until we open back up.',
        },
      ]
    : [
        {
          q: 'How much is shipping?',
          a: 'Shipping options and rates are shown at checkout before you pay.',
        },
      ];

const faqs = [
  ...orderingFaqs,
  {
    q: 'What jig head should I rig these on?',
    a: 'A light crappie jig head. For the 1.5" Swim Bait, use a #8 sickle hook; a #6 J hook will get by. If you’re unsure, send a message and we’ll point you in the right direction.',
  },
  {
    q: 'Can I order any color?',
    a: 'Yes. Every size and color on the site can be ordered. Every profile comes in every color on the color chart. We pour one or two colors at a time, so if yours isn’t already poured it goes on the pour list. We’ll tell you the timing when we confirm your order.',
  },
  {
    q: 'How do I see what you poured today?',
    a: 'We post each day’s run on our Facebook page. If something there catches your eye, add it to your order list and mention it in the notes.',
  },
  {
    q: 'Is there a minimum order?',
    a: 'Soft plastics are poured in runs, so there’s a 50-bait minimum for each size and color.',
  },
  {
    q: 'Can I buy Bear Creek Baits in a store?',
    a: 'Yes. Several tackle shops around Pickwick and the Shoals carry them. Use the dealer finder to see the closest one to you.',
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
          <p>How ordering works, the pour list, shipping and the rest.</p>
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
