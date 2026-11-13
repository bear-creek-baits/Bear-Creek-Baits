/**
 * Email alert for order requests and contact messages.
 *
 * Netlify runs a function with this exact name after every Netlify Forms submission that passes its spam
 * filter (spam goes to Forms → Spam and sends nothing). It emails the details through Resend, with
 * Reply-To set to the customer, so hitting Reply answers them directly.
 *
 * Goes to FORMS_NOTIFY_TO (comma-separated) if set, otherwise to CATCH_REVIEW_TO. Uses RESEND_API_KEY and
 * CATCH_FROM like the catch emails. The submission is already saved in Netlify Forms, so a failed email
 * loses nothing.
 */
import type { Handler } from '@netlify/functions';
import { esc, sendEmail } from '../lib/catches';

type Data = Record<string, unknown>;

const str = (v: unknown) => String(v ?? '').trim();
const isEmail = (s: string) => /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/.test(s);
const oneLine = (s: string) => s.replace(/\s+/g, ' ').slice(0, 80);

function rows(fields: [string, string][]) {
  const shown = fields.filter(([, v]) => v);
  return {
    html: shown
      .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
      .join(''),
    text: shown.map(([k, v]) => `${k}: ${v.includes('\n') ? `\n${v}` : v}`).join('\n'),
  };
}

export function buildEmail(form: string, d: Data) {
  const name = str(d.name) || 'someone';
  const email = str(d.email);
  let subject: string;
  let intro: string;
  let fields: [string, string][];
  let block: [string, string] | null = null;

  if (form === 'order') {
    subject = `Order request from ${oneLine(name)}`;
    intro = 'New order request from the website. Nothing has been charged: confirm stock, total and shipping with the customer.';
    const contactBy = str(d.contactBy) || 'Email';
    fields = [
      ['Name', str(d.name)],
      ['Reach them by', contactBy],
      ['Email', email],
      ['Phone', str(d.phone)],
      ['City and state', str(d.location)],
      ['Notes', str(d.notes)],
    ];
    block = ['Order', str(d.order)];
  } else if (form === 'contact') {
    const topic = str(d.topic);
    subject = `Message from ${oneLine(name)}${topic ? `: ${oneLine(topic)}` : ''}`;
    intro = 'New message from the contact form on the website.';
    fields = [
      ['Name', str(d.name)],
      ['Email', email],
      ['About', topic],
    ];
    block = ['Message', str(d.message)];
  } else {
    subject = `New "${oneLine(form)}" form submission`;
    intro = 'New form submission from the website.';
    fields = Object.entries(d)
      .filter(([k]) => !['_gotcha', 'form-name', 'ip', 'user_agent', 'referrer'].includes(k))
      .map(([k, v]) => [k, str(v)]);
  }

  const t = rows(fields);
  const replyTo = isEmail(email) ? email : undefined;
  const footer = replyTo ? 'Reply to this email to answer them directly.' : 'No email address was given, so replying to this email won’t reach them.';
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#151613;max-width:640px">
<h2 style="margin:0 0 8px">${esc(subject)}</h2>
<p style="margin:0 0 16px;color:#444">${esc(intro)}</p>
<table style="border-collapse:collapse;margin-bottom:16px">${t.html}</table>
${block && block[1] ? `<h3 style="margin:0 0 6px">${esc(block[0])}</h3><div style="white-space:pre-wrap;background:#f4f2ec;border-radius:8px;padding:12px 14px;font-family:Consolas,Menlo,monospace;font-size:14px">${esc(block[1])}</div>` : ''}
<p style="margin:16px 0 0;color:#666;font-size:13px">${esc(footer)} Every submission is also saved in Netlify → Forms.</p>
</div>`;
  const text = [subject, '', intro, '', t.text, ...(block && block[1] ? ['', `${block[0]}:`, block[1]] : []), '', footer].join('\n');
  return { subject, html, text, replyTo };
}

export const handler: Handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}').payload ?? {};
    const form = str(payload.form_name || payload.data?.['form-name']);
    const data: Data = payload.data ?? {};
    if (str(data._gotcha)) return { statusCode: 200, body: 'ignored' };
    const msg = buildEmail(form, data);
    await sendEmail({ ...msg, to: process.env.FORMS_NOTIFY_TO || undefined });
    return { statusCode: 200, body: 'sent' };
  } catch (e) {
    // Never fail the submission over an email problem; it's already saved in Netlify Forms.
    console.error('form alert failed', e);
    return { statusCode: 200, body: 'not sent' };
  }
};
