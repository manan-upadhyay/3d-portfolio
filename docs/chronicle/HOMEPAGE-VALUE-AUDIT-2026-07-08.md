# Homepage (`/`) — Value vs. Noise Audit (2026-07-08)

> Same blunt lens as the [Making-Of audit](MAKING-OF-VALUE-AUDIT-2026-07-08.md),
> now on the front door — the six-chapter Chronicle at `/`. What earns the
> visitor's ten seconds, what is noise, and what to do about it. **Not** "we
> built it, so keep it."
> Companion to that doc; read the two together. Source of truth for the homepage
> prune/scrutiny decisions below.

---

## 0. The frame — this is a *different* bar than the coda

The making-of is an opt-in coda for your most engaged 5%. The homepage is the
**opposite situation**, and the criteria shift with it:

1. **The audience is cold and skimming.** Nobody chose this — a recruiter opened
   a link, a CTO is doing 90-second diligence, a hiring manager has six tabs.
   Your own north-star (CLAUDE.md §1): *make them feel his craft within ten
   seconds.* The homepage lives or dies on the **critical path**: who is this →
   is he senior → what has he shipped → is he available → how do I reach him /
   get the résumé.

2. **The risk here is inverted.** On the making-of the danger was *too much
   depth*. On the homepage the danger is the **cinematic wrapper getting between
   a hiring decision and the facts it needs** — a signature interaction that's
   beautiful but slower to *read* than the plain version it replaced.

**The criteria, unchanged:**
- **Value** — does it advance the hire decision *and* land as a *moment*?
- **Noise** — decoration that doesn't advance it, motion that fights legibility,
  or a fact repeated until it stops counting.
- **Action** — keep / scrutinize / trim / move.

**Headline finding up front:** the homepage is in **much better shape than the
making-of**. Every one of the six sections earns its place — there is nothing
here to *cut* outright. The work is subtler: one instrument to seriously
question (the Expedition Recap), two sections where the signature interaction
may be fighting the scan (Experience, Tech), one motif at risk of overuse, and
one minor stat redundancy. **Do not reorder the six chapters** — that arc is
canonical and correct (see §4).

---

## 1. Current structure (render order)

| # | Chapter | Section | Signature element |
|---|---------|---------|-------------------|
| 00 | Origin | `Hero` | Name + rotating tagline + proof strip + CTAs; living Canvas2D **astrolabe** |
| 01 | The Craft | `About` | Editorial spread: pull-quote, stat line, disciplines index |
| 02 | The Journey | `Experience` | **Horizontal** timeline, cards on pendulum-sway threads |
| 03 | The Arsenal | `Tech` | **Orbital** skill field (3 rotating rings) / cluster fallback |
| 04 | The Realms | `Works` | Proof-first project plates + carousel/NDA schematic + "chart more" |
| 05 | Summon | `Contact` | 3-field form + channels + compass; **Expedition Recap** at the foot |
| — | (global chrome) | SideRail · ⌘K map · SkyControl · Voice + Sound cluster · StickyCta | always-present |

---

## 2. Per-section verdict

### 00. Hero — Origin (`Hero`)
- **Value: high — this *is* the ten-second moment.** Name at display scale, the
  **proof strip** (years · stack · shipped · role), and two-to-three CTAs
  (projects / contact / résumé) put the exact hiring-decision facts above the
  fold. The living astrolabe is the signature craft flex, and it's honest —
  gesture-gated sound, reduced-motion frozen, aria-hidden.
- **Noise: minor.** (a) The **rotating tagline phrase** is the one mild cliché —
  rotating adjectives are a well-worn device; it's tasteful here but it's the
  weakest beat in an otherwise strong hero. (b) The `bearing 000° · origin`
  readout is pure on-theme decoration — harmless, but it *is* decoration.
- **Action: KEEP.** The section does its job better than any other. Optional:
  pressure-test whether the rotating phrase reads as craft or as gimmick to a
  senior evaluator; a single confident line may hit harder than a carousel of
  four.

### 01. The Craft — About (`About`)
- **Value: high.** The "who he is + why trust him" beat, and it was deliberately
  rebuilt *away* from the AI skeleton (no 4-tile stat banner, no glass icon-card
  grid — see the file header + `common-ai-signs.md`). The pull-quote → offset
  detail → ruled disciplines index is genuinely editorial. The `Annotated`
  flavor↔fact reveal is a nice quiet touch.
