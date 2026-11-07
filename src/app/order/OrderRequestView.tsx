'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart, type ResolvedLine } from '@/components/cart/CartProvider';
import { ProductMedia } from '@/components/product/ProductMedia';
import { Icon } from '@/components/ui/Icon';
import { brand, ordering, site } from '@/content/site';
import { describeVariant, formatPrice, orderRules } from '@/lib/catalog';
import styles from '../pages.module.css';

/**
 * Phase 1 ordering: the customer sends their list as a request. Nothing is charged here.
 * Steve confirms stock, total and shipping, then takes payment the way he does today.
 *
 * Requests are POSTed to `ordering.formEndpoint` (Formspree or any form service). While that is null,
 * the form validates and confirms but nothing is delivered.
 */

type Field = 'name' | 'email' | 'phone' | 'location' | 'contactBy';
type Errors = Partial<Record<Field, string>>;

const contactOptions = ['Email', 'Text message', 'Phone call'];

function orderSummary(lines: ResolvedLine[], subtotal: number): string {
  const rows = lines.map((l) => `${l.quantity} × ${l.product.title} (${describeVariant(l.product, l.variant)}) @ ${formatPrice(l.variant.price)}`);
  return [...rows, '', `Estimated subtotal: ${formatPrice(subtotal)} (before shipping)`].join('\n');
}

