# Making-Of — Value vs. Noise Audit (2026-07-08)

> A blunt, per-section pass over the entire `/making-of` (Atelier) page: what
> earns attention, what is noise, what to do about it, and how to re-order for
> impact. Same lens throughout — **not** "we built it, so keep it." We keep only
> what a real visitor will find valuable and understand.
>
> Companion to [V2.0-FEEDBACK-PASS](V2.0-FEEDBACK-PASS.md) and
> [WONDER-AUDIT-2026-07](WONDER-AUDIT-2026-07.md). Source of truth for the
> making-of prune/reorder decisions below.

---

## 0. The frame that governs every verdict

Two facts change the bar for this page specifically:

1. **The audience is self-selected.** `/making-of` is an off-spine coda. Nobody
   lands here by accident — they arrived via the doorway at the foot of The
   Realms or the footer. So the visitor is already your most engaged slice: the
   curious developer, the CTO doing diligence, the hiring manager who liked the
   front door. That earns *depth* the homepage could never justify.

2. **It does not earn the right to exhaust them.** Engaged ≠ infinite patience.
   Fatigue here costs you your **best-qualified** leads — the ones worth the
   most. Every widget that doesn't pull its weight pushes the payoff (the human
   close) further out of reach.

**The criteria, applied to every item below:**
- **Value** — does it make one of {hiring manager, CTO, developer, normal
  visitor} think *"this person is unusually good"*? Is it interactive, personal,
  or surprising — a *moment*, not a list?
- **Noise** — generic/table-stakes, non-interactive, jargon only the author
  parses, or a number nobody can feel.
- **Action** — keep / trim / cut / move.

**The single most important number on this page:** the count of distinct
"instruments" a visitor must process. Today it is **ten** (Commit Trail, The
Gate, Tally, Ledger, Observatory, Codebase Atlas, Field Guide, Built-with,
Persona Triptych, Face portrait). Ten well-built moments is still a marathon.
The biggest win available is **getting to eight** by cutting the two weakest —
before touching anything else.

---

## 1. Current structure (render order)

| # | Act | Item | Component |
|---|-----|------|-----------|
| — | Cold open | Eyebrow + "How the map was drawn" + confession + faint astrolabe | `HeroInstrument` |
| 1 | **I — The Build** | The Commit Trail (git heatmap + 4 stats) | `CommitGraph` |
| 2 | I | The Gate (CI pipeline) | `CiPipeline` |
| 3 | I | The Tally (4 headline figures) | `Tally` |
| 4 | I | Built / Cut ledger | `LedgerEntry` |
| 5 | **II — Engine Room** | The Observatory (event constellation + 5 metrics + 3 panels) | `Observatory` |
| 6 | II | The Codebase Atlas (annotated repo tree) | `CodebaseAtlas` |
| 7 | **III — Hidden Layer** | The Field Guide (10 hidden interactions, "show me") | `EggCard` |
| 8 | III | Built-with (tech chips) | inline |
| — | **Coda** | The cartographer off the map (persona triptych) | `PersonaTriptych` |
| — | Coda | Manifesto + signature | inline |
| — | Coda | Face portrait | `FaceParticles` |

The **act arc is sound**: work → craft → play → person. Do **not** reorder the
acts. Every win below is *within* an act, plus two prunes.

---

## 2. Per-section verdict

### Cold open — "How the map was drawn" · confession · astrolabe
- **Value: high.** Humble, human, sets an honest tone ("the making-of, minus the
  mystique"). The faint astrolabe is decoration done right — aria-hidden, frozen
  under reduced-motion, bleeds off the edge.
- **Noise:** none.
- **Action: keep as-is.** This is the model the rest of the page should live up to.

### 1. The Commit Trail (`CommitGraph`)
- **Value: medium.** It's *real git history* — that honesty is worth something,
  and the "busiest day / longest streak" stats have a human pull. Developers
  will clock that it's genuine, not faked (and your V2.0 pass explicitly refused
  a faked graph — good).
- **Noise: real.** (a) The GitHub contribution-graph is a *visual cliché* — the
  most recognizable dev-vanity artifact there is. (b) It's an **11-day burst**
  (Jun 20–30). A heatmap that resolves to one dense sprint quietly signals
  "built in a rush," which is **not** the senior story you want; it undercuts the
  restraint message the ledger is about to make.
- **Action: keep, but demote and reframe.** It is *supporting evidence*, not a
  headline. Move it **below** the ledger (see §4). Consider leaning the copy away
  from "one intense burst" toward cadence/discipline.

