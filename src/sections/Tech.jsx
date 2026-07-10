import { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useTranslation } from 'react-i18next';
import { Webhook } from 'lucide-react';
import { SectionWrapper } from '../hoc';
import { skillCategories, chapters } from '../constants';
import { ChapterHeading, CompassRose } from '../components';
import { useThemeStore } from '../store/useThemeStore';
import { sound, playCue } from '../lib/sound';
import { track } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger, Flip);

// Each category owns one concentric ring (inner → outer), each revolving at its
// own pace and direction — a solar system of skills. Inner rings move faster.
const CAT_RING = { Frontend: 130, Backend: 230, 'DevOps & Craft': 330 };
const RING_CFG = {
  Frontend: { dur: 250, dir: 'cw' },
  Backend: { dur: 400, dir: 'cw' },
  'DevOps & Craft': { dur: 800, dir: 'cw' },
};
// Canvas sized to the outermost ring (r 340) + its curved title above (r+25)
// and the node labels below, with ~30px breathing room on every edge.
const CX = 410;
const CY = 390;
const W = 820;
const H = 790;
const shortName = (n) => n.split(/[/·]/)[0].trim();

// The arsenal has two presentations of the same data: the revolving SKY-CHART
// (the moment) and the editorial INVENTORY (the readable manifest). The choice
// persists — a returning visitor keeps the view they preferred.
const VIEW_KEY = 'arsenal-view';
const readViewPref = () => {
  try { return window.localStorage.getItem(VIEW_KEY) === 'inventory' ? 'inventory' : 'orbit'; }
  catch { return 'orbit'; }
};