export function OrderRequestView() {
  const { lines, subtotal, count, ready, clear, open: openList } = useCart();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed'>('idle');
  const [sent, setSent] = useState<{ contactBy: string } | null>(null);
  const [shortLines, setShortLines] = useState<string[]>([]);

  if (!ready) {
    return <div className={`container ${styles.checkoutLoading}`} aria-busy="true" />;
  }

  if (sent) {
    return (
      <section className="section">
        <div className={`container ${styles.narrow} ${styles.center}`}>
          <span className={styles.sentIcon}>
            <Icon name="check" size={28} />
          </span>
          <h1 className={styles.h1}>Got it. Your order request is in.</h1>
          <p className={styles.lead}>
            We’ll reach out by {sent.contactBy.toLowerCase()} to confirm your total, shipping and when your baits will be poured. Nothing is
            charged until then.
          </p>
          <p className={styles.lead}>{brand.promise}</p>
          {site.prototype && !ordering.formEndpoint && <p className={styles.protoNote}>Preview site: this request was not delivered.</p>}
          <Link href="/shop/" className="btn">
            Back to the baits
          </Link>
        </div>
      </section>
    );
  }

  if (!lines.length) {
    return (
      <section className="section">
        <div className={`container ${styles.narrow} ${styles.center}`}>
          <h1 className={styles.h1}>Your order list is empty</h1>
          <p className={styles.lead}>Add the baits you want, then come back here to send the request.</p>
          <Link href="/shop/" className="btn">
            Shop crappie baits
          </Link>
        </div>
      </section>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const val = (k: string) => String(data.get(k) ?? '').trim();

    const next: Errors = {};
    if (!val('name')) next.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(val('email'))) next.email = 'Enter a valid email address.';
    if (val('contactBy') !== 'Email' && val('phone').replace(/\D/g, '').length < 10) {
      next.phone = 'Add a phone number so we can text or call you.';
    }
    if (!val('location')) next.location = 'Enter your city and state so we can figure shipping.';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    // Honeypot: real people never fill this hidden field.
    if (val('_gotcha')) return;

    const short = lines.filter((l) => l.quantity < orderRules(l.product).min);
    setShortLines(short.map((l) => `${l.product.title} (${describeVariant(l.product, l.variant)}): ${orderRules(l.product).min} minimum`));
    if (short.length) return;

    data.set('order', orderSummary(lines, subtotal));
    data.set('_subject', `Order request from ${val('name')}`);

    if (ordering.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(ordering.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
      } catch {
        setStatus('failed');
        return;
      }
    }

    clear();
    setStatus('idle');
    setSent({ contactBy: val('contactBy') || 'Email' });
    window.scrollTo({ top: 0 });
  };

  const err = (k: Field) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: Field) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined });

  return (
    <section className="section">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Order request</li>
          </ol>
        </nav>
        <h1 className={styles.h1}>Send an order request</h1>

        <div className={styles.checkoutGrid}>
          <div className={styles.protoPanel}>
            {ordering.open ? (
              <>
                <h2 className={styles.h3}>How it works</h2>
                <ol className={styles.steps}>
                  <li>Send us your list. Nothing is charged online.</li>
                  <li>Anything not already poured goes on the pour list. We pour one or two colors at a time.</li>
                  <li>We reach out to confirm your total, shipping and timing.</li>
                  <li>Once you say go, we pack it and send it your way.</li>
                </ol>

                <form className={styles.form} noValidate onSubmit={onSubmit}>
                  <div className={styles.formRow}>
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" className="input" autoComplete="name" {...a11y('name')} />
                      {err('name')}
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" className="input" autoComplete="email" {...a11y('email')} />
                      {err('email')}
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className="field">
                      <label htmlFor="contactBy">Best way to reach you</label>
                      <select id="contactBy" name="contactBy" className="input" defaultValue="Email">
                        {contactOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="phone">
                        Phone <span className={styles.optional}>(for text or call)</span>
                      </label>
                      <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" {...a11y('phone')} />
                      {err('phone')}
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="location">City and state</label>
                    <input id="location" name="location" className="input" autoComplete="address-level2" placeholder="City, ST" {...a11y('location')} />
                    {err('location')}
                  </div>
                  <div className="field">
                    <label htmlFor="notes">
                      Notes <span className={styles.optional}>(optional)</span>
                    </label>
                    <textarea id="notes" name="notes" className="input" placeholder="Color swaps you’d take if one is out, a date you need it by, a custom request…" />
                  </div>
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />

                  <button type="submit" className="btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send order request'}
                  </button>
                  {shortLines.length > 0 && (
                    <div className="field-error" role="alert">
                      Bump these up to the minimum, then send again:
                      <ul>
                        {shortLines.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {status === 'failed' && (
                    <p className="field-error" role="alert">
                      That didn’t go through. Your list is still saved. Try again, or{' '}
                      <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                        message us on Facebook
                      </a>
                      .
                    </p>
                  )}
                  {site.prototype && !ordering.formEndpoint && (
                    <p className={styles.protoNote}>Preview site: order requests are not delivered yet.</p>
                  )}
                </form>
              </>
            ) : (
              <>
                <span className={styles.protoBadge}>Orders paused</span>
                <h2 className={styles.h3}>We’re catching up on orders</h2>
                <p>{ordering.pausedMessage}</p>
                <p>Your list is saved on this device, so it’ll be right here when we open back up.</p>
                <a href={site.social.facebook} className="btn btn-dark" target="_blank" rel="noopener noreferrer">
                  <Icon name="facebook" size={20} /> Watch Facebook for the reopen
                </a>
              </>
            )}
          </div>

          <aside className={styles.summary} aria-labelledby="summary-title">
            <h2 id="summary-title" className={styles.h3}>
              Your list <span>({count})</span>
            </h2>
            <ul>
              {lines.map((l) => (
                <li key={l.variantId}>
                  <span className={styles.sumThumb}>
                    <ProductMedia product={l.product} labelled={false} />
                    <span className={styles.sumQty}>{l.quantity}</span>
                  </span>
                  <span className={styles.sumInfo}>
                    <strong>{l.product.title}</strong>
                    <span>
                      {describeVariant(l.product, l.variant)}
                      {l.product.unit ? ` · ${l.quantity} ${l.product.unit}s` : ''}
                    </span>
                  </span>
                  <span className={styles.sumPrice}>{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl>
              <div>
                <dt>Shipping</dt>
                <dd>We’ll confirm</dd>
              </div>
              <div className={styles.sumTotal}>
                <dt>Estimated subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <button type="button" className={`btn btn-outline btn-sm ${styles.editList}`} onClick={openList}>
              Edit list
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
