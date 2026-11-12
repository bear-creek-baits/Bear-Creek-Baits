'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { catchForm } from '@/content/site';
import { sendForm, shrinkPhoto } from '@/lib/forms';
import { Icon } from '@/components/ui/Icon';
import styles from '@/components/catches/Catches.module.css';

interface Props {
  profiles: { slug: string; title: string; sizes: string[] }[];
  colors: { id: string; label: string }[];
}

type Field = 'name' | 'email' | 'photos' | 'ok';
type Errors = Partial<Record<Field, string>>;

const NOT_SURE = '';
/** Netlify Forms takes about 8 MB per submission; leave room for the text fields. */
const MAX_UPLOAD = 7.5 * 1024 * 1024;

/**
 * "Send in your catch": name, email (optional), lake or state (optional), profile and size, color,
 * one or two photos, and permission to post. Sends to Netlify Forms (form "catch") as multipart data.
 */
export function CatchForm({ profiles, colors }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [profile, setProfile] = useState(NOT_SURE);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const fileInput = useRef<HTMLInputElement>(null);
  const sizes = profiles.find((p) => p.slug === profile)?.sizes ?? [];

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = [...files, ...Array.from(list)];
    const next: Errors = { ...errors, photos: undefined };
    const images = picked.filter((f) => f.type.startsWith('image/'));
    if (images.length < picked.length) next.photos = 'Photos only, please (JPG, PNG or HEIC).';
    const small = images.filter((f) => f.size <= catchForm.maxMb * 1024 * 1024);
    if (small.length < images.length) next.photos = `Each photo needs to be under ${catchForm.maxMb} MB.`;
    if (small.length > catchForm.maxPhotos) next.photos = `Up to ${catchForm.maxPhotos} photos, please.`;
    setFiles(small.slice(0, catchForm.maxPhotos));
    setErrors(next);
    if (fileInput.current) fileInput.current.value = '';
  };

  if (status === 'sent') {
    return (
      <div className="prose" role="status" style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <h2 style={{ fontSize: 36 }}>Thanks for sending it in</h2>
        <p>We’ll take a look. Our favorites go up on the Customer Catches page and on Facebook.</p>
        {!catchForm.endpoint && <p style={{ color: 'var(--muted)', fontSize: 14 }}>Preview site: submissions are not delivered yet.</p>}
        <p style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/catches/" className="btn">
            See customer catches
          </Link>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setFiles([]);
              setProfile(NOT_SURE);
              setStatus('idle');
            }}
          >
            Send another
          </button>
        </p>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('name') ?? '').trim()) next.name = 'Enter your name the way you’d like it shown.';
    const email = String(data.get('email') ?? '').trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'Check the email address, or leave it blank.';
    if (!files.length) next.photos = 'Add at least one photo.';
    if (!data.get('ok')) next.ok = 'Check the box so we can post your photo.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(first === 'photos' ? '#photos' : `[name="${first}"]`)?.focus();
      return;
    }
    // Honeypot: real people never fill this hidden field.
    if (String(data.get('_gotcha') ?? '')) return;
    data.delete('photos');
    const p = profiles.find((x) => x.slug === profile);
    data.set('profile', p ? p.title : 'Not sure');
    if (!catchForm.endpoint) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    // Shrink photos in the browser (smaller upload, no GPS or camera details), then check the total fits.
    const photos = await Promise.all(files.map((f) => shrinkPhoto(f)));
    if (photos.reduce((n, f) => n + f.size, 0) > MAX_UPLOAD) {
      setStatus('idle');
      setErrors({ photos: 'Those photos are too big to send. Try a smaller copy, or send them to us on Facebook.' });
      return;
    }
    photos.forEach((f, i) => data.append(`photo${i + 1}`, f, f.name));
    try {
      await sendForm(catchForm.endpoint, 'catch', data);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const a11y = (k: Field) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined });
  const err = (k: Field) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={onSubmit}
      onChange={(e) => {
        // Clear a field's message as soon as it's changed.
        const n = (e.target as unknown as HTMLInputElement).name as Field;
        if (errors[n]) setErrors({ ...errors, [n]: undefined });
      }}
    >
      <div className="field">
        <label htmlFor="photos">Photos (1 or 2)</label>
        <label className={styles.drop}>
          <input
            ref={fileInput}
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            disabled={files.length >= catchForm.maxPhotos}
            {...a11y('photos')}
          />
          <Icon name="camera" size={28} />
          <strong>{files.length >= catchForm.maxPhotos ? 'That’s two, you’re all set' : files.length ? 'Add one more photo' : 'Choose photos'}</strong>
          <span>From your phone or computer, up to {catchForm.maxMb} MB each</span>
        </label>
        {previews.length > 0 && (
          <div className={styles.thumbs}>
            {previews.map((src, i) => (
              <div key={src} className={styles.thumb}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Photo ${i + 1}: ${files[i]?.name ?? ''}`} />
                <button type="button" aria-label={`Remove photo ${i + 1}`} onClick={() => setFiles(files.filter((_, n) => n !== i))}>
                  <Icon name="close" size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
        {err('photos')}
      </div>

      <div className={styles.row}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" className="input" autoComplete="name" {...a11y('name')} />
          <p className={styles.hint}>As you’d like it shown, like “Steve” or “Steve and Billy”.</p>
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="place">Lake or state (optional)</label>
          <input id="place" name="place" className="input" placeholder="e.g. Pickwick Lake" />
        </div>
      </div>

      <div className={styles.row}>
        <div className="field">
          <label htmlFor="profile">Profile</label>
          <select id="profile" name="profileSlug" className="input" value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option value={NOT_SURE}>Not sure</option>
            {profiles.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="size">Size</label>
          <select id="size" name="size" className="input" disabled={!sizes.length} key={profile}>
            <option value="">{sizes.length ? 'Not sure' : 'Pick a profile first'}</option>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="color">Color</label>
        <select id="color" name="color" className="input" defaultValue="">
          <option value="">Not sure</option>
          {colors.map((c) => (
            <option key={c.id}>{c.label}</option>
          ))}
          <option>Not on the chart (tell us below)</option>
        </select>
      </div>

      <div className={styles.row}>
        <div className="field">
          <label htmlFor="email">Email (optional)</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" {...a11y('email')} />
          <p className={styles.hint}>Only if we have a question. It’s never shown.</p>
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="notes">Anything else? (optional)</label>
          <input id="notes" name="notes" className="input" placeholder="Depth, the day, the story…" />
        </div>
      </div>

      <div className="field">
        <label className={styles.check}>
          <input type="checkbox" name="ok" value="yes" {...a11y('ok')} />
          <span>It’s my photo, and Bear Creek Baits can post it on the website and Facebook with my name.</span>
        </label>
        {err('ok')}
      </div>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      {status === 'failed' && (
        <p className="field-error" role="alert">
          That didn’t go through. Try again, or send the photos to us on Facebook.
        </p>
      )}
      <div>
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send my catch'}
        </button>
      </div>
    </form>
  );
}
