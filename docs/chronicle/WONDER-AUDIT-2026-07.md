# WONDER-AUDIT — Voices, Micro-Moments & Awwwards Wishlist

> **Created:** 2026-07-05 · **Owner:** Manan · **Cycle:** post-V2.0
>
> This is a **tracking + detail** doc for the next wave of "wonder" work,
> commissioned as a full-site audit. It captures, for each idea: the **decision,
> rationale, and a task checklist**, so a cold session can pick any item up
> without re-deriving the codebase. It complements — does not replace —
> [LEGENDARY-ROADMAP](LEGENDARY-ROADMAP.md) (shipped wonder features) and
> [TACTILE-MOMENTS](TACTILE-MOMENTS.md) (the Phase 8 interaction spec + the
> four-part "dilution rule" every new interaction must pass).
>
> **Status legend:** 🟢 building · 🟡 specced, not started · 🔵 explore
> (uncertain) · ✅ done · ⏸️ parked
>
> **Read first:** [CLAUDE.md](../../CLAUDE.md) §2–§4 (canon + standards),
> [common-ai-signs.md](common-ai-signs.md) (anti-slop), and the governing
> principle in [TACTILE-MOMENTS §0](TACTILE-MOMENTS.md#0-the-governing-principle).

---

## 0. Governing principles for this cycle

1. **Default voices must stay effortless.** `chronicle` and `plain` are for
   people evaluating Manan for real. Every sentence must read cleanly, no puzzle,
   no character tax.
2. **Sealed voices are a reward, not a translation.** A visitor who *unlocked*
   `scott`/`dwight`/`cow` did work to get there — they are here to be delighted,
   not to skim a résumé. **Keep the personality at full strength**; never sand a
   character down "for readability." The rule is: *strongest possible character,
   original substance still intact underneath.*
3. **No decoration for its own sake.** Every micro-moment must serve a skeptical
   visitor *or* be a signature "moment." Pass the [TACTILE §0](TACTILE-MOMENTS.md)
   4-part test: tactile · it resists · rewards intent not motion · sound *is* the
   motion.
4. **Every new string ships in every voice** (CLAUDE.md §4.2). Adding a key means
   authoring it for `chronicle`, `plain`, `scott`, `dwight`, `cow` — and any new
   voice — each in character. i18next **replaces** arrays, so array keys must be
   re-authored per voice or they vanish.

---

## 1. At a glance (tracking board)

| # | Item | Category | Status | Impact | Effort | Risk |
|---|---|---|---|---|---|---|
| V0 | **Dead-key cleanup** — remove keys nothing renders anymore | Cleanup | ✅ | 5 | 1 | low |
| V1 | Restore Michael Scott's signature line to a **rendered** slot | Voices | ✅ | 8 | 2 | low |
| V2 | Re-home famous sealed-voice lines stranded in dead keys | Voices | ✅ | 7 | 3 | low |
| V3 | Voice-personality **content-strength pass** (per-voice table below) | Voices | ✅ | 8 | 5 | low |
| V4 | New voices — **roster expansion** (shortlist below) | Voices | ✅ | 8 | 6 | med |
| V5 | **Voice identity in the UI** — Voice Hall preview panel (desktop + mobile) + pre-rendered plates + ambient voice mark | Voices | ✅ | 8 | 7 | med |
| S1 | Micro-moment sweep — new intent-gated sound/motion (map below) | Interaction | ⏸️ | 8 | 6 | med |
| S2 | **Voice-specific cue palettes** (each voice sounds different) | Interaction | 🔵 | 7 | 5 | med |
| C1 | Cinematic upgrades to existing sections (list below) | Cinematics | 🔵 | 7 | 6 | med |
| P1 | New sub-pages / wild flows (concepts below) | Sub-pages | 🔵 | 8 | 7 | med |
| A1 | **Analytics coverage** for every post-v1 wonder feature (adoption data → V3 keep/cut) | Instrumentation | ✅ | 8 | 3 | low |

> Impact/Effort/Risk are 1–10 gut estimates to help sequencing, matched to the
> LEGENDARY-ROADMAP scale. Re-score when a task is picked up.

---

## 2. Voices

### 2.1 The current roster (baseline)

| Voice | Character | Category | Strength today | Gap |
|---|---|---|---|---|
| `chronicle` | Cartographer/epic narrator (base) | core | Strong, consistent world voice | n/a — this is the canon |
| `plain` | Straight professional | core | Clean, does its job | n/a — restraint is the point |
| `scott` | Michael Scott (The Office) | sealed | Very strong; best-written sealed voice | **Signature line demoted** (see V1) |
| `dwight` | Dwight Schrute (The Office) | sealed | Strong, distinct cadence | Could push more cold-open facts/threats |
| `cow` | A cow ("moo") | sealed | Perfect one-joke bit | By design, nothing to strengthen |
| `got` | **The Game of Thrones** (ensemble) | sealed | **New (V4).** Wry Maester narrator deploying the whole realm's famous lines (replaced single-character `tyrion`, which read too thin) | full bundle, key-parity |
| `deadpool` | Deadpool (Marvel) | sealed | **New (V4).** 4th-wall, meta, chaotic | full bundle, key-parity |
| `avengers` | **The Avengers** (MCU ensemble) | sealed | **New (V4).** F.R.I.D.A.Y./JARVIS mission-control narrator deploying the team's iconic lines (replaced single-character `stark`, same thinning issue) | full bundle, key-parity |
| `yoda` | Yoda (Star Wars) | sealed | **New (V4).** Inverted syntax, unique register | full bundle, key-parity |
| `chandler` | Chandler Bing (Friends) | sealed | **New (V4).** Sarcasm + "Could I BE any more…" | full bundle, key-parity |

> **Roster evolution (2026-07-06):** single-character voices `tyrion` and `stark`
> were replaced by **ensemble** voices `got` and `avengers` — a lone character
> thins out across a whole site, whereas an ensemble (one coherent narrator
> quoting the cast) has a deep bench of instantly-recognizable lines. Triggers:
> `winter` (GoT) and `assemble` (Avengers). Current sealed roster (8): scott,
> dwight, cow, got, deadpool, avengers, yoda, chandler.

**Finding:** the sealed voices are well-written, but the payoff is weakened
because **several iconic lines live in i18n keys that render nowhere.** The
owner's guidance sharpened the fix: *don't add or restructure slots per voice —
just move the great copy into slots that are already on screen, and delete keys
that are truly dead.* See the render-state map below, then V0–V3.

> ### ⚠️ Render-state ground truth (verified 2026-07-05)
> Confirmed by reading the components, not the bundles:
>
> | i18n key | Rendered? | Holds (in sealed voices) |
> |---|---|---|
> | `hero.lead` / `hero.phrases[]` / `hero.proof[]` | ✅ rendered | hero copy |
> | `about.intro[]` / `about.pullQuote` | ✅ rendered | the intro + the pull-quote |
> | `about.services.{frontend,backend,performance,fullstack}` | ✅ rendered | the disciplines |
> | `about.stats.*` | ✅ rendered | stat labels |
> | **`hero.hook`** | ❌ **dead** (Hero renders `phrases`/`proof`, never `hook`) | Scott's "start a sentence…", Dwight's "faster than 80% of all snakes" |
> | **`about.principles[]`** | ❌ **dead** (About renders `services`, not `principles`) | Scott's "a little stitious", Dwight's "identity theft is not a joke" |
> | **`about.scribeNote`** | ❌ **dead** | a heading nobody sees |
> | **`map.searchPlaceholder` / `map.noResult`** | ❌ **dead** (map search removed) | placeholder copy |
> | **`voiceHall.searchPlaceholder` / `voiceHall.noResult`** | ❌ **dead** (Hall search bar removed) | placeholder copy |
>
> **Implication:** the "restore a famous line" work is really *"move it out of a
> dead key into a live one."* The great lines aren't missing — they're offscreen.
> `hook`/`principles`/`scribeNote` are left in place for now (they still hold
> character copy worth a considered V3 relocation), but the two search key pairs
> are pure dead weight → removed in **V0**.

---

### V0 — Dead-key cleanup · ✅ DONE

**Done.** Removed `searchPlaceholder` + `noResult` (both the `map.*` and the
`voiceHall.*` variants) from **all five** bundles — both search bars were removed
from the UI (`MapOverlay`, `VoiceHall`) so the copy rendered nowhere. Build clean.

**Follow-up — ✅ now also done (2026-07-05).** `hero.hook`, `about.principles[]`,
and `about.scribeNote` were **deleted from all five bundles** after salvaging the
worthwhile lines into rendered slots (see V2/V3). Verified: no code reads them
(`Hero` renders `phrases`/`proof`; `About` renders `services`), the hook copy is
*not* the SEO source (meta is hardcoded in `index.html`), and the build is clean.

---

### V1 — Restore Michael Scott's signature line to a rendered slot · ✅ DONE

**Problem.** The line *"Sometimes I'll start a sentence and I don't even know
where it's going — I just hope I find it along the way"* is Michael's single most
recognizable quote. It lived in the **dead `hero.hook`** key (offscreen) and as a
quiet clause in the Contact `quote`. It was effectively invisible.

**Owner decision (locked).** *Do not add or restructure elements per voice —
just update copy. There is no room for a quote in the hero. Keep the "feared or
loved" line where it is (`about.pullQuote`) — do not replace it. Put the "start a
sentence" line into the About **introduction** (a slot that already renders).*

**Done.** Added the full line as a third paragraph of `about.intro` in
[scott.js](../../src/i18n/bundles/scott.js), keeping the *joke → flex* structure
(`…I just hope I find it along the way. The web apps, though? Those I finish.
Every time.`). `about.pullQuote` ("feared or loved") untouched. No new keys, no
component changes; other voices' `about.intro` are unaffected (i18next arrays are
per-voice). Build clean.

