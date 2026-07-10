# Design System — The Chronicle

The visual & motion language. **Every component must consume these tokens**, not
raw values. Tokens are defined in [`src/index.css`](../../src/index.css) and
[`tailwind.config.js`](../../tailwind.config.js).

> [!NOTE]
> **The tokens and motion language below are stable through v1.1.** What v1.1
> changes is *how much* of them we deploy at once — a restraint pass. See the
> addendum immediately below and the [V1.1 Release Plan](V1.1-RELEASE-PLAN.md).

---

## 0. v1.1 addendum — the restraint pass

Beta 1 said the design is memorable but **over-signals AI, overloads the reader,
and feels congested**. The tokens are not the problem; the *density* is. v1.1
applies a **premium restraint pass** across the default path. Rationale + evidence:
[V1.1 Release Plan §2, §4-A](V1.1-RELEASE-PLAN.md) and
[feedback §5, §10](reports/feedback/2026-07-01-reddit-beta-feedback.md).

**Remove the "vibe-coded" visual tells** (repeatedly named by testers, present in
the codebase — the highest-value design changes):

- **Uppercase "eyebrow" headings** (`chapter-eyebrow` / `ChapterHeading`, e.g.
  "CHAPTER 01 · THE CRAFT") are the #1 AI tell. Redesign: drop chapter numbering
  or move to a quiet normal-case inline label, lighter weight.
- **Pill / chip uniformity** (contact inquiry chips, Arsenal skill badges, project
  tags) reads as generated UI. Break the uniformity — don't ship one rounded-pill
  treatment everywhere.
- **Uniform section density.** Every section currently carries the same polish
  level; humans are uneven. Deliberately make some sections calmer/simpler.

**Raise breathing room and hierarchy:**

- Increase whitespace and section margins; fewer cards per view; one strong
  visual moment per section rather than many competing details.
- Design layouts for a copy budget **50–70% smaller** (copy lives in i18n
  bundles; the layout must be built for the shorter budget — release plan §4-A).
- Add an above-the-fold **proof strip** to the hero (years · stack · shipped ·
  role) using existing tokens — muted, mono, low-key.

**Input & motion restraint:**

- **Custom cursor** (`Cursor.jsx`): simplify (smaller, one color, animate only on
  meaningful hover) or default-off; must be disabled on touch / reduced-motion —
  verify.
- Trim first-visit decorative motion; keep motion that communicates state or
  reveals content, cut motion that only impresses.
- **Mobile:** collapse the floating control cluster into one labelled menu; tap
  targets ≥ 44px; more letter-spacing/line-height on decorative headings at
  narrow widths.

**Controls must be legible:** label every persistent control (Map/Theme/Sound/
Voice). The `SkyControl` theme switcher (309 interactions in Beta 1) is the model
for discoverability — the Voice control (33) should borrow its affordance.

> Guardrail for the whole pass: **remove 30–50% of default-path decorative
> detail; keep the secrets for explorers.** Restraint is the senior-taste signal.

---

## 1. Color tokens

All color is a CSS variable, re-mapped per theme by the `.dark` / `.light` class
on `<html>` (managed by `useThemeStore`). **Never hardcode hex in a component**
(only allowed inside a generated-art procedural fallback).

### Sky modes (Phase 3 — time-aware) — 5 modes over 4 palettes

The theme is a **5-mode "sky"** (`useThemeStore.mode`): `auto` (default,
time-driven) plus four manual palettes — **`dawn` · `day` · `dusk` · `night`**.
Each palette sits on a **light or dark base** (`dawn`/`day` → light, `dusk`/`night`
→ dark); `<html>` carries both the base class (`light`/`dark`) **and**
`data-sky="<mode>"`. The base class still drives every existing `.light`/`.dark`
selector; `data-sky` only layers a warm time-of-day **tint** on top.

