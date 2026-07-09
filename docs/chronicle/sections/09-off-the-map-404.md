# 09 — Off the Map (the cinematic 404)

> **Status:** 🟡 specced 2026-07-09 (owner-greenlit for spec at the
> [WONDER-AUDIT](../WONDER-AUDIT-2026-07.md) §5 review), **pending build
> greenlight.** Owner brief: *"very unique, with amazing cinematic animations
> and interactions, and a clear way to navigate to the homepage. Assets can be
> downloaded if they provide value."*
>
> **Read first:** [CLAUDE.md](../../../CLAUDE.md) §2–§4,
> [DESIGN-SYSTEM](../DESIGN-SYSTEM.md), [common-ai-signs](../common-ai-signs.md).

---

## 0. Why this page exists (two reasons, one of them a bug)

1. **Today an unknown URL renders a *blank shell*.** `App.jsx` has no catch-all
   route — `vercel.json` rewrites every non-`/api` path to `index.html`, the
   router matches nothing, and the visitor gets Layout chrome (controls,
   footer) wrapped around an **empty page**. That's worse than a generic 404.
   This spec fixes a real hole, not just decorates one.
2. 404s are a free surprise-and-delight surface almost no portfolio bothers
   with — and "you've sailed off the edge of the chart" is the single most
   *native* idea the cartographer canon can host. The page should feel like the
   margin of an old map: quiet, a little eerie, unmistakably still our world.

---

## 1. Concept — "Beyond the charted realms"

The visitor has wandered past the map's edge. One full-viewport scene — no
scroll, no sections. The centerpiece is the astrolabe, but **lost**: it cannot
find north. The signature interaction is *wayfinding*: the visitor asks the
instrument to find its bearing, the needle whips around and decelerates to
lock pointing at the way home, and the home link ignites. **The navigation is
the moment** — the needle literally points at the exit.

Tone: not an error, an *adventure beat*. "Here be dragons," never "Oops!"
(exclamation-mark error mascots are on the anti-slop blocklist).

---

## 2. The scene (layers, back → front)

