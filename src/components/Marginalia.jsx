import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trackOnce } from '../lib/analytics';

// MARGINALIA — flavor meets substance (LEGENDARY-ROADMAP §2).
//
// A flavor phrase carries a dotted underline + a superscript dagger (†, the
// classic footnote rune). Hover/focus/tap unfolds a margin note with the real
// engineering fact behind the flourish — so the fantasy earns its keep. The note
// text is PLAIN substance in every voice (authored once under `marginalia.<id>`
// in the chronicle bundle; other voices fall back to it).
//
// Authoring: copy lives in the i18n bundles as usual; wrap the phrase to annotate
// inline with the marker `[[id|the flavor phrase]]`, then render that string
// through <Annotated text={t('…')} />. Strings without a marker pass straight
// through, so it's safe everywhere / in every voice.
//
// The note renders through a PORTAL to <body> with fixed positioning so it can
// never be clipped by an `overflow:hidden` ancestor (e.g. the contact submit
// button's shine-sweep mask).

const TIP_STYLE = {
  background: 'color-mix(in srgb, var(--color-card-bg) 98%, transparent)',
  border: '1px solid var(--color-card-border)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: 'var(--shadow-card)',
};

// Discoverability teach (features value audit 2026-07-08, P2): the dotted
// underline + dagger is subtle enough that many never learn these phrases are
// interactive. The FIRST footnote a visitor scrolls to gets a single ember-glow
// shimmer — then every other one stays quiet, forever. Claimed by the first
// instance to mount (About, top of the page); persisted once-per-visitor.
let hintClaimed = false;
const HINT_KEY = 'marginaliaHinted';

const Marginalia = ({ id, children }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const [hinting, setHinting] = useState(false);
  const triggerRef = useRef(null);
  const ptr = useRef('mouse');
  const tipId = useId();
  const note = t(`marginalia.${id}`);

  // Claim the one-time hint on mount (if nobody has, it isn't already spent, and
  // motion is allowed), then fire the shimmer the first time this phrase scrolls
  // into view — teaching the affordance exactly once, where the eye already is.
  useEffect(() => {
    if (hintClaimed) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let spent = false;
    try { spent = localStorage.getItem(HINT_KEY) === '1'; } catch { /* private mode */ }
    if (spent) return undefined;
    const el = triggerRef.current;
    if (!el) return undefined;
    hintClaimed = true; // this instance is the teacher; no other will shimmer
    let fired = false;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      fired = true;
      io.disconnect();
      try { localStorage.setItem(HINT_KEY, '1'); } catch { /* private mode */ }
      setHinting(true);
      setTimeout(() => setHinting(false), 1500);
    }, { threshold: 0.9 });
    io.observe(el);
    // Release the claim on cleanup if we never fired, so a remount (StrictMode's
    // dev double-invoke, or this teacher unmounting) can re-claim and re-observe.
    return () => { io.disconnect(); if (!fired) hintClaimed = false; };
  }, []);

  // Adoption signal (LEGENDARY-ROADMAP §2): did visitors actually discover the
  // flavor↔substance footnotes? Fire once per distinct note per session, on any
  // reveal path (hover / tap / keyboard) — never per-frame.
  useEffect(() => { if (open) trackOnce(`marginalia:${id}`, 'marginalia_reveal', { id }); }, [open, id]);

  // Anchor the portalled note to the trigger — centered above it, flipping below
  // near the top edge, and CLAMPED within the viewport so it never runs off-screen
  // on small screens (Beta 2 mobile bug). Kept in sync while open (scroll/resize).
  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 12;
    const w = Math.min(280, window.innerWidth * 0.78);
    const half = w / 2;
    const center = r.left + r.width / 2;
    const left = Math.max(margin + half, Math.min(window.innerWidth - margin - half, center));
    const below = r.top < 120;
    setPos({ left, top: below ? r.bottom : r.top, below });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, place]);

  // Tap-opened notes close on an outside pointer / Escape (mouse uses hover).
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (triggerRef.current && !triggerRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Self-contained: stop clicks/keys from reaching a parent (e.g. the contact
  // submit button) so revealing the note never also triggers the parent action.
  // Only tap/pen toggle on click (mouse uses hover); we do NOT open on focus, so
  // a touch tap — which fires focus AND click — opens in a SINGLE tap, not two.
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); }
  };

  return (
    <span
      ref={triggerRef}
      className={`marginalia${hinting ? ' marginalia--hint' : ''}`}
      role="button"
      tabIndex={0}
      data-cursor="hover"
      aria-describedby={open ? tipId : undefined}
      aria-expanded={open}
      onPointerEnter={(e) => { ptr.current = e.pointerType; if (e.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false); }}
      onPointerDown={(e) => { ptr.current = e.pointerType; }}
      onClick={(e) => { e.stopPropagation(); if (ptr.current !== 'mouse') setOpen((o) => !o); }}
      onKeyDown={onKeyDown}
    >
      {children}
      <sup className="marginalia__rune" aria-hidden="true">†</sup>
      {createPortal(
        <AnimatePresence>
          {open && pos && (
            <motion.span
              role="tooltip"
              id={tipId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="marginalia__note"
              style={{ ...TIP_STYLE, left: pos.left, top: pos.top, transform: pos.below ? 'translate(-50%, 8px)' : 'translate(-50%, calc(-100% - 8px))' }}
            >
              {note}
            </motion.span>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </span>
  );
};

// Splits a translated string on `[[id|phrase]]` markers, rendering each marked
// phrase as a <Marginalia>. No marker (or a non-string) → returns the value
// as-is, so every voice and every call site is safe to wrap.
const MARK = /\[\[([a-zA-Z0-9-]+)\|([\s\S]+?)\]\]/g;

export const Annotated = ({ text }) => {
  if (typeof text !== 'string' || !text.includes('[[')) return <>{text}</>;

  const parts = [];
  let last = 0;
  let key = 0;
  let m;
  MARK.lastIndex = 0;
  while ((m = MARK.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<Marginalia key={key++} id={m[1]}>{m[2]}</Marginalia>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};

export default Marginalia;
