import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trackOnce } from '../lib/analytics';
import { Briefcase, GraduationCap, Compass, ArrowRight, GitBranch, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import { journey, chapters } from '../constants';
import { ChapterHeading } from '../components';
import { scrollToSection } from '../lib/smoothScroll';
import { playCue } from '../lib/sound';

const KIND_ICON = { work: Briefcase, edu: GraduationCap, cta: Compass };

/* ---- Inner card content (unchanged content; now hangs from the timeline) ---- */
const WaypointBody = ({ w }) => {
  const { t } = useTranslation();
  const Icon = KIND_ICON[w.kind] || Briefcase;
  const isCta = w.kind === 'cta';
  const points = t(`experience.journey.${w.id}.points`, { returnObjects: true });
  const via = w.secondment ? t(`experience.journey.${w.id}.via`, { defaultValue: '' }) : '';
  // Optional quiet "second credential" line under the role/org (R1: surfaces the
  // LL.B. on the Oath card instead of burying it in a paragraph bullet).
  const credential = t(`experience.journey.${w.id}.credential`, { defaultValue: '' });
  return (
    <div className="realm-card relative h-full p-7 flex flex-col overflow-hidden">
      <span
        className="pointer-events-none absolute bottom-5 right-6 font-chronicle font-bold select-none"
        style={{ fontSize: 92, lineHeight: 0.8, color: 'var(--color-text)', opacity: 0.05 }}
        aria-hidden="true"
      >
        {w.year.replace(' — Now', '').replace('Now', '∞')}
      </span>

      <div className="flex items-center gap-2.5 mb-6">
        <span
          className="grid place-items-center w-9 h-9 rounded-lg shrink-0"
          style={{ background: 'rgba(var(--color-ember-rgb),0.12)', border: '1px solid rgba(var(--color-ember-rgb),0.28)' }}
        >
          <Icon size={17} style={{ color: 'var(--color-ember)' }} />
        </span>
        <span className="text-[12px] font-mono tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{w.year}</span>
        {w.current && (
          <span className="ml-auto flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            <span className="status-dot" /> {t('experience.present')}
          </span>
        )}
        {w.secondment && (
          <span
            className="ml-auto flex items-center gap-1.5 text-[10.5px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
            style={{ color: 'var(--color-gold)', background: 'rgba(var(--color-gold-rgb),0.1)', border: '1px solid rgba(var(--color-gold-rgb),0.32)' }}
          >
            <GitBranch size={11} /> {t('experience.onAssignment')}
          </span>
        )}
      </div>

      {via && (
        <p className="flex items-start gap-2 text-[11.5px] leading-snug mb-4 -mt-1" style={{ color: 'var(--color-text-muted)' }}>
          <GitBranch size={13} className="mt-[2px] shrink-0" style={{ color: 'var(--color-gold)' }} />
          <span>{via}</span>
        </p>
      )}

      <p className="chapter-eyebrow !text-[10.5px] mb-2.5">{t(`experience.journey.${w.id}.chapter`)}</p>
      <h3 className="font-chronicle font-semibold text-[clamp(24px,2.2vw,30px)] leading-[1.05]" style={{ color: 'var(--color-text)' }}>
        {t(`experience.journey.${w.id}.role`)}
      </h3>
      <p className="text-[13.5px] mt-1.5" style={{ color: 'var(--color-text-muted)' }}>{t(`experience.journey.${w.id}.org`)}</p>

      {credential && (
        <p className="text-[12.5px] mt-2 flex items-start gap-1.5" style={{ color: 'var(--color-gold)' }}>
          <Scale size={13} className="mt-[2px] shrink-0" strokeWidth={1.75} />
          <span>{credential}</span>
        </p>
      )}

      <p className="font-chronicle italic text-[16.5px] leading-snug mt-4" style={{ color: 'var(--color-ember)' }}>
        {t(`experience.journey.${w.id}.headline`)}
      </p>

      {points.length > 0 && (
        <ul className="mt-5 space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 text-[13px] leading-[1.55]" style={{ color: 'var(--color-text-muted)' }}>
              <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-ember)' }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {isCta && (
        <button
          onClick={() => scrollToSection('contact')}
          data-cursor="hover"
          className="btn-primary inline-flex items-center gap-2 mt-7 self-start"
        >
          {t('experience.summonCta')} <ArrowRight size={16} />
        </button>
      )}

      {w.tech.length > 0 && (
        <div className="mt-8 pt-5 border-t" style={{ borderColor: 'var(--color-card-border)' }}>
          <div className="flex flex-wrap gap-2">
            {w.tech.map((tech) => (
              <span key={tech} className="tech-pill">{tech}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---- Physical prev/next key — spring-squash haptic + press/release click.
   `className` swaps the desktop header "key" for the mobile floating arrow. ---- */
const PhysKey = ({ dir, disabled, onStep, label, icon: Icon, className = 'exp-key' }) => (
  <motion.button
    type="button"
    aria-label={label}
    disabled={disabled}
    data-cursor="hover"
    className={className}
    whileTap={disabled ? undefined : { scale: 0.86 }}
    transition={{ type: 'spring', stiffness: 700, damping: 15 }}
    onPointerDown={() => { if (!disabled) playCue('click'); }}
    onPointerUp={() => { if (!disabled) playCue('click', { up: true }); }}
    onClick={() => { if (!disabled) onStep(dir); }}
  >
    <Icon size={18} strokeWidth={2} />
  </motion.button>
);

/**
 * The Journey — an intentional horizontal timeline (v1.1 Workstream E). We no
 * longer hijack vertical scroll: the page scrolls naturally everywhere, and this
 * strip scrolls horizontally *on intent* — native swipe / trackpad / shift-wheel,
 * with desktop-only physical prev/next keys for ease. The cards hang from the
 * timeline by a thread and sway with real velocity-driven pendulum physics as you
 * move (spring settle when you stop). Reduced-motion → no sway, instant paging.
 */
const Experience = () => {
  const { t } = useTranslation();
  const ch = chapters.work;
  const stripRef = useRef(null);
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [nav, setNav] = useState({ prev: false, next: true, progress: 0 });

  const syncNav = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    const progress = max > 0 ? x / max : 0;
    setNav({ prev: x > 4, next: x < max - 4, progress });
    // How far through the horizontal career journey do people actually get?
    // Milestones only, once each — fires only where a real horizontal scrub
    // exists (desktop); mobile's vertical layout is covered by scroll_depth.
    if (max > 0) {
      const pct = Math.round(progress * 100);
      [25, 50, 75, 100].forEach((m) => { if (pct >= m) trackOnce(`exp:${m}`, 'experience_progress', { pct: m }); });
    }
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return undefined;
    syncNav();
    el.addEventListener('scroll', syncNav, { passive: true });
    window.addEventListener('resize', syncNav);
    return () => { el.removeEventListener('scroll', syncNav); window.removeEventListener('resize', syncNav); };
  }, [syncNav]);

  // The strip owns the wheel ONLY for horizontal intent (v2.0 follow-up: a
  // static data-lenis-prevent made the whole band a vertical-scroll dead zone —
  // Lenis ignored deltaY over it, so the page stuttered whenever the cursor
  // crossed the section). React's root listener fires before Lenis's window
  // listener, so toggling the attribute per-event routes each gesture cleanly:
  // sideways → the timeline, vertical → the page.
  const onStripWheel = useCallback((e) => {
    stripRef.current?.toggleAttribute('data-lenis-prevent', Math.abs(e.deltaX) > Math.abs(e.deltaY));
  }, []);

  // Velocity-driven pendulum sway on the hanging cards (a spring chasing a target
  // set by scroll velocity; settles with overshoot when the strip comes to rest).
  // The rAF loop runs ONLY while the section is on screen, and skips the style
  // write once settled — no idle per-frame cost (v2.0 follow-up).
  useEffect(() => {
    const el = stripRef.current;
    if (!el || reduce) return undefined;
    let raf = 0;
    let running = false;
    let prev = el.scrollLeft;
    let angle = 0;
    let angVel = 0;
    let lastWritten = null;
    const loop = () => {
      if (!running) return;
      const now = el.scrollLeft;
      const vel = now - prev;
      prev = now;
      const target = Math.max(-7, Math.min(7, -vel * 0.16));
      angVel += (target - angle) * 0.10;
      angVel *= 0.82;
      angle += angVel;
      if (vel === 0 && Math.abs(angle) < 0.008 && Math.abs(angVel) < 0.008) angle = 0;
      const next = angle.toFixed(3);
      if (next !== lastWritten) { lastWritten = next; el.style.setProperty('--sway', `${next}deg`); }
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; prev = el.scrollLeft; raf = requestAnimationFrame(loop); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.05 });
    io.observe(el);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); };
  }, [reduce]);

  // Active card = the one centered in the strip (glow + full opacity).
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('wp-active', e.isIntersecting)),
      { root: el, rootMargin: '0px -42% 0px -42%', threshold: 0.01 },
    );
    el.querySelectorAll('.wp').forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const step = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector('.wp');
    const w = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  };

  const total = journey.length;
  const activeIndex = Math.min(total, Math.max(1, Math.round(nav.progress * (total - 1)) + 1));

  return (
    <section id="work" className="overflow-hidden pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <ChapterHeading no={ch.no} eyebrow={t('chapters.work.label')} title={`${t('chapters.work.sub')}.`} />
        <p className="mt-6 max-w-xl text-[17px] leading-[28px]" style={{ color: 'var(--color-text-muted)' }}>
          {t('experience.intro')}
        </p>

        {/* Controls — physical prev/next keys (desktop) · progress · plain hint.
            The hint is a caption, not a control (Beta 1: text that looked clickable). */}
        {/* Controls — desktop shows the physical keys inline; both breakpoints get
            the progress bar + a NN/NN position count (so the number of waypoints
            is obvious). On mobile the paging lives in floating carousel arrows
            over the card (below), so the keys + card are always co-visible. */}
        <div className="mt-8 flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-2">
            <PhysKey dir={-1} disabled={!nav.prev} onStep={step} label={t('experience.prev')} icon={ChevronLeft} />
            <PhysKey dir={1} disabled={!nav.next} onStep={step} label={t('experience.next')} icon={ChevronRight} />
          </div>
          <div className="exp-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(0.1 + nav.progress * 0.9).toFixed(3)})` }} />
          </div>
          <span className="font-mono text-[11.5px] tracking-[0.1em] tabular-nums select-none whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
            {String(activeIndex).padStart(2, '0')}<span className="opacity-40 mx-0.5">/</span>{String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* The timeline strip — native horizontal scroll, snap, keyboard-navigable.
          The peek of the next card + the arrows tell users it swipes sideways. */}
      <div className="relative mt-8">
        <div
          ref={stripRef}
          className="exp-strip"
          tabIndex={0}
          role="group"
          aria-label={t('chapters.work.label')}
          aria-roledescription="carousel"
          onKeyDown={onKeyDown}
          onWheel={onStripWheel}
        >
          <div className="exp-track">
            <div className="exp-line" aria-hidden="true" />
            {journey.map((w, i) => (
              /* Seed the first waypoint active (homepage value audit 2026-07-08):
                 it's centred + snapped at rest, so the current-most role must read
                 at full opacity from first paint — with zero interaction and no
                 dim-flash before the centering IntersectionObserver first fires. */
              <div key={w.id} className={`wp${i === 0 ? ' wp-active' : ''}`} style={{ '--m': (0.82 + (i % 3) * 0.13).toFixed(2) }}>
                <span className="wp-node" aria-hidden="true" />
                <div className="wp-hang">
                  <span className="wp-thread" aria-hidden="true" />
                  <WaypointBody w={w} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: floating carousel arrows over the card edges (a pattern users
            already know). They fade out at the ends. Desktop uses the header keys. */}
        <div className="exp-arrow-wrap exp-arrow-wrap--l md:hidden">
          <PhysKey dir={-1} disabled={!nav.prev} onStep={step} label={t('experience.prev')} icon={ChevronLeft} className="exp-arrow" />
        </div>
        <div className="exp-arrow-wrap exp-arrow-wrap--r md:hidden">
          <PhysKey dir={1} disabled={!nav.next} onStep={step} label={t('experience.next')} icon={ChevronRight} className="exp-arrow" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
