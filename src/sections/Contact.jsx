import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github, MapPin, ArrowUpRight, Send, Loader2, Check, Download, Copy, Feather } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { personalInfo, summon, chapters } from '../constants';
import { ChapterHeading, ScrollReveal, ExpeditionRecap, RavenBurst, RavenNotice } from '../components';
import { playCue } from '../lib/sound';
import { sendRaven, EMAIL_RE } from '../lib/raven';
import { track, trackOnce } from '../lib/analytics';

// Presentational icon map — data (label/value/href) lives in constants.
const CHANNEL_ICONS = { email: Mail, linkedin: Linkedin, github: Github, location: MapPin };

// Pick a random variant, avoiding an immediate repeat of `not` for surprise.
const pick = (arr, not) => {
  const pool = arr.length > 1 && not ? arr.filter((m) => m !== not) : arr;
  return pool[Math.floor(Math.random() * pool.length)];
};

/* Idle / sending state for the status console — a subtle pulsing pip + a line of
   serif copy. Shares the console slot with RavenNotice so states crossfade in
   place with no layout shift. */
const ConsoleLine = ({ kind, children }) => (
  <motion.div
    className={`raven-console__line raven-console__line--${kind}`}
    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <span className="raven-console__pip" aria-hidden="true" />
    {kind === 'sending'
      ? <Loader2 size={13} className="animate-spin" style={{ color: 'var(--color-ember)' }} />
      : <Feather size={13} style={{ color: 'var(--color-ember)' }} />}
    <span className="raven-console__text">{children}</span>
  </motion.div>
);

/* Copy-to-clipboard button (email row) — copying "seals" the address: a wax-seal
   stamp (the check presses in) + an expanding wax ring, paired with the `seal`
   cue (S1). Rewards the deliberate copy action; flips back after ~2s. */
const CopyButton = ({ text }) => {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      playCue('seal'); // the wax-seal press — a deliberate stamp, not a click
      track('email_copied'); // a quiet but strong contact-intent signal
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the mailto link still works */ }
  };
  return (
    <button type="button" onClick={copy} data-cursor="hover"
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      className="relative grid place-items-center w-9 h-9 rounded-lg flex-shrink-0 transition-colors"
      style={{ color: copied ? 'var(--color-success)' : 'var(--color-ember)', background: 'rgba(var(--color-ember-rgb),0.08)' }}>
      {/* the wax spreading — a ring that stamps out and fades */}
      <AnimatePresence>
        {copied && !reduce && (
          <motion.span key="seal-ring" aria-hidden="true" className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ scale: 0.55, opacity: 0.55 }} animate={{ scale: 1.9, opacity: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ border: '1.5px solid rgba(var(--color-ember-rgb),0.6)' }} />
        )}
      </AnimatePresence>
      {copied ? (
        <motion.span key="check" className="grid place-items-center"
          initial={reduce ? false : { scale: 1.55 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 600, damping: 17 }}>
          <Check size={15} />
        </motion.span>
      ) : (
        <Copy size={15} />
      )}
    </button>
  );
};