- **Noise: low — but watch one redundancy.** The `stats` line here (CountUp
  figures) re-presents facts the **hero proof strip** already stated (years,
  things shipped). Seeing "5+ years / 20+ shipped" twice inside the first two
  screens spends the number's impact. See §3.C.
- **Action: KEEP; de-duplicate the stats against the hero.**

### 02. The Journey — Experience (`Experience`)
- **Value: high content, and a real *moment*.** Career history is core hiring
  material, and the horizontal timeline with velocity-driven pendulum sway is
  one of the most distinctive interactions on the site.
- **Noise: this is the homepage's biggest form-vs-function tension.**
  - **Horizontal scroll is a discoverability + speed tax.** A hiring manager
    who just wants to *scan the roles* now has to discover the sideways gesture
    and page through cards one at a time — slower than a vertical read of the
    same history. The file's own comments log prior beta pain here (the Lenis
    dead-zone stutter, "text that looked clickable"), which is a tell that this
    interaction has fought its users before.
  - **Per-card density is high:** chapter eyebrow + role + org + credential +
    headline + bullet list + tech pills. Each card is a lot to absorb *while*
    learning a non-standard scroll.
- **Action: KEEP, but scrutinize the interaction.** The question to answer
  honestly: does horizontal paging *help* a skimming recruiter read a career
  history, or does the cinematic gesture slow the one task this section exists
  for? At minimum, guarantee the position is legible at a glance (the `NN/NN`
  counter + progress bar help) and that the first card lands with the current
  role fully readable without any interaction.

### 03. The Arsenal — Tech (`Tech`)
- **Value: medium-high.** Skills matter to hiring, and the orbital field is a
  strong visual. The **primary/secondary tiering** (brightness = mastery) is a
  smart, senior signal — it says "I know what I'm actually deep in," which beats
  an undifferentiated logo wall.
- **Noise: the second form-vs-function tension.** A field of *rotating* nodes is
  beautiful but **less scannable** than a grouped list — to read a tool you
  chase a moving target, and the rotation can frustrate the simple question
  "does he know React / Node / AWS?" Tellingly, the **mobile cluster fallback is
  more legible** than the desktop orbital it replaces. Skills sections also skew
  table-stakes; the tiering is what saves it from reading junior.
- **Action: KEEP the orbital as a moment — but make the scannable read one
  glance away.** Ensure primaries are legible *at rest* without hovering, and
  consider slowing/parking rotation on hover-intent so reading never requires
  chasing. The cluster layout being clearer than the showpiece is worth sitting
  with.

### 04. The Realms — Works (`Works`)
- **Value: highest on the homepage.** Projects are *the* thing an evaluator
  weighs, and this section is the model the rest should aspire to. The
  **proof-first plate** (5-second read: lead line + labelled 3-fact proof strip
  + stack pills, with prose/highlights behind "the full story") is exactly the
  right altitude — depth on demand, not a wall. The **NDA schematic** (abstract
  tiers instead of a blank monogram) is a genuinely senior solve. The
  making-of doorway at the foot fixes the ~1% discovery problem.
- **Noise: low.** Well-structured throughout.
- **Action: KEEP, unchanged.** If anything, this section's discipline (lead →
  proof → depth-on-demand) is the pattern to port *back* into Experience.

### 05. Summon — Contact (`Contact`)
- **Value: high — this is the conversion.** The form was correctly simplified
  (the inquiry chips were cut — "four decisions before typing a word was pure
  friction," per the file; good call). Availability line + 3 fields + résumé +
  channels-with-copy = every fact the ask needs. The status console (crossfade
  in a fixed slot, no layout jump) and the raven-burst success are tasteful.
- **Noise: low.** The rotating `ContactCompass` is small decoration — but note
  it's now the **third or fourth rotating circular instrument** on the page
  (§3.A).
- **Action: KEEP the form + channels, unchanged.**

### — The Expedition Recap (foot of Contact) — **the one to seriously question**
- **What it is:** the Phase 5 instrument that "reads" the visitor — a Canvas2D
  traveler map, sun arc, device sigil, GPU/OS/battery/network readout, a persisted
  visit counter, a sealed-voice constellation, **and one opt-in IP-geolocation
  lookup** for city/coords.
- **Value: it is probably the single most "awwwards" wonder-moment on the site.**
  The "how does it know my city / my GPU?" delight is real and memorable.
- **Noise / liability — and this is the homepage's equivalent of the making-of's
  "show-off instrument" risk:**
  1. **Placement is post-conversion.** It sits *below* the contact form, on the
     money page. A visitor who came to hire reaches the CTA and then gets a heavy
     interactive toy *after* the ask — attention spent past the point of value.
  2. **Creep-factor on the money page.** "I read your location and device" is
     delightful on a playful coda; on the primary business page it can read as
     *surveillance* to exactly the risk-averse CTO you want to impress. Note the
     irony: the making-of's Observatory *brags about not doing this*
     ("Instrumented, not surveilled"), while the homepage's recap *does* the IP
     lookup. That's a values tension between your two pages.
  3. **Weight.** It's a large instrument (TravelerMap, SunCalc, WebGL probe,
     geolocation fetch) loading at the bottom of the most important page.
