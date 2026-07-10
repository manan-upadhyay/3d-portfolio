# Section 11 — The Time Machine (`/time-machine`)

**Route:** `pages/TimeMachine.jsx` → `sections/TimeMachine.jsx` · **id spine:**
`era-2026` (threshold) → one `era-<year>` per archived portfolio → `era-origin`
(the floor) · **Status:** 🟢 building (owner-greenlit 2026-07-10).

> The full decision record + "should we" lives in
> [TIME-MACHINE-PROPOSAL.md](../TIME-MACHINE-PROPOSAL.md). This is the **build
> spec** — the locked design + the data/copy/interaction contract. Read the
> proposal first, then this.

## Purpose
A cinematic, off-spine coda that showcases Manan's **earlier portfolios** (2023,
2019) as *preserved ruins* — clearly old, unmaintained, framed as **growth, not
padding**. It is a **time** feature, not a projects feature: it must never read
like The Realms' client plates (see the contrast table in
[the proposal §1](../TIME-MACHINE-PROPOSAL.md#1-the-core-principle--this-is-a-time-feature-not-a-projects-feature)).

## Locked decisions (owner, 2026-07-10)
- **Placement:** its own route `/time-machine` (the `/making-of` sibling
  pattern). Reached from a doorway on the Chronicle rail, the Atelier rail, and
  the footer.
- **Concept spine:** **STRATA** — you *descend* through time; scrolling down digs
  **back**, not forward.
- **Embed:** **progressive** — a preserved poster by default, which *wakes* into
  the live site on intent; a real `↗` link always opens the deploy in a new tab.
  Both legacy deploys were verified framable (no `X-Frame-Options`/CSP) on
  2026-07-10.
- **Scalable archive** — the era list is data-driven (`constants.archive`); a
  future 2028 rebuild slots in with one entry. **Never hard-code two.**
- **Full four-phase build.**
- **Fill the page / sell the time travel (owner):** with only two portfolios the
  page must not feel empty. Each era carries **period context** — a small "the
  world then" band (tech landscape, world/cultural markers, what Manan was doing)
  — and **the whole page ages as you scroll**: colors, cards, type, and grade all
  regress toward the past. Owner will supply era **assets** (posters, period
  imagery, optional sounds); the data shape accepts them, art is never required
  to build (graceful fallback per CLAUDE.md §4.7).

## The STRATA mechanic (the signature)
A single **fixed grade overlay** + a small set of interpolated CSS variables driven
by one scroll-progress value `--age` (0 = present/top → 1 = deepest past/bottom):

- `--age` rises as you descend. It drives a fixed, `pointer-events:none` grade
  layer: **sepia + desaturation + vignette + film grain** all increase with age.
- The **container ages**, not just the content: card radius, border weight, shadow
  softness, and body type shift per-era toward an older, flatter, more
  skeuomorphic feel the deeper you go. This is the awwwards moment — nothing else
  on the site makes the *wrapper* time-travel.
- A **fixed year readout** ticks **backwards** (2026 → 2023 → 2019 → origin) as
  strata pass, so the descent is legible as *time*.
- Implementation: `--age` is written from a throttled scroll read (Lenis-driven);
  only `transform`/`opacity` animate on content, and the grade is a CSS
  `filter`/overlay on ONE fixed layer — never per-frame JS on the content
  (CLAUDE.md §4.4, §4.6). `prefers-reduced-motion` → no scrub/grain animation;
  strata become a static, clearly-dated stacked list, still fully honest.

## Anatomy (top → bottom)
```
[ THRESHOLD · 2026 ]   "You are about to leave the present." Sets up the descent.
      ↓ (grade begins to age)
[ STRATUM · 2023 ]     EraExhibit (poster→live, plaque, stack, ↗) + "the world then"
      ↓
[ STRATUM · 2019 ]     EraExhibit … (older grade, older chrome)
      ↓
[ THE FLOOR · origin ] "Before the map." Where the trail goes dark + return-to-now.
```

### EraExhibit (per era) — `components/EraExhibit.jsx`
- **Preserved poster** by default (art-directed ruin: our own grade, never the
  live JS). A deliberate **"Wake the ruin"** action swaps in the live `<iframe>`
  (only when `framable`) with a short boot beat; the primary CTA **"Enter the
  ruin ↗"** always opens the real URL in a new tab.
- **Brass plaque:** era + honest one-liner + status (`ARCHIVED`) + gravestone
  dates ("Built 2019 · Last touched 2020 · Preserved 2026").
- **Built-with** runes (era stack). No wax seals, no "Realm 0X" — different verbs,
  different chrome, sepia grade.
- Resilient: poster probes + serif-monogram fallback; iframe wrapped so a dead
  deploy degrades to the poster + link, never a white screen.

### "The world then" (period context band)
Per era, a compact set of factual markers (tech/world/cultural + "what Manan was
doing"). Factual substance — like [`marginalia`](../DESIGN-SYSTEM.md) — stays
**literal across every voice** (authored once in `chronicle`, voices don't
override the arrays, so the array-replace footgun never fires). Only the era
*framing* (title, intro, plaque verbs, CTAs) is re-voiced per personality.

## Data & copy contract
- **Data** (`constants.archive`, scalable, ordered present→past): `id`, `year`,
  `url`, `poster`, `builtWith[]`, `framable`, `dates {built, lastTouched}`, and
  optional `assets {}` for owner-supplied period imagery/sound. `eraActs` derives
  the rail. Non-copy only.
- **Copy** (`timeMachine.*` in the bundles): `title`, `intro`, `threshold.*`,
  `floor.*`, per-era `eras.<id>.{plaque, note, context[]}`, and controls
  (`wake`, `enter`, `live`, `sleep`). Authored in **all ten voices** — full in
  `chronicle`/`plain`, character framing overrides in the eight sealed voices,
  factual `context[]` left to fall back to `chronicle` (CLAUDE.md §4.2).
- **Sound:** one new synthesized `rewind` cue (`sound.js`) — intent-gated (the
  wake/era-cross action), never on passive scroll (TACTILE §0).

## Phasing (tracks the proposal §9)
1. **Exhibit** — `EraExhibit` (poster + plaque + link-out), static, voiced,
   dark+light, reduced-motion. Ship-able alone.
2. **Descent** — STRATA scroll choreography: backward year readout, `--age`
   grade, container-ages-with-you.
3. **Alive on intent** — progressive live-embed + boot beat + `rewind` cue.
4. **Doorway + reach** — the astrolabe/dial rewind entry + analytics
   (`time_machine_enter`, `era_wake`, `era_open`) feeding a keep/cut read.

## Definition of done
Matches this spec; responsive 360/768/1280/1920; dark+light; reduced-motion +
touch correct; both deploys open in a new tab; poster fallback verified; no
console errors; `npm run build` clean; and it reads as a *descent through time* —
a moment, not a list.