/* Slowly-rotating contact compass — the section's own larger instrument */
const ContactCompass = () => {
  const reduce = useReducedMotion();
  return (
    <div className="relative grid place-items-center flex-shrink-0 overflow-hidden" style={{ width: 132, height: 132 }} aria-hidden="true">
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(var(--color-ember-rgb),0.14), transparent 70%)' }} />
      <motion.svg width="132" height="132" viewBox="0 0 120 120"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}>
        <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-card-border)" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="var(--color-card-border)" strokeDasharray="2 6" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="60" y1="60" x2="60" y2="10" stroke="var(--color-card-border)"
            transform={`rotate(${i * 45} 60 60)`} opacity={i % 2 ? 0.3 : 0.6} />
        ))}
        {/* N–S needle */}
        <polygon points="60,14 66,60 60,66 54,60" fill="var(--color-ember)" />
        <polygon points="60,106 54,60 60,54 66,60" fill="var(--color-gold)" opacity="0.7" />
        <circle cx="60" cy="60" r="4" fill="var(--color-ember)" />
      </motion.svg>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const honeypotRef = useRef(null); // bot trap — humans never fill this
  const submitRef = useRef(null);   // raven burst erupts from the button
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState(null); // which field to highlight

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setErrorField(null);
  };

  // Set a random on-theme error variant; interpolate {{email}} for the
  // not-configured case (i18next skips interpolation inside returnObjects arrays).
  // No sound here — the cue is owned by the caller (lib/raven for network
  // failures, `failValidation` for client-side checks).
  const failMsg = (key) => {
    const variants = t(`contact.errors.${key}`, { returnObjects: true });
    let msg = pick(variants, error);
    if (key === 'notConfigured') msg = msg.replace(/\{\{email\}\}/g, personalInfo.email);
    setError(msg);
  };
  // Client-side validation failure — message + the "raven refused" cue.
  const failValidation = (key) => { failMsg(key); playCue('error'); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    // On a validation error, jump the visitor straight to the offending field
    // (focus + highlight) so there's nothing to hunt for.
    const fail = (field, ref, key) => { setErrorField(field); ref.current?.focus(); return failValidation(key); };
    if (!form.name) return fail('name', nameRef, 'required');
    if (!form.email) return fail('email', emailRef, 'required');
    if (!EMAIL_RE.test(form.email)) return fail('email', emailRef, 'email');
    if (!form.message) return fail('message', msgRef, 'required');
    setErrorField(null);

    setError('');
    setLoading(true);
    track('contact_submit'); // the conversion attempt
    // Shared dispatch: posts, parses, and plays the flight/refused cue for us.
    const result = await sendRaven({
      name: form.name,
      email: form.email,
      message: form.message,
      inquiry: 'Portfolio contact',
      company: honeypotRef.current?.value || '',
    });
    if (result.ok) {
      setSuccess(true);
      track('contact_success'); // the conversion — the headline metric
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } else {
      track('contact_error', { code: result.code });
      failMsg(result.code); // sendRaven already played the 'error' cue
    }
    setLoading(false); // always clears — the loader can never hang
  };

  const inputCls = 'form-field w-full py-3.5 px-4 rounded-xl outline-none border transition-colors duration-300';
  const inputStyle = { background: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)', color: 'var(--color-text)' };
  const fieldStyle = (field) => (errorField === field ? { ...inputStyle, borderColor: 'var(--color-error)' } : inputStyle);

  return (
    <>
      <ChapterHeading no={chapters.contact.no} eyebrow={t('chapters.contact.label')} title={`${t('chapters.contact.sub')}.`} />
      <div className="mt-5 flex items-center gap-2">
        <span className="status-dot" />
        <p className="text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
          {t('contact.availability')}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mt-10">
        {/* ---- Message ---- */}
        {/* Phones: a full-bleed BAND (edge-to-edge surface, no radius) so the
            form reads as its own scene and never blends into the projects above
            (v2.0 round 4). Desktop keeps the card. */}
        <ScrollReveal direction="up" className="contact-plate contact-plate--card contact-band min-w-0 flex flex-col">
          {/* v2.0 A2 — the inquiry chips are gone. Four decisions before typing a
              word was pure friction on a form whose only job is "reach Manan":
              three fields, one button, nothing to categorise. */}
          <span className="chapter-eyebrow mb-7">{t('contact.theMessage')}</span>

          {/* noValidate: we run our own (voice-aware) validation in handleSubmit,
              so suppress the browser's native bubbles — otherwise an invalid
              type="email" value is caught natively and our custom error (and
              every voice's variant of it) never gets a chance to show. */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 flex-1"
            onFocus={() => trackOnce('contact_form_start', 'contact_form_start')}>
            {/* Honeypot — visually hidden, off the tab order; a filled value = bot. */}
            <input
              ref={honeypotRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <input ref={nameRef} name="name" value={form.name} onChange={handleChange} placeholder={`${t('contact.placeholders.name')} *`}
                autoComplete="name" enterKeyHint="next" aria-invalid={errorField === 'name'}
                className={inputCls} style={fieldStyle('name')} aria-label="Your name" aria-required="true" />
              <input ref={emailRef} name="email" type="email" value={form.email} onChange={handleChange} placeholder={`${t('contact.placeholders.email')} *`}
                autoComplete="email" inputMode="email" enterKeyHint="next" aria-invalid={errorField === 'email'}
                className={inputCls} style={fieldStyle('email')} aria-label="Your email" aria-required="true" />
            </div>
            <textarea ref={msgRef} name="message" rows={4} value={form.message} onChange={handleChange} aria-invalid={errorField === 'message'}
              placeholder={`${t('contact.placeholders.message')} *`}
              autoComplete="off"
              className={`${inputCls} resize-none flex-1 min-h-[140px]`} style={inputStyle} aria-label="Your message" aria-required="true" />

            <div className="flex flex-col sm:flex-row gap-3">
              <button ref={submitRef} type="submit" disabled={loading} data-cursor="hover"
                className="btn-primary flex-1 disabled:opacity-70">
                {loading ? (<><Loader2 size={18} className="animate-spin" /> {t('contact.submitLoading')}</>) : (<>{t('contact.submitIdle')} <Send size={16} /></>)}
              </button>
              <a href={personalInfo.resumeLink} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                onClick={() => track('resume_open', { from: 'contact' })}
                className="btn-secondary" aria-label={`${t('contact.resumeCta')} (PDF)`}>
                <Download size={16} /> {t('contact.resumeCta')}
              </a>
            </div>

            {/* Status console — a fixed-height slot below the action row. All
                feedback (idle / sending / error / success) crossfades IN PLACE
                here, so the buttons never jump and the card's lower space reads as
                an intentional "transmission" footer rather than dead air. */}
            <div className="raven-console">
              <div className="raven-console__slot">
                <AnimatePresence mode="wait">
                  {error ? (
                    <RavenNotice key={error} type="error">{error}</RavenNotice>
                  ) : success ? (
                    <RavenNotice key="success" type="success">{t('contact.success')}</RavenNotice>
                  ) : loading ? (
                    <ConsoleLine key="sending" kind="sending">{t('contact.status.sending')}</ConsoleLine>
                  ) : (
                    <ConsoleLine key="idle" kind="idle">{t('contact.status.idle')}</ConsoleLine>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
          {/* The raven flock — erupts from the button on success */}
          <RavenBurst active={success} originRef={submitRef} />
        </ScrollReveal>

        {/* ---- Correspondence ---- */}
        {/* Phones: the BARE beat between the two bands (page background, no
            chrome) — the alternation is what tells the sections apart. */}
        <ScrollReveal direction="up" delay={0.1} className="contact-plate contact-plate--card flex flex-col min-w-0">
          <div className="flex items-start justify-between flex-col sm:flex-row">
            <span className="chapter-eyebrow">{t('contact.correspondence')}</span>
            <span className='mt-6 sm:mt-0 self-center sm:self-end'>
            <ContactCompass />
            </span>
          </div>

          <div className="mt-2 flex flex-col divide-y" style={{ borderColor: 'var(--color-card-border)' }}>
            {summon.channels.map(({ key, value, href }) => {
              const Icon = CHANNEL_ICONS[key];
              const label = t(`contact.channels.${key}`);
              const IconBox = (
                <span className="grid place-items-center w-10 h-10 rounded-xl flex-shrink-0"
                  style={{ background: 'rgba(var(--color-ember-rgb),0.1)', border: '1px solid rgba(var(--color-ember-rgb),0.25)' }}>
                  <Icon size={17} style={{ color: 'var(--color-ember)' }} />
                </span>
              );
              // The value WRAPS instead of truncating (persona audit item 5): the
              // long email is always fully readable on any width, and whole-row
              // navigation stays intact on every channel. `break-all` lets the
              // address wrap mid-string; short values never wrap.
              const Labels = (
                <span className="flex-1 min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                  <span className="block text-[14px] break-all" style={{ color: 'var(--color-text)' }}>{value}</span>
                </span>
              );
              const Arrow = (
                <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: 'var(--color-ember)' }} />
              );

              // Email: the row still links (mailto), plus a copy button to the
              // right of the redirect arrow. (A <button> can't nest in an <a>,
              // so the link and the copy button are siblings.)
              if (key === 'email') {
                return (
                  <div key={key} className="flex items-center gap-2 py-4 group">
                    <a href={href} data-cursor="hover" className="flex items-center gap-4 flex-1 min-w-0"
                      onClick={() => track('channel_open', { channel: key })}>
                      {IconBox}{Labels}{Arrow}
                    </a>
                    <CopyButton text={personalInfo.email} />
                  </div>
                );
              }

              const Row = (
                <div className="flex items-center gap-4 py-4 group">
                  {IconBox}{Labels}{href && Arrow}
                </div>
              );
              return href ? (
                <a key={key} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" data-cursor="hover"
                  onClick={() => track('channel_open', { channel: key })}>{Row}</a>
              ) : (
                <div key={key}>{Row}</div>
              );
            })}
          </div>

          <p className="font-chronicle italic text-[17px] mt-auto pt-6" style={{ color: 'var(--color-ember)' }}>
            {t('contact.quote')}
          </p>
        </ScrollReveal>
      </div>

      {/* Phase 5 — in-session "expedition recap" send-off */}
      <ExpeditionRecap />
    </>
  );
};

export default SectionWrapper(Contact, 'contact');