### 2. The Gate — CI pipeline (`CiPipeline`)
- **Value: low.** `checkout → node → install → lint → types → build → merge-ready`
  is what *every* professional repo does. A CTO reads it and thinks "…yes, and?"
  Displaying it this prominently can read *junior* — proud of having CI at all.
- **Noise: high.** Non-interactive, non-personal, a dressed-up screenshot of a
  `.yml`. This is the "static list, therefore not done" your own quality bar
  warns against.
- **Action: CUT.** Fold its one honest idea into a single caption line under the
  commit graph: *"Every one of these crossed the same gate — lint, types, clean
  build — before it merged."* Signal kept, full panel of noise gone. **(One of
  the two cuts that gets the page from 10 instruments to 8.)**

### 3. The Tally — 200+ hours · 7 phases · 5 voices · 13K lines (`Tally`)
- **Value: low-to-medium.** "13K lines" and "5 voices" are concrete. But
  **"200+ hours poured" is actively a junior tell** — effort is not quality, and
  senior people don't invoice you in hours of obsession. It reads try-hard.
- **Noise: high — this is the epicentre of the page's *number soup*.** See §3.
- **Action: CUT the standalone Tally.** Drop "hours poured" entirely. Relocate
  the one or two figures worth keeping (lines, voices) into the commit-graph stat
  row so there is **one** numeric readout in Act I, not two. **(The second of the
  two cuts to reach 8 instruments.)**

### 4. Built / Cut ledger (`LedgerEntry`)
- **Value: highest on the page.** *"The senior part of the work was not adding
  things — it was knowing what to leave out."* The **"What I cut, and why"**
  column — refusing Three.js, refusing a component library, refusing invasive
  tracking, each with a real payoff — is the single most senior-differentiating
  artifact you have. This is what a CTO stops on. Restraint is the flex.
- **Noise:** minimal. The mobile tap-to-expand pattern is clean.
- **Action: KEEP and PROMOTE to the front of Act I.** It is currently buried
  under three diligence widgets. Lead the act with judgment, then show the work
  that earned the right to it.

### 5. The Observatory (`Observatory`)
- **Value: high *idea*, cinematic core.** "Instrumented, not surveilled" is a
  genuine point of view — observability *and* user respect, a senior-plus product
  instinct, not table stakes. The orbiting constellation with the pentatonic
  sweep is a real awwwards-tier *moment*. The 3 capability panels (privacy /
  discoverability / observability) carry the message in scannable form.
- **Noise: real, and concentrated in one place** — the always-visible index of
  ~39 event-name chips (`hero_cta`, `astrolabe_spin`, `voice_summon_submit`…).
  Nobody reads 39 chips. To a non-dev it's meaningless jargon; to a dev it's a
  mildly interesting *idea* drowned in an *enumeration*. You're showing the event
  schema when the headline already made the point. Plus **5 more metrics** feed
  the number soup.
