# TIME-MACHINE — The Legacy Portfolios (exploration + proposal)

> **Created:** 2026-07-10 · **Owner:** Manan · **Status:** 🟢 building (greenlit
> 2026-07-10 — owner answers in §10). Build spec + interaction contract now lives
> in [sections/11-the-time-machine.md](sections/11-the-time-machine.md); this doc
> is preserved as the decision record ("should we" + the options considered).
>
> **The ask:** surface the two portfolios Manan built along the way — **2019**
> and **2023** — as a *cinematic time-machine feature*, clearly framed as old,
> unmaintained "ruins" (broken animations expected), each opening its live Vercel
> deployment. It must **not** read like the secondary client projects in The
> Realms. This doc answers **should we**, then **where / how / what**, with
> distinct concept directions and a build plan.
>
> **Read first:** [CLAUDE.md](../../CLAUDE.md) §2–§4, [TACTILE-MOMENTS §0](TACTILE-MOMENTS.md#0-the-governing-principle)
> (the dilution rule), [common-ai-signs.md](common-ai-signs.md), and the
> 2026-07-08 homepage value audit reasoning referenced in CLAUDE.md §3
> (why `ExpeditionRecap` moved *off* the money page).
>
> **Deployments to showcase**
> - 2023 → `https://portfolio-c3pvtpl2j-mananupadhyays-projects.vercel.app/`
> - 2019 → `https://legacy-portfolio-alpha.vercel.app/`

---

## 0. TL;DR — should we?

**Yes — but as an off-spine coda, framed as *evolution*, never as portfolio
padding.** A strong, opinionated recommendation:

- **Ship it, but keep it off the six-chapter homepage.** Legacy portfolios are a
  *wonder / growth* artifact, not a *hire-decision* artifact — exactly the same
  call that moved `ExpeditionRecap` off the Contact foot to `/making-of`. A CTO
  deciding in 10 seconds should not meet 2019 code first. Someone who *chose* to
  go deeper should.
- **The value is the trajectory, not the artifacts.** "Here is the same person,
  three times, getting better" is one of the most persuasive things a senior dev
  can show — it turns the "5+ yrs" claim into *receipts*. Snapshot < slope.
- **The risk is real but fully mitigable:** showing weaker old work reads as
  showing off *only if the framing is wrong*. Frame it as a **preserved ruin /
  museum wing** — dated, patina'd, explicitly unmaintained — and it becomes
  charming honesty, not a liability.
- **The payoff is narrative, not just novel.** The site already runs on
  time (SunCalc sky, the hero astrolabe, the day/night grade). A time machine is
  the one feature that gives all of that temporal machinery a *story reason to
  exist*. That's the difference between "a cool widget" and "a moment."

**If we do not do it:** nothing breaks; the site is complete without it. This is
additive wonder, not a gap. So the bar is: **only ship if it clears "awwwards
moment," not "nice archive."** A boring version of this should not ship at all.

---

## 1. The core principle — this is a *time* feature, not a *projects* feature

The single most important design decision, because it's the thing the owner
explicitly worried about ("shouldn't feel like the secondary client projects").

| | The Realms (client work) | The Time Machine (legacy self-work) |
|---|---|---|
| **Tense** | Present — "here is what I ship" | Past — "here is who I was" |
| **Metaphor** | Cartography — realms on a map | **Time / strata / excavation** |
| **Verb** | "Enter the realm" | "Travel back" / "Enter the ruin" |
| **Chrome** | Cinematic plate, pristine | **Aged, period-accurate, patina'd** |
| **Framing** | Proof of capability | Proof of **growth** + honest history |
| **Grade** | Full-color, live | Desaturated → sepia the further back |
| **Home** | Homepage (money page) | Off-spine coda (wonder page) |

**Everything visual must lean into *time*, not *place*.** No realm plates, no wax
seals, no "Realm 0X." Different verbs, different chrome, different color grade,
an explicit "unmaintained" plaque. If a visitor could confuse a legacy card with
a client realm, the concept has failed.

---

## 2. Where it lives (placement options)

Four options, most-recommended first.

### ★ Option A — A dedicated route: `/time-machine` (or `/archive`)
Its own shareable stage, reached from the Atelier and (optionally) a hidden hero
interaction. Mirrors the `/making-of` pattern exactly: shares `Layout.jsx`, gets
its own `pages/*` + route-scoped chrome, added to `vercel.json`'s SPA rewrite.

- **Pros:** biggest "wow" surface; own atmosphere without polluting the Atelier;
  directly shareable ("look what my 2019 site looked like"); never risks becoming
  a seventh chapter; own SideRail acts (one per era).
- **Cons:** most build effort; a third route to maintain; needs its own doorway
  discovery so it isn't orphaned.
- **Verdict:** **Recommended if we want the full cinematic version.** The time
  machine deserves its own room.

### Option B — A new **act inside the Atelier** (`/making-of`)
Add "The Archive" as act IV alongside Build / Engine / Hidden, via the existing
`atelierActs` + `SideRail` acts pattern. Sits naturally next to `ExpeditionRecap`
and the built/cut ledger — all "behind the curtain" growth artifacts.

- **Pros:** cheapest; canon already supports it (acts + rail + `useActiveSection`);
  thematically at home among making-of/growth content; zero new routing.
- **Cons:** shares the Atelier's atmosphere, so the time machine can't fully own
  its mood; lengthens an already-rich page.
- **Verdict:** **Recommended if we want the lean, safe version.** Best
  effort-to-payoff ratio.

### Option C — A **portal / micro-moment**, not a section
A discoverable object (e.g. a small "rewind" glyph on the hero astrolabe, or a
worn dial in the Atelier) that, on intent, plays a rewind cinematic and reveals
the two eras as an overlay. Intent-gated, per TACTILE §0.

- **Pros:** most "secret," most delightful for the curious; smallest footprint;
  strongest "resists / rewards intent" score.
- **Cons:** discoverability risk (great content few people find); an overlay is a
  smaller stage than a route.
- **Verdict:** A lovely *layer on top of* A or B — the doorway — not the whole
  feature by itself.

### Option D — Inline on the homepage
❌ **Do not.** Directly contradicts the homepage value audit that moved
`ExpeditionRecap` off. Old work is not a money-page asset. Listed only to close it.

> **Recommendation:** **Option A** (dedicated `/time-machine`) if we want the
> signature version, with **Option C** as its doorway (a rewind glyph in the
> Atelier and/or a hidden one on the hero astrolabe). If effort must be small,
> **Option B** (Atelier act IV) delivers ~80% of the value for ~40% of the work.

---

## 3. Concept directions (pick one spine)

Four distinct creative spines. Each is a *different answer* to "what is the wow."
They are mutually exclusive as the primary metaphor, though motifs can borrow.

### Concept 1 — **STRATA** (excavation / geological time) — recommended
You **descend** through time. Scrolling down doesn't go forward — it **digs
back**. Each portfolio is a geological *stratum*; a running year counter ticks
**backwards** (2026 → 2023 → 2019) as you sink. The deeper you go, the more the
world ages: color desaturates to sepia, film grain increases, the ambient light
dims, a faint dust/patina settles over the frame.

- **The signature:** the *container itself ages as you descend.* Near the 2023
  layer the chrome quietly adopts 2023's flatter design language; at 2019 it
  regresses further (heavier, more skeuomorphic, of-its-era). The **wrapper
  time-travels**, not just the content. That is the awwwards moment.
- **Museum placard** on each stratum: "STRATUM · 2019 — excavated as-is.
  Preserved, not maintained. Some animations no longer function." Honesty as art.
- Ties beautifully to cartography (core narrative) → *sediment layers of the
  mapmaker's own history.*

### Concept 2 — **THE DIAL** (astrolabe rewind)
Reuse the hero's Canvas2D **astrolabe** as a literal time dial. Drag / scrub it
counter-clockwise and the years wind back with a mechanical wind-back sound (via
`sound.js`); the display cross-dissolves between eras as the dial passes each
year mark. One instrument, three states.

- **The signature:** it reuses an *existing signature object* and gives it a
  second life — the astrolabe was always a time-and-sky instrument; here it
  finally *does time.* Strong internal rhyme; very cheap on new concepts.
- Pairs perfectly as the **doorway** (Option C) even if the destination uses
  Concept 1 or 3 for the reveal.

### Concept 3 — **THE PRESERVED TERMINAL** (period-accurate device)
Each portfolio appears *inside a device of its era* — 2019 in a heavier browser
chrome with an of-2019 loading spinner; 2023 in a cleaner window. A "boot
sequence" plays before the live view loads, like powering on old hardware.
Framed as exhibits behind museum glass with a brass plaque and a "last modified"
gravestone date.

- **The signature:** the *device* dates the work before you read a word — you
  feel 2019 vs 2023 viscerally. Great for the live-embed approach (§4).
- Risk: "browser-in-browser" is a known trope; must be executed with real craft
  (patina, era-correct details) or it reads generic. Best fused with Concept 1's
  aging grade.

### Concept 4 — **PALIMPSEST** (the cartographer's earlier drafts)
The most literary. The legacy portfolios are *earlier editions of the same map* —
older, hand-corrected drafts the cartographer has since redrawn. Faded ink,
crossed-out routes, margin notes ("2019 · here be dragons — I didn't know
`useEffect` yet"). Turning a page reveals the older draft beneath.

- **The signature:** deepest fit with the Chronicle's cartographer spine; the
  self-deprecating margin notes are pure charm and pure honesty.
- Risk: leans hardest into the metaphor — highest "cosplay" danger (CLAUDE.md
  §1: *flavor, never cosplay*). Keep notes witty and short, not lore-heavy.

> **Recommendation:** **Concept 1 (STRATA)** as the spine — it makes the
> *container age*, which nothing else on the site does, and it earns the site's
> time systems a narrative. Use **Concept 2 (THE DIAL)** as the doorway, and
> borrow **Concept 3's** museum-plaque + period-device framing for each exhibit.
> Concept 4's margin-note voice is a great source for the placard *copy*.

---

## 4. How each portfolio is shown — live embed vs. preserved poster

The key technical fork. Three approaches, with the recommended hybrid last.

**A. Live `<iframe>` embed** — the real old site, running, in-frame.
- ✅ Maximum "it's really alive" wow; hover/scroll the actual artifact.
- ⚠️ **X-Frame-Options / CSP** — a site can refuse to be framed. These are
  Manan's own Vercel deploys, so we control the headers (ensure they do **not**
  send `X-Frame-Options: DENY` / a restrictive `frame-ancestors`). Verify per
  deploy before committing to this path.
- ⚠️ Perf: loads the old site's full JS (the 2019 one may be heavy / Three.js-era)
  inside our ≤200KB-budget page. Must be **intent-gated** (load on click, never
  eagerly), lazy, and `ErrorBoundary`-wrapped.
- ⚠️ The "broken animations" the owner flagged will actually run broken — which
  can be charming *if the plaque sets the expectation*, or just look busted.

**B. Preserved poster (screenshot)** — a captured image, styled as an exhibit.
- ✅ Zero third-party JS, perfect perf, total art-direction control over the
  "ruin" aesthetic (sepia grade, grain, patina applied by *us*).
- ✅ Never breaks; no framing/CSP risk; the real site still opens on click (new
  tab), which is the honest place to explore a live artifact anyway.
- ⚠️ Less "alive" than a running embed.

**C. ★ Progressive — poster that becomes live on intent (recommended)**
Show the preserved **poster** by default (fast, art-directed, always works). On a
deliberate action ("Wake the ruin" / "Power on"), swap in the **live iframe**
(if that deploy allows framing) with the boot sequence; the primary CTA — "Enter
the ruin ↗" — always opens the real Vercel URL in a **new tab**.

- Matches the site's whole philosophy: **intent-gated, degrades gracefully,
  resilient.** Fast for everyone, alive for the curious, honest for the skeptic.
- The poster is the graceful fallback if framing is blocked or the old site is
  down — the feature never white-screens (CLAUDE.md §4.7).

> **Recommendation:** **C.** Capture posters now (also good for OG/social); make
> the live embed the reward, and always give a real ↗ link out.

---

## 5. The "unmaintained ruin" framing (owner's explicit requirement)

Non-negotiable and, done right, a *feature* not a disclaimer. Treat it as museum
curation, not a legal footer.

- **Brass plaque / placard** per exhibit: era, a one-line honest note, status.
  > `2019 · ARCHIVED` — "Preserved exactly as deployed. Unmaintained since. Some
  > animations no longer breathe. That's the point — this is who I was."
- **Gravestone metadata:** "Built 2019 · Last touched 2020 · Preserved 2026."
  Real dates dignify it.
- **Growth beat, not apology.** Optionally, a tiny "then → now" line per era
  ("2019: my first `useEffect`. 2026: this site." — Concept 4's voice). Turns a
  weakness into the *whole reason it's impressive.*
- **Voiced copy** — every plaque string ships in **all** bundles (`chronicle`,
  `plain`, `scott`, `dwight`, `cow`, …) in character (CLAUDE.md §4.2). The
  self-deprecating-honesty tone is *gold* for the sealed voices.

---

## 6. Motion, sound, a11y (the standards apply in full)

- **Motion:** GSAP `ScrollTrigger` scrub for the STRATA descent + year counter;
  `gsap.context()` scoped + `ctx.revert()` on unmount; animate only
  `transform`/`opacity`. The aging grade = a CSS `filter`/overlay driven by
  scroll progress, not per-frame JS on the content.
- **Sound (`sound.js`):** one new synthesized **wind-back / rewind** cue on the
  dial or on crossing an era boundary — intent-gated, rewards the deliberate act,
  never fires on passive scroll (TACTILE §0: *sound rewards intent, not motion*).
- **Reduced motion:** `prefers-reduced-motion` → the strata become a static,
  clearly-dated stacked list; no scrub, no grain animation, no boot sequence.
  Still complete, still honest.
- **Touch / coarse pointer:** no drag-scrub dependency for the dial — tap targets
  advance eras; no hover-only reveals for the plaques.
- **A11y:** each exhibit is a real landmark with a real `<a>` to the live URL,
  `aria-label`'d ("Open 2019 portfolio in a new tab"), keyboard-focusable, AA
  contrast on every plaque even over the sepia grade. The iframe (if used) gets a
  `title` and is not a keyboard trap.

---

## 7. Data & structure (data-driven, per CLAUDE.md §4.2)

Non-copy **data** in `constants` (a new `legacyPortfolios` / `archive` array);
all visible **copy** (plaques, notes, CTAs) in the i18n bundles under a new
namespace (e.g. `timeMachine.*` / `archive.*`), authored in every voice.

```js
// src/constants/index.js — DATA ONLY (labels are voiced)
export const archive = [
  {
    id: '2023',
    year: 2023,
    url: 'https://portfolio-c3pvtpl2j-mananupadhyays-projects.vercel.app/',
    poster: 'archive/2023.webp',   // public/archive/<id>.webp (captured)
    builtWith: ['react', 'three', 'framer-motion'], // era stack (data)
    framable: true,                // verified: deploy allows <iframe>? (drives §4C)
    dates: { built: 2023, lastTouched: 2023 },
  },
  {
    id: '2019',
    year: 2019,
    url: 'https://legacy-portfolio-alpha.vercel.app/',
    poster: 'archive/2019.webp',
    builtWith: ['html', 'css', 'jquery'],
    framable: false,               // if blocked → poster-only, link out
    dates: { built: 2019, lastTouched: 2020 },
  },
];
```

- Posters under `public/archive/` (production art; capture at 1280/1920 for the
  grade). Probe + graceful serif-monogram fallback if a poster is missing
  (CLAUDE.md §4.7).
- New route (Option A) → `pages/TimeMachine.jsx`, lazy section
  `sections/TimeMachine.jsx`, its own SideRail acts (one per era), add to
  `vercel.json` rewrite. Or (Option B) → an act block inside `sections/Atelier.jsx`.
- New component(s) in `src/components/` (flat, barrel-exported): e.g.
  `EraExhibit.jsx` (poster → live-embed progressive), `TimeDial.jsx` (if Concept 2),
  `RuinPlaque.jsx`.
- Update canon docs in the same change (a new `docs/chronicle/sections/11-*.md`
  spec + a line in CLAUDE.md §6 and the WONDER-AUDIT board).

---

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Reads as "showing off dated work" | Frame as **growth/evolution**; museum plaques; off the money page |
| Old deploys block framing (CSP/XFO) | Verify per deploy; default to **poster + link out** (§4C); framing is a bonus |
| Perf hit from loading old sites | Intent-gated live embed only; posters by default; lazy + `ErrorBoundary` |
| "Broken animations" look busted, not curated | The **plaque sets expectation** first; posters art-direct the ruin |
| Link rot (Vercel URLs change) | URLs live in `constants` (one edit); poster survives a dead link; consider stable alias domains |
| Metaphor tips into cosplay | Keep copy witty + short (CLAUDE.md §1); run against [common-ai-signs](common-ai-signs.md) |
| Orphaned / undiscovered | A real doorway (Concept 2 dial in Atelier + hidden hero glyph); a footer link |
| Dilutes the Atelier if inline (Opt B) | Prefer the dedicated route (Opt A) if the content is rich |

---

## 9. Recommended path & phasing

**Verdict: build it — Option A route, Concept 1 (STRATA) spine, §4C progressive
embed, Concept 2 dial as the doorway.** If effort is constrained, fall back to
Option B (Atelier act IV) with the same visual language.

- **Phase 0 — decide & capture.** Owner greenlights placement + concept. Capture
  period-accurate posters of both deploys. Verify each deploy's framability.
- **Phase 1 — the exhibit.** `EraExhibit` (poster + plaque + link-out) for both
  eras, static, fully voiced, dark+light, reduced-motion correct. Ship-able alone.
- **Phase 2 — the descent.** STRATA scroll choreography: backward year counter,
  scroll-driven aging grade, the container-ages-with-you signature.
- **Phase 3 — alive on intent.** Progressive live-embed swap + boot sequence for
  `framable` eras; the rewind sound cue.
- **Phase 4 — the doorway.** The astrolabe/dial rewind entry (Atelier + optional
  hidden hero glyph) + analytics on discovery/opens (feeds a keep/cut read).

Gate each phase on the **awwwards-moment bar** (§0): if the cheap version isn't a
*moment*, stop and rethink rather than ship a nice archive.

---

## 10. Open questions for the owner

1. **Placement:** dedicated `/time-machine` route (signature) or Atelier act IV
   (lean)?
   - Go with a new route. But we only have 2 past portfolios, we should design it in such a way that the page does not look empty or broken. Maybe we can add more historical elements to it? The scroll should animate all the elements in the page to feel older as we scroll - the colors, the cards, the designs, it should feel like they are scrolling into past.
2. **Concept spine:** STRATA (recommended), THE DIAL, PRESERVED TERMINAL, or
   PALIMPSEST?
   - Go with Strata
3. **Live embed or poster-only?** Are you willing to confirm/relax framing headers
   on the old deploys, or keep it poster + link-out (safest)?
   - Go with Progressive — poster that becomes live on intent
4. **Growth voice:** do you want the "then → now" self-deprecating notes, or a
   drier museum tone? (Affects how much voiced copy we author.)
   - Do what's best for the site
5. **Room to grow:** design for exactly two eras, or a scalable archive (so a
   future 2028 rebuild slots in)?
   - Design for scalable archive
6. **Scope now:** full four-phase build, or ship Phase 1 (static exhibits) first
   and earn the rest with analytics?
   - Go with full four-phase build
   - Make the time travel on this page feel more realistic by showing some news, facts or elements that were happening around that time. I can download and add assets to give it more time travel theme - pics, sounds or anything that acn help
