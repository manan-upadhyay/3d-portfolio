# The Anti-Slop Codex — Common AI Design Tells & Our Human Alternatives

> **Purpose.** This is a **source-of-truth design document** for The Chronicle.
> It catalogues the recognizable fingerprints of AI-generated ("vibe-coded")
> websites so we can **deliberately diverge** from them. Every entry pairs the
> *tell* (what outs a site as machine-made) with the *human move* (what we do
> instead). Treat the tells as a **do-not-ship blocklist** and the human moves as
> the bar for "is this section actually designed?"
>
> Read alongside [CLAUDE.md](../../CLAUDE.md) §4 (engineering standards) and
> [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). When you add or review a section, run it
> against §9 (the audit checklist) before calling it done.

---

## 0. Why AI design converges (the mechanism)

An LLM predicts the highest-probability next token. For an open design question
("make a modern landing page"), the highest-probability answer is **the
statistical center of its training data** — and the center of modern web UI is a
single, specific look: Inter type, a purple-to-indigo gradient, a centered hero
with a badge above the headline, three rounded icon-cards, a stat banner, a
frosted-glass panel. This is **distributional convergence**: absent hard
constraints, the model reverts to the mean, so millions of sites collapse toward
the same skeleton.

**The lesson for us:** *distinctiveness is a constraint problem.* Vague intent
("clean," "modern," "premium") pulls toward the mean. Specific, opinionated,
sometimes-contrarian constraints — an odd typeface, an asymmetric grid, a
committed narrative voice, real hand-made art — are what pull away from it. The
Chronicle's entire premise (a cartographer's epic, not a template) is an
anti-convergence bet. This doc keeps that bet honest.

---

## 1. Typography tells

| # | The AI tell | Why it reads as machine | The human move |
|---|---|---|---|
| T1 | **Inter everywhere** (or its cousins Roboto / system-ui) as the single default for headings + body. | Inter is the literal default in nearly every AI tool, component library, and builder. | Commit to an **opinionated, non-default typeface** with a real voice — an editorial serif for display, a distinctive grotesk for body. Pair two families *deliberately* (contrast, not sameness). |
| T2 | **The trendy AI combos**: Space Grotesk + Instrument Serif, Geist, "one italic serif accent word" dropped into otherwise-sans copy. | These specific pairings are so over-generated they now *signal* AI. | If you use a serif accent, make it a **system-wide editorial decision**, not a lone italicized word for "sophistication." Earn the contrast. |
| T3 | **All-caps section labels** + tiny tracked-out eyebrows on every section. | Uniform ALL-CAPS "SECTION" labels are a copy-paste layout reflex. | Use **real typographic hierarchy** — size, weight, and rhythm — to signal sections. If an eyebrow exists, it should carry narrative meaning (a chapter number, a place-name), not just decorate. |
| T4 | **Uniform type scale** — one heading size, one body size, mechanical line-height everywhere. | No optical adjustment = no human hand. | Vary scale with **intent and drama**. Big where it's a moment, quiet where it's connective tissue. Tune leading and measure per context. |

**Our stance:** The Chronicle's type is voice-bearing (i18n bundles) and
editorial. Never let a section fall back to undifferentiated Inter-at-16px. If a
heading isn't a *moment*, it isn't done (CLAUDE.md §4).

---

## 2. Color & surface tells

