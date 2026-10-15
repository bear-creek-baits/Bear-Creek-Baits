'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CartLine, Product, Variant } from '@/lib/types';
import { findVariantById, orderRules } from '@/lib/catalog';

/**
 * Local prototype cart, persisted to localStorage.
 * In production this provider would be backed by the Shopify Storefront Cart API
 * (cartCreate / cartLinesAdd / cartLinesUpdate) and checkout would redirect to cart.checkoutUrl.
 */

const STORAGE_KEY = 'bcb-cart-v1';

/**
 * Keeps a line's quantity inside its product's rules (e.g. at least 50 soft plastics).
 * `allowBelowMin` lets a quantity field hold a partly typed number; the field snaps to the minimum on blur.
 */
function clampQty(variantId: string, n: number, allowBelowMin = false): number {
  const found = findVariantById(variantId);
  const { min, max } = found ? orderRules(found.product) : { min: 1, max: 99 };
  return Math.max(allowBelowMin ? 1 : min, Math.min(max, n));
}

export interface ResolvedLine extends CartLine {
  product: Product;
  variant: Variant;
  lineTotal: number;
}

interface CartContextValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  isOpen: boolean;
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  add: (variantId: string, slug: string, quantity: number) => void;
  update: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(stored)) setRaw(stored.filter((l) => l && typeof l.variantId === 'string'));
    } catch {
      /* storage unavailable or corrupt — start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* ignore */
    }
  }, [raw, ready]);

  const lines = useMemo<ResolvedLine[]>(
    () =>
      raw.flatMap((l) => {
        const found = findVariantById(l.variantId);
        if (!found) return []; // product removed from catalog
        return [{ ...l, ...found, lineTotal: found.variant.price * l.quantity }];
      }),
    [raw],
  );

  const add = useCallback((variantId: string, slug: string, quantity: number) => {
    setRaw((prev) => {
      const existing = prev.find((l) => l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === variantId ? { ...l, quantity: clampQty(variantId, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { variantId, slug, quantity: clampQty(variantId, quantity) }];
    });
    setLastAdded(variantId);
    setOpen(true);
  }, []);

  const update = useCallback((variantId: string, quantity: number) => {
    setRaw((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity: clampQty(variantId, quantity, true) } : l)),
    );
  }, []);

  const remove = useCallback((variantId: string) => {
    setRaw((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const value: CartContextValue = {
    lines,
    count: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    ready,
    isOpen,
    lastAdded,
    open: useCallback(() => setOpen(true), []),
    close: useCallback(() => setOpen(false), []),
    add,
    update,
    remove,
    clear: useCallback(() => setRaw([]), []),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