---

### V2 — Re-home famous sealed-voice lines stranded in dead keys · ✅ DONE

**Reframed (per the render-state truth):** these lines weren't *removed* — they
were sitting in keys that render nowhere (`hero.hook`, `about.principles`). The
owner asked specifically for the superstitious line, the identity-theft line, and
"Bears. Beets." So the work is: move each into a slot that's already on screen,
in character, without new elements.

**Decisions + status (owner-requested lines):**

| Voice | Line | Was (dead key) | Now (rendered slot) | Status |
|---|---|---|---|---|
| `scott` | "I'm not superstitious… I'm a little stitious" | `about.principles[1]` | woven into `about.services.fullstack.description` (edge cases / reusable components) | ✅ |
| `dwight` | "Identity theft is not a joke; millions of families suffer every year" | `about.principles[3]` | woven into `about.services.backend.description` (auth/RBAC) | ✅ |
| `dwight` | "faster than 80% of all snakes" | `hero.hook` + `about.principles[2]` | woven into `about.services.performance.description` | ✅ |
| `dwight` | "Bears. Beets. Battlestar Galactica." | (not present) | added as a second `hero.proof` chip — sits in the hero mono strip | ✅ |

All four are live and build-clean. Each preserved the section's real substance
(fullstack ownership, auth/security, performance, the proof strip) with the
catchphrase layered in — *character up, substance intact.*

