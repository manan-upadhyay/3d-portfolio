import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { commitHistory } from '../constants/commitHistory';

// COMMIT GRAPH — the real git history of THIS repo, framed to the build window
// (v2.0 W5). The old 53-week calendar told the wrong story: a portfolio built in
// one intense burst rendered as a sparse, empty year. Cropping to the actual
// window (`commitHistory.windowStart` → `last`) is honest AND dense — every
// visible square is a real day of shipping, drawn large as a day strip. The
// strip starts scrolled to the latest day on narrow screens. Faking the data
// was refused outright: the public repo sits one click away.

const DAY = 86400000;
const iso = (d) => d.toISOString().slice(0, 10);

// Commit-count → intensity bucket (0 = none … 4 = busiest).
const levelFor = (c) => (c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// The build window, day by day, oldest → newest, with month-change markers and
// the window's own stats (commits, active days, busiest, streak).
function buildWindow(days, startStr, endStr) {
  const start = new Date(`${startStr}T00:00:00Z`);
  const end = new Date(`${endStr}T00:00:00Z`);
  const cells = [];
  let total = 0;
  let active = 0;
  let busiest = { date: startStr, count: 0 };
  let streak = 0;
  let bestStreak = 0;
  let lastMonth = -1;
  for (let t = start.getTime(); t <= end.getTime(); t += DAY) {
    const d = new Date(t);
    const ds = iso(d);
    const count = days[ds] || 0;
    const m = d.getUTCMonth();
    cells.push({
      date: ds,
      day: d.getUTCDate(),
      count,
      level: levelFor(count),
      month: m !== lastMonth ? MONTHS[m] : null,
    });
    lastMonth = m;
    total += count;
    if (count > 0) {
      active += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      if (count > busiest.count) busiest = { date: ds, count };
    } else {
      streak = 0;
    }
  }
  return { cells, total, active, busiest, bestStreak };
}

const fmtDate = (ds) => {
  const d = new Date(`${ds}T00:00:00Z`);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

const CommitGraph = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const scrollRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(null); // { date, count, x, y }

  const { cells, total, active, busiest, bestStreak } = useMemo(
    () => buildWindow(commitHistory.days, commitHistory.windowStart, commitHistory.last),
    [],
  );

  // One-time reveal when the strip scrolls into view (CSS keyframe per cell).
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

  // Land on the LATEST days when the strip overflows (v2.0: mobile opened on
  // the empty left edge of the old year grid).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const stats = [
    { key: 'commits', value: total },
    { key: 'days', value: active },
    { key: 'busiest', value: t('atelier.commits.busyUnit', { count: busiest.count }) },
    { key: 'streak', value: t('atelier.commits.streakUnit', { count: bestStreak }) },
  ];

  return (
    <div ref={rootRef} className="commit-graph">
      <div ref={scrollRef} className="commit-graph__scroll" data-lenis-prevent>
        <div className={`commit-strip ${inView ? 'is-in' : ''}`} role="img" aria-label={t('atelier.commits.aria')}>
          {cells.map((cell, i) => (
            <div key={cell.date} className="commit-strip__day">
              <span className="commit-strip__month" aria-hidden="true">{cell.month || ' '}</span>
              <span
                className={`commit-cell commit-cell--l${cell.level}`}
                style={{ '--cell-delay': `${i * 0.03}s` }}
                onPointerEnter={(e) => cell.count > 0 && setHover({ date: cell.date, count: cell.count, x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop })}
                onPointerLeave={() => setHover(null)}
              />
              <span className="commit-strip__date exp-mono" aria-hidden="true">{cell.day}</span>
            </div>
          ))}
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

      {/* stat readout — computed on the build window, matching the strip */}
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
