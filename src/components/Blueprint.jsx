import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import {
  User, ScrollText, Waves, CloudSun, AudioLines, Fingerprint, VenetianMask,
  Radar, Send, MapPin, X,
} from 'lucide-react';
import { atelier } from '../constants';
import { track, trackOnce } from '../lib/analytics';
import { playCue } from '../lib/sound';
import { getLenis } from '../lib/smoothScroll';

/* The Blueprint — the runtime system chart. Opens Act II (the overview the two
   drill-down instruments — Observatory, Atlas — then descend into). One claim,
   drawn: everything runs inside the visitor's device ("the client realm"), and
   exactly three named signals ever cross the wall.

   Two bespoke experiences, one topology, one data source
   (constants.atelier.blueprint):

   · Desktop (≥1024px) — a landscape chart on a 1000×560 grid: the traveler
     enters left, the hub sits in a ring of client stations, three edges fan
     RIGHT through a vertical wall to the gates. Hover/focus previews a station
     in the readout; click commits.

   · Mobile — the SAME hub-and-spoke topology on its own 390×610 grid, rotated:
     the client cluster sits ABOVE a horizontal wall, and the three gate edges
     fan DOWN through the wall's only gaps to the gates beneath. Never a list —
     a list reads as a pipeline, and the whole point is that this is not one.

   The SVG layers draw geometry only (aria-hidden); every station is a real
   positioned <button>. Analytics: `blueprint_explore` (trackOnce, first
   interaction) + `blueprint_node_open {id}` (deliberate click/tap only — a
   desktop hover is a preview, never an event). Reduced motion: no draw-in, no
   stagger, no pulse. */

const ICONS = {
  user: User, scroll: ScrollText, waves: Waves, cloudsun: CloudSun,
  audio: AudioLines, fingerprint: Fingerprint, mask: VenetianMask,
  radar: Radar, send: Send, mappin: MapPin,
};

const bp = atelier.blueprint;
const NODE_ORDER = ['traveler', 'shell', ...bp.client.map((n) => n.id), ...bp.gates.map((g) => g.id)];

const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => setDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return desktop;
};

/* A positioned chart station — disc + label as one focusable button whose disc
   center sits exactly on the design-grid coordinate the SVG edges aim at.
   framer owns the transform (it animates scale), so the centering offset rides
   framer's x/y — they compose, never clash. */
const ChartNode = ({ x, y, w, h, icon, kind, sub, active, delay, reduce, label, compact, onPreview, onCommit }) => {
  const Icon = ICONS[icon] ?? User;
  const discPull = kind === 'hub' ? (compact ? -26 : -30) : (compact ? -20 : -22);
  return (
    <motion.button
      type="button"
      className={`bp-node bp-node--${kind}${compact ? ' bp-node--compact' : ''}${active ? ' is-active' : ''}`}
      style={{ left: `${(x / w) * 100}%`, top: `${(y / h) * 100}%`, x: '-50%', y: discPull }}
      initial={reduce ? false : { opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay }}
      data-cursor="hover"
      onMouseEnter={onPreview ? () => onPreview() : undefined}
      onFocus={onPreview ? () => onPreview() : undefined}
      onClick={onCommit}
    >
      <span className="bp-node__disc" aria-hidden="true">
        <Icon size={kind === 'hub' ? (compact ? 19 : 22) : (compact ? 15 : 17)} strokeWidth={1.5} />
      </span>
      <span className="bp-node__name">{label}</span>
      {sub && <span className="bp-node__sub exp-mono">{sub}</span>}
    </motion.button>
  );
};