**Still to guarantee (already present, verify placement in V3):**
- **Scott:** "That's what she said." (Atelier quote) · "feared or loved" (`about.pullQuote`).
- **Dwight:** "Fact." · "Would an idiot do that…" (`about.pullQuote`) · "False."
  (candidate for the contact error state — see V3).
- **Cow:** n/a.

**Open task:** once V3 confirms nothing else needs the husks, delete the now-empty
`hero.hook` / `about.principles` / `about.scribeNote` keys across all bundles.

---

### V3 — Voice content-strength pass (per-voice) · ✅ DONE (owner-flagged + salvage; optional full sweep deferred)

**Goal.** Each sealed voice should **lead with its most iconic register** in the
highest-visibility slots (hero hook, pull-quotes, CTAs, error/success states,
map placeholder, the `404`/empty states). Substance stays intact; character goes
to full volume. Table of concrete upgrade opportunities:

| Voice | Slot | Today | Suggested stronger direction | Status |
|---|---|---|---|---|
| `scott` | about.intro | (generic) | The "start a sentence…" line (V1) | ✅ done |
| `scott` | about.services.fullstack | generic | "a little stitious" (V2) | ✅ done |
| `scott` | CTA secondary | "Let's be friends" | keep — very on-voice | keep |
| ~~`scott`~~ | ~~map noResult~~ | — | *removed* — map search is gone; key deleted in **V0** | ✅ done |
| `dwight` | about.services.performance | generic | "…faster than 80% of all snakes." (owner-requested; `hero.hook` no longer renders, so moved to a slot that does) | ✅ done |
| `dwight` | hero.proof | 1 chip | added "Bears · Beets · Battlestar Galactica" chip (V2) | ✅ done |
| `dwight` | error state | already strong ("False." / "Fact." woven through `contact.errors.*`) | left as-is — the existing copy already lands the catchphrases | keep |
| `dwight` | arsenal intro | "My weapons. Each one field-tested…" | prepended "These are not skills. These are survival competencies." | ✅ done |
| `dwight` | contact success | "…Filed in triplicate. I will respond." | added "I have already begun a background check on the sender." | ✅ done |
| `scott` | performance service | (salvage) | appended the "coding gazelle in a Bluetooth headset" line before deleting `principles` | ✅ done |
| `cow` | everything | moo | working as intended — do **not** touch | keep |

**Salvage + delete (dead-key husks) — ✅ done.** Before deleting `about.principles`,
the two best orphaned lines were pulled into rendered slots: Scott's "coding
gazelle" → `services.performance`. Dwight's principles content (ownership,
vigilance/perimeter, security) was already covered by his `services.*`, so no
further salvage was needed. `hero.hook` / `about.principles` / `about.scribeNote`
then removed from all five bundles. Build clean.

**Remaining tasks (future copy sprint — not blocking).**
- [ ] Walk every *other* high-visibility key per voice and rate 1–5 for "does
      this land in character"; rewrite anything ≤3 (this pass covered the
      owner-flagged + salvage items).
- [ ] Re-verify each bundle still covers all array keys (no fallback holes) — the
      deletions removed only dead keys, so no new fallback holes were introduced.

---

### V4 — New voices (roster expansion) · ✅ DONE (5 shipped 2026-07-06; roster now 8 sealed)