- **Day** = the bare `:root` (full warm parchment). **Night** = the bare `.dark`
  (deep ink + starfield). These are the two original themes, unchanged.
- **Dawn** (`.light[data-sky='dawn']`) = a rosy-peach tint of the light base.
  **Dusk** (`.dark[data-sky='dusk']`) = an embered-violet tint of the dark base.
  Each overrides only ground/glow tokens (`--color-primary`, `--color-tertiary`,
  `--color-ember`, gradients, hero backdrop) — **text tokens stay inherited from
  the base so AA contrast is preserved**.
- `auto` resolves to one of the four from the visitor's **real local sky** via
  `src/lib/sky.js` (SunCalc + timezone→coords; no geolocation prompt). The
  sun/moon toggle (`DayNightToggle`) flips the base while preserving the warmth
  tier (dawn↔dusk, day↔night) and commits to a manual mode. `resolvedTheme`
  (`light`/`dark`) remains a derived alias so every `isDark` consumer is unchanged.
- **Hero backdrop tokens:** `--hero-backdrop` (radial gradient) + `--hero-scrim-rgb`
  are defined per sky so the hero's procedural backdrop/scrim shift with the
  palette without any per-mode branching in the component.

The control is **`SkyControl`** (top-right): the existing sun/moon button + a
5-row mode menu (Auto/Dawn/Day/Dusk/Night) whose trigger pill doubles as a live
sky status chip. Copy lives under the i18n `sky.*` keys (mode names).

### Semantic tokens (use these)

| Token | Dark ("Starlit Realm") | Light ("Dawn over the Realm") | Use for |
|---|---|---|---|
| `--color-primary` | `#0B0F1A` | `#F5F0E6` | Page background |
| `--color-primary-dark` | `#060911` | `#ECE4D4` | Deeper wells, footers |
| `--color-tertiary` | `#161D2E` | `#E2D8C4` | Raised surfaces |
| `--color-text` | `#ECE7DB` | `#1F1B16` | Primary text / headings |
| `--color-text-muted` | `#9AA3B5` | `#5C5345` | Body / secondary text |
| `--color-accent` | `#818CF8` (arcane indigo) | `#4F46E5` | Links, focus, primary actions |
| `--color-ember` | `#E8965A` | `#D9772E` | **Signature warm accent** — eyebrows, highlights, route lines |
| `--color-gold` | `#D9A441` | `#B88A2E` | Secondary warm accent, waypoints, seals |
| `--color-parchment` | `#E7DECF` | `#F5F0E6` | Story/quote text on dark, card backs on light |
| `--color-card-bg` | `rgba(20,27,44,.8)` | `rgba(255,252,245,.85)` | Glass/realm card fill |
| `--color-card-border` | `rgba(129,140,248,.15)` | `rgba(120,95,60,.18)` | Hairlines, card borders |

RGB triplets for `rgba()`: `--color-accent-rgb`, `--color-ember-rgb`,
`--color-gold-rgb`.

### Gradients & shadows

- `--gradient-accent` — indigo, for primary buttons/fills.
- `--gradient-map-line` — `transparent → ember → gold → transparent`. The
  cartographer "route" motif; used in dividers, eyebrows, rails.
- `--shadow-card`, `--shadow-glow` — elevation + glow.

### Color usage law

- **Ember is the protagonist accent.** Indigo (`--color-accent`) is the
  "system/UI" accent (links, focus, primary CTA). Use ember for *story* accents
  (chapter eyebrows, italic taglines, waypoints, hovers, route lines).
- Warm (ember/gold) + cool (indigo) must stay balanced — warm leads, indigo
  supports. Never introduce a third hue family without adding a token.

---

## 2. Typography

Three families, loaded in `index.css`, mapped in Tailwind `fontFamily`:

