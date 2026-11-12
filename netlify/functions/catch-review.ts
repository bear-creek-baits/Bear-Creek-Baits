/**
 * /api/catch/review?id=…&t=… — the page Steve opens from the catch email.
 *   GET            shows the photos and details, with fields to fix them
 *   GET &photo=N   the Nth photo (only with a valid link)
 *   POST           approve (published tonight), approve and publish now, or reject
 * Opening the page never changes anything (email apps sometimes open links on their own); only the buttons do.
 */
import type { Config } from '@netlify/functions';
import {
  type CatchRecord,
  clean,
  colorLabel,
  colorOptions,
  deleteRecord,
  esc,
  getPhoto,
  getRecord,
  profileOptions,
  profileTitle,
  publishApproved,
  saveRecord,
  siteUrl,
  verify,
} from '../lib/catches';

const page = (title: string, body: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(title)} · Bear Creek Baits</title><style>
:root{--ink:#151613;--muted:#5c5d57;--line:#d9d7cf;--green:#9BCB3B;--paper:#fff;--bone:#f4f2ec}
*{box-sizing:border-box}body{margin:0;background:var(--bone);color:var(--ink);font:16px/1.45 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
main{max-width:720px;margin:0 auto;padding:24px 16px 48px}h1{font-size:28px;margin:0 0 6px}p{margin:0 0 12px}
.muted{color:var(--muted)}.card{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:20px;margin:16px 0}
.photos{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}.photos a{display:block}.photos img{width:100%;height:auto;border-radius:8px;display:block}
label{display:block;font-weight:600;margin:14px 0 6px}input[type=text],select{width:100%;min-height:46px;padding:10px 12px;border:1px solid var(--line);border-radius:8px;font:inherit;background:#fff}
.check{display:flex;gap:10px;align-items:flex-start;font-weight:400}.check input{width:22px;height:22px;margin:0}
.row{display:grid;gap:0 16px}@media(min-width:560px){.row{grid-template-columns:1fr 1fr}}
.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}button{min-height:48px;padding:0 20px;border-radius:8px;border:2px solid var(--ink);font:inherit;font-weight:700;cursor:pointer;background:#fff;color:var(--ink)}
button.primary{background:var(--green);border-color:var(--green)}button.reject{border-color:#b3261e;color:#b3261e}
.private{background:var(--bone);border-radius:8px;padding:12px;margin-top:8px}.ok{font-size:20px;font-weight:700}
</style></head><body><main>${body}</main></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } },
  );

const option = (value: string, label: string, selected: boolean) =>
  `<option value="${esc(value)}"${selected ? ' selected' : ''}>${esc(label)}</option>`;

function reviewPage(r: CatchRecord, token: string, note = '') {
  const q = `id=${encodeURIComponent(r.id)}&t=${encodeURIComponent(token)}`;
  const sizes = [...new Set(profileOptions.flatMap((p) => p.sizes))];
  const photos = r.photos
    .map((_, i) => `<a href="/api/catch/review?${q}&photo=${i + 1}" target="_blank"><img src="/api/catch/review?${q}&photo=${i + 1}" alt="Photo ${i + 1}"></a>`)
    .join('');
  const waiting = r.status === 'approved';
  return page(
    `Catch from ${r.name}`,
    `<h1>Catch from ${esc(r.name)}</h1>
<p class="muted">Sent ${esc(new Date(r.createdAt).toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' }))}${
      waiting ? ' · <strong>Approved, goes up on the site tonight</strong>' : ''
    }</p>
${note ? `<p class="card ok">${note}</p>` : ''}
<div class="card photos">${photos}</div>
<form method="post" action="/api/catch/review" class="card">
<input type="hidden" name="id" value="${esc(r.id)}"><input type="hidden" name="t" value="${esc(token)}">
<p class="muted">Fix anything before it goes up. This is what shows under the photo.</p>
<div class="row">
<div><label for="name">Name</label><input type="text" id="name" name="name" value="${esc(r.name)}" maxlength="60" required></div>
<div><label for="place">Lake or state</label><input type="text" id="place" name="place" value="${esc(r.place)}" maxlength="60"></div>
</div>
<div class="row">
<div><label for="product">Bait</label><select id="product" name="product">${option('', 'Not sure', !r.product)}${profileOptions
      .map((p) => option(p.slug, p.title, p.slug === r.product))
      .join('')}</select></div>
<div><label for="size">Size</label><select id="size" name="size">${option('', 'Not sure', !r.size)}${sizes
      .map((s) => option(s, s, s === r.size))
      .join('')}</select></div>
</div>
<label for="color">Color</label><select id="color" name="color">${option('', 'Not sure', !r.color)}${colorOptions
      .map((c) => option(c.id, c.label, c.id === r.color))
      .join('')}</select>
${r.colorNote ? `<p class="muted">They wrote: ${esc(r.colorNote)}</p>` : ''}
<label class="check"><input type="checkbox" name="home" value="yes"${r.home ? ' checked' : ''}> Also show it on the home page</label>
${
  r.email || r.notes
    ? `<div class="private">${r.email ? `<p><strong>Email</strong> (not shown): <a href="mailto:${esc(r.email)}">${esc(r.email)}</a></p>` : ''}${
        r.notes ? `<p><strong>Notes</strong> (not shown): ${esc(r.notes)}</p>` : ''
      }</div>`
    : ''
}
<div class="actions">
<button class="primary" name="action" value="approve">${waiting ? 'Save changes' : 'Approve'}</button>
<button name="action" value="publish">Approve and post now</button>
<button class="reject" name="action" value="reject" formnovalidate>Reject</button>
</div>
<p class="muted" style="margin-top:12px">Approved catches go up on the site overnight. "Post now" puts it up in a couple of minutes.</p>
</form>`,
  );
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const form = req.method === 'POST' ? await req.formData() : null;
  const id = String(form?.get('id') ?? url.searchParams.get('id') ?? '');
  const token = String(form?.get('t') ?? url.searchParams.get('t') ?? '');

  if (!(await verify(id, token).catch(() => false))) {
    return page('Link not valid', '<h1>This link isn’t valid</h1><p>Open the review link from the catch email again.</p>', 403);
  }
  const r = await getRecord(id);
  if (!r) {
    return page(
      'Already handled',
      `<h1>Already handled</h1><p>This catch was already posted or rejected.</p><p><a href="${siteUrl()}/catches/">See customer catches</a></p>`,
      404,
    );
  }

  const n = Number(url.searchParams.get('photo'));
  if (req.method === 'GET' && n) {
    const p = r.photos[n - 1];
    const data = p && (await getPhoto(p.key));
    if (!data) return new Response('Not found', { status: 404 });
    return new Response(data, { headers: { 'Content-Type': p.type, 'Cache-Control': 'private, max-age=3600' } });
  }

  if (req.method === 'GET') return reviewPage(r, token);
  if (req.method !== 'POST' || !form) return new Response('Method not allowed', { status: 405 });

  const action = String(form.get('action'));
  if (action === 'reject') {
    await deleteRecord(r);
    return page('Rejected', `<h1>Rejected</h1><p>The catch from ${esc(r.name)} was deleted. Nothing went on the site.</p>`);
  }
  if (action !== 'approve' && action !== 'publish') return new Response('Unknown action', { status: 400 });

  const product = profileOptions.find((p) => p.slug === form.get('product'))?.slug;
  const color = colorOptions.find((c) => c.id === form.get('color'))?.id;
  const updated: CatchRecord = {
    ...r,
    status: 'approved',
    decidedAt: new Date().toISOString(),
    name: clean(form.get('name'), 60) || r.name,
    place: clean(form.get('place'), 60),
    product,
    size: clean(form.get('size'), 12),
    color,
    home: form.get('home') === 'yes',
  };
  await saveRecord(updated);

  const summary = [profileTitle(updated.product), updated.size, colorLabel(updated.color)].filter(Boolean).join(' · ');
  if (action === 'publish') {
    try {
      await publishApproved();
    } catch (e) {
      console.error('publish failed', e);
      return reviewPage(updated, token, 'Approved, but posting right away didn’t work. It will go up tonight instead.');
    }
    return page(
      'Posted',
      `<h1>Posted</h1><p>The catch from ${esc(updated.name)}${summary ? ` (${esc(summary)})` : ''} will be on the site in a couple of minutes.</p><p><a href="${siteUrl()}/catches/">See customer catches</a></p>`,
    );
  }
  return reviewPage(updated, token, `Approved. It goes up on the site tonight.${summary ? ` (${esc(summary)})` : ''}`);
};

export const config: Config = { path: '/api/catch/review' };
