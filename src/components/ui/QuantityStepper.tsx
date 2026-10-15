'use client';

import { Icon } from './Icon';
import styles from './QuantityStepper.module.css';

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  /** How much the buttons add or remove. Typed values are rounded up to a multiple above min. */
  step?: number;
  size?: 'md' | 'sm';
  label: string;
  disabled?: boolean;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, step = 1, size = 'md', label, disabled }: Props) {
  const set = (n: number) => onChange(Math.max(min, Math.min(max, n)));
  return (
    <div className={`${styles.stepper} ${size === 'sm' ? styles.sm : ''}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => set(value - step)}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Icon name="minus" size={size === 'sm' ? 16 : 18} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(max, n));
        }}
        onBlur={() => set(value)}
        onFocus={(e) => e.target.select()}
      />
      <button
        type="button"
        onClick={() => set(value + step)}
        disabled={disabled || value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Icon name="plus" size={size === 'sm' ? 16 : 18} />
      </button>
    </div>
  );
}
