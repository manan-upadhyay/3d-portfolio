# 10 — The Threshold (cinematic loading states)

> **Status:** 🟡 specced 2026-07-09 (owner-added at the
> [WONDER-AUDIT](../WONDER-AUDIT-2026-07.md) §5 review), **pending build
> greenlight.** Owner brief: *"a cloudy, foggy astrolabe spinning; themed
> background with fog/clouds behind it, as well as some overlapping the
> astrolabe, giving it a cinematic effect. Propose if you have better ideas."*
>
> **Read first:** [CLAUDE.md](../../../CLAUDE.md) §2–§4,
> [DESIGN-SYSTEM](../DESIGN-SYSTEM.md), [common-ai-signs](../common-ai-signs.md).

---

## 0. What "loading" means here — and what it must NOT become

**There is no boot/splash screen, and this spec will not add one.** First paint
is instant today (the Hero is eager) and stays that way — the same bounce-risk
reasoning that closed the hero title-sequence intro (WONDER-AUDIT C1). The rule:
**never *add* wait; only dress wait that already exists.**

The wait that already exists — every surface is a `Suspense` fallback for a
lazy chunk:

| Surface | Today | File |
|---|---|---|
| The five Chronicle section chunks (About/Experience/Tech/Works/Contact) | `SectionLoader` — a generic ember ring spinner | `src/pages/Chronicle.jsx` |
| The Atelier chunk on `/making-of` | `PageLoader` — the **same** spinner, more padding | `src/pages/MakingOf.jsx` |
| (Future) the 404 route chunk | — | [09-off-the-map-404.md](09-off-the-map-404.md) |

A `border-t-transparent rounded-full animate-spin` ring is on the anti-slop
blocklist in spirit — it's the single most generic loading tell on the web.
Both get replaced by **one shared component**: **`ThresholdLoader`**.

---

## 1. Concept — "the fog before the realm" (owner's direction, endorsed)

The next realm hasn't been charted into view yet; the traveler is at its
threshold, in fog, instrument in hand. A miniature astrolabe turns slowly
inside layered cloud — fog **behind** it for depth, one thin veil drifting
**across/over** it so the instrument reads as *emerging from* the fog rather
than printed on it. That front overlap is what sells the cinematic depth; the
owner called it, and it's right.

### Layers (back → front)

1. **Back fog:** two large, soft radial-gradient blobs (pure CSS, theme
   tokens — ember-tinted in dark, cool parchment-grey in light) drifting in
   opposite directions on slow keyframes. The orphaned `herofog` keyframes in
   `index.css` (currently referenced by nothing) are the seed — finish them or
   replace them; either way the dead code goes. These utilities are **shared
   with the 404's edge-fog** (build once, use twice).
