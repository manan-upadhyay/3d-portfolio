# Chronicle Portfolio — Combined Beta Action Plan (Source of Truth)

**Document type:** Product truth document + implementation roadmap for AI agents  
**Beta round:** First public beta / Reddit feedback wave  
**Data sources:** PostHog analytics report + collective Reddit comment sentiment from 200+ testers  
**Primary goal:** Turn the portfolio from an impressive experimental website into a trustworthy, high-converting senior developer portfolio.  
**Last updated:** 2026-07-01T14:58+05:30

> [!IMPORTANT]
> **For AI agents:** This is the execution layer — the single document to follow when implementing changes. The [feedback report](../feedback/2026-07-01-reddit-beta-feedback.md) provides perception context. The [analytics report](../analytics/2026-07-01-full-analytics-intelligence-report.md) provides behavioral data. Every action item below includes exact file paths and i18n keys.

> [!NOTE]
> **Action items come from patterns, not from any one comment.** Individual quotes in this document are illustrations of a repeated sentiment, never directives. An item earns P0/P1 status only when a *collective* sentiment aligns with *observed behavior*. No single commenter — regardless of seniority or expertise — sets priority.

> [!CAUTION]
> **Before starting any work:** Read the `CLAUDE.md` at the repo root for the canon (chapter structure, routing, engineering standards). Changes must honor the existing architecture (React 18 + Vite, GSAP + Lenis smooth scroll, i18n bundles, Zustand stores). Do NOT introduce new dependencies without justification.

---

## 1. Executive truth

The portfolio is **memorable, visually ambitious, and technically interesting**, but the first beta exposed a serious positioning problem:

> The website currently impresses some users as an interactive creative experiment, but it also makes many users question whether the work is AI-generated, over-designed, confusing, or not recruiter-friendly.

**A significant positive cluster tempers the loudest criticism.** A meaningful share of comments read the site as competent and legitimate — "nice and functional, wonder which front-end skills you used?", "properly reflects your experience level", "no red flags" — and the strongest strategic signal in that cluster is that the **hero carries most of the conversion work and isn't optimized for it** ("better hook, better CTA, better action path"). We don't treat any of these as authority; we treat them as sentiment and confirm against behavior.

**Synthesis:** The site is closer to working than the loudest critics suggest — it polarizes rather than fails. Weighting by *repetition + behavioral confirmation* (not by volume or credential), the two audiences converge on three things:

1. **The hero needs conversion optimization** — biggest measured funnel leak (Origin → About, ~16%)
2. **The copy over-signals AI** — too much fantasy language, too uniform
3. **Concrete proof is missing** — no project screenshots, no visual evidence

The next version should not kill the Chronicle identity. It should **make the Chronicle serve the hiring goal**.

---

## 2. Desired outcome of the website

### Primary business outcome

Convert relevant visitors into serious professional opportunities:

- Senior full-stack / frontend-heavy roles.
- Remote or high-quality local opportunities.
- Recruiter, CTO, founder, or senior engineer trust.

### Product outcome

A visitor should understand within 10 seconds:

1. Who Manan is.
2. What role he is suitable for.
3. What stack he works with.
4. What real projects he has built.
5. Why the site itself proves craft instead of just showing decoration.
6. How to contact him without friction.

### Brand outcome

The intended signal should be:

> "This developer uses creativity and AI-assisted speed, but the taste, structure, engineering, and decision-making are clearly human."

The current risky signal is:

> "This looks like an AI-generated cinematic portfolio with too much copy and unclear UX."

The redesign must move the site from the second signal to the first.

---

## 3. Data foundation and caveats

| Data point | Value | Caveat | How to use it |
|---|---|---|---|
| ~358 visitors in 30d | All concentrated Jun 29–Jul 1 | Beta spike, not stable trend | Directional behavioral data |
| 343 unique visitors in 24h | Reddit-driven | Developer-community perception | Very useful for AI/trust perception |
| 123 session_recap events | 36% coverage | Abrupt closes miss recap | Session depth KPIs are directional |
| ~90% null device/browser | Instrumentation bug | Must fix before next beta | Device-specific findings are useful but incomplete |
| Reddit comments | 200+ testers | Opinionated developer audience, NOT the primary target audience | Repeated patterns are highly meaningful; individual opinions are not directives |
| Positive/competence cluster | Multiple commenters | Includes target-adjacent, conversion-minded voices | Confirms the concept works for a segment; validates hero-first priority. Do not over-weight any single voice |
| 2 leads | Very small sample | Proves form works | Not statistically significant |

---

## 4. Baseline analytics snapshot

