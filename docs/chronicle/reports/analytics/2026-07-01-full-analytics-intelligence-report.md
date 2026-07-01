# Chronicle Portfolio – Full Analytics Intelligence Report (July 1, 2026)

**Generated:** July 1, 2026 · **Data sources:** PostHog Web Analytics + 5 Production Dashboards  
**Time windows:** Last 24 hours (web snapshot) + Last 30 days (product analytics)  
**Purpose:** The canonical behavior-data truth document for the Chronicle portfolio beta. Cross-referenced with the [Reddit feedback document](../feedback/2026-07-01-reddit-beta-feedback.md) for perception validation.  
**Last updated:** 2026-07-01T14:58+05:30

> [!IMPORTANT]
> **For AI agents:** This document is the behavior layer. The [feedback report](../feedback/2026-07-01-reddit-beta-feedback.md) is the perception layer. The [combined action plan](../synthesis/2026-07-01-combined-beta-action-plan.md) is the execution layer. Read all three before starting any reform work. Key metrics are highlighted with ⚠️ where they reveal problems. Each section includes a **What to fix** summary.

---

## SECTION 1 — Web analytics snapshot (last 24 hours)

### Traffic volume

- **Unique visitors:** 343
- **Total pageviews:** 347
- **Sessions:** 343
- **Pages per session:** ~1.01 (single-page site, expected)
- **New vs. returning:** Jun 30 showed 14 new / 6 returning; Jul 1 shows 16 new / 2 returning (returning_visitor super-property confirms meaningful repeat rate)

### Session quality (from session_recap, last 24h)

- **Total session_recap events fired:** 123 (⚠️ only 36% coverage — see data quality section)
- **Avg session duration:** ~69 seconds (1 min 9 sec)
- **⚠️ Avg max scroll depth:** 43.9%
- **Avg sections viewed per session:** 3.81
- **⚠️ Sessions that reached contact section:** 41 (33.3% of session_recap pool)
- **Sessions that converted (contacted = true):** 0 in the last 24h
- **Avg voices tried per session:** 0.08 (near-zero; voice adoption is low)

**What this means:** Most visitors see about half the site in about a minute. They scroll fast (skimming, not reading), and most never reach the contact section. This validates the feedback that the site has too much text and doesn't convert fast enough.

### Top pages (last 24h)

| URL | Pageviews | Unique visitors |
| --- | --- | --- |
| upadhyaymanan.in/ (homepage) | 337 | 337 |
| upadhyaymanan.in/making-of | 9 | 9 |
| Homepage + Facebook tracking param | 1 | 1 |

**Actionable note:** `/making-of` is getting organic secondary traffic — 9 sessions voluntarily navigated there. This page is earning attention. But the feedback says it reinforces "AI slop" perception — so it's a high-priority rewrite target, not something to amplify in its current form.

### Traffic sources (last 24h)

| Source | Unique visitors | % |
| --- | --- | --- |
| Direct | 204 | 59% |
| Reddit (desktop www.reddit.com) | 73 | 21% |
| Reddit (mobile app com.reddit.frontpage) | 58 | 17% |
| Facebook (l.facebook.com) | 2 | <1% |
| LinkedIn (www.linkedin.com) | 2 | <1% |
| Google (organic) | 1 | <1% |
| GitHub | 1 | <1% |

**Critical insight:** Reddit is the #1 referral source at ~131 visitors combined (38% of all traffic with a known referrer). The site went viral on Reddit. This is a huge but temporary acquisition lever. **The "Direct" category at 204 visitors likely includes many Reddit users whose referrer was stripped** (Reddit mobile app, privacy extensions, etc.) — actual Reddit traffic may be 50%+ of all visitors.

⚠️ **Google organic traffic: 1 visitor.** SEO is currently zero. This is expected for a beta launch but must be addressed for sustainable traffic.

### Geography (last 24h)