/* The decision panel — shared by both layouts. */
const Readout = ({ t, active, gateSub }) => (
  <div
    className={`blueprint__readout${active ? ' is-active' : ''}${gateSub ? ' blueprint__readout--gate' : ''}`}
    aria-live="polite"
  >
    <span className="blueprint__readout-head">
      <span className="blueprint__readout-dot" aria-hidden="true" />
      <span className="blueprint__readout-name font-chronicle">
        {active ? t(`atelier.blueprint.nodes.${active}.name`) : t('atelier.blueprint.hint')}
      </span>
      {gateSub && <span className="blueprint__readout-sub exp-mono">{gateSub}</span>}
    </span>
    <span className="blueprint__readout-why">
      {active ? t(`atelier.blueprint.nodes.${active}.why`) : t('atelier.blueprint.readoutRest')}
    </span>
  </div>
);

const gateSubFor = (active) => bp.gates.find((g) => g.id === active)?.sub;

/* ---------------------------------------------------------------- desktop -- */

const DesktopChart = ({ t, active, preview, commit, reduce }) => {
  const [drawn, setDrawn] = useState(false);
  const W = 1000;
  const H = 560;
  const crossY = (g) => bp.hub.y + ((g.y - bp.hub.y) * (bp.wall.x - bp.hub.x)) / (g.x - bp.hub.x);
  const gapYs = bp.gates.map(crossY);
  const gap = 12;

  const ys = [bp.wall.y1, ...gapYs.flatMap((y) => [y - gap, y + gap]), bp.wall.y2];
  const wallSegments = [];
  for (let i = 0; i < ys.length; i += 2) wallSegments.push([ys[i], ys[i + 1]]);

  const edges = [
    { id: 'traveler', x1: bp.traveler.x, y1: bp.traveler.y, x2: bp.hub.x, y2: bp.hub.y },
    ...bp.client.map((n) => ({ id: n.id, x1: bp.hub.x, y1: bp.hub.y, x2: n.x, y2: n.y })),
    ...bp.gates.map((g) => ({ id: g.id, gate: true, x1: bp.hub.x, y1: bp.hub.y, x2: g.x, y2: g.y })),
  ];

  return (
    <motion.div
      className={`blueprint__chart${drawn ? ' is-drawn' : ''}`}
      data-active={active || undefined}
      onViewportEnter={() => setDrawn(true)}
      viewport={{ once: true, amount: 0.35 }}
      role="group"
      aria-label={t('atelier.blueprint.title')}
      onMouseLeave={() => preview(null)}
    >
      {/* the two territories, split exactly where the wall stands */}
      <div className="blueprint__zones">
        <div className="blueprint__zone" style={{ width: `${(bp.wall.x / W) * 100}%` }}>
          <span className="blueprint__zone-name">{t('atelier.blueprint.clientZone')}</span>
          <span className="blueprint__zone-sub">{t('atelier.blueprint.clientZoneSub')}</span>
        </div>
        <div className="blueprint__zone blueprint__zone--beyond">
          <span className="blueprint__zone-name">{t('atelier.blueprint.beyondZone')}</span>
          <span className="blueprint__zone-sub">{t('atelier.blueprint.beyondZoneSub')}</span>
        </div>
      </div>

      <div className="blueprint__stage" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="blueprint__svg" aria-hidden="true" focusable="false">
          {edges.map((e, i) => (
            <line
              key={e.id}
              className={`bp-edge bp-edge--${e.id}${e.gate ? ' bp-edge--gate' : ''}`}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              pathLength="1"
              style={{ '--d': `${0.15 + i * 0.07}s` }}
            />
          ))}

          {bp.gates.map((g) => {
            const a = Math.atan2(g.y - bp.hub.y, g.x - bp.hub.x);
            const tipX = g.x - 34 * Math.cos(a);
            const tipY = g.y - 34 * Math.sin(a);
            const wing = (da) => `${tipX - 9 * Math.cos(a + da)},${tipY - 9 * Math.sin(a + da)}`;
            return (
              <polyline key={g.id} className={`bp-arrow bp-edge--${g.id}`}
                points={`${wing(-0.42)} ${tipX},${tipY} ${wing(0.42)}`} />
            );
          })}

          {wallSegments.map(([a, b]) => (
            <g key={a} className="bp-wall">
              <line x1={bp.wall.x - 2.5} y1={a} x2={bp.wall.x - 2.5} y2={b} />
              <line x1={bp.wall.x + 2.5} y1={a} x2={bp.wall.x + 2.5} y2={b} />
            </g>
          ))}
          {gapYs.map((y) => (
            <circle key={y} className="bp-wall__gate" cx={bp.wall.x} cy={y} r="3.2" />
          ))}

          <line className="bp-ghost"
            x1={bp.hub.x + 14} y1={bp.hub.y + 40}
            x2={bp.ghost.x - 8} y2={bp.ghost.y} />
          <g className="bp-ghost__x" transform={`translate(${bp.ghost.x}, ${bp.ghost.y})`}>
            <line x1="-6" y1="-6" x2="6" y2="6" />
            <line x1="-6" y1="6" x2="6" y2="-6" />
          </g>
        </svg>

        <span className="blueprint__wall-label exp-mono" style={{ left: `${(bp.wall.x / W) * 100}%` }} aria-hidden="true">
          {t('atelier.blueprint.wall')}
        </span>

        <p className="blueprint__sealed"
          style={{ right: `${100 - ((bp.ghost.x - 22) / W) * 100}%`, top: `${(bp.ghost.y / H) * 100}%` }}>
          {t('atelier.blueprint.sealedNote')}
        </p>

        <ChartNode x={bp.traveler.x} y={bp.traveler.y} w={W} h={H} icon={bp.traveler.icon}
          kind="traveler" reduce={reduce} delay={0.05}
          label={t('atelier.blueprint.nodes.traveler.name')} active={active === 'traveler'}
          onPreview={() => preview('traveler')} onCommit={() => commit('traveler')} />
        <ChartNode x={bp.hub.x} y={bp.hub.y} w={W} h={H} icon={bp.hub.icon}
          kind="hub" reduce={reduce} delay={0.12}
          label={t('atelier.blueprint.nodes.shell.name')} active={active === 'shell'}
          onPreview={() => preview('shell')} onCommit={() => commit('shell')} />
        {bp.client.map((n, i) => (
          <ChartNode key={n.id} x={n.x} y={n.y} w={W} h={H} icon={n.icon}
            kind="client" reduce={reduce} delay={0.18 + i * 0.06}
            label={t(`atelier.blueprint.nodes.${n.id}.name`)} active={active === n.id}
            onPreview={() => preview(n.id)} onCommit={() => commit(n.id)} />
        ))}
        {bp.gates.map((g, i) => (
          <ChartNode key={g.id} x={g.x} y={g.y} w={W} h={H} icon={g.icon}
            kind="gate" sub={g.sub} reduce={reduce} delay={0.5 + i * 0.08}
            label={t(`atelier.blueprint.nodes.${g.id}.name`)} active={active === g.id}
            onPreview={() => preview(g.id)} onCommit={() => commit(g.id)} />
        ))}
      </div>

      <Readout t={t} active={active} gateSub={gateSubFor(active)} />
    </motion.div>
  );
};