/* ---------------- Orbital field (desktop) ---------------- */
const OrbitalField = ({ frozen = false, ignite = false, onSeen }) => {
  const { t } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === 'dark';
  const [activeCat, setActiveCat] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [inView, setInView] = useState(true);
  const [links, setLinks] = useState([]);
  const fieldRef = useRef(null);
  const nodeRefs = useRef(new Map());
  const blipStep = useRef(0);
  const hoveredTools = useRef(new Set()); // unique tools the visitor explored
  const hoverSent = useRef(false);

  // Precompute each ring + its nodes' polar offsets (relative to centre).
  // `pi` = running index across the primaries (staggers the ignition blooms).
  const rings = useMemo(() => {
    let pi = 0;
    return skillCategories.map((cat, ci) => {
      const r = CAT_RING[cat.category] ?? 200;
      const n = cat.skills.length;
      const nodes = cat.skills.map((s, i) => {
        // half-step offset keeps the 12-o'clock gap clear for the curved label
        const a = (-90 + 180 / n + (i * 360) / n + ci * 10) * (Math.PI / 180);
        return {
          key: `${cat.category}-${s.name}`,
          name: s.name,
          short: shortName(s.name),
          primary: s.tier === 'primary',
          pi: s.tier === 'primary' ? pi++ : -1,
          logo: s.icon || null,
          logoDark: s.iconDark || null, // theme variant for monochrome wordmarks
          cat: cat.category,
          // Core (primary) discs run markedly larger than the rest so the core
          // stack reads at a glance — the visual encoding IS the legend now (the
          // old "ringed bodies are the core" caption was retired, 2026-07 pass).
          size: s.tier === 'primary' ? 64 : 42,
          rx: Math.cos(a) * r,
          ry: Math.sin(a) * r,
        };
      });
      return { cat: cat.category, r, ci, nodes, ...RING_CFG[cat.category] };
    });
  }, []);

  const activeNode = useMemo(
    () => rings.flatMap((r) => r.nodes).find((n) => n.key === activeKey) || null,
    [rings, activeKey]
  );

  // Pause the whole field when it scrolls off-screen (perf).
  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) onSeen?.(); // first sighting arms the ignition
      // Analytics: when the arsenal scrolls away, report how many distinct tools
      // the visitor actually hovered (0 = ignored). Once per session.
      if (!e.isIntersecting && !hoverSent.current && hoveredTools.current.size > 0) {
        hoverSent.current = true;
        track('arsenal_tools_hovered', { count: hoveredTools.current.size });
      }
    }, { threshold: 0.04 });
    io.observe(el);
    return () => io.disconnect();
  }, [onSeen]);

  // Constellation links are MEASURED from the live (paused) node positions, so
  // they stay correct even though the ring revolves. Trimmed to disc edges.
  useEffect(() => {
    if (!activeNode) { setLinks([]); return; }
    const raf = requestAnimationFrame(() => {
      const field = fieldRef.current;
      const aEl = nodeRefs.current.get(activeNode.key);
      if (!field || !aEl) return;
      const fr = field.getBoundingClientRect();
      const ab = aEl.getBoundingClientRect();
      const ax = ab.left + ab.width / 2 - fr.left;
      const ay = ab.top + ab.height / 2 - fr.top;
      const siblings = rings.find((r) => r.cat === activeNode.cat).nodes;
      const out = [];
      siblings.forEach((t) => {
        if (t.key === activeNode.key) return;
        const bEl = nodeRefs.current.get(t.key);
        if (!bEl) return;
        const bb = bEl.getBoundingClientRect();
        const bx = bb.left + bb.width / 2 - fr.left;
        const by = bb.top + bb.height / 2 - fr.top;
        const dx = bx - ax, dy = by - ay;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        const t1 = activeNode.size / 2 + 3, t2 = t.size / 2 + 3;
        out.push({ key: t.key, x1: ax + ux * t1, y1: ay + uy * t1, x2: bx - ux * t2, y2: by - uy * t2 });
      });
      setLinks(out);
    });
    return () => cancelAnimationFrame(raf);
  }, [activeKey, rings, activeNode]);

  const enter = (cat, key) => {
    if (key !== activeKey) playCue('blip', { step: blipStep.current++ }); // little arpeggio across the orbit
    hoveredTools.current.add(key); // analytics: how many distinct tools were explored
    setActiveCat(cat); setActiveKey(key);
  };
  const leave = () => { setActiveCat(null); setActiveKey(null); };

  return (
    <div ref={fieldRef} className="relative mx-auto max-w-full" style={{ width: W, height: H }}
      onMouseLeave={() => { setActiveCat(null); setActiveKey(null); }}>

      {/* static layer — orbit rings + curved titles (these never rotate) */}
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {rings.map(({ cat, r }) => {
          const on = activeCat === cat;
          const tr = r + 25; // push the curved title well clear of the ring & its nodes
          return (
            <g key={cat} data-orbit-ring>
              <circle cx={CX} cy={CY} r={r} fill="none" stroke="var(--color-ember)"
                strokeWidth={on ? 1.4 : 1.2} strokeDasharray="2 7"
                style={{ opacity: on ? 0.72 : 0.5, transition: 'opacity 0.4s ease' }} />
              <path id={`ring-${r}`} fill="none" d={`M ${CX - tr},${CY} A ${tr},${tr} 0 0,1 ${CX + tr},${CY}`} />
              <text dy="-2" textAnchor="middle"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.34em', fill: 'var(--color-ember)', opacity: on ? 0.92 : 0.5, transition: 'opacity 0.4s ease' }}>
                <textPath href={`#ring-${r}`} startOffset="50%">{cat.toUpperCase()}</textPath>
              </text>
            </g>
          );
        })}
      </svg>

      {/* constellation links — measured, drawn UNDER the nodes */}
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`} data-orbit-links>
        {links.map((l) => (
          <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="var(--color-ember)" strokeWidth="1.1" opacity="0.4" strokeLinecap="round" />
        ))}
      </svg>

      {/* core — celestial compass sigil ("you are here"), slow rotation */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center" data-orbit-corewrap
        style={{ left: CX, top: CY, width: 180, height: 180,
          background: 'radial-gradient(circle, rgba(var(--color-ember-rgb),0.16) 0%, transparent 65%)' }}>
        <div className="relative grid place-items-center rounded-full" data-orbit-core
          style={{ width: 104, height: 104, background: 'var(--gradient-card)',
            border: '1px solid rgba(var(--color-ember-rgb),0.4)', boxShadow: '0 0 30px rgba(var(--color-ember-rgb),0.18) inset, 0 0 24px rgba(var(--color-ember-rgb),0.12)' }}>
          <span className="absolute rounded-full" style={{ inset: 9, border: '1px solid rgba(var(--color-ember-rgb),0.18)' }} />
          <CompassRose />
        </div>
        <span className="absolute whitespace-nowrap" style={{ top: '100%', marginTop: 2, fontSize: 9.5, fontWeight: 600,
          letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--color-text-muted)', opacity: 0.7 }}>
          {t('arsenal.coreLabel')}
        </span>
      </div>

      {/* revolving rings of nodes — the ring rotates, each node counter-rotates upright */}
      {rings.map((ring) => {
        const paused = !inView || frozen || activeCat === ring.cat;
        const ringAnim = ring.dir === 'cw' ? 'orbit-cw' : 'orbit-ccw';
        const nodeAnim = ring.dir === 'cw' ? 'orbit-ccw' : 'orbit-cw';
        return (
          <div key={ring.cat} className="absolute"
            style={{ left: CX, top: CY, width: 0, height: 0, zIndex: activeCat === ring.cat ? 5 : 2,
              animation: `${ringAnim} ${ring.dur}s linear infinite`, animationPlayState: paused ? 'paused' : 'running', willChange: 'transform' }}>
            {ring.nodes.map((node) => {
              const dim = activeCat && node.cat !== activeCat;
              const active = activeKey === node.key;
              const inActiveCat = node.cat === activeCat;
              const glyph = node.primary ? 30 : 22;
              const logo = isDark && node.logoDark ? node.logoDark : node.logo;
              return (
                <div key={node.key} className="absolute" style={{ left: 0, top: 0, transform: `translate(${node.rx}px, ${node.ry}px)` }}>
                  <button
                    ref={(el) => { if (el) nodeRefs.current.set(node.key, el); else nodeRefs.current.delete(node.key); }}
                    data-cursor="hover" data-orbit-node aria-label={node.name}
                    onMouseEnter={() => enter(node.cat, node.key)} onMouseLeave={leave}
                    onFocus={() => enter(node.cat, node.key)} onBlur={leave}
                    /* `relative` is load-bearing: the disc span is `absolute inset-0`
                       and, without it, resolved against the 0×0 orbit wrapper —
                       every node's disc (and the core highlight) rendered at 0px.
                       Pre-existing; surfaced by the v2.0 "can't see the cores" note. */
                    className="group relative grid place-items-center rounded-full transition-opacity duration-300"
                    style={{ width: node.size, height: node.size, marginLeft: -node.size / 2, marginTop: -node.size / 2,
                      opacity: dim ? 0.22 : 1,
                      animation: `${nodeAnim} ${ring.dur}s linear infinite`, animationPlayState: paused ? 'paused' : 'running' }}
                  >
                    {/* Ringed planet (v2.0 D3 ×3) — the primary is MARKED, not lit:
                        solid ground under the logo, ember border, and a slow dashed
                        halo. Glow only on hover + the one-time ignition bloom. */}
                    {node.primary && <span className="orbit-halo" aria-hidden="true" />}
                    <span data-orbit-disc
                      className={`orbit-disc rounded-full realm-card group-hover:scale-[1.18]${node.primary ? ' orbit-disc--sun' : ''}${ignite && node.primary ? ' orbit-ignite' : ''}`}
                      /* position + radius are INLINE on purpose: .realm-card sits
                         later in the cascade and silently beat the Tailwind
                         `absolute` (disc rendered 0-sized since this section
                         shipped) and `rounded-full` (squircle, not a planet). */
                      style={{ position: 'absolute', inset: 0, borderRadius: '9999px',
                        transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                        ...(node.primary ? { '--ignite-i': node.pi } : {}),
                        ...(inActiveCat && !node.primary ? { background: 'var(--color-card-bg)' } : {}) }} />
                    <span data-orbit-glyph data-flip-id={node.key}
                      className="relative grid place-items-center pointer-events-none"
                      style={{ width: glyph, height: glyph }}>
                      {logo ? (
                        <img src={logo} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <Webhook size={glyph - 2} strokeWidth={1.6} style={{ color: 'var(--color-ember)' }} />
                      )}
                    </span>
                    <span data-orbit-label className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-medium pointer-events-none transition-all duration-300"
                      style={{ top: '100%', marginTop: 5,
                        fontSize: node.primary ? 11.5 : 10.5,
                        fontWeight: node.primary ? 600 : 500,
                        color: active || node.primary ? 'var(--color-ember)' : 'var(--color-text-muted)',
                        opacity: dim ? 0.3 : active ? 1 : node.primary ? 0.95 : 0.6,
                        ...(inActiveCat ? { background: 'var(--color-primary)', padding: '1px 7px', borderRadius: 6 } : {}) }}>
                      {node.short}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/* ---------------- Inventory (the cartographer's manifest) ----------------
   The same sky, committed to paper: an editorial three-column index. Rows are
   deliberately non-interactive (no hover response on non-clickable surfaces).
   `withEntrance` gates the framer entrance — false when the view arrives via
   the flip transition (GSAP choreographs the entrance instead). */
const InventoryView = ({ invRef, withEntrance }) => {
  const { t } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === 'dark';
  const entrance = useRef(withEntrance).current; // captured at mount
  return (
    <div ref={invRef} className="arsenal-inv">
      <motion.div className="arsenal-inv__grid"
        initial={entrance ? { opacity: 0, y: 24 } : false}
        whileInView={entrance ? { opacity: 1, y: 0 } : undefined}
        viewport={entrance ? { once: true } : undefined}
        transition={{ duration: 0.55 }}>
        {skillCategories.map((cat, ci) => (
          <section key={cat.category}>
            <header className="arsenal-inv__head" data-inv-head>
              <span className="arsenal-inv__no">{String(ci + 1).padStart(2, '0')}</span>
              <h3 className="arsenal-inv__cat font-chronicle">{cat.category}</h3>
            </header>
            <span className="arsenal-inv__rule" data-inv-rule aria-hidden="true" />
            <ul className="arsenal-inv__rows">
              {cat.skills.map((s) => {
                const primary = s.tier === 'primary';
                const logo = isDark && s.iconDark ? s.iconDark : s.icon;
                return (
                  <li key={s.name} className="arsenal-inv__row" data-primary={primary || undefined}>
                    <span className="arsenal-inv__glyph" data-flip-id={`${cat.category}-${s.name}`}>
                      {logo ? <img src={logo} alt="" /> : <Webhook size={16} strokeWidth={1.6} style={{ color: 'var(--color-ember)' }} />}
                    </span>
                    <span className="arsenal-inv__name" data-inv-text>{s.name}</span>
                    {primary && (
                      <span className="arsenal-inv__star" data-inv-text>
                        <span aria-hidden="true">✦</span>
                        <span className="sr-only">{t('arsenal.coreSr')}</span>
                      </span>
                    )}
                    <span className="arsenal-inv__line" data-inv-line aria-hidden="true" />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </motion.div>
    </div>
  );
};

/* ---------------- View toggle (sky-chart ⇄ inventory) ---------------- */
const ViewGlyph = ({ v }) => (v === 'orbit' ? (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5.6" stroke="currentColor" strokeWidth="1" strokeDasharray="1.8 2.6" />
    <circle cx="7" cy="7" r="1.8" fill="currentColor" />
  </svg>
) : (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 3.2h12M1 7h8.5M1 10.8h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
));

const ViewToggle = ({ view, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="arsenal-view" role="group" aria-label={t('arsenal.viewToggle')}>
      {['orbit', 'inventory'].map((v) => (
        <button key={v} type="button" data-cursor="hover" className="arsenal-view__btn"
          aria-pressed={view === v} onClick={() => onChange(v)}>
          {view === v && (
            <motion.span layoutId="arsenal-view-thumb" className="arsenal-view__thumb"
              transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
          )}
          <span className="arsenal-view__glyph"><ViewGlyph v={v} /></span>
          <span className="arsenal-view__txt">{t(v === 'orbit' ? 'arsenal.viewChart' : 'arsenal.viewInventory')}</span>
        </button>
      ))}
    </div>
  );
};

/* ---------------- The field + the cinematic view swap ----------------
   Orbit → inventory: "the sky committed to paper" — rings fold into the core,
   every glyph flies (GSAP Flip) to its row in the manifest, rules draw in.
   Inventory → orbit: the page unfurls back into sky. The logos are the shared
   elements; both views stay mounted only for the flight. */
const ArsenalField = ({ view, onViewChange }) => {
  const { t } = useTranslation();
  const [transitioning, setTransitioning] = useState(false);
  const transRef = useRef(false);
  const [ignite, setIgnite] = useState(false);
  const igniteUsed = useRef(false);
  const igniteTimer = useRef(null);
  // One-time "skim as a list" nudge — the Inventory view is the fast-skim value,
  // but under-discovered. It's triggered when the orbit is actually SCROLLED INTO
  // VIEW (not at mount — the field mounts at page load, so a mount timer expired
  // long before anyone reached the section). Shows once (persisted), only in the
  // orbit view, then retires for good so a returning visitor is never nagged.
  const [showCoach, setShowCoach] = useState(false);
  const coachSeen = useRef(false);
  const coachFired = useRef(false);
  const coachTimers = useRef([]);
  useEffect(() => {
    const timers = coachTimers.current;
    try { coachSeen.current = window.localStorage.getItem('arsenal-skim-coach') === 'seen'; } catch { /* private mode */ }
    return () => timers.forEach(clearTimeout);
  }, []);
  const dismissCoach = useCallback(() => {
    setShowCoach(false);
    coachTimers.current.forEach(clearTimeout);
    if (coachSeen.current) return;
    coachSeen.current = true;
    try { window.localStorage.setItem('arsenal-skim-coach', 'seen'); } catch { /* private mode */ }
  }, []);
  const maybeCoach = useCallback(() => {
    if (coachFired.current || coachSeen.current) return;
    coachFired.current = true;
    coachTimers.current.push(setTimeout(() => setShowCoach(true), 1200));
    coachTimers.current.push(setTimeout(() => dismissCoach(), 9600));
  }, [dismissCoach]);
  const orbitSeen = useRef(false);
  const orbitWrapRef = useRef(null);
  const invRef = useRef(null);
  const flipStateRef = useRef(null);
  const pendingRef = useRef(null);
  const tlRef = useRef(null);

  const maybeIgnite = useCallback(() => {
    if (igniteUsed.current || !orbitSeen.current || transRef.current) return;
    igniteUsed.current = true;
    setIgnite(true);
    // Drop the class once the staggered blooms finish so a later remount of
    // the orbit (view swap) doesn't replay the one-time moment.
    igniteTimer.current = setTimeout(() => setIgnite(false), 3400);
  }, []);
  const handleOrbitSeen = useCallback(() => { orbitSeen.current = true; maybeIgnite(); maybeCoach(); }, [maybeIgnite, maybeCoach]);
  useEffect(() => () => { clearTimeout(igniteTimer.current); tlRef.current?.kill(); }, []);

  const handleView = (next) => {
    if (next === view || transRef.current) return;
    const src = next === 'inventory' ? orbitWrapRef.current : invRef.current;
    if (src) {
      // Capture the glyphs' on-screen positions BEFORE the target view mounts;
      // the layout effect below runs the flight once both views exist.
      flipStateRef.current = Flip.getState(src.querySelectorAll('[data-flip-id]'));
      pendingRef.current = next === 'inventory' ? 'fold' : 'unfurl';
      if (next === 'inventory') orbitWrapRef.current?.classList.add('is-departing');
      transRef.current = true;
      setTransitioning(true);
    }
    if (next === 'inventory') dismissCoach(); // acted on the nudge — retire it
    try { window.localStorage.setItem(VIEW_KEY, next); } catch { /* private mode */ }
    track('arsenal_view_switched', { view: next });
    onViewChange(next);
  };

  const endTransition = useCallback(() => {
    orbitWrapRef.current?.classList.remove('is-arriving', 'is-departing');
    transRef.current = false;
    setTransitioning(false);
    maybeIgnite(); // a first-ever arrival into the orbit ignites after landing
  }, [maybeIgnite]);

  useLayoutEffect(() => {
    const dir = pendingRef.current;
    if (!dir) return undefined;
    pendingRef.current = null;
    const state = flipStateRef.current;
    flipStateRef.current = null;
    const orbitEl = orbitWrapRef.current;
    const invEl = invRef.current;
    if (!state || !orbitEl || !invEl) { endTransition(); return undefined; }

    // Deliberately NOT gsap.context(): context.revert() on the next swap would
    // also revert the landed end-state styles. A one-shot timeline killed on
    // unmount is the leak-safe shape here (standards §4 intent).
    const tl = gsap.timeline({ onComplete: endTransition });
    tlRef.current = tl;

    if (dir === 'fold') {
      // The sky committed to paper. The inventory's glyphs fly; hide the orbit's.
      gsap.set(orbitEl.querySelectorAll('[data-orbit-glyph]'), { autoAlpha: 0 });
      tl.to(orbitEl.querySelectorAll('[data-orbit-node]'), { opacity: 0, duration: 0.4, ease: 'power2.in', stagger: { each: 0.006, from: 'random' } }, 0)
        .to(orbitEl.querySelector('[data-orbit-links]'), { opacity: 0, duration: 0.2 }, 0)
        .to(orbitEl.querySelectorAll('[data-orbit-ring]'), { scale: 0.08, opacity: 0, svgOrigin: `${CX} ${CY}`, duration: 0.75, ease: 'power3.in', stagger: 0.09 }, 0)
        .to(orbitEl.querySelector('[data-orbit-core]'), { scale: 0.5, opacity: 0, duration: 0.6, ease: 'power3.in' }, 0.2)
        .to(orbitEl.querySelector('[data-orbit-corewrap]'), { opacity: 0, duration: 0.5, ease: 'power2.in' }, 0.25)
        .add(Flip.from(state, {
          targets: invEl.querySelectorAll('[data-flip-id]'),
          duration: 0.95, ease: 'power3.inOut', stagger: { each: 0.03 }, scale: true,
        }), 0.08)
        .fromTo(invEl.querySelectorAll('[data-inv-head]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1 }, 0.35)
        .fromTo(invEl.querySelectorAll('[data-inv-rule]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 0.65, ease: 'power3.inOut', stagger: 0.1 }, 0.42)
        .fromTo(invEl.querySelectorAll('[data-inv-line]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 0.5, ease: 'power2.out', stagger: 0.018 }, 0.5)
        .fromTo(invEl.querySelectorAll('[data-inv-text]'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.02 }, 0.55);
      playCue('chartFold');
    } else {
      // The page unfurled back into sky. The orbit's glyphs fly; hide the inventory's.
      orbitEl.classList.add('is-arriving');
      gsap.set(invEl.querySelectorAll('[data-flip-id]'), { autoAlpha: 0 });
      tl.to(invEl.querySelectorAll('[data-inv-text], [data-inv-head]'), { opacity: 0, x: -8, duration: 0.3, ease: 'power2.in', stagger: 0.006 }, 0)
        .to(invEl.querySelectorAll('[data-inv-line], [data-inv-rule]'), { scaleX: 0, transformOrigin: 'left center', duration: 0.35, ease: 'power2.in', stagger: 0.006 }, 0.02)
        .fromTo(orbitEl.querySelectorAll('[data-orbit-ring]'), { scale: 0.08, opacity: 0 }, { scale: 1, opacity: 1, svgOrigin: `${CX} ${CY}`, duration: 0.9, ease: 'power3.out', stagger: 0.1, clearProps: 'transform,opacity' }, 0.15)
        .fromTo(orbitEl.querySelector('[data-orbit-corewrap]'), { opacity: 0 }, { opacity: 1, duration: 0.6, clearProps: 'opacity' }, 0.3)
        .fromTo(orbitEl.querySelector('[data-orbit-core]'), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.6)', clearProps: 'transform,opacity' }, 0.35)
        .fromTo(orbitEl.querySelectorAll('[data-orbit-disc]'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)', stagger: { each: 0.012, from: 'random' }, clearProps: 'transform,opacity' }, 0.35)
        .add(Flip.from(state, {
          targets: orbitEl.querySelectorAll('[data-orbit-glyph]'),
          duration: 0.95, ease: 'power3.inOut', stagger: { each: 0.025 }, scale: true,
        }), 0.1)
        // lifting the gate lets the labels fade back in via their own transition
        .call(() => orbitEl.classList.remove('is-arriving'), null, 0.85);
      playCue('chartUnfurl');
    }
    return () => { tl.kill(); };
  }, [view, endTransition]);

  const showOrbit = view === 'orbit' || transitioning;
  const showInv = view === 'inventory' || transitioning;

  return (
    <div className="mt-6">
      <div className="relative mx-auto max-w-full" style={{ width: W }}>
        <ViewToggle view={view} onChange={handleView} />
        {/* One-time skim nudge — sits just under the toggle it points to. */}
        <AnimatePresence>
          {showCoach && view === 'orbit' && (
            <motion.button key="coach" type="button" data-cursor="hover"
              className="arsenal-skim-coach"
              onClick={() => handleView('inventory')}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}>
              {t('arsenal.skimCoach')}
            </motion.button>
          )}
        </AnimatePresence>
        <div className="relative" style={{ height: H }}>
          {showOrbit && (
            <div ref={orbitWrapRef} className="absolute inset-0">
              <OrbitalField frozen={transitioning} ignite={ignite} onSeen={handleOrbitSeen} />
            </div>
          )}
          {showInv && <InventoryView invRef={invRef} withEntrance={view === 'inventory' && !transitioning} />}
        </div>
      </div>
      {/* The decode-line slot. Orbit needs no legend now — the larger core discs
          say it themselves. Inventory keeps its ✦ key. */}
      <AnimatePresence mode="wait" initial={false}>
        {view === 'inventory' && (
          <motion.p key="inv" className="orbit-legend" aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}>
            <span className="orbit-legend__star">✦</span> {t('arsenal.inventoryLegend')}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------- Cluster fallback (tablet / mobile / reduced-motion) ---------------- */
const Clusters = () => (
  <div className="grid md:grid-cols-3 gap-6 mt-12">
    {skillCategories.map((cat, i) => (
      <motion.div key={cat.category} className="realm-card p-7"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.5 }}>
        <h3 className="font-chronicle font-semibold text-[24px]" style={{ color: 'var(--color-text)' }}>{cat.category}</h3>
        <p className="text-[13px] mb-5" style={{ color: 'var(--color-text-muted)' }}>{cat.blurb}</p>
        <div className="flex flex-wrap gap-2.5">
          {cat.skills.map((s) => {
            const primary = s.tier === 'primary';
            return (
              <span key={s.name} className="inline-flex items-center gap-1.5 rounded-full font-medium"
                style={{
                  padding: primary ? '7px 14px' : '5px 12px',
                  fontSize: primary ? 14 : 13,
                  color: primary ? 'var(--color-ember)' : 'var(--color-text)',
                  background: primary ? 'rgba(var(--color-ember-rgb),0.1)' : 'rgba(var(--color-accent-rgb),0.06)',
                  border: `1px solid ${primary ? 'rgba(var(--color-ember-rgb),0.4)' : 'var(--color-card-border)'}`,
                }}>
                {s.name}
              </span>
            );
          })}
        </div>
      </motion.div>
    ))}
  </div>
);

const Tech = () => {
  const { t } = useTranslation();
  const [orbital, setOrbital] = useState(false);
  const [view, setView] = useState(readViewPref);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setOrbital(mq.matches && !rm.matches);
    update();
    mq.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => { mq.removeEventListener('change', update); rm.removeEventListener('change', update); };
  }, []);

  // Space hum — the ambience of the orbital field. It ONLY belongs with the orbit,
  // so it's gated to the desktop orbital layout AND the sky-chart view; the
  // inventory is a quiet page — no score. Its level then follows scroll proximity
  // (a natural distance falloff). Safe when muted.
  useEffect(() => {
    if (!orbital || view !== 'orbit') { sound.hum.stop(); return undefined; }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => sound.hum.setLevel(1 - Math.abs(self.progress * 2 - 1)),
      });
    }, sectionRef);
    return () => { sound.hum.stop(); ctx.revert(); };
  }, [orbital, view]);

  return (
    <div ref={sectionRef}>
      <ChapterHeading no={chapters.arsenal.no} eyebrow={t('chapters.arsenal.label')} title={`${t('chapters.arsenal.sub')}.`} align="center" />
      <p className="text-center max-w-xl mx-auto mt-5 text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
        {t('arsenal.subtitle')}
      </p>

      {orbital ? <ArsenalField view={view} onViewChange={setView} /> : <Clusters />}
    </div>
  );
};

export default SectionWrapper(Tech, 'arsenal');