> **Final shipped roster (V4):** `got`, `deadpool`, `avengers`, `yoda`, `chandler`
> — **five** new sealed voices, bringing the sealed roster to **8** (scott,
> dwight, cow, got, deadpool, avengers, yoda, chandler). Each is a complete
> override bundle with **exact key-parity to `scott`** (verified — no missing/extra
> keys) and matching array lengths. Registry entries (trigger/hint/hint2/info/glyph)
> live in [voices.js](../../src/i18n/voices.js); the loader + unlock wiring is fully
> data-driven so **no code changes were needed** beyond the registry. Build clean;
> each code-splits to ~9–10KB gz (verified in the latest build).
>
> | Voice | id | trigger | category |
> |---|---|---|---|
> | The Game of Thrones (ensemble) | `got` | `winter` | sealed |
> | Deadpool (PG-13) | `deadpool` | `deadpool` | sealed |
> | The Avengers (ensemble) | `avengers` | `assemble` | sealed |
> | Yoda | `yoda` | `yoda` | sealed |
> | Chandler Bing | `chandler` | `chandler` | sealed |
>
> **Roster correction (2026-07-06):** the single-character `tyrion` and `stark`
> voices originally shipped here were **replaced by the ensembles `got` and
> `avengers`** (a lone character thinned out across a whole site — see §2.1). The
> registry/bundles reflect the final roster above; the historical `tyrion`/`stark`
> notes below are kept only as a record of the recognizability-pass reasoning.
>
> **Category decision:** kept all in the existing `sealed` group rather than
> adding a `legends` category — a new category would mean touching `CATEGORIES`
> **and** adding a `voiceHall.categories.legends` label to every bundle. Revisit
> the split only if the sealed roster grows past ~8 — **it is now at 8, so a
> `legends`/franchise split is the next thing to revisit** (see V5, which touches
> the Hall anyway). The popover still previews `POPOVER_SEALED_LIMIT` (3) and
> overflows the rest to the Hall; the discovery count is n/8 (data-driven,
> verified via `SEALED_VOICES`).
>
> **Recognizability pass (2026-07-06, owner feedback "couldn't identify them
> instantly").** Reworked the high-traffic surfaces of all three so the signature
> dialogue lands on sight, and made the unlock hints much easier (they now name
> the character outright). Each voice's three most-read slots now carry its single
> most-quotable line:
> - **Tyrion** — pull-quote "I drink, and I know things"; footer "A Lannister
>   always pays his debts"; + "my mind is my weapon", "a very small man can cast a
>   very large shadow", "once you accept your flaws…", the "I try to know as many
>   people…" contact quote; chapters retitled (The Imp / Debts Paid / My Mind Is
>   My Weapon).
> - **Deadpool** — pull-quote "With great power comes great irresponsibility";
>   footer "Maximum effort"; harder fourth-wall breaks, chimichangas, healing
>   factor, "one functional adult" bit in the intro.
> - **Stark** — pull-quote "Genius, billionaire, playboy, philanthropist"; footer
>   "I am Iron Man"; JARVIS woven through intro/arsenal/contact/recap, "sometimes
>   you gotta run before you can walk", the "big man in a suit of armour" beat,
>   the "super-secret boy band" line.
>
> Hints now read e.g. "Tyrion Lannister drinks it, and knows things because of it"
> / "The red-suited Marvel anti-hero played by Ryan Reynolds — type his name" /
> "Iron Man's AI butler… J-A-R-V-I-S". Key + array parity with `scott` re-verified;
> build clean.
>
> **Deadpool trigger changed `chimichanga` → `deadpool` (2026-07-06):** owner
> feedback — the target audience couldn't spell "chimichanga". His own name is
> universally spellable, unmissable, and very on-brand for a fourth-wall breaker.
> The chimichanga *flavor* lines (intro, services, contact placeholder) stay; only
> the unlock word + its two hint/instruction references changed.
>
> **All hints made obvious + spellable (2026-07-06):** goal is *exploration, not
> locked doors* — so every hint now all but hands over the exact word, and each
> `hint2` spells it letter-by-letter (B-O-S-S / B-E-E-T-S / M-O-O / W-I-N-E /
> D-E-A-D-P-O-O-L / J-A-R-V-I-S). Tyrion's `wine` clue explicitly says "(not beer)"
> to kill the beer/alcohol/drink ambiguity the owner flagged. Triggers unchanged
> (all already easy to spell once given); only the clue copy changed.
>
> **Remaining shortlist (not built):** Gandalf, Geralt, Arthur Morgan, Yoda,
> GLaDOS/HAL, Gordon Ramsay, Barney Stinson (table below).

**Rationale.** The unlock game is one of the site's best hooks. More voices =
more "wait, what else is hidden here" energy, *if* each is distinct, famous, and
writes well against a portfolio's fixed sections. The registry already scales
(`voices.js` → `category`, `glyph`, `hint`/`hint2`, `trigger`; lazy-loaded
bundles). North-star franchises in CLAUDE.md (LOTR / GoT / RDR / Witcher / One
Piece) are the natural first well to draw from.

**Selection criteria:** (1) instantly recognizable, (2) a *strong distinct
cadence* (so overrides are worth it), (3) fits "narrate a senior dev's story"
without breaking, (4) a discoverable **trigger word** exists.

