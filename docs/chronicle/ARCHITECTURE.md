# Architecture — The Chronicle

How the app is wired, the canonical patterns to copy, and how to verify work.

> [!NOTE]
> **This document describes the v1.0 architecture as built** — and it stays
> accurate: the wiring below is not changing in v1.1. For the *changes* v1.1
> layers on top of it, see the addendum immediately below and the
> [V1.1 Release Plan](V1.1-RELEASE-PLAN.md).

---

## 0. v1.1 addendum — engineering deltas

v1.1 ("The Restraint Pass") is a content/UX/perf revamp, **not** a re-architecture.
The stack, routing, stores, and folder map are unchanged. Engineering-facing work
concentrates in three areas — full detail in the
[combined action plan §7 (P0.5–P0.7), §9, §14](reports/synthesis/2026-07-01-combined-beta-action-plan.md):

- **Performance / leak audit (P0).** Beta 1 surfaced session-long degradation on a
  4K display. Re-verify the §3 cleanup contract on *every* effect: `gsap.context()`
  + `ctx.revert()`, cancel every `requestAnimationFrame`, remove every listener,
  kill every `ScrollTrigger`. Prime suspects: the pinned horizontal `Experience`,
  the hero canvas/astrolabe (`useAstrolabe`), and `FaceParticles`. **Cap canvas
  DPR at 2** (`Math.min(window.devicePixelRatio, 2)`) — 4K panels otherwise
  multiply per-frame cost. Profile a 3-minute session for heap/listener/detached-
  node growth as part of Verification.
- **Analytics instrumentation (P0).** Register PostHog super-properties *before*
  first capture (currently ~90% null device/browser), add `beta_round` /
  `tracking_version`, session heartbeats (15/30/60s), and the v1.1 event catalog.
  Instrument `/making-of` (`pages/MakingOf.jsx`) beyond pageview. See
  [ANALYTICS.md](ANALYTICS.md) and action plan §14.
- **Scroll tuning (P1).** Lower Lenis smoothing in
  `lib/smoothScroll.js`; use native scroll on mobile / reduced-motion; make the
  horizontal `Experience` timeline accept horizontal + keyboard input.