| # | Layer | Build |
|---|---|---|
| 1 | **Uncharted sky** | The existing starfield/aurora CSS utilities, but *sparser* than the hero — this is emptier space than the charted realms. Light bases (dawn/day) read as pale, empty parchment-sky instead. |
| 2 | **"Here be dragons" constellation** | A faint custom constellation shaped like a sea-serpent — one seeded polyline + ~10 stars, twinkling slightly brighter than the field. The old cartographers' warning, literalized as a quiet Easter egg. Canvas2D, drawn in the same canvas pass as layer 4 (one canvas, one rAF). |
| 3 | **Edge-of-the-chart fog** | Two drifting fog banks hugging the bottom third, so the page's ground visibly dissolves into nothing (the chart *ends* here). Pure CSS gradient blobs on theme tokens; the orphaned `herofog` keyframe in `index.css` (currently referenced by nothing) is the starting point — reuse or replace it, then it's no longer dead code. Shares the fog utilities built for the [Threshold loader](10-the-threshold-loading.md) — build those once, use twice. |
| 4 | **The lost astrolabe** | Center stage, reusing `mountAstrolabe` (`src/lib/astrolabe.js`) with one new option: **`distressed: true`**. After assembly the needle *wanders* — slow drift with nervous over-corrections (it can't hold a heading), instead of idling toward N. The bearing readout shows `bearing ---° · lost`. Grab/spin/tap still work exactly as on the hero — it's the same instrument, just disoriented. |
| 5 | **Type block + wayfinding CTA** | Eyebrow (`void.eyebrow`), big serif headline (`void.title`), one short body line (`void.body`), a mono "last known position" line rendering the **actual bad pathname** (`void.position` with `{{path}}`), then the CTA pair (§3). |

Everything is procedural — the page ships with **zero required assets** (§6).

---

## 3. The wayfinding interaction (the signature moment)

Two elements, stacked at the scene's foot: the **"Find your bearing"** button
(`void.cta`) and the **"Return to the Chronicle"** link (`void.home`, a real
`<a>`/router `Link` to `/`).

1. **Click "Find your bearing"** → the needle winds up on the existing spin
   flywheel (`spin()` already does the physics), whips 2–3 turns, and
   **decelerates to lock at N — pointing directly at the home link** (position
   the link at the instrument's 12 o'clock so the geometry is literal). The
   existing `detent` gear sound tracks the spin via `onSpeed` exactly as the
   hero does; a `settle` cue lands the lock. The bearing readout ticks to
   `bearing 000° · home`.
2. **On lock, the home link ignites** — an ember underline draws across it +
   a one-step brightness lift. It was always clickable; now it's *lit*.
3. **The ceremony is optional, never a gate.** The home link works from first
   paint, is keyboard-focusable in natural order, and impatient visitors can
   leave immediately. The SideRail is absent (nothing to navigate); Layout's
   global controls + footer remain.

**Fallbacks:** reduced-motion → the needle renders static at N from the start,
the CTA button is hidden, the home link is already lit. Coarse pointer → same
flow, tap-driven (the spin flywheel is already touch-correct).

---

## 4. Copy — `void.*` keys, authored in **all 10 bundles**

Per CLAUDE.md §4.2, every key ships in every voice, in character. Keys:

| Key | Slot | `chronicle` draft (final copy authored at build) |
|---|---|---|
| `void.eyebrow` | small caps eyebrow | `off the map` |
| `void.title` | serif headline | `Here be dragons.` |
| `void.body` | one line under it | `This shore was never charted. The realms you seek lie back the way you came.` |
| `void.position` | mono, interpolated | `last known position: {{path}}` |
| `void.cta` | wayfinding button | `Find your bearing` |
| `void.home` | the link home | `Return to the Chronicle` |

Per-voice direction (suggestions — write to full strength at build time):
`plain` = a clean, friendly 404 ("This page doesn't exist. The portfolio is
this way."); `scott` leans on a confident wrong turn ("I'm not lost. I am
*exploring*. Boldly."); `dwight` treats it as a perimeter breach ("You have
left the designated area. FACT."); `cow` = "Moo?" everywhere it can be;
`got` ("The map is dark and full of terrors"), `deadpool` (fourth-wall: "You
typed that URL yourself. I saw you."), `avengers` (mission control lost
telemetry), `yoda` ("Lost, you are. Found, you will be."), `chandler` ("Could
this page BE any less real?"). Array rule doesn't apply (no array keys here),
but key-parity across all 10 bundles is still mandatory — add a parity check
to the build tasks.

---

## 5. Routing, SEO, analytics

- **Route:** `<Route path="*" element={<Void />} />` inside the Layout route in
  `App.jsx`. `lazy()` + `Suspense` (use the Threshold loader) + `ErrorBoundary`
  — the chunk never touches the initial bundle.
- **Never in the spine:** stays out of `chapters`/`chapterList`/⌘K, like the
  Atelier (WONDER-AUDIT P1 guardrail).
- **Soft-404 caveat:** the Vercel rewrite serves `index.html` with **HTTP 200**
  for unknown paths — a crawler sees a 200 page. Mitigate on the client: on
  mount set `document.title` (e.g. `Off the map — 404`) and inject
  `<meta name="robots" content="noindex">`; remove both on unmount. (A true
  404 status would need a Vercel routes change that risks the SPA rewrite —
  not worth it for a portfolio; note it and move on.)
- **Analytics:** `track('void_view', { path })` on mount — free telemetry on
  broken inbound links — plus `track('void_bearing')` on the CTA (did anyone
  play with it?) and `track('void_home')` on exit. Add all three to
  [ANALYTICS.md](../ANALYTICS.md)'s event catalog when built.

---

## 6. Assets

**Required: none.** The scene is 100% procedural (starfield CSS, fog CSS,
Canvas2D astrolabe + constellation, type). It must ship complete without art —
CLAUDE.md §5, never block on assets.

**Optional upgrade slots** (owner offered to source art — worthwhile only if
the piece is genuinely atmospheric):

| File | What | Spec |
|---|---|---|
| `public/void/edge-dark.webp` / `edge-light.webp` | A wide, very dark/very pale illustrated "torn chart edge" or sea-serpent horizon silhouette, sitting behind the fog layer | ≥1920px wide, ≤120KB each, near-monochrome so theme tokens still own the palette. Probed like realm covers; gracefully absent. |

If sourced, add the generation/sourcing prompt to [ASSETS.md](../ASSETS.md) in
the same change (docs/code never diverge).

---

## 7. Guards (non-negotiable)

- **Reduced motion:** static needle at N, no wander, no spin ceremony, fog
  static at low opacity, link pre-lit. Identical information, zero motion.
- **Touch / coarse pointer:** no cursor-tracking (the astrolabe already handles
  this); the ceremony is tap-driven.
- **Cleanup:** one rAF for the whole canvas scene, killed on unmount;
  `gsap.context()`/listeners reverted per CLAUDE.md §4.4.
- **A11y:** real `<a>` home, `<button>` CTA, AA contrast on the headline over
  the starfield in all four skies, canvas `aria-hidden`, `role="status"` not
  needed (static page).
- **Perf:** code-split chunk (~a few KB gz + the shared astrolabe lib); no new
  deps; no idle cost beyond the single scene rAF.

---

## 8. Acceptance criteria

- Any unknown path (`/foo`, `/making-of/x`, deep garbage) — both direct-load
  (prod rewrite) and client-side navigation — shows the scene. **The blank-shell
  hole is gone.**
- The wayfinding ceremony: spin → decelerating lock at N → readout `000° ·
  home` → link ignition, with gear/settle audio, at 60fps.
- Home link works from first paint, keyboard-focusable, and lands on `/` at the
  top (not a restored scroll position).
- Correct in dark + light (all four skies), 360/768/1280/1920, reduced-motion,
  touch. `void.*` key-parity across all 10 bundles. `document.title` + noindex
  set on the route, removed on leave. No console errors; `npm run build` clean.
- Passes the [common-ai-signs](../common-ai-signs.md) §9 checklist — no "Oops!",
  no sad-robot mascot, no centered-card-with-giant-404 template look.

---

## 9. Build tasks

- [ ] `distressed` option in `src/lib/astrolabe.js` (wander behavior + `lost`
      readout state) — additive, hero behavior untouched.
- [ ] The serpent constellation (seeded points + polyline) in the same canvas.
- [ ] Fog utilities (shared with the [Threshold loader](10-the-threshold-loading.md) —
      build once): back-bank + drift keyframes on theme tokens; retire or reuse
      the orphaned `herofog` keyframes.
- [ ] `src/pages/Void.jsx` (scene + wayfinding) wired as `path="*"`, lazy +
      ErrorBoundary; SEO title/noindex effect.
- [ ] `void.*` keys authored in all 10 bundles, in character; parity-checked.
- [ ] Analytics events (`void_view`/`void_bearing`/`void_home`) + ANALYTICS.md.
- [ ] Verify per §8 (headless screenshots dark+light, reduced-motion, mobile).
- [ ] Cross-link status back in [WONDER-AUDIT](../WONDER-AUDIT-2026-07.md) §5.