| Family | Tailwind | Role |
|---|---|---|
| **Cormorant Garamond** (serif) | `font-chronicle` | Hero/section display titles, italic story accents, project names, pull-quotes. The literary voice. |
| **Plus Jakarta Sans** | `font-display` | Small UI headers, labels, buttons. |
| **Inter** | default `font-sans` | Body, paragraphs, meta. |
| mono (system) | `font-mono` | Chapter numbers, kbd, coordinates, technical tags. |

**Scale (use `clamp()` for fluidity):**

- Hero name: `clamp(56px,12vw,150px)`, `font-chronicle`, `leading-[0.86]`.
- Section title (`ChapterHeading`): `clamp(40px,7vw,76px)`, `font-chronicle`.
- Subsection: `text-[26px–30px] font-chronicle`.
- Body: `15–17px`, `leading-[27–30px]`, `font-sans`.
- Eyebrow/label: `12px`, `tracking-[0.3em]`, `uppercase`, `font-display`.
- Micro / numbers: `10–11px`, `font-mono`.

**Rules:** big titles are always `font-chronicle`. Italic Cormorant = the
"narration" voice (taglines, quotes), always in `--color-ember`. Body stays
Inter for legibility. Never set display type in Inter.

---

## 3. Layout & spacing

- Content width: `max-w-7xl mx-auto`. Side padding: `px-6 sm:px-12` (or
  `sm:px-16` for text-dense sections).
- Section rhythm: vertical padding `py-24 sm:py-32`; full-bleed cinematic
  sections use `h-screen`/`min-h-screen`. Use `SectionWrapper` for standard
  padded sections.
- Radius: cards `rounded-2xl` (20px) / `rounded-3xl`; pills `rounded-full`.
- Breakpoints (Tailwind + custom `xs:450px`): design & test at **360, 768,
  1280, 1920**.

---

## 4. Motion language

The site is *directed*. Motion is intentional, weighty, never decorative jitter.

### Engines (when to use which)

- **GSAP + ScrollTrigger** → anything tied to scroll position: pinning, scrub,
  parallax-out, horizontal sections, draw-on lines. Setup inside
  `gsap.context(scopeRef)` + `ctx.revert()` cleanup.
- **Framer Motion** → discrete UI: enter/exit (`AnimatePresence`), hover/tap,
  spring toggles, layout. Use `whileInView` for simple one-shot reveals.
- **Lenis** → global smooth scroll (already wired). Use `scrollToSection(id)` /
  `scrollToTop()` from `src/lib/smoothScroll.js` for programmatic scrolls.
- **rAF + DOM** → ultra-hot per-frame visuals with no React state (cursor,
  hero mouse-parallax). Always cancel on cleanup.

### Tuning constants (keep consistent)

- Easings: GSAP enters `power3.out`; scrub `ease:'none'`; nav/reveal cubic
  `(0.22, 1, 0.36, 1)`; springs (Framer) `stiffness 300–600 / damping 18–30`.
- Durations: micro-interaction `0.2–0.3s`; element enter `0.6–0.9s`; hero/intro
  layered `~1.6s`; stagger `0.06–0.12s`.
- Parallax travel is **clamped & eased** (lerp factor `0.05–0.18`) so it never
  feels twitchy or reveals layer edges.

### Principles

1. **Reveal on arrival, settle, rest.** No infinitely-looping distractions near
   text. Ambient loops (hero starfield twinkle, aurora drift, orbit ring) are
   subtle, slow, and far from copy.
2. **One hero motion per section** — a single memorable mechanic (pin-scrub,
   orbit, plate-reveal), not five competing ones.
3. **Reduced-motion** → replace scrubbed/parallax motion with a static or simple
   fade. **Touch / coarse pointer** → disable mouse-parallax & custom cursor.
4. Animate **`transform` + `opacity` only**. No animating layout/box props.

---

## 4c. Sound language (Phase 4)

The audio counterpart to the motion language. Engine + API: ARCHITECTURE §4b.