| Metric | Current baseline | Target for next beta |
|---|---:|---:|
| Last 24h unique visitors | 343 | — |
| Avg session duration | 65.7–69s | 80–100s |
| ⚠️ Avg max scroll | 41.8–43.9% | 50–55% |
| ⚠️ Contact section reach | 36.6% (30d) / 33.3% (24h) | 45–55% |
| Hero → About retention | 84% | 90%+ |
| Projects section reach | 50% | 60%+ |
| ⚠️ Form start rate overall | 2.51% | 5–8% |
| Form start among contact reachers | 6.9% | 12–20% |
| ⚠️ Form abandonment | 78% | <40% |
| Overall lead conversion | 0.56% | 1.0–2.0% |
| Resume opens | 4 | 15–25 per 350 users |
| GitHub/LinkedIn clicks | 8 total | 20+ total |
| Device/browser null rate | ~90% | <5% |
| Session recap coverage | ~36% | 60%+ |
| ⚠️ Windows form starts | 0 | >0 |
| Sound heard / muted | 309 / 16 (5.2%) | Maintain |
| Theme switches | 309 | Maintain |
| Voice switcher opens | 33 (9.2%) | 12–18% (P2) |
| Project clicks | 12 total | 25+ |

---

## 5. Combined analytics + feedback diagnosis

This maps what users said to what users did. **Every row includes the specific implementation target.**

| Problem | Feedback evidence | Analytics evidence | Implementation target | Priority |
|---|---|---|---|---|
| Hero doesn't convert | Sentiment: "better hook/CTA/action path"; positive cluster still flags the hero | 16% Origin→About drop (biggest single leak); CTAs say "Begin the Chronicle" / "Summon me →" | Rewrite hero copy + CTAs in all voice bundles; add proof strip; reduce astrolabe prominence | **P0** |
| Site feels AI-generated | "vibe coded", "AI slop", "Claude artifact", specific signals named (eyebrows, chips, pills) | Reddit drove 38% traffic; developer audience was intensely vocal | Rewrite copy, remove/redesign `chapter-eyebrow` pattern, vary section density, reduce fantasy vocabulary | **P0** |
| Too much text | "recruiters won't read", "overloaded", "reduce text" | Avg scroll 41.8%; scroll milestones in 7-11s (skimming fast); contact reach 36.6% | Cut visible copy 50-70% across all bundles; progressive disclosure | **P0** |
| Contact conversion is broken | "footer stops abruptly", "confusing UX", form language too themed | 131 reached contact → 9 started form → 2 submitted; 78% abandonment | Simplify form copy, add quick-contact alternatives, stronger footer CTA | **P0** |
| Windows contact bug | Not directly mentioned | Windows: 80.8% contact reach, 0 form starts | Debug contact section on Windows Chrome/Edge | **P0** |
| Analytics instrumentation gaps | Not user-facing | 90% null device properties; 36% recap coverage | Fix super property registration; add heartbeat events | **P0** |
| Performance degradation | "Performance issue the longer I stayed" (M1 MacBook Pro, 4K display) | No performance metrics tracked | Audit animation lifecycles; fix memory leaks; cap Canvas DPR | **P0** |
| Scroll irritation | "laggy", "buggy", "non-intuitive" | Avg scroll only 42%; biggest drop at Origin→About | Reduce Lenis smoothing; disable on mobile; fix horizontal timeline | **P1** |
| Missing project proof | "Zero images", "make it personalized" | Only 12 project clicks; Gajaakriti 9 vs Royal Tiles 3 | Add screenshots to all featured projects; reorder by interest | **P1** |
| Icons/controls confusing | "What do I do?", "scary to click" | Map 55 opens vs Rail 14 clicks; Theme 309 vs Voice 33 | Add labels/tooltips; separate decorative from functional | **P1** |
| Making-of hurts perception | "no words", "refined Claude artifact" | 9 visits in 24h; Atelier funnel 0 | Rewrite as engineering case study | **P1** |
| Mobile UX confusion | "not user friendly", "scary to click" | Android converted at 2.78% (higher than macOS!) | Build distinct mobile UX; simplify controls; increase tap targets | **P1** |
| Custom cursor distracts | "distracting", "simplify it" | Not tracked | Simplify or disable by default | **P2** |
| Astrolabe confuses | "just spins", "should point somewhere" | Dragged 97, spun 51, but Voice Hall 4, Atelier funnel 0 | Make functional or clearly decorative; reduce hero prominence | **P2** |

---

## 6. Product strategy

### The wrong response

Do not panic and delete all creativity. That would turn the site into another generic developer portfolio and lose the strongest differentiator: memorability.

### The right response

Weight feedback by **repetition + behavioral confirmation**, and tilt toward voices closer to the actual target audience (hiring decision-makers) — but let no single comment set direction. Focus changes on what the sentiment clusters AND the analytics agree on:

1. **Hero conversion** — biggest measured funnel leak
2. **Less text, more proof** (near-unanimous, confirmed by 41.8% avg scroll)
3. **Clearer interactions** (confirmed by control-usage gaps)
4. **Fix bugs** (Windows, performance, analytics)

Keep the Chronicle identity as the atmospheric layer. But make the professional message primary.

### Recommended product positioning

> "A cinematic portfolio with a clear professional spine."

Not:

> "A cinematic story that happens to contain a resume."

---

## 7. P0 — Must fix before next public beta

These are conversion-critical or trust-critical. Each includes exact implementation details.

---

### P0.1 Optimize the hero for conversion

> Above-the-fold does most of the conversion work — a standard CRO principle, reproduced here: Origin → About is the biggest single funnel leak (~16%). Better hook, better CTA, better action path.

#### Problem

