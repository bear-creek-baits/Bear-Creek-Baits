/**
 * The look of the alert emails the website sends to Steve (orders, messages, catches).
 *
 * Built for reading on a phone: a dark header with the logo and a colored label saying what it is,
 * one big headline, the next step with one-tap buttons, then each detail as a large value under a
 * small label. Plain tables and inline styles only, so Gmail, Outlook and Apple Mail all show it the same.
 */
import { esc, siteUrl } from './catches';

const C = {
  ink: '#151613',
  paper: '#f1efe8',
  card: '#ffffff',
  muted: '#5c5d57',
  line: '#e4e1d6',
  green: '#8dbb2c',
  greenInk: '#3f5f0b',
  orange: '#ee6a21',
  soft: '#f7f5ef',
};
const FONT = "font-family:Arial,Helvetica,sans-serif";

export type Tone = 'order' | 'message' | 'catch';
const LABEL: Record<Tone, { text: string; bg: string; fg: string }> = {
  order: { text: 'ORDER REQUEST', bg: C.orange, fg: '#ffffff' },
  message: { text: 'NEW MESSAGE', bg: C.green, fg: C.ink },
  catch: { text: 'NEW CATCH', bg: C.green, fg: C.ink },
};

/** A big tappable button. `primary` is green; the others are outlined. */
export function button(label: string, href: string, primary = false) {
  const style = primary
    ? `background:${C.green};color:${C.ink};border:2px solid ${C.green}`
    : `background:#ffffff;color:${C.ink};border:2px solid ${C.ink}`;
  return `<a href="${esc(href)}" style="${FONT};display:inline-block;${style};font-size:17px;font-weight:bold;text-decoration:none;padding:13px 22px;border-radius:10px;margin:0 8px 10px 0">${esc(label)}</a>`;
}

/** Details as label-over-value pairs (easier to read on a phone than two columns). Empty values are left out. */
export function fields(list: [string, string | undefined | null, string?][]) {
  return list
    .filter(([, v]) => v)
    .map(
      ([k, v, href]) => `<tr><td style="padding:0 0 16px">
<div style="${FONT};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};margin:0 0 3px">${esc(k)}</div>
<div style="${FONT};font-size:18px;line-height:1.4;color:${C.ink};white-space:pre-wrap">${href ? `<a href="${esc(href)}" style="color:${C.greenInk}">${esc(v)}</a>` : esc(v)}</div>
</td></tr>`,
    )
    .join('');
}

