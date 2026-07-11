import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronsDown } from 'lucide-react';
import { EraExhibit, Fog, CompassRose, TimeRail, TemporalProbe } from '../components';
import { archive, timeTunnel, PRESENT_YEAR } from '../constants';

// Height (vh) of the fog "gap" before each card — the scroll room the right-edge
// TimeRail scrubs through for that year span. Roughly synced to the span size.
const GAP_VH = [48, 52];

// Per-era patina strength: newest era barely aged, oldest most. Fixed per card so
// the card's look never drifts mid-scroll (feedback §3b/§8).
const eraAgeFor = (i, n) => (n <= 1 ? 0.5 : 0.3 + 0.55 * (i / (n - 1)));

/**
 * The Time Machine — STRATA (docs/chronicle/sections/11-the-time-machine.md +
 * TIME-MACHINE-FEEDBACK-PASS.md).
 *
 * You descend through time. A single scroll-progress value `--age` (0 = present →
 * 1 = deepest past) drives the *page atmosphere* — the fog thickens and a vignette
 * closes in (both BEHIND the cards, so the live frames stay clean windows). Each
 * card ages via its own fixed `--era-age`.
 *
 * The "back in time" news is NOT in the content column — it rides a right-edge
 * `TimeTunnel` timeline in the short gap before each card (feedback §5, revised),
 * so it never blocks the scroll or covers the page. Only one era is ever live at a
 * time (`awakeEra`). Reduced motion / touch handled downstream.
 */
const TimeMachine = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const [density, setDensity] = useState(0);
  const [awakeEra, setAwakeEra] = useState(null); // single live iframe

  // The "back in time" news is a DESKTOP-ONLY experience (the right-edge scrubbing
  // rail). On touch / reduced-motion there is no rail, no fog gaps, and no news
  // block at all — the cards follow the hero directly with tight spacing
  // (feedback 2026-07-11).
  const coarse = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );
  const useRail = !coarse && !reduce;

  // Drive `--age` (atmosphere) from overall descent progress. Cheap: one element,
  // rAF-throttled, transform/opacity only downstream.
  useEffect(() => {
    if (reduce) { setDensity(0.4); return undefined; }
    const root = rootRef.current;
    if (!root) return undefined;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const age = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      root.style.setProperty('--age', age.toFixed(4));
      setDensity(age);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div ref={rootRef} className="time-machine">
      {/* Ambient — fog (thickens with age) + vignette + grain, all BEHIND the
          cards so the live frames stay clean windows. */}
      <Fog density={density} />
      <div className="tm-grain" aria-hidden />

      {/* The temporal-probe companion — flies over the descent, scans, reacts,
          and quips (feedback §4). Self-guards: desktop + motion only, dismissible. */}
      <TemporalProbe />

      {/* THRESHOLD — the present; the mouth of the descent. */}
      <section id="era-threshold" className="tm-stratum items-center text-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[11px] tracking-[0.34em] uppercase mb-5" style={{ color: 'var(--color-ember)' }}>
            {t('timeMachine.eyebrow')}
          </p>
          <h1 className="font-chronicle font-semibold leading-[0.98] text-[clamp(38px,7vw,80px)]" style={{ color: 'var(--color-text)' }}>
            {t('timeMachine.title')}
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {t('timeMachine.intro')}
          </p>
          <p className="mt-10 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            {t('timeMachine.threshold.cue')} <ChevronsDown size={16} className={reduce ? '' : 'animate-bounce'} />
          </p>
        </motion.div>
      </section>

      {/* Desktop: the single right-edge timeline for the whole descent (fixed). */}
      {useRail && <TimeRail gaps={timeTunnel} archive={archive} presentYear={PRESENT_YEAR} />}

      {/* STRATA — one preserved ruin per archived portfolio (present → past). On
          DESKTOP each card is preceded by a short fog "gap" (the scroll room the
          rail scrubs through) with a meridian thread. On touch/reduced-motion there
          is no gap and no news — the cards follow the hero directly. */}
      {archive.map((era, i) => (
        <Fragment key={era.id}>
          {useRail && (
            <div className="tm-gap" style={{ height: `${GAP_VH[i] ?? 48}vh` }} aria-hidden>
              <div className="tm-gap-thread" />
            </div>
          )}
          <section id={`era-${era.id}`} className="tm-stratum">
            <span aria-hidden className="pointer-events-none select-none absolute left-1/2 top-8 -translate-x-1/2 font-chronicle"
              style={{ fontSize: 'clamp(120px,26vw,340px)', lineHeight: 1, color: 'color-mix(in srgb, var(--color-text) 5%, transparent)' }}>
              {era.year}
            </span>
            <EraExhibit
              era={era}
              eraAge={eraAgeFor(i, archive.length)}
              isAwake={awakeEra === era.id}
              onWake={setAwakeEra}
            />
          </section>
        </Fragment>
      ))}

      {/* THE FLOOR — the edge of the map; the record ends, then home (feedback §9). */}
      <section id="era-floor" className="tm-stratum items-center text-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto relative"
        >
          <div className="tm-floor__rose" aria-hidden>
            <CompassRose className="w-full h-full" />
          </div>
          <h2 className="font-chronicle font-semibold leading-[1.02] text-[clamp(30px,5vw,56px)]" style={{ color: 'var(--color-text)' }}>
            {t('timeMachine.floor.title')}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {t('timeMachine.floor.body')}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default TimeMachine;
