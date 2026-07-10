# Assets — The Chronicle ("World Bible" + prompts)

Runtime art lives at the **`public/` root** and is referenced by absolute path;
optional art is probed and degrades gracefully
(see [ARCHITECTURE](ARCHITECTURE.md#6-asset-pipeline)). Prefer **WebP q≈80**,
keep files lean. **`public/` ships as-is — production assets only.** Brand
**source/archive** art (master crests, old icon sets, retired hero skies) lives
in **`/branding/`** (out of `public/`, not deployed). The favicon/og pipeline is
in **`/tools/og-image/`**.

---

## 0. The World Bible — prepend to EVERY generation/edit prompt

> **Scene:** one continuous cinematic pre-dawn fantasy frontier, viewed
> ultra-wide at eye level. **Horizon is low, ~65% down the frame. Single light
> source: a warm ember-gold dawn sun, LOW on the RIGHT, just above the
> horizon.** Everything is lit warm from the right; shadows fall left; the far
> left sinks into deep cool darkness. **Atmospheric haze increases with
> distance.** Painterly, serene, epic, film-still quality with fine grain.
> **Exact palette:** ink-navy `#0B0F1A` (left & top) → indigo `#1B2440` (mid
> sky) → warm ember `#E8965A` & old-gold `#D9A441` (glow at the right horizon
> only). Land = cool indigo-grey silhouettes `#2A3450` with a thin warm ember
> rim-light on right-facing edges only. **No bright white snow, no high-key
> areas, no text, no logos, no watermark, no people** (except the portrait).
> **Composition law:** the **LEFT third stays dark, simple, empty** (large
> headline text sits there); detail + light concentrate on the **RIGHT** (light
> source + the figure stands there).

Consistency anchors to repeat across layers: same sun position (low-right), same
horizon (~65% down), same palette hexes, haze-with-distance, dark-empty-left.

---

## 1. Hero (chapter 00) — **no art (fully procedural)**

The hero is the **Astrolabe Title Sequence** (see
[sections/00-hero.md](sections/00-hero.md)) and needs **zero image assets**:

- **Backdrop:** a pure-CSS starfield — radial ink gradient
  (`#1B2440 → #0E1426 → #0B0F1A`, bottoming out at the page color for a seamless
  hand-off) + ~70 procedurally placed stars with a subtle desynced twinkle
  (`star-twinkle`, reduced-motion safe). Light theme uses a dawn radial gradient.
- **Instrument:** the astrolabe is drawn in **Canvas2D from theme tokens**.

> An image backdrop was trialed and **dropped** — the no-image version is
> cleaner and makes the glowing instrument the focal point. The generated sky
> variants are archived in `/branding/hero-sky/` (not deployed) in case we
> revisit; the old layered-photo concept (`portrait/hero-mid/fog/fore`) is long
> gone.

---

## 2. Realms (chapter 04) — project cover art

Each realm (project) shows **real product screenshots** from
`public/realms/<slug>/…` — when a project is themed, per-theme subfolders
`…/<slug>/light/` and `…/<slug>/dark/` are swapped by `Works.jsx`. An *optional*
cinematic cover (`/chronicle/realms/<slug>.webp`) is probed for the plate visual
and **falls back to a serif monogram on a gradient** when absent (the current
state). The cover prompt below is for if/when we add bespoke cover art.

| File | Dim | Format |
|---|---|---|
| `realms/<slug>/<screenshot>.png` | as captured | product screenshots (shipped) |
| `chronicle/realms/<slug>.webp` *(optional)* | 1600×1200 (4:3) | cinematic cover, probed |
| `voices/<dark\|light>/<id>.webp` *(optional)* | **1440×1440, exactly square (1:1)**, WebP ~85% | Voice Hall / mobile **preview-panel portrait** (V5) — a **pre-rendered plate** (frame + monogram + portrait all baked in), rendered **directly** (no `FaceParticles`, no extra frame); monogram fallback if absent |

Slugs match `constants` projects (e.g. `gajaakriti`, `royal-tiles`, …). Voice
`<id>`s match the registry ([voices.js](../../src/i18n/voices.js)): `scott`,
`dwight`, `got`, `avengers`, `yoda`, `chandler`, … (open voices `chronicle` /
`plain` don't need one — the panel shows their monogram; sealed voices keep the
wax-lock until unlocked). Ship **two theme variants** — `voices/dark/<id>.webp`
and `voices/light/<id>.webp` — each pre-graded to sit on that theme's panel; the
preview picks the folder from the resolved theme. The image is the finished art
(its own ornate frame), so it renders as-is via [VoicePreviewCard](../../src/components/VoicePreviewCard.jsx).

**Dimensions / grading (perfect on all screens):** author at **1440×1440, exactly
1:1** (min 1024²; ~1180–1460px is the largest real render — a big phone at DPR 3 /
small tablet at DPR 2 — desktop maxes at only ~276px CSS). Keep the frame/monogram
a few % inside the edges. **Bake the background to match the panel** so edges blend
seamlessly: dark → deep near-black/navy; light → the light theme's cream card tone.

**Prompt template** (prepend World Bible):
> "A cinematic, painterly cover illustration representing **<one-line project
> essence>** as a *realm* in the Chronicle world — e.g. <domain metaphor>.
> Indigo-and-ember palette, warm light from the right, atmospheric depth, subtle
> cartographic/parchment texture. Evocative and abstract, NOT a UI screenshot,
> no text, no logos. 1600×1200."

Examples for the metaphor slot:
- Advisor Portfolio (finance viz): "a constellation of glowing data-ridges /
  charted financial peaks under dawn light".
- Gajaakriti (wedding media): "a warm, ornate golden-hour pavilion of light and
  silk, cinematic bokeh".
- Royal Tiles (tile visualizer): "an intricate geometric mosaic floor receding
  into mist, tiles catching ember light".
- Digital Investor: "a luminous market galaxy, indigo currents threaded with
  gold".

(If covers are absent, the plate falls back to a serif monogram on a gradient —
already handled.)

---

## 3. Map overlay (⌘K) — `map/`

| File | Dim | Format | Notes |
|---|---|---|---|
| `map/realm-map.webp` | 2400×1500 | opaque | Hand-drawn fantasy/cartographer map of the "realms"; aged parchment in light, ink-blue vellum in dark; space for ~6 glowing pins. Subtle, low-contrast so pins/labels read on top. |

**Prompt** (prepend World Bible, relax the "no-land" rules — this IS a map):
> "An aged hand-drawn fantasy cartographer's map — coastlines, mountains,
> forests, a winding route line, compass rose in a corner, faint grid. Ink linework
> on parchment, muted indigo + ember + gold, weathered edges, painterly. Leave
> open regions for ~6 location pins. No real place names, no modern text. 2400×1500."

---

## 4. Brand / icon system — `public/` root + `/tools/og-image/`

The brand mark is an **"MU" cartographer crest** (compass-star monogram). Two
grounded variants ship for in-app theme use; a circular "M" badge is the favicon
source. **Production files (in `public/`):**

| File | Purpose |
|---|---|
| `logo-light.png` / `logo-dark.png` | Full MU crest (cream / navy ground). SideRail sigil swaps per theme. |
| `favicon.ico` (16/32/48) · `favicon-16x16.png` · `favicon-32x32.png` | Browser favicons |
| `apple-touch-icon.png` (180) · `android-chrome-192x192.png` · `android-chrome-512x512.png` | PWA / mobile (navy tiles, maskable) |
| `og-image.png` (1200×630) | Open Graph / Twitter share card |

The favicon family is derived from the circular badge; `og-image.png` is rendered
from an HTML template via headless Chrome. **Regeneration steps + the template
live in [`/tools/og-image/`](../../tools/og-image/).** Master/source art and the
previous (v1) icon set are archived in **`/branding/`** (not deployed).

---

## 5b. Sound assets (`public/sounds/`)

| File | Status | Role |
|---|---|---|
| `sounds/raven.mp3` | **shipped** | One-shot raven sample (Contact send). Degrades to synth wingbeats if absent. |
| `sounds/astrolabe.mp3` | **optional** (CONFIG ref, synth fallback in use) | Hero bed loop. Path defined in `CONFIG.beds.hero.sample`. |
| `sounds/arsenal.mp3` | **optional** (CONFIG ref, synth fallback in use) | Arsenal bed loop. Path defined in `CONFIG.beds.arsenal.sample`. |

The remaining beds (`lens`, `orbit`, `reel`) and all one-shot cues are synthesized
(0 bytes). Paths are configurable in `lib/sound.js` → `CONFIG`. Never block on an
absent sample — the synth fallback is production-quality.

---

## 5c. Time Machine archive posters (`public/archive/`)

| File | Dim | Notes |
|---|---|---|
| `archive/<id>.webp` (e.g. `2023.webp`, `2019.webp`) | free | Era poster shown while the live iframe loads, or as the primary visual when `framable: false`. Probed; falls back to a typographic era card. |

Slugs match `constants.archive[].id`. Add one poster per archived portfolio.

---

## 6. Housekeeping

`public/` ships as-is — keep it to **production assets only** (favicon family,
`og-image.png`, `logo-{light,dark}.png`, `site.webmanifest`, `robots.txt`,
`sitemap.xml`, `resume.pdf`, `realms/…`, `sounds/…`, `archive/…`). Move
source/archive/experiments to `/branding/`; remove generation leftovers
(`*-Edited.png`, oversized `*.png`, `Gemini_Generated_*`, `* copy`, `.DS_Store`).
Every stray file in `public/` ships to prod and counts against the perf budget.
