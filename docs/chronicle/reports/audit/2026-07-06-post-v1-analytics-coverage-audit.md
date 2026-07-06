# Post-v1 Analytics Coverage Audit

> **Date:** 2026-07-06 · **Scope:** every section, feature, theme, voice,
> interaction, and mobile surface built **after v1 (the `main` branch)** — to
> guarantee each has *meaningful* analytics before we plan **V3**.
> **Method:** diff `HEAD` vs `main` for new files → cross-reference every
> component/section/hook against `track()`/`trackOnce()` call sites → classify
> each as **covered / gap-fixed / intentionally-untracked**. Companion doc:
> [ANALYTICS.md](../../ANALYTICS.md) (the live catalog). Instrumentation lives in
> [`src/lib/analytics.js`](../../../../src/lib/analytics.js).

---

## 0. TL;DR

- The analytics foundation is **strong**: ~45 named product events, a
  one-row-per-visit `session_recap`, and **21 super-properties** on every event.
- **The biggest win was already in place:** `input_type` (coarse/fine) +
  `device_touch` ride on every event → **all analytics are natively sliceable by
  mobile vs desktop**, no duplication required.
- **6 gaps found and fixed this pass** (features that shipped after v1 with *zero*
  telemetry): the **mobile bottom-sheet menu open**, **Marginalia footnotes**,
  the **Codebase Atlas**, and the **Observatory** — plus mobile-drawer views.
- A short list of **intentionally-untracked** decorative bits (with rationale).
- **All 10 voices** (incl. the GoT & Avengers ensembles) are already covered
  generically via `voice_selected{voice}` / `voice_unlocked{voice}`.

---

## 1. What shipped after v1 (diff vs `main`)

New files: `MobileMenu`, `StickyCta`, `ThemeWheel`, `VolumeDial`, `VoiceRequest`,
`CiPipeline`, `CommitGraph`, `NdaSchematic`, `commitHistory.js`, and 5 new voice
bundles (`got`, `avengers`, `deadpool`, `yoda`, `chandler`). On top of that, many
pre-existing-but-post-v1 features were expanded: the **Voice system** (10 voices,
Voice Hall, summon form, clue-unlock), the **5-mode sky/theme** system, the
**interactive sound** system, the **Atelier** route (`/making-of`) with the
**Codebase Atlas**, **Observatory**, **PersonaTriptych**, **FaceParticles**,
**Marginalia** footnotes, the **ExpeditionRecap**, and the mobile experience.

---

## 2. Coverage matrix

Legend: ✅ covered before this audit · 🟢 **gap fixed this pass** · ⚪ intentionally
untracked (rationale in §4).

| Surface / feature | Event(s) | Status |
|---|---|---|
| **Navigation** — hero CTAs, section views, scroll depth, rail nav | `hero_cta`, `section_view`, `scroll_depth`, `rail_nav` | ✅ |
| **Map** (⌘K) — open, travel, channels, resume | `map_open`, `map_travel`, `channel_open`, `resume_open` | ✅ |
| **Keyboard power-users** — ⌘K / ⇧⌘V | `shortcut_used` | ✅ |
| **Mobile bottom-sheet menu — OPEN** | `mobile_menu_open` | 🟢 |
| **Mobile menu — in-sheet drawers** (Navigate/Persona/Summon) | `mobile_menu_view {view}` | 🟢 |
| **Mobile menu — CTAs** (contact/resume/home) + travel | `mobile_menu_cta`, `map_travel{from:mobile}` | ✅ |
| **Astrolabe** — spin button, free-spin drag | `astrolabe_spin`, `astrolabe_drag` | ✅ |
| **Sound** — first cue, master toggle | `sound_first_play`, `sound_toggled` | ✅ |
| **Theme / sky** — 5 modes (auto+4) | `theme_changed {mode, sky}` | ✅ |
| **Voices** — all 10, switch/unlock/menu/hall | `voice_selected{voice}`, `voice_unlocked{voice}`, `voice_switcher_open`, `voice_hall_open` | ✅ |
| **Voice unlock funnel** (clue path, mobile) | `voice_clue_solved/_revealed/_miss` | ✅ |
| **Summon-a-voice** request form | `voice_summon_submit/_success/_error` | ✅ |
| **Marginalia** — flavor↔fact footnote reveal | `marginalia_reveal {id}` | 🟢 |
| **Arsenal** — skill-orbit exploration | `arsenal_tools_hovered {count}` | ✅ |
| **Works** — carousel, links, story, show-all | `carousel_open`, `project_link_open`, `project_story_open`, `works_show_all` | ✅ |
| **Atelier route** — reached, scroll depth, enter/exit | `atelier_view`, `atelier_scroll_depth`, `making_of_enter/_exit` | ✅ |
| **Codebase Atlas** — explored / which nodes | `atlas_explore`, `atlas_node_open {id}` | 🟢 |
| **Observatory** — constellation explored | `observatory_explore` | 🟢 |
| **PersonaTriptych** — card expand | `persona_card_expand {persona}` | ✅ |
| **ExpeditionRecap** — reached | `expedition_view` | ✅ |
| **Sticky CTA** — shown/click/dismiss | `sticky_cta_shown/_click/_dismiss` | ✅ |
| **Footer** — CTAs | `footer_cta {target}` | ✅ |
| **Contact** ⭐ — form start/submit/success/error, email copy | `contact_form_start/_submit/_success/_error`, `email_copied` | ✅ |
| **Session** — per-visit summary + short-session heartbeats | `session_recap`, `session_heartbeat` | ✅ |

