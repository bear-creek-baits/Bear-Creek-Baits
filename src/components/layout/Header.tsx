'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getAllProducts, photographedColors } from '@/lib/catalog';
import { site, orderingCopy } from '@/content/site';
import { asset } from '@/lib/asset';
import { useCart } from '@/components/cart/CartProvider';
import { Icon } from '@/components/ui/Icon';
import { BaitPhoto } from '@/components/product/BaitPhoto';
import { SearchPanel } from './SearchPanel';
import { useDialog } from './useDialog';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const { count, open: openCart, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useDialog(menuOpen, menuRef, () => setMenuOpen(false), menuBtnRef);

  useEffect(() => {
    // Shrink past 80px, grow back only at the very top. The desktop bar changes height when it
    // shrinks, so a single threshold would flip back and forth as the page shifts under it.
    const onScroll = () => setScrolled((was) => (was ? window.scrollY > 4 : window.scrollY > 80));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close overlays on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.bar}`}>
          <button
            ref={menuBtnRef}
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={26} />
          </button>

          <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/brand/logo.webp')} alt="" width={474} height={464} />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul>
              <li>
                <Link href="/shop/" className={isActive('/shop') || isActive('/products') ? styles.active : undefined}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/colors/" className={isActive('/colors') ? styles.active : undefined}>
                  Color Chart
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link href="/dealers/" className={`${styles.utilLink} ${isActive('/dealers') ? styles.active : ''}`}>
              Dealers
            </Link>
            <Link href="/about/" className={`${styles.utilLink} ${isActive('/about') ? styles.active : ''}`}>
              About
            </Link>
            <Link href="/contact/" className={`${styles.utilLink} ${isActive('/contact') ? styles.active : ''}`}>
              Contact
            </Link>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Search products"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(true)}
            >
              <Icon name="search" size={24} />
            </button>
            <button type="button" className={`${styles.iconBtn} ${styles.cartBtn}`} onClick={openCart} aria-label={`Open ${orderingCopy.listName.toLowerCase()}, ${count} item${count === 1 ? '' : 's'}`}>
              <Icon name="cart" size={25} />
              {ready && count > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`${styles.scrim} ${menuOpen ? styles.scrimOn : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.drawer} ${menuOpen ? styles.drawerOn : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
      >
        <div className={styles.drawerHead}>
          <Link href="/" className={styles.drawerLogo} aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/brand/logo.webp')} alt="" width={474} height={464} />
          </Link>
          <button type="button" className={styles.iconBtn} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Icon name="close" size={26} />
          </button>
        </div>

        <button
          type="button"
          className={styles.drawerSearch}
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
        >
          <Icon name="search" size={20} />
          Search baits, colors…
        </button>

        <nav aria-label="Shop">
          <p className={styles.drawerLabel}>Shop</p>
          <ul className={styles.drawerCats}>
            {getAllProducts().map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}/`}>
                  <span className={styles.drawerThumb}>
                    <BaitPhoto product={p.slug} color={photographedColors(p)[0]} angle={-20} />
                  </span>
                  <span>{p.title}</span>
                  <Icon name="chevron-right" size={20} className={styles.chev} />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/shop/" className={`btn btn-block ${styles.drawerShopAll}`}>
            Shop all baits
          </Link>
          <ul className={styles.drawerLinks}>
            <li>
              <Link href="/colors/">Color chart</Link>
            </li>
            <li>
              <Link href="/dealers/">Find a dealer</Link>
            </li>
            <li>
              <Link href="/about/">About</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
            <li>
              <Link href="/faq/">FAQ</Link>
            </li>
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                <Icon name="facebook" size={20} /> Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
