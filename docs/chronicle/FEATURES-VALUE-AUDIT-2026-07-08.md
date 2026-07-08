# Features — Discoverability & Value Audit (2026-07-08)

> A feature-by-feature walkthrough of every interactive system across **both
> pages** (`/` and `/making-of`) and **both devices** (desktop + touch), scored
> the way a real first-time visitor would experience them. Companion to the
> [Homepage](HOMEPAGE-VALUE-AUDIT-2026-07-08.md) and
> [Making-Of](MAKING-OF-VALUE-AUDIT-2026-07-08.md) section audits — those judged
> *sections*; this judges *features* that cut across them.
>
> **Method.** This is a rigorous **expert heuristic walkthrough grounded in the
> implementation** — I traced each feature's real surface (how it's triggered,
> what it does, how it degrades on touch / reduced-motion) and role-played the
> four audiences: hiring manager, CTO, developer, normal visitor. It is not
> instrumented usability testing with live participants; where a claim would
> need real users (e.g. "X% never find it"), it's flagged as a hypothesis. The
> live PostHog data (`voice_switcher_open`, `sound_first_play`, `map_open`,
> `atlas_explore`, `observatory_explore`, `egg_reveal`…) is the ground truth to
> confirm these against.

---

## 0. The lens

For each feature, six questions:

1. **Real-user feeling** — what does it *feel* like the first time?
2. **Ease of finding** (discoverability) — will they know it exists?
3. **Ease of using** — once found, is it obvious how to operate?
4. **Value** — does it advance the goal (feel his craft → hire) or is it play?
5. **Noise** — does it cost attention/clarity out of proportion to its payoff?
6. **Visibility** — is it advertised, ambient, or hidden by design?

Then **action items**. Ratings: ●●● high · ●●○ medium · ●○○ low.

**The single theme that recurs across almost every feature: discoverability, not
quality.** The features are, with few exceptions, *beautifully built and
tasteful*. The repeated failure mode is that a visitor never learns they exist —
and on mobile, where the whole control layer hides behind one FAB, this is
acute. **The highest-leverage work on this site is surfacing what already
exists, not building more.**

---

## 1. Scorecard (all features, at a glance)

| Feature | Find | Use | Value | Noise | Visibility | Headline action |
|---|:--:|:--:|:--:|:--:|:--:|---|
| Theme / Sky switcher | ●●● | ●●● | ●●○ | ●○○ | Advertised | Keep; it's the model |
| Astrolabe (hero) | ●●○ | ●●○ | ●●● | ●○○ | Ambient | Keep; signature |
| Sound engine + cues | ●○○ | ●●○ | ●●○ | ●●○ | Hidden-ish | Fix first-run invitation |
| Voice switcher | ●●○ | ●●● | ●●○ | ●○○ | Advertised (desktop) | Keep; surface on mobile |
| Voice Hall (⇧⌘V) | ●○○ | ●●● | ●●○ | ●○○ | Hidden | Lean on the switcher CTA, not the shortcut |
| Sealed voices / clue unlock | ●○○ | ●●○ | ●●○ | ●●○ | Hidden by design | Keep as game; watch the noise |
| Realm map (⌘K) | ●○○ | ●●● | ●●○ | ●○○ | Hidden | Add a visible affordance |
| Face portrait + lens/gyro | ●○○ | ●●○ | ●●○ | ●○○ | Hidden (coda) | Keep; it's a coda delight |
| Expedition Recap | ●●● | ●●○ | ●●○ | ●●● | Advertised (bottom of `/`) | **Move to `/making-of`; drop/gate IP** |
| Arsenal orbital | ●●● | ●●○ | ●●○ | ●●○ | Advertised | Legibility at rest (see homepage §2.03) |
| Codebase Atlas | ●●● | ●●● | ●●● | ●○○ | Advertised (coda) | Keep; strong for the audience |
| Observatory | ●●● | ●●○ | ●●○ | ●●● | Advertised (coda) | Cut the 39-chip index |
| Commit graph | ●●● | ●●● | ●●○ | ●○○ | Advertised (coda) | Keep; demote per making-of audit |
| Marginalia (flavor↔fact) | ●○○ | ●●○ | ●●○ | ●○○ | Hidden | Keep; make the first one obvious |
| Field Guide (egg index) | ●●● | ●●● | ●●● | ●○○ | Advertised (coda) | The *correct* pattern — see §14 |
| Micro-moments (cursor/magnet/kinetic) | ●●○ | ●●● | ●●○ | ●○○ | Ambient | Keep; desktop-only, fine |
| Persona Triptych | ●●● | ●●● | ●●● | ●○○ | Advertised (coda) | Keep |
| SideRail / StickyCta | ●●● | ●●● | ●●● | ●○○ | Advertised | Keep |
| Mobile menu (the FAB) | ●●○ | ●●● | ●●● | ●○○ | Advertised | It's load-bearing — see §18 |

