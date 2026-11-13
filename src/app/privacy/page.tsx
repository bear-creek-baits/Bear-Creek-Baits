import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';
import styles from '../pages.module.css';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What Bear Creek Baits collects through this website, why, who helps us handle it, and how to have it removed.',
  alternates: { canonical: '/privacy/' },
};

/*
 * Plain-English privacy notice. Keep it matched to what the site actually does: if a form, a
 * service (hosting, email) or tracking is added or changed, update the matching section and the date.
 */
const UPDATED = 'November 13, 2026';

export default function PrivacyPage() {
  const email = site.email ?? 'us through the contact page';
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">The fine print, in plain English</p>
          <h1>Privacy</h1>
          <p>What we collect when you use this site, why, and how to have it removed. Last updated {UPDATED}.</p>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.narrow} prose`}>
          <h2>The short version</h2>
          <ul>
            <li>We only collect what you type into a form or send us: an order request, a message, or a catch photo.</li>
            <li>We use it to answer you and fill your order. We don’t sell it, rent it or use it for advertising.</li>
            <li>We don’t take payments on this site, so we never see card or bank details here.</li>
            <li>No ad trackers and no tracking cookies.</li>
            <li>
              Want something removed? Email <a href={`mailto:${site.email}`}>{email}</a> and we’ll take care of it.
            </li>
          </ul>

          <h2>Who we are</h2>
          <p>
            This site belongs to {site.legalName}, a small Mississippi business that pours crappie soft plastics. When this page says
            “we”, that’s us.
          </p>

          <h2>What we collect, and why</h2>
          <h3>Order requests</h3>
          <p>
            When you send an order request we get your name, email, how you’d like us to reach you (email, text or a call), your phone number if
            you give it, your city and state, any notes, and the list of baits you picked. We use it to confirm your order, total and shipping
            with you, and to keep a record of the order.
          </p>
          <p>
            Your order list is saved in your own browser until you send it, so it’s still there when you come back. It stays on your device and
            isn’t sent to us until you hit send. Clearing your browser’s site data removes it.
          </p>
          <h3>Messages</h3>
          <p>When you use the contact form we get your name, email, what it’s about and your message, and use them to answer you.</p>
          <h3>Catch photos</h3>
          <p>
            When you send in a catch we get your photos, the name you want shown, the lake or state if you give one, the bait and color, and
            your email and notes if you add them. Your phone or computer shrinks each photo before it’s sent, which also strips out the location and camera
            details stored in it.
          </p>
          <p>
            We look at every catch before anything goes up. If we post it, your photo, the name you gave, the lake or state, and the bait and
            color appear on this site and may be shared on our Facebook page. Your email and notes are never shown. If we don’t post it, it’s
            deleted.
          </p>
          <h3>What you don’t have to give us</h3>
          <p>
            Your phone number (unless you want a text or a call), your email on a catch, and the lake or state are all optional. We don’t ask
            for your address until we’re confirming shipping with you directly.
          </p>

          <h2>What we don’t do</h2>
          <ul>
            <li>We don’t sell, rent or trade your information, or use it for advertising.</li>
            <li>We don’t add you to a mailing list. We only contact you about what you sent us.</li>
            <li>We don’t run ad trackers, “like” buttons or tracking cookies on this site.</li>
            <li>We don’t take payments online. Payment happens directly with us after we confirm your order.</li>
          </ul>

          <h2>Who helps us run the site</h2>
          <p>A few services handle information for us so the site works. They only use it to provide their service to us:</p>
          <ul>
            <li>
              <strong>Netlify</strong> hosts the website and stores what’s sent through the forms. Like any web host, it keeps short-lived
              technical logs (such as IP addresses) for security, and it runs a spam filter on form submissions.
            </li>
            <li>
              <strong>Resend</strong> delivers the emails that tell us a form was sent.
            </li>
            <li>
              <strong>Google (Gmail)</strong> is our email inbox.
            </li>
            <li>
              <strong>Cloudflare</strong> runs our domain name and forwards email sent to our address.
            </li>
            <li>
              <strong>GitHub</strong> holds the website’s files, including catch photos once we post them.
            </li>
          </ul>
          <p>
            We may also share information if the law requires it. If you follow a link to Facebook or another site, that site’s own privacy
            policy applies.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep order requests and messages as long as we need them to take care of your order and for our business records. Catches we
            don’t post are deleted after we review them. Posted catches stay up until you ask us to take them down.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what we have about you, ask us to correct it, or ask us to delete it, including taking a catch photo off the site. Email{' '}
            <a href={`mailto:${site.email}`}>{email}</a> or use the <Link href="/contact/">contact page</Link>, and we’ll take care of it.
          </p>

          <h2>Kids</h2>
          <p>
            This site isn’t meant for children under 13, and we don’t knowingly collect information from them. If a parent finds that their
            child sent us something, let us know and we’ll delete it.
          </p>

          <h2>Changes</h2>
          <p>If we change how we handle information, we’ll update this page and the date at the top.</p>
        </div>
      </section>
    </>
  );
}
