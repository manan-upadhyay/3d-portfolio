# Section 07 — The Atelier (Making-of revamp)

**Route:** `/making-of` (`pages/MakingOf.jsx` → lazy `sections/Atelier.jsx`) ·
**Status:** **built (v2)** — five-act restructure, Observatory interaction model,
the webhook/alert path, and the **Codebase Atlas** ([08](08-codebase-atlas.md), the
second Act-II instrument) all shipped. · **Canon:** unnumbered coda, not in
`chapters`/`chapterList`, reached from the foot of The Realms + the footer.

> This spec **supersedes** the v1 inline layout of `sections/Atelier.jsx`. The
> components (`BuildReel`, `Observatory`, `PersonaTriptych`) stay; the **page
> structure, ordering, rhythm, and the Observatory interaction model** change.

## Why we're revamping

v1 is nine same-density blocks stacked in source order — reel card → stats grid →
ledger → Observatory → eggs → chips → personas → manifesto. Symptoms:

- **No spine.** Unrelated blocks abut with no narrative throughline; the eye has
  nothing to follow.
- **Repetition.** `.realm-card`-style boxes stack at one rhythm; the page has
  **two near-identical metric grids** (`atelier-stats` 5-up and
  `observatory__metrics` 4-up) within one screen of each other.
- **No breath.** Dense data blocks sit back-to-back with no sparse beats between.

The fix is **act structure + rhythm variation + connective tissue**, plus a
reorder so related ideas live together, plus a **real interaction model for the
Observatory** (its hover is currently dead — see §Observatory).

## The five acts

Frame the page as the build *as a film*. Alternate **dense ↔ sparse** beats; never
place two heavy data blocks adjacent. A thin vertical **spine line** runs down the
page; each act carries a numbered eyebrow (`I · …`) so the eye always knows where
it is.

| Act | Content (from v1 unless noted) | Rationale | Rhythm |
|---|---|---|---|
| **Cold open** | Confession + sub (keep) | the human *why* | sparse, centered, quiet |
| **I · The Build** | `BuildReel` + **stats dissolved into prose** + the built/cut ledger | all *process & decisions* — one cohesive act, not three cards | one dense centerpiece, generous padding |
| **II · The Engine Room** | **Observatory (redesigned)** + **webhooks/alerting (new)** + **The Blueprint (2026-07-09, see below)** + **Codebase Atlas** (see [08](08-codebase-atlas.md)) | the senior-signals showpiece: analytics, observability, alerting, architecture, structure | richest, most interactive |
| **III · The Hidden Layer** | Field guide (eggs) + built-with chips folded in | playful palate-cleanser after the dense act | light, airy, change of pace |
| **Coda** | Personas (`PersonaTriptych`) + manifesto + signature | the person; rhymes with the cold open | sparse, centered, quiet |

### Rhythm / anti-repetition rules
- **Stop boxing everything.** Replace stacked `.realm-card` containers with
  full-width **editorial bands** — varied alignment (some left, some centered),
  large vertical breathing room.