2. **The instrument:** a dedicated **`astrolabe-mini`** Canvas2D renderer —
   deliberately *not* `mountAstrolabe` (316 lines of pointer-tracking, resize
   observers and spin physics we don't want in a fallback). ~60 lines: outer
   ring, tick bezel, 3–5 seeded stars, and a needle sweeping at a slow constant
   rate with a slight ease wobble — a **searching instrument, not a progress
   bar** (it must never imply percent). ~120px square, theme tokens read at
   mount, DPR-capped like the hero canvas.
3. **Front veil:** one narrow translucent gradient streak (~35% opacity)
   slowly translating across the instrument. Opacity only — no blend modes, no
   blur filters (budget §4.6: transform/opacity).
4. **Caption:** a quiet mono line beneath, **chapter-aware** — `SectionLoader`
   knows which section it guards, so pass the chapter id and render
   `t('loader.charting', { realm: t('chapters.<id>.label') })` → *"charting
   The Arsenal…"*. The realm names are already voiced, so the per-voice cost is
   **two keys**: `loader.charting` (+ `{{realm}}`) and a generic
   `loader.veil` (*"the fog is lifting…"*) for surfaces with no chapter
   (Atelier, 404 chunk). Both authored in **all 10 bundles**, in character
   (`cow`: *"moo…"*, naturally).

No sound. A loader that beeps is a loader you learn to hate; sound rewards
intent, and waiting isn't intent.

---

## 2. Counter-proposals (owner asked for better ideas)

**A. The show-delay gate — recommended, ship regardless of visuals.**
On decent connections a section chunk resolves in well under 200ms, so *any*
loader is a flash of noise. Render **nothing for the first ~250ms**, then fade
the Threshold in over ~200ms. Result: most visitors never see a loader at all
(the best loading state is none); slow connections get a composed moment
instead of a blink. This one rule out-values the entire visual upgrade.

**B. The needle finds the bearing — the resolve payoff (recommended).**
When the chunk resolves *and the loader was actually visible*, don't hard-swap:
let the needle make one quick final sweep and **settle at N** as the loader
cross-fades into the arriving section (~250ms grace, capped so it never
meaningfully delays content). "Loading" becomes "found it." Cheap, in-world,
and it makes slow connections feel *choreographed* rather than apologized to.
Skip the grace entirely when the loader never showed (gate A).

**C. Route-transition fog wipe — recommend against (for now).**
A full-viewport fog wipe on `/` → `/making-of` was considered and is
deliberately **not** in scope: the Atelier chunk is small, the page has its own
entrance, and a wipe *adds* perceived wait — the exact thing rule §0 forbids.
Revisit only if a future route genuinely needs to mask a heavy load.

---

## 3. Guards (non-negotiable)

- **Reduced motion:** no rAF at all — a static mini-astrolabe (needle at N),
  fog frozen at low opacity, caption unchanged. Gate A still applies.
- **Layout:** identical footprint to the current loaders (the `py-20` /
  `py-32` block) — **zero CLS**, no reflow when the section arrives.
- **Cleanup:** the rAF stops on unmount (and under gate A never starts before
  the loader is visible); fully self-cleaning; zero idle cost after resolve.
- **A11y:** wrapper `role="status"` + `aria-live="polite"` (the caption is the
  announcement), canvas `aria-hidden`, AA contrast on the caption both themes.
- **Perf:** zero assets, zero deps, ~1.5KB gz; lives in `src/components/`
  (barrel-exported), used by both pages + the 404 route.

---

## 4. Acceptance criteria

- Throttled to Slow 3G: each Chronicle section chunk shows the Threshold —
  layered fog, turning needle, front veil overlapping the instrument, correct
  chapter name in the caption — in dark **and** light, at 360/768/1280/1920.
- Fast network: **no flash** — chunks resolving under ~250ms show nothing.
- Resolve payoff (B): needle settles to N, loader cross-fades into the section;
  total added delay ≤250ms and only when the loader was visible.
- `/making-of` uses the same component with the generic `loader.veil` caption.
- Reduced-motion: static variant, no rAF. `loader.*` key-parity across all 10
  bundles. No console errors; `npm run build` clean; both old spinners deleted.

---

## 5. Build tasks

- [ ] Fog CSS utilities on theme tokens (shared with the 404 — build once);
      retire the orphaned `herofog` keyframes into them.
- [ ] `astrolabe-mini` renderer (Canvas2D, ~60 lines, no input handling).
- [ ] `ThresholdLoader` component: layers + gate A + resolve payoff B +
      reduced-motion static variant; `role="status"`.
- [ ] Replace `SectionLoader` (Chronicle) + `PageLoader` (MakingOf); pass the
      chapter id from each Suspense site; delete the spinner markup.
- [ ] `loader.charting` + `loader.veil` in all 10 bundles, in character;
      parity-checked.
- [ ] Verify per §4 (headless, network-throttled, dark+light, reduced-motion).
- [ ] Cross-link status back in [WONDER-AUDIT](../WONDER-AUDIT-2026-07.md) §5.