### Principles
1. **Sound rewards intent, never accompanies motion.** Cues fire on *decisions*
   (toggle the theme/voice, send the raven, open the map, hover a skill, hit an
   error) — never on scroll or passive animation. There is **no background-music
   bed**.
2. **Sparse, short, warm.** One-shot cues are brief (≤~0.6s), **gentle**, low-gain,
   on-palette (rounded shapes, soft filtered noise — never harsh). A master limiter
   glues overlaps. A cue that lands *out of sync* with its visual reads worse than
   none — e.g. the `theme` swoosh is length-matched to the theme wipe.
3. **Five beds**, each *spatial* with natural **distance falloff** (level driven by
   scroll proximity or interaction focus, fading in/out with the section): the
   **Hero `watch`** (slow revolving-gear astrolabe), the **Arsenal `hum`** (spacey
   drone ambience), the **FaceParticles `lens`** (magic-lantern hover buzz), the
   **Observatory `orbit`** (constellation hover), and the **BuildReel `reel`**
   (film-transport whir, velocity-driven). Each plays an **optional looping mp3**
   if provided (`CONFIG.beds.*.sample`), else a synthesized fallback; the distance
   fade works either way. All tear down fully at zero.
4. **Default-on, silent until the first gesture** (browser law); **auto-muted
   under `prefers-reduced-motion`**; one master mute+volume control; preference
   persisted. **Sound only plays while the page is in view** — the context
   suspends on tab/window switch (visibility + focus) and resumes on return.
5. **All tunables live in `CONFIG`** at the top of `lib/sound.js` — cue `peak`
   (loudness) / `dur`, bed `peak`, and the optional sample paths. A human tweaks
   sounds there; no need to touch the synthesis.

### Cue vocabulary
| Cue | Where | Character |
|---|---|---|
| `theme` | DayNightToggle | a single gentle warm "wipe" of air (no chime), length-synced to the reveal |
| `glitch` | voice change (switcher + easter eggs) | soft "decode" chatter that thins to a resolve tone; pairs with the text scramble |
| `error` | Contact submit (validation/instant) | short low descending "denied" buzz |
| `mapOpen`/`mapClose` | Chronicle (⌘K map) | gentle rising / falling whoosh (no chime) |
| `raven` | Contact send | mp3 sample → else synth wingbeats + caw |
| `blip` | Tech hover | tiny pluck; pitch steps an arpeggio across the orbit |
| `chartSwap` | Arsenal orbit⇄inventory toggle | cascading fold/unfurl with a landing thunk |
| `detent` | BuildReel sprocket | sharp mechanical click per frame crossed |
| `settle` | BuildReel playhead landing | low thunk when the reel snaps to a frame |
| `click` | physical prev/next key | bright press + soft release |
| `hoverNote` | Observatory analytics chip hover | pitched pluck (octave doubling for airiness) |
| `rewind` | Time Machine era crossing | descending "winding back" motif |
| `pageflip` | Time Tunnel year/event transition | soft page-turn flutter |
| `assembleSwell` | FaceParticles portrait assembly | granular rush of ticks converging |
| `volumeTick` | VolumeDial drag | pitched tick that rises with level |
| `hum` (bed) | Arsenal | spacey drone — mp3 loop or synth fallback, proximity-faded |
| `watch` (bed) | Hero | slow revolving-gear astrolabe — mp3 loop or synth fallback, scroll-faded |
| `lens` (bed) | FaceParticles | magic-lantern hover buzz (synth only) |
| `orbit` (bed) | Observatory | constellation hover buzz (synth only, soft undertone) |
| `reel` (bed) | BuildReel | film-transport whir (synth only, velocity-driven) |