| Country | Unique visitors | % |
| --- | --- | --- |
| United States | 130 | 38% |
| India | 39 | 11% |
| United Kingdom | 26 | 8% |
| Canada | 14 | 4% |
| Germany | 11 | 3% |
| Vietnam | 11 | 3% |
| France | 10 | 3% |
| Netherlands | 7 | 2% |
| Australia | 7 | 2% |
| 20+ other countries | ~88 | 26% |

**Actionable note:** Strong US dominance (38%) is ideal for senior-role hiring intent (US remote roles pay the most). India at 11% is notable for freelance/collaboration inquiries. Surprisingly diverse tail — 20+ countries with visitors.

### Devices & browsers (last 24h)

**⚠️ DATA QUALITY WARNING:** ~90% of sessions show null for device_os and device_browser. This is a tracking instrumentation bug (see Section 7). All device data below is from the ~10% with valid properties.

**OS breakdown** (identified sessions only):

| OS | Visitors | % of identified |
|---|---:|---:|
| macOS | 16 | 42% |
| Windows | 11 | 29% |
| Android | 9 | 24% |
| Linux | 2 | 5% |

**Browser breakdown** (identified sessions only):

| Browser | Visitors | % of identified |
|---|---:|---:|
| Firefox | 20 | 53% |
| Chrome | 16 | 42% |
| Safari | 1 | 3% |
| Edge | 1 | 3% |

**Insight:** Firefox leading Chrome skews toward developer/power-user audience (Reddit traffic). macOS at 42% is consistent with tech/design audience. Android at 24% of identified — the mobile segment is real and non-trivial.

**What to fix:** Fix super property registration order before next beta — this data gap makes device-specific analysis nearly impossible.

---

## SECTION 2 — Acquisition & first impression (last 30 days)

### Visitor volume trend

Traffic only started meaningfully on June 29 (12 visitors), spiked to 213 on June 30, and 133 on July 1 (partial day). The site is brand new or was just shared. **All meaningful analytics data is from the last ~2–3 days**, despite a 30-day window.

### New vs. returning

- Jun 30: 14 new, 6 returning
- Jul 1: 16 new, 2 returning
- Returning visitors exist — people are coming back, which is a strong signal for a portfolio.

### ⚠️ Hero performance (the leverage point)

The hero is where most of the conversion work happens — a standard CRO principle, and the behavior data confirms it here:

**Hero CTA split (30d):**

| CTA | Clicks | % |
|---|---:|---:|
| "About" (scroll to about section) | 32 | 64% |
| "Contact" (scroll to contact) | 18 | 36% |

**Hero → About dropoff:** 16% of visitors leave before reaching About — the single biggest section-to-section loss.

**Interpretation:**
- 64% of CTA users are curious explorers → the hero hook isn't converting curiosity into hiring intent
- 36% arrive ready to contact → but then face the 78% form abandonment problem
- The 16% Origin→About drop means the hero fails to compel ~55 visitors to even scroll down
- **Current hero CTAs ("Begin the Chronicle" / "Summon me →") tell the visitor nothing about professional value**

**What to fix:** Rewrite hero hook, CTAs, and add a proof strip. This is the single highest-ROI change.

### Avg scroll depth (bounce proxy)

- **41.79%** ⚠️ — visitors scroll roughly halfway down on average. More than half the page (contact, projects, etc.) is not being seen by the average visitor. This is the single most important number to improve.

### First-touch engagement (30d)

| Engagement | Unique sessions | % of all visitors |
|---|---:|---:|
| Sound first played | 309 | 86% |
| Astrolabe dragged | 97 | 27% |
| Astrolabe spun | 51 | 14% |

**Actionable note:** Sound is the #1 first-touch engagement moment by a massive margin. The astrolabe is engaged by a smaller but meaningful portion. These two elements are the hero's real interactive hooks — but neither does conversion work.

**What to fix:** The hero's interactive elements (astrolabe, sound) are engagement-positive but conversion-neutral. The hero needs professional content that converts alongside the interactive elements.

---

## SECTION 3 — Engagement & discovery (last 30 days)

### ⚠️ Section heatmap (unique sessions that viewed each section)