/** A shaded box for the next step (and its buttons). */
export function nextStep(text: string, buttons = '') {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.soft};border-left:5px solid ${C.green};border-radius:8px;margin:0 0 24px"><tr><td style="padding:16px 18px 8px">
<div style="${FONT};font-size:16px;line-height:1.5;color:${C.ink};margin:0 0 12px">${text}</div>${buttons}</td></tr></table>`;
}

export function section(title: string, body: string) {
  return `<div style="${FONT};font-size:13px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;color:${C.ink};border-bottom:2px solid ${C.ink};padding:0 0 6px;margin:8px 0 14px">${esc(title)}</div>${body}`;
}

/** Wraps the content in the branded frame. `preview` is the grey line most inboxes show after the subject. */
export function layout(o: { tone: Tone; title: string; preview: string; body: string; footer?: string }) {
  const label = LABEL[o.tone];
  const site = siteUrl();
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(o.title)}</title></head>
<body style="margin:0;padding:0;background:${C.paper}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(o.preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}"><tr><td align="center" style="padding:20px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:14px;overflow:hidden">
<tr><td style="background:${C.ink};padding:14px 20px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="vertical-align:middle"><img src="${site}/brand/logo.png" width="48" height="47" alt="Bear Creek Baits" style="display:block;border-radius:8px;border:0"></td>
    <td align="right" style="vertical-align:middle"><span style="${FONT};display:inline-block;background:${label.bg};color:${label.fg};font-size:12px;font-weight:bold;letter-spacing:1px;padding:6px 10px;border-radius:6px;white-space:nowrap">${label.text}</span></td>
  </tr></table>
</td></tr>
<tr><td style="padding:26px 22px 10px">
  <h1 style="${FONT};font-size:26px;line-height:1.25;color:${C.ink};margin:0 0 18px">${esc(o.title)}</h1>
  ${o.body}
</td></tr>
<tr><td style="padding:16px 22px 22px;border-top:1px solid ${C.line}">
  <div style="${FONT};font-size:13px;line-height:1.5;color:${C.muted}">${o.footer ?? ''}${o.footer ? '<br>' : ''}Sent by the website at <a href="${site}" style="color:${C.muted}">${site.replace(/^https?:\/\//, '')}</a>.</div>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

/** "662-555-0100" → "+16625550100" for tel:/sms: links; null if it doesn't look like a phone number. */
export function phoneHref(raw: string) {
  const d = raw.replace(/\D/g, '');
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return null;
}

export interface OrderLine {
  qty: number;
  item: string;
  each: string;
  total: string;
}

/** Reads the order list the order form sends ("2 × Swim Bait (2" / #38 Junebug) @ $4.15", then the subtotal). */
export function parseOrder(text: string): { lines: OrderLine[]; subtotal: string | null } | null {
  const lines: OrderLine[] = [];
  let subtotal: string | null = null;
  for (const raw of text.split('\n').map((l) => l.trim()).filter(Boolean)) {
    const m = raw.match(/^(\d+)\s*[×x]\s*(.+?)\s*@\s*\$([\d,.]+)$/);
    const s = raw.match(/^Estimated subtotal:\s*(\$[\d,.]+)/i);
    if (m) {
      const qty = Number(m[1]);
      const each = Number(m[3].replace(/,/g, ''));
      lines.push({ qty, item: m[2], each: `$${each.toFixed(2)}`, total: `$${(qty * each).toFixed(2)}` });
    } else if (s) subtotal = s[1];
    else return null; // not the format we expect: show it as written instead
  }
  return lines.length ? { lines, subtotal } : null;
}

export function orderTable(o: { lines: OrderLine[]; subtotal: string | null }) {
  const td = `${FONT};font-size:17px;line-height:1.35;color:${C.ink};padding:12px 0;border-bottom:1px solid ${C.line};vertical-align:top`;
  const rows = o.lines
    .map(
      (l) => `<tr><td style="${td};width:44px;font-weight:bold;font-size:20px">${l.qty}×</td>
<td style="${td}">${esc(l.item)}<div style="font-size:14px;color:${C.muted};margin-top:2px">${esc(l.each)} each</div></td>
<td align="right" style="${td};white-space:nowrap;font-weight:bold">${esc(l.total)}</td></tr>`,
    )
    .join('');
  const packs = o.lines.reduce((n, l) => n + l.qty, 0);
  const sub = o.subtotal
    ? `<tr><td colspan="2" style="${FONT};font-size:17px;padding:14px 0 4px;color:${C.ink}"><strong>Subtotal</strong> <span style="color:${C.muted}">(${packs} item${packs === 1 ? '' : 's'})</span></td><td align="right" style="${FONT};font-size:20px;font-weight:bold;padding:14px 0 4px;color:${C.ink}">${esc(o.subtotal)}</td></tr>
<tr><td colspan="3" style="${FONT};font-size:14px;color:${C.muted};padding:0 0 18px">Before Mississippi sales tax and shipping.</td></tr>`
    : '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px">${rows}${sub}</table>`;
}

export function quoteBox(text: string) {
  return `<div style="${FONT};font-size:18px;line-height:1.5;color:${C.ink};background:${C.soft};border-radius:8px;padding:16px 18px;margin:0 0 22px;white-space:pre-wrap">${esc(text)}</div>`;
}
