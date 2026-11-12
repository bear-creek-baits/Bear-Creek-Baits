'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { contactForm } from '@/content/site';
import { sendForm } from '@/lib/forms';
import styles from '../pages.module.css';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/** Contact form: checks the fields, then sends to Netlify Forms (form "contact"), which emails Steve. */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  if (status === 'sent') {
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentIcon}>
          <Icon name="check" size={28} />
        </span>
        <h2 className={styles.h3}>Thanks, message received</h2>
        <p>We’ll get back to you soon.</p>
        {!contactForm.endpoint && <p className={styles.protoNote}>Preview site: messages are not delivered yet.</p>}
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('name') ?? '').trim()) next.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email') ?? ''))) next.email = 'Enter a valid email address.';
    if (String(data.get('message') ?? '').trim().length < 5) next.message = 'Add a short message.';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    // Honeypot: real people never fill this hidden field.
    if (String(data.get('_gotcha') ?? '')) return;
    if (!contactForm.endpoint) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      await sendForm(contactForm.endpoint, 'contact', data);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
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
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      {status === 'failed' && (
        <p className="field-error" role="alert">
          That didn’t go through. Try again, or message us on Facebook.
        </p>
      )}
      <div>
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