- **Kill the duplicate metric grid.** The `atelier-stats` 5-up grid is **removed
  as a standalone block**; its figures dissolve into the Act I prose ("seven
  scenes, N commits, over D days"). The Observatory keeps the *only* metric
  readout on the page.
- **Number the acts** with a recurring eyebrow treatment; add a connective spine
  line (thin, theme-token, decorative `aria-hidden`).
- **Alternate density** across acts as the table prescribes.

## Observatory — interaction model (the core fix)

**v1 bug:** nodes live inside `.obs-orbit` (`animation: obs-spin 120s linear
infinite`); the only "interaction" is a native SVG `<title>`. A tooltip on a
continuously rotating target is unusable — rotation never pauses, there's no
overview of the 33 events, and `session_recap` on the right is a static label that
never changes.

**v2 model — decouple discovery from decoration.** The constellation becomes a
*display*; an always-visible list becomes the *index*.

- **Always-visible event index.** Render all 33 events grouped by surface (the
  existing `constellation.groups`) as a persistent, scannable, colour-coded
  column of chips/rows. A visitor sees **every** instrumented event with **no
  hover required**.
- **Bidirectional linking.** One `selectedEvent` state. Hover/focus a chip →
  its star lights + lifts; hover/focus a star → its chip highlights.
- **Rotation pauses on interaction.** `animation-play-state: paused` (via a state
  class) the instant the pointer enters the viz or a chip is focused; resumes on
  leave. The target goes still → becomes clickable.
- **Detail readout** replaces the static hub label. Selecting an event shows
  *what it is, where it fires (surface/component), and `track` vs `trackOnce`*.
  With nothing selected, the hub returns to its `session_recap` framing.
- **Touch / coarse pointer + keyboard.** The chip list is the **primary** surface
  on touch (constellation goes static-decorative). Chips are real `<button>`s →
  tab/arrow + Enter for free. Honor `prefers-reduced-motion` (no spin, no lift).

### Data shape (important — voice rule)
Event names, "fires when…", and surface are **technical proper-noun data**, not
voiced copy — they belong in `constants.atelier.observatory`, **exempt from voice
translation** like the existing capability `tags`. Extend each `names` entry:

```js
// constants.atelier.observatory.constellation.groups[].names[]
{ id: 'hero_cta', where: 'Hero — primary call-to-action' }
// (string-only entries may stay as a shorthand during migration)
```

Only the framing sentences (intro, hub note, panel bodies, footnote) stay voiced
under `t('atelier.observatory.*')` across **all** bundles.

## The Blueprint (added 2026-07-09 — OPENS Act II)

The runtime system chart approved from the [Release-2.0 E2E audit §7a](../reports/audit/2026-07-09-release-2.0-e2e-audit.md)
proposal. One claim, drawn: **everything runs inside "the client realm" (the
visitor's device); exactly three named signals ever cross the wall** — analytics
(PostHog + Vercel, cookieless/DNT-off), the raven (same-origin `/api/send-raven`
→ Resend, key server-side), and the reading (the recap's opt-in IP lookup). A
ghost edge dies at the wall with the sealed note (no cookies, no identity, no
shipped media, self-hosted fonts). Every edge was verified against the code
before drawing — the chart claims nothing the network tab won't confirm.

- **Component:** `components/Blueprint.jsx` · data (node ids, glyphs, 1000×560
  grid coordinates, EN-only gate captions) in `constants.atelier.blueprint` ·
  copy under `t('atelier.blueprint.*')` in **all ten** bundles (name + why per
  node).
- **Desktop (≥1024px):** an authored chart — the SVG layer draws geometry only
  (edges dash-draw in once, the double-rule wall opens gaps only at the gates,
  the ghost line, outbound arrowheads) and is `aria-hidden`; every station is a
  real positioned `<button>` centered on its grid coordinate. Hover/focus
  previews the station in the readout panel below (observatory-style accent
  rail + pitched note); click commits. Selecting dims the field and lights that
  station's thread; selecting the shell hub lights everything.
- **Mobile (<1024px):** a bespoke vertical **signal trail**, not a shrunk chart —
  client stations descend a gold thread, the trail breaks at the wall divider
  (✕ chip + sealed note), and only the three ember gate stations continue
  beyond. Tap unfolds the decision (one at a time, field-guide accordion).
- **Placement:** it **opens Act II** as the overview; Observatory and Atlas are
  its drill-downs (watching / files). With the Blueprint moved out from between
  them, the two heavy instruments are adjacent again — so the **bridge divider
  stays** exactly where it was, doing the job it was built for.
- **Naming rule (2026-07-09):** station titles in `chronicle` + `plain` must be
  instantly readable by a non-native English speaker ("The page", "The scroll",
  "The analytics", "Your message", "Your city" — flavor lives in the *why*, and
  gate captions avoid idioms/abbreviations). Sealed voices keep full character.
- **It charts the RUNTIME; the Atlas charts the FILES** — deliberately no
  overlap, and it doubles as the static one-line takeaway Act II's instruments
  were missing.
- **Analytics:** `blueprint_explore` (once, first interaction) +
  `blueprint_node_open {id}` (deliberate click/tap only; hover never fires).
- **A11y / motion:** stations are native buttons, readout is `aria-live`;
  reduced-motion = no draw-in, no stagger, no pulse, instant accordion.

## Webhooks / alerting (new — Act II, inside the Observatory)

A genuine senior signal (MTTD, no silent failures, shipping-cadence visibility).
**Do not add another card** — extend the Observatory's **observability** panel and
add a small **signal-flow** visual:

- Two three-stage flows: **source → webhook → Discord**
  - **PostHog** error/exception → Discord `#alerts` (mean-time-to-detect)
  - **GitHub** push → Discord `#deploys` (shipping-cadence visibility)
- One senior caption, e.g. *"Errors and deploys page me where I already am — no
  dashboard babysitting."*
- New readout(s) in the metric row (e.g. `2` webhook routes).
- **Never render webhook URLs** — they're secrets. Describe the route, not the
  endpoint. New non-copy data goes in `constants.atelier.observatory` (e.g. a
  `signals` / `webhooks` array of `{ source, channel, glyph }`); captions voiced.

## Implementation notes
- `sections/Atelier.jsx` is restructured into the five acts; extract per-act
  wrappers if a band repeats. The dissolved stats become inline figures in the
  Act I copy (still data-driven from `constants.atelier.stats`).
- `components/Observatory.jsx` gains `useState` for `selectedEvent`, the chip
  index, pause-on-hover, and the detail readout. New CSS: `.obs-orbit.is-paused`,
  the index list, the active-node + detail styles, the signal-flow visual. All
  theme-token only.
- New strings → **every** bundle (`chronicle` base, `plain`, every egg voice),
  per CLAUDE.md §4.2. Remember i18next **replaces** array keys.
- Keep `BuildReel`, `PersonaTriptych` APIs unchanged.

## Accessibility / performance
- Constellation `role="img"` + a visually-hidden equivalent of the index; chips
  are labeled `<button>`s; the spine line is `aria-hidden`.
- Reduced-motion: no spin, no lift, no scrub auto-motion; instant state changes.
- Animate only `transform`/`opacity`. The Atelier stays lazy + `ErrorBoundary`d.

## Acceptance criteria
- [x] Page reads as five acts with a visible spine + numbered eyebrows; no two
      dense data blocks are adjacent.
- [x] Only **one** metric grid remains on the page (Observatory's); old
      `atelier-stats` block (markup + CSS) is gone, its figures live in Act I as
      an inline `.atelier-tally`.
- [x] Observatory: every event is visible without hovering (the index); star↔chip
      highlight is bidirectional; rotation pauses on interaction; the readout
      updates on select; chips are real `<button>`s (keyboard) and the orbit is
      static on coarse pointers + reduced-motion.
- [x] Webhooks/alerting reads as part of observability (the observability panel +
      the `.observatory__signals` flow); no webhook URL is exposed.
- [x] All new copy ships in every voice (chronicle/plain/scott/dwight/cow);
      dark+light verified at 1280; `npm run build` clean. *(360/768/1920 spot-check
      pending if desired.)*
