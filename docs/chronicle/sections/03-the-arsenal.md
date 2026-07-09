# Section 03 — The Arsenal (Tech / Skills)

**Component:** `src/sections/Tech.jsx` · **id:** `arsenal` · **Status:** built
(interactive orbital skill field + switchable inventory view).

## Purpose
Show the toolkit as a living **constellation/orbital field**, not a list and not
two redundant blocks. This is the *single* home of skills (About has none).
**No percentages, no progress bars, ever** (senior signal).

## The mechanic — interactive orbital skill field (signature motion)
A central focal mark (sigil/compass or the word "Arsenal") with **tech nodes
orbiting** in concentric rings grouped by craft:

- **Ring 1 (inner): Primary armaments** — the core stack (React, Next, Node, TS):
  larger nodes with real logos (`assets/tech/`), ember halo.
- **Ring 2/3:** Frontend / Backend / DevOps & Craft skills as smaller nodes.
- Nodes **drift/orbit slowly** (rAF or GSAP, transform-only). **On hover**, a
  node scales, brightens, shows its label, and faint **constellation lines**
  connect it to siblings in its group. The custom cursor backlight enhances it.
- Optional: hovering a **group legend** highlights/pulls that group's nodes.

### Layout & responsiveness
- Desktop: true radial orbital field (absolute-positioned nodes via polar coords
  computed from indices; animate angle over time).
- Tablet/mobile/reduced-motion: collapse to **grouped "rune" clusters** —
  three labeled groups, each a wrap of skill chips (primary chips larger with an
  ✦), no orbit. Same data, simpler presentation. Never show a percentage.

```js
// polar placement helper
const angle = (i / count) * Math.PI * 2 + ringPhase;
const x = cx + Math.cos(angle) * radius;
const y = cy + Math.sin(angle) * radius;
```

## Visual language
- Nodes: circular `realm-card`-like tiles; primary = larger + ember ring; logo
  centered; label appears on hover (ember). Lines: faint `--color-ember` at low
  opacity. Background: subtle starfield/grid to read as a sky-chart.
- **Core-stack emphasis = a MARK, not a light** (v2.0 D3 ×3 — the permanent
  breathing glow washed the logos out, worst on cream). A primary is a
  **"ringed planet"**: solid `--color-card-bg` ground under the logo, 1.5px
  ember border (`.orbit-disc--sun`), and a slow-spinning dashed **halo ring**
  (`.orbit-halo`). Luminance appears in exactly two moments: **hover**
  (light as a reward for intent) and a **one-time staggered ignition** pulse
  (`.orbit-ignite`, `--ignite-i`) the first time the field enters view — never
  ambient. The legend dot mirrors the ringed mark.
- Header via `ChapterHeading no="03" eyebrow="The Arsenal" title="Tools of the Trade." align="center"`.

## The Inventory — the switchable second view (desktop)
The orbit is the *moment*; the **Inventory** is the *manifest* — the same sky
committed to paper, for visitors who want to scan the toolkit fast (a
hire-decision read, not a wonder read).

- **View toggle** (`.arsenal-view`, top-right of the field): quiet two-glyph
  segmented control — sky-chart ⇄ inventory — with a framer `layoutId` sliding
  thumb. Labels are voiced (`arsenal.viewChart` / `arsenal.viewInventory`);
  choice persists in `localStorage('arsenal-view')`; fires
  `arsenal_view_switched`. Orbit stays the default for new visitors.
- **The Inventory** (`.arsenal-inv`): an editorial three-column index —
  numbered monospace group eyebrows (01 — Frontend…), serif category names,
  hairline-ruled rows (logo · full untruncated name · ember ✦ on primaries).
  Deliberately **non-interactive rows** — no hover response on non-clickable
  surfaces (W4). Same fixed field height as the orbit → zero page reflow.
- **The transition** (GSAP Flip; the logos are the shared elements):
  *fold* (orbit → inventory) = nodes fade, rings collapse into the core, the
  compass implodes, every glyph **flies to its row** (staggered), rules draw in
  left-to-right — "the sky committed to paper" (`chartFold` cue). *unfurl*
  (inventory → orbit) plays the mirror: rows retreat, rings redraw outward, the
  compass blooms, glyphs fly back to orbit (`chartUnfurl` cue). Both views stay
  mounted only for the flight; CSS-transition "gate" classes
  (`.is-departing`/`.is-arriving`) stop per-node transitions fighting the
  timeline. Reduced-motion never sees any of this (clusters fallback).
- The legend line swaps meaning with the view (`arsenal.coreLegend` ⇄
  `arsenal.inventoryLegend`), crossfading via `AnimatePresence`.
- The orbit's ambience hum is **sky-chart-only** — the inventory is a quiet page.

## Content (from `constants.skillCategories` + `technologies`)
- `skillCategories`: `{ category, blurb, skills:[{ name, tier? }] }` —
  `tier:'primary'` marks core. **No `level`.** This is the single source.
- `technologies`: `{ name, icon }` for nodes that have real logos.
- Keep the two in sync (a primary skill should have a logo where possible).

## Accessibility / performance
- Provide a non-orbital, fully readable grouped list as the baseline DOM (orbit
  is a progressive enhancement layered on top) → screen-reader & keyboard safe.
- Orbit math is transform-only; cap node count; pause off-screen
  (IntersectionObserver). Reduced-motion → static clusters.

## Acceptance criteria
- [ ] Zero duplication: skills appear once, in one cohesive field.
- [ ] No percentages/bars; primary stack visually emphasized.
- [ ] Primary logos sit on clean ground — no ambient glow washing them out.
- [ ] Hover reveals label + constellation links; feels alive, not busy.
- [ ] Orbit ⇄ inventory flip is one continuous motion (glyphs fly, nothing
      pops); the page never reflows; the preference persists.
- [ ] Mobile/reduced-motion grouped-cluster fallback is clean and readable.
- [ ] 60fps; pauses when off-screen; dark+light correct.
