/**
 * Shared code for the catch approval system (Netlify Functions).
 *
 *   1. /api/catch            a customer sends a catch: photos and details are saved (Netlify Blobs) and
 *                            Steve gets an email with the photos attached and a "Review" button.
 *   2. /api/catch/review     the review page: Steve can fix the details, then Approve or Reject.
 *   3. catch-publish         every night, approved catches are added to the site in one commit
 *                            (photos into public/catches/, details into src/data/catches-approved.json).
 *                            Netlify rebuilds the site from that commit. "Approve and publish now" does
 *                            the same thing right away.
 *
 * Settings (Netlify → Project configuration → Environment variables):
 *   RESEND_API_KEY     sends the review emails (resend.com)
 *   CATCH_REVIEW_TO    who gets the review emails (comma-separated for more than one)
 *   CATCH_FROM         sender, e.g. "Bear Creek Baits <catches@bearcreekbaits.com>" (domain verified in Resend)
 *   CATCH_SECRET       any long random text; signs the review links so they can't be guessed
 *   GITHUB_TOKEN       fine-grained token with Contents: read and write on the repo
 *   GITHUB_REPO        optional, defaults to bear-creek-baits/Bear-Creek-Baits
 *   GITHUB_BRANCH      optional, defaults to main
 */
import { getStore } from '@netlify/blobs';
import { imageSize } from 'image-size';
import { colorways, getColorway } from '../../src/data/colors';
import { products } from '../../src/data/products';

export const MAX_PHOTOS = 2;
/** Netlify functions accept about 6 MB per request; the form shrinks photos well under this. */
export const MAX_UPLOAD = 5.5 * 1024 * 1024;
export const DATA_FILE = 'src/data/catches-approved.json';
export const PHOTO_DIR = 'public/catches';

export type Status = 'pending' | 'approved' | 'rejected';

export interface PendingPhoto {
  key: string;
  type: string;
  ext: string;
  width: number;
  height: number;
  bytes: number;
}

/** A submission waiting for review (or approved and waiting for tonight's publish). */
export interface CatchRecord {
  id: string;
  status: Status;
  createdAt: string;
  decidedAt?: string;
  /** Shown on the site. */
  name: string;
  place?: string;
  product?: string;
  size?: string;
  color?: string;
  home?: boolean;
  /** Only for Steve. */
  email?: string;
  notes?: string;
  colorNote?: string;
  photos: PendingPhoto[];
}

/** Matches the Catch type in src/data/catches.ts. */
export interface PublishedCatch {
  id: string;
  name: string;
  place?: string;
  product?: string;
  size?: string;
  color?: string;
  photos: { src: string; width: number; height: number }[];
  home?: boolean;
}

/* ------------------------------------------------------------------ storage */

const store = () => getStore({ name: 'catches', consistency: 'strong' });

export async function saveRecord(r: CatchRecord) {
  await store().setJSON(`record/${r.id}`, r);
}
export async function getRecord(id: string): Promise<CatchRecord | null> {
  if (!/^[a-z0-9-]{6,80}$/.test(id)) return null;
  return (await store().get(`record/${id}`, { type: 'json' })) as CatchRecord | null;
}
export async function listRecords(): Promise<CatchRecord[]> {
  const { blobs } = await store().list({ prefix: 'record/' });
  const all = await Promise.all(blobs.map((b) => store().get(b.key, { type: 'json' }) as Promise<CatchRecord | null>));
  return all.filter((r): r is CatchRecord => !!r);
}
export async function savePhoto(key: string, data: ArrayBuffer, type: string) {
  await store().set(key, data, { metadata: { type } });
}
export async function getPhoto(key: string): Promise<ArrayBuffer | null> {
  return (await store().get(key, { type: 'arrayBuffer' })) as ArrayBuffer | null;
}
/** Removes a catch and its photos from storage (after it's published or rejected). */
export async function deleteRecord(r: CatchRecord) {
  await Promise.all([...r.photos.map((p) => store().delete(p.key)), store().delete(`record/${r.id}`)]);
}

/* ------------------------------------------------------------------ signed links */

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer) => Buffer.from(buf).toString('base64url');

export async function sign(id: string): Promise<string> {
  const secret = process.env.CATCH_SECRET;
  if (!secret || secret.length < 16) throw new Error('CATCH_SECRET is missing or too short');
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(`catch:${id}`)));
}
export async function verify(id: string, token: string | null): Promise<boolean> {
  if (!token) return false;
  const good = await sign(id);
  if (good.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < good.length; i++) diff |= good.charCodeAt(i) ^ token.charCodeAt(i);
  return diff === 0;
}

export const siteUrl = () => (process.env.URL || 'https://bearcreekbaits.com').replace(/\/$/, '');
export async function reviewUrl(id: string) {
  return `${siteUrl()}/api/catch/review?id=${id}&t=${await sign(id)}`;
}

/* ------------------------------------------------------------------ catalog helpers */

export const profileOptions = products.map((p) => ({
  slug: p.slug,
  title: p.title,
  sizes: p.options.find((o) => o.name === 'Size')?.values ?? [],
}));
export const colorOptions = colorways.map((c) => ({ id: c.id, label: `#${c.n} ${c.name}` }));
export const profileTitle = (slug?: string) => profileOptions.find((p) => p.slug === slug)?.title;
export function colorLabel(color?: string) {
  if (!color) return undefined;
  const cw = getColorway(color);
  return cw ? `#${cw.n} ${cw.name}` : color;
}