---

## 3. Gaps fixed this pass (the 6)

All follow the house discipline: **first-interaction / once-per-session, never
per-frame.**

1. **`mobile_menu_open`** ([MobileMenu.jsx](../../../../src/components/MobileMenu.jsx)) —
   the single most important missing signal. The sound / theme / voice controls
   live **only** in this sheet on mobile, so "do mobile users even open it?" was
   previously unknowable. Fires on every open (FAB, coach-tip, or `ui:open-menu`).
2. **`mobile_menu_view {view}`** — which in-sheet drawer (Navigate / Persona /
   Summon) they enter.
3. **`marginalia_reveal {id}`** ([Marginalia.jsx](../../../../src/components/Marginalia.jsx)) —
   `trackOnce` per distinct note. Answers "does anyone *discover* the
   flavor↔substance footnotes?" — a signature feature whose adoption was a black box.
4. **`atlas_explore`** + **`atlas_node_open {id}`** ([CodebaseAtlas.jsx](../../../../src/components/CodebaseAtlas.jsx)) —
   did anyone open the codebase explorer, and which files/dirs draw interest.
5. **`observatory_explore`** ([Observatory.jsx](../../../../src/components/Observatory.jsx)) —
   did anyone explore the analytics constellation.

Catalog + counts in [`constants/index.js`](../../../../src/constants/index.js)
(`atelier.observatory`) updated to match: **events 33→45**, **superProps 13→21**.

---

## 4. Intentionally NOT tracked (and why)

Not every pixel deserves an event — over-tracking makes dashboards unreadable
(the [analytics.js](../../../../src/lib/analytics.js) discipline). Deliberately
left uninstrumented:

- **FaceParticles** mobile drag / gyro-tilt — decorative portrait interaction;
  complex canvas physics, negligible decision value. (The *route* it lives on is
  covered by `atelier_view` / `atelier_scroll_depth`.)
- **VolumeDial** level changes — `sound_toggled` + `sound_first_play` already
  capture sound *adoption*; the exact volume a user drags to won't drive a V3
  decision.
- **SkyControl / ThemeWheel** menu-open — the *outcome* (`theme_changed{mode,sky}`)
  is what matters and is fully tracked; the menu-open itself is redundant.
- **Cursor, Magnet, Hovercard, RavenBurst, CompassRose, MapDivider, SunArc,
  CommitGraph, CiPipeline, NdaSchematic** — presentational / one-shot visuals with
  no user *choice* to measure. (RavenBurst's trigger, a successful send, *is*
  tracked via `contact_success`.)

If any of these become a V3 question, they're a one-line `trackOnce` away.

---

## 5. Recommended PostHog dashboards for V3 decisions

Everything below is buildable with **zero code** (breakdown by any super-property):

1. **Mobile vs desktop split** — any funnel/trend, *breakdown by* `input_type`.
   First question to answer: does the mobile menu get opened, and does mobile
   convert? (`mobile_menu_open` → `contact_success`, filtered `input_type=coarse`.)
2. **Voice adoption & the pinned trio** — `voice_selected` *breakdown by* `voice`;
   `voice_unlocked` *breakdown by* `voice`. Validates the Scott/GoT/Avengers pin
   and shows which sealed voices are *never* found (candidates to re-hint or cut).