| Section | Unique sessions | % of hero viewers | Drop from previous |
| --- | ---: | ---: | ---: |
| origin (hero) | 355 | 100% | — |
| about | 299 | 84% | **-16%** ⚠️ biggest single drop |
| work | 247 | 70% | -14% |
| arsenal | 189 | 53% | -17% |
| projects | 177 | 50% | -3% (arsenal→projects is low-friction) |
| contact | 132 | 37% | -13% |

**The critical funnel:**
- 355 see the hero
- 177 see projects (50%) — half your visitors never see your work
- 132 see contact (37%) — nearly two-thirds never see how to reach you
- 9 start the form (2.5%)
- 2 submit (0.56%)

**Each section loses ~13–17% of remaining visitors.** The biggest single drop is Origin → About (16 percentage points). This is where the hero needs to do more work.

**What to fix:** 
1. Make the hero retain more visitors (better hook, clearer value)
2. Move projects earlier or make them reachable from the hero (currently section 5 of 6)
3. Add floating/sticky contact CTA so it's accessible without reaching the bottom

### Scroll depth funnel (30d, n=240 who hit 25%)

| Milestone | Visitors | Cumulative rate | ⚠️ Median time to reach |
| --- | ---: | ---: | ---: |
| 25% scroll | 240 | 100% (base) | 7s |
| 50% scroll | 180 | 75% | 10s |
| 75% scroll | 139 | 58% | 11s |
| 100% scroll | 94 | 39% | — |

**Critical insight:** Median time from 25% to 75% is only 4 seconds (10s - 7s + 11s - 10s). Users are SCROLLING FAST — skimming, not reading. The content density is not matching user behavior. They're racing through copy-heavy sections.

39% of visitors who scrolled at all made it to the bottom. This is respectably high for a long single-page portfolio — but those who don't scroll far enough never see projects or contact.

### ⚠️ Discovery funnel (30d) — deep features are invisible

| Step | Users | Conversion from previous |
| --- | ---: | ---: |
| Landed on site | 358 | — |
| Spun the astrolabe | 51 | 14.25% |
| Opened the Voice Hall | 4 | 7.8% of spinners |
| Reached the Atelier | 0 | **0%** ⚠️ |

**Critical finding:** The Atelier has **ZERO** funnel reach. Voice Hall has only 4 visitors (1.12% of all). The path to discovery (astrolabe → Voice Hall → Atelier) is fundamentally broken. Users DO visit the Atelier (11 direct visits), but through non-funnel paths (direct URL, map navigation).

**What to fix:** Don't fix the discovery funnel — it's a P2 problem. Fix conversion first. The discovery path is a nice-to-have for explorers, not a conversion mechanism.

### Deep feature adoption (30d, unique sessions)

| Feature | Unique sessions |
| --- | ---: |
| Expedition reached | 106 |
| Carousel opened | 40 |
| Arsenal explored | 32 |
| Works show all | 7 |
| Build reel scrubbed | 7 |
| Atelier visited | 11 |
| Persona card expanded | 3 |

**What to fix:** Expedition (106) and carousel (40) are well-positioned in the scroll path and work. Build reel (7) and persona card (3) are almost invisible — either add interaction hints or simplify.

### Navigation style (30d)

| Method | Events | Interpretation |
|---|---:|---|
| Map opened | 55 | Most-used navigation tool |
| Map jumps (teleport) | 23 | Actively used for real navigation |
| Rail nav clicks | 14 | Least used — consider removing or redesigning |

**What to fix:** The map works and users like it. The rail is nearly unused — either make it more prominent or remove it to reduce visual clutter. This choice affects visual congestion.

### Arsenal depth

- **Avg tools hovered per session:** 1.03 — visitors who reach the arsenal barely explore it. They hover on 1 tool on average.

**What to fix:** The arsenal "orbital" interaction may be beautiful but isn't inviting exploration. Consider a simpler grouped-list approach with clear categories.

### Project interest (30d)

| Project | Link clicks | Link type |
| --- | ---: | --- |
| Gajaakriti Studio | 9 | Live demo |
| Royal Tiles Playground | 3 | Live demo |
| All other projects | 0 | — |

