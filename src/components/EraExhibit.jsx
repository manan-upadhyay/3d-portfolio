import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Power, Loader2 } from 'lucide-react';
import Magnet from './Magnet';
import { sound } from '../lib/sound';
import { track } from '../lib/analytics';

// The viewport width these portfolios were designed for — the live frame renders
// at this width and is CSS-scaled to fit the card, so the whole intended desktop
// layout shows, uncut (feedback §3d).
const DESIGN_WIDTH = 1440;

/**
 * EraExhibit — one preserved "ruin" in the Time Machine's descent.
 *
 * Progressive (proposal §4C): a preserved POSTER by default; a deliberate "wake"
 * asks the parent to make THIS era the single live one (feedback §3c — only one
 * iframe is ever mounted, so two heavy old sites never run at once). The primary
 * CTA always opens the real deploy in a new tab.
 *
 * The live frame is a CLEAN window — no aging grade touches it (feedback §3a); it
 * renders at 1440px and scales to the card. The *card chrome* carries the patina
 * instead, its strength fixed per era (`--era-age`), so the year the visitor
 * reads never drifts mid-card (feedback §8).
 *
 * Pure presenter — `era` is DATA (constants.archive); copy is voiced via
 * t('timeMachine.*'). `isAwake`/`onWake` are owned by the parent section.
 */
const EraExhibit = ({ era, eraAge = 0.5, isAwake = false, onWake }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [hasPoster, setHasPoster] = useState(Boolean(era.poster));
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(null);
  const iframeRef = useRef(null);

  const base = `timeMachine.eras.${era.id}`;
  const context = t(`${base}.context`, { returnObjects: true, defaultValue: [] });
  const contextItems = Array.isArray(context) ? context : [];

  // Reset the loading veil whenever this era is put back to sleep.
  useEffect(() => { if (!isAwake) setLoaded(false); }, [isAwake]);

  // Render the live frame at DESIGN_WIDTH and scale it to fit the card, so the
  // full desktop layout shows without clipped edges. Re-fit on resize.
  useEffect(() => {
    if (!isAwake) return undefined;
    const frame = frameRef.current;
    const ifr = iframeRef.current;
    if (!frame || !ifr) return undefined;
    const fit = () => {
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      const scale = w / DESIGN_WIDTH;
      ifr.style.width = `${DESIGN_WIDTH}px`;
      ifr.style.height = `${h / scale}px`;
      ifr.style.transform = `scale(${scale})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [isAwake]);

  const wake = () => {
    if (!era.framable || isAwake) return;
    sound.playCue('rewind');
    track('era_wake', { era: era.id });
    onWake?.(era.id);
  };

  return (
    <motion.article
      className="tm-exhibit max-w-5xl mx-auto w-full"
      style={{ '--era-age': eraAge }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* The frame — a CLEAN window (no grade). Poster by default, live once woken. */}
      <div className="tm-exhibit__frame" ref={frameRef}>
        {isAwake ? (
          <>
            {!loaded && (
              <div className="tm-exhibit__booting">
                <span className="flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                  <Loader2 size={15} className="animate-spin" /> {t('timeMachine.booting')}
                </span>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={era.url}
              title={t(`${base}.posterAlt`, { year: era.year })}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={() => setLoaded(true)}
            />
          </>
        ) : (
          <>
            {hasPoster ? (
              <img
                src={`/${era.poster}`}
                alt={t(`${base}.posterAlt`, { year: era.year })}
                className="tm-exhibit__poster"
                loading="lazy"
                onError={() => setHasPoster(false)}
              />
            ) : (
              <div className="tm-exhibit__poster grid place-items-center"
                style={{ background: 'radial-gradient(120% 120% at 30% 20%, color-mix(in srgb, var(--color-ember) 22%, transparent), transparent 60%), var(--color-primary)' }}>
                <span className="font-chronicle" style={{ fontSize: 'clamp(64px,14vw,160px)', color: 'color-mix(in srgb, var(--color-text) 30%, transparent)', lineHeight: 1 }}>
                  {String(era.year).slice(-2)}
                </span>
              </div>
            )}

            {/* Dim scrim so the sleeping poster recedes and the wake button pops
                (feedback §7). Only offered when the deploy can be framed. */}
            {era.framable && (
              <button
                type="button"
                onClick={wake}
                data-cursor="hover"
                className="tm-exhibit__wake group"
                aria-label={t('timeMachine.wake')}
              >
                <span className="tm-exhibit__scrim" aria-hidden />
                <span className="tm-exhibit__wakebtn">
                  <Power size={15} /> {t('timeMachine.wake')}
                </span>
              </button>
            )}
          </>
        )}
      </div>

      {/* Card chrome — this is what ages (patina + per-era tokens). Frame above is
          untouched. */}
      <div className="tm-exhibit__body">
        <div className="tm-exhibit__patina" aria-hidden />

        <div className="relative flex flex-wrap items-center gap-3">
          <span className="tm-plaque">{era.year} · {t('timeMachine.archived')}</span>
          <span className="tm-gravestone">
            {t('timeMachine.gravestone', { built: era.dates.built, touched: era.dates.lastTouched, preserved: new Date().getFullYear() })}
          </span>
        </div>

        <p className="relative font-chronicle italic text-[clamp(18px,2.4vw,26px)] leading-snug mt-5" style={{ color: 'var(--color-text)' }}>
          {t(`${base}.plaque`)}
        </p>
        <p className="relative text-[14.5px] leading-relaxed max-w-2xl mt-4" style={{ color: 'var(--color-text-muted)' }}>
          {t(`${base}.note`)}
        </p>

        <div className="relative flex flex-wrap gap-2 mt-5">
          {era.builtWith.map((tech) => (
            <span key={tech} className="text-[11px] px-2.5 py-1 rounded-md"
              style={{ color: 'var(--color-text-muted)', border: '1px solid var(--tm-border)', letterSpacing: '0.04em' }}>
              {tech}
            </span>
          ))}
        </div>

        {contextItems.length > 0 && (
          <div className="tm-context relative mt-5">
            {contextItems.map((c, i) => (
              <div key={i} className="tm-context__item">
                <div className="tm-context__k">{c.k}</div>
                <div className="tm-context__v">{c.v}</div>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex flex-wrap items-center gap-4 mt-6">
          <Magnet>
            <a
              href={era.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              onClick={() => track('era_open', { era: era.id })}
              className="btn-primary inline-flex items-center gap-1.5"
            >
              {t('timeMachine.enter')} <ArrowUpRight size={15} />
            </a>
          </Magnet>
          {era.framable && !isAwake && (
            <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
              {t('timeMachine.wakeHint')}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default EraExhibit;