3. **"Wonder" feature adoption** — a single Trends bar of `marginalia_reveal`,
   `atlas_explore`, `observatory_explore`, `astrolabe_spin`, `sound_first_play`,
   `persona_card_expand`. **This is the V3 keep/cut ledger:** anything with
   near-zero adoption is a candidate to cut or resurface.
4. **Atelier depth** — `making_of_enter` → `atelier_scroll_depth` → `atlas_explore`
   /`observatory_explore`. Does anyone go deep behind the curtain?
5. **Conversion funnel** ⭐ (unchanged) — `$pageview` → `section_view(contact)` →
   `contact_form_start` → `contact_submit` → `contact_success`, split by device.
6. **Sealed-voice discovery funnel** — `voice_switcher_open`/`voice_hall_open` →
   `voice_clue_miss` → `voice_unlocked`. Are the (now-easier) hints working?

---

## 6. Verification

- `npm run build` clean after all instrumentation.
- New events grep-confirmed wired: `marginalia_reveal`, `mobile_menu_open`,
  `mobile_menu_view`, `atlas_explore`, `atlas_node_open`, `observatory_explore`.
- No per-frame / hot-path events introduced (all `trackOnce` or discrete clicks).
- Privacy unchanged: cookieless, anonymous, DNT-respecting — new events inherit
  the same guarantees (they no-op when analytics is disabled).

---

## 7. Second pass — owner request list (signal vs. noise)

A follow-up review of a specific list, with an **honest signal/noise verdict** on
each (the brief was explicitly: *real data, not vanity; push back on noise*).

**Already covered — no change:**

| Ask | Covered by |
|---|---|
| All new voices (GoT, Avengers, Yoda, Chandler…) | `voice_selected{voice}`, `voice_unlocked{voice}` |
| Voice Hall opened | `voice_hall_open` |
| Which project full details viewed | `project_story_open{project}` |
| Voice hint tried (success/fail/popular) | `voice_clue_solved/_revealed/_miss{voice}` |
| Which CTAs used most (hero/footer/resume/socials/contact) | `hero_cta`, `footer_cta`, `mobile_menu_cta`, `sticky_cta_click` (all `{target}`) + `channel_open{channel,from}` + `resume_open{from}` — rank by breakdown |
| Making-of links from map + side rail | `making_of_enter{from: map\|rail}` |

**Added this pass:**

| Ask | Event added | Verdict |
|---|---|---|
| Experience horizontally scrolled — how much? | `experience_progress{pct}` (25/50/75/100) | ✅ real — do people finish the journey? bounded, 4 max |
| Which shipped/cut items expanded | `ledger_expand{id,kind}` | ✅ real — bounded (~11) |
| Which hidden features expanded / "show me" used | `egg_reveal{id}` + `egg_show{id}` | ✅ real — curiosity vs. try-intent; bounded (9) |
| Making-of from the footer link | `making_of_enter{from:'footer'}` | ✅ real gap fixed — was the only untracked entry |
| FaceParticles lens dragged (mobile) | `portrait_interact{mode:'drag'}` (once) | ✅ clean — unambiguous intent, deduped |
| Gyro used for the lens | `portrait_interact{mode:'gyro'}` (once) | ✅ clean — fires only on real sensor data, deduped |

**Argued against — NOT added (would be noise):**

- **FaceParticles hovered on desktop.** On desktop the lens simply *follows the
  cursor*, so a "hover" fires whenever the mouse crosses the portrait during a
  normal scroll. Even deduped, it **conflates "cursor grazed it" with "played with
  it,"** inflating the engagement number — the opposite of real data. Left out.
  (If a desktop signal is ever wanted, add it as a *separate* `mode:'hover'` so it
  can never contaminate the drag/gyro intent numbers.)

**Current-analytics noise audit (requested):** the existing events are lean, not
vanity — `trackOnce` discipline + `session_recap` aggregation means nothing fires
per-frame, and every event maps to a real question. The per-occurrence events
(`astrolabe_spin`, `theme_changed`, `atlas_node_open`, `mobile_menu_view`) are all
user-initiated and bounded, and roll up into counts. **Nothing recommended for
removal.**

Catalog after both passes: **events 33 → 50**, **superProps 13 → 21**.
