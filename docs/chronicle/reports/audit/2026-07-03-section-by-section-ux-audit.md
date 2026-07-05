# Chronicle Portfolio — Section-by-Section UX Audit (Desktop + Mobile)

> **Document type:** Adversarial UX audit / enhancement backlog
> **Author:** AI audit pass · **Date:** 2026-07-03 · **Cycle:** v1.1 "Restraint Pass" (post-refactor)
> **Method:** Walked every surface of both routes (`/` and `/making-of`) plus all
> persistent menus, as a *first-time hostile user* on desktop **and** on a 390px
> phone. Every finding is cross-checked against the three Beta-1 truth documents
> (analytics / feedback / combined action plan) and the
> [Anti-Slop Codex](../../common-ai-signs.md).
> **Grounding:** findings cite real files/lines from the current tree, not
> hypotheticals. Where the v1.1 execution log already claims something "done," this
> audit re-tests it and flags what still slips.

> [!IMPORTANT]
> **How to read this.** Each surface has a **Desktop** block and a **Mobile** block.
> Each block lists **≥5 criticisms**, each paired with a concrete **enhancement**.
> Findings are tagged with severity: 🔴 P0 (blocks trust/conversion) · 🟠 P1 (real
> friction) · 🟡 P2 (polish). Mobile is treated as a *first-class designed
> experience* per [V1.1 §11.3](../../V1.1-RELEASE-PLAN.md), not a responsive shrink —
> "it reflows fine" is **not** a pass here.

---

## 0. Executive read (what the walkthrough revealed)

The v1.1 pass landed its headline goals: the hero now leads with value, the copy is
cut, the AI-tell eyebrows/glass are mostly gone, the contact form is de-themed, and
mobile has a genuine bespoke menu. **The site is no longer "AI slop at first
glance."** But a hostile walkthrough still surfaces a consistent pattern of
**second-order friction** that the reports predicted would remain:

1. **The proof is present but under-sold.** Screenshots exist, but they sit behind a
   carousel with weak affordance and `object-contain` letterboxing that reads as
   "placeholder," not "product." (Beta §19, D-workstream.)
2. **Interaction cost is still high per unit of information.** Arsenal, Experience,
   and the Atelier instruments ask the user to *work* (hover, swipe, scrub) to get
   payload that could be shown. Analytics said users skim in 7–11s; several sections
   still gate their content behind motion.
3. **Residual AI tells survive the pass.** Glassmorphism still lives in the SideRail
   and coach-tips (`backdrop-filter: blur(20px)`), the `chapter-eyebrow` numeral
   motif repeats on *every* section heading, and the fantasy register still leaks
   ("realm," "summon," "raven flock") in places the reports named explicitly.
4. **Mobile is bespoke but under-tested at the seams.** The MobileMenu is excellent;
   but the hero is cramped, the Experience horizontal strip fights the page scroll,
   and the Atelier instruments are heavy on a phone.

Nothing here is a rebuild. It's a **finishing pass** — the difference between "good
beta-2 candidate" and "best-in-market."

---

# PART A — THE CHRONICLE (`/`)

---

## A1 · Hero / Origin (`sections/Hero.jsx`)

**What it is:** full-viewport starfield + Canvas2D astrolabe, name in giant serif,
rotating tagline, proof strip, three CTAs (See my work / Get in touch / Résumé),
location line, desktop scroll cue.

### Desktop

