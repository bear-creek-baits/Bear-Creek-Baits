'use client';

import type { Product } from '@/lib/types';
import { optionValueLabel } from '@/lib/catalog';
import { ColorChart } from './ColorChart';
import styles from './VariantPicker.module.css';

interface Props {
  product: Product;
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

/**
 * Renders the product's options in order: sizes as tappable buttons, then the color as the numbered
 * color chart. Values that are sold out in combination with the other current selections are marked
 * but remain selectable, so customers can see the option exists. Values that aren't made at all with
 * the options chosen above them are hidden.
 */
export function VariantPicker({ product, selected, onChange }: Props) {
  // "Pack of 10" (or 12) instead of just "Pack", so the button says how many baits you get.
  const labelFor = (name: string, display: string, value: string) =>
    name === 'Pack' && value === 'Pack' ? `Pack of ${product.perPack}` : optionValueLabel(display, value);
  const isValueAvailable = (name: string, value: string) =>
    product.variants.some(
      (v) => v.available && v.options[name] === value && product.options.every((o) => o.name === name || v.options[o.name] === selected[o.name]),
    );

  const isValueOffered = (index: number, value: string) =>
    product.variants.some(
      (v) => v.options[product.options[index].name] === value && product.options.slice(0, index).every((o) => v.options[o.name] === selected[o.name]),
    );

  return (
    <div className={styles.picker}>
      {product.options.map((opt, index) => {
        const values = opt.values.filter((v) => isValueOffered(index, v));
        const current = selected[opt.name];
        const groupId = `opt-${opt.name.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <fieldset key={opt.name} className={styles.group}>
            <legend className={styles.legend} id={groupId}>
              <span className={styles.name}>{opt.name}:</span> <span className={styles.value}>{labelFor(opt.name, opt.display, current)}</span>
              {!isValueAvailable(opt.name, current) && <span className={styles.so}>Sold out</span>}
            </legend>
            {opt.display === 'swatch' ? (
              <ColorChart values={values} selected={current} onChange={(v) => onChange(opt.name, v)} labelledBy={groupId} />
            ) : (
              <div className={styles.buttons} role="radiogroup" aria-labelledby={groupId}>
                {values.map((value) => {
                  const isSel = value === current;
                  const avail = isValueAvailable(opt.name, value);
                  const label = labelFor(opt.name, opt.display, value);
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={isSel}
                      aria-label={`${label}${avail ? '' : ' (sold out)'}`}
                      title={label}
                      className={`${styles.btn} ${isSel ? styles.sel : ''} ${avail ? '' : styles.na}`}
                      onClick={() => onChange(opt.name, value)}
                      onKeyDown={(e) => {
                        const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
                        if (!keys.includes(e.key)) return;
                        e.preventDefault();
                        const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
                        const idx = values.indexOf(value);
                        const next = values[(idx + dir + values.length) % values.length];
                        onChange(opt.name, next);
                        const sib = (e.currentTarget.parentElement?.children[(idx + dir + values.length) % values.length] as HTMLElement | undefined);
                        sib?.focus();
                      }}
                      tabIndex={isSel ? 0 : -1}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
