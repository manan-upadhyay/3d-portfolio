import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { sound } from '../lib/sound';

// Scroll room (vh) for the gap that drives the timeline — a short fog "breather"
// between the hero and a card. Deliberately small: the timeline lives in the
// RIGHT MARGIN, so this never fills the screen or locks the scroll.
const GAP_VH = 50;
const SLOT = 20;                        // px per dot in the odometer track
const WEIGHT = { major: 1.7, mid: 1 };  // major events dwell a little longer

/**
 * TimeTunnel (feedback §5, revised) — the "back in time" news as a RIGHT-EDGE
 * timeline, not a content takeover. As you scroll the short fog gap before a card,
 * a fixed odometer of dots scrolls in the right margin; the centred dot expands
 * into its year + news line (readable), the rest stay dots. It never covers the
 * centred content and never pins/locks the scroll — it's a fixed decoration that
 * merely reads scroll progress (Framer `useScroll`). One soft `pageflip` per event.
 *
 * Mobile (coarse pointer) skips entirely (owner decision). Reduced-motion desktop
 * falls back to a static, year-grouped list.
 *
 * Pure presenter: `events` is DATA (constants.timeTunnel.<gap>); copy is voiced
 * via t('timeTunnel.events.<id>').
 */
const TimeTunnel = ({ id, events }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const yearRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef([]);
  const lastIdx = useRef(-1);
  const railH = useRef(0);

  const coarse = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );

  // Weighted, normalized window boundaries (major events get a wider window).
  const bounds = useMemo(() => {
    const w = events.map((e) => WEIGHT[e.weight] || 1);
    const total = w.reduce((a, b) => a + b, 0) || 1;
    const b = [0];
    let acc = 0;
    w.forEach((x) => { acc += x; b.push(acc / total); });
    return b;
  }, [events]);

  // Cache the odometer window height so the active dot can be centred in px.
  useEffect(() => {
    const measure = () => { if (railRef.current) railH.current = railRef.current.clientHeight; };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // The whole stream plays as the gap ENTERS (top→bottom-of-viewport), so it's
  // fully finished by the time the card — which sits right below the gap — begins
  // to appear at the bottom edge. No lingering text under the incoming card.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return; // static / mobile render — nothing to drive

    // Fade in quickly, out completely before p reaches 1 (card entering), so the
    // timeline is gone the instant the card shows — never trapped under it.
    const fadeIn = Math.min(1, p / 0.1);
    const fadeOut = Math.min(1, (1 - p) / 0.16);
    rail.style.opacity = Math.max(0, Math.min(fadeIn, fadeOut)).toFixed(3);

    const n = events.length;
    let idx = 0;
    for (let i = 0; i < n; i++) if (p >= bounds[i]) idx = i;
    const lo = bounds[idx];
    const hi = bounds[idx + 1] ?? 1;
    const frac = Math.min(1, Math.max(0, (p - lo) / Math.max(1e-4, hi - lo)));
    const floatIdx = idx + frac;

    // Scroll the dot track so the active dot sits at the rail's vertical centre.
    track.style.transform = `translateY(${railH.current / 2 - (floatIdx + 0.5) * SLOT}px)`;

    if (idx !== lastIdx.current) {
      lastIdx.current = idx;
      if (yearRef.current) yearRef.current.textContent = String(events[idx].year);
      if (textRef.current) textRef.current.textContent = t(`timeTunnel.events.${events[idx].id}`);
      for (let i = 0; i < n; i++) {
        const el = dotsRef.current[i];
        if (el) el.dataset.state = i < idx ? 'past' : i === idx ? 'active' : 'future';
      }
      sound.playCue('pageflip'); // one soft turn per event crossed
    }
  });

  // ── Mobile: skip entirely (owner decision). ──
  if (coarse) return null;

  // ── Reduced-motion (desktop): a static, year-grouped list. ──
  if (reduce) {
    const byYear = [];
    events.forEach((e) => {
      const g = byYear.find((x) => x.year === e.year);
      (g ? g.items : byYear[byYear.push({ year: e.year, items: [] }) - 1].items).push(e);
    });
    return (
      <section id={`tunnel-${id}`} className="tm-tunnel tm-tunnel--static">
        {byYear.map((g) => (
          <div key={g.year} className="tm-tunnel__group">
            <div className="tm-tunnel__gyear">{g.year}</div>
            <div className="tm-tunnel__glist">
              {g.items.map((e) => (
                <p key={e.id} className="tm-tunnel__scap" data-weight={e.weight}>
                  {t(`timeTunnel.events.${e.id}`)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  // ── Desktop: a short fog gap + the fixed right-edge odometer timeline. ──
  return (
    <section id={`tunnel-${id}`} ref={sectionRef} className="tm-tunnel" style={{ height: `${GAP_VH}vh` }}>
      {/* A quiet meridian thread down the centre — the connective tissue between
          the era above and the era below, so the gap never reads as empty. */}
      <div className="tm-gap-thread" aria-hidden />

      <div className="tm-rail" ref={railRef} aria-hidden>
        <div className="tm-rail__focus">
          <span className="tm-rail__year" ref={yearRef}>{events[0]?.year}</span>
          <span className="tm-rail__text" ref={textRef}>{t(`timeTunnel.events.${events[0]?.id}`)}</span>
        </div>
        <div className="tm-rail__dots">
          <div className="tm-rail__track" ref={trackRef}>
            {events.map((e, i) => (
              <span
                key={e.id}
                ref={(el) => { dotsRef.current[i] = el; }}
                className="tm-rail__dot"
                data-state={i === 0 ? 'active' : 'future'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeTunnel;