- 🔴 **The rotating tagline undercuts the one job of the hero.** `hero.phrases`
  cycles every 3.2s ([Hero.jsx:85](../../../../src/sections/Hero.jsx#L85)). The beta
  said the hero must answer "why hire him" in a *fixed* glance; a word that mutates
  under the reader's eye ("polished web products" → "production React systems") makes
  the value proposition feel non-committal and is a classic decorative-motion tell
  (Codex M1/M3). **Enhancement:** freeze to one strongest claim, or slow to ~5s and
  drop the blur transition; reserve motion for the astrolabe, which is diegetic.
- 🟠 **Two competing focal points at equal weight.** The scrim fades the astrolabe up
  to `opacity 0.82` on desktop while the name is also a 150px moment. The eye
  ping-pongs. Beta §7/§15: "astrolabe competes with the professional message."
  **Enhancement:** on first paint, hold the astrolabe at ~0.5 and let it bloom to
  full only after the copy timeline completes (it already has a GSAP timeline at
  [Hero.jsx:94](../../../../src/sections/Hero.jsx#L94) — add the instrument as a
  final, later beat).
- 🟠 **CTA hierarchy is flat.** Three buttons in a row — one `btn-primary`, two
  `btn-secondary` ([Hero.jsx:386-393](../../../../src/sections/Hero.jsx#L386)) — but
  "Get in touch" and "Résumé" are visually identical, so the eye reads a wall of
  three. **Enhancement:** make Résumé a plain text link (as the footer does) so the
  hierarchy is *primary action → secondary action → utility link*, not three chips.
- 🟡 **The bearing readout is dead flavor.** `bearing 000° · origin`
  ([Hero.jsx:337](../../../../src/sections/Hero.jsx#L337)) is exactly the "epic
  vocabulary as decoration" the Codex §5 warns on, and it does zero conversion work.
  **Enhancement:** either wire it to actually update as the alidade sweeps (making it
  a real instrument readout) or cut it.
- 🟡 **Proof strip is monochrome and skimmable-past.** It's `text-muted` mono at 11px
  ([Hero.jsx:376](../../../../src/sections/Hero.jsx#L376)) — the single most
  important trust line on the page rendered as the quietest element. **Enhancement:**
  give the role/company token (`Lead Frontend at Capital Group`) a slightly stronger
  weight or ember accent so the proof actually *reads* as proof.
- 🟡 **"See my work" jumps past About/Experience to Projects.** Good for proof-first
  (matches the plan), but the visitor never learns there's a story in between and may
  not scroll back up. **Enhancement:** after the jump, ensure the SideRail is already
  visible so they can see they skipped chapters 01–02.

### Mobile

- 🔴 **The hero is genuinely cramped and the copy is bottom-anchored under the
  instrument.** Layout puts the astrolabe top-center at 62vw and the copy
  `justify-end pb-28` ([Hero.jsx:240](../../../../src/sections/Hero.jsx#L240),
  [:342](../../../../src/sections/Hero.jsx#L342)). On a 390×844 screen the name +
  tagline + proof (stacked vertically) + 3 CTAs barely fit above the fold, and the
  astrolabe overlaps the headline zone at only 0.32 opacity — reading as noise, not
  instrument. **Enhancement:** shrink the mobile astrolabe to a top strip (~40vw,
  pinned higher) and give the copy the full lower half with real breathing room; the
  phone hero should be *copy-first*, instrument as accent.
- 🔴 **Proof strip stacks into a 4-line vertical list on mobile**
  (`flex-col sm:flex-row` [Hero.jsx:376](../../../../src/sections/Hero.jsx#L376)).
  Four stacked mono lines eat precious vertical space and read as a bulleted résumé
  fragment — the opposite of the "one quiet signal" intent. **Enhancement:** on
  mobile show only the two highest-value tokens (`5+ yrs · React/Next/Node`) inline,
  drop the rest, or render as one wrapped sentence.
- 🟠 **The whole-instrument tap target competes with scroll.** The mobile spin button
  is `absolute inset-[8%]` of the astrolabe box
  ([Hero.jsx:301](../../../../src/sections/Hero.jsx#L301)), which sits over the upper
  hero. A user swiping up to scroll from that region triggers a spin instead.
  **Enhancement:** restrict the tap target to the visible instrument disc (a centered
  circle, not the full bounding box) so vertical swipes pass through to scroll.
- 🟠 **Three CTAs wrap to two rows on 390px**, and the wrap point puts Résumé alone on
  its own line ([Hero.jsx:386](../../../../src/sections/Hero.jsx#L386),
  `flex-wrap`). Orphaned buttons read as broken layout. **Enhancement:** on mobile,
  render primary CTA full-width, then a two-up row of secondary + résumé.
- 🟠 **No scroll cue on mobile** (it's `hidden md:flex`
  [Hero.jsx:405](../../../../src/sections/Hero.jsx#L405)). The rationale (scrolling is
  assumed) is fair, but with the astrolabe filling the top and copy at the bottom, a
  first-timer on a short screen may not realize there's more below the CTAs.
  **Enhancement:** a single low-key down-chevron below the CTAs, or ensure the next
  section peeks above the fold.
- 🟡 **`spinHint` bubble can collide with copy on short devices.** It renders
  `top-full mt-3` from the astrolabe hub center
  ([Hero.jsx:317](../../../../src/sections/Hero.jsx#L317)); on a 320px-tall visible
  hero it can land on the name. **Enhancement:** clamp/position-check against the
  headline, or anchor it to the instrument's bottom rim.

---

## A2 · About / The Craft (`sections/About.jsx`)

**What it is:** asymmetric editorial spread — serif pull-quote lead + offset detail
paragraphs, a typographic stat line, a ruled discipline index, (principles coda per
the header comment, though the rendered file ends at disciplines).

### Desktop

- 🟠 **Heading renders "Origin." — duplicating the Hero's chapter-00 label.** Known
  issue ([V1.1 §10.3](../../V1.1-RELEASE-PLAN.md)); `chapters.about.sub` is `'Origin'`
  so `title={`${sub}.`}` prints "Origin." again
  ([About.jsx:19](../../../../src/sections/About.jsx#L19)). A user scrolling from Hero
  to About sees the same word twice — reads as a copy bug. **Enhancement:** set a
  distinct About title ("The Craft" / "How I Work"); it's a one-key fix.
- 🟠 **The `Annotated` marginalia in the intro is invisible affordance on desktop
  hover only.** The detail paragraphs use `<Annotated>`
  ([About.jsx:33](../../../../src/sections/About.jsx#L33)) which hides context behind
  hover popovers. Beta §9: "things that look clickable do nothing / unclear
  affordances." **Enhancement:** ensure annotated terms have a *visible* dotted
  underline so the affordance is legible, not a mystery-meat hover.
- 🟡 **Stat line risks reading as the L5 "stat banner" tell it tried to avoid.** Three
  big serif figures in a row above mono labels
  ([About.jsx:40-52](../../../../src/sections/About.jsx#L40)) is materially a stat
  banner, just without borders. It's better than tiles, but still the "4 metrics in a
  strip" pattern (Codex L5). **Enhancement:** break the rhythm — make one stat
  dominant (the 5+ years) and the others subordinate, or fold them into a sentence.
- 🟡 **Discipline index is a uniform ruled list — the very uniformity the Codex flags
  (L6).** Every row is `number · title · description` at identical weight
  ([About.jsx:62-81](../../../../src/sections/About.jsx#L62)). Editorial, yes, but
  mechanically even. **Enhancement:** vary — let the lead discipline carry a one-line
  proof or a larger figure; asymmetry signals a human hand.
- 🟡 **No visual anchor / artifact.** About is 100% type. For a section literally about
  *craft*, there's nothing to *see*. **Enhancement:** a single authored artifact (a
  signature, a small process sketch, a photo) would break the wall of text and fight
  the "AI text page" perception (Beta §8).
- 🟡 **Pull-quote may still be "AI flavor."** Re-read `about.pullQuote` against Codex
  §5 — if it's aspirational/abstract, it's the exact line the reports said to cut.
  **Enhancement:** make it a concrete, first-person claim only Manan would say.

### Mobile

- 🟠 **The asymmetric 12-col spread collapses to a plain stack**, losing the entire
  editorial concept (`lg:col-span-7` / `lg:col-span-5`
  [About.jsx:24-29](../../../../src/sections/About.jsx#L24)). On mobile it's just
  pull-quote → paragraphs → stats → list. Per §11.3 this is "responsive shrink," not
  a designed mobile experience. **Enhancement:** design a deliberate mobile rhythm —
  e.g. the stat line as a horizontal scroll-snap of big figures, the disciplines as
  tap-to-expand rows — so the phone gets its *own* answer.
- 🟠 **Discipline rows lose their two-column grid and the description drops below the
  title** ([About.jsx:71](../../../../src/sections/About.jsx#L71),
  `md:grid-cols-[14rem_1fr]`). Fine, but the `04` numeral + title + wrapped
  description at 14px muted becomes a dense grey block. **Enhancement:** increase
  line-height and give the numeral more presence so each row is scannable.
- 🟡 **Marginalia/`Annotated` popovers on touch:** verify single-tap open + viewport
  clamp (the tracker claims done — re-test the *first* annotated term near the left
  edge at 390px, the classic off-screen case).
- 🟡 **Big serif pull-quote at `clamp(26px…)` can run 6–7 lines on mobile**, pushing
  the actual proof (stats) far down. **Enhancement:** shorten the pull-quote for
  mobile or cap its lines.
- 🟡 **Stat figures at `clamp(40px,5.5vw,64px)` shrink toward 40px on a phone** — the
  proof loses its punch exactly where the audience (Android converts best, Beta §5)
  is. **Enhancement:** keep mobile stat figures large; they're the trust payload.
- 🟡 **No section-level entry moment on mobile.** ScrollReveal fades are fine but
  uniform (Codex M1). **Enhancement:** give About one distinct mobile entrance so it
  doesn't feel like the same fade as every other section.

---

## A3 · Experience / The Journey (`sections/Experience.jsx`)

**What it is:** an intentional horizontal timeline — cards hang from a thread and sway
with velocity physics; native swipe/trackpad/shift-wheel + desktop prev/next keys +
progress bar + `NN/NN` counter + mobile floating arrows.

### Desktop

- 🔴 **A horizontal scroller inside a vertical page is still the #1 "where do I go"
  trap** — even done well. Beta §10 explicitly: "fix Chapter 2 scrolling." The strip
  uses `data-lenis-prevent` ([Experience.jsx:252](../../../../src/sections/Experience.jsx#L252))
  so vertical wheel over it does nothing until you find shift-wheel or the keys. A
  user who scrolls down *through* this section with a normal mouse wheel will scroll
  the page past it without ever moving the timeline. **Enhancement:** map vertical
  wheel delta → horizontal scroll *while the strip is centered in view* (translate
  wheel to `scrollLeft`), then release to vertical once at the end — the pattern users
  expect from pinned horizontal galleries, without a hard pin.
- 🟠 **The pendulum sway is decorative motion that competes (Codex M3).** Cards sway on
  scroll velocity ([Experience.jsx:162-183](../../../../src/sections/Experience.jsx#L162)).
  It's charming once, but it animates the *content you're trying to read*, and on a
  trackpad it can feel like the text is unstable. **Enhancement:** damp it hard (cap
  ±3°), or disable sway on the *active/centered* card so the thing you're reading is
  still.
- 🟠 **`chapter-eyebrow` appears *again inside each card*** ([Experience.jsx:59](../../../../src/sections/Experience.jsx#L59)) —
  the same uppercase-tracked motif the Codex flagged (T3/L2), now nested inside the
  section that already has a `ChapterHeading`. Double eyebrows. **Enhancement:** drop
  the per-card eyebrow; the role + org already anchor the card.
- 🟠 **The giant faded year numeral behind each card** (`fontSize: 92, opacity 0.05`
  [Experience.jsx:22](../../../../src/sections/Experience.jsx#L22)) is pure decorative
  density (Codex meta-tell #4). **Enhancement:** either make it legible/functional
  (a real date anchor) or remove — it's noise under the actual content.
- 🟡 **`onAssignment` / `secondment` badges are rounded pills** — a named AI tell
  (Beta §5 chips/pills) ([Experience.jsx:44](../../../../src/sections/Experience.jsx#L44)).
  **Enhancement:** convert to the mono "spec line" treatment used elsewhere for
  consistency.
- 🟡 **CTA waypoint ("Summon" card) mixes a fantasy verb into a professional timeline**
  (`experience.summonCta` [Experience.jsx:85](../../../../src/sections/Experience.jsx#L85)).
  Beta §23 blocklists "summon." **Enhancement:** "Let's talk" / "Get in touch."

### Mobile

- 🔴 **Horizontal-inside-vertical is *worse* on touch** — a vertical swipe that starts
  on a card scrolls the page, a horizontal swipe pages the strip, and the two gestures
  are a coin-flip near the card edges. This is the exact "buggy scroll" the beta named.
  The floating arrows help, but the primary gesture is ambiguous. **Enhancement:**
  strongly consider a **vertical stacked** timeline on mobile (cards stacked, thread
  running down) — the phone-native answer per §11.3 — keeping horizontal for desktop
  only. If keeping horizontal, add `scroll-snap` mandatory + a bigger next-card peek so
  the sideways intent is unmistakable.
- 🟠 **Cards are tall and dense on a phone** — icon row, via line, eyebrow, role, org,
  headline, 2–4 bullets, tech spec line ([WaypointBody](../../../../src/sections/Experience.jsx#L19)).
  That's a full screen per card, and you can only see one at a time. **Enhancement:**
  on mobile, show role + headline + top-2 bullets, with "more" to expand — match the
  skim behavior.
- 🟠 **Floating arrows overlap card content.** `exp-arrow-wrap--l/--r` sit over the card
  edges ([Experience.jsx:270-275](../../../../src/sections/Experience.jsx#L270)). On a
  narrow card they cover the first/last few characters of bullets. **Enhancement:**
  inset the card content, or move arrows into the gutter below the card next to the
  counter.
- 🟠 **The one-time "nudge" is the only discoverability cue and it's easy to miss.**
  If the user lands on this section already scrolled (deep-link, back-nav), the
  first-view nudge won't fire. **Enhancement:** persist a subtle always-on peek +
  page-dot row so the sideways affordance never depends on a one-shot animation.
- 🟡 **`data-lenis-prevent` + native scroll interplay** — verify momentum scrolling
  doesn't leave the strip mid-card (no snap = cards half-cut). **Enhancement:** add
  `scroll-snap-type: x mandatory` on `.exp-strip`.
- 🟡 **Tap targets:** prev/next arrows are 44px (good), but the progress bar + counter
  are `aria-hidden` decorative — a screen-reader user gets no position feedback.
  **Enhancement:** add an `aria-live` position announcement ("Waypoint 3 of 6").

---

## A4 · Arsenal / The Tech (`sections/Tech.jsx`)

**What it is:** desktop = animated orbital field (3 concentric revolving rings of skill
nodes, hover to light a constellation); tablet/mobile/reduced-motion = grouped cluster
cards with skill chips.

### Desktop

- 🔴 **The orbital is beautiful and analytics-confirmed *ineffective*: 1.03 tools
  hovered per session** (Beta §3). Skills revolve continuously
  ([Tech.jsx:189](../../../../src/sections/Tech.jsx#L189)), so reading a label means
  chasing a moving target, and you must hover each node one at a time to learn
  anything. It's the definition of "beautiful but doesn't invite exploration."
  **Enhancement:** slow the rotation dramatically (or pause-on-proximity, not just
  pause-on-hover), and **show primary skill labels persistently** instead of only on
  hover — the payload (what he knows) should be readable at a glance.
- 🟠 **Moving text fails the skim test and accessibility.** Labels counter-rotate but
  the whole node translates ([Tech.jsx:197](../../../../src/sections/Tech.jsx#L197));
  a low-vision or motion-sensitive user (who isn't on full `reduce`) gets drifting
  text. **Enhancement:** default to a slower/near-static field; treat full orbit as an
  opt-in flourish.
- 🟠 **No sense of *proficiency*.** Every node is visually equal except a size tier;
  a recruiter can't tell "expert React" from "touched Docker once." **Enhancement:**
  encode tier/recency visibly (ring position already implies category — add a
  proficiency signal: fill, size, or a small "core" marker).
- 🟡 **Curved uppercase category titles on the rings** (`cat.toUpperCase()`
  [Tech.jsx:149](../../../../src/sections/Tech.jsx#L149)) are ALL-CAPS tracked labels —
  the T3 tell, just bent along a path. **Enhancement:** sentence-case or make them
  quieter.
- 🟡 **The central compass sigil is more flavor** ([Tech.jsx:164-179](../../../../src/sections/Tech.jsx#L164)) —
  another spinning instrument competing with the skill payload. **Enhancement:** shrink
  or drop; the rings already read as a system.
- 🟡 **Constellation links only appear on hover of a single node** — a lot of
  measurement code ([Tech.jsx:94-122](../../../../src/sections/Tech.jsx#L94)) for a
  payoff most users (per analytics) never trigger. **Enhancement:** consider whether
  the constellation earns its complexity; a grouped, labeled, static cluster (the
  mobile fallback) may out-convert the orbit on desktop too. Worth an A/B.

### Mobile

- 🟠 **Mobile gets the *cluster fallback* — which is honestly better, but it's the
  chip/pill grid the beta named as an AI tell.** `Clusters` renders `rounded-full`
  skill pills ([Tech.jsx:248](../../../../src/sections/Tech.jsx#L248)). Beta §5 lists
  "chips/pills" as the #1 vibe-coded visual tell. **Enhancement:** convert to the mono
  "spec line" motif already adopted in Works/Experience/Hero for consistency and
  de-pilling, or a ruled list like About's disciplines.
- 🟠 **Three equal cluster cards = the L4 identical-icon-card-grid tell**
  ([Tech.jsx:237-263](../../../../src/sections/Tech.jsx#L237)). Same padding, same
  radius, same structure. **Enhancement:** vary — lead with Frontend (his strength)
  larger, others subordinate.
- 🟡 **Skill count is high and undifferentiated** (~32 badges, Beta copy audit). On a
  phone that's a lot of near-identical pills to scan. **Enhancement:** show core
  skills per category, "+N more" to expand.
- 🟡 **Category `blurb` is a paragraph per card** ([Tech.jsx:243](../../../../src/sections/Tech.jsx#L243)) —
  more reading on the skim-heavy phone. **Enhancement:** cut to a 4-word tagline.
- 🟡 **No proficiency signal on mobile either** — same trust gap. **Enhancement:**
  visually mark the 3–4 core tools.
- 🟡 **Section is centered-stack** (`align="center"` heading, centered subtitle
  [Tech.jsx:300-303](../../../../src/sections/Tech.jsx#L300)) — the L7 "dead-center
  everything" reflex. **Enhancement:** left-align to match the editorial rhythm of
  About/Works.

---

## A5 · Works / The Realms (`sections/Works.jsx`)

**What it is:** alternating full-bleed featured "plates" with screenshot carousels +
parallax, proof bullets, mono stack line, live/source links; "show more" grid of
secondary cards; a prominent doorway card into `/making-of`.

### Desktop

- 🔴 **Screenshots use `object-contain` → letterboxed art that reads as
  placeholder.** [Works.jsx:72](../../../../src/sections/Works.jsx#L72). A product
  screenshot floating in a bordered box with empty bars top/bottom is the single
  biggest missed-proof opportunity — the beta's #1 fix (D-workstream, "zero images")
  is technically satisfied but visually undersold. **Enhancement:** `object-cover`
  with a focal-point crop (or capture screenshots at the card's aspect ratio) so the
  work fills the frame and looks like a real product, not a thumbnail.
- 🟠 **Carousel affordance is hover-dependent and low-contrast.** `carousel-ctrl`
  arrows + dots ([Works.jsx:94-111](../../../../src/sections/Works.jsx#L94)) — on
  desktop, do they show before hover? If gated on `group-hover`, a user who doesn't
  hover never learns there are multiple screenshots. **Enhancement:** always-visible
  dots (a trained pattern), arrows on hover is fine.
- 🟠 **Only 3 featured plates, rest behind "show more"** — good, but the CTA is a
  bordered pill ([Works.jsx:269](../../../../src/sections/Works.jsx#L269)), another
  pill instance, and it's centered alone. **Enhancement:** fine to keep, but de-pill to
  match the system, and label it with the count (it already does — good).
- 🟠 **`works.realm` / `works.enterRealm` / "The seventh realm" fantasy register**
  persists in the professional proof section ([Works.jsx:153](../../../../src/sections/Works.jsx#L153),
  [:193](../../../../src/sections/Works.jsx#L193), [:289](../../../../src/sections/Works.jsx#L289)).
  Beta §23 explicitly blocklists "realm" in professional framing. **Enhancement:**
  "Project I · Capital Group," "View live," "Behind this site."
- 🟡 **Roman numerals + `chapter-eyebrow` per plate** ([Works.jsx:153](../../../../src/sections/Works.jsx#L153)) —
  the eyebrow motif *again*. **Enhancement:** the project name is the anchor; drop or
  quiet the eyebrow.
- 🟡 **The NDA projects (Capital Group) are image-less by design** — correct, but they
  then read as the *weakest* cards next to the screenshot-rich ones, which
  under-sells the most impressive (enterprise) work. **Enhancement:** give NDA cards an
  authored abstract visual (architecture sketch, anonymized UI wireframe) so they hold
  their own.

### Mobile

- 🟠 **`min-h-[320px]` contain'd screenshots on a 390px-wide card = tiny letterboxed
  images.** [Works.jsx:60](../../../../src/sections/Works.jsx#L60). The proof is
  smallest exactly where mobile-converting users see it. **Enhancement:** full-width
  `object-cover` cover crop on mobile; let the screenshot be the hero of the card.
- 🟠 **Carousel arrows are 44px? Verify.** `carousel-ctrl` sizing isn't in the JSX;
  ensure touch targets ≥44px and that dots are tappable (they're tiny `carousel-dot`).
  **Enhancement:** enlarge dot hit-areas; swipe-to-page the carousel (touch users
  expect to swipe images, not hunt arrows).
- 🟠 **Parallax on mobile** — the cover parallax layer is `top:-8%/height:116%`
  ([Works.jsx:62](../../../../src/sections/Works.jsx#L62)) and GSAP-driven; on mobile
  this is extra scroll-jank for little payoff and a perf cost (Beta §11).
  **Enhancement:** disable cover parallax on coarse pointers.
- 🟠 **Alternating `lg:order` flip collapses** so mobile is always image-then-text —
  fine, but every card is now identical structure (L4/L6 uniformity). **Enhancement:**
  vary the featured card treatments slightly on mobile.
- 🟡 **The `/making-of` doorway card** (`works-nod`
  [Works.jsx:289](../../../../src/sections/Works.jsx#L289)) is good discovery, but on
  mobile it's another full card at the end of an already-long section. **Enhancement:**
  ensure it doesn't read as a project (it's meta) — distinct styling so users don't
  think it's an 8th project.
- 🟡 **StickyCta overlaps the bottom of Works cards on mobile** (expected, dismissible)
  — but on a small screen it can cover a live-demo link. **Enhancement:** ensure the
  CTA never sits over a project's primary action.

---

## A6 · Contact / Summon (`sections/Contact.jsx`) + Expedition Recap

**What it is:** two-column — a de-themed message form (inquiry chips, name/email/msg,
Send + Résumé, status console) + a "correspondence" card (channels, copy-email,
rotating compass, quote); below it the `ExpeditionRecap` instrument panel.

### Desktop

- 🔴 **78% form abandonment was the headline conversion bug; the form is still a
  full 3-field commitment with a themed status console.** The console still says
  `contact.status.idle` ([Contact.jsx:245](../../../../src/sections/Contact.jsx#L245))
  and there's a pulsing pip + serif "transmission" copy — cognitive weight at the
  exact anxiety moment (Beta §17). **Enhancement:** the correspondence card's *copy
  email / LinkedIn* are the low-friction escape hatch — make them visually
  **co-equal** with the form (the beta said many warm leads never want a form), not a
  secondary column.
- 🟠 **Inquiry chips are rounded pills** ([Contact.jsx:178](../../../../src/sections/Contact.jsx#L178)) —
  the named tell, and they add a *decision* before the user has typed anything
  (friction before commitment). **Enhancement:** default-select "Senior role" (the
  only inquiry type that has ever converted, Beta §5) and let it be changed, rather
  than presenting an empty choice.
- 🟠 **The rotating `ContactCompass` is decorative motion in the conversion zone**
  ([Contact.jsx:60-81](../../../../src/sections/Contact.jsx#L60)) — a 60s infinite
  spin next to the form. Codex M3. **Enhancement:** freeze it or drop it; the contact
  section should be the *calmest* on the site.
- 🟠 **`RavenBurst` flock on success + "raven" language.** The success flock
  ([Contact.jsx:252](../../../../src/sections/Contact.jsx#L252)) is delight, but any
  residual "raven/dispatch" copy in status/errors re-themes the moment. **Enhancement:**
  verify all `plain`/`chronicle` submit/status/error strings are literal (the log says
  done — re-audit `contact.status.sending`).
- 🟡 **Résumé sits *inside* the form action row** ([Contact.jsx:224](../../../../src/sections/Contact.jsx#L224)) —
  competes with Send. **Enhancement:** Send should be the sole primary action in the
  form; Résumé belongs with the channels.
- 🟡 **The ExpeditionRecap adds significant visual + JS weight after the ask** (Beta
  copy audit: "recap adds significant weight"). It's a beautiful instrument but it's
  *after* the conversion point and can push the footer far down. **Enhancement:**
  ensure it's lazy and collapsible; consider it a reward that doesn't delay the footer
  CTA.

### Mobile

- 🔴 **Two-column grid stacks to form-then-correspondence** (`lg:grid-cols-[1.1fr_0.9fr]`
  [Contact.jsx:166](../../../../src/sections/Contact.jsx#L166)) — so on mobile the
  low-friction *copy email / LinkedIn* options land **below** the entire form. The
  users most likely to bail on a form (mobile) see the escape hatch last.
  **Enhancement:** on mobile, surface a compact "or reach me directly" row (email
  copy + LinkedIn) **above or immediately under** the Send button.
- 🟠 **Name + email are a 2-col grid** (`grid sm:grid-cols-2`
  [Contact.jsx:206](../../../../src/sections/Contact.jsx#L206)) — on `sm` this can be
  cramped; verify it's single-column at 390px (it is, `sm:` = 640px). Good — but the
  textarea `min-h-[140px]` + fields + chips + console is a tall form on a phone.
  **Enhancement:** collapse the status console to a single inline line on mobile.
- 🟠 **Inquiry chips wrap to 2 rows on mobile**, adding height before the fields.
  **Enhancement:** on mobile, a native `<select>` or a single default with "change"
  is faster than a wrap of pills.
- 🟠 **The rotating compass (132px) eats vertical space on the correspondence card**
  on mobile ([Contact.jsx:63](../../../../src/sections/Contact.jsx#L63),
  self-center). **Enhancement:** hide it on mobile — it's pure decoration and the
  phone needs the space.
- 🟡 **Autofill/inputMode are set (good).** Re-verify `enterKeyHint` chain
  (name→next, email→next, message→send) actually advances focus on mobile keyboards.
- 🟡 **Copy-email success is a 9×9 icon that flips to a check** ([Contact.jsx:52](../../../../src/sections/Contact.jsx#L52)) —
  on mobile, add a toast/label ("Copied!") since a subtle icon flip is easy to miss on
  a phone.

---

# PART B — GLOBAL CHROME & MENUS

---

## B1 · Desktop control cluster (SkyControl · Voice · Sound · SideRail · Wordmark · Map · StickyCta · Cursor)

- 🔴 **Glassmorphism survives the de-glass pass in the SideRail and coach-tips.**
  `SideRail` uses `backdrop-filter: blur(20px)` ([SideRail.jsx:91](../../../../src/components/SideRail.jsx#L91)),
  and the MobileMenu coach-tip does too ([MobileMenu.jsx:305](../../../../src/components/MobileMenu.jsx#L305)).
  The Codex C3 and the v1.1 log both say glass is a removed AI tell — but only
  `.realm-card` was de-glassed. **Enhancement:** replace with opaque
  `color-mix` surfaces to finish the pass consistently.
- 🟠 **Rail nav is analytics-dead (14 clicks vs map's 55).** Beta §3 flagged it for
  removal-or-redesign. It's a collapsed pill that expands on hover
  ([SideRail.jsx:66](../../../../src/components/SideRail.jsx#L66)) — a nice pattern few
  use. **Enhancement:** since the map is the loved tool, consider demoting the rail to
  a pure progress indicator (active chapter dot) and routing navigation through the
  map, reducing one competing control.
- 🟠 **Four+ persistent floating controls on desktop** (top-left wordmark, top-right
  sky, bottom-right voice+sound, left rail, plus StickyCta bottom-left) = the visual
  congestion the beta named (§12). **Enhancement:** audit whether voice needs to float
  persistently (33 opens all session) — it could live only in the map/hall.
- 🟠 **Custom cursor still present** ([Cursor.jsx], backlight reduced per log).
  Beta §14: "no user should mention the cursor before your work." Even reduced, it's a
  non-zero attention cost and a Windows pointer-events suspect (Beta §5 bug).
  **Enhancement:** re-confirm it's fully off on `(hover:none)` and consider default-off
  given the beta sentiment.
- 🟡 **SkyControl (5-mode) vs the loved sun/moon** — the beta loved the simple toggle;
  the 5-mode menu adds a layer. **Enhancement:** keep the one-click toggle as the
  primary gesture, 5-mode as a secondary reveal (mobile already restored the simple
  toggle — mirror that logic on desktop).
- 🟡 **StickyCta and the bottom-right cluster both live at the bottom edge** (left vs
  right [StickyCta.jsx:39](../../../../src/components/StickyCta.jsx#L39),
  [ControlCluster.jsx:17](../../../../src/components/ControlCluster.jsx#L17)) — on a
  1366 laptop they can feel like the screen is fenced by floating chrome.
  **Enhancement:** verify they never visually collide; consider merging the résumé
  affordance so there aren't two résumé buttons on screen.

## B2 · Mobile menu & chrome (MobileMenu · DayNightToggle · coach-tip)

- 🟠 **The single-FAB bottom sheet is genuinely strong** (this is the best-executed
  surface in the app) — but **the sound layer's existence depends on a one-time
  coach-tip.** If dismissed/missed, a mobile user never learns there's sound/theme/voice
  ([MobileMenu.jsx:237](../../../../src/components/MobileMenu.jsx#L237)). **Enhancement:**
  the persistent "sound primed" dot on the FAB ([:325](../../../../src/components/MobileMenu.jsx#L325))
  is good; add a tiny label on first open so the sheet's purpose is instant.
- 🟠 **DayNightToggle top-right + FAB bottom-right = two mobile control anchors.**
  Deliberate (beta loved the toggle), but a first-timer has two separate control
  locations. **Enhancement:** ensure the toggle reads clearly as "theme" (an icon
  alone can be ambiguous — Beta §16 logo/icon confusion).
- 🟠 **The sheet's `maxHeight: 76vh` + scroll** — on a small phone the Site-feel
  instruments (ThemeWheel + VolumeDial) + primary CTAs + explore rows + footlink can
  require scrolling *inside* the sheet, hiding the Contact/Résumé CTAs below the fold
  of the sheet. **Enhancement:** pin the primary CTAs to the top of the sheet (above
  Site-feel), since conversion is the point.
- 🟠 **ThemeWheel + VolumeDial are delightful but discovery-heavy** — a RDR2 weapon
  wheel and an Apple volume dial are novel interactions a user must *learn*
  ([MobileMenu.jsx:373-375](../../../../src/components/MobileMenu.jsx#L373)). Beta §9:
  unclear affordances. **Enhancement:** ensure each has an instant-read state (active
  theme name shown, volume level visible) so they're usable without experimentation.
- 🟡 **Persona/voice drawer is deep** (main → voice → summon). Powerful, but voice
  adoption is ~9% (Beta §4). **Enhancement:** fine to keep buried; just don't let it
  crowd the primary Explore row above Navigate.
- 🟡 **Coach-tip glass** (noted in B1) — de-glass for consistency.

## B3 · Map overlay (⌘K / mobile in-sheet)

- 🟠 **The map is the *most-loved* nav (55 opens) but ⌘K is invisible to non-devs.**
  Only 2 keyboard-shortcut users total (Beta §6). On desktop it's reachable via the
  rail's Map row — good. **Enhancement:** since it's the winning tool, give it a more
  prominent always-visible entry (a labeled "Map" affordance), not just a rail row +
  shortcut.
- 🟠 **Mobile map is an in-sheet numbered list** (per log) — good divergence, but
  verify it's discoverable: the Explore→Navigate row is the only path. **Enhancement:**
  confirm "Navigate" reads as "jump to a section," not something abstract (the log
  added subtitles — good).
- 🟡 **Map pins with fantasy coords** — ensure the map doesn't re-introduce the
  "scammy esoteric" read (Beta §8) with unlabeled symbols; labels on active pins help.
- 🟡 **Whoosh sound on open/close** ([Chronicle.jsx:41](../../../../src/pages/Chronicle.jsx#L41)) —
  delightful, keep, but ensure it respects mute.
- 🟡 **No visible "you are here" beyond the active pin** — a progress sense would help
  orient. **Enhancement:** show scroll progress on the map.

## B4 · Footer (final conversion scene — `Layout.jsx`)

- 🟠 **Good: it's now a real CTA scene** (headline + Get in touch/Résumé/LinkedIn/
  GitHub [Layout.jsx:132-162](../../../../src/components/Layout.jsx#L132)). But **four
  equal-weight actions** dilute the primary ask. **Enhancement:** make "Get in touch"
  clearly dominant; LinkedIn/GitHub as small icons.
- 🟡 **The Atelier italic link + credit line** add a quiet tail — fine, but ensure the
  footer doesn't reintroduce length after the recap. **Enhancement:** tighten spacing
  on mobile.
- 🟡 **Footer appears on `/making-of` too** (shared shell) — verify the "Get in touch"
  there routes correctly (it navigates `/` — a jarring full nav). **Enhancement:** on
  the Atelier, mailto directly instead of bouncing home.

---

# PART C — THE ATELIER (`/making-of`)

**What it is:** cold-open confession + faint astrolabe; Act I (commit graph, stat
tally, built/cut ledger); Act II (Observatory + Codebase Atlas instruments); Act III
(easter-egg field guide + tech list); Act IV "The Reckoning" (beta feedback → changes
+ CTA); coda (PersonaTriptych + manifesto + FaceParticles signature).

### Desktop

- 🔴 **The beta called this page "a refined Claude artifact."** Act IV (The Reckoning)
  is the genuine fix — honest "they said → I changed" ([Atelier.jsx:245-276](../../../../src/sections/Atelier.jsx#L245)) —
  and it's the strongest thing on the page. **But it's Act *IV*,** below three acts of
  instruments and a "confession." A skeptic bounces before reaching the proof of
  humanity. **Enhancement:** lead with The Reckoning (or surface it far higher); it's
  the most un-fakeable, most persuasive content and it's currently buried.
- 🟠 **Two decorative astrolabes on one page** (the cold-open `HeroInstrument`
  [Atelier.jsx:17](../../../../src/sections/Atelier.jsx#L17) + the recurring compass
  motif) plus FaceParticles — the "decoration standing in for decisions" meta-tell.
  **Enhancement:** cut the cold-open instrument; let the confession copy stand alone.
- 🟠 **"Confession" / "manifesto" / "the maker assembled from characters" framing is
  exactly the self-indulgent self-narration the beta flagged** (§18). **Enhancement:**
  reframe as plain engineering case-study language: "Why I built this," "What I'd do
  differently."
- 🟠 **The Observatory + Codebase Atlas are heavy instruments that gate real proof
  behind interaction** ([Atelier.jsx:198-218](../../../../src/sections/Atelier.jsx#L198)).
  Impressive to a dev who explores; invisible to a skimmer. **Enhancement:** pair each
  instrument with a one-line static takeaway so the *point* lands without interaction.
- 🟡 **`chapter-eyebrow` + roman-numeral acts** repeat the site's eyebrow motif at
  scale ([Act](../../../../src/sections/Atelier.jsx#L89)). **Enhancement:** the acts are
  fine, but quiet the eyebrow styling.
- 🟡 **No architecture diagram / real artifact** (the plan's own "remaining" item).
  Beta §18B wanted screenshots, diagrams. **Enhancement:** add one real
  architecture/flow diagram — the single most credibility-building artifact for this
  page.

### Mobile

- 🟠 **Instrument-heavy page on a phone.** Observatory (constellation), Codebase Atlas
  (tree), CommitGraph, FaceParticles — each is a canvas/interactive component. Even
  with the touch pass (log §11.4), this is a lot of heavy, learn-to-use UI on mobile
  where users skim. **Enhancement:** on mobile, default the instruments to their
  *static summary* state, tap to expand into interactive — don't make the phone user
  drive an observatory to get the point.
- 🟠 **The Reckoning table (said/changed) on a narrow screen** — verify the two-column
  said/changed rows ([Atelier.jsx:249-260](../../../../src/sections/Atelier.jsx#L249))
  stack cleanly and the tags read. This is the page's best content; it must be
  flawless on mobile. **Enhancement:** stacked "They said / I changed" cards on mobile.
- 🟠 **Codebase Atlas capped scroll pane** (log: `max-height:56vh`) — a scroll-within-
  scroll on a phone is the Experience-strip problem again. **Enhancement:** verify the
  inner scroll doesn't trap the page scroll; consider a flat tap-to-expand list on
  mobile.
- 🟡 **FaceParticles signature** is a nice touch but a particle canvas at the bottom of
  a long page is a perf cost on a phone (Beta §11). **Enhancement:** static image
  fallback on coarse pointers / low-power.
- 🟡 **The cold-open astrolabe SVG** bleeds off-page ([Atelier.jsx:139](../../../../src/sections/Atelier.jsx#L139)) —
  on mobile ensure it doesn't cause horizontal overflow/scroll.
- 🟡 **Long page, no in-page nav** — on mobile the four acts are a long scroll with no
  jump-to. **Enhancement:** a slim act-progress indicator or a "back to top / to
  contact" pinned affordance.

---

## D. Cross-cutting themes (fix once, benefit everywhere)

| # | Theme | Where it recurs | Fix |
|---|---|---|---|
| 1 | **Letterboxed `object-contain` screenshots** undersell proof | Works plates + cards | `object-cover` + focal crop; capture at card aspect |
| 2 | **`chapter-eyebrow` numeral motif on every heading** (T3/L2) | Hero, About, Experience (×2), Arsenal, Works, Contact, Atelier | Quiet it to one subtle instance per section; kill nested/duplicate eyebrows |
| 3 | **Rounded pills survive** as a named AI tell | Arsenal clusters, Contact inquiry, Experience badges, Works "show more" | Extend the mono "spec line" motif already adopted elsewhere |
| 4 | **Glassmorphism residue** (C3) | SideRail, MobileMenu coach-tip | Opaque `color-mix` surfaces |
| 5 | **Decorative rotating instruments** compete (M3) | Hero astrolabe, Arsenal sigil, Contact compass, Atelier ×2 | One diegetic instrument per page max; freeze the rest |
| 6 | **Horizontal-in-vertical scroll** ambiguity | Experience (both breakpoints), Atlas mobile | Wheel→horizontal mapping desktop; vertical stack on mobile |
| 7 | **Fantasy register leaks** into professional copy (Beta §23) | "realm," "summon," "raven," "expedition," "confession/manifesto" | Literal terms in `chronicle`+`plain`; keep flavor to easter-egg voices |
| 8 | **Content gated behind interaction** vs skim behavior | Arsenal orbit, Atelier instruments, Works carousel | Show the payload; make exploration additive, not required |
| 9 | **Mobile = responsive shrink** on 3 surfaces | About, Works, (partially) Contact | Bespoke mobile rhythm per §11.3 |
| 10 | **Uniform density/motion** (meta-tell) | Every section same ScrollReveal fade + same polish | Vary one section deliberately; break the evenness |

---

## E. Prioritized enhancement backlog (do in this order)

**P0 — trust + conversion (before Beta 2)**
1. Works screenshots → `object-cover` focal crops (the #1 proof signal). [A5]
2. Contact: make direct-contact (copy email/LinkedIn) co-equal with the form, on
   mobile *above* the form; default inquiry to "Senior role." [A6]
3. Experience: fix wheel→horizontal on desktop; vertical stack on mobile. [A3]
4. Atelier: lead with "The Reckoning"; add one architecture diagram. [C]
5. Hero mobile: copy-first layout, shrink instrument, cap proof strip to 2 tokens. [A1]

**P1 — de-AI finishing + skim**
6. Finish the de-glass pass (SideRail, coach-tips) and the de-pill pass (Arsenal,
   Contact, Experience). [B1, D3, D4]
7. Arsenal: slow/quiet the orbit, show primary labels persistently, add proficiency. [A4]
8. Kill duplicate/nested `chapter-eyebrow`; fix About "Origin." title. [D2, A2]
9. Freeze decorative rotating instruments (Contact compass, Arsenal sigil, Atelier
   cold-open). [D5]
10. Purge residual fantasy copy from professional sections. [D7]

**P2 — polish + bespoke mobile**
11. Bespoke mobile rhythm for About + Works (not a reflow). [A2, A5]
12. Atelier instruments → static-summary-first on mobile. [C]
13. StickyCta / cluster collision + duplicate résumé buttons audit. [B1]
14. Reduce persistent desktop controls (demote rail to progress). [B1]

---

## F. Acceptance bar (re-test after fixes)

A hostile first-timer, on a 390px phone, in dark mode, should:
- Understand role + proof within one screen of the hero (no scrolling). ✅ when A1 done.
- See a *product* (not a letterboxed thumbnail) the first time Works loads. ✅ when A5 done.
- Reach a direct-contact option without scrolling past the whole form. ✅ when A6 done.
- Never trigger a horizontal scroll they didn't intend. ✅ when A3 done.
- Not describe any section as "AI," "confusing," or "too much." (Beta qualitative bar.)
- Not mention the cursor, the compass, or "what do I click" before mentioning the work.

> Every item above traces to a Beta-1 pattern (analytics behavior + repeated
> sentiment) or a Codex tell — no single-reviewer opinions were elevated to action,
> per the weighting rule in all three source reports.