- **Security headers (done).** `vercel.json` now carries `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and
  `Strict-Transport-Security` alongside the SPA rewrite.

Nothing here adds a dependency or a WebGL/3D surface — the CLAUDE.md stack lock
still holds.

---

## 1. Folder map

```
src/
  App.jsx                 # Router: BrowserRouter → Layout wrapping FOUR routes
                          #   (/ = Chronicle, /making-of = Atelier, /time-machine = Time Machine, * = 404)
  main.jsx                # Entry (PostHog init, theme bootstrap, super-properties)
  index.css               # Theme tokens + global utilities + keyframes (SOURCE OF TRUTH for style)
  fonts.css               # Self-hosted font-face declarations (Cormorant, Plus Jakarta, Inter)
  constants/
    index.js              # ALL non-copy data: personalInfo, summon, chapters, services,
                          #   skillCategories, experiences, projects, stats, education,
                          #   archive, eraActs, timeTunnel, atelierActs
    commitHistory.js      # Generated commit graph data (prebuild script)
  store/
    useThemeStore.ts      # Zustand "sky" theme (auto+dawn/day/dusk/night) → <html> class + data-sky
    useVoiceStore.ts      # Zustand voice (i18next language) + unlocked sealed voices
    useSoundStore.ts      # Zustand sound prefs (enabled/volume/engaged) → drives lib/sound.js
    useCoachmark.ts       # Zustand coachmark coordinator (sound/voice hint one-at-a-time)
  lib/
    smoothScroll.js       # Lenis + GSAP ticker; scrollToSection/scrollToTop/rememberScroll/restoreScroll
    motion.js             # Framer Motion variants (staggerContainer, fadeIn, …)
    sky.js                # SunCalc time→sky resolver + timezone→coords (theme auto mode)
    sound.js              # Web-Audio engine: CONFIG, ~15 cues, 5 beds, samples
    voiceChange.js        # tiny emitter: voice store → VoiceTransition
    voiceScramble.js      # per-text "decode" scramble on voice change (DOM TreeWalker)
    analytics.js          # PostHog facade: track/trackOnce/registerContext/captureError/capturePageview
    astrolabe.js          # Canvas2D astrolabe renderer (hero + 404)
    visitor.js            # readVisitor — sync browser/GPU/screen snapshot (no network)
    sigil.js              # Device-hash "Traveler's Sigil" for ExpeditionRecap
    raven.js              # Resend contact-form client (shared by Contact + VoiceRequest)
    uiOverlay.js          # Overlay stack coordinator (pushOverlay/popOverlay)
    log.js                # Structured console logger (createLogger, greet)
  hooks/
    useActiveSection.js   # Scroll-spy → active chapter/act/era id (drives SideRail/MapOverlay)
    useAstrolabe.js       # Canvas2D astrolabe hook for the hero
    useEngagementAnalytics.js # section_view + scroll_depth tracking
    useExpedition.js      # Session scroll accumulator + useVisitStore (visit counter)
    useVisitor.js         # Cached readVisitor() hook (for ExpeditionRecap)
  hoc/SectionWrapper.jsx  # Standard padded <section> + stagger container
  i18n/
    index.js              # i18next init: chronicle+plain eager, sealed voices code-split
    voices.js             # Voice registry: 2 open + 8 sealed voices, categories, popover config
    bundles/              # Per-voice copy bundles (chronicle, plain, scott, dwight, cow,
                          #   got, deadpool, avengers, yoda, chandler)
  pages/                  # Route-level views (rendered through Layout's <Outlet/>)
    Chronicle.jsx         #   / — the scroll spine (Hero + chapters 00–05) + its chrome
    MakingOf.jsx          #   /making-of — return doorway + the lazy Atelier
    TimeMachine.jsx       #   /time-machine — the STRATA coda (descent through past portfolios)
    Void.jsx              #   * — cinematic 404 ("Off the Map")
  sections/               # Page chapters (00–05) + codas + index.js barrel
    Hero.jsx About.jsx Experience.jsx Tech.jsx Works.jsx Contact.jsx
    Atelier.jsx           # Making-of coda (acts: Build, Engine, Hidden, off-map)
    TimeMachine.jsx       # Time Machine coda (era cards + time tunnel transitions)
  components/             # Reusable widgets (flat) + index.js barrel:
                          #   Layout (shell), SideRail, MapOverlay, Cursor,
                          #   SkyControl(+DayNightToggle), CompassRose, ChapterHeading,
                          #   MapDivider, CountUp, ScrollReveal, ErrorBoundary,
                          #   ControlCluster(=VoiceSwitcher + SoundControl), Magnet,
                          #   MobileMenu (bottom-sheet on md:down), StickyCta,
                          #   VoiceHall, VoiceSwitcher, VoicePreviewCard, VoiceRequest,
                          #   VoiceTransition, ClueUnlock, Hovercard,
                          #   ExpeditionRecap, FaceParticles, SunArc, PersonaTriptych,
                          #   Marginalia, Observatory, Blueprint, CodebaseAtlas,
                          #   NdaSchematic, CommitGraph, RavenBurst, RavenNotice,
                          #   TimeRail, TimeTunnel, EraExhibit,
                          #   ThemeWheel, VolumeDial, Fog
  assets/                 # backend/creator/mobile/web pngs + tech/*.svg (import via assets/index.js)
public/                   # PRODUCTION ASSETS ONLY (everything here ships):
  favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png
  android-chrome-192x192.png android-chrome-512x512.png
  og-image.png logo-light.png logo-dark.png
  site.webmanifest robots.txt sitemap.xml resume.pdf
  sounds/raven.mp3        # Optional raven one-shot (Contact send); other beds synth-only
  realms/<slug>/…         # project gallery screenshots (per-theme subfolders when themed)
  archive/<id>.webp       # Time Machine era posters (probed; optional)