---

## 2. Theme / Sky switcher

- **What:** a top-right `DayNightToggle` (sun/moon flip) + a labelled **Sky**
  pill opening a 5-mode menu (Auto/Dawn/Day/Dusk/Night). `Auto` reads local time
  via SunCalc. On mobile the flip stays top-right; the full picker becomes the
  radial `ThemeWheel` inside the menu.
- **Real-user feeling:** familiar and delightful — everyone recognizes a
  day/night toggle, and "it's dawn because it's actually dawn where you are" is a
  quiet wow.
- **Find ●●● / Use ●●● / Visibility Advertised.** This is the **best-surfaced
  feature on the site** and the file even documents why: labelling it drove ~9×
  the usage of an icon-only control. It is the model every other control should
  copy.
- **Value ●●○ / Noise ●○○.** Genuine polish signal; low cost. The 5 modes are
  slightly more than most need (Auto + light/dark carries 90%), but the menu
  hides the surplus well.
- **Action:** **Keep, unchanged.** Use it as the template argument for surfacing
  the Sound and Voice controls on mobile.

## 3. Astrolabe (hero instrument)

- **What:** a living Canvas2D astrolabe; the needle follows the cursor, a spin
  button (desktop rim / whole-instrument tap on mobile) flicks it into a
  friction-decayed free-spin, and its speed drives a synced gear sound. A
  one-time first-unlock spin auto-plays when audio unlocks with the hero in view.
- **Real-user feeling:** the ten-second "this person is different" moment. The
  free-spin with real flywheel decay is genuinely tactile.
- **Find ●●○ / Use ●●○.** The instrument is unmissable *as art*; that it's
  *interactive* is less obvious — desktop gets a pulsing spin button (good),
  mobile gets a one-time "tap to spin" hint. The passive needle-follow is a
  subtle reward most won't consciously notice.
- **Value ●●● / Noise ●○○.** Highest-value signature moment; honest
  (aria-hidden, reduced-motion frozen).
- **Action:** **Keep.** Optional: make the desktop interactivity a hair more
  discoverable (the pulsing ring already helps). Don't over-signpost — some of
  its magic is that it rewards the curious.

## 4. Sound engine + all cues

- **What:** a Web-Audio system (0 bytes shipped) — hero watch-gear, arsenal space
  hum, timeline key-clicks, orbit/observatory blips + pentatonic notes, the raven
  flight on contact success, plus the volume control. Gesture-unlocked,
  default-on, reduced-motion-muted. Desktop control = a circle that morphs into a
  vertical volume "liquid" capsule on hover; mobile = the `VolumeDial` in the menu.
- **Real-user feeling:** for those who find it, a rare "this site has a
  *soundtrack* that responds to me" delight. The context-aware button (first
  press *is* the unlock, never an accidental mute) is a genuinely senior UX
  detail.
- **Find ●○○ — the weak link / Use ●●○ / Visibility Hidden-ish.** Browser
  autoplay policy means sound is **silent until a gesture**, so most visitors
  never hear it unless the coachmark lands. Desktop shows an armed-state
  coachmark + a "primed" pulse; mobile buries it entirely behind the FAB (dot +
  one-time tip). The most magical layer of the site is the least discoverable.