The hero currently shows: name (large), a rotating tagline ("I architect production systems / scalable platforms / resilient APIs / reusable UI systems"), a fantasy hook, and CTAs that don't communicate value ("Begin the Chronicle" / "Summon me →"). The astrolabe takes up ~44vw on desktop.

#### Analytics proof

- 16% of visitors leave between hero and About — the single biggest section-to-section loss
- Hero CTAs: 32 about clicks / 18 contact clicks from 358 visitors = ~14% CTA engagement
- 10-15 second attention window before most visitors decide to stay or leave

#### Files to change

| File | What to change |
|---|---|
| `src/sections/Hero.jsx` | Restructure copy block; reduce astrolabe size; add proof strip; change CTA targets |
| `src/i18n/bundles/chronicle.js` | `hero.lead`, `hero.hook`, `hero.ctaPrimary`, `hero.ctaSecondary`, `hero.phrases` |
| `src/i18n/bundles/plain.js` | Same hero.* keys |
| `src/i18n/bundles/scott.js` | Same hero.* keys (in Michael Scott voice) |
| `src/i18n/bundles/dwight.js` | Same hero.* keys (in Dwight voice) |
| `src/i18n/bundles/cow.js` | Same hero.* keys (in cow voice) |
| `src/constants/index.js` | May need additional `personalInfo` fields for proof strip data |

#### Required changes

**1. Rewrite hero copy (all bundles):**

Current `chronicle.js`:
```js
hero: {
  lead: 'I architect',
  phrases: ['production systems', 'scalable platforms', 'resilient APIs', 'reusable UI systems'],
  hook: 'Five years charting production systems where performance, trust, and craft decide the path.',
  ctaPrimary: 'Begin the Chronicle',
  ctaSecondary: 'Summon me →',
}
```

Direction for `chronicle.js` (keep some Chronicle flavor):
```js
hero: {
  lead: 'I build',
  phrases: ['polished web products', 'production React systems', 'full-stack workflows', 'frontend-heavy applications'],
  hook: 'Full-stack developer with 5+ years shipping React, Next.js, and Node.js applications across dashboards, CRMs, SaaS, and enterprise products.',
  ctaPrimary: 'See my work',
  ctaSecondary: 'Get in touch',
}
```

Direction for `plain.js`:
```js
hero: {
  lead: 'I build',
  phrases: ['production web apps', 'React frontends', 'full-stack systems', 'polished interfaces'],
  hook: 'Full-stack developer — 5+ years, frontend-heavy. React, Next.js, Node.js, TypeScript. Lead Frontend at Capital Group via Infosys. Open to senior roles.',
  ctaPrimary: 'See my work',
  ctaSecondary: 'Contact me',
}
```

**2. Add proof strip to Hero.jsx:**

Below the hook, above the CTAs, add a concise proof line:

```jsx
<div className="hero-proof mt-4 flex flex-wrap items-center gap-3 text-[13px] font-mono tracking-wide uppercase" style={{ color: 'var(--color-text-muted)' }}>
  <span>5+ yrs</span>
  <span className="opacity-40">·</span>
  <span>React / Next.js / Node.js</span>
  <span className="opacity-40">·</span>
  <span>8 shipped products</span>
  <span className="opacity-40">·</span>
  <span>Lead Frontend at Capital Group</span>
</div>
```

**3. Change CTA targets:**

Current: Primary → scrolls to "about", Secondary → scrolls to "contact"  
New: Primary → scrolls to "projects" (proof first), Secondary → scrolls to "contact", Tertiary → resume download

**4. Reduce astrolabe visual weight:**

In `Hero.jsx`, reduce the desktop sizing:
- Current: `md:w-[min(44vw,560px)]`
- New: `md:w-[min(36vw,440px)]` and reduce opacity slightly

#### Acceptance criteria

- A recruiter understands role fit from the hero alone without scrolling.
- Primary CTA describes what the visitor will see.
- At least one proof point visible above the fold.
- Hero → About retention improves from 84% to 90%+.

---

### P0.2 Reduce AI/vibe-coded perception

#### Problem

Many users called the site AI-generated. The most actionable comments in that cluster point at concrete, reproducible visual tells rather than taste: uppercase "eyebrow" headings, chips, pills, and uniform section density.

#### Files to change

| File | What to change |
|---|---|
| `src/i18n/bundles/chronicle.js` | Cut fantasy vocabulary by 50%; replace with specific, human language |
| `src/i18n/bundles/plain.js` | Ensure all keys are direct and professional |
| `src/i18n/bundles/scott.js`, `dwight.js`, `cow.js` | Update matching keys in each personality |
| `src/components/ChapterHeading.jsx` | Redesign or remove the `chapter-eyebrow` uppercase pattern |
| `src/index.css` | Modify `.chapter-eyebrow` styles, reduce pill/chip styling uniformity |
| `src/sections/Contact.jsx` | Replace themed form language: "Dispatch the Raven" → "Send message" |

#### Specific copy keys to rewrite

