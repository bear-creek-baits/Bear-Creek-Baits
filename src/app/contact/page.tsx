import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { ContactForm } from './ContactForm';
import styles from '../pages.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Questions about an order, a color or a custom request? Get in touch with Bear Creek Baits.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch</h1>
          <p>Questions about an order, a color, a restock or a bulk request? Send a message.</p>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          <ContactForm />
          <aside className={styles.contactAside}>
            <h2 className={styles.h3}>Other ways to reach us</h2>
            <a href={site.social.facebook} className={styles.contactLink} target="_blank" rel="noopener noreferrer">
              <span className={styles.contactIcon}>
                <Icon name="facebook" size={22} />
              </span>
              <span>
                <strong>Facebook</strong>
                <span>Message Bear Creek Baits</span>
              </span>
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className={styles.contactLink}>
                <span className={styles.contactIcon}>@</span>
                <span>
                  <strong>Email</strong>
                  <span>{site.email}</span>
                </span>
              </a>
            )}
            {site.phone && (
              <a href={`tel:${site.phone}`} className={styles.contactLink}>
                <span className={styles.contactIcon}>☎</span>
                <span>
                  <strong>Phone</strong>
                  <span>{site.phone}</span>
                </span>
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
