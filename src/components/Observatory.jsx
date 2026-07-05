import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Search, Activity } from 'lucide-react';
import { atelier } from '../constants';
import { playCue, sound } from '../lib/sound';
import CountUp from './CountUp';

/**
 * Observatory — "Instrumented, not surveilled." Slimmed in the v2.0 feedback
 * pass (W7): the desktop keeps the living constellation + the always-visible
 * event index + the metric strip + three one-line capability panels; the
 * webhook flow diagram and footnote were cut as low-value weight.
 *
 * Mobile gets its OWN instrument (§11.3 — not a shrunk orbit): a "signal
 * readout" card that auto-cycles through the real product events one at a
 * time — event name, surface, cadence, and where it fires — tap to advance
 * (tapping also pauses the auto-cycle). The orbit + chip index never render
 * on phones, where they were unusable.
 */
const PANEL_ICONS = { shield: ShieldCheck, search: Search, activity: Activity };

const CX = 200;
const CY = 200;
const R = 152; // base orbit radius in the 400×400 viewBox

/* The mobile signal readout — one live event at a time. */
const MobileSignal = ({ nodes, active: inView }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || !inView) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % nodes.length), 3800);
    return () => clearInterval(id);
  }, [nodes.length, reduce, paused, inView]);

  const n = nodes[i];
  return (
    <button
      type="button"
      className="obs-signal"
      onClick={() => { setPaused(true); playCue('blip'); setI((v) => (v + 1) % nodes.length); }}
      aria-label={t('atelier.observatory.tapHint')}
    >
      <span className="obs-signal__top">
        <span className="observatory__readout-name exp-mono">{n.id}</span>
        <span className="obs-signal__count exp-mono">{i + 1}/{nodes.length}</span>
      </span>
      <span className={`observatory__readout-meta observatory__readout-meta--${n.group}`}>
        <span className="observatory__legend-dot" aria-hidden="true" />
        {t(`atelier.observatory.groups.${n.group}`)}
        <span className="observatory__readout-cadence">{t(`atelier.observatory.cadence.${n.once ? 'once' : 'repeat'}`)}</span>
      </span>
      <span className="observatory__readout-where">{n.where}</span>
      <span className="obs-signal__bar" aria-hidden="true" data-paused={paused || reduce || undefined} key={i} />
    </button>
  );
};

