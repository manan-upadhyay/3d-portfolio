# Reports — analytics & beta feedback

Time-ranged, dated research on the Chronicle portfolio. Unlike the rest of
`docs/chronicle/` (which is evergreen source-of-truth for architecture, design,
and sections), everything here is a **point-in-time snapshot**. New reports
arrive over time — never overwrite an old one; add a new dated file alongside it.

## Layout

| Folder | Holds |
|---|---|
| `analytics/` | Quantitative reports — PostHog dashboards, web-analytics snapshots, product metrics |
| `analytics/exports/` | Raw source exports the reports were built from (PostHog `.ph-notebook.json`, CSVs). Kept out of `public/` so they are never deployed/served. |
| `feedback/` | Qualitative reports — beta-tester feedback, survey/comment syntheses |
| `synthesis/` | Combined, decision-oriented docs that merge analytics **and** feedback into a truth document / action plan. The actionable layer above the raw inputs. |
| `audit/` | Dated coverage/quality audits — section-by-section UX, persona walkthroughs, and analytics-instrumentation coverage. |

## Naming convention

Every file is prefixed with its data-window **start date** so the folder sorts
chronologically:

```
YYYY-MM-DD-<slug>.md
YYYY-MM-DD-<slug>.ph-notebook.json
```

Use the date the data covers (or the report's "as of" date), not the day you
happened to file it. For a multi-day window, use the first day and note the full
range inside the document header.

## Index

### Analytics
- [2026-07-01 — Full analytics intelligence report](analytics/2026-07-01-full-analytics-intelligence-report.md)
  · source: [PostHog notebook](analytics/exports/2026-07-01-posthog-notebook.ph-notebook.json)

### Feedback
- [2026-07-01 — Reddit beta feedback (truth document)](feedback/2026-07-01-reddit-beta-feedback.md)

### Synthesis
- [2026-07-01 — Combined beta action plan](synthesis/2026-07-01-combined-beta-action-plan.md)
  · merges the analytics report + Reddit feedback into a prioritized roadmap

### Audit
- [2026-07-03 — Section-by-section UX audit](audit/2026-07-03-section-by-section-ux-audit.md)
- [2026-07-05 — Persona walkthrough audit](audit/2026-07-05-persona-walkthrough-audit.md)
- [2026-07-06 — Post-v1 analytics coverage audit](audit/2026-07-06-post-v1-analytics-coverage-audit.md)
  · every post-v1 feature/voice/interaction/mobile surface vs its telemetry; 6 gaps fixed

## Adding a report

1. Drop the file in `analytics/` or `feedback/` with a `YYYY-MM-DD-` prefix.
2. Put any raw export it was derived from in `analytics/exports/` — **not** in
   `public/`.
3. Add a line to the index above.