branding/                 # Brand SOURCE/ARCHIVE — NOT deployed (out of public/)
  source/  archive/v1/  hero-sky/   # master art, old icon sets, retired hero skies
tools/og-image/           # og-image template + regeneration steps (headless Chrome)
scripts/gen-commit-history.mjs # Generates constants/commitHistory.js (prebuild)
docs/chronicle/           # THIS documentation set (source of truth)
```

> No `src/utils/`, `styles.js`, `lib/utils.ts`, `components/canvas/`, `Navbar`,
> or `CommandPalette` — all removed. The `@`-path aliases in
> `vite.config.js`/`tsconfig.json` mirror this tree but code uses relative imports.

---

## 2. App composition (router + shell)

`App.jsx` is just the router; the persistent shell is `components/Layout.jsx`,
shared by both routes (z-stacking + mount order matters):

```jsx
// App.jsx — four routes sharing one shell
<BrowserRouter><Routes>
  <Route element={<Layout/>}>
    <Route index element={<Chronicle/>} />                    // /
    <Route path="making-of" element={<MakingOf/>} />          // /making-of
    <Route path="time-machine" element={                      // /time-machine
      <ErrorBoundary><Suspense><TimeMachine/></Suspense></ErrorBoundary>} />
    <Route path="*" element={                                 // cinematic 404
      <ErrorBoundary><Suspense><Void/></Suspense></ErrorBoundary>} />
  </Route>
</Routes></BrowserRouter>

// components/Layout.jsx — present on EVERY route
useSmoothScroll();                       // Lenis + GSAP ticker (once, persists across routes)
const activeId = useActiveSection();     // scroll-spy → active chapter id (→ Outlet context)
const is404 = /* not / or /making-of or /time-machine */;    // hides the footer on 404
<div bg=theme>
  <div aurora-bg / sunrise-bg />         // ambient background
  <Cursor />                             // custom cursor (fixed, top z)
  <SkyControl />                         // fixed top-right (sky menu, desktop only)
  <DayNightToggle />                     // fixed top-right (just the sun/moon, mobile only)
  <ControlCluster activeId />            // fixed bottom-right (voice + sound, desktop only)
  <MobileMenu activeId />                // bottom-sheet w/ nav/voice/sound/sky (mobile only)
  <EasterEggListener/> <VoiceTransition/> <VoiceHall/>  // global ⇧⌘V + decode FX
  <ScrollManager/>                       // resets scroll on entering coda routes
  <Outlet context={{ activeId }} />      // ← the active route renders here
  {!is404 && <footer>…</footer>}         // conversion footer (hidden on 404)
  <Analytics/> <SpeedInsights/>
</div>

// pages/Chronicle.jsx — / only
const { activeId } = useOutletContext();
useEffect(() => restoreScroll(), []);    // land back at the doorway on return
<SideRail activeId items={chapterList} actions={[map,makingOf,timeMachine]} />
<StickyCta activeId />                   // scroll-triggered contact CTA
<MapOverlay open activeId />             // ⌘K interactive map (Chronicle-only)
<Hero /> {lazy sections each <ErrorBoundary><Suspense>…}  // chapters 00–05

// pages/MakingOf.jsx — /making-of only
<SideRail activeId items={atelierActs} actions={[timeMachine,home]} />  // acts rail
<Link to="/" className="atelier-return md:hidden" />  // mobile return doorway
<ErrorBoundary><Suspense><Atelier/></Suspense></ErrorBoundary>

// pages/TimeMachine.jsx — /time-machine only
<SideRail activeId items={eraActs} actions={[home]} />  // era rail
<Link to="/" className="atelier-return md:hidden" />    // mobile return doorway
<ErrorBoundary><Suspense><TimeMachine/></Suspense></ErrorBoundary>