**Shortlist — curated, ranked by fit:**

| Candidate | Source | Register | Why it fits a dev portfolio | Trigger idea | Fit |
|---|---|---|---|---|---|
| **Gandalf** | LOTR | Wise, grand, warm | Cartographer/epic north-star; "a wizard ships precisely when he means to" | `wizard` / `fool` | ★★★★★ |
| **Tyrion Lannister** | GoT | Witty, self-aware, drinks & knows things | Clever senior-dev flex; roasts gracefully | `wine` / `imp` | ★★★★★ |
| **Geralt of Rivia** | Witcher | Terse, deadpan, "hmm" | North-star; contracts = projects, monsters = bugs | `witcher` / `roach` | ★★★★★ |
| **Arthur Morgan** | RDR2 | Weathered, honorable, wry | North-star; "we ship for the gang" | `honor` | ★★★★☆ |
| **Tony Stark** | MCU | Cocky genius, fast | Senior-dev confidence, "I am the architecture" | `jarvis` | ★★★★☆ |
| **Yoda** | Star Wars | Inverted syntax | Instantly memorable; "ship it, you must" | `force` | ★★★★☆ |
| **GLaDOS / HAL** | Portal / 2001 | Cold AI menace | *Meta*: an AI-assisted site narrated by a menacing AI | `cake` / `hal` | ★★★★☆ |
| **Deadpool** | Marvel | 4th-wall-breaking | Perfect for meta portfolio jokes ("you're reading alt text") | `chimichanga` | ★★★☆☆ (tone risk) |
| **Gordon Ramsay** | MasterChef | Roast, intense | "This API is RAW." — fun/intimidating combo | `donkey` | ★★★☆☆ |
| **Barney Stinson** | HIMYM | "Legen…dary", suit up | Confidence bit; "challenge accepted" CTAs | `suitup` | ★★★☆☆ |

**Recommendation:** ship in waves of 1–2, starting with **Gandalf** and
**Tyrion** (best fit + writes easily against every section + reinforces the
existing fantasy spine). Consider a **new category** in `CATEGORIES`
(`voices.js`) e.g. `legends` (fantasy/epic) vs the existing `sealed`, so the
Voice Hall groups them meaningfully as the roster grows.

**Tasks (per new voice).**
- [ ] Add registry entry (`id`, `label`, `sample`, `glyph`, `category`,
      `trigger`, `hint`, `hint2`, `info`) in [voices.js](../../src/i18n/voices.js).
- [ ] Register the lazy loader in [i18n/index.js](../../src/i18n/index.js).
- [ ] Author the full override bundle in character — **every** key the other
      sealed voices override, no fallback holes on array keys.
- [ ] Wire the unlock word into `EasterEggListener` + `ClueUnlock` hint chain.
- [ ] (Optional, with V5) add the emblem/portrait asset.
- [ ] Verify Voice Hall grouping, popover cap, discovery count, recap
      constellation all still read with the larger roster.

---

### V5 — Voice identity in the UI (emblem / particle portrait) · 🟢