| Key path | Current value | Problem | Direction |
|---|---|---|---|
| `hero.lead` | "I architect" | Abstract, AI-sounding | "I build" |
| `hero.hook` | "Five years charting production systems…" | Fantasy language | Direct professional claim |
| `hero.ctaPrimary` | "Begin the Chronicle" | Zero value communicated | "See my work" |
| `hero.ctaSecondary` | "Summon me →" | Unclear action | "Get in touch" |
| `about.pullQuote` | "Every realm below began as an empty repository…" | Pure AI flavor | Cut entirely or replace with concrete claim |
| `about.intro[0]` | "I build production web platforms the way a storyteller builds worlds…" | AI metaphor | Direct professional intro |
| `works.intro` | "Each realm is a production world charted end to end…" | Fantasy overload | Professional framing |
| `contact.submitIdle` | "Dispatch the Raven" | Confusing | "Send message" |
| `contact.status.idle` | "The raven waits, quill trimmed and ready." | Over-themed | Simplify or remove |
| `contact.errors.required[*]` | "The raven refuses to fly with an empty scroll…" | Adds cognitive load during frustration | "Please fill in all fields." |
| `chapters.contact.sub` | "Send a Raven" | Fantasy over function | "Get in Touch" |
| `experience.intro` | "Every expedition leaves a trail…" | AI-sounding | Direct intro |
| `arsenal.subtitle` | "The kit I carry into every campaign…" | AI-sounding | "Technologies I work with" |

#### Visual pattern changes

1. **Redesign `chapter-eyebrow`:** The "CHAPTER 01 · THE CRAFT" uppercase label is the #1 vibe-coded visual tell. Options:
   - Remove chapter numbering
   - Use normal-case, lighter weight
   - Make it a subtle inline label instead of a prominent eyebrow

2. **Vary section density:** Currently every section has the same level of polish. Make some sections deliberately simpler — show restraint.

3. **Reduce pill/chip uniformity:** The contact inquiry chips and skill badges look identical to AI-generated UI. Use more distinctive interaction patterns.

#### Acceptance criteria

- No tester describes the first impression as AI slop, Claude artifact, or vibe-coded template.
- Copy reads as human-authored with occasional Chronicle flavor, not wall-to-wall fantasy.

---

### P0.3 Cut information overload

#### Problem

Users repeatedly said too much text. Analytics confirm: scroll milestones reached in 7-11s (skimming), avg scroll 41.8%, contact reach 36.6%.

#### Files to change

| File | What to change |
|---|---|
| All `src/i18n/bundles/*.js` | Cut every section's visible copy by 50-70% |
| `src/sections/About.jsx` | Show 3-4 lines max; hide principles behind expander |
| `src/sections/Experience.jsx` | Reduce waypoint bullet points; shorter chapter names |
| `src/sections/Works.jsx` | Show 3 featured projects by default; "Show all" for the rest |
| `src/sections/Tech.jsx` | Simplify subtitle; keep grouped chips |

#### Copy budget per section

| Section | Current | Target |
|---|---|---|
| Hero | ~50 words + rotating phrases | ~40 words + proof strip + 3 CTAs |
| About | ~200 words + 4 principle cards + 4 discipline cards | 3-4 lines + expandable depth |
| Experience | ~350 words across 5 waypoints | 2-3 bullets per waypoint max |
| Arsenal | Subtitle + ~32 skill badges | Subtitle + grouped chips (OK as-is if subtitle is rewritten) |
| Works | ~100 word intro + 8 project cards | 3 featured projects with screenshots + "Show more" |
| Contact | ~200 words + form + recap | 1 sentence + simplified form |

#### Acceptance criteria

- Visible copy reduced by at least 50%.
- User can understand professional value without scrolling past section 2.
- Avg scroll improves to 50-55%.
- "Too much text" comments reduce sharply.

---

### P0.4 Fix contact conversion and form abandonment

#### Problem

The contact funnel is leaking heavily. 78% form abandonment. Themed form language adds friction.

#### Analytics proof

| Step | Users | Rate |
|---|---:|---:|
| Landed on site | 358 | 100% |
| Reached contact | 131 | 36.6% |
| Started form | 9 | 2.51% |
| Submitted form | 2 | 0.56% |
| Sent successfully | 2 | 100% of submits |

#### Files to change

| File | What to change |
|---|---|
| `src/sections/Contact.jsx` | Simplify form UI; change submit button text; simplify status console; add quick contact alternatives prominently |
| `src/i18n/bundles/chronicle.js` | `contact.submitIdle`, `contact.status.*`, `contact.errors.*`, `contact.placeholders.*` |
| `src/i18n/bundles/plain.js` | Same contact.* keys |
| `src/i18n/bundles/scott.js`, `dwight.js`, `cow.js` | Same contact.* keys in character |

#### Required changes

**1. Simplify form copy:**
- `contact.submitIdle`: "Dispatch the Raven" → "Send message" (for `plain.js`, keep themed version for `chronicle.js`)
- `contact.status.idle`: "The raven waits, quill trimmed and ready." → Remove or simplify
- `contact.errors.required`: Use simple "Please fill in all fields." alongside themed variants
- `contact.placeholders.message`: "Tell me about the realm you want to build…" → "Tell me about the role or project…"

**2. Add quick contact alternatives:**
Make email copy, LinkedIn, GitHub, and resume download **more prominent** — they're currently in a separate card. Many warm leads prefer direct contact over a form.

