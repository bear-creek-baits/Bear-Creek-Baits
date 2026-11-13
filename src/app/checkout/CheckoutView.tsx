'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { ProductMedia } from '@/components/product/ProductMedia';
import { Icon } from '@/components/ui/Icon';
import { describeVariant, formatPrice } from '@/lib/catalog';
import styles from '../pages.module.css';

/**
 * Prototype checkout hand-off.
 * In production this page goes away: the Checkout button sends the shopper to Shopify's hosted
 * checkout (cart.checkoutUrl), which handles payment, tax and shipping. No payment data is collected here.
 */
export function CheckoutView() {
  const { lines, subtotal, count, ready, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (!ready) {
    return <div className={`container ${styles.checkoutLoading}`} aria-busy="true" />;
  }

  if (placed) {
    return (
      <section className="section">
        <div className={`container ${styles.narrow} ${styles.center}`}>
          <span className={styles.sentIcon}>
            <Icon name="check" size={28} />
          </span>
          <h1 className={styles.h1}>Demo order complete</h1>
          <p className={styles.lead}>
            That’s the full shopping flow. On the live store, this is where Shopify’s secure checkout takes payment and sends an order confirmation.
          </p>
          <Link href="/shop/" className="btn">
            Back to the shop
          </Link>
        </div>
      </section>
    );
  }

  if (!lines.length) {
    return (
      <section className="section">
        <div className={`container ${styles.narrow} ${styles.center}`}>
          <h1 className={styles.h1}>Your cart is empty</h1>
          <p className={styles.lead}>Add a few baits and come back to check out.</p>
          <Link href="/shop/" className="btn">
            Shop baits
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Checkout</li>
          </ol>
        </nav>
        <h1 className={styles.h1}>Checkout</h1>

        <div className={styles.checkoutGrid}>
          <div className={styles.protoPanel}>
            <span className={styles.protoBadge}>
              <Icon name="lock" size={16} /> Secure checkout
            </span>
            <h2 className={styles.h3}>Payment happens on Shopify</h2>
            <p>
              When the store goes live, this step hands your cart to Shopify’s secure checkout for shipping, taxes and payment. This preview
              doesn’t collect any payment or personal information.
            </p>
            <ol className={styles.steps}>
              <li>Review your order</li>
              <li>Enter shipping details on secure checkout</li>
              <li>Pay and get an order confirmation by email</li>
            </ol>
            <button
              type="button"
              className="btn btn-block"
              onClick={() => {
                clear();
                setPlaced(true);
                window.scrollTo({ top: 0 });
              }}
            >
              Complete demo order
            </button>
            <p className={styles.protoNote}>Preview site: no order is placed and nothing is charged.</p>
          </div>

          <aside className={styles.summary} aria-labelledby="summary-title">
            <h2 id="summary-title" className={styles.h3}>
              Order summary <span>({count})</span>
            </h2>
            <ul>
              {lines.map((l) => (
                <li key={l.variantId}>
                  <span className={styles.sumThumb}>
                    <ProductMedia product={l.product} labelled={false} thumb />
                    <span className={styles.sumQty}>{l.quantity}</span>
                  </span>
                  <span className={styles.sumInfo}>
                    <strong>{l.product.title}</strong>
                    <span>{describeVariant(l.product, l.variant)}</span>
                  </span>
                  <span className={styles.sumPrice}>{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>Calculated at checkout</dd>
              </div>
              <div className={styles.sumTotal}>
                <dt>Estimated total</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
