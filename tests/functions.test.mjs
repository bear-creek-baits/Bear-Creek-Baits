// Tests for the Netlify Functions (catch approvals and form alert emails). Run with `npm test`.
//
// The functions are bundled the way Netlify bundles them (esbuild) and run against stand-ins:
// in-memory storage instead of Netlify Blobs (fake-blobs.mjs), and a fake `fetch` that plays the
// part of Resend (email) and the GitHub API. Nothing leaves this machine.
import { readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(here, '..');
const outdir = path.join(here, '.build');
const fakeBlobs = path.join(here, 'fake-blobs.mjs');

await build({
  entryPoints: ['catch-submit', 'catch-review', 'catch-publish', 'submission-created'].map((n) => path.join(site, `netlify/functions/${n}.ts`)),
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir,
  outExtension: { '.js': '.mjs' },
  alias: { '@netlify/blobs': fakeBlobs },
  logLevel: 'error',
});
const load = async (n) => import(pathToFileURL(path.join(outdir, `${n}.mjs`)).href);
const blobs = await import(pathToFileURL(fakeBlobs).href);

process.env.CATCH_SECRET = 'test-secret-that-is-long-enough';
process.env.RESEND_API_KEY = 're_test';
process.env.CATCH_REVIEW_TO = 'reviewer@example.com';
process.env.GITHUB_TOKEN = 'gh_test';
process.env.URL = 'https://bearcreekbaits.com';

// ---- fake Resend + GitHub
const emails = [];
let resendDown = false;
const gh = { blobs: new Map(), trees: new Map(), commits: new Map(), ref: 'c0', n: 0 };
gh.commits.set('c0', { tree: 't0' });
gh.trees.set('t0', { 'src/data/catches-approved.json': '[]\n' });
const ok = (b) => new Response(JSON.stringify(b), { status: 200, headers: { 'Content-Type': 'application/json' } });
globalThis.fetch = async (url, init = {}) => {
  url = String(url);
  const body = init.body ? JSON.parse(init.body) : null;
  if (url === 'https://api.resend.com/emails') {
    if (resendDown) return new Response('boom', { status: 500 });
    emails.push(body);
    return ok({ id: 'e' + emails.length });
  }
  const m = url.match(/^https:\/\/api\.github\.com\/repos\/bear-creek-baits\/Bear-Creek-Baits(\/.*)$/);
  if (!m) throw new Error('unexpected fetch ' + url);
  const p = m[1];
  const meth = init.method || 'GET';
  if (!String(init.headers?.Authorization).includes('gh_test')) return new Response('no auth', { status: 401 });
  if (meth === 'GET' && p === '/git/ref/heads/main') return ok({ object: { sha: gh.ref } });
  if (meth === 'GET' && p.startsWith('/git/commits/')) return ok({ tree: { sha: gh.commits.get(p.split('/').pop()).tree } });
  if (meth === 'GET' && p.startsWith('/contents/')) {
    const [file, q] = p.slice('/contents/'.length).split('?ref=');
    return ok({ content: Buffer.from(gh.trees.get(gh.commits.get(q).tree)[file]).toString('base64') });
  }
  if (meth === 'POST' && p === '/git/blobs') {
    const sha = 'b' + ++gh.n;
    gh.blobs.set(sha, body.encoding === 'base64' ? Buffer.from(body.content, 'base64') : body.content);
    return ok({ sha });
  }
  if (meth === 'POST' && p === '/git/trees') {
    const sha = 't' + ++gh.n;
    const t = { ...gh.trees.get(body.base_tree) };
    for (const e of body.tree) t[e.path] = gh.blobs.get(e.sha);
    gh.trees.set(sha, t);
    return ok({ sha });
  }
  if (meth === 'POST' && p === '/git/commits') {
    const sha = 'c' + ++gh.n;
    gh.commits.set(sha, { tree: body.tree, message: body.message, parents: body.parents, author: body.author });
    return ok({ sha });
  }
  if (meth === 'PATCH' && p === '/git/refs/heads/main') {
    gh.ref = body.sha;
    return ok({});
  }
  throw new Error(`unhandled GitHub ${meth} ${p}`);
};

const submit = (await load('catch-submit')).default;
const review = (await load('catch-review')).default;
const publish = (await load('catch-publish')).default;
const formAlert = (await load('submission-created')).handler;

let fails = 0;
let count = 0;
const check = (label, cond, extra = '') => {
  count++;
  if (!cond) fails++;
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${!cond && extra ? '  ' + extra : ''}`);
};
// A function that fails on purpose logs the error; keep that out of the test output.
const quietly = async (fn) => {
  const orig = console.error;
  console.error = () => {};
  try {
    return await fn();
  } finally {
    console.error = orig;
  }
};

/* ================================================================== Catch approvals */

const jpg = readFileSync(path.join(here, 'fixtures/catch-1600x1200.jpg'));
const png = readFileSync(path.join(here, 'fixtures/catch-900x1200.png'));
const catchReq = (fields, photos) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  photos.forEach((p, i) => fd.append(`photo${i + 1}`, new File([p.data], p.name, { type: p.type })));
  return new Request('https://bearcreekbaits.com/api/catch', { method: 'POST', body: fd });
};
const reviewLink = (e) => new URL(e.html.match(/href="([^"]+review[^"]+)"/)[1].replace(/&amp;/g, '&'));
const post = (fields) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return review(new Request('https://bearcreekbaits.com/api/catch/review', { method: 'POST', body: fd }));
};
const keys = () => [...globalThis.__blobs.keys()];
const J = { data: jpg, name: 'a.jpg', type: 'image/jpeg' };
const base = { name: 'Jane Angler', place: 'Pickwick Lake', profileSlug: 'swim-bait', size: '2"', color: 'junebug', email: 'jane@example.com', notes: 'Caught at 12 ft', ok: 'yes', _gotcha: '' };

console.log('\nCatch approvals');
// 1. good submission, two photos
let res = await submit(catchReq(base, [J, { data: png, name: 'b.png', type: 'image/png' }]));
check('submit returns 200', res.status === 200, await res.text());
check('email sent with 2 attachments', emails.length === 1 && emails[0].attachments.length === 2);
check('email subject', emails[0]?.subject === 'New catch from Jane Angler');
check('email reply-to is the customer', emails[0]?.reply_to === 'jane@example.com');
check('email has bait and color', emails[0].html.includes('Swim Bait 2') && emails[0].html.includes('Junebug'));
const u = reviewLink(emails[0]);
const id = u.searchParams.get('id');
const t = u.searchParams.get('t');
check('review link has id and token', !!id && !!t, u.href);
check('stored record + 2 photos', keys().length === 3);

// 2. review page
res = await review(new Request(`${u.origin}${u.pathname}?id=${id}&t=wrong`));
check('bad token rejected', res.status === 403);
res = await review(new Request(u.href));
let html = await res.text();
check('review page loads', res.status === 200 && html.includes('Catch from Jane Angler') && html.includes('value="junebug" selected'));
check('review page shows private email', html.includes('jane@example.com'));
res = await review(new Request(u.href + '&photo=2'));
check('photo 2 served as PNG', res.status === 200 && res.headers.get('content-type') === 'image/png');
check('opening the page changes nothing', (await blobs.getStore({ name: 'catches' }).get(`record/${id}`, { type: 'json' })).status === 'pending');

// 3. approve with edits
res = await post({ id, t, action: 'approve', name: 'Jane A.', place: 'Pickwick Lake', product: 'swim-bait', size: '2.2"', color: 'junebug', home: 'yes' });
html = await res.text();
check('approve says tonight', res.status === 200 && html.includes('goes up on the site tonight'));

// 4. second catch, rejected
emails.length = 0;
await submit(catchReq({ ...base, name: 'Bob Reject', email: '' }, [J]));
const l2 = reviewLink(emails[0]);
res = await post({ id: l2.searchParams.get('id'), t: l2.searchParams.get('t'), action: 'reject' });
check('reject works', (await res.text()).includes('Rejected'));
check('rejected catch deleted', !keys().some((k) => k.includes('bob-reject')));
res = await review(new Request(l2.href));
check('rejected link says already handled', res.status === 404);

// 5. third catch, post now -> publishes both approved catches in one commit
emails.length = 0;
await submit(catchReq({ ...base, name: 'Sam Now', color: 'other', profileSlug: '', size: '' }, [J]));
check('"not on chart" noted in email', emails[0].html.includes('Not on the chart'));
const l3 = reviewLink(emails[0]);
res = await post({ id: l3.searchParams.get('id'), t: l3.searchParams.get('t'), action: 'publish', name: 'Sam Now', place: '', product: '', size: '', color: '' });
html = await res.text();
check('post now says posted', html.includes('Posted'));
const head = gh.commits.get(gh.ref);
const tree = gh.trees.get(head.tree);
const json = JSON.parse(tree['src/data/catches-approved.json']);
check('one commit with both catches', gh.ref !== 'c0' && json.length === 2, head.message?.split('\n')[0]);
check('newest first', json[0].name === 'Sam Now' && json[1].name === 'Jane A.');
check('edits kept', json[1].size === '2.2"' && json[1].home === true && json[1].photos.length === 2);
check('empty fields dropped', !('product' in json[0]) && !('color' in json[0]) && !('place' in json[0]));
const srcs = json.flatMap((c) => c.photos.map((p) => p.src));
check('photos committed', srcs.every((s) => Buffer.isBuffer(tree['public' + s])), srcs.join(' '));
check('photo sizes recorded', json[1].photos[1].width === 900 && json[1].photos[1].height === 1200);
check('commit author', head.author?.name === 'Bear Creek Baits');
check('storage emptied', keys().length === 0, keys().join(','));

// 6. nightly run with nothing approved
const before = gh.ref;
await publish();
check('nightly with nothing does nothing', gh.ref === before);

// 7. bad input
res = await submit(catchReq({ ...base, _gotcha: 'spam' }, [J]));
check('honeypot quietly ignored', res.status === 200 && keys().length === 0);
res = await submit(catchReq({ ...base, name: '' }, [J]));
check('missing name rejected', res.status === 400);
res = await submit(catchReq(base, [{ data: Buffer.from('not an image'), name: 'x.jpg', type: 'image/jpeg' }]));
check('non-image rejected', res.status === 415);
res = await submit(catchReq({ ...base, ok: '' }, [J]));
check('no permission rejected', res.status === 400);

/* ================================================================== Order and contact alerts */

console.log('\nOrder and contact alerts');
const ev = (form_name, data) => ({ body: JSON.stringify({ payload: { form_name, data: { ...data, 'form-name': form_name } } }) });
const order = '2 × Swim Bait (2" · Pack of 10 · #38 Junebug) @ $4.15\n1 × Curly Tail (2.2" · Pack of 10 · #63 Special Pink) @ $4.15\n1 × Swim Bait (2" · Bulk 50 · #42 Delta Shad) @ $20.00\n\nEstimated subtotal: $32.45 (before Mississippi sales tax and shipping)';

emails.length = 0;
let r = await formAlert(ev('order', { name: 'Jane <b>Angler</b>', email: 'jane@example.com', contactBy: 'Text message', phone: '(662) 555-0100', location: 'Tupelo, MS', notes: '', order, _gotcha: '' }));
let e = emails[0];
check('order: 200 and sent', r.statusCode === 200 && r.body === 'sent');
check('order: subject has the subtotal', e?.subject === 'Order request from Jane <b>Angler</b> · $32.45', e?.subject);
check('order: to reviewer, reply-to customer', e.to[0] === 'reviewer@example.com' && e.reply_to === 'jane@example.com');
check('order: html escaped', e.html.includes('Jane &lt;b&gt;Angler&lt;/b&gt;') && !e.html.includes('<b>Angler'));
check('order: Text button uses an sms link', e.html.includes('href="sms:+16625550100"') && e.html.includes('Text them'));
check('order: line totals worked out', e.html.includes('2×') && e.html.includes('$8.30') && e.html.includes('$4.15 each') && e.html.includes('$32.45'));
check('order: empty notes row left out', !e.html.includes('Their notes'));
check('order: logo and label', e.html.includes('/brand/logo.png') && e.html.includes('ORDER REQUEST'));
check('order: text version has items', e.text.includes('Order:\n2 × Swim Bait') && e.text.includes('Ship to (city and state): Tupelo, MS'));

await formAlert(ev('order', { name: 'Odd', email: 'o@example.com', order: 'something unexpected' }));
check('order: an unrecognized list is shown as written', emails.at(-1).html.includes('something unexpected'));

process.env.FORMS_NOTIFY_TO = 'a@example.com, b@example.com';
r = await formAlert(ev('contact', { name: 'Bob', email: 'not-an-email', topic: 'Bulk or custom order', message: 'Can you pour 500?\nThanks', _gotcha: '' }));
e = emails.at(-1);
check('contact: subject has topic', e?.subject === 'Message from Bob: Bulk or custom order');
check('contact: FORMS_NOTIFY_TO used', e.to.length === 2 && e.to[1] === 'b@example.com');
check('contact: bad email not used as reply-to', e.reply_to === undefined && e.html.includes('won’t reach them'));
check('contact: message kept', e.html.includes('Can you pour 500?\nThanks'));

const sentBefore = emails.length;
r = await formAlert(ev('contact', { name: 'Spam', email: 'x@y.com', message: 'hi', _gotcha: 'bot' }));
check('honeypot: no email', r.body === 'ignored' && emails.length === sentBefore);

resendDown = true;
r = await quietly(() => formAlert(ev('contact', { name: 'X', email: 'x@y.com', message: 'hi' })));
check('Resend down: still 200', r.statusCode === 200 && r.body === 'not sent');
r = await quietly(() => formAlert({ body: 'not json' }));
check('bad body: still 200', r.statusCode === 200);

rmSync(outdir, { recursive: true, force: true });
console.log(fails ? `\n${fails} of ${count} FAILED` : `\nAll ${count} checks passed`);
process.exit(fails ? 1 : 0);