**3. Add low-pressure CTA copy:**
```md
Not ready to write a full message? Just copy my email or connect on LinkedIn.
```

**4. Add a floating/sticky CTA:**
After 50-75% scroll or project section view, show a subtle floating CTA:
```md
Like what you see? Let's talk. [Contact] [Résumé]
```

#### Acceptance criteria

- Form start rate: 5-8% overall
- Form abandonment: <40%
- Direct email/LinkedIn/GitHub clicks increase
- Submit copy is clear and action-descriptive

---

### P0.5 Fix Windows contact-section bug

#### Problem

Windows users reached contact at 80.8% but had ZERO form starts. This is almost certainly a rendering/UX bug.

#### Analytics proof

| OS | Reached contact | Form starts | Sent |
|---|---:|---:|---:|
| macOS | 79 (97.5%) | 8 (9.9%) | 1 |
| Android | 28 (77.8%) | 1 (2.78%) | 1 |
| **Windows** | **21 (80.8%)** | **0** | **0** |

#### Files to investigate

| File | What to check |
|---|---|
| `src/sections/Contact.jsx` | z-index stacking, pointer-events on form elements |
| `src/index.css` | `.form-field` styles, any Windows-specific rendering issues |
| `src/lib/smoothScroll.js` | Lenis scroll container may trap focus or prevent click-through on Windows |
| `src/components/Layout.jsx` | Global scroll wrapper may interfere with form input on Windows |
| Custom cursor code | Cursor overlay may block pointer-events on Windows |

#### Likely causes

1. Contact form overlay/z-index issue
2. Input fields not focusable (scroll container trapping pointer-events)
3. Custom cursor interfering with click events on Windows Chrome/Edge
4. Lenis smooth scroll wrapper preventing native input focus

#### Required testing

- Windows Chrome (latest)
- Windows Edge (latest)
- Test: can you click into the name field? email field? textarea?
- Test: does the custom cursor overlay block pointer-events?

#### Acceptance criteria

- Form inputs focus correctly on Windows Chrome/Edge
- Submit button is visible and clickable
- Windows form start rate becomes comparable to macOS/Android

---

### P0.6 Fix analytics instrumentation

#### Problem

~90% null device/browser properties. 36% session recap coverage. No performance metrics.

#### Files to change

| File | What to change |
|---|---|
| `src/lib/analytics.js` | Register super properties before first event; add heartbeat events; add tracking version |
| `src/sections/Atelier.jsx` | Add section_view, scroll_depth, CTA click tracking |
| `src/pages/MakingOf.jsx` | Add page-level tracking |

#### Required implementation

**1. Fix super property registration:**
```js
// Before posthog.init() or before first capture
posthog.register({
  app_name: 'chronicle_portfolio',
  beta_round: 'beta_2',
  tracking_version: '2026-07-02',
  device_os: resolvedOS,
  device_browser: resolvedBrowser,
  viewport_width: window.innerWidth,
  viewport_height: window.innerHeight,
  input_type: pointerType,
  reduced_motion: prefersReducedMotion,
  initial_theme: currentTheme,
  traffic_context: detectedSource
});
```

**2. Add session heartbeat:**
```js
// Fire at 15s, 30s, 60s to capture short-session data
setTimeout(() => track('session_heartbeat_15s'), 15000);
setTimeout(() => track('session_heartbeat_30s'), 30000);
setTimeout(() => track('session_heartbeat_60s'), 60000);
```

**3. Add visibility change tracking:**
```js
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    track('session_background');
  }
});
```

#### Acceptance criteria

- Device/browser null rate below 5%
- Session recap or heartbeat coverage above 60%
- `/making-of` has full tracking
- Every major CTA has click tracking

---

### P0.7 Fix performance degradation

#### Problem

A MacBook Pro M1 user with 4K display reports performance issues the longer they stayed. This suggests memory leaks or unbounded animation/listener accumulation.

#### Files to audit

| File | What to check |
|---|---|
| `src/sections/Hero.jsx` | GSAP context cleanup, canvas RAF cleanup |
| `src/hooks/useAstrolabe.js` | Animation frame lifecycle, DPR handling (4K = 2x+ multiplier on canvas) |
| `src/lib/smoothScroll.js` | Lenis listener cleanup |
| `src/sections/Experience.jsx` | ScrollTrigger pin cleanup (pinned horizontal scroll is notorious for leaks) |
| `src/sections/Tech.jsx` | Orbital animation cleanup |
| `src/sections/Works.jsx` | Scroll-triggered animations |
| `src/components/Layout.jsx` | Global listener accumulation |
| All `src/sections/*.jsx` | Every `useEffect` cleanup function |

#### Required actions

1. **Canvas DPR cap:** In `useAstrolabe.js`, cap DPR at 2:
```js
const dpr = Math.min(window.devicePixelRatio, 2);
```

2. **Verify every GSAP context:** Every component using GSAP must:
```js
useEffect(() => {
  const ctx = gsap.context(() => { /* ... */ }, rootRef);
  return () => ctx.revert(); // MUST exist and MUST be called
}, []);
```