**Only 12 project clicks from ~350 visitors.** No source/GitHub links clicked. Visitors want to see live projects, not read code.

**What to fix:**
1. Put Gajaakriti Studio first (3x more interest)
2. Add screenshots to project cards (zero images currently)
3. Make live demo CTAs more prominent
4. Consider showing only 3 featured projects by default instead of all 8

---

## SECTION 4 — Voice & personalization (last 30 days)

### Voice discovery funnel (30d)

| Step | Users | Conversion |
| --- | ---: | ---: |
| Opened voice switcher | 33 | 9.2% of all visitors |
| Selected a voice | 13 | 39.4% of openers |
| Entered the Voice Hall | 2 | 6.06% of openers |

⚠️ Only 33 of 358 visitors (9.2%) even opened the voice switcher. The Voice Hall was reached by only 2 people total.

**Comparison:** Theme switcher gets 309 interactions. Voice switcher gets 33. **The theme control is 9x more discoverable.** They use the same visual pattern — why the gap?

Likely reasons:
- Theme switching has immediate, visible impact (entire page changes color)
- Voice switching requires reading to notice the change
- Theme is top-right (primary attention zone); voice is bottom-right
- Voice concept is unfamiliar — users don't know what "voice" means in this context

### Voice popularity (30d, total selections)

| Voice | Selections |
| --- | --- |
| plain | 11 |
| chronicle | 6 |
| scott | 4 |
| cow | 2 |
| dwight | 2 |

**"Plain" wins** — visitors fall back to the neutral voice most. This validates the feedback: users prefer direct, professional copy.

### Voices tried per session (30d)

- 0 voices: 123 sessions (94.6%)
- 1 voice: 5 sessions (3.8%)
- 2 voices: 3 sessions (2.3%)
- **Avg voices tried per session: 0.084**

The voice system is deeply underutilized. 95% of sessions never try a single voice. The system is loved by the tiny fraction who find it, but the discovery path is too hidden.

**What to fix:** P2 priority. Don't invest in voice discoverability until core conversion is fixed. But note that "plain" being #1 validates the copy rewrite direction.

### Easter egg unlocks (30d)

- cow: 2 | scott: 2 | dwight: 1 — total 5 easter egg unlocks across all sessions

### Sound engagement (30d)

| Metric | Value |
|---|---:|
| Heard the site | 309 sessions |
| Muted it | 16 sessions |
| **Mute rate** | **5.2%** |

**Excellent** — 94.8% of visitors who triggered sound kept it on. Sound is additive, not annoying. **Preserve sound as-is.**

### Theme preferences (30d, sky changes)

| Theme | Changes |
| --- | --- |
| night | 99 |
| day | 91 |
| dusk | 64 |
| dawn | 55 |

Total 309 theme switches. Night and day nearly tied. All four themes are being explored. **Theme switching is the most-used interactive feature on the entire site.** This proves the UI pattern for discoverability — use it as a model for other controls.

**What to fix:** Nothing — theme switching works. Consider making Night the default (slightly more popular).

---

## SECTION 5 — Conversion & revenue intent (last 30 days)

### ⚠️ Master hiring funnel (30d)

| Step | Users | Overall rate | Step conversion |
| --- | ---: | ---: | ---: |
| Landed on site | 358 | 100% | — |
| Reached contact section | 131 | 36.6% | 36.6% |
| Started the form | 9 | 2.51% | 6.9% of contact reachers |
| Submitted the form | 2 | 0.56% | 22% of starters |
| Sent successfully | 2 | 0.56% | 100% of submits |

**This is the most important data in the entire report.**

**Key gaps:**

1. **⚠️ Reach → Start gap:** 131 reached contact, only 9 started the form (**6.9%** of those who saw it). The contact section is not compelling enough to prompt action. The CTA copy ("Dispatch the Raven"), themed form language, and surrounding visual complexity likely create friction.

2. **⚠️ Start → Submit gap:** 9 started, 2 submitted (**22%**). 7 people abandoned mid-form. This is the #1 form UX problem — likely too many fields, intimidating copy, or anxiety at the commitment point. The themed error messages ("The raven refuses to fly with an empty scroll") add cognitive load during a frustration moment.