- **Value ●●○ / Noise ●●○.** High delight, but *noise* is real: it's a large
  system to maintain, and un-found sound is pure cost. On a professional
  portfolio, some evaluators also actively distrust auto-sound.
- **Action:** **Fix the first-run invitation, don't add more cues.** Make the
  single "hear the site?" moment unmissable (once), then never nag. Consider
  whether the arsenal *hum* (ambient, not intent-rewarding) earns its keep — it's
  the one cue that's texture rather than reward. Confirm `sound_first_play` rate
  in PostHog; if it's low, this is the highest-value discoverability fix on `/`.

## 5. Voice / narration switcher

- **What:** bottom-right "Persona" pill (masks glyph + label) → popover of open
  voices + a teaser of sealed ones + a CTA into the Hall. A one-time scroll-armed
  "entice" note fires at the Arsenal. Switching re-voices the entire site's copy.
- **Real-user feeling:** "wait, I can read this whole site as *Dwight*?" — a
  real, memorable surprise, and a flex (it proves the whole copy layer is
  data-driven).
- **Find ●●○ / Use ●●● / Visibility Advertised (desktop only).** The labelled
  pill + the timed entice note give it a fair shot on desktop. On mobile it's
  inside the FAB → Voice drawer, far less visible.
- **Value ●●○ / Noise ●○○.** Distinctive craft signal; the popover is tidy
  (teaser, not the full roster). The risk: to a *hiring* audience it can read as
  a toy rather than proof — its value is "look how cleanly this is architected,"
  which lands best on developers/CTOs.
- **Action:** **Keep. Raise mobile visibility** (the `MobileVoiceMark` ambient
  mark helps — verify it actually pulls opens). Ensure the entice note fires
  before the conversion sections, which the code already guards.

## 6. Voice Hall (⇧⌘V)

- **What:** the full searchable, category-grouped voice picker + a gamified
  "Summon a voice" request form (posts via the raven endpoint). Opened by ⇧⌘V,
  the switcher CTA, or the map.
- **Real-user feeling:** for the engaged, a "whole *casting hall*" moment that
  makes the voice feature feel deep rather than gimmicky.
- **Find ●○○ / Use ●●●.** The **⇧⌘V shortcut is effectively undiscoverable** —
  nobody guesses it. Its real front door is the switcher popover's CTA, which is
  fine. Treat the shortcut as a power-user nicety, not a discovery path.
- **Value ●●○ / Noise ●○○.** Good depth for those who opt in; costs nothing to
  those who don't (it's an overlay).
- **Action:** **Keep.** Don't rely on the shortcut for discovery — the CTA chain
  (switcher → Hall) is the real path and it works. The "Summon a voice" form is a
  charming engagement hook; keep it.

## 7. Sealed voices / clue-unlock game

- **What:** easter-egg voices shown as locked rows with an iconic quote + a
  "Clue —" line; tap to reveal an inline answer field (or type the answer
  anywhere). Unlocks persist.
- **Real-user feeling:** a treasure-hunt for the playful; invisible to everyone
  else (by design).
- **Find ●○○ (intentional) / Use ●●○.** The inline `ClueUnlock` field made it
  work without a hardware keyboard (good fix — it was a dead tap before).
- **Value ●●○ / Noise ●●○.** Delightful for the target 5%; the *noise* is that
  the popover carries clue copy + a discovery counter that a hiring manager
  scanning for "how do I contact him" has to look past.
- **Action:** **Keep as a game.** Watch that the sealed-voice apparatus never
  crowds the *open* voices in the popover (the `POPOVER_SEALED_LIMIT` cap already
  guards this). This is play — keep it off the critical path, which it is.

## 8. Realm map (⌘K overlay)

- **What:** a full-screen map plate pinning the six chapters on a wandering
  trail; click a pin to travel; carries quick actions (résumé, GitHub, LinkedIn,
  voices, theme). Opened by ⌘K, the SideRail Map action, or the mobile menu's
  Navigate drawer.
- **Real-user feeling:** a "command palette meets treasure map" moment — premium
  and on-theme.