3. **Verify RAF cleanup:** Any `requestAnimationFrame` must be cancelled on unmount.

4. **Verify listener cleanup:** Every `addEventListener` must have a matching `removeEventListener` in cleanup.

5. **Profile in Chrome DevTools:** Run a 3-minute session and check for:
- Growing JS heap
- Increasing listener count
- Detached DOM nodes
- Layout thrash in scroll handlers

#### Acceptance criteria

- No measurable performance degradation after 3 minutes of browsing
- Canvas rendering capped at 2x DPR
- Zero leaked GSAP contexts
- Zero dangling event listeners

---

## 8. P1 — Should fix for high impact

---

### P1.1 Add real project proof and visual evidence

#### Problem

Users felt the site lacked concrete proof and real visuals. "Zero images whatsoever." This worsens the AI-generated perception.

#### Analytics mapping

- Project live links: 12 clicks total (Gajaakriti 9, Royal Tiles 3)
- No source/GitHub clicks recorded
- Projects section reach: 50% — half of visitors never see this section

#### Files to change

| File | What to change |
|---|---|
| `src/sections/Works.jsx` | Add image/video slots to project cards; show 3 featured by default |
| `src/constants/index.js` | Add `image`, `video`, `caseStudyUrl` fields to project data |
| `src/i18n/bundles/chronicle.js` | Rewrite `works.projects.*.description` and `highlights` to be proof-focused |
| `public/realms/` | Add project screenshots (must be captured) |

#### Required changes

**1. Add screenshots for each featured project:**
- Gajaakriti Studio: website homepage + admin panel view
- Royal Tiles Playground: tile designer interface + PDF preview
- Advisor Portfolio: dashboard view (anonymized/blurred if under NDA)

**2. Reorder projects:** Put Gajaakriti Studio first (3x more clicked).

**3. Show 3 featured projects by default.** The other 5 should be behind "Show more" (currently `chartMore` key).

**4. Project card structure should be:**
```
[Screenshot/Video]
Project Name — One line description
Stack: React, Next.js, Node.js, etc.
• Proof bullet 1 (what you built, concrete)
• Proof bullet 2 (measurable outcome)
• Proof bullet 3 (technical decision)
[Live Demo] [Case Study] [GitHub]
```

#### Acceptance criteria

- Every featured project has a real screenshot
- Project clicks increase from 12 to 25+ per 350 users
- "Zero images" comments eliminated
- Projects section reach improves to 60%+

---

### P1.2 Rework `/making-of` from liability into proof

#### Problem

`/making-of` gets 9 visits in 24h but reinforces "AI slop" perception.

#### Files to change

| File | What to change |
|---|---|
| `src/sections/Atelier.jsx` | Restructure content hierarchy; add real artifacts |
| `src/i18n/bundles/chronicle.js` | Rewrite `atelier.*` keys — tone down self-narration |
| `src/pages/MakingOf.jsx` | Add scroll/section tracking |

#### Rewrite direction

Current structure is cinematic self-narration. New structure should be:

```md
1. Why I built this (honest, 3 sentences)
2. Technical architecture (diagram + brief)
3. Key engineering decisions (3-5 concrete choices with rationale)
4. What beta users said (honest summary of both positive and negative)
5. What I changed after feedback (before/after)
6. Performance + accessibility notes (concrete numbers)
```

Add CTA at bottom:
```md
If this level of product thinking matters to you, let's talk.
[Contact] [Résumé]
```

#### Acceptance criteria

- `/making-of` becomes a credibility page
- "AI slop" comments about making-of reduce
- CTA clicks from `/making-of` appear in analytics

---

### P1.3 Fix confusing navigation and icon affordances

#### Files to change

| File | What to change |
|---|---|
| `src/components/ControlCluster.jsx` | Add visible labels to all controls |
| `src/components/SkyControl.jsx` | Already works well (309 events) — use as model |
| `src/components/SideRail.jsx` | Add labels on hover; consider removing if rail stays underused |
| `src/components/VoiceSwitcher.jsx` | Borrow theme switcher's visual pattern |

#### Required changes

1. **Add labels/tooltips to every persistent control:** Map, Sound, Voice, Theme
2. **Separate brand logo from map navigation** (if they share visual language)
3. **On mobile:** Replace floating icon cluster with a single menu button containing all controls

#### Acceptance criteria

- New users can identify every floating control without guessing
- Voice switcher open rate improves toward theme switcher's level
- "Scary to click" comments eliminated

---

### P1.4 Fix scroll feel

#### Files to change

| File | What to change |
|---|---|
| `src/lib/smoothScroll.js` | Reduce Lenis lerp/smoothing; add mobile detection |
| `src/sections/Experience.jsx` | Fix horizontal timeline to support horizontal gestures + keyboard arrows |

#### Required changes

1. **Reduce smooth scroll intensity on desktop:**
   - Lower Lenis `lerp` value (make closer to native)
   - Reduce `wheelMultiplier` if it feels sluggish

2. **Disable custom smooth scroll on mobile:**
```js
const shouldUseSmoothScroll = !isMobile && !prefersReducedMotion;
```