> **Owner scope (2026-07-06):** three sub-builds — (1) a desktop **Voice Hall
> preview panel** (MacBook-style right column with a per-voice `FaceParticles`
> portrait + details, replacing the Hall's hover info popover), decoupling
> **preview** from **apply**; (2) a **mobile** gyro-draggable-lens variant of the
> same; (3) an always-visible **ambient voice mark** (SideRail on desktop, a
> persistent spot on mobile) so the visitor always knows which persona they're in.
> Custom analytics must separate *previewed-most* from *applied-most*.
>
> #### ✅ Sub-build 1 — Desktop preview panel — DONE (2026-07-06)
> Shipped in [VoiceHall.jsx](../../src/components/VoiceHall.jsx) +
> [index.css](../../src/index.css). Model (owner-confirmed = **decoupled**):
> - **Two columns on desktop** (≥820px): scrollable roster left, framed "screen"
>   preview panel right. Mobile stays single-column, unchanged (its own gyro pass
>   is sub-build 2), so nothing regressed on phones.
> - **Click a chip = PREVIEW only** (no re-skin) → portrait + details in the panel.
>   The panel's **"Speak in this voice"** button is the *only* apply path (or a
>   **"now narrating"** badge when it's already active). Locked voices preview a
>   **wax-seal silhouette + teaser line + clue + inline `ClueUnlock`** (no
>   name/note — the reveal stays the reward); solving the clue applies it.
> - **Info hovercard removed from the Hall** (its content is now the panel); it
>   **stays in the bottom-right `VoiceSwitcher`** popover per owner ask.
> - **Portrait:** probes `public/voices/<id>.webp` → `FaceParticles` if present,
>   else the serif **monogram** medallion (works today, auto-upgrades when art is
>   dropped in). `FaceParticles` is **`lazy()`-split** (its own ~4.6KB gz chunk) so
>   it never touches the initial bundle — "not heavy" honoured.
> - **Analytics:** `voice_previewed` + `voice_applied` (both `trackOnce` per voice
>   per session, `{ voice, locked | source:'hall' }`) → *previewed-most vs
>   applied-most* falls straight out. See [ANALYTICS.md](ANALYTICS.md).
> - Chrome strings added under `voiceHall.preview.*` in **all 10 bundles**
>   (in character). Build clean; verified headless (open + locked states).
>
> **Portrait art (owner-provided 2026-07-06) — direction change:** instead of a
> `FaceParticles` swarm, the owner supplies **pre-rendered plates** (the frame,
> monogram and gold-halftone portrait all baked into the image), **two per voice**
> — `public/voices/dark/<id>.webp` + `public/voices/light/<id>.webp`. The preview
> now renders the theme-matched plate **directly** (no FaceParticles, no extra
> frame box); the shared `VoicePreviewCard` probes it and falls back to the serif
> monogram when absent. FaceParticles is **no longer used by the preview** (still
> powers the Atelier portrait). Sealed voices keep the wax-lock until unlocked.
> Shipped so far: `scott` (dark+light).
>
> #### ✅ Sub-build 2 — Mobile preview flow — DONE (2026-07-06)
> The mobile menu's Persona drawer is now **decoupled** like desktop: tapping any
> voice row (open or sealed) opens a **preview view** (shared `VoicePreviewCard` —
> the plate + full identity), with an explicit **"Speak in this voice"** apply
> button; sealed rows show the clue + inline unlock there. Reached via the roster
> or the ambient mark. Same `voice_previewed` / `voice_applied` events with
> `source:'mobile'`. **Note:** the original "gyro-lens" idea is **superseded** by
> the owner's static pre-rendered plates (rendering a swarm/lens over a finished
> plate would fight the art); the decoupled preview flow is the mobile deliverable.
>
> #### ✅ Sub-build 3 — Ambient voice mark — DONE (2026-07-06)
> Always-visible active-voice insignia: **desktop** in the `SideRail` footer (the
> voice monogram medallion + "now narrating" label on expand → opens the Hall);
> **mobile** a fixed bottom-left medallion (mirrors the FAB → opens the persona
> picker via a `ui:open-voice` event). Uses the registry `glyph` monogram (the
> voice's canonical mark); a per-voice insignia SVG can replace it later without
> rewiring. Reused on both routes (the rail is shared).

**Original question from owner:** *"Should we try a UI for a logo/person-image
particle show of the current voice, or an element resembling them?"*

**Finding:** the machinery already exists. [FaceParticles.jsx](../../src/components/FaceParticles.jsx)
is a pure-Canvas2D "character assembly" that samples any high-contrast image into
a glyph swarm that flies in and settles (assembly-only rAF, then stops — zero
idle cost), with its own sound cues (`assembleSwell`/`assembleResolve`). It's
currently pointed at `public/atelier/portrait.webp`. This is a **near-ready
vehicle** for voice identity.

**Concept (recommended, tasteful):** when a sealed voice is unlocked / switched
to, briefly render a **voice emblem** — not a copyrighted face, but a
**monogram/silhouette/insignia** in that character's register — assembled via
`FaceParticles` (or a lighter glyph-burst) as part of the existing voice-swap
choreography (`VoiceTransition` + the `glitch` cue). Then it settles into the
small `glyph` monogram already shown in the Voice Hall / recap constellation.

**Why not literal faces:** IP/licensing risk + the site's "no emoji, no cosplay,
flavor not literal" rule (CLAUDE.md §1, common-ai-signs). A **serif monogram or
heraldic sigil per voice** (Gandalf → a rune; Tyrion → a lion; Geralt → the wolf
medallion silhouette; Scott → "WBB" mug ring) is on-brand and legally clean.

**Options (pick one to prototype):**
- **A. Emblem-on-swap (low risk, recommended):** a one-shot particle assembly of
  the voice's sigil during the swap transition, reusing `FaceParticles`/glyph
  swarm. Ties into existing sound. ~1–2 days.
- **B. Ambient voice mark:** a subtle, static per-voice mark in the
  `ControlCluster` / SideRail footer that changes with the active voice.
- **C. Recap constellation upgrade:** each sealed star renders its sigil instead
  of a generic dot (extends the existing constellation in `ExpeditionRecap`).

**Tasks.**
- [ ] Design the sigil set (SVG, monochrome, theme-token stroke) — one per voice.
- [ ] Generalize `FaceParticles` to accept a per-voice `src` (already parameterized).
- [ ] Hook the assembly into `VoiceTransition` on sealed-voice activation only
      (never on `chronicle`/`plain` — keep defaults calm).
- [ ] Honor reduced-motion (static sigil) + coarse pointer; aria-hidden decor.
- [ ] Verify no idle CPU after settle (the FaceParticles contract).

---

## 3. Interactive micro-moments (sound / motion)

### 3.1 What we already have (baseline map)

The site has a **dense** interactive-sound texture already (this is why the
"dilution rule" in TACTILE §0 matters — do not over-add). Current cues wired via
`playCue` ([sound.js](../../src/lib/sound.js) `CUES`):

| Surface | Cue | Trigger |
|---|---|---|
| Hero astrolabe needle | `detent` (gear) | drag/spin (the signature moment) |
| Voice swap | `glitch` + decode | voice change |
| Theme / sky swap | `theme` warm wipe | DayNightToggle / ThemeWheel |
| Arsenal orbit | `blip` arpeggio | node hover |
| Experience path | `click` (press/release) | node press |
| Build reel | `detent` + `settle` | scrub / land |
| Observatory analytics | `hoverNote` (pentatonic) | chip hover |
| Volume dial | `volumeTick` | drag |
| Face particles | `assembleSwell/Resolve` | portrait assembly |
| Map open/close | `mapOpen/mapClose` | ⌘K |
| Contact / raven | `error` / `raven` | send success/fail |
| Sound toggle | `confirm` | enable |

**Takeaway:** input surfaces are well covered. The **gaps** are (a) a few
sections with *no* signature moment, and (b) no *voice-specific* audio identity.

### S1 — Micro-moment sweep (new intent-gated moments) · ⏸️ PARKED (built then reverted 2026-07-07)

> **Built then reverted by owner request.** The owner-picked 3 (realm-plate
> "unfurl", copy-email "seal", recap "sigil stamp") were implemented — cues in
> [sound.js](../../src/lib/sound.js) `CUES`/`CONFIG` + matching motion in
> [Works.jsx](../../src/sections/Works.jsx) / [Contact.jsx](../../src/sections/Contact.jsx)
> / [ExpeditionRecap.jsx](../../src/components/ExpeditionRecap.jsx) — then **fully
> reverted** on the owner's call. Those files + the three cues no longer carry any
> S1 code. If revived, the specs below still stand.
>
> **Rejected outright (not built):** sky-scrub on the astrolabe, marginalia
> ink-bleed, SideRail chapter detent. **Not taken:** tech-orbit lock-on.

Each must pass the 4-part test. Ranked by impact-to-effort:

| Idea | Section | Type | Detail |
|---|---|---|---|
| **Realm plate "unfurl"** | Works | sound + motion | On opening a project plate, a soft *parchment unroll* whoosh + the plate physically unfurling. Realms = charted map; this is the map opening. Intent-gated (click). |
| **Copy-email "seal"** | Contact | sound + motion | Copying the address stamps a wax-seal micro-animation + a soft *press* thunk. Rewards the deliberate copy action. |
| **Tech orbit "lock-on"** | Arsenal | motion | Clicking (not hovering) a skill snaps the orbit to center it with a magnetic ease + a firmer detent than hover. Turns hover-arpeggio into a two-tier interaction. |
| **Marginalia "ink bleed"** | global | motion | When a `[[marginalia]]` footnote opens, a tiny ink-bleed reveal instead of a plain fade. |
| **Sky-scrub on the astrolabe** | Hero | sound + motion | (Already specced in TACTILE TM-1) — dragging the sky scrubs dawn→night with a wind bed. High signature value; cross-link, don't duplicate. |
| **SideRail chapter "detent"** | global | sound | Passing each chapter marker while scrolling gives a *single* soft tick (heavily rate-limited) so the rail feels like a physical track. **Risk: motion-triggered — only ship if it can be made intent-like** (e.g. only on click-to-jump, not passive scroll). |
| **Recap "sigil stamp"** | Contact recap | sound + motion | The Traveler's Sigil stamps in with a press-thunk when the recap resolves. |

**Tasks.**
- [ ] For each, confirm it's **intent-gated** (grab/press/click), not scroll/viewport.
- [ ] Add the cue to `CUES` (synth-first, 0 bytes) with a `CONFIG` knob block.
- [ ] Wire via `playCue`; rate-limit any drag/repeat cue (see the reel/gear
      time-gating pattern).
- [ ] Reduced-motion → silent + static; coarse-pointer sane.
- [ ] Re-audit total density against the dilution rule before shipping *all* of
      them — pick the best 3, not all 7.

### S2 — Voice-specific cue palettes · 🔵

**Concept:** each voice subtly retunes the synth palette so the site *sounds*
like the character (chronicle = airy/celestial default; plain = drier/quieter;
scott = a slightly comedic timbre; a future Geralt = lower, gruffer detents).
Not new cues — a per-voice **tuning layer** over the existing ones (pitch/decay
multipliers in `CONFIG`, selected by active voice).

**Tasks.**
- [ ] Add a `voiceTuning` map keyed by voice id → multipliers (gain, base freq,
      decay) applied in `blip`/`swoosh`.
- [ ] Default (`chronicle`) unchanged; `plain` = calmer; sealed voices get flavor.
- [ ] Keep it subtle — this is seasoning, never a costume.

---

## 4. Cinematics & awwwards-worthy upgrades (C1) · 🔵

Broader "moment" ideas beyond sound. Each should make a section feel like *a
film beat*, per the CLAUDE.md quality bar.

- **Hero title-sequence intro (first load only):** a 1.5s cinematic assemble of
  the astrolabe + title, skippable, once per session. The site currently starts
  "on" — a brief overture would raise the "awwwards" first impression. Respect
  reduced-motion (instant).
- **Chapter transitions as map traversal:** between chapters, a faint animated
  *route line* draws on the SideRail/map as you cross into a new realm — makes
  the "cartographer's journey" literal during scroll.
- **Realms as a true map fly-through:** an optional mode where selecting a realm
  "flies" the camera across the chart to that plate (Canvas2D pan/zoom), instead
  of a standard scroll. Ties Works to the ⌘K map.
- **Light/dark as a *time-of-day* dissolve:** upgrade the theme swap from a wipe
  to a brief god-rays / starfield cross-dissolve — the sky *changing*, not a
  toggle.
- **Living pull-quotes:** kinetic type on the big pull-quotes (already in TACTILE
  scope as "kinetic headings" — cross-link).
- **Contact "raven" flight across the viewport:** on successful send, the raven
  actually crosses the screen (paired with the existing `raven` cue) carrying the
  message off — a payoff moment for the one conversion that matters.

**Task:** score these against effort + the anti-slop codex, pick 2 for a
cinematics mini-cycle, spec each in its section doc before building.

---

## 5. New sub-pages / wild flows (P1) · 🔵

The app is already a 2-route SPA (`/` + `/making-of`) sharing `Layout.jsx`, and
`vercel.json` rewrites client routes — **adding a route is cheap and safe.** Use
sub-pages for ideas too wild for the portfolio spine.

| Route idea | Concept | Why it's worth it |
|---|---|---|
| `/void` or `/404` **cinematic** | A bespoke, in-world lost-traveler page ("you've wandered off the map") with the astrolabe spinning wildly + a way back. | 404s are a free surprise-and-delight surface almost no portfolio bothers with. |
| `/oracle` | An **ask-the-cartographer** page: a small guided Q&A ("What are you hiring for?") that routes the visitor to the right realm/section + tailors the pitch. | Turns a passive site into a conversation; strong for CTOs/recruiters. |
| `/constellation` | A full-screen version of the recap's **sealed-voice constellation** — a playground for the unlock game, showing which voices are found vs sealed. | Makes the voice game a destination, not a side effect. |
| `/atlas` (expand) | Promote the existing `CodebaseAtlas` component into its own cinematic route — the "how this site is built" explorer. | Already have the component; a route gives it room to breathe. |
| `/soundboard` (playful) | A hidden page that lets you *play* the synth cues like an instrument (the astrolabe gear, the pentatonic hover, the raven). | Pure delight for the curious; shows off the audio craft. |
| `/seasons` | The site re-skinned for a time/season (an entirely different palette + copy layer) as a limited "event." | Awwwards-bait novelty; reuses the theme + voice infra. |

**Guardrails:** sub-pages must not clutter the portfolio spine (keep them out of
`chapters`/⌘K, like the Atelier is). Each needs: a graceful fallback, an
`ErrorBoundary`, reduced-motion/touch correctness, and a clear way *back* to the
Chronicle. Spec any greenlit route in a new `docs/chronicle/sections/` doc.

---

## 6. Recommended sequencing

1. **Quick wins — ✅ landed 2026-07-05:** V0 (dead-key cleanup), V1 (Scott's line
   → About intro), and the owner-flagged V2 lines (stitious, identity-theft,
   snakes, Bears·Beets) are done and build-clean. Next quick win: the best 2–3
   of S1.
2. **Content depth — ✅ mostly landed 2026-07-05:** V3 owner-flagged Dwight lines
   (arsenal / contact-success) + the "gazelle" salvage are done, and the dead
   husks (`hero.hook` / `about.principles` / `about.scribeNote`) are deleted from
   all bundles. Remaining: the optional full per-voice 1–5 strength sweep.
3. **New voices — ✅ done 2026-07-06:** the expansion pattern is proven end to end;
   the sealed roster batched out to **8** (got, deadpool, avengers, yoda, chandler
   added). The registry scales with zero code changes per voice.
4. **A signature build — 🟢 in progress:** **V5 (voice identity in the UI)** is the
   current "wow" — a Voice Hall **preview panel** (MacBook-style, per-voice
   `FaceParticles` portrait + the voice's details, replacing the Hall's hover info
   popover), a **preview-vs-apply** interaction split with dedicated analytics
   (previewed-most vs applied-most), a gyro-draggable **mobile** lens variant, and
   an **ambient voice mark** (always-visible active-voice insignia in the SideRail /
   mobile). See the expanded V5 spec above. C1 cinematics + P1 sub-pages stay queued
   behind it — one "wow" per cycle, fully finished, verified in all
   themes/reduced-motion/touch, `npm run build` clean.

> Update this board's Status column as items move. When any item ships, land its
> canon in the relevant `docs/chronicle/` doc (per CLAUDE.md §5) and cross-link
> here.