// pages/Void.jsx — * (cinematic 404, "Off the Map")
// Self-contained one-viewport scene: lost astrolabe, sparse starfield, 404 tag,
// primary "way home" + secondary "find your bearing" delight. No footer, no scroll.
```

- **Sections are `lazy()` + `Suspense` + `ErrorBoundary`.** An `ErrorBoundary`
  around each guarantees one section failing never white-screens the site. `Hero`
  is eager (above the fold); the rest (incl. the Atelier) are lazy.
- **One Lenis, across routes.** `useSmoothScroll` lives in `Layout`, so the smooth
  scroll persists through navigation (no re-init jank). The Chronicle unmounts
  when you visit `/making-of`; on return it restores the remembered scroll
  position (`rememberScroll`/`restoreScroll` in `smoothScroll.js`) once the pinned
  Experience has grown the page height. `ScrollManager` sends any other
  destination to the top.
- **Sound boot (Phase 4):** `Layout` calls `sound.arm()` (one-time gesture →
  unlock the AudioContext) + `sound.loadRaven()`/`loadBeds()` on mount; the
  Chronicle fires the map open/close whoosh from its `mapOpen` state. The old
  `MusicPlayer` (ambient track) is **removed** — superseded by the cue system.

---

## 3. Smooth scroll + GSAP (canonical pattern)

`src/lib/smoothScroll.js` already sets up Lenis and drives it from GSAP's ticker
(so ScrollTrigger and Lenis are frame-synced). **Do not create a second Lenis or
a parallel rAF scroll loop.**

- Programmatic scroll: `scrollToSection('about')`, `scrollToTop()`.
- Cross-route memory: `rememberScroll()` (called by the Realms doorway before it
  navigates to `/making-of`) + `restoreScroll()` (called on the Chronicle's mount)
  return the visitor to the exact spot they left.
- Reduced motion: smoothing auto-disables.

**Every scroll-driven component uses this shape:**

```jsx
const rootRef = useRef(null);
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.thing', {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    // pin example:
    // ScrollTrigger.create({ trigger, start:'top top', end:'+=2000', pin:true, scrub:1 })
  }, rootRef);
  return () => ctx.revert();   // ⟵ MANDATORY cleanup (kills triggers + tweens)
}, []);
```

Guard expensive motion:

```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(hover: none)').matches;
if (reduce || coarse) { /* static fallback */ return; }
```

> **Pin + Lenis note:** when pinning horizontal sections, use
> `scrollTrigger.scrub` (number for smoothing) and `invalidateOnRefresh:true`;
> recalc on resize via `ScrollTrigger.refresh()`. Test that Lenis doesn't fight
> the pin (it won't, since both run off the same ticker).

---

## 4. Theming

- `useThemeStore` is a **5-mode "sky"** (`auto` default + `dawn`/`day`/`dusk`/
  `night`); it writes the base `.dark`/`.light` class **and** `data-sky="<mode>"`
  on `<html>` and persists the chosen mode. `auto` resolves from the visitor's
  real local time (`lib/sky.js`, SunCalc + timezone). `resolvedTheme`
  (`'dark'|'light'`) is kept as a derived alias so existing `isDark` branches work.
- `dawn`/`dusk` are warm token tints layered on the base via `[data-sky]` (text
  tokens inherited → AA preserved). Components read `resolvedTheme` only when they
  need JS branching (rare — prefer CSS vars). See DESIGN-SYSTEM §1.
- `SkyControl` (top-right) is the theme UI; the inner `DayNightToggle` carries
  `data-theme-toggle` (so the map command can flip it) and does the radial ripple.

## 4b. Sound (Phase 4)

A Web-Audio "sound design system": sparse cues that reward *intent*, never
accompany motion. Three layers:

- **Engine** (`lib/sound.js`) — pure audio, no React. ONE shared `AudioContext`,
  unlocked on the first gesture (`sound.arm()`), feeding a master `gain → compressor
  → destination` bus. All **tunables live in the `CONFIG` block** at the top (cue
  loudness/length, bed loudness, sample paths). Abstract cues are synthesized (osc
  + ADSR + biquad + noise → 0 bytes); the **raven** is an optional one-shot mp3.
  **Five** continuous *beds* each play an **optional looping mp3**
  (`CONFIG.beds.*.sample`) or a synth fallback, built lazily and torn down at zero.
  **Page-visibility gated:** the context suspends on tab/window switch and resumes
  on return. Everything no-ops until unlocked + enabled + in view.
- **Store** (`useSoundStore`) — persisted prefs (`enabled`/`volume`/`engaged`);
  **default-on but auto-muted under `prefers-reduced-motion`**; pushes changes
  into the engine.
- **Cues** — fired with `playCue(name)`: `theme` (DayNightToggle, swoosh synced to
  the wipe), `glitch` (voice change), `error` (Contact validation), `mapOpen`/
  `mapClose` (Chronicle), `raven` (Contact send), `blip` (Tech hover), `detent`
  (BuildReel sprocket tick), `settle` (BuildReel playhead landing), `click` (physical
  prev/next key), `hoverNote` (Observatory chip hover), `rewind` (Time Machine era
  crossing), `pageflip` (Time Tunnel page turn), `assembleSwell` (FaceParticles
  gathering), `volumeTick` (volume slider tick), `chartSwap` (Arsenal orbit⇄inventory
  fold/unfurl). **Beds:** `sound.watch` (Hero astrolabe, scroll-faded),
  `sound.hum` (Arsenal ambience, proximity-faded via a Tech ScrollTrigger),
  `sound.lens` (FaceParticles magic-lantern hover buzz), `sound.orbit` (Observatory
  constellation hover), `sound.reel` (BuildReel film-transport whir, velocity-driven).
  `sound.loadRaven()` + `sound.loadBeds()` preload the optional samples at boot.
- **Voice transition** — `lib/voiceChange.js` is a tiny emitter; the voice store
  calls `fireVoiceChange()` after a switch, and `VoiceTransition` (Layout) plays the
  `glitch` cue + runs `lib/voiceScramble.js`, which walks visible text nodes and
  **decodes the new copy in** (per-text scramble; restores exact targets so React
  stays consistent). No overlay. Skipped under reduced-motion.

---

## 5. Global shell components

| Component | Contract |
|---|---|
| `Layout` | The shell shared by **all** routes: mounts smooth scroll + the boot side-effects, the always-present controls (`SkyControl`/`DayNightToggle`, `ControlCluster`, `MobileMenu`, `VoiceHall`, ⇧⌘V), the conversion footer (with quiet doorways to `/making-of` and `/time-machine` — footer hidden on the 404), analytics (`capturePageview` on route change), and a `ScrollManager`. Renders the active route through `<Outlet context={{ activeId }} />`. Imported directly by `App.jsx` (not barrel-exported). |
| `SideRail({ activeId, items, actions, visible })` | **Desktop-only** (md:up) collapsible glass rail (left, vertically centered). **Shared by all three routes** — Chronicle (chapter rows + map/makingOf/timeMachine actions), MakingOf (Atelier act rows + timeMachine/home actions), TimeMachine (era rows + home action). `items` are clickable nav rows (scroll-to-section); `actions` are footer-slot buttons. Sigil = themed brand crest (`/logo-{light,dark}.png`). Springs open on hover. |
| `MobileMenu({ activeId })` | **Mobile-only** (md:down) bottom-sheet that collapses the desktop floating controls into one touch-friendly surface: chapter/act nav, voice picker (with preview + sealed-voice clue unlock), sound control, full 5-mode sky picker (`ThemeWheel`). Slides up from a persistent pill; manages its own overlay stack (`lib/uiOverlay.js`). |
| `StickyCta({ activeId })` | Scroll-triggered CTA bar that appears once the visitor has engaged past the hero. A quiet "get in touch" / résumé nudge that follows the scroll. |
| `MapOverlay({ open, onClose, activeId })` | **Chronicle-only** ⌘K interactive map overlay (the realized "Command Palette"). Pins are `constants.chapterList` (each chapter's `x`/`y`/`kw`); probes `/chronicle/map/realm-map.webp`, degrades gracefully; commands map to `scrollToSection` + external links. |
| `Cursor` | Dot + trailing ring (+grows over `a,button,[data-cursor=hover]`) + backlight. Auto-off on touch/reduced-motion. Add `data-cursor="hover"` to custom interactive targets. |
| `SkyControl` | Top-right theme control (desktop): the 5-mode sky menu (Auto/Dawn/Day/Dusk/Night) wrapping `DayNightToggle`. The trigger pill is a live sky status chip. |
| `DayNightToggle({ compact? })` | The base light↔dark toggle (inside `SkyControl`, also standalone on mobile top-right). Sun↔moon morph, orbit ring, spring press, radial View-Transition ripple; fires the `theme` sound cue. |
| `CompassRose({ className })` | Shared ember/gold compass-star SVG. Used at the astrolabe hub, the SideRail map row, the map overlay, and the 404 compass. |
| `ControlCluster` | Bottom-right fixed flex row (desktop): `[VoiceSwitcher] · [SoundControl]`. Sound expands on hover and pushes voice left. |
| `VoiceSwitcher` | Compact bottom-right voice popover (the teaser surface): open voices + sealed rows (capped at `POPOVER_SEALED_LIMIT`) + CTA to Voice Hall. Uses `useCoachmark` for the one-time entice note. |
| `VoiceHall` | Full-screen searchable, category-grouped voice picker overlay (⇧⌘V). Includes `VoicePreviewCard` (detail panel) + `VoiceRequest` ("Summon a Voice" form). |
| `VoicePreviewCard` | Voice detail card — shared by the Voice Hall side panel and the MobileMenu voice preview. Shows pre-rendered portrait plate + identity + sealed-voice clue unlock. |
| `ClueUnlock` | Touch-friendly sealed-voice clue/answer field — inline in popover rows and preview cards. |
| `SoundControl` | Audio half of the cluster: master mute/volume (`VolumeDial`) + the one-time "turn on sound" onboarding note (`useCoachmark`). Drives `useSoundStore` → `lib/sound.js`. |
| `VolumeDial` | Apple-style drag/click volume slider with `volumeTick` sound feedback. |
| `ThemeWheel` | 5-mode sky picker used inside `MobileMenu` (the full palette on mobile). |
| `Hovercard` | Portalled info popover (never clipped by overflow containers). Used by `VoiceSwitcher` attribution ⓘ. |
| `TimeRail` | **Time Machine**: right-edge continuous year/event timeline with MacBook-dock magnification. Fixed decoration reading scroll progress. |
| `TimeTunnel` | **Time Machine**: the "going back in time" news-headline transitions between era cards (scroll-driven, scrubbed). |
| `EraExhibit` | **Time Machine**: an archived portfolio card — iframe embed (if framable) or poster + link-out. |
| `Blueprint` | **Atelier Act II**: interactive runtime system chart — nodes + connections, click to explore. Custom `chartSwap` synthesis sounds. |
| `Observatory` | **Atelier Act II**: interactive analytics constellation with event-specific readouts and `orbit` bed hover. |
| `CodebaseAtlas` | **Atelier Act II**: cinematic codebase explorer tree with boundary-aware scroll chaining. |
| `ExpeditionRecap` | **Atelier off-map**: cinematic visitor instrument panel — `TravelerMap`, `SunArc`, Sigil, visit counter, voice constellation. |
| `FaceParticles` | **Atelier off-map**: interactive portrait with particle assembly (`assembleSwell` cue) + `lens` bed. |
| `ErrorBoundary({ fallback? })` | Class boundary; wrap any risky subtree. |
| `SectionWrapper(Component, id)` | HOC (`hoc/`): padded `max-w-7xl` section, `<span id>` anchor, Framer stagger container (`lib/motion`). Use for standard sections. |
| `ChapterHeading({ no, eyebrow, title, align })` | The one section header. Use everywhere; never hand-roll headers. |
| `MapDivider` | Route-line divider between chapters (optional). |

---

## 6. Asset pipeline

- Runtime art is referenced by absolute path from `public/` (e.g.
  `/realms/<slug>/…`, `/logo-dark.png`) and is **not** imported through the
  bundler. Small bundled images/icons live in `src/assets/` (imported, hashed).
- **Probe-and-degrade pattern** for *optional* art (realm covers, map): attempt
  to load each asset; render it only if it loads, else a procedural/typographic
  fallback. Keeps the site shippable before art exists and resilient on 404.
  (The hero needs no probe — it's a fully procedural CSS starfield + Canvas2D.)
- Prefer **WebP** (q≈80); keep images lean and lazy below the fold. **`public/`
  ships as-is** — keep it to production assets only; brand source/archive go in
  `/branding/`.
- Brand/icon assets: the favicon family + `og-image.png` are generated from the
  brand crest via [`/tools/og-image/`](../../tools/og-image/). Full spec +
  filenames + prompts: [ASSETS.md](ASSETS.md).
- **Sound (Phase 4):** `public/sounds/raven.mp3` (one-shot raven sample) ships.
  The bed CONFIG references `astrolabe.mp3` and `arsenal.mp3` as optional mp3 loop
  samples — if present they play; if absent (current state) a synthesized fallback
  is used seamlessly. All other cues and the three remaining beds (`lens`, `orbit`,
  `reel`) are synthesized (0 bytes). Paths are configurable in `lib/sound.js` →
  `CONFIG`. Never block on an absent sample.

---

## 7. Performance budget

- Initial JS < ~200KB gz (Three.js is gone — keep WebGL out). Vendor split:
  `react-vendor` + `animation-vendor` (framer/gsap/lenis) via `manualChunks`.
- Lighthouse perf ≥ 90; 60fps scroll.
- `transform`/`opacity` only; `will-change` on animated layers; `content-visibility`/lazy for heavy sections.
- One `IntersectionObserver`/ScrollTrigger per concern; clean them up.
- Audit `dist/` after build; no asset > 1MB ships unless deliberate.

---

## 8. Verification (do this for every section)

```bash
npm run dev    # serves on 5173+ (note the printed port)
npm run build  # MUST stay clean (no new errors)
```

Drive headless Chrome for screenshots (no Playwright needed):

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --virtual-time-budget=9000 \
  --screenshot=/tmp/shot.png "http://localhost:<port>/"
```

