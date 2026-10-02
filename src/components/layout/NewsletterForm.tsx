'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import styles from './Footer.module.css';

/** Prototype signup: validates and confirms locally. Wire to Shopify Customer API / Klaviyo / Mailchimp later. */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  if (state === 'done') {
    return (
      <p className={styles.done} role="status">
        <Icon name="check" size={20} /> Thanks, you’re on the list.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(/^\S+@\S+\.\S+$/.test(email) ? 'done' : 'error');
      }}
    >
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        className="input"
        placeholder="Email address"
        autoComplete="email"
        value={email}
        aria-invalid={state === 'error'}
        aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === 'error') setState('idle');
        }}
      />
      <button type="submit" className="btn">
        Sign up
      </button>
      {state === 'error' && (
        <p id="newsletter-error" className={styles.error}>
          Enter a valid email address.
        </p>
      )}
    </form>
  );
}
