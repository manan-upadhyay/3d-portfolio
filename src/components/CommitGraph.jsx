import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { commitHistory } from '../constants/commitHistory';

// COMMIT GRAPH — a GitHub-style contribution heatmap drawn from THIS repo's own
// git history (see src/constants/commitHistory.js). It replaces the old build
// reel: the Making-Of page is the making of this page, so the most honest visual
// is the literal commit trail — one square per day, coloured by how many commits
// landed. Cinematic but simple: instantly recognisable, and every square is real.

const DAY = 86400000;
const WEEKS = 53; // classic "past year" window, ending at the most recent commit
const iso = (d) => d.toISOString().slice(0, 10);

// Commit-count → intensity bucket (0 = none … 4 = busiest).
const levelFor = (c) => (c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Build the trailing-year grid: columns of weeks (Sun→Sat), each 7 day cells.
function buildGrid(days, endStr) {
  const end = new Date(`${endStr}T00:00:00Z`);
  const gridEnd = new Date(end.getTime() + (6 - end.getUTCDay()) * DAY); // pad to Saturday
  const gridStart = new Date(gridEnd.getTime() - (WEEKS * 7 - 1) * DAY);
  const columns = [];
  const monthLabels = [];
  let cur = new Date(gridStart);
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const ds = iso(cur);
      const count = days[ds] || 0;
      const future = cur.getTime() > end.getTime();
      col.push({ date: ds, count, level: future ? -1 : levelFor(count) });
      if (d === 0) {
        const m = cur.getUTCMonth();
        // Label a column with its month the first week that month appears.
        if (m !== lastMonth) { monthLabels.push({ col: w, label: MONTHS[m] }); lastMonth = m; }
      }
      cur = new Date(cur.getTime() + DAY);
    }
    columns.push(col);
  }
  return { columns, monthLabels };
}

const fmtDate = (ds) => {
  const d = new Date(`${ds}T00:00:00Z`);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

const CommitGraph = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(null); // { date, count, x, y }

  const { columns, monthLabels } = useMemo(() => buildGrid(commitHistory.days, commitHistory.last), []);

  // One-time reveal when the grid scrolls into view (CSS keyframe per column).
  useEffect(() => {
    if (reduce) { setInView(true); return undefined; }
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const stats = [
    { key: 'commits', value: commitHistory.total },
    { key: 'days', value: commitHistory.activeDays },
    { key: 'busiest', value: t('atelier.commits.busyUnit', { count: commitHistory.busiest.count }) },
    { key: 'streak', value: t('atelier.commits.streakUnit', { count: commitHistory.longestStreak }) },
  ];

  return (
    <div ref={rootRef} className="commit-graph">
      <div className="commit-graph__scroll" data-lenis-prevent>
        <div className={`commit-graph__grid ${inView ? 'is-in' : ''}`} role="img" aria-label={t('atelier.commits.aria')}>
          {/* month labels */}
          <div className="commit-graph__months" aria-hidden="true">
            {monthLabels.map((m) => (
              <span key={`${m.col}-${m.label}`} className="commit-graph__month" style={{ gridColumn: m.col + 1 }}>{m.label}</span>
            ))}
          </div>
          {/* week columns */}
          <div className="commit-graph__cols">
            {columns.map((col, ci) => (
              <div key={ci} className="commit-graph__col">
                {col.map((cell) => (
                  cell.level < 0 ? (
                    <span key={cell.date} className="commit-cell commit-cell--pad" aria-hidden="true" />
                  ) : (
                    <span
                      key={cell.date}
                      className={`commit-cell commit-cell--l${cell.level}`}
                      style={{ '--cell-delay': `${ci * 0.014}s` }}
                      onPointerEnter={(e) => cell.count > 0 && setHover({ date: cell.date, count: cell.count, x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop })}
                      onPointerLeave={() => setHover(null)}
                    />
                  )
                ))}
              </div>
            ))}
          </div>
        </div>

        {hover && (
          <span className="commit-graph__tip" style={{ left: hover.x, top: hover.y }} role="tooltip">
            <strong>{t('atelier.commits.tip', { count: hover.count })}</strong>
            <span>{fmtDate(hover.date)}</span>
          </span>
        )}
      </div>

      {/* legend */}
      <div className="commit-graph__legend" aria-hidden="true">
        <span>{t('atelier.commits.less')}</span>
        {[0, 1, 2, 3, 4].map((l) => <span key={l} className={`commit-cell commit-cell--l${l}`} />)}
        <span>{t('atelier.commits.more')}</span>
      </div>

      {/* stat readout */}
      <dl className="commit-graph__stats">
        {stats.map((s) => (
          <div key={s.key} className="commit-graph__stat">
            <dt className="commit-graph__stat-value">{s.value}</dt>
            <dd className="commit-graph__stat-label">{t(`atelier.commits.stats.${s.key}`)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default CommitGraph;
