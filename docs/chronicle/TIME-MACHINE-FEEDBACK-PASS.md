# TIME-MACHINE — Feedback Pass 1 (owner review, 2026-07-10)

> **Owner:** Manan · **Cycle:** post-build (the `/time-machine` STRATA coda shipped
> 2026-07-10) · **Status:** 🔵 deciding — this doc records each requested change
> with a senior design/architecture read (value vs noise, effect, action plan)
> and my pushback where I disagree. Nothing here is built yet; the greenlit items
> queue behind the open decisions in §0.
>
> **Read with:** [TIME-MACHINE-PROPOSAL.md](TIME-MACHINE-PROPOSAL.md) (should-we +
> options), [sections/11-the-time-machine.md](sections/11-the-time-machine.md)
> (build spec), [TACTILE-MOMENTS §0](TACTILE-MOMENTS.md#0-the-governing-principle)
> (the dilution rule), [common-ai-signs.md](common-ai-signs.md).

---

## 0. Decisions needed before build (the blocking few)

1. **The UFO companion (§4)** — go/scope + tone + theme-framing. This is the one
   item where I'm actively pushing back on *scope and risk*; everything else is
   mostly execution. See §4 for the full argument.
2. **The "back in time" news transition (§5)** — confirm the iterated mechanic,
   then handpick from the candidate lists in **Appendix A** (50 + 50 texts).

Everything else (§1–§3, §6–§11) I've accepted or accepted-with-tweaks and can
build as soon as you say go — they're corrections/enhancements, not debates.

---

## Cross-cutting principle (applies to every item)

**Global-audience legibility + voice integrity.** Per your criteria: copy must
land for a non-native English reader *and* stay in character per voice. These
pull against each other — the sealed voices (Deadpool, Chandler, Scott) lean on
idiom and cultural puns that don't translate. Rule going forward:

- **`chronicle` + `plain` are the load-bearing voices** — short sentences,
  concrete nouns, no idioms a translator would miss. A skeptical CTO in Berlin or
  Bengaluru reads these cleanly.
- **Sealed voices keep full character** but we bias toward *universally* famous
  references (World Cup, not a US-sports in-joke) and keep sentences short.
- **The UFO quips + news texts (below) are the highest risk** — they're the most
  idiom-heavy surfaces. Every quip ships in all ten voices, and each is written
  to survive a non-native reader (see §4, §5).

---

## 1. Fog + ambient layers (reuse from the 404) — ✅ accepted

**Ask:** add the 404's fog/ambient layers for drama.

- **Value:** high, cheap. The 404 ("Off the Map") already has a tuned, performant
  fog/particle atmosphere; reusing it gives the Time Machine instant depth and
  ties the two "off-spine" pages into one visual family. Zero new invention risk.
- **Noise:** low — but fog must sit **behind** the exhibits and **not** fight the
  STRATA grade (§6). Fog density should ride `--age`: thin at the present, thick
  in the deep past (a literal "mists of time").
- **Action:** extract the 404 fog into a reusable `<Fog>`/`<Ambient>` component
  (right now it likely lives inside `Void.jsx` — promote it to `components/`),
  parameterize density/tint, mount it in `TimeMachine.jsx` driven by `--age`.
  Honor reduced-motion (static, faint).
- **Outcome:** same wonder, one shared component, no perf regression.

---

## 2. Dedicated, unique time-travel UI animations — ✅ accepted (as a system, not one-offs)

**Ask:** dedicated UI animations that carry a unique time-travel theme across the
whole page.

- **My read:** don't scatter unrelated animations — that's how a page starts to
  look like AI slop (many effects, no thesis). Define **one motion language** for
  this page and apply it everywhere:
  - **"Temporal displacement"** — elements don't just fade in; they arrive with a
    faint **chromatic-aberration split + a 1–2px time-echo ghost** that settles,
    as if catching up to *now* from another moment. Cheap (CSS
    `text-shadow`/duplicate layer + transform), unique, and thematically exact.
  - **Year-scrub coupling** — the readout, grade, and echo intensity all read from
    the same `--age`, so the whole page feels like one instrument.
- **Value:** high — this is what makes it "a moment, not a list." **Noise:** low if
  it's *one* language; high if it's five gimmicks. **Action:** spec the
  displacement language in [sections/11](sections/11-the-time-machine.md) §motion,
  build as a `ScrollReveal` variant so it's reused, not copy-pasted.

---

## 3. Iframe correctness pass — ✅ all accepted (these are fixes to my build)

Four related asks, all correct and mostly bug-fixes to what I shipped:

| # | Ask | Verdict | Why |
|---|---|---|---|
| 3a | **Iframe must be clean** — no sepia/grade on the live portfolio; grade only the *cards/chrome* | ✅ correct, my mistake | The whole point is a *true window* into the old site. Grading it lies about what it looked like and looks cheap. The `backdrop-filter` grade must exclude the frame. |
| 3b | **Cards/chrome reflect the year's design language** (colors, type, styling per era) | ✅ strong idea | This is the real "the container ages" payoff. Per-era chrome tokens (2019 = flatter, heavier, of-its-time; 2023 = glassier) beat a global sepia wash. Data-drive it: `era.chrome` token set. |
| 3c | **Single live iframe** — tear down the previous when waking another | ✅ correct, essential | Two live iframes = two full old sites running = jank + memory. Lift "which era is awake" to the section; only one `EraExhibit` mounts an iframe at a time; others revert to poster. |
| 3d | **Render iframes at 1440px** and scale to fit, no clipped edges | ✅ correct | These were built for desktop. Render the iframe at a fixed `width:1440` and **CSS-scale** (`transform: scale(container/1440)`) so the whole intended layout shows, uncut. Set `scrolling` + a min-height so nothing is cropped. |

- **Effect:** the exhibits become *honest* (real window) and *lighter* (one
  iframe), while the aging moves entirely onto the cards where it belongs.
- **Action plan:** (1) move the grade layers to grade only `.tm-exhibit` chrome +
  page, not `.tm-exhibit__frame`; (2) add `era.chrome` token sets + apply per
  stratum; (3) hoist `awakeEra` state to `TimeMachine.jsx`, pass `isAwake` down,
  cleanup iframe on change; (4) fixed-1440 render + scale wrapper.

---

## 4. The UFO companion — 🟠 my honest verdict: **yes, but phased & re-scoped**

This is the big one, and where you asked me to argue. I'll be direct.

### 4a. Value vs noise — the real read
- **Upside is real and large.** A reactive creature that scans the UI, dodges your
  cursor, and cracks context-aware jokes is a genuine **awwwards-tier, shareable**
  moment. On an *off-spine wonder page*, playful sci-fi is on-brand in a way it
  never would be on the homepage. This is the single highest-ceiling idea in the
  batch.
- **But three risks are equally real:**
  1. **Professionalism / audience.** Your money audience is CTOs and hiring
     managers. A companion that **bullies the user** can read as "cute but
     immature" to the exact people you want to hire you. *Charming* self-aware
     humor helps you; *mocking the visitor* is a coin-flip. → I recommend
     **cheeky-but-never-at-the-user's-expense**, and it must be trivially
     dismissible.
  2. **The "cheap if not perfect" trap — which you named yourself.** Fake physics
     is worse than no physics. The bar you set ("realistic physics or it looks
     cheap") is *correct* and *high*. Meeting it for fly-in + hover + drag-escape
     + hit-recoil + scan + anger states + gyro + haptics, all at 60fps, is a
     multi-week build with real iteration risk.
  3. **Theme clash.** A little-green-men UFO sits oddly next to a *cartographer's
     chronicle*. "Time machine" leans sci-fi enough to carry it, but I'd frame the
     creature as a **"temporal probe / drone"** (or lean into the anachronism as
     the joke: a UFO that's clearly lost in the wrong century). Worth a decision.

### 4b. Is it possible without 3D libraries? — **Yes, genuinely.** Here's how.
- **Render:** one `<canvas>` (Canvas2D) sprite, or a small DOM element, layered
  above the page (`pointer-events` only on the craft). Pseudo-3D depth = **scale +
  y-offset + a ground shadow that grows/shrinks + slight skew** (the fly-in from
  0→100 with x/y drift is just an eased scale+translate). No WebGL needed.
- **Physics:** a hand-rolled **spring-damper + velocity integrator** in a single
  rAF loop (position, velocity, target). This is ~60 lines and gives *real* feel:
  - *Fly-in:* critically-damped spring from off-screen + scale 0→1.
  - *Idle hover:* sum of two slow sines (bob) + tiny noise.
  - *Hit/recoil:* impulse to velocity away from the click point + a damped
    rotational wobble + scale dip → "it got hit." Multiple hits raise an `anger`
    scalar that shortens damping (jitterier, faster) — physical *and* emotional.
  - *Drag-escape:* target = cursor, but a **repulsion force** grows as you hold,
    so it strains against the leash and breaks free if you stop feeding it motion.
    This is the "resistance" you described, and springs model it beautifully.
- **Beam + scan:** a conical **radial-gradient** mask projected from the craft; a
  scanline sweeps it. **Element reciprocation** = each frame, cheap AABB overlap
  between the beam cone and a *pre-registered* set of target rects (title, rail,
  controls, cards). On overlap, toggle a CSS class (`.tm-scanned`) that does the
  glitch/glow on that element. Registered targets + throttling keeps it O(n) small.
- **Coach-tip quips:** a small portalled bubble that follows the craft; text from
  a voiced pool, chosen by context (which element / hit / drag / escape / random).
- **Sound:** all synthesizable in the existing `sound.js` engine (scan = filtered
  sine sweep; hit = the `settle`/`click` family; thruster = a gated noise bed like
  the reel; escape = a rising whoosh). No samples required. Intent-gated.
- **Haptics:** `navigator.vibrate()` works on **Android/Chrome**; **iOS Safari
  does not support it** — so haptics is a progressive bonus, never core. State it.
- **Gyro:** `DeviceOrientation` needs an **explicit permission prompt on iOS 13+**
  and is inconsistent — treat as a tiny, optional "nice on Android" flourish, not
  a pillar.

**Performance verdict:** one canvas sprite + a handful of gradients + AABB checks
against ~6 registered rects, all in one rAF, is comfortably 60fps on a mid phone —
*if* disciplined (no per-frame DOM queries; cache rects on scroll/resize; pause
the loop when the tab/page is hidden; disable entirely on reduced-motion + coarse
low-end). The danger isn't raw perf; it's **scope creep** turning it janky.

### 4c. My recommendation — a phased build with a hard MVP line
- **Phase 1 (the 80% wow, buildable + guaranteeable):** fly-in → idle hover →
  **beam-scan of the hero title + rail + controls with element reciprocation** →
  **drag-with-resistance + escape** → **hit-recoil + anger** → **context quips** →
  **sound**. All 2D/spring, desktop-first, `pointer-events` disciplined, reduced-
  motion off. This alone is the shareable moment.
- **Phase 2 (progressive, only if Phase 1 lands):** follow-on-scroll to the cards
  + failed/frustrated scans, **haptics (Android)**, **gyro tilt (opt-in)**.
- **Guardrails (non-negotiable):** never blocks reading or clicks; a quiet
  **dismiss** (and it remembers); off on touch low-end + reduced-motion; humor is
  self-aware, not insulting; it's **only** on `/time-machine`, never the homepage.

**Bottom line:** I can *guarantee* a cinematic Phase-1 in 2D without 3D libs. I
**cannot** guarantee the *entire* spec (gyro + haptics + full anger AI + flawless
"real" feel everywhere) in one pass — and shipping that half-done is exactly the
"cheap" outcome you (rightly) fear. So: **yes, phased, MVP-gated.** Decisions I
need from you are in §0/questions.

---

## 5. The "going back in time" news transition — ✅ love it, here's the better version

**Ask:** between hero→2023 and 2023→2019, a fast scroll/dissolve of ~20 big world
events per gap, scroll-controlled (reverse on scroll-up), weighted so bigger news
is more prominent, subtle-but-not-missed, with page-flip sound scaled to scroll
velocity. Generate 50 candidates per gap for handpicking.

- **This is the strongest marketing idea in the batch.** The "wow, I *remember*
  this!" jolt builds a personal, emotional bond with the site in seconds — it's
  the [Proustian](https://en.wikipedia.org/wiki/Involuntary_memory) hook. Keep it.

### 5a. Where your concept needs iterating (the honest bits)
- **"Only readable if you scroll slowly" risks being missed *or* frustrating.**
  Most visitors scroll at one speed and never learn the secret. → Fix below.
- **Pure scroll-hijack dissolves can feel heavy / fight the smooth scroll.**
- **Mixed tone.** A war or a death dissolving next to a movie premiere can feel
  tone-deaf. Curation matters (see 5c).

### 5b. The iterated concept — **"The Time Tunnel"** (recommended)
A short **pinned segment** (GSAP pin + scrub) between cards — a receding corridor
of years:
- A **big year marker** (2026 → 2025 → 2024 → 2023) is **always legible even at
  full speed** — so no one misses that they're travelling back. It's the anchor.
- Under each year, **2–4 event captions** stream past with the **temporal-echo**
  language (§2): they arrive with a Z-recede + slight blur, hold, and dissolve.
  **Weighting is data-driven:** each event has `weight: 'major' | 'mid'`. *Major*
  events get **bigger, bolder type + a longer scrub dwell** (more px of scroll) so
  they're readable at normal speed; *mid* events flicker briefly and reward the
  slow scroller. This is exactly your "bigger news more visible," made concrete.
- **Scrub-controlled + reversible** by construction (ScrollTrigger scrub) — scroll
  up and the years/events run forward again.
- **Subtle-but-not-missed:** the *year* is unmissable; the *captions* are the
  reward for slowing — a faint one-time hint ("slow down to read the years") makes
  the mechanic discoverable without nagging.
- **Sound:** a granular **page-flip** whose rate = scroll velocity (fast scroll →
  a flurry of flips; slow → single soft turns). Built in `sound.js`, gated, quiet.
- **Reduced-motion / touch:** collapses to a clean static "2026 → 2023" list of
  the *major* events only. Still tells the story, no scrub.

- **Value:** very high. **Noise:** low **if** curated + the year stays legible.
  **Action:** `components/TimeTunnel.jsx` (pinned, scrubbed), data in
  `constants.timeTunnel[gapId]` (event, year, weight, `verify?`), copy voiced.

### 5c. Content curation principle (the marketing-genius bit)
- **Bias to globally-shared, non-divisive anchors:** pop culture, sport, space,
  tech/AI, and universally-acknowledged world moments (the pandemic, a monarch's
  death, a World Cup). These trigger the memory jolt in *everyone*, everywhere.
- **Handle sensitive events carefully:** partisan politics and active wars split
  the audience and clash with the playful tone — I've included the famous ones in
  Appendix A but **flagged them `[sensitive]`**; my recommendation is to keep the
  final cut mostly neutral-warm. Your call, per pick.
- **`[verify]`** flags anything near/after my Jan-2026 knowledge cutoff or
  date-sensitive — confirm before shipping.
- **Non-native legibility:** each text is a short, concrete noun phrase, no idiom.

👉 **Candidate texts for handpicking are in [Appendix A](#appendix-a--candidate-time-tunnel-texts) — 50 for each gap.**

---

## 6. Grade the cards, not the iframe — ✅ (folded into §3a)

Covered above. The `--age` grade applies to page + card chrome only; the live
frame is pristine. This also *fixes* a subtle honesty problem in the current build.

---

## 7. Poster dim + button highlight — ✅ accepted (quick win)

**Ask:** on the poster, add an overlay that dims the poster and highlights the
"Wake the ruin" button.

- **Value:** real usability — right now the button floats on a busy poster. A
  radial **scrim** (darker toward the edges, clear behind the button) + a subtle
  button glow gives a clear focal point and reads as "this is asleep; press to
  wake." **Noise:** none. **Action:** add a `.tm-exhibit__scrim` gradient layer +
  button `box-shadow`/ring; remove on wake. 20-minute change.

---

## 8. Lock the year readout per card — ✅ accepted (bug fix)

**Ask:** during a card's scroll the right-side year must stay fixed; today it
drifts (e.g. "2025→2021") and confuses.

- **You're right — this is a bug in my interpolation.** The readout lerps
  *continuously* between strata, so mid-card it shows in-between years. The mental
  model should be: **the year is fixed while you're *on* a card, and only changes
  in the transition tunnels (§5) between them.**
- **Action:** snap the readout to the active stratum's year while a card fills the
  viewport (IntersectionObserver "which era is centered" → hold that year); let it
  *animate/count* only inside the TimeTunnel transitions. This makes the number
  trustworthy and turns the count-down into a deliberate transition beat, not
  noise. Net: clearer *and* more cinematic.

---

## 9. "End of the road" floor with an asset — ✅ accepted, elevated

**Ask:** the last section needs a 2D canvas/SVG or mapped asset + "End of the
road" / "Dead end" copy on-theme.

- **Value:** closes the descent with a *moment* instead of a text block. Right now
  the floor is just centered copy. **Noise:** low. **On-theme framing:** we're
  cartographers — so the floor is **"the edge of the map"**: a torn/burnt map edge
  or a compass with no further bearing, fading into fog (§1), with a single line
  ("The record ends here — the rest is uncharted"). Ties the sci-fi descent back
  to the Chronicle's spine at the very bottom.
- **Copy note:** "Dead end" is a bit harsh/negative for the last thing a visitor
  reads; I'd use **"The edge of the map" / "Uncharted before this"** — warmer,
  on-brand, and it invites the climb back up (which is the point). Open to your
  preference.
- **Action:** a Canvas2D or SVG "map edge / compass" asset (procedural, graceful
  fallback), copy voiced in all ten voices, fog behind it. A quiet "return to the
  present ↑" completes the loop.

---

## 10. Priority + sequencing (my recommended build order)

Cheapest-highest-value first; the UFO is gated on your §0 answers.

| Order | Item | Effort | Value | Notes |
|---|---|---|---|---|
| 1 | §3a/§6 clean iframe + §3c single-iframe + §3d 1440-scale | S | High | Correctness; do first |
| 2 | §8 year-lock + §7 poster scrim | S | High | Quick trust/usability wins |
| 3 | §1 fog reuse + §9 map-edge floor | S–M | High | Atmosphere + a real ending |
| 4 | §3b per-era card chrome + §2 temporal-echo language | M | High | The "container ages" payoff |
| 5 | §5 Time Tunnel news transitions | M | V.High | After you handpick Appendix A |
| 6 | §4 UFO — Phase 1 | L | V.High | Gated on §0 decisions |
| 7 | §4 UFO — Phase 2 (haptics/gyro/scroll-follow) | M | Med | Only if Phase 1 lands |

---

## Appendix A — Candidate "Time Tunnel" texts

Handpick by marking `[x]`. Tags: **`[MAJOR]`** = weight it bigger/longer;
`[mid]` = brief flicker; `[sensitive]` = divisive/heavy (curate carefully);
`[verify]` = confirm date/accuracy (near/after Jan-2026 cutoff). Each line is
written short + concrete for non-native readers; final voiced wording per bundle
comes later.

### Gap 1 — Hero (2026) → the 2023 card  (≈2026 → 2023)

**2026**
- [x] `[MAJOR][verify]` The FIFA World Cup kicks off across the USA, Canada & Mexico
- [ ] `[MAJOR][verify]` Winter Olympics in Milan–Cortina, Italy
- [x] `[mid][verify]` AI "agents" start doing real work for people
- [x] `[mid][verify]` Foldable iPhone rumors reach fever pitch

**2025**
- [ ] `[MAJOR]` DeepSeek shocks the AI world overnight
- [x] `[MAJOR][verify]` iPhone 17 Pro released
- [ ] `[MAJOR]` GPT-5-era AI models arrive
- [x] `[mid]` The Ghibli-style AI image trend takes over the internet
- [x] `[MAJOR]` Los Angeles wildfires
- [ ] `[MAJOR][sensitive]` Pope Francis dies
- [ ] `[mid]` Oasis reunites and tours after 16 years
- [x] `[mid]` "A Minecraft Movie" breaks box-office records
- [x] `[mid]` Nvidia becomes the world's most valuable company
- [ ] `[sensitive]` A new US president is inaugurated
- [ ] `[mid][verify]` Squid Game returns for its final season

**2024**
- [ ] `[MAJOR]` The Paris Summer Olympics
- [ ] `[MAJOR]` The CrowdStrike outage turns screens blue worldwide
- [ ] `[MAJOR]` A total solar eclipse crosses North America
- [x] `[MAJOR]` Taylor Swift's Eras Tour becomes the biggest ever
- [ ] `[mid]` "Brat summer" paints the internet green
- [x] `[mid]` Deadpool & Wolverine
- [ ] `[mid]` Dune: Part Two
- [ ] `[mid]` Notre-Dame reopens in Paris
- [x] `[MAJOR]` OpenAI reveals Sora, AI that makes video
- [ ] `[mid]` Apple Vision Pro goes on sale
- [ ] `[mid]` Bitcoin hits a record high
- [x] `[sensitive]` Attempted assassination of Donald Trump

**2023**
- [x] `[MAJOR]` ChatGPT and GPT-4 put AI in everyone's hands
- [x] `[MAJOR]` "Barbenheimer" — Barbie and Oppenheimer on the same day
- [x] `[MAJOR]` India wins the race to the Moon's south pole (Chandrayaan-3)
- [ ] `[mid]` The Titan submersible is lost near the Titanic
- [ ] `[mid]` Hollywood writers and actors go on strike
- [x] `[mid]` Twitter becomes "X"
- [x] `[mid]` Threads launches and hits 100M users in days
- [ ] `[mid]` Lionel Messi joins Inter Miami
- [x] `[MAJOR][verify]` India hosts the Cricket World Cup
- [ ] `[mid]` The coronation of King Charles III
- [ ] `[sensitive]` A devastating earthquake hits Turkey and Syria
- [ ] `[mid]` Spider-Man: Across the Spider-Verse
- [ ] `[mid]` "The Last of Us" becomes a hit TV show
- [x] `[sensitive]` War breaks out between Israel and Hamas
- [x] `[mid]` Everyone is talking to AI chatbots for the first time

*(Extra spares for balance — pick to taste)*
- [ ] `[mid]` Wordle-style daily games are everywhere
- [ ] `[mid]` "Succession" airs its final season
- [x] `[mid]` The Barbie movie makes pink sell out globally
- [x] `[mid][verify]` GTA VI's first trailer breaks view records
- [ ] `[mid]` AI "deepfakes" enter the mainstream conversation
- [x] `[mid]` Electric cars outsell expectations worldwide
- [ ] `[mid]` "Flowers" by Miley Cyrus tops charts everywhere
- [x] `[mid]` The Apple Watch and rings track everyone's sleep

### Gap 2 — the 2023 card → the 2019 card  (≈2023 → 2019)

**2022**
- [x] `[MAJOR]` Argentina and Messi win the World Cup in Qatar
- [x] `[MAJOR]` ChatGPT launches and changes everything
- [x] `[sensitive]` Russia invades Ukraine
- [ ] `[MAJOR][sensitive]` Queen Elizabeth II dies after 70 years
- [x] `[mid]` Elon Musk buys Twitter
- [x] `[mid]` The Will Smith slap at the Oscars
- [x] `[MAJOR]` The James Webb telescope sends its first images
- [ ] `[mid]` Top Gun: Maverick brings people back to cinemas
- [ ] `[mid]` "Stranger Things" makes a 1985 song #1 again
- [ ] `[mid]` The FTX crypto empire collapses
- [ ] `[sensitive]` The US overturns Roe v. Wade

**2021**
- [x] `[MAJOR]` COVID vaccines roll out around the world
- [x] `[MAJOR]` "Squid Game" becomes Netflix's biggest show ever
- [x] `[mid]` A giant ship blocks the Suez Canal for days
- [x] `[MAJOR]` The NFT and "JPEG art" boom
- [x] `[mid]` Facebook renames itself "Meta"
- [ ] `[mid]` Billionaires race to space
- [ ] `[MAJOR]` Spider-Man: No Way Home breaks pandemic box-office records
- [ ] `[mid][verify]` The Tokyo Olympics (held a year late, empty stadiums)
- [ ] `[mid]` GameStop and the meme-stock frenzy
- [ ] `[sensitive]` The US Capitol riot on January 6
- [x] `[sensitive]` The Taliban retakes Afghanistan

**2020**
- [x] `[MAJOR]` COVID-19 shuts down the whole world
- [x] `[MAJOR]` "Working from home" and Zoom become normal
- [ ] `[MAJOR][sensitive]` George Floyd protests spread worldwide
- [ ] `[sensitive]` Kobe Bryant dies in a helicopter crash
- [ ] `[mid]` SpaceX launches astronauts for the first time
- [ ] `[mid]` "Tiger King" takes over lockdown TV
- [x] `[mid]` "Among Us" becomes the game of the year
- [ ] `[mid]` Australia's huge bushfires
- [ ] `[sensitive]` A new US president is elected
- [x] `[mid]` Face masks become part of daily life

**2019**
- [x] `[MAJOR]` The world sees the first-ever photo of a black hole
- [x] `[MAJOR]` Avengers: Endgame becomes the biggest movie ever
- [ ] `[sensitive]` Notre-Dame cathedral catches fire in Paris
- [x] `[mid]` "Game of Thrones" airs its final season
- [ ] `[mid]` "Old Town Road" is stuck in everyone's head all year
- [ ] `[mid]` Greta Thunberg leads global climate strikes
- [x] `[mid]` The "Area 51 raid" meme goes viral
- [ ] `[mid]` Disney+ launches with The Mandalorian and Baby Yoda
- [x] `[mid]` The first foldable phones appear
- [x] `[sensitive][verify]` Months later, the first COVID cases emerge in Wuhan

*(Extra spares)*
- [x] `[mid]` "Baby Shark" becomes the most-watched video ever
- [ ] `[mid]` "Joker" wins big and divides the internet
- [ ] `[mid]` "Parasite" makes Oscar history
- [ ] `[mid]` TikTok explodes worldwide
- [ ] `[mid]` "Bird Box" and the blindfold challenge
- [ ] `[mid]` "Baby Yoda" is everywhere
- [x] `[mid]` 5G phones start to arrive
- [ ] `[mid]` Sourdough, banana bread & home baking (2020 spare)

> **Note on the 2019 → COVID bridge:** ending Gap 2 on "the first COVID cases
> emerge" right before the 2019 card is a *chilling, brilliant* transition —
> because the visitor knows what's coming and the site doesn't. High emotional
> payoff; flagged `[sensitive]` so it's your deliberate choice.

---

## Owner decisions (2026-07-10)
- **§4 UFO — scope:** ✅ **Phased MVP.** Build Phase 1 (fly-in, hover, beam-scan +
  element reciprocation, drag-resistance + escape, hit-recoil + anger, context
  quips, sound). Phase 2 (haptics/gyro/scroll-follow/failed scans) only if Phase 1
  clears the bar.
- **§4 UFO — tone:** ✅ **Cheeky, never at the visitor's expense.** Self-aware +
  roasts itself/the site; no insulting the user. Safe for the hiring audience.
- **§4 UFO — framing:** ✅ **Temporal probe / drone** (reskin the saucer so it
  belongs in a time machine; keep the physics + jokes).
- **Build order:** ✅ **Start the non-UFO quick-wins now** (§3 clean/single/1440
  iframe, §8 year-lock, §7 poster scrim, §1 fog, §9 edge-of-map floor), in
  parallel with the Appendix-A handpicks and UFO decisions above.
- **Still needed from owner:** Appendix-A handpicks (both gaps) before the §5 Time
  Tunnel is built; floor copy preference (§9: "edge of the map" vs "dead end").

## Time Tunnel — the long iteration (2026-07-10 → 07-11)
The "back in time" news went through several owner-driven reworks; final state:
- **NOT a content section / no pin / no scroll-lock.** Desktop = a single fixed
  **right-edge timeline** (`components/TimeRail.jsx`): years live in a dotted line,
  a MacBook-dock focal point magnifies the current stop, fact dots open into text
  ONLY at the focal point, and the **active year is pinned + highlighted (ember)**
  next to its fact so you always know the year. Each portfolio card **holds its
  year** (sticky) for the card's height; the rail fades after the last card.
- **Facts stream only over the empty fog gap** (scrub anchored to the hero's
  bottom) — never over the hero or a card.
- **No font-size animation** (it re-wrapped/glitched the text) — size is fixed;
  magnification is `transform: scale`.
- **Copy rule:** name the recognizable event plainly; voice is a light garnish,
  never a cipher. `chronicle` + `plain` re-audited & clear. *(Sealed voices still
  need the same name-the-event pass — the rendered ~24 × 8 voices.)*
- **MOBILE = news is DESKTOP-ONLY** (owner, 2026-07-11): the news is a desktop
  experience (the scrubbing rail). On touch / reduced-motion there is **no rail,
  no fog gaps, and no news block at all** — the portfolio cards follow the hero
  directly. `.tm-stratum` also drops `min-height:100vh` on mobile (`min-height:
  auto` + tight padding) so nothing is padded to a full screen. (An earlier
  mobile "time capsule" was built then removed at the owner's request — it took
  too much space and pushed the cards down.) Verified: desktop uses the rail;
  mobile has no rail/gap/capsule and the page is ~½ the height.

## Change log
- **2026-07-10** — Feedback Pass 1 documented + owner decisions recorded.
- **2026-07-10** — **Quick-wins built + verified** (build clean, dark+light,
  year-lock + 1440-scale confirmed via headless):
  - §3a **clean iframe** — the aging grade no longer touches the live frame; the
    grade moved off a global `backdrop-filter` onto per-card chrome only.
  - §3c **single live iframe** — `awakeEra` hoisted to `sections/TimeMachine.jsx`;
    only one `EraExhibit` mounts an iframe; the rest revert to poster.
  - §3d **1440-scale** — the live frame renders at 1440px and CSS-scales to the
    card (`ResizeObserver`), so the whole desktop layout shows uncut.
  - §7 **poster scrim** — `.tm-exhibit__scrim` dims the sleeping poster + an ember
    ring highlights "Wake the ruin".
  - §8 **year-lock** — the readout now *snaps* to the centred stratum instead of
    lerping, so the year is fixed while a card fills the viewport.
  - §1 **fog** — reusable `components/Fog.jsx` (reuses the 404's `fog-drift`
    keyframes + `--color-fog-rgb`), density driven by `--age`, behind the cards.
  - §9 **edge-of-map floor** — the `CompassRose` dissolving into mist above the
    floor copy. (Copy still "Before the map"; the "edge of the map" vs "dead end"
    wording is still an open owner preference.)
  - §3b **per-era chrome (partial)** — cards now age from a fixed `--era-age`
    (radius/border/shadow/sepia), locked per card. Full per-year *design-language*
    reskin (2019-flat vs 2023-glass) remains a follow-up.
  - Owner also dropped in real posters (`public/archive/{2019,2023}.webp`).
- **2026-07-10** — **§5 Time Tunnel copy built** (owner handpicked ~48 events).
  - Data model: `constants.timeTunnel.{gap1,gap2}` — ordered present→past, each
    event `{ id, year, weight }` (`major` = bigger + longer dwell; `mid` = flicker).
  - Copy: enhanced for the "wow, I remember this" jolt (second person, present
    tense, concrete) and authored in **all 10 voices** in character — `chronicle`
    (cinematic), `plain` (clean), and the 8 sealed voices (Scott / Dwight / Cow /
    GoT / Deadpool / Avengers / Yoda / Chandler), keyed `timeTunnel.events.<id>`
    + a per-voice `timeTunnel.hint`. Verified: all 48 ids present in all 10
    bundles, build clean. Sensitive events (war/Wuhan bridge) kept respectful in
    every voice.
- **2026-07-10** — **§5 Time Tunnel component built + reworked twice on owner
  feedback.** Final design (`components/TimeTunnel.jsx`): a **right-edge odometer
  timeline**, NOT a content section.
  - *Rejected v1* (GSAP pin + full-screen scrubbed corridor): pinned the viewport
    for ~6–7 screens per gap — a scroll tax that buried the cards. ❌
  - *Rejected v2* (compact sticky flash-stream, centred line): still read as a
    full-screen takeover + locked scroll. ❌
  - ✅ **Final:** the news lives in a **fixed timeline in the right margin** —
    never over the centred content, never pins/locks the scroll. As you scroll a
    short fog "breather" (`GAP_VH` ≈ 64vh) before each card, a column of dots
    scrolls; the centred dot expands into its **year + news line** (ember year,
    readable), the rest stay dots (past = ember, future = faint). Driven purely by
    Framer `useScroll` (no ScrollTrigger/pin). Weighted dwell (major events wider),
    one soft `pageflip` per event, faded in only through the middle of the gap so
    it never sits over a card. The old fixed year readout was removed (owner: "don't
    keep the year sticky") — card years come from their plaques.
  - **Mobile (coarse pointer): skipped entirely** (owner decision) — hero → card
    directly. **Reduced-motion desktop:** a static, year-grouped list.
  - Verified via headless: the rail advances (dots → active year+line), stays in
    the right margin over the entering card, and fades past the gap; build clean.
- **Still queued (pick up next):** §2 temporal-echo motion language, §4 UFO Phase 1
  (temporal-probe, cheeky tone), §3b full per-year card reskin. Optional tuning on
  the tunnel: `GAP_VH` (breather length) + rail text max-width on narrow laptops.
