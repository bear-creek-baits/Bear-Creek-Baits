'use client';

import type { Product } from '@/lib/types';
import { optionValueLabel } from '@/lib/catalog';
import { Swatch } from './Swatch';
import styles from './VariantPicker.module.css';

interface Props {
  product: Product;
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

/**
 * Renders each product option as either color swatches or tappable buttons.
 * Values that are sold out in combination with the other current selections are marked but
 * remain selectable, so customers can see the option exists.
 */
export function VariantPicker({ product, selected, onChange }: Props) {
  const isValueAvailable = (name: string, value: string) =>
    product.variants.some(
      (v) => v.available && v.options[name] === value && product.options.every((o) => o.name === name || v.options[o.name] === selected[o.name]),
    );

  return (
    <div className={styles.picker}>
      {product.options.map((opt) => {
        if (opt.values.length < 2 && opt.display !== 'swatch') return null;
        const current = selected[opt.name];
        const groupId = `opt-${opt.name.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <fieldset key={opt.name} className={styles.group}>
            <legend className={styles.legend} id={groupId}>
              <span className={styles.name}>{opt.name}:</span> <span className={styles.value}>{optionValueLabel(opt.display, current)}</span>
              {!isValueAvailable(opt.name, current) && <span className={styles.so}>Sold out</span>}
            </legend>
            <div className={opt.display === 'swatch' ? styles.swatches : styles.buttons} role="radiogroup" aria-labelledby={groupId}>
              {opt.values.map((value) => {
                const isSel = value === current;
                const avail = isValueAvailable(opt.name, value);
                const label = optionValueLabel(opt.display, value);
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={isSel}
                    aria-label={`${label}${avail ? '' : ' (sold out)'}`}
                    title={label}
                    className={`${opt.display === 'swatch' ? styles.swatchBtn : styles.btn} ${isSel ? styles.sel : ''} ${avail ? '' : styles.na}`}
                    onClick={() => onChange(opt.name, value)}
                    onKeyDown={(e) => {
                      const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
                      if (!keys.includes(e.key)) return;
                      e.preventDefault();
                      const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
                      const idx = opt.values.indexOf(value);
                      const next = opt.values[(idx + dir + opt.values.length) % opt.values.length];
                      onChange(opt.name, next);
                      const sib = (e.currentTarget.parentElement?.children[(idx + dir + opt.values.length) % opt.values.length] as HTMLElement | undefined);
                      sib?.focus();
                    }}
                    tabIndex={isSel ? 0 : -1}
                  >
                    {opt.display === 'swatch' ? <Swatch color={value} size={44} selected={isSel} unavailable={!avail} /> : label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
