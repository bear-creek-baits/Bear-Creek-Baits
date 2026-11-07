'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { describeVariant, formatPrice, getAllProducts, orderRules } from '@/lib/catalog';
import { useCart } from './CartProvider';
import { useDialog } from '@/components/layout/useDialog';
import { ProductMedia } from '@/components/product/ProductMedia';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Icon } from '@/components/ui/Icon';
import { site, ordering, orderingCopy } from '@/content/site';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { lines, isOpen, close, update, remove, subtotal, count, lastAdded } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useDialog(isOpen, ref, close);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div className={`${styles.scrim} ${isOpen ? styles.on : ''}`} onClick={close} aria-hidden="true" />
      <aside
        ref={ref}
        className={`${styles.drawer} ${isOpen ? styles.on : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
      >
        <header className={styles.head}>
          <h2 id="cart-title">
            Your {orderingCopy.listName.toLowerCase()} {count > 0 && <span className={styles.count}>({count})</span>}
          </h2>
          <button type="button" className={styles.close} onClick={close} aria-label={`Close ${orderingCopy.listName.toLowerCase()}`}>
            <Icon name="close" size={24} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Icon name="cart" size={34} strokeWidth={1.6} />
            </div>
            <p className={styles.emptyTitle}>Your {orderingCopy.listName.toLowerCase()} is empty</p>
            <p className={styles.emptyText}>Pick a profile to get started.</p>
            <ul className={styles.emptyCats}>
              {getAllProducts().map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}/`} onClick={close}>
                    {p.title} <Icon name="arrow-right" size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <ul className={styles.lines}>
              {lines.map((l) => (
                <li key={l.variantId} className={`${styles.line} ${lastAdded === l.variantId ? styles.fresh : ''}`}>
                  <Link href={`/products/${l.slug}/`} className={styles.thumb} onClick={close} tabIndex={-1} aria-hidden="true">
                    <ProductMedia product={l.product} labelled={false} />
                  </Link>
                  <div className={styles.info}>
                    <div className={styles.row}>
                      <Link href={`/products/${l.slug}/`} className={styles.title} onClick={close}>
                        {l.product.title}
                      </Link>
                      <span className={styles.lineTotal}>{formatPrice(l.lineTotal)}</span>
                    </div>
                    <p className={styles.meta}>{describeVariant(l.product, l.variant)}</p>
                    <p className={styles.unit}>
                      {formatPrice(l.variant.price)} {l.product.unit ? `per ${l.product.unit}` : 'each'}
                    </p>
                    <div className={styles.row}>
                      <QuantityStepper
                        size="sm"
                        value={l.quantity}
                        min={orderRules(l.product).min}
                        max={orderRules(l.product).max}
                        step={orderRules(l.product).step}
                        label={`Quantity for ${l.product.title}`}
                        onChange={(n) => update(l.variantId, n)}
                      />
                      <button type="button" className={styles.remove} onClick={() => remove(l.variantId)}>
                        <Icon name="trash" size={18} /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className={styles.foot}>
              <div className={styles.subtotal}>
                <span>{ordering.mode === 'request' ? 'Estimated subtotal' : 'Subtotal'}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className={styles.note}>{orderingCopy.listNote}</p>
              {ordering.open ? (
                <Link href={orderingCopy.orderHref} className="btn btn-block" onClick={close}>
                  {ordering.mode === 'shopify' && <Icon name="lock" size={18} />} {orderingCopy.goToOrder}
                </Link>
              ) : (
                <p className={styles.paused} role="status">
                  <strong>Orders paused.</strong> Your list is saved on this device for when we open back up.
                </p>
              )}
              <button type="button" className={`btn btn-outline btn-block ${styles.keep}`} onClick={close}>
                Keep shopping
              </button>
              {site.prototype && (
                <p className={styles.proto}>Preview site: {ordering.mode === 'request' ? 'order requests are not delivered yet.' : 'checkout is not live yet.'}</p>
              )}
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
