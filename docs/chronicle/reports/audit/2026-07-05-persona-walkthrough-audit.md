# Persona Walkthrough Audit — both routes, desktop + mobile

> **Date:** 2026-07-05 · **Build:** `release/release-2.0` (post v2.0 feedback pass, rounds 1–4)
> **Method:** end-to-end drives of `/` and `/making-of` at 1440×900 and 390×844
> (headless Chrome via CDP — real scrolls, real clicks, measured DOM), read
> through seven visitor personas. Every finding below traces to something
> actually observed in this build — no hypothetical nitpicks. Cross-reference:
> [V2.0-FEEDBACK-PASS](../../V2.0-FEEDBACK-PASS.md) for what already changed
> this cycle.
>
> Legend: 🔴 fix before Beta 2 · 🟠 should fix · 🟡 polish / consider.

---

## 1. What was verified working (don't re-litigate)

The instrumented pass confirmed these flows work as designed today: ⌘K map
opens/closes · "The full story" disclosure expands per plate · sealed-persona
tap opens the typing field (mobile drawer + expedition constellation) ·
commit strip lands scrolled to the latest day (150/150 px) · Atlas hotspot
cards reveal their "why" on tap · Observatory mobile signal-readout cycles ·
mobile menu opens opaque on both routes with Navigate/Persona/back-home ·
contact zebra bands render with **zero horizontal overflow** · desktop sound
capsule morphs with pixel-exact icon centering.

---

## 2. Persona walkthroughs

### 2.1 The busy CTO (desktop, 45s budget, skims)

Lands, reads "Manan Upadhyay — I build production React systems", sees the
proof line and three CTAs. Clicks **See my work**, skims plate I–III: name →
lead line → three dash-facts → stack → CTA. This now works in seconds.

- 🟠 **The "Psst — this whole tale can be told by other personas" bubble was
  still on screen at the projects and contact sections** during the drive. For
  a time-boxed skimmer it's a distraction squatting on the corner where the
  eye checks for chrome. It should dismiss on scroll-past or after ~8s, and
  never survive into the conversion sections. (Observed: `entice: visible`
  during the works/contact pass.)
- 🟡 The NDA plates (Realm III) have no visual — the serif monogram fallback is
  elegant, but a CTO reads "enterprise platform, no picture" twice in a row if
  they open "show more". A single abstracted diagram (boxes-and-arrows of the
  system, no real data) would carry NDA proof without breaching it.
- 🟡 "Chart 5 more realms" — the themed verb made this skimmer hesitate for a
  beat. The plain voice says "Show 5 more projects"; consider letting the
  *default* voice keep the plain label for load-bearing controls (the Contact
  de-theming precedent from v1.1).

### 2.2 The hiring manager (desktop, methodical, non-expert)

Reads the hero fully, opens About, reads the Journey cards (restored eyebrows
read well), reaches Contact and *submits* the mental checklist: role ✓ years ✓
stack ✓ résumé ✓ email ✓.

- 🟠 **The résumé opens in three places with two behaviors**: hero (`target
  _blank` open), contact + footer (`download`). A hiring manager who clicked
  the hero one expects the same behavior later. Pick one (open-in-tab is the
  friendlier default; downloads feel presumptuous) and use it everywhere.
- 🟡 The Journey's Oath card mixes degree + law degree + bar exam in one
  bullet — impressive but buried. A manager scanning "education" would miss
  the LL.B. entirely at card-glance. Consider a second quiet line under the
  role instead of a paragraph bullet.
- 🟡 Availability line says "usually replies within a day" twice on one screen
  (contact intro + footer sub). One instance is confidence; two is protesting.

### 2.3 The fellow developer / Reddit skeptic (desktop, hunting for tells)

Opens DevTools (finds the console greeting — good), hits `/making-of`, checks
the commit graph against the public repo link — **it matches; the honest
build-window framing holds up**. Pokes the Atlas, reads `sound.js`'s "zero
bytes shipped" claim, checks the network tab and confirms it.

- 🟠 **The stale-data trap**: `commitHistory.js` is hand-regenerated. The moment
  the repo moves on, the "straight from this repo's git log" claim silently
  drifts false — the exact audience that checks will check. Wire the generator
  into the build (`prebuild` script writing the file from `git log`) so the
  claim can never rot.
- 🟡 The Atlas `repo` link points to `github.com/manan-upadhyay/3d-portfolio`
  — verify the repo is actually public before Beta 2; a 404 here would be the
  single worst credibility hit for this persona.
