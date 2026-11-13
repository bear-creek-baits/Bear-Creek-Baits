/**
 * Email alert for order requests and contact messages.
 *
 * Netlify runs a function with this exact name after every Netlify Forms submission that passes its spam
 * filter (spam goes to Forms → Spam and sends nothing). It emails the details through Resend, with
 * Reply-To set to the customer, so hitting Reply answers them directly. The look is in ../lib/email.ts.
 *
 * Goes to FORMS_NOTIFY_TO (comma-separated) if set, otherwise to CATCH_REVIEW_TO. Uses RESEND_API_KEY and
 * CATCH_FROM like the catch emails. The submission is already saved in Netlify Forms, so a failed email
 * loses nothing.
 */
import type { Handler } from '@netlify/functions';
import { esc, sendEmail } from '../lib/catches';
import { button, fields, layout, nextStep, orderTable, parseOrder, phoneHref, quoteBox, section } from '../lib/email';

type Data = Record<string, unknown>;

const str = (v: unknown) => String(v ?? '').trim();
const isEmail = (s: string) => /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/.test(s);
const oneLine = (s: string) => s.replace(/\s+/g, ' ').slice(0, 80);
const first = (name: string) => name.split(/\s+/)[0] || name;

/** Plain-text version (for mail apps that don't show HTML). */
function textVersion(title: string, step: string, list: [string, string][], block?: [string, string]) {
  return [
    title,
    '',
    step,
    '',
    ...list.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    ...(block && block[1] ? ['', `${block[0]}:`, block[1]] : []),
  ].join('\n');
}

export function buildEmail(form: string, d: Data) {
  const name = str(d.name) || 'Someone';
  const email = str(d.email);
  const replyTo = isEmail(email) ? email : undefined;
  const phone = str(d.phone);
  const tel = phoneHref(phone);

  if (form === 'order') {
    const contactBy = str(d.contactBy) || 'Email';
    const order = str(d.order);
    const parsed = parseOrder(order);
    const title = `Order request from ${oneLine(name)}`;
    const how = contactBy === 'Text message' ? 'text' : contactBy === 'Phone call' ? 'call' : 'email';
    const step = `<strong>${esc(oneLine(first(name)))} wants you to ${how === 'email' ? 'email' : how} them</strong> to confirm the total, shipping and when the baits will be poured. Nothing has been charged.`;
    const buttons = [
      how === 'text' && tel ? button('Text them', `sms:${tel}`, true) : '',
      how === 'call' && tel ? button('Call them', `tel:${tel}`, true) : '',
      how !== 'text' && tel ? button('Text', `sms:${tel}`) : '',
      how !== 'call' && tel ? button('Call', `tel:${tel}`) : '',
    ].join('');
    const list: [string, string][] = [
      ['Name', str(d.name)],
      ['Reach them by', contactBy],
      ['Phone', phone],
      ['Email', email],
      ['Ship to (city and state)', str(d.location)],
      ['Their notes', str(d.notes)],
    ];
    const body =
      nextStep(`${step}${replyTo ? ' To email them, just hit Reply.' : ''}`, buttons) +
      section('What they want', parsed ? orderTable(parsed) : quoteBox(order || 'No items were listed.')) +
      section('Customer', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fields(list.map(([k, v]) => [k, v, k === 'Phone' && tel ? `tel:${tel}` : k === 'Email' && replyTo ? `mailto:${replyTo}` : undefined]))}</table>`);
    const subtotal = parsed?.subtotal ? ` · ${parsed.subtotal}` : '';
    return {
      subject: `Order request from ${oneLine(name)}${subtotal}`,
      html: layout({ tone: 'order', title, preview: `${contactBy} · ${str(d.location)}${subtotal}`, body, footer: 'Every order request is also saved in Netlify → Forms.' }),
      text: textVersion(title, `${first(name)} wants you to ${how} them to confirm the total and shipping. Nothing has been charged.`, list, ['Order', order]),
      replyTo,
    };
  }

  if (form === 'contact') {
    const topic = str(d.topic);
    const message = str(d.message);
    const title = `Message from ${oneLine(name)}`;
    const list: [string, string][] = [
      ['Name', str(d.name)],
      ['Email', email],
      ['About', topic],
    ];
    const body =
      nextStep(replyTo ? '<strong>Hit Reply to answer them.</strong> Your reply goes straight to their email.' : '<strong>They didn’t leave a working email address</strong>, so replying won’t reach them.') +
      (topic ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#5c5d57;margin:0 0 6px">${esc(topic)}</div>` : '') +
      quoteBox(message || '(No message)') +
      section('From', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fields(list.map(([k, v]) => [k, v, k === 'Email' && replyTo ? `mailto:${replyTo}` : undefined]))}</table>`);
    return {
      subject: `Message from ${oneLine(name)}${topic ? `: ${oneLine(topic)}` : ''}`,
      html: layout({ tone: 'message', title, preview: oneLine(message), body, footer: 'Every message is also saved in Netlify → Forms.' }),
      text: textVersion(title, replyTo ? 'Hit Reply to answer them.' : 'No email address was given, so replying won’t reach them.', list, ['Message', message]),
      replyTo,
    };
  }

  const list = Object.entries(d)
    .filter(([k]) => !['_gotcha', 'form-name', 'ip', 'user_agent', 'referrer'].includes(k))
    .map(([k, v]) => [k, str(v)] as [string, string]);
  const title = `New “${oneLine(form)}” form submission`;
  return {
    subject: title,
    html: layout({ tone: 'message', title, preview: title, body: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${fields(list)}</table>` }),
    text: textVersion(title, '', list),
    replyTo,
  };
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