- **Find ●○○ / Use ●●●.** The **SideRail "Map ⌘K" action is the visible door**
  (good), but the map itself is a hidden overlay; the ⌘K shortcut is power-user
  only. On mobile it's the Navigate drawer, which is a plain (faster) chapter
  list — arguably the map's value is diluted there.
- **Value ●●○ / Noise ●○○.** Nice-to-have navigation + a real "wow." It's not on
  the critical path (scrolling works), so low cost.
- **Action:** **Keep.** The SideRail label already advertises it; make sure that
  label reads as clearly clickable. Don't over-invest — it's a delight, not a
  necessity.

## 9. Face portrait + desktop lens / mobile gyro

- **What:** (making-of coda) a Canvas2D portrait assembled from glyphs; desktop
  has a cursor-driven "lens" (magnify/scan), mobile has a **draggable physics
  puck + gyro tilt** with a one-time "drag me" hint that re-invites after 30s.
- **Real-user feeling:** a quiet, human "the maker, built from the same
  characters that built the site" beat — earns a smile at the very end.
- **Find ●○○ / Use ●●○.** It lives at the bottom of the coda, so only the most
  engaged reach it — appropriate. The lens/gyro interactivity is a bonus most
  won't trigger, and that's fine.
- **Value ●●○ / Noise ●○○.** Pure craft/delight; performance-honest (assembles
  once, then stops — no idle cost).
- **Action:** **Keep, unchanged.** It's a coda flourish in exactly the right
  place. Don't promote it to `/`.

## 10. Expedition Recap — **the one to move**

- **What:** at the foot of Contact on `/`, an instrument that reads the visitor
  (GPU/OS/battery/network, a device sigil, a sun arc, a persisted visit counter,
  a sealed-voice constellation) **plus one opt-in IP-geolocation lookup** for
  city/coords.
- **Real-user feeling:** the biggest "how does it *know* that?" wow on the site —
  *and*, for a wary evaluator on the business page, a flicker of "why is my
  portfolio-reviewer reading my location?"
- **Find ●●● / Use ●●○ / Visibility Advertised (but post-conversion).** It's
  impossible to miss — which is the problem: it's a heavy toy *after* the contact
  CTA, on the money page.
- **Value ●●○ / Noise ●●● — highest noise-cost feature on `/`.** Detailed in the
  [Homepage audit §2 Recap](HOMEPAGE-VALUE-AUDIT-2026-07-08.md): placement is
  post-conversion, it carries a surveillance-creep read on the business page, and
  it directly contradicts the making-of's "instrumented, **not surveilled**"
  Observatory boast.
- **Action (P0):** **Move it to `/making-of`** where the creep is charming and it
  isn't stealing a CTA — *or* keep it and hard-gate the IP lookup behind a
  visible consent, *or* drop the IP call and keep the device-sigil delight. This
  is the headline decision across all three audits.

## 11. Arsenal orbital (skill field)

- **What:** three concentric rings of skill nodes revolving at different speeds;
  hover lights a node + draws constellation links + plays an arpeggio; brightness
  = mastery tier. Mobile → grouped cluster cards.
- **Real-user feeling:** "a solar system of his skills" — beautiful; but also, if
  you're just checking "does he know X," a moving target you have to chase.
- **Find ●●● / Use ●●○ / Noise ●●○.** Unmissable as a section; the *reading* of
  it fights the rotation. Tellingly the mobile cluster fallback is more legible.
- **Value ●●○.** Skills matter, and the mastery tiering is a smart signal; the
  orbital is more "moment" than "information."
- **Action:** See [Homepage §2.03](HOMEPAGE-VALUE-AUDIT-2026-07-08.md) — make
  primaries legible at rest, park rotation on hover so reading never chases.

## 12. Codebase Atlas (making-of)