- **Action: KEEP the instrument, CUT the exhaustiveness.** Kill the full chip
  index — or collapse it to the four **group headers + counts** ("Origin &
  Wayfinding · 9", "The Craft · 13"…) so the *scale* lands without asking anyone
  to read it. Keep the dots hoverable for the curious. Trim the metric strip to
  the 2–3 that actually impress (e.g. `50 events`, `5 schemas`).

### 6. The Codebase Atlas (`CodebaseAtlas`)
- **Value: high — for the exact audience that reaches this page.** An annotated,
  keyboard-navigable repo map where each node explains *why it sits where it
  does* ("Swappable by design — change provider in one file", "Zero audio bytes
  shipped"). The `signal` annotations are the gold — that's architecture
  literacy a CTO can *see*. "The component rendering this map is in the map" is a
  genuine delight.
- **Noise:** for a hiring manager / normal visitor it's opaque — but this is a
  self-selected coda, so that's an acceptable trade. The risk is **adjacency**,
  not content (see §3).
- **Action: KEEP.** Ensure the entry rail ("Start here" hotspots) is the default
  so it doesn't open as an intimidating full tree.

### 7. The Field Guide — hidden interactions (`EggCard`)
- **Value: high, and under-placed.** Ten deliberately-subtle interactions, each
  with a **"Show me"** that jumps you to the *real* feature. Interactive,
  rewarding, proof-of-craft *and* delight in one — it demonstrates the obsession
  the manifesto only claims. This is among the two or three best things here.
- **Noise:** low. Ten is a slightly long list; the one-open-at-a-time accordion
  keeps it calm.
- **Action: KEEP; consider promoting.** It currently sits third-to-last, after
  two heavy data instruments — many won't reach it. Options: (a) move the Field
  Guide up to open Act III strongly (already does), or (b) trim to the ~6–7
  strongest eggs so it lands as a curated set, not a checklist.

### 8. Built-with — tech chips (inline)
- **Value: low but expected.** Everyone lists a stack; it differentiates nothing.
  But it's cheap, and the core/supporting split (ember pills vs. quiet mono line)
  is tastefully done already.
- **Noise: low** *because it's already quiet.* Don't let it grow.
- **Action: KEEP as-is, small.** Do not expand. It's a footnote and should look
  like one.

### Coda — Persona Triptych · Manifesto · Face portrait
- **Value: high — this is the payoff.** After the proof-of-craft, the human
  close ("the cartographer, off the map" → storyteller / filmmaker / wanderer →
  manifesto → a face assembled from the site's own characters) is what makes the
  page *land emotionally*. It's the reason the whole page exists. Placement (end)
  is correct — it rhymes with the cold open.
- **Noise:** none of consequence.
- **Action: KEEP, unchanged.** Protect this beat — everything above it exists to
  earn it. The fatigue prunes above are largely *in service of* getting people
  here with attention left.

---

## 3. Two cross-cutting problems (bigger than any one section)

### Problem A — Number soup
Count the numeric readouts a visitor is asked to absorb:
- Commit-graph stats: commits, days, busiest, streak → **4**
- Tally: hours, phases, voices, lines → **4**
- Observatory metrics: events, superProps, webhooks, dashboards, schemas → **5**

**~13 stat readouts.** Past ~5, numbers stop meaning anything — they become
texture, and the *weak* ones (200+ hours, 21 super-properties) drag the credible
ones down with them. **Target: one stat cluster per act, ≤ 4 figures each, and
kill every vanity metric** (hours poured, super-prop count). Fewer numbers hit
harder.

### Problem B — The two-viz wall in Act II
`Observatory` and `Codebase Atlas` are **both** heavy, interactive, developer-
oriented data instruments, rendered back-to-back with nothing between them. This
is precisely where attention breaks. Even the engaged 5% have a budget. Once
each is trimmed (§2.5, §2.6), insert a genuine breather between them — a single
declarative line of copy, or the manifesto's spirit — so the act reads as *two
moments*, not one exhausting slab.

---

## 4. Recommended re-order

Acts stay in order (work → craft → play → person). Changes are **within Act I**
plus the two cuts.

**Act I — from "here's how much I did" to "here's how I judged."**

| Before | After |
|--------|-------|
| 1. Commit Trail | 1. **Built / Cut ledger** ← lead with judgment |
| 2. The Gate (CI) | 2. Commit Trail *(demoted to supporting evidence; CI folded in as one caption line)* |
| 3. Tally | ~~3. The Gate~~ **CUT** |
| 4. Ledger | ~~4. Tally~~ **CUT** *(surviving figures merged into the commit-graph stat row)* |

Rationale: the ledger is your strongest artifact; leading with it frames
everything after as *the work that earned the right to those cuts*, instead of
making the reader wade through diligence widgets to find the one senior insight.

**Act II — trim, then separate.** Observatory (index collapsed, metrics trimmed)
→ **breather line** → Codebase Atlas (hotspots-first).

**Act III — curate.** Field Guide (optionally trimmed to ~6–7) → Built-with
(quiet, unchanged).

**Coda — untouched.** Protect the human close.

Net: **10 instruments → 8**, number soup roughly halved, the strongest artifact
(the ledger) promoted to lead, the two developer instruments no longer collide,
and the emotional payoff reached with attention still in the tank.

---

## 5. Action board

| Pri | Item | Action | Effort |
|-----|------|--------|--------|
| P0 | The Gate (CI) | **Cut**; fold into one caption line under commit graph | S |
| P0 | Tally | **Cut** "200+ hours"; merge surviving figures into commit-graph stats | S |
| P0 | Ledger | **Move** to lead Act I | S |
| P1 | Observatory index | Collapse 39 chips → 4 group headers + counts | M |
| P1 | Observatory metrics | Trim 5 → 2–3 credible figures | S |
| P1 | Act II | Insert a breather between Observatory and Atlas | S |
| P2 | Commit Trail | Reframe copy away from "one intense burst" | S |
| P2 | Field Guide | Consider trimming 10 → 6–7 strongest | M |
| P3 | Built-with | Leave as-is; do not expand | — |
| — | Cold open, Atlas, Coda | Keep | — |

---

## 6. The one-line thesis

**This page is trying to prove seven things and would be more impressive proving
four.** Lead with the restraint story, cut the two table-stakes/vanity widgets
(CI gate, hours-poured tally), stop the two developer instruments from colliding,
and drain the number soup. Every cut buys attention for the human close — which
is the only thing here nobody else can copy.