const Observatory = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const { metrics, constellation, panels } = atelier.observatory;
  const [selected, setSelected] = useState(null);
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Desktop vs the bespoke mobile instrument.
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Only auto-cycle the mobile readout while it's actually on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Flatten the grouped events into positioned nodes once, plus an id→node lookup
  // for the readout. Each group forms a contiguous coloured arc; a tiny per-node
  // radius jitter gives the field depth.
  const { nodes, byId, stepById } = useMemo(() => {
    const flat = constellation.groups.flatMap((g) => g.events.map((e) => ({ ...e, group: g.id })));
    const total = flat.length;
    const positioned = flat.map((node, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const r = R + (i % 2 ? -13 : 9);
      return {
        ...node,
        x: +(CX + r * Math.cos(angle)).toFixed(2),
        y: +(CY + r * Math.sin(angle)).toFixed(2),
      };
    });
    return {
      nodes: positioned,
      byId: Object.fromEntries(positioned.map((n) => [n.id, n])),
      stepById: Object.fromEntries(positioned.map((n, i) => [n.id, i])),
    };
  }, [constellation]);

  const active = selected ? byId[selected] : null;
  const paused = !reduce && !!active; // freeze the orbit the moment a star is read

  // Selecting an event (from a star OR its chip) lights it AND plays a pitched
  // hover note — sweeping the field fast resolves to a little pentatonic melody
  // rather than noise. Only fires on a genuinely new selection, so re-entering
  // the same chip is silent.
  const lastNote = useRef(null);
  const pick = (id) => {
    if (id !== lastNote.current) {
      lastNote.current = id;
      if (id != null) playCue('hoverNote', { step: stepById[id] ?? 0 });
    }
    setSelected(id);
  };

  // Continuous "orbit" buzz while the constellation field is hovered (sibling of
  // the face-particle lens buzz). Stops on leave + unmount.
  const enterField = () => sound.orbit.setLevel(1);
  const leaveField = () => { sound.orbit.setLevel(0); pick(null); };
  useEffect(() => () => sound.orbit.stop(), []);

  return (
    <div ref={rootRef} className="observatory">
      {desktop ? (
        <div className="observatory__instrument">
          {/* The constellation — every named event orbiting the session-recap hub. */}
          <div className="observatory__viz" onMouseEnter={enterField} onMouseLeave={leaveField}>
            <svg
              className="observatory__sky"
              viewBox="0 0 400 400"
              role="img"
              aria-label={t('atelier.observatory.title')}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* faint guide rings */}
              <circle className="obs-ring" cx={CX} cy={CY} r={R + 9} />
              <circle className="obs-ring obs-ring--dashed" cx={CX} cy={CY} r={R - 40} />

              {/* spokes + nodes rotate together; the hub stays still */}
              <g className={`obs-orbit${reduce ? ' is-static' : ''}${paused ? ' is-paused' : ''}${active ? ' has-active' : ''}`}>
                {nodes.map((node) => (
                  <line
                    key={`s-${node.id}`}
                    className={`obs-spoke${selected === node.id ? ' is-active' : ''}`}
                    x1={CX} y1={CY} x2={node.x} y2={node.y}
                  />
                ))}
                {nodes.map((node) => (
                  <g
                    key={node.id}
                    className={`obs-node obs-node--${node.group}${selected === node.id ? ' is-active' : ''}`}
                    onMouseEnter={() => pick(node.id)}
                    onClick={() => pick(node.id)}
                  >
                    <circle className="obs-node__hit" cx={node.x} cy={node.y} r={11} />
                    <circle className="obs-node__dot" cx={node.x} cy={node.y} r={3.4} />
                  </g>
                ))}
              </g>

              {/* the hub — the one per-visit summary every event folds into */}
              <g className="obs-hub" aria-hidden="true">
                <circle className="obs-hub__halo" cx={CX} cy={CY} r={30} />
                <circle className="obs-hub__core" cx={CX} cy={CY} r={13} />
              </g>
            </svg>

            {/* the readout — the selected event, or the hub framing at rest */}
            <div className="observatory__readout" aria-live="polite">
              {active ? (
                <>
                  <span className="observatory__readout-name exp-mono">{active.id}</span>
                  <span className={`observatory__readout-meta observatory__readout-meta--${active.group}`}>
                    <span className="observatory__legend-dot" aria-hidden="true" />
                    {t(`atelier.observatory.groups.${active.group}`)}
                    <span className="observatory__readout-cadence">{t(`atelier.observatory.cadence.${active.once ? 'once' : 'repeat'}`)}</span>
                  </span>
                  <span className="observatory__readout-where">{active.where}</span>
                </>
              ) : (
                <>
                  <span className="observatory__readout-name exp-mono">{constellation.hub}</span>
                  <span className="observatory__readout-note">{t('atelier.observatory.hubNote')}</span>
                </>
              )}
            </div>
          </div>

          {/* The index — every instrumented event, grouped + colour-coded, always
              visible so discovery never requires a blind hover. */}
          <div className="observatory__index" onMouseLeave={() => pick(null)}>
            <p className="observatory__index-hint">{t('atelier.observatory.indexHint')}</p>
            {constellation.groups.map((g) => (
              <div key={g.id} className={`observatory__group observatory__group--${g.id}`}>
                <div className="observatory__group-head">
                  <span className="observatory__legend-dot" aria-hidden="true" />
                  <span className="observatory__group-label">{t(`atelier.observatory.groups.${g.id}`)}</span>
                  <span className="observatory__group-count exp-mono">{g.events.length}</span>
                </div>
                <ul className="observatory__chips">
                  {g.events.map((e) => (
                    <li key={e.id}>
                      <button
                        type="button"
                        className={`observatory__chip exp-mono${selected === e.id ? ' is-active' : ''}`}
                        aria-pressed={selected === e.id}
                        onMouseEnter={() => pick(e.id)}
                        onFocus={() => pick(e.id)}
                        onClick={() => pick(selected === e.id ? null : e.id)}
                      >
                        {e.id}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Mobile — the auto-cycling signal readout (one real event at a time). */
        <MobileSignal nodes={nodes} active={inView} />
      )}

      {/* the readouts */}
      <dl className="observatory__metrics">
        {metrics.map((m) => (
          <div key={m.key} className="observatory__metric">
            <dt className="observatory__metric-value">
              {m.count ? <CountUp value={m.value} /> : m.value}
            </dt>
            <dd className="observatory__metric-label">{t(`atelier.observatory.metrics.${m.key}`)}</dd>
          </div>
        ))}
      </dl>

      {/* the three capability panels — one line each since v2.0 */}
      <div className="observatory__panels">
        {panels.map((p, i) => {
          const Icon = PANEL_ICONS[p.glyph] ?? Activity;
          return (
            <motion.div
              key={p.id}
              className="observatory__panel"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="observatory__panel-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.6} /></span>
              <h4 className="observatory__panel-title">{t(`atelier.observatory.panels.${p.id}.title`)}</h4>
              <p className="observatory__panel-body">{t(`atelier.observatory.panels.${p.id}.body`)}</p>
              <div className="observatory__panel-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="observatory__tag exp-mono">{tag}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Observatory;
