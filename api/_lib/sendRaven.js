import { Resend } from 'resend';

// Shared, transport-agnostic sender used by both the Vercel serverless function
// (api/send-raven.js) and the Vite dev middleware (vite.config.js). Files under
// api/_lib are ignored by Vercel's route builder and only imported as a library.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server-side length caps — reject oversized payloads (abuse / accidental dumps).
const MAX = { name: 120, email: 200, message: 5000, inquiry: 60 };

// Escape user input before it lands in the email HTML.
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Tiny stable hash → idempotency key, so an accidental double-submit of the same
// message within 24h doesn't deliver twice.
const hash = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
};

// A "summon a voice" request comes through the same endpoint as the contact
// form, tagged with this inquiry. Both emails share the same plain style, but the
// heading/badge/subject differ so the two are trivial to tell apart in the inbox.
const VOICE_INQUIRY = 'Voice request';

// Plain, readable email — no themed background, default surface, simple type.
// The goal is legibility in any client, not a branded card. A small coloured
// badge (blue = message, purple = voice request) is the one differentiator.
const emailHtml = ({ name, email, message, inquiry }) => {
  const isVoice = inquiry === VOICE_INQUIRY;
  const heading = isVoice ? 'New voice request' : 'New message';
  // Contact inquiries show their chip (Senior role, Contract…); voice requests
  // show a fixed purple "Voice request" badge.
  const badgeColor = isVoice ? '#7c3aed' : '#1a56db';
  const badgeText = isVoice ? 'Voice request' : inquiry;
  const badge = badgeText
    ? `<span style="display:inline-block;margin-left:8px;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;color:${badgeColor};background:${badgeColor}14;border:1px solid ${badgeColor}55;">${esc(badgeText)}</span>`
    : '';
  const bodyLabel = isVoice ? 'The request' : 'Message';
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:560px;margin:0 auto;padding:8px 4px;">
    <p style="margin:0 0 20px;font-size:17px;font-weight:600;">
      ${heading}${badge}
    </p>
    <p style="margin:0 0 4px;font-size:13px;color:#666;">From</p>
    <p style="margin:0 0 18px;">${esc(name)} &lt;<a href="mailto:${esc(email)}" style="color:#1a56db;">${esc(email)}</a>&gt;</p>
    <p style="margin:0 0 4px;font-size:13px;color:#666;">${bodyLabel}</p>
    <div style="white-space:pre-wrap;border-left:3px solid ${badgeColor}55;padding-left:14px;margin:0 0 24px;">${esc(message)}</div>
    <p style="margin:0;font-size:13px;color:#666;">Reply directly to this email to answer ${esc(email)}.</p>
  </div>`;
};

/**
 * @returns {{ ok: true, id?: string } | { ok: false, code: 'NOT_CONFIGURED'|'INVALID'|'SEND_FAILED' }}
 */
export async function sendRaven({ name, email, message, inquiry, company } = {}) {
  // Honeypot: `company` is a hidden field no human fills. If present, a bot
  // submitted — return success so it moves on, but send nothing.
  if (company) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  // Missing or still the placeholder from .env.example → not wired up yet.
  if (!apiKey || apiKey === 're_xxxxxxxxx') return { ok: false, code: 'NOT_CONFIGURED' };

  // Never trust the client — validate server-side too (presence, email shape, size).
  if (!name || !email || !message || !EMAIL_RE.test(email)) return { ok: false, code: 'INVALID' };
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message ||
      (inquiry && inquiry.length > MAX.inquiry)) {
    return { ok: false, code: 'INVALID' };
  }

  const resend = new Resend(apiKey);
  const to = process.env.RESEND_TO || 'upadhyaymanan01@gmail.com';
  const from = process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>';

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: inquiry === VOICE_INQUIRY
      // e.g. name = "Voice request — Gandalf" → "Voice request: Gandalf"
      ? `Voice request: ${name.replace(/^Voice request\s*[—-]\s*/, '')}`
      : `${inquiry ? `[${inquiry}] ` : ''}New message from ${name}`,
    text: `${inquiry ? `Inquiry: ${inquiry}\n` : ''}From: ${name} <${email}>\n\n${message}`,
    html: emailHtml({ name, email, message, inquiry }),
    idempotencyKey: `contact/${hash(`${email}|${inquiry}|${message}`)}`,
  });

  if (error) {
    console.error('Resend error:', error);
    return { ok: false, code: 'SEND_FAILED' };
  }
  return { ok: true, id: data?.id };
}

// Map a sendRaven result to an HTTP status, shared by both transports.
export const statusFor = (result) =>
  result.ok ? 200 : result.code === 'NOT_CONFIGURED' ? 503 : result.code === 'INVALID' ? 422 : 502;
