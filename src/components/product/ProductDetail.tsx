'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Category, Product } from '@/lib/types';
import { colorOption, defaultSelection, describeVariant, findVariant, formatPrice, isAvailable, orderRules, resolveSelection, unitNote } from '@/lib/catalog';
import { getColorway } from '@/data/colors';
import { useCart } from '@/components/cart/CartProvider';
import { ordering, orderingCopy, site } from '@/content/site';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Icon } from '@/components/ui/Icon';
import { ColorChip } from './ColorChip';
import { ProductMedia } from './ProductMedia';
import { VariantPicker } from './VariantPicker';
import styles from './ProductDetail.module.css';

export function ProductDetail({ product, category }: { product: Product; category: Category }) {
  const { add } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(() => defaultSelection(product));
  const rules = orderRules(product);
  const [qty, setQty] = useState(rules.min);
  const [justAdded, setJustAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);

  const variant = findVariant(product, selected) ?? product.variants[0];
  const productAvailable = isAvailable(product);
  const colorOpt = colorOption(product);
  const chosenColor = colorOpt ? getColorway(variant.options[colorOpt.name]) : undefined;
  // Most chart colors have no photo of this profile yet: show the profile in a photographed color
  // and the chosen color off the chart underneath.
  const shownColor = !variant.image && colorOpt ? product.variants.find((v) => v.image?.src === product.images[0]?.src)?.options[colorOpt.name] : undefined;

  // Preselect color from ?color= (used by product-card swatch previews and shareable links).
  useEffect(() => {
    if (!colorOpt) return;
    const c = new URLSearchParams(window.location.search).get('color');
    if (c && colorOpt.values.includes(c)) setSelected((s) => resolveSelection(product, s, colorOpt.name, c));
  }, [colorOpt, product]);

  // Show the sticky mobile add-to-cart bar once the main buy box scrolls out of view.
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(t);
  }, [justAdded]);

  const choose = (name: string, value: string) => {
    setSelected((s) => resolveSelection(product, s, name, value));
    if (colorOpt && name === colorOpt.name) {
      const url = new URL(window.location.href);
      url.searchParams.set('color', value);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const canAdd = variant.available && ordering.open;

  const addToCart = () => {
    if (!canAdd) return;
    add(variant.id, product.slug, Math.max(rules.min, qty));
    setJustAdded(true);
    setQty(rules.min);
  };

  const buttonLabel = !productAvailable
    ? 'Sold out'
    : !variant.available
      ? 'This option is sold out'
      : !ordering.open
        ? 'Orders paused'
        : justAdded
          ? orderingCopy.added
          : orderingCopy.add;

  return (
    <div className={`container ${styles.wrap}`}>
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <ol className="breadcrumbs">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop/">Shop</Link>
          </li>
          <li>
            <Link href={`/shop/${category.slug}/`}>{category.name}</Link>
          </li>
          <li aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <div className={styles.artWrap} key={variant.image?.src ?? variant.id}>
              <ProductMedia product={product} variant={variant} priority />
            </div>
            {product.badge && productAvailable && <span className={styles.badge}>{product.badge}</span>}
          </div>
          {chosenColor && shownColor && (
            <div className={styles.colorNote}>
              <span className={styles.colorNoteChip}>
                <ColorChip color={chosenColor.id} />
              </span>
              <p>
                <strong>
                  #{chosenColor.n} {chosenColor.name}
                </strong>
                <span>{chosenColor.description}</span>
                <span className={styles.colorNoteShown}>Photo shows the {product.title} in {getColorway(shownColor)?.name}.</span>
              </p>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <p className="eyebrow">{category.name}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(variant.price)}</span>
            {unitNote(product) && <span className={styles.unitNote}>{unitNote(product)}</span>}
            {!variant.available && <span className={styles.soldTag}>Sold out</span>}
          </div>
          <p className={styles.summary}>{product.summary}</p>

          <div className={styles.options}>
            <VariantPicker product={product} selected={selected} onChange={choose} />
          </div>

          <div ref={buyRef} className={styles.buy}>
            <QuantityStepper
              value={qty}
              onChange={setQty}
              min={rules.min}
              max={rules.max}
              step={rules.step}
              label={rules.unit ? `Quantity (${rules.unit}s)` : 'Quantity'}
              disabled={!canAdd}
            />
            <button type="button" className={`btn ${styles.addBtn} ${justAdded ? styles.added : ''}`} onClick={addToCart} disabled={!canAdd}>
              {justAdded && <Icon name="check" size={20} />}
              {buttonLabel}
            </button>
          </div>
          {rules.unit && canAdd && (
            <p className={styles.lineTotal}>
              {Math.max(rules.min, qty)} {rules.unit}s · {formatPrice(variant.price * Math.max(rules.min, qty))}
            </p>
          )}
          {variant.available && ordering.open && (
            <p className={styles.pourNote}>
              Every profile comes in every color on the chart. We pour one or two colors at a time, so if yours isn’t already poured, it
              goes on the pour list and we’ll confirm timing before you pay.{' '}
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                See today’s pour on Facebook
              </a>
              .
            </p>
          )}
          {!variant.available ? (
            <p className={styles.soldNote}>
              {productAvailable ? 'This option is' : 'This one is'} sold out. We pour in runs, so it’ll be back.{' '}
              <Link href="/contact/">Ask about a restock</Link>.
            </p>
          ) : (
            !ordering.open && (
              <p className={styles.soldNote}>
                {ordering.pausedMessage} <Link href="/contact/">Questions? Get in touch</Link>.
              </p>
            )
          )}
          <p className={styles.live} role="status" aria-live="polite">
            {justAdded ? `${product.title}, ${describeVariant(product, variant)} added to your ${orderingCopy.listName.toLowerCase()}.` : ''}
          </p>

          <div className={styles.accordions}>
            <details open>
              <summary>
                Description <Icon name="chevron-down" size={20} />
              </summary>
              <div className="prose">
                {product.description.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>
            </details>
            <details>
              <summary>
                Details <Icon name="chevron-down" size={20} />
              </summary>
              <ul>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
                {product.options.map((o) => (
                  <li key={o.name}>
                    {o.name} options: {o.values.length}
                  </li>
                ))}
              </ul>
            </details>
            <details>
              <summary>
                Shipping &amp; returns <Icon name="chevron-down" size={20} />
              </summary>
              <p>
                {orderingCopy.shippingNote} Questions about an order? <Link href="/contact/">Get in touch</Link>.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Sticky mobile add button */}
      <div className={`${styles.sticky} ${showSticky ? styles.stickyOn : ''}`} aria-hidden={!showSticky} inert={!showSticky}>
        <div className={styles.stickyInfo}>
          <span className={styles.stickyTitle}>{product.title}</span>
          <span className={styles.stickyMeta}>
            {formatPrice(variant.price)} · {describeVariant(product, variant)}
          </span>
        </div>
        <button type="button" className="btn btn-sm" onClick={addToCart} disabled={!canAdd}>
          {!variant.available ? 'Sold out' : !ordering.open ? 'Paused' : justAdded ? 'Added' : orderingCopy.addShort}
        </button>
      </div>
    </div>
  );
}