- 🟡 The skeptic hovers the orbital nodes and notices constellation lines only
  connect *ring siblings* — cross-stack links (React↔Next↔TS) would read more
  like a real dependency map and less like decoration. Optional depth.

### 2.4 The Reddit drive-by (mobile, 20s, thumb-scrolling fast)

Fast-flicks the whole page. The zebra rhythm at Contact reads clearly; the
Experience strip's card-2 peek + arrows communicate the sideways gesture.

- 🔴 **The mobile-menu coach tip fires on every fresh session and floats over
  page content mid-scroll** (measured at y≈703 on a 844px viewport — right
  over the correspondence rows in one drive, over the sealed-voices panel in
  another). For a drive-by it's a popup — the thing this audience punishes.
  It should anchor to the FAB moment (show once, only while the FAB is idle at
  the viewport corner and nothing else overlays it), or move the reveal into
  the FAB's first open instead of a floating bubble.
- 🟠 **The StickyCta can sit directly on top of the "more projects" button**
  (owner-confirmed screenshot on iPhone: "Contact me" covering "…more
  projects"). Two competing CTAs in the same 60px of thumb space. The sticky
  should yield (hide or slide down) while the works footer controls are in
  view, the same way it already steps aside at Contact.
- 🟡 Three hero CTAs stack on 390px and push the location line low; consider
  two on mobile (See my work · Get in touch) with résumé living in the menu's
  Quick row (it already does).

### 2.5 The non-technical visitor (mobile, curious, taps things)

Taps the astrolabe (spins — delight works), changes theme via the wheel,
finds the persona drawer, unlocks nothing but reads the clue field.

- 🟠 **The email row in Correspondence truncates** (`upadhyaymanan01@…`) with
  no way to *see* the full address — the copy button works but a non-technical
  visitor wants to read it before trusting a tap. The expedition cells got
  tap-to-expand this cycle; the channel rows should use the same pattern (or
  simply wrap — it's one line of savings).
- 🟡 The expedition panel's jargon lands wrong for this persona: "ENGINE →
  Apple GPU", "VESSEL", "TONGUE" are charming to developers, opaque to
  civilians. The ⓘ "how?" note covers privacy but not *meaning*. Consider the
  plain voice using plain labels (it already does: "Hardware / Browser & OS")
  — and hinting the voice switch near the panel.
- 🟡 After unlocking sound, nothing tells this visitor what sound *does* —
  the "This site has a soundtrack" note asks them to enable it, then goes
  silent. One-line follow-up ("change the theme — listen") would convert the
  toggle into the delight it's wired for.

### 2.6 The explorer / awwwards judge (both viewports, tries everything)

Finds the map, the voices, the console note, the spin, the lens physics, the
signal readout. The Chronicle layer holds together.

- 🟠 **`/making-of` is still a long read on mobile** even after the cuts —
  the acts, ledger, field guide, observatory, atlas, personas, manifesto,
  portrait. The instruments are now usable, but the *sequence* is ~12+
  screens. An act-level "table of contents" strip at the cold open (tap →
  jump, reusing the new section ids) would let the explorer choose their
  ending instead of committing to the whole reel.
- 🟡 The Voice Hall footer's "Summon a new voice" doorway is quiet to the
  point of invisible next to the discovery counter; the explorer found voices
  through the drawer instead. Fine — but if summon requests matter as a
  signal, give the Hall's empty moments (all voices found) a louder invite.
- 🟡 The lens puck's "drag over me" hint never re-appears after first dismiss;
  a returning explorer forgot it was draggable. Session-scoped is right, but
  re-showing after ~30s idle on the portrait would cost nothing.

### 2.7 The older / low-dexterity visitor (mobile, larger text settings)

- 🟠 **Dynamic-type / browser font-size scaling is untested** — most of the
  UI uses fixed px type. iOS text-size bumps won't scale the interface, and
  the small mono labels (10–11px) are already at the floor for this persona.
  At minimum, verify the site at 120% browser font size and lift the 9.5–10px
  labels to 11px+.
- 🟡 The Experience card's swipe affordance depends on the peek + arrows;
  with a tremor, the horizontal snap can skip a card. The arrows work (44px ✓)
  — keep them; consider `scroll-snap-stop: always` on waypoints so a long
  fling can't skip past cards.

---

## 3. Prioritized worklist

| # | Priority | Item | Personas hit | Effort | Status |
|---|---|---|---|---|---|
| 1 | 🔴 | Menu coach tip: never float over content; tie to the idle FAB or fold into first menu-open | Drive-by, non-technical, everyone on mobile | S | ✅ resolved (2026-07-05 p2) — already FAB-anchored; fixed the reload re-show |
| 2 | 🟠 | StickyCta yields while works-footer controls ("more projects" / making-of doorway) are on screen | Drive-by, CTO | S | 🚫 no change (owner) — see log |
| 3 | 🟠 | Voice entice bubble: auto-dismiss on scroll-past; never in projects/contact | CTO, hiring manager | S | ✅ done (2026-07-05 p2) |
| 4 | 🟠 | One résumé behavior everywhere (open-in-tab) | Hiring manager | S | ✅ done (2026-07-05) |
| 5 | 🟠 | Correspondence email row: wrap or tap-to-expand (match expedition cells) | Non-technical | S | ✅ done (2026-07-05) — chose **wrap** (see log) |
| 6 | 🟠 | `commitHistory.js` generated at build time (`prebuild` from `git log`) | Skeptic dev | M | ✅ done (2026-07-05) |
| 7 | 🟠 | `/making-of` act-level jump strip at the cold open (ids exist already) | Explorer, drive-by | M | ✅ done (2026-07-05 p2) — persistent acts SideRail + mobile Navigate drawer |
| 8 | 🟠 | Dynamic-type pass: verify at 120% font scale; lift sub-11px labels | Older visitors, a11y | M | ◐ verified (2026-07-05) — see log |
| 9 | 🟡 | NDA plates: abstract architecture diagram as the visual | CTO | M | ✅ done (2026-07-05) |
| 10 | 🟡 | De-theme load-bearing control labels in the default voice ("Show 5 more projects") | CTO, drive-by | S | ✅ done (2026-07-05) |
| 11 | 🟡 | `scroll-snap-stop: always` on Experience waypoints | Low-dexterity | S | 🚫 won't do (owner) — multi-card fling is intentional UX |
| 12 | 🟡 | Verify public repo link pre-Beta 2 (Atlas `repo`) | Skeptic dev | S | ✅ done (2026-07-05) |
| 13 | 🟡 | Expedition jargon: nudge the plain voice near the panel / plain labels | Non-technical | S | ✋ dropped (2026-07-05) — see log |
| 14 | 🟡 | Post-unlock sound hint ("change the theme — listen") | Non-technical | S | 🚫 won't do (owner) — let visitors discover it themselves |

**The pattern across personas:** the site's *content* now converts — the
remaining friction is almost entirely **floating chrome discipline** (tips,
bubbles, sticky CTA all competing for the same corners as real controls) and
**trust plumbing** (commit data freshness, repo link, résumé consistency).
Nothing here argues for new features; it argues for fewer interruptions.

---

## 4. Resolution log — 2026-07-05 (pass 1)

Worked the trust-plumbing + CTO/civilian-clarity cluster (items 4, 5, 6, 9, 10,
12, 13) plus the item-8 verification. `npm run lint` / `typecheck` / `build`
all clean; runtime verified via headless CDP (real scrolls + clicks) on `/` and
`/making-of`, no console errors either route.

- **#4 — one résumé behavior (open-in-tab).** All five résumé entry points now
  use `target="_blank" rel="noopener noreferrer"` and dropped `download`:
  [Hero.jsx](../../../../src/sections/Hero.jsx) (already), [Contact.jsx](../../../../src/sections/Contact.jsx),
  the footer in [Layout.jsx](../../../../src/components/Layout.jsx), [StickyCta.jsx](../../../../src/components/StickyCta.jsx),
  and the mobile menu / ⌘K map (already open-in-tab). Verified: 4 rendered `.pdf`
  links all `target=_blank`, no `download`.
- **#5 — correspondence readability.** *Chose wrap, not tap-to-expand.* A first
  pass made every row a tap-to-expand `<button>` and moved navigation onto a
  trailing arrow — but that traded away whole-row tap-to-navigate on **all**
  channels (LinkedIn, GitHub, location) to solve a truncation that only bites the
  email on narrow widths. Net negative, so reverted. Final:
  [Contact.jsx](../../../../src/sections/Contact.jsx) keeps whole-row navigation
  on every channel and the value simply **wraps** (`truncate` → `break-all`) — the
  long email is always fully readable on any width, zero controls added (the
  audit's own "or simply wrap" option). Verified: 3 navigable channel links, email
  value `break-all`.
- **#6 — commit graph generated at build time + shown as CI architecture.**
  (a) [scripts/gen-commit-history.mjs](../../../../scripts/gen-commit-history.mjs)
  regenerates [commitHistory.js](../../../../src/constants/commitHistory.js) from
  `git log --all`, wired as `prebuild`; NON-FATAL on shallow clones (CI/Vercel)
  so it keeps the committed snapshot and never breaks the build; `WINDOW_START`
  stays an editorial choice, every count around it is real. CI now checks out at
  `fetch-depth: 0`. (b) New **`CiPipeline`** ("The Gate") in Act I of the Atelier,
  directly under the commit trail: the real [ci.yml](../../../../.github/workflows/ci.yml)
  as a quiet mono step-chain (checkout → node 24 → npm ci → lint → typecheck →
  build → *merge-ready*), triggers `push → main` / `every pull request`. Data
  mirrors the workflow 1:1 in `constants.atelier.ci`; framing voiced under
  `atelier.ci.*` (all five voices). Verified: 7 steps + pass badge render, no
  errors. (Side effect: lint was already red at HEAD — fixed the pre-existing
  `ThemeWheel` unused import + two `FaceParticles` ref-cleanup warnings so the
  showcased gate is actually green.)
- **#9 — NDA plates get an abstract architecture diagram.** Chose the *procedural
  SVG schematic* approach (owner-selected). New **`NdaSchematic`** draws generic,
  product-agnostic tiers (Client → Web App → Auth/API Gateway → Services/Store,
  auto-flowed) from a per-project `architecture` column spec + shared `ARCH_TIERS`
  label map (EN-only technical labels, no real data — carries "a real platform
  exists" without breaching the NDA). Renders full-bleed on the featured NDA
  plate cover and as a compact banner on the secondary NDA cards, replacing the
  blank serif monogram. Verified: 6 tiers, resolved theme colors (ember
  connectors, readable labels), 546×320 SVG.
- **#10 — de-theme load-bearing controls in the default voice.** `chronicle`'s
  `works.chartMore` / `works.furl` now read "Show N more projects" / "Show fewer"
  (was "Chart N more realms" / "Furl the map"), matching the plain voice and the
  v1.1 Contact-de-theming precedent. Easter-egg voices keep their character.
- **#12 — public repo link.** `atelier.atlas.repo` corrected from `…/3d-portfolio`
  to the owner-confirmed public repo `https://github.com/manan-upadhyay/portfolio`.
- **#13 — expedition jargon. Dropped.** A `PlainNudge` link ("Prefer plain words?")
  under the recap "Reading" grid disrupted the panel's title/layout orientation,
  so it was removed entirely (component, render, CSS, and the `recap.plainNudge`
  keys across all five bundles). The `plain` voice already relabels the whole
  recap (Hardware / Browser & OS) for anyone who selects it; a dedicated nudge
  wasn't worth the layout cost. Left open if revisited with a non-intrusive spot.
- **#8 — dynamic-type verification.** Verified at 120% document font-size on a
  390 px viewport: **0 px horizontal overflow** on `/making-of`. Did **not**
  blanket-lift the ~19 sub-11px labels — most are intentional letter-spaced
  decorative eyebrows, and a true fix is a holistic px→rem conversion (the audit
  itself scopes this 🟠/M as "at minimum verify at 120%"). **Deferred** as its
  own workstream; flagged here for the owner rather than half-done inconsistently.

---

## 5. Resolution log — 2026-07-05 (pass 2)

Worked the floating-chrome cluster (#1, #3), the making-of navigation (#7), and
the owner's calls on #2/#11/#14. Also added always-available Atelier navigation
(a new ask beyond the audit). `lint` / `typecheck` / `build` clean; both rails +
the entice timing verified via headless CDP with real scroll offsets.

- **New — Atelier navigation in the SideRail (both routes).** The `SideRail` is
  now a reusable presentational component fed route-specific `items` + footer
  `actions`. On `/` it keeps the six chapters + the Map action and adds a **quiet
  Making-of doorway** (`nav.makingOf`, a muted-glyph footer action — always
  reachable, never a seventh chapter). On `/making-of` the **same rail** lists the
  Atelier's acts (shared `constants.atelierActs`, active-tracked by a generalized
  `useActiveSection(ids)`) with a quiet "return to the Chronicle" action; the
  desktop top return-doorway is hidden (`md:hidden`) since the rail replaces it,
  mobile keeps it. `MobileMenu` now reuses `atelierActs` too (DRY). Canon updated
  in [CLAUDE.md](../../../../CLAUDE.md). Verified: `/` rail = 6 chapters + Map +
  Making-of; `/making-of` rail = 4 acts + Return, active act highlighted.
- **#7 — making-of act navigation.** Considered done by the above: the acts are
  now reachable from a persistent rail (desktop) and the existing Navigate drawer
  (mobile) — the explorer can jump to any act without committing to the full reel.
  A literal "TOC strip at the cold open" is now redundant, so it wasn't added.
- **#3 — voice entice bubble.** Rewrote the timing
  ([VoiceSwitcher.jsx](../../../../src/components/VoiceSwitcher.jsx)): it now
  **arms only at the Arsenal** (was arsenal *or* projects *or* contact), shows a
  beat later, and **auto-dismisses after 8s** (was ~11s). Reaching Projects or
  Contact drops it immediately — cancelling a still-pending show. Verified: note
  never lingers into projects/contact (polled absent across the projects dwell).
- **#1 — menu coach tip.** Investigated reproducibility. It is **already
  FAB-anchored** (fixed to the bottom-right corner with a tail pointing at the
  FAB — not a mid-scroll floater; the audit's y≈703 reading was just content
  behind that corner), mobile-only (`md:hidden`), and once-per-session. The one
  real defect: the 10s auto-hide didn't persist `menuCoachSeen`, so a **reload
  re-showed it**. Fixed ([MobileMenu.jsx](../../../../src/components/MobileMenu.jsx)):
  auto-hide now also sets the flag. **Repro (before fix):** mobile viewport (<768px)
  · fresh session (new tab / private window) · wait ~2.6s without tapping the FAB
  · the tip shows for ~7.4s; reload the tab → it showed again. The user "couldn't
  reproduce" most likely because they were on desktop (hidden) or had already
  triggered it in-session.
- **#2 — StickyCta over "more projects". No change (owner).** The overlap only
  occurs when the "more projects" button is pinned to the very bottom of the
  viewport; a small scroll fully reveals the works-footer controls. Not worth the
  added yield logic.
- **#11 — `scroll-snap-stop`. Won't do (owner).** Letting a long fling cross
  several Experience cards at once is the intended, non-restrictive UX; forcing a
  stop per card would be the more irritating behaviour.
- **#14 — post-unlock sound hint. Won't do (owner).** Discovering what sound does
  is left to the visitor — no extra nudge.

---

## 6. Remaining observations to act on

The 🟡 per-persona observations from §2 that were **not** in the worklist and are
still open — captured here so nothing is lost. (Everything in §3 is now resolved,
declined, or deferred per the logs above; the only deferred worklist item is the
holistic dynamic-type px→rem pass, #8.)

| # | Priority | Observation | §2 source | Persona | Effort |
|---|---|---|---|---|---|
| R1 | 🟡 | Journey "Oath" card buries the LL.B. (degree + law degree + bar exam in one bullet) — surface the law credential as a quiet second line under the role | 2.2 | Hiring manager | S |
| R2 | 🟡 | "Usually replies within a day" appears twice on the Contact screen (intro + footer sub) — keep one | 2.2 | Hiring manager | S |
| R3 | 🟡 | Arsenal constellation lines only connect ring-siblings — add cross-stack links (React↔Next↔TS) so it reads like a dependency map, not decoration | 2.3 | Skeptic dev | M |
| R4 | 🟡 | Three hero CTAs stack on 390px and push the location line low — consider two on mobile (See my work · Get in touch), résumé stays in the menu | 2.4 | Drive-by | S |
| R5 | 🟡 | Voice Hall "Summon a new voice" doorway is near-invisible next to the discovery counter — give the "all voices found" state a louder invite | 2.6 | Explorer | S |
| R6 | 🟡 | Lens puck "drag over me" hint never reappears after first dismiss — re-show after ~30s idle on the portrait (session-scoped) | 2.6 | Explorer | S |
| — | 🟠 | **Deferred:** holistic dynamic-type pass (px→rem) so browser font-scaling lifts the whole UI, not just verified-safe at 120% (worklist #8) | 2.7 | Older / a11y | M |

**Nothing here is load-bearing for conversion** — R1/R2 are copy polish, R3/R5/R6
are explorer-depth niceties, R4 is a mobile-layout tidy. Good candidates for a
future polish pass, not a blocker for Beta 2.
