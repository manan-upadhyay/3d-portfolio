import { useRef, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { mountAstrolabe } from '../lib/astrolabe';
import { sound } from '../lib/sound';
import { track } from '../lib/analytics';
import CompassRose from '../components/CompassRose';
import Seo from '../components/Seo';

/**
 * The cinematic 404 — "Off the Map" (spec: docs/chronicle/sections/09).
 *
 * Function first: it must read *instantly* as a not-found page and hand the
 * visitor an obvious way home. So the page leads with a plain "404 · page not
 * found" tag and a prominent primary button back to the homepage. The
 * cartographer flavour (a lost astrolabe whose needle wanders, a serpent
 * constellation, edge-of-the-chart fog) is the atmosphere *around* that clear
 * message — never in place of it.
 *
 * The astrolabe stays interactive as a small delight: "find your bearing" (a
 * clearly-secondary action) spins the needle until it locks north. But it never
 * competes with — or gates — the way home.
 *
 * The whole scene fits one viewport with no scroll (the Layout footer is hidden
 * on this route). Procedural: zero required assets.
 */
const Void = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const { pathname } = useLocation();
  const isDark = resolvedTheme === 'dark';
  const prefersReduced = useReducedMotion();

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const controlsRef = useRef(null);

  // Sparse, stable starfield for the "uncharted sky" — fewer stars than the hero
  // (this is emptier space). Deterministic positions so it never reflows.
  const stars = useMemo(
    () => Array.from({ length: 30 }, (_, i) => ({
      big: i % 9 === 0,
      left: (i * 41) % 100,
      top: (i * 61) % 92,
      o: 0.12 + ((i * 19) % 55) / 100,
      dur: 5 + ((i * 13) % 40) / 10,
      delay: ((i * 29) % 80) / 10,
    })),
    [],
  );

  // Mount the distressed astrolabe. Re-mounts on theme change so it re-reads the
  // CSS theme tokens (useAstrolabe doesn't expose the distressed/onLock options).
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const inst = mountAstrolabe(canvas, wrap, {
      onSpeed: sound.watch.setSpeed,
      distressed: true,
      onLock: () => sound.playCue('settle'),
    });
    controlsRef.current = inst;
    return () => {
      inst.destroy();
      sound.watch.setSpeed(0); // silence the gear on unmount
      controlsRef.current = null;
    };
  }, [resolvedTheme]);

  // Analytics: free telemetry on broken inbound links.
  useEffect(() => {
    track('void_view', { path: pathname });
  }, [pathname]);

  // The optional wayfinding delight: spin the needle until it locks north. The
  // gear sound tracks the spin via onSpeed; the `settle` cue lands on lock.
  const findBearing = () => {
    if (!controlsRef.current) return;
    sound.unlock();
    track('void_bearing');
    sound.playCue('detent');
    controlsRef.current.findBearing();
  };

  const fade = (delay) => (prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });

  return (
    <main className="void-scene">
      {/* Soft-404: the Vercel rewrite serves index.html with HTTP 200 for unknown
          paths, so tell crawlers not to index this one. */}
      <Seo
        path={pathname}
        title="404 — Off the Map | Manan Upadhyay"
        description="This page has drifted off the map. Return to the Chronicle — the portfolio of Manan Upadhyay, Full Stack Developer."
        noindex
      />

      {/* Atmosphere — the uncharted sky + sparse starfield (dark skies only). */}
      <div className="void-sky" aria-hidden="true">
        {isDark && stars.map((s, i) => (
          <span
            key={i}
            className="void-star hero-star"
            style={{
              width: s.big ? 2.4 : 1.3,
              height: s.big ? 2.4 : 1.3,
              left: `${s.left}%`,
              top: `${s.top}%`,
              '--star-o': s.o,
              '--star-dur': `${s.dur}s`,
              '--star-delay': `${s.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="void-aura" aria-hidden="true" />
      <div className="void-fog void-fog--back" aria-hidden="true" />
      <div className="void-fog void-fog--front" aria-hidden="true" />
      <div className="cinematic-vignette" style={{ zIndex: 2 }} aria-hidden="true" />

      <div className="void-content">
        {/* The lost astrolabe — compact centerpiece, compass rose at its heart. */}
        <motion.div
          className="void-astrolabe"
          ref={wrapRef}
          aria-hidden="true"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, scale: 0.92 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          })}
        >
          <canvas ref={canvasRef} />
          <motion.div
            className="void-rose"
            initial={prefersReduced ? false : { scale: 0, rotate: -120, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: prefersReduced ? 0 : 1.2 }}
          >
            <CompassRose className="w-full h-full" />
          </motion.div>
        </motion.div>

        {/* Unmistakable status — the "404" is universal; the eyebrow adds the words
            (and a touch of voice). */}
        <motion.p className="void-tag" {...fade(0.1)}>
          <span className="void-tag__code">404</span>
          <span className="void-tag__sep" aria-hidden="true">·</span>
          <span className="void-tag__label">{t('void.eyebrow')}</span>
        </motion.p>

        <motion.h1 className="void-title" {...fade(0.18)}>{t('void.title')}</motion.h1>
        <motion.p className="void-body" {...fade(0.26)}>{t('void.body')}</motion.p>
        <motion.p className="void-position" {...fade(0.32)}>
          {t('void.position', { path: pathname })}
        </motion.p>

        {/* The way home is the obvious primary action. "Find your bearing" is a
            clearly-secondary delight that only moves the instrument. */}
        <motion.div className="void-actions" {...fade(0.4)}>
          <Link
            to="/"
            data-cursor="hover"
            className="btn-primary void-home"
            onClick={() => track('void_home')}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {t('void.home')}
          </Link>
          {!prefersReduced && (
            <button
              type="button"
              data-cursor="hover"
              className="void-bearing-btn"
              onClick={findBearing}
            >
              <Compass size={14} strokeWidth={1.75} />
              {t('void.cta')}
            </button>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Void;