3. **Fix horizontal timeline (Chapter 2):**
   - Support vertical wheel driving horizontal movement
   - Support horizontal trackpad gestures
   - Add visible progress indicator
   - Add keyboard arrow support

#### Acceptance criteria

- No lag on mid-range laptop
- Scroll can be disabled by reduced motion
- Timeline works with horizontal gestures
- "Buggy scroll" comments reduce

---

### P1.5 Simplify mobile experience

#### Files to change

| File | What to change |
|---|---|
| `src/components/ControlCluster.jsx` | Replace floating icons with single menu on mobile |
| `src/index.css` | Increase mobile tap targets, letter-spacing, line-height |
| `src/sections/Hero.jsx` | Ensure proof strip and CTAs are prominent on mobile |
| `src/sections/Contact.jsx` | Optimize form for mobile autofill |

#### Mobile priority stack

1. Hero with direct role/stack
2. Sticky bottom actions: Contact, Resume, Projects
3. Simplified controls (one menu button)
4. No custom cursor
5. Native scroll
6. Larger tap targets (44px minimum)
7. Clear labels
8. Reduced animation density
9. Contact form optimized for autofill

#### Acceptance criteria

- Mobile tester finds Projects, Resume, and Contact in under 10 seconds
- Tap targets are at least 44px
- Form fields support autofill
- Android conversion rate maintained or improved

---

## 9. P2 — Medium-term improvements

### P2.1 Simplify custom cursor

**Solution:** Smaller, one color, no constant animation. Disable on touch devices and reduced-motion. Consider disabling by default.

### P2.2 Reposition astrolabe

**Solution:** Either make it functional navigation (spin reveals sections) or clearly decorative (smaller, with microcopy). Since the hero must do conversion work, don't let the astrolabe compete with the professional content for attention.

### P2.3 Improve deep feature discovery

**Solution:** Don't make deep features louder (increases overload). Instead, add one "Explore hidden details" entry point. Keep easter eggs optional.

### P2.4 Strengthen logo/brand identity

**Solution:** Add wordmark "Manan Upadhyay" on desktop. Separate brand mark from navigation icon.

### P2.5 Add security headers

**Solution:** Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

---

## 10. Copy direction reference

### Current copy DNA (the problem)

Every line in `chronicle.js` sounds like a first-draft Claude completion. The vocabulary is:
- "Realm", "chronicle", "charting", "expedition", "quest", "raven", "summon"
- "Craft", "tiny details", "polished", "immersive", "intentional", "handcrafted"
- Sentences are uniformly long, uniformly polished, uniformly grandiose

### Target copy DNA

| Section | Chronicle voice (keep flavor) | Plain voice (recruiter-safe) |
|---|---|---|
| Hero lead | "I build" | "I build" |
| Hero hook | Professional claim with one Chronicle touch | Direct professional claim |
| About | 3-4 lines, specific, one metaphor max | 3-4 lines, purely professional |
| Experience | Concise cards with real outcomes | Same (minimal voice difference) |
| Projects | Proof-focused with real descriptions | Same |
| Contact | Warm, direct, low-pressure | "Let's connect" |
| CTA primary | "See my work" | "View projects" |
| CTA secondary | "Get in touch" | "Contact me" |

### What to keep from Chronicle voice

- Section labels can retain flavor (The Craft, The Arsenal, etc.) — just don't repeat them in every sentence
- One metaphor per section maximum
- Theme/sky names (Dawn, Dusk, Night) are fine
- Easter egg voices can be as themed as they want
- Sound and theme UI copy can stay literal

### What to remove from Chronicle voice

- Fantasy vocabulary in professional content
- Stacked metaphors (3+ in one paragraph)
- "Epic" register for mundane claims
- Themed error messages that add cognitive load during frustration
- Self-referential "the cartographer" in copy the visitor sees first

---

## 11. Information architecture for next version

### Current flow

```
Hero → About → Experience → Arsenal → Projects → Contact → [Expedition Recap]
```

### Recommended flow

```
Hero (with proof strip + clear CTAs)
  → Projects (proof first — moved earlier or directly reachable from hero)
  → About (brief — 3-4 lines)
  → Experience (concise timeline)
  → Skills/Arsenal (grouped chips)
  → Contact (simple form + alternatives)
  → [Expedition Recap — optional, non-blocking]
```

**Key change:** Projects should be reachable directly from the hero CTA. Whether that means reordering sections or just changing the CTA target depends on implementation feasibility. The simplest fix: change hero primary CTA from "scroll to about" to "scroll to projects."

---

## 12. Sprint plan for AI agents

### Sprint 1 — Hero + trust repair (highest ROI)

- [ ] Rewrite hero copy in all 5 voice bundles (chronicle, plain, scott, dwight, cow)
- [ ] Change hero CTA targets: primary → projects, secondary → contact, add tertiary → resume
- [ ] Add proof strip to Hero.jsx
- [ ] Reduce astrolabe sizing on desktop
- [ ] Redesign or remove `chapter-eyebrow` uppercase pattern
- [ ] Rewrite `about.intro` and `about.pullQuote` in all bundles
- [ ] Cut visible text across all sections by 50-70%

### Sprint 2 — Contact conversion + bugs