- Check **dark + light**, and **360 / 768 / 1280 / 1920** widths.
- Confirm no console errors: add `--enable-logging=stderr --v=0 --dump-dom`.
- Verify reduced-motion (emulate) and that scroll never locks.
- **Verify all routes:** `/` (no Atelier inline, doorway + footer link present),
  `/making-of` (return doorway + Atelier body, no chapter chrome),
  `/time-machine` (era cards + time rail + return doorway, no chapter chrome), and
  any unknown path (cinematic 404: "Off the Map" scene, no footer, `noindex` meta).
  Deep-links work because of the `vercel.json` SPA rewrite (dev: Vite serves
  `index.html` for any path).

> To verify scroll-dependent chrome (the `SideRail`, which is hidden on the hero)
> you need a scrolled state — drive scroll via CDP or check the rendered DOM.
> The `ErrorBoundary` keeps the page rendering if any subtree throws.

---

## 9. Coding conventions recap

- Function components + hooks; `ErrorBoundary` is the only class.
- Default-export one component per file; colocate small sub-components, promote
  shared ones to `src/components/`. Sections live in `src/sections/`.
- Content from `constants/`; color from CSS vars; icons from lucide / `CompassRose`.
- Clean up every effect (listeners, rAF, ScrollTrigger, Lenis).
- Chapters live **once** in `constants.chapters` / `chapterList`; SideRail, the
  Map overlay, the Hero eyebrow, and section headings all derive from it.