- **Action: SCRUTINIZE — this is the homepage's headline decision.** Three
  honest options, in order of my preference:
  - **(a) Move it to the making-of.** It is a *wonder/craft* artifact, not a
    *hire-decision* artifact — it belongs on the coda page with the other
    "behind the curtain" instruments, where the creep-factor is charming and the
    placement isn't stealing focus from a CTA. This also resolves the
    "surveilled vs. not" contradiction between the two pages.
  - **(b) Keep it, but guarantee it reads as delight, not surveillance** — lead
    with the opt-in and the "how?" note *before* anything resolves, and make the
    geolocation visibly consent-gated. (The opt-in exists; the question is
    whether it's prominent enough to disarm the creep on first sight.)
  - **(c) Keep the device sigil / visit counter delight, drop the IP
    geolocation** — the "it knows me" moment survives on what the browser
    already exposes, minus the one call that carries the liability.

---

## 2.5 Desktop vs. Mobile — the audit on both devices

The verdicts above hold on both breakpoints, but the *experience* diverges
sharply because on `md:` down the entire floating control layer collapses into a
single bottom-right **MobileMenu** FAB (only the `DayNightToggle` stays visible,
top-right). Sky-modes, Voice, and Sound all move *inside* that sheet. Per
section:

| Section | Desktop | Mobile | Mobile verdict |
|---|---|---|---|
| **Hero** | Astrolabe off to the right in clear space; discrete spin button on the rim; bearing readout; 3 CTAs | Astrolabe centred up top; the **whole instrument is the tap-target** to spin (one-time hint); **2 CTAs** (résumé moves into the menu); scroll cue hidden | **Good** — deliberately adapted, not shrunk |
| **About** | Asymmetric 12-col editorial spread | Stacks to a single column | **Good** — clean reflow |
| **Experience** | Horizontal strip + header prev/next keys + pendulum sway | **Still horizontal**, paged by **floating carousel arrows** over the card | **OK but** — horizontal paging on a phone is a familiar carousel, yet it's still slower to scan a career than a vertical read (§3.B compounds here) |
| **Tech** | Rotating orbital field | Falls back to **grouped cluster cards** (`Clusters`) | **Better than desktop** — the mobile layout is *more* legible than the showpiece it replaces (tells you something, see §2.03) |
| **Works** | Alternating parallax plates | Plates stack; carousel + "chart more" intact; Contact becomes a full-bleed band | **Good** |
| **Contact** | Two-column form + channels | Full-bleed form band + stacked channels | **Good**; but the **Expedition Recap still renders**, a heavy instrument at the foot of a phone page (§2 Recap) |

**The mobile-only headline problem — discoverability collapses into one FAB.**
On desktop, Sky/Voice/Sound are three visible, *labelled* pills that advertise
themselves (the file notes labelling the Sky control gave it ~9× the icon-only
usage). On mobile **all three vanish into the menu sheet**, so a first-time
visitor has no on-screen signal that a sound layer, five skies, or multiple
narrating voices even exist. The mitigations are thin: a **one-time coach-tip**
on the FAB (2.6s after load, auto-hides in 10s) and a **pulsing "sound primed"
dot**. If the visitor misses that single bubble, the entire wonder layer is
invisible to them. This is the biggest device-specific gap on the homepage and
it's carried in full into the features audit
([FEATURES-VALUE-AUDIT](FEATURES-VALUE-AUDIT-2026-07-08.md)).

**Net:** mobile is *well-built* section-by-section (nothing is a shrunk desktop
afterthought), and it actually *fixes* the Tech legibility problem via the
cluster fallback. Its one real liability is **feature invisibility behind the
FAB** — the cinematic layer the whole site is built on is one missed tooltip
away from never being found on a phone.

---

## 3. Cross-cutting problems (bigger than any one section)

### A. Instrument-motif fatigue — "another spinning circle"
Count the rotating circular instruments on the homepage: **Hero astrolabe →
Tech orbital → Contact compass → Recap traveler map** — plus the `CompassRose`
sigil repeated inside Hero, Tech, and Contact. The compass/astrolabe/orbit motif
is strong *branding*, but by the fourth rotating disc the wonder is discounting.
This is the homepage's version of the making-of's "number soup" — call it
**instrument soup**. The motif is at the edge of overuse. **Action:** keep the
hero astrolabe (the signature) and one supporting instrument; demote or vary the
rest so the vocabulary doesn't read as one repeated shape. The Contact compass
is the most expendable (smallest payoff).

### B. Two "learn-the-interaction" sections in sequence
**Experience (horizontal) → Tech (orbital)** are back-to-back, and *both* ask
the visitor to learn a non-standard interaction to extract content that a plain
layout would surrender instantly. For a skimming evaluator that's friction
stacked on friction, right in the middle of the critical path. **Action:** it's
fine for *one* section to demand a gesture; make sure at least one of these two
gives up its content on a passive glance (see §2.02 and §2.03). Don't make the
visitor "figure out" two sections in a row.

### C. Stat redundancy across the fold
The **hero proof strip** and the **About stat line** both surface the same
core figures (years, shipped). Stated twice in the first two screens, the number
loses its punch. **Action:** pick one home for each figure — proof strip for the
above-the-fold glance, About stats for anything *additional* — and don't repeat.

### D. Audio-system count (low concern, worth naming)
Hero watch-gear, Tech space-hum, Experience key-clicks, Tech/Works blips, Contact
raven. Each is intent- or scroll-gated and reduced-motion-muted, so this is
*tasteful*, not a problem — but it is a lot of independent sound systems to
maintain. Flagging only so it stays deliberate, not accretive.

---

## 4. On re-ordering — don't (and why this differs from the making-of)

On the making-of I recommended promoting the ledger, because that page buried
its strongest artifact. **The homepage is the opposite: its order is the
canonical, proven portfolio arc** — intro → who → history → skills → work →
contact — and it's correct. Each chapter sets up the next; the hero's primary
CTA already jumps straight to Works for the impatient. **Do not resequence the
six chapters.**

The one defensible debate: **Works (highest value) sits 5th**, after the two
learn-the-interaction sections. Some portfolios lead with work. I'd *not* move
it — the narrative earns the placement and the CTA shortcut exists — but it's the
reason §3.B matters: the two sections *between* the hero and the work must not
tax the visitor so much that they never reach the realms. Fix the friction, keep
the order.

---

## 5. Action board

| Pri | Item | Action | Effort | Status |
|-----|------|--------|--------|--------|
| P0 | Expedition Recap | **Decided: moved to `/making-of`** — now the send-off below the manifesto; off the money page (`ExpeditionRecap` out of `sections/Contact.jsx`, into `sections/Atelier.jsx`). CLAUDE.md §3 updated. | M | ✅ Done |
| P1 | Experience | **Done** — first waypoint seeded `wp-active` so the current-most role reads at full opacity from first paint (zero interaction, no dim-flash). Discoverability signals (peek + prev/next keys + progress + NN/NN) already sufficient; no new copy. | M | ✅ Done |
| P1 | Tech orbital | **Done** — the whole field now parks on pointer-enter (`hovering` state gates every ring's `paused`), so reading never chases a moving target. Primaries already lit + ember-labelled at rest. | M | ✅ Done |
| P1 | Instrument soup | Keep hero astrolabe + one; demote the Contact compass (User Input - Leave it as it is.) | S | Left as-is |
| P2 | Stat redundancy | **Done: hero owns `years`; dropped from `constants.stats`** — About now carries only additional figures (20+ projects · 6+ domains · 38% load). | S | ✅ Done |
| P2 | Hero tagline | Pressure-test the rotating phrase vs. one confident line (User Input - keep rotating). | S | Left as-is |
| P3 | Audio systems | No change; keep the count deliberate | — | — |
| — | Works, Contact form/channels, About structure | Keep | — | — |

---

## 6. The one-line thesis

**The homepage is strong and correctly ordered — the job here isn't cutting, it's
making sure the cinematic wrapper never outruns the facts a hire depends on.**
Move the one show-off instrument (the geolocating Recap) off the money page, stop
two consecutive sections from taxing the skim, retire a couple of the spinning
circles, and the front door does in ten seconds exactly what it promises.