3. **Submit → Success: 100%** (2/2) — the form backend is healthy, no technical issues.

### Leads over time

- Jun 29: 1 lead | Jun 30: 0 | Jul 1: 1 lead (in progress)
- **Total leads in 30-day window: 2**
- Both leads are "Senior role" inquiry type — the site IS attracting the right audience

### Form abandonment funnel

- Started: 9 → Submitted: 2 (22%) → Succeeded: 2 (22%)
- **⚠️ 78% abandonment rate from start to submit** — this is critically high

### Form errors

- **Zero form errors recorded** — the form backend is healthy; all submission failures are behavioral, not technical.

### Soft intent signals (30d)

| Signal | Count |
| --- | --- |
| Channel clicked (any) | 8 unique sessions |
| Résumé opened | 4 unique sessions |
| Email copied | 2 unique sessions |

Total soft intent signals: 14 unique sessions showed strong pre-contact intent. Combined with 2 actual conversions = **14 potential leads who showed interest but didn't convert.** These people are qualified — the friction at the form is losing warm leads.

### Channel breakdown (30d)

| Channel | Clicks |
|---|---:|
| GitHub | 5 |
| LinkedIn | 3 |

GitHub is the preferred channel. No other channels (email, Twitter/X, etc.) recorded.

### ⚠️ Conversion by device (30d)

| OS | Landed | Reached contact | Form starts | Sent |
| --- | ---: | ---: | ---: | ---: |
| macOS | 81 | 79 (97.5%) | 8 (9.9%) | 1 (1.23%) |
| Android | 36 | 28 (77.8%) | 1 (2.78%) | 1 (2.78%) |
| **Windows** | **26** | **21 (80.8%)** | **0** ⚠️ | **0** |
| Linux | 4 | 3 (75%) | 0 | 0 |

**⚠️ CRITICAL BUG:** Windows users reached contact at 80.8% but had ZERO form starts. 21 Windows users saw the contact section and none of them even clicked into a form field. This is almost certainly a rendering/UX bug (z-index, pointer-events, scroll container interference, or custom cursor blocking clicks on Windows Chrome/Edge).

**macOS** has the best contact reach (97.5%) but modest conversion (1.23%).

**Android** has the highest conversion rate (2.78%) — mobile CAN convert. This is important: don't treat mobile as a dead channel.

**What to fix:**
1. Investigate and fix Windows Chrome/Edge contact form interaction (P0)
2. Simplify form copy for all platforms
3. Ensure mobile form has proper autofill and tap targets

---

## SECTION 6 — Session quality & technical health (last 30 days)

### Session depth KPIs

| Metric | Value | Health |
|---|---:|---|
| Avg time on site | 65.66s | ⚠️ Low for content-heavy site |
| Avg max scroll % | 41.79% | ⚠️ Majority don't see bottom half |
| Avg voices tried | 0.084 | Voice system nearly invisible |
| Avg sections viewed | ~3.8 | About half the journey |

### Sections viewed per session distribution (30d)

| Sections viewed | Sessions | Interpretation |
| --- | ---: | --- |
| 6 (all sections) | 39 | Deep engagers — top ~30% |
| 5 | 22 | Near-complete viewers |
| 3 | 22 | Partial viewers (typical) |
| 2 | 18 | Quick scanners |
| 1 | 22 | **Bounces** |
| 0 | 4 | Instant bounces |
| 4 | 4 | — |

**Bimodal distribution:** Two clear visitor types:
1. **Committed explorers** (39 sessions, 6 sections) — these are the conversion candidates
2. **Fast bouncers** (22 sessions, 1 section) — lost at the hero

**What to fix:** Convert some of the "1 section" bouncers into "3+ section" viewers by improving the hero hook and scroll incentive.

### Time on site distribution (30d)

Highly spread — most values in the 1–76 second range. The 12–23 second band dominates, suggesting many visitors spend just enough time to get a first impression before leaving.

