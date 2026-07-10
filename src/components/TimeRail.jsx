import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { sound } from '../lib/sound';

const SLOT = 46;   // px between stops in the timeline (room for a 2-line fact)
const R = 3.2;     // dock "reach" — how many stops around the focal point react

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/**
 * TimeRail (feedback §5, final) — ONE continuous right-edge timeline for the whole
 * descent. Years live in a vertical dotted line (small at rest); the news facts of
 * each year sit as dots between them. A fixed focal point at viewport centre
 * MAGNIFIES whatever passes it (MacBook-dock style): years grow to active as you
 * reach them and shrink as you pass; fact dots open into their text at the focal
 * point and collapse back to dots.
 *
 * It never locks the scroll — it's a fixed decoration reading window scroll. The
 * mapping is piecewise so each portfolio card HOLDS its year at the focal point
 * (sticky) for the card's whole height, and the gaps scrub the years/facts between
 * cards. After the last card the rail fades away (no content past it).
 *
 * Mobile (coarse) skips; reduced-motion → a static year-grouped list.
 * Pure presenter: DATA in (gaps + archive); copy voiced via t('timeTunnel.events.*').
 */
const TimeRail = ({ gaps, archive, presentYear }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const railRef = useRef(null);
  const nodeEls = useRef([]);
  const lastFocal = useRef(-1);

  const coarse = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );

  // Build the unified stop list (present → past). Facts are grouped by year; for a
  // CARD year (a portfolio) the year label lands AFTER its facts, so the card
  // "arrives" on its year once its news has streamed by — and the two gaps stay
  // balanced. For every other year the label leads its facts.
  const stops = useMemo(() => {
    const facts = [...gaps.gap1, ...gaps.gap2];
    const cardYears = new Set(archive.map((a) => a.year));
    const groups = [];
    facts.forEach((f) => {
      let g = groups[groups.length - 1];
      if (!g || g.year !== f.year) { g = { year: f.year, items: [] }; groups.push(g); }
      g.items.push(f);
    });
    const list = [];
    groups.forEach((g) => {
      const yearNode = { type: 'year', year: g.year, key: `y${g.year}` };
      const factNodes = g.items.map((f) => ({ type: 'fact', year: f.year, id: f.id, weight: f.weight, key: f.id }));
      if (cardYears.has(g.year)) list.push(...factNodes, yearNode); // facts → card year
      else list.push(yearNode, ...factNodes); // year → facts
    });
    return list;
  }, [gaps, archive]);

  const yearIndex = useMemo(() => {
    const m = {};
    stops.forEach((s, i) => { if (s.type === 'year') m[s.year] = i; });
    return m;
  }, [stops]);

  useEffect(() => {
    if (reduce || coarse) return undefined;
    const rail = railRef.current;
    if (!rail) return undefined;
    let raf = 0;

    const compute = () => {
      raf = 0;
      const vpH = window.innerHeight;
      const focal = window.scrollY + vpH / 2; // focal line, document coords
      const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;
      const hero = document.getElementById('era-threshold');
      if (!hero) return;
      // Scrub only AFTER the hero's bottom passes the focal line — so the news never
      // streams over the hero (the facts appear only across the empty fog gap).
      const heroBottom = docTop(hero) + hero.offsetHeight;

      const cards = archive
        .map((a) => {
          const el = document.getElementById(`era-${a.id}`);
          return el ? { top: docTop(el), bot: docTop(el) + el.offsetHeight, idx: yearIndex[a.year] } : null;
        })
        .filter(Boolean);

      // Piecewise focal index: hold on cards, scrub through the gaps.
      const presentIdx = yearIndex[presentYear] ?? 0;
      let fi = presentIdx;
      let prevPoint = heroBottom;
      let prevIdx = presentIdx;
      let resolved = false;
      for (const c of cards) {
        if (focal <= c.top) { fi = lerp(prevIdx, c.idx, clamp01((focal - prevPoint) / (c.top - prevPoint || 1))); resolved = true; break; }
        if (focal <= c.bot) { fi = c.idx; resolved = true; break; }
        prevPoint = c.bot; prevIdx = c.idx;
      }
      if (!resolved && cards.length) fi = cards[cards.length - 1].idx;

      // Visibility: appear as soon as you start scrolling; disappear after the
      // last card's bottom passes the focal point.
      const appear = clamp01((window.scrollY - 16) / 120);
      const lastBot = cards.length ? cards[cards.length - 1].bot : Infinity;
      const disappear = 1 - clamp01((focal - lastBot) / (vpH * 0.5));
      rail.style.opacity = Math.max(0, Math.min(appear, disappear)).toFixed(3);

      // The active year = the year of whatever is at the focal point. Its label
      // stays highlighted (bigger, ember) even while its FACTS are streaming, so the
      // reader always knows which year the current fact belongs to.
      const focalStop = stops[Math.max(0, Math.min(stops.length - 1, Math.round(fi)))];
      const activeYear = focalStop ? focalStop.year : null;

      // Position every stop; a SHARP focus peak means only the single node at the
      // focal point reads — neighbours collapse to faint dots (facts) or a tiny,
      // low-opacity number (years), so there's no crowding.
      const centerY = vpH / 2;
      for (let i = 0; i < stops.length; i++) {
        const el = nodeEls.current[i];
        if (!el) continue;
        const d = i - fi;
        const ad = Math.abs(d);
        const focus = Math.pow(Math.max(0, 1 - ad), 3); // ~1 only for the nearest stop
        const isYear = stops[i].type === 'year';
        const isActiveYear = isYear && stops[i].year === activeYear;
        // The active year is PINNED near the focal point (never clipped), so the
        // reader always sees which year the current fact belongs to — even when the
        // year label itself is many facts away.
        let y = centerY + d * SLOT;
        if (isActiveYear) y = Math.max(centerY - 104, Math.min(centerY + 104, y));
        el.style.transform = `translateY(calc(${y.toFixed(1)}px - 50%))`;
        el.style.opacity = (!isActiveYear && ad > R + 1.8) ? '0' : '1';
        const textEl = el.firstChild;
        const dotEl = el.lastChild;
        // IMPORTANT: never animate font-size (it re-wraps the text and glitches).
        // Years magnify via transform:scale (no reflow); facts just fade at a fixed
        // size, so the same line never re-breaks mid-scroll.
        if (isYear) {
          const scale = isActiveYear ? Math.max(1.85, 1 + focus * 1.35) : 1 + focus * 1.35;
          textEl.style.transform = `scale(${scale.toFixed(3)})`;
          textEl.style.opacity = (isActiveYear ? 1 : 0.1 + focus * 0.9).toFixed(3);
          textEl.style.color = isActiveYear ? 'var(--color-ember)' : focus > 0.5 ? 'var(--color-text)' : 'var(--color-text-muted)';
          textEl.style.fontWeight = isActiveYear || focus > 0.4 ? 600 : 400;
          dotEl.style.opacity = (isActiveYear ? 0 : 0.3 * (1 - focus)).toFixed(2);
        } else {
          textEl.style.opacity = focus.toFixed(3); // ONLY the focal fact opens to text
          dotEl.style.opacity = (0.12 + 0.5 * (1 - focus)).toFixed(2);
        }
      }

      const fInt = Math.round(fi);
      if (fInt !== lastFocal.current) { lastFocal.current = fInt; sound.playCue('pageflip'); }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, coarse, stops, yearIndex, archive, presentYear]);

  if (coarse) return null;

  if (reduce) {
    // Static, year-grouped list (no motion).
    const byYear = [];
    stops.forEach((s) => {
      if (s.type !== 'fact') return;
      const g = byYear.find((x) => x.year === s.year);
      (g ? g.items : byYear[byYear.push({ year: s.year, items: [] }) - 1].items).push(s);
    });
    return (
      <section className="tm-tunnel tm-tunnel--static" aria-label="World events, present to 2019">
        {byYear.map((g) => (
          <div key={g.year} className="tm-tunnel__group">
            <div className="tm-tunnel__gyear">{g.year}</div>
            <div className="tm-tunnel__glist">
              {g.items.map((e) => (
                <p key={e.id} className="tm-tunnel__scap" data-weight={e.weight}>{t(`timeTunnel.events.${e.id}`)}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <div className="tm-rail2" ref={railRef} aria-hidden>
      {stops.map((s, i) => (
        <div
          key={s.key}
          ref={(el) => { nodeEls.current[i] = el; }}
          className="tm-rail2__node"
          data-type={s.type}
        >
          <span className="tm-rail2__text">{s.type === 'year' ? s.year : t(`timeTunnel.events.${s.id}`)}</span>
          <span className="tm-rail2__dot" />
        </div>
      ))}
    </div>
  );
};

export default TimeRail;