/** Cleans a text field: trims, collapses spaces, caps the length. Empty becomes undefined. */
export function clean(v: unknown, max = 120): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.replace(/\s+/g, ' ').trim().slice(0, max);
  return s || undefined;
}

export function newId(name: string, now = new Date()) {
  const slug =
    name
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'catch';
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).padEnd(4, '0');
  return `${slug}-${date}-${rand}`;
}

const PHOTO_TYPES: Record<string, string> = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

/** Reads a photo's format and size from its bytes. Returns null for anything that isn't a JPEG, PNG or WebP. */
export function inspectPhoto(data: Uint8Array): { ext: string; type: string; width: number; height: number } | null {
  try {
    const info = imageSize(data);
    const ext = info.type === 'jpg' || info.type === 'png' || info.type === 'webp' ? info.type : null;
    if (!ext || !info.width || !info.height) return null;
    // JPEG orientation 5-8 means the photo is stored sideways; the browser shrink step already rotates
    // photos upright, so this only matters for an original that couldn't be shrunk.
    const sideways = (info.orientation ?? 1) >= 5;
    return { ext, type: PHOTO_TYPES[ext], width: sideways ? info.height : info.width, height: sideways ? info.width : info.height };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ email */

export const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Sends through Resend. Goes to `to` (comma-separated) when given, otherwise to CATCH_REVIEW_TO. */
export async function sendEmail(msg: { subject: string; html: string; text: string; to?: string; replyTo?: string; attachments?: { filename: string; content: string }[] }) {
  const key = process.env.RESEND_API_KEY;
  const to = (msg.to || process.env.CATCH_REVIEW_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) throw new Error('RESEND_API_KEY or CATCH_REVIEW_TO is not set');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CATCH_FROM || 'Bear Creek Baits <catches@bearcreekbaits.com>',
      to,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      reply_to: msg.replyTo,
      attachments: msg.attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/* ------------------------------------------------------------------ publishing (GitHub) */

async function gh(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not set');
  const repo = process.env.GITHUB_REPO || 'bear-creek-baits/Bear-Creek-Baits';
  const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'bear-creek-baits-catches',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${init.method || 'GET'} ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

export function toPublished(r: CatchRecord): PublishedCatch {
  return {
    id: r.id,
    name: r.name,
    ...(r.place && { place: r.place }),
    ...(r.product && { product: r.product }),
    ...(r.size && { size: r.size }),
    ...(r.color && { color: r.color }),
    photos: r.photos.map((p, i) => ({ src: `/catches/${r.id}${i ? `-${i + 1}` : ''}.${p.ext}`, width: p.width, height: p.height })),
    ...(r.home && { home: true }),
  };
}

/**
 * Adds every approved catch to the site in one commit, newest first, then clears them from storage.
 * Returns how many were published.
 */
export async function publishApproved(): Promise<number> {
  const ready = (await listRecords()).filter((r) => r.status === 'approved').sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (!ready.length) return 0;
  const branch = process.env.GITHUB_BRANCH || 'main';

  const ref = await gh(`/git/ref/heads/${branch}`);
  const parent = await gh(`/git/commits/${ref.object.sha}`);
  const file = await gh(`/contents/${DATA_FILE}?ref=${ref.object.sha}`);
  const current: PublishedCatch[] = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'));
  const fresh = ready.filter((r) => !current.some((c) => c.id === r.id));
  const next = [...fresh.map(toPublished), ...current];

  const tree: { path: string; mode: '100644'; type: 'blob'; sha: string }[] = [];
  for (const r of fresh) {
    const pub = toPublished(r);
    for (let i = 0; i < r.photos.length; i++) {
      const data = await getPhoto(r.photos[i].key);
      if (!data) throw new Error(`Photo missing for ${r.id}`);
      const blob = await gh('/git/blobs', { method: 'POST', body: JSON.stringify({ content: Buffer.from(data).toString('base64'), encoding: 'base64' }) });
      tree.push({ path: `public${pub.photos[i].src}`, mode: '100644', type: 'blob', sha: blob.sha });
    }
  }
  const json = await gh('/git/blobs', { method: 'POST', body: JSON.stringify({ content: `${JSON.stringify(next, null, 2)}\n`, encoding: 'utf-8' }) });
  tree.push({ path: DATA_FILE, mode: '100644', type: 'blob', sha: json.sha });

  if (fresh.length) {
    const newTree = await gh('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: parent.tree.sha, tree }) });
    const names = fresh.map((r) => r.name).join(', ');
    const commit = await gh('/git/commits', {
      method: 'POST',
      body: JSON.stringify({
        message: `Add customer catch${fresh.length > 1 ? 'es' : ''}: ${names}\n\nApproved on the catch review page.`,
        tree: newTree.sha,
        parents: [ref.object.sha],
        author: { name: 'Bear Creek Baits', email: 'catches@bearcreekbaits.com' },
      }),
    });
    await gh(`/git/refs/heads/${branch}`, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha }) });
  }
  await Promise.all(ready.map(deleteRecord));
  return fresh.length;
}