/* ----------------------------------------------------------------- mobile -- */

/* The same topology, rotated for a portrait screen: cluster above, a
   horizontal wall with three gaps, the gates beneath. All geometry from
   constants.atelier.blueprint.mobile — its own design grid, not a shrink. */
const MobileChart = ({ t, active, commit, reduce }) => {
  const [drawn, setDrawn] = useState(false);

  /* Tapping a station high in the cluster must never leave its ANSWER hidden
     below the fold — nudge just enough for the readout to clear the viewport
     edge (no movement if it's already visible). Routed through Lenis when it's
     driving (narrow desktop windows); phones scroll natively. */
  useEffect(() => {
    if (!active) return;
    const el = document.querySelector('.blueprint__chart--m .blueprint__readout');
    if (!el) return;
    const overflow = el.getBoundingClientRect().bottom - window.innerHeight + 16;
    if (overflow <= 0) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(window.scrollY + overflow, { duration: reduce ? 0 : 0.55 });
    else window.scrollBy({ top: overflow, behavior: reduce ? 'auto' : 'smooth' });
  }, [active, reduce]);

  const m = bp.mobile;
  const W = m.w;
  const H = m.h;
  const fanY = m.hub.y + m.fanDrop;
  const gates = bp.gates.map((g) => ({ ...g, ...m.gates[g.id] }));
  const clients = bp.client.map((n) => ({ ...n, ...m.client[n.id] }));

  const crossX = (g) => m.hub.x + ((g.x - m.hub.x) * (m.wall.y - fanY)) / (g.y - fanY);
  const gapXs = gates.map(crossX);
  const gap = 12;
  const xs = [m.wall.x1, ...gapXs.flatMap((x) => [x - gap, x + gap]), m.wall.x2];
  const wallSegments = [];
  for (let i = 0; i < xs.length; i += 2) wallSegments.push([xs[i], xs[i + 1]]);

  const edges = [
    { id: 'traveler', x1: m.traveler.x, y1: m.traveler.y, x2: m.hub.x, y2: m.hub.y },
    ...clients.map((n) => ({ id: n.id, x1: m.hub.x, y1: m.hub.y, x2: n.x, y2: n.y })),
    ...gates.map((g) => ({ id: g.id, gate: true, x1: m.hub.x, y1: fanY, x2: g.x, y2: g.y })),
  ];

  return (
    <motion.div
      className={`blueprint__chart blueprint__chart--m${drawn ? ' is-drawn' : ''}`}
      data-active={active || undefined}
      onViewportEnter={() => setDrawn(true)}
      viewport={{ once: true, amount: 0.2 }}
      role="group"
      aria-label={t('atelier.blueprint.title')}
    >
      <div className="blueprint__zone blueprint__zone--m">
        <span className="blueprint__zone-name">{t('atelier.blueprint.clientZone')}</span>
        <span className="blueprint__zone-sub">{t('atelier.blueprint.clientZoneSub')}</span>
      </div>

      <div className="blueprint__stage" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="blueprint__svg" aria-hidden="true" focusable="false">
          {edges.map((e, i) => (
            <line key={e.id}
              className={`bp-edge bp-edge--${e.id}${e.gate ? ' bp-edge--gate' : ''}`}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              pathLength="1"
              style={{ '--d': `${0.15 + i * 0.07}s` }} />
          ))}

          {gates.map((g) => {
            const a = Math.atan2(g.y - fanY, g.x - m.hub.x);
            const tipX = g.x - 32 * Math.cos(a);
            const tipY = g.y - 32 * Math.sin(a);
            const wing = (da) => `${tipX - 8 * Math.cos(a + da)},${tipY - 8 * Math.sin(a + da)}`;
            return (
              <polyline key={g.id} className={`bp-arrow bp-edge--${g.id}`}
                points={`${wing(-0.42)} ${tipX},${tipY} ${wing(0.42)}`} />
            );
          })}

          {/* the wall — horizontal here; the realm above, the gates below */}
          {wallSegments.map(([a, b]) => (
            <g key={a} className="bp-wall">
              <line x1={a} y1={m.wall.y - 2.5} x2={b} y2={m.wall.y - 2.5} />
              <line x1={a} y1={m.wall.y + 2.5} x2={b} y2={m.wall.y + 2.5} />
            </g>
          ))}
          {gapXs.map((x) => (
            <circle key={x} className="bp-wall__gate" cx={x} cy={m.wall.y} r="3" />
          ))}

          <line className="bp-ghost"
            x1={m.ghostStart.x} y1={m.ghostStart.y}
            x2={m.ghost.x - 5} y2={m.ghost.y - 7} />
          <g className="bp-ghost__x" transform={`translate(${m.ghost.x}, ${m.ghost.y})`}>
            <line x1="-5" y1="-5" x2="5" y2="5" />
            <line x1="-5" y1="5" x2="5" y2="-5" />
          </g>
        </svg>

        {/* the wall's name + the far territory, written on the wall itself */}
        <span className="blueprint__wall-label blueprint__wall-label--m exp-mono"
          style={{ top: `${(m.wall.y / H) * 100}%` }} aria-hidden="true">
          <X size={10} strokeWidth={2} aria-hidden="true" /> {t('atelier.blueprint.wall')}
        </span>
        <div className="blueprint__zone blueprint__zone--beyond blueprint__zone--mbeyond"
          style={{ top: `${((m.wall.y + 14) / H) * 100}%` }}>
          <span className="blueprint__zone-name">{t('atelier.blueprint.beyondZone')}</span>
          <span className="blueprint__zone-sub">{t('atelier.blueprint.beyondZoneSub')}</span>
        </div>

        <ChartNode x={m.traveler.x} y={m.traveler.y} w={W} h={H} icon={bp.traveler.icon}
          kind="traveler" compact reduce={reduce} delay={0.05}
          label={t('atelier.blueprint.nodes.traveler.name')} active={active === 'traveler'}
          onCommit={() => commit('traveler')} />
        <ChartNode x={m.hub.x} y={m.hub.y} w={W} h={H} icon={bp.hub.icon}
          kind="hub" compact reduce={reduce} delay={0.12}
          label={t('atelier.blueprint.nodes.shell.name')} active={active === 'shell'}
          onCommit={() => commit('shell')} />
        {clients.map((n, i) => (
          <ChartNode key={n.id} x={n.x} y={n.y} w={W} h={H} icon={n.icon}
            kind="client" compact reduce={reduce} delay={0.18 + i * 0.06}
            label={t(`atelier.blueprint.nodes.${n.id}.name`)} active={active === n.id}
            onCommit={() => commit(n.id)} />
        ))}
        {gates.map((g, i) => (
          <ChartNode key={g.id} x={g.x} y={g.y} w={W} h={H} icon={g.icon}
            kind="gate" sub={g.subShort} compact reduce={reduce} delay={0.5 + i * 0.08}
            label={t(`atelier.blueprint.nodes.${g.id}.name`)} active={active === g.id}
            onCommit={() => commit(g.id)} />
        ))}
      </div>

      <p className="blueprint__sealed blueprint__sealed--m">{t('atelier.blueprint.sealedNote')}</p>

      <Readout t={t} active={active} gateSub={gateSubFor(active)} />
    </motion.div>
  );
};

/* ------------------------------------------------------------------ shell -- */

const Blueprint = () => {
  const { t } = useTranslation();
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  /* Desktop hover/focus: preview only — pitched note, no analytics event. */
  const preview = (id) => {
    setActive((cur) => {
      if (id && id !== cur) {
        playCue('hoverNote', { step: NODE_ORDER.indexOf(id) });
        trackOnce('blueprint_explore');
      }
      return id ?? cur;
    });
  };
  /* Click/tap: the deliberate act — the readout commits and the event fires.
     A second tap on the same station returns the readout to rest (mobile
     needs an explicit way back; on desktop hover will simply re-preview). */
  const commit = (id) => {
    setActive((cur) => {
      const next = cur === id ? null : id;
      if (next) {
        playCue('hoverNote', { step: NODE_ORDER.indexOf(id) });
        trackOnce('blueprint_explore');
        track('blueprint_node_open', { id });
      }
      return next;
    });
  };

  return (
    <div className="blueprint">
      {desktop
        ? <DesktopChart t={t} active={active} preview={preview} commit={commit} reduce={reduce} />
        : <MobileChart t={t} active={active} commit={commit} reduce={reduce} />}
    </div>
  );
};

export default Blueprint;