- [ ] Simplify contact form copy in all bundles (`submitIdle`, `status.*`, `errors.*`)
- [ ] Add quick-contact alternatives prominently (email copy, LinkedIn, GitHub)
- [ ] Add floating CTA after 50-75% scroll
- [ ] Debug and fix Windows Chrome/Edge contact form interaction
- [ ] Fix PostHog super property registration order
- [ ] Add session heartbeat events (15s, 30s, 60s)
- [ ] Add tracking version and beta round properties

### Sprint 3 — Project proof + visual evidence

- [ ] Capture real screenshots for Gajaakriti Studio, Royal Tiles, and 1-2 more projects
- [ ] Add image slots to project cards in Works.jsx
- [ ] Reorder projects with Gajaakriti Studio first
- [ ] Show 3 featured projects by default, rest behind "Show more"
- [ ] Rewrite project descriptions to be proof-focused in all bundles
- [ ] Add live demo buttons more prominently

### Sprint 4 — Scroll + performance + mobile

- [ ] Reduce Lenis smooth-scroll intensity on desktop
- [ ] Disable custom smooth scroll on mobile
- [ ] Fix horizontal timeline to support horizontal gestures
- [ ] Audit all GSAP contexts for proper cleanup
- [ ] Cap canvas DPR at 2x
- [ ] Profile for memory leaks in Chrome DevTools
- [ ] Simplify mobile floating controls to single menu button
- [ ] Increase mobile tap targets to 44px minimum

### Sprint 5 — Making-of + security + polish

- [ ] Rewrite `/making-of` as engineering case study
- [ ] Add real artifacts (screenshots, architecture, code snippets)
- [ ] Add CTA at bottom of making-of page
- [ ] Add security headers to vercel.json
- [ ] Label all persistent controls
- [ ] Simplify custom cursor or disable by default
- [ ] Add full analytics tracking to `/making-of`

---

## 13. QA checklist before next beta

### Desktop QA

- [ ] Chrome macOS
- [ ] Firefox macOS
- [ ] Safari macOS
- [ ] **Chrome Windows** (critical — form bug)
- [ ] **Edge Windows** (critical — form bug)
- [ ] 1366px laptop width
- [ ] 1440px desktop width
- [ ] 1920px desktop width

### Mobile QA

- [ ] iPhone mini / 375px width
- [ ] iPhone standard width
- [ ] Android Chrome
- [ ] Touch scrolling (native, no custom)
- [ ] Tap target size (44px minimum)
- [ ] Form autofill
- [ ] Floating CTA doesn't block content

### Performance QA

- [ ] 3-minute session on M1 MacBook — no degradation
- [ ] 4K display — no excessive GPU load
- [ ] Canvas DPR capped at 2x
- [ ] No growing heap in Chrome DevTools
- [ ] No detached DOM nodes

### Analytics QA

- [ ] First pageview has device/browser properties (not null)
- [ ] Section view events fire once per section per session
- [ ] CTA clicks are captured
- [ ] Form start and submit events are captured
- [ ] Contact success is captured
- [ ] `/making-of` tracking works
- [ ] Test traffic is labeled or filtered

---

## 14. What to preserve

The beta proved several strengths. Do NOT remove:

| Keep | Why |
|---|---|
| Chronicle concept | Memorability — the strongest differentiator |
| Atmospheric color palette | Users explicitly praised colors |
| Theme switching | 309 events — most used interactive feature |
| Sound design | 94.8% acceptance rate |
| Map navigation | 55 opens, 23 jumps — users prefer it |
| Small intentional details | "Intentional details" praised by multiple users |
| Whimsical identity | Distinguishes from generic portfolios |
| Interactive polish | Praised when it supports content |

---

## 15. Final product recommendation

The website should evolve from:

> "A cinematic AI-looking portfolio experience with impressive details but confusing trust signals."

To:

> "A clear senior developer portfolio with a memorable cinematic layer, real project proof, low-friction contact, and measurable product thinking."

The highest-leverage changes are:

1. **Optimize the hero** (80% of conversion work) — hook, CTA, action path
2. **Rewrite copy to sound human** — direct, specific, less fantasy
3. **Cut visible text by 50-70%**
4. **Add real project screenshots** — the single best anti-"AI-slop" move
5. **Fix the contact funnel** — simplify form, reduce abandonment
6. **Fix Windows bug** — recover lost conversions
7. **Fix performance degradation** — prove engineering craft through working code
8. **Fix analytics** — measure whether changes work

> [!TIP]
> **Weighting rule (the most important process input):** rank a signal by how many independent users repeat it *and* whether behavior confirms it — not by volume or credential. Fix what the sentiment clusters and the analytics agree on (hero, proof, text, bugs), and don't over-correct for the loudest critics at the expense of the site's personality.

---

## 16. One-line instruction for AI agents

> Rework the Chronicle portfolio into a human-first, proof-heavy, conversion-optimized senior developer portfolio — starting with the hero (80% of the work: better hook, better CTA, better action path), then fixing AI-perception signals, text overload, contact conversion, Windows bug, performance degradation, and analytics instrumentation — while preserving the cinematic Chronicle identity as an optional interactive layer.