### Voice-change scramble (visual)
On every voice switch the copy swaps synchronously; `VoiceTransition` (mounted in
Layout) then **decodes the new wording in**: every visible text element scrambles
through random glyphs and resolves to the new voice (the "Scrambled Text" effect),
paired with the soft `glitch` decode sound. **Content-level, per-text — no
full-screen overlay.** Implemented in `lib/voiceScramble.js` (a DOM `TreeWalker`
mutates visible text-node values, then restores the exact target so React stays
consistent); skipped under reduced-motion. Both voice paths fire it via
`lib/voiceChange.js` (the voice store calls `fireVoiceChange()` after a switch).

---

## 5a. Button / CTA language (two, and only two)

Every CTA in the app speaks one of two button languages. Don't invent a third;
don't hand-roll accent fills on buttons — reach for one of these so contrast
stays correct in **all** themes (light/dawn + dark/dusk).

1. **Neutral primary — `.btn-primary`.** The default for real actions (Hero
   "Let's be friends", Contact submit). A high-contrast pill that **inverts per
   theme** via `--btn-bg` / `--btn-fg` (near-black pill + cream text on light;
   cream pill + ink text on dark). Always AA. Use this unless the button is meant
   to feel "special / story".

2. **Accent CTA — the warm gradient button** (e.g. the Voice Hall **summon**
   `.voice-summon__send`). Driven by `--cta-accent-bg` / `--cta-accent-fg`, which
   are **theme-aware for contrast**:
   - **Light/dawn:** the accent gradient is mid-tone, so white text would fail AA
     — the token instead uses a **deepened burnt-ember** gradient with **white**
     text (~4.6:1).
   - **Dark/dusk:** the bright ember→gold accent glows on the dark panel, so the
     token uses the bright gradient with **dark ink** (the luminous-pill look).

   The contrast law: a vibrant ember/amber gradient gives dark ink ~5–6:1 but
   white only ~3:1. So **never put white on the bright accent gradient** — either
   deepen the surface (light) or use dark ink (dark). Both directions live in the
   `--cta-accent-*` tokens, so new accent CTAs just read those two vars.

Text links / quiet actions (Hero "Call me", `.link-hover`) and accent-tinted
secondary buttons (`.voice-hall-cta` — ember text on a faint ember wash) are not
"CTAs" in this sense and keep their own treatment. Badges (`.wax-seal--*`) are
labels, not buttons.

## 5. CSS utility classes (in `index.css`)

Reuse these; add to this list when you create a new shared visual.

| Class | Purpose |
|---|---|
| `.font-chronicle` | Cormorant serif |
| `.ember-text-gradient` / `.accent-text-gradient` | Gradient text fills |
| `.chapter-eyebrow` | Uppercase ember eyebrow with leading route-tick |
| `.map-line` | Ember→gold "route" rule (dividers/underlines) |
| `.ink-stroke` | Subtle hairline divider |
| `.wax-seal`, `.wax-seal--featured`, `.wax-seal--nda` | Seal-style badges |
| `.realm-card` | Standard glass card w/ ember hover (cards everywhere) |
| `.cinematic-vignette` | Edge/seam mask + bottom fade for full-bleed art |
| `.cursor-dot/.cursor-ring/.cursor-backlight` | Custom cursor parts |
| `.btn-primary` | Neutral primary CTA — theme-inverting pill (`--btn-bg`/`--btn-fg`). See §5a |
| `.voice-summon__send` | Accent gradient CTA — contrast-aware (`--cta-accent-*`). See §5a |
| `.status-dot` | Pulsing "available" dot |
| `.glass-card`, `.link-hover` | Glass surface, underline-on-hover |
| `.marginalia`, `.marginalia__rune`, `.marginalia__note` | Footnote trigger (dotted underline + `†` rune) and its unfolding margin note |

Keyframes available: `scrollcue`, `herofog`, `aurora`, `sunrise`, `float`,
`pulse-glow`, `status-pulse`, `star-twinkle` (hero starfield), `orbit-cw` /
`orbit-ccw`, `spin-slow`, `skill-fill`. All looping keyframes are gated by
`prefers-reduced-motion`.

---

## 6. Iconography