- **What:** a keyboard-navigable, annotated map of the real repo; each node
  explains *why it sits where it does* ("swappable by design," "zero audio bytes
  shipped"); "Start here" hotspots + full-tree walk; links to the source.
- **Real-user feeling:** for a developer/CTO, the single most convincing artifact
  on the site — architecture literacy you can *see*. "The component rendering
  this map is in the map" is a real delight.
- **Find ●●● / Use ●●● / Value ●●● / Noise ●○○.** Excellent across the board *for
  the audience that reaches the coda*. Opaque to non-devs, but that's an
  acceptable trade on an opt-in page.
- **Action:** **Keep.** Ensure it opens on the hotspots rail (curated), not an
  intimidating full tree.

## 13. Observatory (making-of)

- **What:** a constellation of ~39 real analytics events orbiting a hub + a
  metric strip + 3 capability panels; "instrumented, not surveilled" POV.
- **Real-user feeling:** the *idea* lands ("he instruments thoughtfully and
  respects privacy"); the *39-chip index* exhausts.
- **Find ●●● / Use ●●○ / Noise ●●●.** The living constellation is a moment; the
  always-visible event-name enumeration is noise nobody reads.
- **Action:** See [Making-Of §2.5](MAKING-OF-VALUE-AUDIT-2026-07-08.md) — keep
  the instrument + POV + panels, collapse the 39 chips to 4 group counts, trim
  the metric strip.

## 14. Field Guide (the egg index) — the pattern to copy

- **What:** (making-of) a list of the 10 hidden interactions, each with a "how"
  reveal and a **"Show me"** button that jumps to the real feature.
- **Why it matters here:** this is the **one place the site solves its own
  discoverability problem** — it takes the hidden layer and makes it *findable
  and demonstrable*. Find ●●● / Use ●●● / Value ●●●.
- **Action:** **Keep — and steal the idea.** The lesson for the whole site: the
  Field Guide proves that a small, honest "here's what's hidden, tap to try it"
  surface converts hidden features into discovered ones. The homepage has no
  equivalent; consider whether a *tiny* version of this (or the entice notes
  doing their job) could rescue the sound/voice discoverability gap on `/`.

## 15. Marginalia (flavor↔fact annotations)

- **What:** inline underlined terms in prose (About, Works highlights) that
  reveal a "here's the literal truth behind the flavor" note (`Annotated`).
- **Real-user feeling:** a rewarding "oh, there's a real fact under the poetry"
  for the reader who hovers.
- **Find ●○○ / Use ●●○ / Noise ●○○.** Subtle to a fault — many never notice the
  affordance. Low cost, nice reward.
- **Action:** **Keep; make the *first* one obviously interactive** (a one-time
  shimmer or clearer underline) so visitors learn the affordance exists, then let
  the rest be quiet.

## 16. Micro-moments (contextual cursor, Magnet buttons, kinetic headings)

- **What:** desktop-only touches — the custom cursor/backlight (`Cursor`,
  `data-cursor="hover"`), magnetic pull on key CTAs (`Magnet`), scroll-reveal and
  kinetic headings.
- **Real-user feeling:** ambient "this is polished" texture; rarely conscious,
  cumulatively convincing.
- **Find ●●○ / Use ●●● / Noise ●○○.** Correctly suppressed on touch/coarse
  pointers and reduced-motion. Zero discoverability burden — they're felt, not
  found.
- **Action:** **Keep.** These are the cheap, correct kind of delight. Just keep
  honoring `(hover:none)` / reduced-motion (the code does).

## 17. Persona Triptych & Commit graph (making-of coda + build)

- **Persona Triptych:** three expandable sides of the person (storyteller /
  filmmaker / wanderer). Find ●●● / Use ●●● / Value ●●● — the human payoff, well
  placed. **Keep.**
- **Commit graph:** real git heatmap + stats. Find ●●● / Use ●●● / Value ●●○ —
  honest but an 11-day burst reads "sprint," and the contribution-graph is a
  cliché. **Keep but demote** (see Making-Of audit §2.1).

## 18. The Mobile Menu itself (the load-bearing FAB)

- **What:** the single bottom-right FAB that, on touch, *is* the entire control
  layer — Site-feel (ThemeWheel + VolumeDial), Primary (Contact + Résumé),
  Explore (Navigate + Voice), plus the other-route doorway. Bottom-sheet with
  swipe-to-dismiss and in-sheet drawers.
- **Real-user feeling:** once opened, an iOS-grade, thumb-friendly control center
  — genuinely well made (swipe-down, grabber, sticky footers, no clipping).
- **Find ●●○ / Use ●●● / Value ●●●.** The *sheet* is excellent. The problem is
  everything upstream of it: it is the **sole gateway** to sound, sky-modes, and
  voice on mobile, so if the one-time coach-tip is missed, that entire layer is
  invisible.
- **Noise ●○○** inside; but it concentrates all discoverability risk into one
  tap.
- **Action (P1):** **Raise the FAB's first-run signal** — the coach-tip is the
  only thing standing between a mobile visitor and the entire wonder layer. Make
  it unmissable once (and consider labelling the primed state), then never nag.
  The Primary CTAs (Contact/Résumé) being top-weighted in the sheet is correct —
  keep that.

---

## 19. Cross-cutting findings

**A. Discoverability is the site-wide bottleneck, not quality.** Of 19 features,
the ones rated low on *finding* (sound, Voice Hall, sealed voices, map,
marginalia, face lens) are almost all *high* on quality. The site's best work is
routinely hidden. **The Field Guide (§14) is proof the team can solve this** —
extend that instinct to `/`.

**B. Keyboard shortcuts are not a discovery channel.** ⌘K (map) and ⇧⌘V (hall)
are invisible to ~everyone. They're fine as power-user accelerants, but every one
of them must have a *visible* door too (map has the SideRail; the Hall has the
switcher CTA — good). Never let a shortcut be the *only* way in.

**C. Mobile concentrates all control-discovery into one FAB.** Sky/Voice/Sound
are three advertised pills on desktop and *zero* visible affordances on mobile
(bar the day/night flip). This is the biggest device gap on the site (see
[Homepage §2.5](HOMEPAGE-VALUE-AUDIT-2026-07-08.md)). Fix the FAB's first-run
invitation before anything else on touch.

**D. Two features carry disproportionate noise:** the **Expedition Recap** (heavy
+ creepy on the money page → move it) and the **Observatory 39-chip index** (→
collapse it). Everything else is proportionate.

**E. The "instrumented, not surveilled" contradiction.** The making-of brags
about *not* surveilling; the homepage's Recap does an IP-geolocation lookup.
Resolve the values conflict (§10) — it's the kind of inconsistency a sharp CTO
notices.

---

## 20. Consolidated action board

| Pri | Feature | Action |
|-----|---------|--------|
| P0 | Expedition Recap | Move to `/making-of` (pref) / hard-gate or drop the IP lookup |
| P0 | Observatory | Collapse the 39-chip index to 4 group counts |
| P1 | Sound first-run | Make the one-time "hear the site?" invitation unmissable (desktop + the mobile FAB tip); don't add cues |
| P1 | Mobile FAB | Raise the first-run coach-tip's visibility — it gates the entire wonder layer |
| P1 | Voice on mobile | Verify `MobileVoiceMark` actually pulls opens; strengthen if not |
| P1 | Arsenal orbital | Primaries legible at rest; park rotation on hover |
| P2 | Realm map | Ensure the SideRail "Map" label reads as clearly clickable |
| P2 | Marginalia | Make the first annotation visibly interactive, then quiet |
| P2 | Astrolabe | Slightly stronger "it's interactive" cue on desktop |
| P3 | Arsenal hum | Question whether the ambient (non-reward) cue earns its keep |
| — | Sky switcher, Codebase Atlas, Field Guide, Persona Triptych, micro-moments, SideRail | Keep — these are the models |

---

## 21. The one-line thesis

**The features are not the problem — finding them is.** This site's craft is
consistently higher than its discoverability, so the win isn't building more
wonder, it's *surfacing the wonder that's already here* — fix the sound/voice
first-run on both devices, rescue mobile from the single-FAB blind spot, and move
the one show-off instrument (the geolocating Recap) off the money page. The Field
Guide already shows the team knows how to make hidden things findable; apply that
everywhere.