**What this means:** The hero has about 10-15 seconds to convince a visitor to stay. Currently, many leave in that window.

### Power users — keyboard shortcuts (30d)

| Shortcut | Users |
|---|---:|
| cmd+k (map) | 1 |
| shift+cmd+v (Voice Hall) | 1 |

2 power users found keyboard shortcuts. Both are almost certainly developers. These are high-value visitors — but the feature is essentially invisible.

---

## SECTION 7 — ⚠️ Data quality issues & instrumentation gaps

These MUST be fixed before the next beta. Without reliable data, we can't measure whether our changes worked.

### 1. Super property null rate (~90%) — P0

**Problem:** device_os, device_browser, and other custom super properties are null for ~309/343 visitors.

**Root cause:** Super properties are registered after the first $pageview fires. PostHog auto-captures $pageview before `posthog.register()` runs.

**Fix:** Call `posthog.register()` synchronously before any event capture. If autocapture/pageview fires before registration, disable automatic pageview and manually capture after registration.

**Code path:**
```
src/lib/analytics.js — move posthog.register() before posthog.init() or disable auto pageview
```

### 2. Atelier funnel shows 0 despite 11 visits

**Problem:** The sequential funnel (pageview → astrolabe → voice hall → atelier) shows 0 completions because no one completed the exact sequential path. Users visit the Atelier via direct link or map navigation.

**Interpretation:** The designed discovery path is broken. The Atelier IS getting visits (11) through alternative paths. This is a P2 design issue, not a tracking issue.

### 3. Session recap coverage: 36%

**Problem:** Only 123 session_recap events vs 343 pageviews. Recap fires on page-leave; some visitors close abruptly (mobile tab close, rapid bounce).

**Fix:** Add heartbeat events at 15s/30s/60s to capture data from short sessions. Add `visibilitychange` event. Keep page-leave recap but supplement it.

### 4. Windows 0% form starts despite 81% contact reach

**Problem:** Anomalous and almost certainly a rendering/UX bug.

**Fix:** Test contact section specifically on Windows Chrome and Edge. Check:
- Input field focus/click events
- z-index stacking
- pointer-events on overlapping elements  
- Custom cursor interference
- Scroll container trapping focus

### 5. `/making-of` tracking

**Problem:** Only pageview tracking, no scroll depth or custom events.

**Fix:** Add section_view, scroll_depth, and CTA click tracking to the Atelier page.

### 6. No performance metrics tracked

**Problem:** A user reported performance degradation over time (M1 MacBook Pro with 4K display). We have no data to validate or diagnose this.

**Fix:** Add performance monitoring:
- Long task observer
- Memory usage sampling (if available)
- Frame rate drops
- Or simply use Vercel Speed Insights more aggressively

---

## SECTION 8 — Actionable prioritization for site improvements

### P0 — Immediate (conversion critical)

| # | Action | Data evidence | Expected impact |
|---:|---|---|---|
| 1 | **Optimize hero for conversion** | 16% Origin→About drop (biggest single funnel leak); hero CTAs don't communicate value | Highest ROI change — better hook/CTA/action path will improve scroll depth, section reach, and downstream conversion |
| 2 | **Fix form abandonment (78% drop)** | 9 people start, 7 leave. Contact reach→form start is only 6.9% | Direct revenue impact — reducing to 40% abandonment doubles leads |
| 3 | **Fix Windows contact section bug** | 21 Windows users reached contact, 0 started the form | Recovers ~6-8% of all visitors from a total conversion blackout |
| 4 | **Fix super property registration** | ~90% null device properties | Required for data-driven iteration in next beta |
| 5 | **Add session heartbeat tracking** | 36% recap coverage misses short sessions | Required for reliable session quality measurement |

### P1 — High impact (trust & engagement)