- **lucide-react** for UI glyphs (e.g. `X`, `ArrowUpRight`, `MapPin`,
  `FileText`). Sized `14–22px`, colored via `style={{ color: 'var(--color-ember)' }}`
  or `currentColor`. **No emoji in production UI.**
- **`CompassRose`** is the custom brand SVG (compass-star) — use it for the
  cartographer/navigation motif (astrolabe hub, SideRail map row, map overlay)
  instead of a generic compass glyph.
- Tech logos (React, Next, …) live in `src/assets/tech/` — use for the Arsenal.

---

## 7. Component inventory

### Canonical reusable widgets (`src/components/`, flat, barrel-exported)
`SideRail` (desktop chapter/act/era nav) · `MapOverlay` (⌘K map) · `Cursor` ·
`SkyControl` (top-right 5-mode sky menu) wrapping `DayNightToggle` (the sun/moon
base toggle) · `CompassRose` (brand SVG) · `ChapterHeading` (the one section header) ·
`MapDivider` · `CountUp` · `ScrollReveal` · `ErrorBoundary` · `Magnet` ·
`MobileMenu` (mobile bottom-sheet: nav + voice + sound + sky + clue unlock) ·
`StickyCta` (scroll-triggered contact CTA) ·
`Marginalia` + `Annotated` (flavor→substance footnotes; wrap copy with the
`[[id|phrase]]` marker, render via `<Annotated text={t('…')} />`, facts under
`marginalia.<id>` in `chronicle`) · `VoiceSwitcher` / `ControlCluster` /
`EasterEggListener` / `VoiceTransition` (the Voice system; `VoiceTransition` =
the per-text scramble + sound on voice change) · `VoiceHall` (⇧⌘V full picker) ·
`VoicePreviewCard` (voice detail card — Hall + mobile preview: pre-rendered portrait
plate + identity + sealed clue unlock) · `VoiceRequest` ("Summon a Voice" form —
posts through the raven endpoint) · `ClueUnlock` (touch-friendly sealed-voice
clue/answer field) · `Hovercard` (portalled info popover) ·
`SoundControl` (audio half of the cluster) · `VolumeDial` (Apple-style volume
slider) · `ThemeWheel` (5-mode sky picker for MobileMenu) ·
`ExpeditionRecap` / `FaceParticles` / `SunArc` / `PersonaTriptych` (Atelier off-map) ·
`Observatory` / `Blueprint` / `CodebaseAtlas` / `NdaSchematic` / `CommitGraph` (Atelier
Act II — the Engine) · `RavenBurst` / `RavenNotice` (Contact success celebration) ·
`TimeRail` / `TimeTunnel` / `EraExhibit` (Time Machine) · `Fog` (ambient fog layer).
Plus `SectionWrapper` (`src/hoc/`). Page chapters live in `src/sections/`.

### Removed (do not reintroduce)
The react-bits experiments (`SplitText`, `BlurText`, `TiltedCard`,
`SpotlightCard`, `GlitchText`, `FuzzyText`), `Feedbacks.jsx`, the Three.js
`components/canvas/*` + `Loader.jsx`, `Navbar`/`CommandPalette` (→ `SideRail` +
`MapOverlay`), `ThemeToggle`/`CustomCursor` (→ `DayNightToggle`/`Cursor`),
`hooks/useParallax.js`, `styles.js`, and `lib/utils.ts` — all deleted. Prefer
GSAP/Framer + our CSS utilities for any new motion.

---

## 8. Accessibility checklist (every section)

- Semantic `button`/`a`; `aria-label` on icon-only controls; visible focus.
- AA contrast on all headings in **both** themes (light parchment is the risk —
  verify ember/muted on cream).
- `prefers-reduced-motion`: static fallback path exists and is tested.
- Keyboard: nav, map overlay, and forms fully operable; `Esc` closes overlays.
- Respect `(hover:none)`: no custom cursor, no hover-only content.
