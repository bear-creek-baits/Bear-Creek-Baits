/**
 * POST /api/catch — a customer sends in a catch (multipart form from /catches/submit/).
 * Saves it for review and emails Steve the photos with a link to approve or reject it.
 */
import type { Config } from '@netlify/functions';
import {
  MAX_PHOTOS,
  MAX_UPLOAD,
  type CatchRecord,
  clean,
  colorLabel,
  colorOptions,
  inspectPhoto,
  newId,
  profileOptions,
  profileTitle,
  reviewUrl,
  savePhoto,
  saveRecord,
  sendEmail,
} from '../lib/catches';
import { button, fields, layout, nextStep, section } from '../lib/email';

const json = (status: number, body: object) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export default async (req: Request) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  if (Number(req.headers.get('content-length') || 0) > MAX_UPLOAD + 200_000) return json(413, { error: 'Photos are too large.' });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json(400, { error: 'Could not read the form.' });
  }

  // Honeypot: real people never fill this hidden field. Pretend it worked.
  if (clean(form.get('_gotcha'))) return json(200, { ok: true });

  const name = clean(form.get('name'), 60);
  if (!name) return json(400, { error: 'Name is required.' });
  if (form.get('ok') !== 'yes') return json(400, { error: 'Permission is required.' });

  const files = ['photo1', 'photo2']
    .map((k) => form.get(k))
    .filter((f): f is File => typeof f === 'object' && f !== null && f.size > 0)
    .slice(0, MAX_PHOTOS);
  if (!files.length) return json(400, { error: 'Add at least one photo.' });
  if (files.reduce((n, f) => n + f.size, 0) > MAX_UPLOAD) return json(413, { error: 'Photos are too large.' });

  const product = profileOptions.find((p) => p.slug === form.get('profileSlug'))?.slug;
  const colorRaw = clean(form.get('color'), 60);
  const color = colorOptions.find((c) => c.id === colorRaw)?.id;
  const record: CatchRecord = {
    id: newId(name),
    status: 'pending',
    createdAt: new Date().toISOString(),
    name,
    place: clean(form.get('place'), 60),
    product,
    size: product ? clean(form.get('size'), 12) : undefined,
    color,
    email: clean(form.get('email'), 120),
    notes: clean(form.get('notes'), 600),
    colorNote: !color && colorRaw && colorRaw !== 'unsure' ? (colorRaw === 'other' ? 'Not on the chart' : colorRaw) : undefined,
    photos: [],
  };

  const attachments: { filename: string; content: string }[] = [];
  for (let i = 0; i < files.length; i++) {
    const data = new Uint8Array(await files[i].arrayBuffer());
    const info = inspectPhoto(data);
    if (!info) return json(415, { error: 'Photos need to be JPG, PNG or WebP.' });
    const key = `photo/${record.id}-${i + 1}`;
    await savePhoto(key, data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer, info.type);
    record.photos.push({ key, type: info.type, ext: info.ext, width: info.width, height: info.height, bytes: data.byteLength });
    attachments.push({ filename: `${record.id}-${i + 1}.${info.ext}`, content: Buffer.from(data).toString('base64') });
  }
  await saveRecord(record);

  const link = await reviewUrl(record.id);
  const rows: [string, string | undefined][] = [
    ['Name', record.name],
    ['Lake or state', record.place],
    ['Profile', [profileTitle(record.product), record.size].filter(Boolean).join(' ') || 'Not sure'],
    ['Color', colorLabel(record.color) || record.colorNote || 'Not sure'],
    ['Email (not shown)', record.email],
    ['Notes (not shown)', record.notes],
  ];
  const shown = rows.filter(([, v]) => v) as [string, string][];
  const n = files.length;
  const html = layout({
    tone: 'catch',
    title: `New catch from ${record.name}`,
    preview: `${shown.slice(1, 4).map(([, v]) => v).join(' · ')} · tap Review to approve or reject`,
    body:
      nextStep(
        `<strong>Take a look and decide.</strong> The photo${n > 1 ? 's are' : ' is'} attached below. Nothing goes on the website until you approve it, and you can fix the name, lake, bait or color first.`,
        button('Review: approve or reject', link, true),
      ) + section('Details', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fields(shown)}</table>`),
    footer: 'Only you see their email and notes. A catch nobody approves just waits.',
  });
  const text = [
    `New catch from ${record.name}`,
    '',
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    '',
    `Approve or reject: ${link}`,
  ].join('\n');

  try {
    await sendEmail({ subject: `New catch from ${record.name}`, html, text, replyTo: record.email, attachments });
  } catch (e) {
    // The catch is saved either way; log so a missing email setting shows up in the function log.
    console.error('catch email failed', record.id, e);
  }
  return json(200, { ok: true });
};

export const config: Config = { path: '/api/catch' };