| # | The AI tell | Why it reads as machine | The human move |
|---|---|---|---|
| C1 | **"VibeCode Purple"** — the lavender/indigo-to-blue gradient on backgrounds, buttons, text, and orbs. The single most notorious AI signature. | It leaks out of image-gen and text-to-page prompts by default; "the new *make it pop*." | Own a **committed, unexpected palette** with narrative logic. Ours is the "starlit realm" (deep night) / "dawn over the realm" (light) system — no generic purple hero glow. All color via tokens in [index.css](../../src/index.css). |
| C2 | **Blurry purple/blue ambient glow** behind the hero — the "future technology company" default, applied even when irrelevant. | Reflexive "premium" atmosphere with zero meaning. | Atmosphere must be **diegetic**: our depth comes from a procedural starfield + Canvas2D astrolabe (a cartographer's instrument), not a radial-gradient blob. |
| C3 | **Glassmorphism** — frosted translucent cards, backdrop-blur, soft 1px borders everywhere. | One CSS rule that makes anything look "premium"; a persisting 2022 trend AI overuses, often at the cost of readability. | Use **opaque, material surfaces** with real hierarchy (elevation via tone, not blur). If translucency appears, it must serve legibility and mood, not substitute for design. |
| C4 | **Saturated glows & drop-shadows** on every box and heading; gradients as decoration with no semantic tie. | Decorative effects with no functional meaning. | Color and light **signal state and function** (active chapter, hovered realm, day/night). Semantic tokens (`--color-*`), not decorative sparkle. |
| C5 | **Low-contrast body text on permanent dark mode** — medium-grey on near-black that fails WCAG AA. | AI optimizes for "moody screenshot," not readability. | **AA contrast on every heading and body run, both themes** (CLAUDE.md §4.5). Dark-first, but never at legibility's expense. Both light + dawn/day/dusk/night modes verified. |
| C6 | **The "tasteful" cream/beige default** background reached for by reflex as the alternative to purple. | It's just the *other* mean — beige is the new purple. | A palette chosen for **this story**, not a safe neutral. Warmth, if used, is motivated (dawn). |

---

## 3. Layout & structure tells

| # | The AI tell | Why it reads as machine | The human move |
|---|---|---|---|
| L1 | **The canonical skeleton**: hero → 3 feature cards → testimonials → pricing → CTA → footer, in that exact order. | AI learned the single most-repeated page structure and reproduces it verbatim. | A **narrative spine** with distinct moments (Origin → Craft → Journey → Arsenal → Realms → Summon). Each section is its own experience, not a slot in a template. |
| L2 | **Badge-above-the-H1** — a little pill ("✨ Now with AI") centered directly over the headline. | The most over-generated hero opener. | If a label sits above a heading it's a **chapter marker with story weight** (number + place), never a decorative pill. |
| L3 | **The colored left-border card** — a 3–4px stripe (purple/blue/gradient) on the left edge of a card or blockquote. | *"As reliable a sign of AI as em-dashes are for text."* The single most recognizable component tell. | **No stripe-on-the-left cards.** Differentiate cards by content, composition, and typography — or don't use cards at all where a richer layout fits. |
| L4 | **Identical icon-card grids** — 3 (or 6) equal cards, lucide/emoji icon top-left, title, two lines of body, same padding/radius/height. | Uniform sizing = visual flatness = no editorial judgment. | **Asymmetry and hierarchy.** Vary card weight, break the grid, let the most important thing be biggest. Editorial plates over uniform tiles (see The Realms). |
| L5 | **Numbered 1-2-3 step sequences** and **stat-banner rows** (4 metrics in a horizontal strip). | Default "process" and "credibility" modules. | Stats and steps must be **composed into the story** (our Atelier metrics, the expedition recap), not dropped as a generic banner. |
| L6 | **Perfect uniformity** — every element the same 16px radius, same padding, same shadow, same gap. | Mechanical consistency with no optical or emotional variation. | **Intentional rhythm.** Consistency where it aids scanning; deliberate variation where a moment demands it. Optical spacing, not mechanical. |
| L7 | **Dead-center everything** — every hero and section stack-centered with generous symmetric padding. | The safest, most-generated composition. | Use **asymmetry, off-grid anchors, and directional flow** (our pinned horizontal Journey, the orbital Arsenal). Center only when the moment truly wants it. |
| L8 | **Emoji-icon sidebars / nav** and emoji sprinkled as bullets. | A generated-dashboard reflex. | **No emoji in UI** (CLAUDE.md §3). Custom iconography (lucide + the `CompassRose` SVG), semantic and on-brand. |

---

## 4. Motion & interaction tells

| # | The AI tell | Why it reads as machine | The human move |
|---|---|---|---|
| M1 | **Uniform fade-in-on-scroll** applied identically to every element. | One `AOS`-style rule sprayed everywhere; motion with no meaning. | Motion is **choreography with intent** (GSAP/ScrollTrigger scrub, pin, parallax-out). Each section moves *its own way* for a reason. |
| M2 | **Hover = scale(1.05) / rotate an image.** The recurring generated-UI signature. | A default "interactivity" gesture with no craft. | Hover states that **communicate** (reveal, magnetize, light a path) and match the section's physics. Easing, not snapping. |
| M3 | **Decorative distraction motion** — meteor showers, tracing beam lines down the page, cursor-following light orbs — that competes with the message. | Attention goes to the sparkle; the actual content goes unread. | Motion **serves the narrative or navigation**, never upstages copy. The cursor backlight / astrolabe scrub are *tactile moments* (TACTILE-MOMENTS.md), gated on intent — they reward action, never nag. |
| M4 | **Missing or broken states** — no hover, no focus, buttons that snap, "Get Started" that links nowhere. | Generated UI ships the happy path only. | Every interactive element has **real hover + focus + active + reduced-motion** states and actually goes somewhere. Keyboard-navigable. |
| M5 | **Ignoring `prefers-reduced-motion` and coarse pointers.** | AI rarely wires accessibility branches. | **Always** honor reduced-motion (static fallback) and `(hover:none)` (no mouse-parallax / custom cursor). Non-negotiable (CLAUDE.md §4.5). |

---

## 5. Copy & voice tells

The text is often the *loudest* tell. AI copy is "grammatically correct,
topically relevant, and completely forgettable."

**Blocklisted patterns:**

- **Corporate-SaaS filler verbs:** *streamline, empower, supercharge, unlock,
  elevate, leverage, seamless, robust.*
- **Empty superlatives:** *world-class, best-in-class, enterprise-grade,
  cutting-edge, next-generation, game-changing.*
- **Vague aspiration:** *"Build the future of work," "Your all-in-one platform,"
  "Take your X to the next level."*
- **Filler openers:** *"In today's fast-paced world…," "In the ever-evolving
  landscape of…," "It's worth noting that…"*
- **The negation-pivot / fake-profundity antithesis:** *"It's not just X — it's
  Y."* / *"It's not about X. It's about Y."* Sounds deep, says nothing.
- **The "Bold term: explanation" list** where every bullet is `**Word:** clause.`
- **Hedging:** *"may help," "can potentially," "designed to."*
- **Em-dash overuse** as an all-purpose connector (multiple per paragraph where a
  comma, colon, or period belongs). *(Nuance: the em-dash alone is a weak signal
  — Claude/Gemini use few; it's the **density + the other tells together** that
  out AI. Don't cargo-cult "remove all em-dashes.")*

**The human move (our voice):**

- Copy lives in the **i18n voice bundles**, written *in character* per voice
  (chronicle / plain / scott / dwight / cow …) — CLAUDE.md §4.2. The Chronicle
  base is confident, literary, specific; the easter-egg voices are distinct
  personalities. **Specificity and a real point of view are the antidote to
  slop.**
- The authenticity test: *"Would Manan (or this voice's character) actually say
  this out loud?"* If it could sit on any SaaS homepage, rewrite it.
- Concrete over abstract: real project facts, real metrics, real place-names on
  the map — not "empowering seamless solutions."
- Every new string ships in **every voice** (CLAUDE.md §4.2), each with its own
  cadence — the opposite of one homogenized machine register.

---

## 6. Imagery & iconography tells

| # | The AI tell | The human move |
|---|---|---|
| I1 | **AI-generated illustration** — too smooth, too symmetrical, plastic skin, mangled hands/text, uncanny lighting. | Hand-made / procedural art with intent. Ours is Canvas2D generative (astrolabe, TravelerMap, sigil) — geometry we author, not a diffusion blob. |
| I2 | **Generic stock** — "diverse team smiling at a laptop in an impossibly well-lit office." | Real artifacts: actual project screenshots (realm covers), real build reel, real device readout. Show the *actual thing*. |
| I3 | **Default lucide/emoji icon grid** used as decoration. | Semantic custom iconography + the bespoke `CompassRose`; icons earn their place. |
| I4 | **Mismatched illustration styles** stitched together (different AI generations). | One coherent visual world ("World Bible," [ASSETS.md](ASSETS.md)). |

---

## 7. Code & implementation tells

| # | The AI tell | The human move |
|---|---|---|
| X1 | **Unmodified shadcn/ui + Tailwind defaults** — default radius, default `slate`/`zinc` tokens, default shadows. shadcn is *built* for AI copy-paste, so its defaults now read as AI. | We don't use shadcn defaults; **all theme color via our own `--color-*` tokens**, both themes. Tailwind for layout only. |
| X2 | **Magic numbers & hardcoded strings** in components; copy inlined in JSX. | Data-driven: copy from i18n bundles, structural data from `src/constants/` — components are pure presenters (CLAUDE.md §4.2). |
| X3 | **Copy-pasted duplicated blocks** instead of a shared component. | DRY: shared visuals are components in `src/components/` or CSS utilities (CLAUDE.md §4.1). |
| X4 | **No cleanup** — leaked ScrollTriggers, listeners, rAF loops. | Every GSAP setup in `gsap.context()` + `ctx.revert()`; every listener/rAF/ScrollTrigger removed on unmount (CLAUDE.md §4.4). |
| X5 | **White-screens on failure**, unprobed optional assets. | `lazy()` + `Suspense` + `ErrorBoundary`; optional assets probed and degrade gracefully (CLAUDE.md §4.6–4.7). |
| X6 | **Accessibility gaps** — `div` buttons, no aria, no focus rings, failing contrast. | Real semantic elements, `aria-label`s, keyboard focus, AA contrast (CLAUDE.md §4.5). |

---

## 8. The meta-tells (the "feel")

Beyond any single element, AI sites share a *gestalt*:

1. **Sameness / the uncanny familiar.** You feel you've seen it before because you
   literally have — a thousand times. → *We aim for the opposite: a site someone
   remembers and describes to a friend.*
2. **Frictionless but soulless.** Everything is fine; nothing is felt. → *Every
   section is a **moment** with a point of view (CLAUDE.md §1: "would this survive
   on awwwards?").*
3. **No personal fingerprint.** No anecdote, no opinion, no idiosyncrasy, no
   in-joke. → *The Chronicle is dense with authored choices: the cartographer
   conceit, the voices, the Atelier "making-of," the sealed easter-egg
   personalities.*
4. **Decoration standing in for decisions.** Effects where design should be. →
   *Restraint. The current v1.1 cycle is literally a ["Restraint Pass"](V1.1-RELEASE-PLAN.md).*

**The single best defense against slop is a strong, specific point of view,
consistently executed.** Convergence is the absence of a decision; every
deliberate, opinionated choice is a step away from the mean.

---

## 9. Anti-slop audit checklist

Run before marking any section done (pairs with CLAUDE.md's "Definition of done"):

**Typography**
- [ ] No undifferentiated Inter/Roboto/system default; typefaces are chosen and paired with intent.
- [ ] No lone italic-serif "accent word" for cheap sophistication.
- [ ] Hierarchy comes from scale/weight/rhythm, not ALL-CAPS eyebrows on everything.

**Color & surface**
- [ ] Zero generic purple/indigo→blue gradient or ambient glow "hero blob."
- [ ] No glassmorphism-as-crutch; surfaces have real material hierarchy.
- [ ] All color via `--color-*` tokens; both themes correct; AA contrast on text + headings.
- [ ] Glows/shadows/gradients (if any) are semantic, not decoration.

**Layout**
- [ ] Not the hero→3-cards→stats→CTA skeleton; the section is its own moment.
- [ ] No badge-pill above the H1; no colored-left-border cards.
- [ ] No uniform icon-card grid where hierarchy/asymmetry would be stronger.
- [ ] Composition isn't reflexively dead-centered; spacing is optical, not mechanical.
- [ ] No emoji in UI.

**Motion**
- [ ] Motion is choreographed with intent, not a uniform fade-in spray.
- [ ] No hover-scale-1.05 reflex; hover/focus/active states are crafted and meaningful.
- [ ] No decorative motion competing with copy.
- [ ] `prefers-reduced-motion` + coarse-pointer branches present and correct.

**Copy**
- [ ] No blocklisted filler verbs / empty superlatives / vague aspiration / filler openers / negation-pivot / "Bold: explanation" lists.
- [ ] Passes the "would this voice actually say it?" test; specific, not generic.
- [ ] Written in every voice, each in character.

**Imagery & code**
- [ ] No plastic AI illustration or generic stock; art is authored/procedural/real.
- [ ] No unmodified shadcn/Tailwind defaults; no magic strings/numbers; DRY.
- [ ] Motion cleaned up; lazy + ErrorBoundary; a11y semantics present.

---

## 10. Sources

- [AI Slop Web Design: Complete Guide (2026) — 925studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded — Developers Digest](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it)
- [Why AI Design Looks Generic (and How to Fix It) — Superdesign](https://superdesign.dev/blog/why-ai-design-looks-generic)
- [Why Your AI Keeps Building the Same Purple Gradient Website — prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [Why Every AI-Generated Landing Page Looks the Same (and How to Fix It) — DEV](https://dev.to/_46ea277e677b888e0cd13/why-every-ai-generated-landing-page-looks-the-same-and-how-to-fix-it-1kmo)
- [How to fix the 'AI-generated' look in your frontend — DEV](https://dev.to/alanwest/how-to-fix-the-ai-generated-look-in-your-frontend-1ahh)
- [How To Spot AI-Generated Design — Nick Babich, UX Planet](https://uxplanet.org/how-to-spot-ai-generated-design-697aaabe76c8)
- [Why Most AI-Generated Websites Feel The Same — Manas Parashar, Medium](https://parashar--manas.medium.com/why-most-ai-generated-websites-feel-the-same-b62efaeb50fd)
- [How to Break the AI-Generated UI Curse — DEV](https://dev.to/a_shokn/how-to-break-the-ai-generated-ui-curse-your-guide-to-authentic-professional-design-2en)
- [How to Avoid AI Slop When Using Claude Design — MindStudio](https://www.mindstudio.ai/blog/claude-design-avoid-ai-slop-design-system)
- [How AI-Generated Websites Are Identified — Originality.AI](https://originality.ai/blog/how-to-identify-ai-generated-websites)
- [32 Signs of AI Writing — Copy Ads Content](https://copyadscontent.com/signs-of-ai-writing/)
- ['ChatGPT Hyphen': Are Em Dashes a Giveaway of AI Writing? — Rolling Stone](https://www.rollingstone.com/culture/culture-features/chatgpt-hypen-em-dash-ai-writing-1235314945/)
- [How to Stop Claude Writing Like an AI — Will Francis](https://willfrancis.com/how-to-stop-claude-writing-like-an-ai/)
- [5 AI Website Design Tips For Websites That Don't Look AI-Built — Unpromptable](https://unpromptable.substack.com/p/5-ai-website-design-tips-for-websites)
