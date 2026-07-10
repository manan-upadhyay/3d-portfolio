import { useState, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../constants';
import { useThemeStore } from '../store/useThemeStore';
import { scrollToSection } from '../lib/smoothScroll';
import { useAstrolabe } from '../hooks/useAstrolabe';
import { RefreshCcw, Download } from 'lucide-react';
import { sound } from '../lib/sound';
import { track, trackOnce } from '../lib/analytics';
import CompassRose from '../components/CompassRose';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === 'dark';
  const prefersReduced = useReducedMotion();
  const [phraseIdx, setPhraseIdx] = useState(0);
  // Mobile-only one-time "tap to spin" hint (the whole astrolabe is the tap target
  // on touch — see below). Shown once per session, then never nags again.
  const [spinHint, setSpinHint] = useState(false);

  const rootRef = useRef(null);
  const langRef = useRef(i18n.language);
  const copyRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const bearingRef = useRef(null);
  const astrolabeRef = useRef(null);

  // `t(returnObjects)` hands back a fresh array every render — memoize per voice
  // so it's a stable reference (otherwise the rotation effect churns). `t`'s
  // identity changes on every voice switch, so it alone scopes the memo per voice.
  const phrases = useMemo(() => {
    const p = t('hero.phrases', { returnObjects: true });
    return Array.isArray(p) && p.length ? p : [t('hero.lead')];
  }, [t]);
  // Above-the-fold proof strip — years · stack · shipped · role. Voiced per
  // bundle (`hero.proof`); data-accurate to constants (5+ yrs, 20+ shipped).
  const proof = useMemo(() => {
    const p = t('hero.proof', { returnObjects: true });
    return Array.isArray(p) ? p : [];
  }, [t]);
  const longestPhrase = phrases.reduce((a, b) => (b.length > a.length ? b : a), phrases[0]);
  // Clamp so the index can never point past the current voice's phrase list.
  const safeIdx = phraseIdx % phrases.length;
  const current = phrases[safeIdx];

  // Reset to the first phrase the instant the voice (i18n language) changes —
  // DURING render, not in an effect. This collapses the language flip and the
  // index reset into one committed render (key `lang:0`). Resetting in an effect
  // produced two rapid commits (`lang:oldIdx` then `lang:0`) that interrupted
  // AnimatePresence's `mode="wait"` exit and left it permanently desynced after a
  // UI voice switch — the phrase froze, blanked, then repeated.
  if (langRef.current !== i18n.language) {
    langRef.current = i18n.language;
    setPhraseIdx(0);
  }

  // The one-time mobile spin hint: a beat after landing (touch only), auto-dismiss.
  useEffect(() => {
    if (prefersReduced) return undefined;
    let seen = false;
    try { seen = sessionStorage.getItem('spinHintSeen') === '1'; } catch { /* private mode */ }
    if (seen || !window.matchMedia('(pointer: coarse)').matches) return undefined;
    const inT = setTimeout(() => setSpinHint(true), 2600);
    const outT = setTimeout(() => setSpinHint(false), 9000);
    return () => { clearTimeout(inT); clearTimeout(outT); };
  }, [prefersReduced]);

  const dismissSpinHint = () => {
    setSpinHint(false);
    try { sessionStorage.setItem('spinHintSeen', '1'); } catch { /* private mode */ }
  };
  const spinAstrolabe = () => { sound.suppressReward(); sound.unlock(); track('astrolabe_spin'); astrolabeRef.current?.spin(); dismissSpinHint(); };

  // (Re)start the rotation whenever the voice's phrase list changes.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || phrases.length < 2) return;
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % phrases.length), 3200);
    return () => clearInterval(id);
  }, [phrases]);

  // Intro timeline + scroll-out parallax.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return; // elements rest at their natural (visible) state
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-line > span', { yPercent: 120, duration: 1, stagger: 0.12 })
        .from('.hero-tagline', { opacity: 0, y: 18, duration: 0.8 }, '-=0.5')
        .from('.hero-proof', { opacity: 0, y: 14, duration: 0.7 }, '-=0.55')
        .from('.hero-cta', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
        .from('.hero-meta', { opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cue', { opacity: 0, duration: 0.8 }, '-=0.3');

      gsap.to(copyRef.current, {
        yPercent: -12, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(canvasWrapRef.current, {
        yPercent: -8, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // The living astrolabe (Canvas2D). Re-mounts on theme change to re-read tokens.
  // Its needle speed drives the gear sound, so the gear turns as fast as the cursor
  // sweeps the alidade (and is silent at rest). Safe regardless of sound state.
  useAstrolabe(canvasRef, canvasWrapRef, bearingRef, resolvedTheme, sound.watch.setSpeed, astrolabeRef);

  // Analytics — did they deliberately *play* with the needle? A pointerdown that
  // lands inside the instrument's box (the needle follows/aims there) is the
  // genuine signal; the passive cursor-follow is not. Once per session.
  useEffect(() => {
    const onDown = (e) => {
      const r = canvasWrapRef.current?.getBoundingClientRect();
      if (!r) return;
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        trackOnce('astrolabe_drag', 'astrolabe_drag');
      }
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  // Reveal the masterpiece on first contact. Browser autoplay policy mutes the
  // intro-spin sound for everyone until a gesture unlocks audio — so the moment it
  // DOES unlock (the visitor's first click/scroll/keypress, wherever it happens),
  // if they're still up at the hero, flick the alidade. They hear the synced gear
  // wind up and coast down without having to discover the button first. The button
  // (below) remains the explicit, repeatable invitation.
  useEffect(() => {
    if (prefersReduced) return undefined;
    let cancelled = false;
    sound.onUnlock(() => {
      if (cancelled) return;
      // Defer a beat: the global first-gesture unlock fires on the pointerDOWN that
      // opened the menu — BEFORE that control's onClick can call suppressReward().
      // Re-checking after a tick lets the suppress flag (and the menu state) settle,
      // so the spin+sound never fire off-screen from nowhere.
      setTimeout(() => {
        if (cancelled) return;
        if (sound.consumeRewardSuppressed()) return;
        // Only reward when the HERO is what the visitor is looking at: on screen AND
        // nothing overlaid (the mobile menu sheet). Otherwise the needle would spin
        // + gear-sound off-screen while they tap menu items — sound from nowhere.
        if (document.querySelector('.mobile-sheet')) return;
        const r = rootRef.current?.getBoundingClientRect();
        const visible = r && r.bottom > window.innerHeight * 0.5;
        if (visible) astrolabeRef.current?.spin();
      }, 140);
    });
    return () => { cancelled = true; };
  }, [prefersReduced]);

  // Astrolabe watch-mechanism sound — hero-local; its level tracks how much of the
  // hero is on screen, so it fades to silence as you scroll past (natural distance
  // falloff) and rises again on the way back. The engine no-ops until sound is
  // unlocked + enabled + the page is in view, so this is safe regardless of state.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => sound.watch.setLevel(1 - self.progress),
        onLeave: () => sound.watch.setLevel(0),
        onLeaveBack: () => sound.watch.setLevel(1),
      });
      sound.watch.setLevel(1 - st.progress);
    }, rootRef);
    return () => { sound.watch.stop(); ctx.revert(); };
  }, []);

  const firstName = personalInfo.name.split(' ')[0];
  const lastName = personalInfo.name.split(' ').slice(1).join(' ');

  return (
    <section ref={rootRef} id="origin" className="relative w-full h-screen overflow-hidden">
      {/* ===== Backdrop — pure CSS starfield (no image); dark = ink gradient + stars,
          light = dawn gradient. Bottoms out near the page color for a seamless hand-off. */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{ background: 'var(--hero-backdrop)' }}
        >
          {isDark && [...Array(70)].map((_, i) => (
            <span
              key={i}
              className="hero-star absolute rounded-full bg-white"
              style={{
                width: i % 11 === 0 ? 2.4 : 1.3,
                height: i % 11 === 0 ? 2.4 : 1.3,
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 90}%`,
                // Per-star twinkle: stable, desynced timing (see .hero-star in index.css).
                '--star-o': 0.1 + ((i * 17) % 55) / 100,
                '--star-dur': `${4.5 + ((i * 13) % 45) / 10}s`,
                '--star-delay': `${((i * 29) % 80) / 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legibility scrim — darkens the copy side, leaves the instrument lit. */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(var(--hero-scrim-rgb),0.93) 0%, rgba(var(--hero-scrim-rgb),0.55) 40%, rgba(var(--hero-scrim-rgb),0) 70%)'
            : 'linear-gradient(90deg, rgba(var(--hero-scrim-rgb),0.92) 0%, rgba(var(--hero-scrim-rgb),0.5) 42%, rgba(var(--hero-scrim-rgb),0) 72%)',
        }}
      />
      <div className="cinematic-vignette" style={{ zIndex: 2 }} />

      {/* Seamless hand-off — pin the lower edge to the exact page background
          (`--color-primary`) so the vignette's edge-darkening doesn't leave a
          seam against the sections below. Below the astrolabe (z-3) so the
          instrument stays crisp. */}
      {isDark && (
        <div
          className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none h-1/3"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--color-primary) 96%)' }}
        />
      )}

      {/* ===== The astrolabe ===== */}
      <div
        ref={canvasWrapRef}
        aria-hidden="true"
        className="absolute z-[3] pointer-events-none aspect-square left-1/2 -translate-x-1/2 top-[3%] w-[62vw] max-w-[300px] opacity-[0.32]
                   md:left-auto md:translate-x-0 md:right-[5%] md:top-1/2 md:-translate-y-1/2 md:w-[min(36vw,440px)] md:max-w-none md:opacity-[0.82]"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* Shared compass rose at the heart of the instrument (assembles in last). */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[20%] aspect-square -translate-x-1/2 -translate-y-1/2"
          initial={prefersReduced ? false : { scale: 0, rotate: -120, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16, delay: prefersReduced ? 0 : 1.7 }}
        >
          <CompassRose className="w-full h-full opacity-90" />
        </motion.div>
      </div>

      {/* ===== Spin control — flicks the needle into a free spin (real flywheel
          friction). Hidden under reduced motion. Two distinct treatments: ===== */}

      {/* DESKTOP: a discrete button on the instrument's lower rim, where the
          astrolabe lives off to the right in clear space. */}
      {!prefersReduced && (
        <div className="hidden md:block absolute z-20 pointer-events-none aspect-square
                        right-[5%] top-1/2 -translate-y-1/2 w-[min(36vw,440px)]">
          <div className="absolute left-1/2 -translate-x-1/2 w-11 h-11 bottom-0 translate-y-1/2">
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: '1px solid var(--color-ember)' }}
              initial={{ opacity: 0 }}
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ delay: 2.4, duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.button
              type="button"
              onClick={spinAstrolabe}
              data-cursor="hover"
              aria-label={t('hero.spin')}
              className="pointer-events-auto relative grid place-items-center w-11 h-11 rounded-full backdrop-blur-sm"
              style={{ background: 'rgba(var(--hero-scrim-rgb), 0.5)', border: '1px solid var(--color-card-border)', color: 'var(--color-ember)' }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, type: 'spring', stiffness: 220, damping: 18 }}
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9, rotate: 220 }}
            >
              <RefreshCcw size={17} strokeWidth={1.75} />
            </motion.button>
          </div>
        </div>
      )}

      {/* MOBILE: the WHOLE instrument is the tap target (a bright button in the
          middle read as a disconnected dot; at the bottom rim it collided with the
          title on short devices). A subtle rotate glyph at the pivot signals "this
          responds", and a one-time hint teaches the gesture — both sit at the box
          centre, which stays clear of the title on every screen size. */}
      {!prefersReduced && (
        <div className="md:hidden absolute z-20 aspect-square left-1/2 -translate-x-1/2 top-[3%] w-[62vw] max-w-[300px]">
          <button
            type="button"
            onClick={spinAstrolabe}
            aria-label={t('hero.spin')}
            className="absolute inset-[8%] rounded-full pointer-events-auto"
          />
          {/* subtle hub affordance at the pivot (part of the instrument, not a button) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center pointer-events-none">
            <motion.span
              className="absolute w-10 h-10 rounded-full"
              style={{ border: '1px solid var(--color-ember)' }}
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ delay: 2, duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
            />
            <span className="grid place-items-center w-9 h-9 rounded-full"
              style={{ color: 'var(--color-ember)', background: 'rgba(var(--hero-scrim-rgb), 0.32)', border: '1px solid var(--color-card-border)', opacity: 0.72 }}>
              <RefreshCcw size={15} strokeWidth={1.75} />
            </span>
            <AnimatePresence>
              {spinHint && (
                <motion.span
                  className="absolute top-full mt-3 whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase"
                  style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)' }}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                >
                  {t('hero.spinHint')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Bearing readout (desktop, pointer devices). */}
      <div className="hidden md:block absolute z-[5] bottom-[12%] right-[7%] pointer-events-none">
        <span
          ref={bearingRef}
          className="font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--color-text-muted)' }}
        >
          bearing 000° · origin
        </span>
      </div>

      {/* ===== Copy ===== */}
      <div ref={copyRef} className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end pb-28 md:justify-center md:pb-0">
        <div className="max-w-xl">
          <h1 className="font-chronicle font-semibold leading-[0.86] tracking-tight" style={{ color: 'var(--color-text)' }}>
            <span className="hero-line block overflow-hidden pb-[0.18em] -mb-[0.14em]"><span className="block text-[clamp(56px,12vw,150px)]">{firstName}</span></span>
            <span className="hero-line block overflow-hidden pb-[0.18em] -mb-[0.14em]"><span className="block text-[clamp(56px,12vw,150px)]">{lastName}</span></span>
          </h1>

          <p className="hero-tagline font-chronicle italic mt-3 text-[clamp(20px,3vw,34px)]" style={{ color: 'var(--color-ember)' }}>
            {t('hero.lead')}{' '}
            <span className="relative inline-grid align-baseline">
              {/* invisible sizer reserves the widest phrase so the line never reflows */}
              <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{longestPhrase}</span>
              <span className="col-start-1 row-start-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${i18n.language}:${safeIdx}`}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block whitespace-nowrap"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {current}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </p>

          {/* Proof strip — the one quiet, subtle signal of role-fit under the name
              (years · stack · role). The prose intro lives in About; the hero stays
              minimal and cinematic. Stacks cleanly on mobile. */}
          {proof.length > 0 && (
            <ul className="hero-proof mt-7 flex flex-col sm:flex-row sm:items-center gap-y-1.5 sm:gap-x-3 font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
              {proof.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="hidden sm:inline opacity-40" style={{ color: 'var(--color-ember)' }}>·</span>}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="hero-cta mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => { track('hero_cta', { target: 'projects' }); scrollToSection('projects'); }} data-cursor="hover" className="btn-primary">{t('hero.ctaPrimary')}</button>
            <button onClick={() => { track('hero_cta', { target: 'contact' }); scrollToSection('contact'); }} data-cursor="hover" className="btn-secondary">
              {t('hero.ctaSecondary')}
            </button>
            {/* Résumé is the third CTA on ≥sm; on phones it's dropped here (it
                lives in the menu's Quick row) so the hero shows a clean two-CTA
                row and the location line stays high (R4). Wrapper span carries the
                hide — `.btn-secondary` sets its own display, so `hidden` on the
                anchor itself wouldn't win. */}
            <span className="hidden sm:contents">
              <a href={personalInfo.resumeLink} target="_blank" rel="noopener noreferrer" onClick={() => track('hero_cta', { target: 'resume' })} data-cursor="hover" className="btn-secondary">
                <Download size={15} strokeWidth={1.75} /> {t('hero.ctaResume')}
              </a>
            </span>
          </div>

          <div className="hero-meta mt-8 font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            {personalInfo.location}
          </div>
        </div>
      </div>

      {/* Scroll cue — desktop only. On a phone it's redundant (scrolling is the
          assumed gesture) and, sitting below the CTAs, it pulls the eye away from
          them; the cramped hero is better without it. */}
      <div className="hero-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-text-muted)' }}>{t('hero.scroll')}</span>
        <div className="w-px h-12 overflow-hidden" style={{ background: 'var(--color-card-border)' }}>
          <div className="w-px h-5 animate-[scrollcue_1.8s_ease-in-out_infinite]" style={{ background: 'var(--color-ember)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
