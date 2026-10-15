'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import styles from '../pages.module.css';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/** Prototype form: validates client-side and shows a confirmation. Connect to Formspree, Netlify Forms or Shopify later. */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentIcon}>
          <Icon name="check" size={28} />
        </span>
        <h2 className={styles.h3}>Thanks, message received</h2>
        <p>We’ll get back to you soon.</p>
        <p className={styles.protoNote}>Preview site: messages are not delivered yet.</p>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get('name') ?? '').trim()) next.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email') ?? ''))) next.email = 'Enter a valid email address.';
    if (String(data.get('message') ?? '').trim().length < 5) next.message = 'Add a short message.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setSent(true);
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" className="input" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
          {err('email')}
        </div>
      </div>
      <div className="field">
        <label htmlFor="topic">What’s this about?</label>
        <select id="topic" name="topic" className="input">
          <option>A question about a product</option>
          <option>An order request I sent</option>
          <option>Bulk or custom order</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" className="input" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
        {err('message')}
      </div>
      <button type="submit" className="btn">
        Send message
      </button>
    </form>
  );
}
