import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// A small hover / focus / tap popover that renders through a PORTAL to <body>
// with fixed positioning — so it can never be clipped (or trigger a stray
// scrollbar) inside an `overflow:auto` ancestor. Anchored centered above the
// trigger, flipping below near the top edge, and CLAMPED within the viewport so
// it can never run off-screen (a common mobile failure).
//
// Touch handling: mouse → hover; touch/pen → single tap toggles. We do NOT open
// on `focus`, because on touch a tap fires focus *and* click, which cancel out
// and force an annoying double-tap (Beta 2 bug). Keyboard users open with
// Enter/Space; outside-tap + Escape close.
const Hovercard = ({ content, children, className = '', width = 220, ariaLabel }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const ref = useRef(null);
  const cardRef = useRef(null);
  const ptr = useRef('mouse');

  // Position the card by its TOP-LEFT corner (no CSS centering transform), so the
  // clamp is exact. Measures the rendered card's real size when available (falls
  // back to the configured width + an estimate on the very first paint), then
  // clamps BOTH axes inside the viewport and flips above/below by available room —
  // so the card can never run off-screen on any size.
  const place = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 12;
    const card = cardRef.current;
    const w = Math.min(width, window.innerWidth - margin * 2);
    const h = card ? card.offsetHeight : 0;
    const gap = 8;

    // Prefer above; drop below when there isn't room for the (measured) card.
    const roomAbove = r.top - gap - margin;
    const below = h > 0 ? roomAbove < h : r.top < 180;
    let top = below ? r.bottom + gap : r.top - gap - h;
    top = Math.max(margin, Math.min(window.innerHeight - margin - h, top));

    const center = r.left + r.width / 2;
    const left = Math.max(margin, Math.min(window.innerWidth - margin - w, center - w / 2));
    setPos({ left, top, below, w });
  }, [width]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    place();
    // Re-place once the card has rendered so we can clamp against its real height.
    const raf = requestAnimationFrame(place);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      className={className}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-expanded={open}
      data-cursor="hover"
      onPointerEnter={(e) => { ptr.current = e.pointerType; if (e.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false); }}
      onPointerDown={(e) => { ptr.current = e.pointerType; }}
      // Only tap/pen toggle on click — mouse is driven by hover, so a mouse click
      // never fights the hover state. This is what makes touch a single tap.
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); if (ptr.current !== 'mouse') setOpen((o) => !o); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); } }}
    >
      {children}
      {createPortal(
        <AnimatePresence>
          {open && pos && (
            <motion.div
              ref={cardRef}
              role="tooltip"
              initial={{ opacity: 0, y: pos.below ? -4 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="hovercard"
              style={{ left: pos.left, top: pos.top, width: pos.w }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </span>
  );
};

export default Hovercard;
