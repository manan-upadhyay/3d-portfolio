# Copy — Value vs. Noise Audit (2026-07-09)

> The formal copy pass that V1.1 §10.2 left open ("no formal per-section budget
> audit"). Per the owner's brief it does **not** enforce hard word budgets — the
> test for every visible string is the site's actual goal: *a cinematic
> masterpiece that shows how Manan builds and thinks, makes people want to hire
> or contact him, and never tires them, never reads junior-gimmick, never reads
> AI-generated. Every piece of content must add value, never noise.*
>
> Scope: the two default voices (`chronicle` base + `plain` overrides) — the
> registers a real evaluator reads. Sealed voices are audited separately for
> *character strength*, not restraint (WONDER-AUDIT V3 — they exist to wow).

---

## 1. Verdict up front

**The copy layer passes.** Two earlier passes (v1.1 cut ~50%+ and de-fantasy'd
the professional path; v2.0 rebuilt Works proof-first and trimmed the making-of
hard) did the heavy lifting, and the value test now holds section by section:
every fantasy flourish left in `chronicle` either carries a real fact inside it
or has a `[[marginalia]]` footnote that surrenders the literal truth — and
`plain` overrides every single flavored term on the professional path
("Summon me" → "Contact me", "Enter the realm" → "View project", "Realm" →
"Project"). **No cuts are required in this pass.** What it did surface was
dead copy (pruned, §4) and a short watch-list (§3).

## 2. Per-section reading (chronicle, with the plain override noted)

| Section | Read | Verdict |
|---|---|---|
| **Hero** | "I build …" + 4 concrete rotating claims + one proof line + 3 action CTAs. Zero adjectives, zero fantasy. | ✅ Value-dense. This is the 10-second answer. |
| **About** | Pull-quote is a *fact* (5 yrs · 20+ releases · 6 industries · production), intro is two sentences with an end-to-end footnote, disciplines are stack-literal. | ✅ The one metaphor budget is spent on "details users feel but never see" — earns it. |
| **Experience** | Chapter names carry flavor; role/org/points are pure proof (16–20 hrs/wk saved, 38% load cut, 4 releases, EoM). The law credential reads at a glance. | ✅ Flavor on the frame, facts in the cards — the right split. "Summon me" CTA is plain-overridden ("Contact me"). |
| **Arsenal** | One subtitle + one legend line ("the brighter the body, the deeper the mastery"). | ✅ Minimal, and the legend does real explanatory work. |
| **Works** | Leads are one-line *hooks with substance* ("galleries made to load like a film — not a folder"); highlights are concrete (TensorFlow.js SVG tool, Cloudflare R2, Okta/Auth.js, 99% txn reliability). NDA note footnoted. Controls stay literal ("Show N more projects"). | ✅ The strongest copy on the site. |
| **Contact** | "Open to senior full-stack roles", literal form, "I read every message myself.", friendly errors, "no form required" escape hatch. | ✅ Calm and human — the conversion zone is the *least* themed surface, as it should be. |
| **Footer / StickyCta** | "Let's build something." / "Seen enough?" | ✅ Short, confident. |
| **Map / Hall / controls** | Now terminology-unified on **Narrator** (this pass); Hall explainer says plainly "Just for fun." | ✅ Self-aware framing prevents the gimmick read. |
| **Making-of** | Cold open "minus the mystique"; ledger copy is the senior thesis ("knowing what to leave out"); commit caption owns the sprint window honestly; manifesto cut to one human paragraph. | ✅ Case-study register achieved without losing the voice. |
| **Recap (Atelier)** | Privacy copy is honest and *prominent* ("shown here, kept nowhere", the ⓘ "how?"). Themed labels (Lantern/Road/Carrier) are playful-opaque — acceptable on the coda, values shown alongside. | ✅ Right page for it now. |

## 3. Watch-list (no action now — re-test with Beta-2 reactions)

1. **`chronicle` chapter frames in Experience** ("The Vanguard", "The Long
   Expedition") — the last place a skeptic could still smell costume. Held in
   check by plain-literal cards beneath; if Beta 2 resurfaces "AI/fantasy"
   comments, this is the first candidate.
2. **Recap instrument labels** (Lantern/Road/Carrier/Vessel) — charming to the
   engaged, opaque to the literal-minded; fine on the coda, don't port anywhere.
3. **Rotating hero phrases** — owner decision to keep; watch whether Beta 2
   testers quote-back a claim (good sign) or the motion (bad sign).

## 4. Dead copy pruned in this pass (2026-07-09 sweep)

- `atelier.eggs.{spin,sound,map}` — cut eggs' voiced copy, all 10 bundles.
- `atelier.observatory.metrics.{superProps,webhooks}` — trimmed metrics' labels, all bundles that carried them.
- `about.stats.years` — orphaned when the hero took ownership of the years figure (9 bundles).
- `atelier.commits.stats.{days,busiest}` + `commits.busyUnit` — orphaned by the Act-I stat trim (chronicle + plain).
- Legacy template CSS with zero consumers (`.glass-card`, `.black-gradient`, `.violet-gradient`, 5 text-gradients, `.glow`, `.glow-text`, `--shadow-glow`).

All bundles parse and the build is clean after the sweep.
