// A tiny global "is a UI surface in front?" signal.
//
// The hero astrolabe tracks the cursor (and its needle drives the gear sound)
// from a global pointer listener — so when a menu or modal opens OVER the hero,
// moving the cursor inside that surface would still swing the needle and keep the
// gear humming, even though the instrument is blurred behind and no longer the
// focus. Overlays raise this flag while open; the astrolabe reads it each frame
// and goes dormant (frozen needle, silent gear) until they close.
//
// A counter (not a boolean) so nested/stacked surfaces — e.g. the Voice Hall
// summoned from the ⌘K map — release correctly: dormant until the LAST one closes.

let openCount = 0;

/** Is any registered overlay/menu currently open in front of the page? */
export const isOverlayOpen = () => openCount > 0;

/** Register an overlay as open. Pair every call with exactly one `popOverlay`. */
export const pushOverlay = () => { openCount += 1; };

/** Release a previously-registered overlay. Clamped so it can't go negative. */
export const popOverlay = () => { openCount = Math.max(0, openCount - 1); };

// ── Body scroll-lock ─────────────────────────────────────────────────────────
// Locks page scroll while an overlay is open, without any page reflow ("zoom") as
// the scrollbar disappears and reappears. The standard, self-contained technique
// (Radix / body-scroll-lock / Bootstrap): set `overflow:hidden` AND add a
// `padding-right` equal to the scrollbar's width, measured at lock time, so the
// content that was inset by the scrollbar stays exactly where it was. On browsers
// with overlay scrollbars (macOS default, mobile) the scrollbar has zero width, so
// the compensation is 0 and this is a pure no-op — no global gutter is reserved,
// so no page is ever narrowed. Ref-counted so stacked overlays (e.g. the Hall
// summoned from the ⌘K map) release the lock only when the last one closes.
let scrollLocks = 0;
let saved = { overflow: '', paddingRight: '' };

/** Lock page scroll. Pair every call with exactly one `unlockBodyScroll`. */
export const lockBodyScroll = () => {
  if (typeof document === 'undefined') return;
  if (scrollLocks === 0) {
    const root = document.documentElement;
    // Width the scrollbar occupies right now (0 with overlay scrollbars).
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    saved = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const basePad = parseFloat(getComputedStyle(root).paddingRight) || 0;
      root.style.paddingRight = `${basePad + scrollbarWidth}px`;
    }
  }
  scrollLocks += 1;
};

/** Release a page scroll-lock; restores the original styles at zero. */
export const unlockBodyScroll = () => {
  if (typeof document === 'undefined') return;
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    const root = document.documentElement;
    root.style.overflow = saved.overflow;
    root.style.paddingRight = saved.paddingRight;
  }
};
