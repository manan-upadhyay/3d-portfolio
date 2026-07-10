# docs/chronicle — Source of Truth

The canonical specification set for **The Chronicle** portfolio revamp. Start at
the repo-root [`CLAUDE.md`](../../CLAUDE.md), then read here. These supersede the
older `docs/*.md` (pre-revamp template).

## Read order
1. [`CLAUDE.md`](../../CLAUDE.md) — vision, canon, standards, workflow.
2. [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — tokens, type, motion language, utilities.
3. [ARCHITECTURE.md](ARCHITECTURE.md) — stack, patterns, shell, perf, verification.
4. [ASSETS.md](ASSETS.md) — world bible + generation prompts.
5. `sections/` — per-section specs (build order below).

## Sections (all built unless noted; this set is the spec of record)
| Order | Spec | Component | Status |
|---|---|---|---|
| 00 | [Origin / Hero](sections/00-hero.md) | `sections/Hero.jsx` | built (procedural starfield + astrolabe) |
| 01 | [The Craft](sections/01-the-craft.md) | `sections/About.jsx` | built |
| 02 | [The Journey](sections/02-the-journey.md) | `sections/Experience.jsx` | built (pinned horizontal) |
| 03 | [The Arsenal](sections/03-the-arsenal.md) | `sections/Tech.jsx` | built (orbital field) |
| 04 | [The Realms](sections/04-the-realms.md) | `sections/Works.jsx` | built (editorial plates) |
| 05 | [Summon](sections/05-summon.md) | `sections/Contact.jsx` | built (Resend contact) |
| 06 | [The Map](sections/06-map-overlay.md) | `components/MapOverlay.jsx` | built (⌘K map) |
| 07 | [The Atelier (revamp)](sections/07-the-atelier.md) | `sections/Atelier.jsx` + `components/Observatory.jsx` + `Blueprint.jsx` | **built (v2)** — acts + Observatory + Blueprint + webhooks |
| 08 | [The Codebase Atlas](sections/08-codebase-atlas.md) | `components/CodebaseAtlas.jsx` | **built** (Atelier Act II) |
| 09 | [Off the Map — 404](sections/09-off-the-map-404.md) | `pages/Void.jsx` | **built** (cinematic 404) |
| 10 | [The Threshold — Loading](sections/10-the-threshold-loading.md) | — | specced (pending greenlight) |
| 11 | [The Time Machine](sections/11-the-time-machine.md) | `sections/TimeMachine.jsx` + `pages/TimeMachine.jsx` | **built** (STRATA coda) |

## Current cycle: v1.1 ("The Restraint Pass")
v1.0 has shipped; v1.1 is a major revamp driven by the Beta-1 data. Start at the
[V1.1 Release Plan](V1.1-RELEASE-PLAN.md) (goal, prioritized issues, workstreams,
ROI, success metrics), then the [combined action plan](reports/synthesis/2026-07-01-combined-beta-action-plan.md)
for file-level detail. ARCHITECTURE and DESIGN-SYSTEM each carry a `§0 v1.1
addendum` for their domain.

## Reports (dated snapshots)
Time-ranged analytics + beta feedback live under [`reports/`](reports/) — see its
[README](reports/README.md) for layout and naming. These are point-in-time
snapshots, not evergreen canon; new ones are added dated, never overwritten. They
are the **evidence base** for the v1.1 plan.

Each section spec ends with **Acceptance criteria** — a section is done only when
all boxes pass in dark+light, at 360/768/1280/1920, with reduced-motion + touch
fallbacks, no console errors, and a clean `npm run build`.