| # | Action | Data evidence | Expected impact |
|---:|---|---|---|
| 1 | **Cut visible copy by 50-70%** | Scroll milestones reached in 7-11s (fast skimming); avg scroll 41.8% | Will improve scroll depth and section reach |
| 2 | **Add project screenshots** | Only 12 project clicks from 350 visitors; zero images in current portfolio | Addresses the #1 "AI perception" issue alongside copy rewrite |
| 3 | **Improve voice switcher discoverability** | Theme: 309 events vs Voice: 33 events (9x gap) | Align discovery pattern with theme switcher model |
| 4 | **Rewrite `/making-of` as case study** | 9 visits in 24h but negative perception feedback | Convert curiosity into credibility |
| 5 | **Move projects earlier** | Projects section at 50% reach; Gajaakriti 9 clicks vs Royal Tiles 3 | More visitors see proof before bouncing |

### P2 — Medium term (depth & personalization)

| # | Action | Data evidence |
|---:|---|---|
| 1 | **Fix discovery funnel** | Voice Hall: 4 users; Atelier funnel: 0 |
| 2 | **Reorder projects by interest** | Gajaakriti 3x more clicked than Royal Tiles |
| 3 | **Improve arsenal interaction** | Avg 1.03 tools hovered — barely explored |
| 4 | **Consider removing or redesigning rail nav** | Only 14 clicks vs map's 55 opens |
| 5 | **Night theme as default** | Night 99 vs day 91 changes |

### P3 — Optimization

| # | Action | Data evidence |
|---:|---|---|
| 1 | **Easter egg discoverability hints** | Only 5 total unlocks |
| 2 | **Mobile-specific sticky CTA** | Android converts at 2.78% — mobile is viable |
| 3 | **Floating CTA after engagement** | Contact reach only 37% — surface contact for deep scrollers |

---

## SECTION 9 — North-star metrics for next beta

These are the measurable targets for the next testing round, based on current baselines and reasonable improvement goals.

| Metric | Current baseline | Next beta target | Measurement |
|---|---:|---:|---|
| Avg max scroll | 41.8% | 50–55% | session_recap |
| Contact section reach | 36.6% | 45–55% | section_view_contact |
| Hero → About retention | 84% | 90%+ | section heatmap |
| Projects section reach | 50% | 60%+ | section_view_projects |
| Form start rate overall | 2.51% | 5–8% | contact_form_start |
| Form start among contact reachers | 6.9% | 12–20% | funnel analysis |
| Form submit among starters | 22% | 50–70% | contact_form_submit |
| Form abandonment | 78% | <40% | funnel analysis |
| Overall lead conversion | 0.56% | 1.0–2.0% | contact_success |
| Resume opens | 4 sessions | 15–25 per 350 users | resume_open |
| GitHub/LinkedIn clicks | 8 total | 20+ total | channel_open |
| Device/browser null rate | ~90% | <5% | super property audit |
| Session recap coverage | ~36% | 60%+ | heartbeat events |
| Windows form starts | 0 | >0, comparable to macOS | platform QA |
| "AI/slop" comments | Very frequent | Rare/minority | qualitative |
| "Confusing" comments | Frequent | Rare/minority | qualitative |

---

## Summary numbers for quick reference

| Metric | Last 24h | Last 30 days |
| --- | ---: | ---: |
| Unique visitors | 343 | ~358 (concentrated Jun 29–Jul 1) |
| Sessions | 343 | ~358 |
| Avg session duration | 69s | 65.7s |
| Avg max scroll | 43.9% | 41.8% |
| Avg sections viewed | 3.81 | ~3.8 |
| Contact section reach | 33% | 36.6% |
| Form starts | — | 9 (2.51%) |
| Leads (contact_success) | 0 | 2 (0.56%) |
| Form abandonment | — | 78% |
| Form errors | 0 | 0 |
| Sound engagement | — | 309 heard, 16 muted |
| Theme switches | — | 309 total |
| Voice switcher opens | — | 33 |
| Voice selections | — | 25 total |
| Easter egg unlocks | — | 5 total |
| Reddit traffic share | 38% | — |
| Top inquiry type | — | Senior role (100%) |
| Keyboard shortcut users | — | 2 (power devs) |
| **Windows form starts** | — | **0** ⚠️ |
| **Project clicks** | — | **12 total** |
| **Gajaakriti vs Royal Tiles** | — | **9 vs 3** |
