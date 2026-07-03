import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/useThemeStore';
import { sound } from '../lib/sound';

// ── Theme wheel — an RDR2 weapon-wheel ───────────────────────────────────────
// A segmented rim: five sky modes, and ONLY the active/armed sector's OUTER arc
// carries colour (never a full ring). A serif mode-name sits in the hub; drag the
// centre ball toward a mode to arm it — the colour arc GLIDES to that sector on a
// spring, the icon lifts, a detent ticks — release to apply.
const MODES = ['auto', 'dawn', 'day', 'dusk', 'night'];
const ICON = { auto: Clock, dawn: Sunrise, day: Sun, dusk: Sunset, night: Moon };
const SWATCH = {
  auto: 'var(--sky-auto)', dawn: 'var(--sky-dawn)', day: 'var(--sky-day)',
  dusk: 'var(--sky-dusk)', night: 'var(--sky-night)',
};

const SIZE = 156;
const C = SIZE / 2;          // centre
const RO = 70;               // rim radius (where the arc lives)
const RM = 48;               // icon orbit radius
const KR = 46;               // ball travel clamp
const DEAD = 15;             // deadzone before a mode arms
const RAD = Math.PI / 180;

const CIRC = 2 * Math.PI * RO;
const SPAN = 56;             // coloured-arc sweep per sector (deg)
const TRACK_W = 4;           // ONE width for both the faint rim + the colour arc,
                             // so the coloured arc sits exactly on its track slot
const DASH = (CIRC * SPAN) / 360;
const GAP = (CIRC * (72 - SPAN)) / 360;

const theta = (i) => -90 + i * 72;                 // sector centre angle (0 = East)
const iconXY = (i) => ({ x: C + RM * Math.cos(theta(i) * RAD), y: C + RM * Math.sin(theta(i) * RAD) });
const angleDiff = (a, b) => Math.abs(((a - b) % 360 + 540) % 360 - 180);
// Position the single dash by strokeDashoffset (NOT a CSS rotate) — the circle
// never moves, so the colour arc is guaranteed to share the faint rim's radius.
const offsetFor = (deg) => -((deg - SPAN / 2) / 360) * CIRC;

const ThemeWheel = () => {
  const { t } = useTranslation();
  const { mode, setMode, resolvedSky } = useThemeStore();
  const wrapRef = useRef(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [target, setTarget] = useState(null);
  const reduce = sound.reduceMotion();

  const armed = target || mode;               // what the wheel currently points at
  const armedIdx = MODES.indexOf(armed);

  // `auto` has NO colour of its own — it borrows the sky it currently resolves to
  // (dawn/day/dusk/night by local time), so the arc + dial reflect the real theme.
  const swatchFor = (m) => (m === 'auto' ? SWATCH[resolvedSky] || SWATCH.auto : SWATCH[m]);
  const armedSwatch = swatchFor(armed);

  // Track a CONTINUOUS angle so the arc always slides the short way between
  // sectors (and never unwinds the long way around the ring).
  const contDegRef = useRef(theta(armedIdx));
  const lastIdxRef = useRef(armedIdx);
  if (lastIdxRef.current !== armedIdx) {
    contDegRef.current += ((theta(armedIdx) - contDegRef.current) % 360 + 540) % 360 - 180;
    lastIdxRef.current = armedIdx;
  }
  const dashOffset = offsetFor(contDegRef.current);

  // The active mode's NAME rides its OWN coloured arc: curved text hugging the
  // OUTER side of the armed sector's arc, a constant 4px clear. The path is ALWAYS
  // drawn the same rotational direction (clockwise) so every label faces the same
  // way — feet toward the wheel's centre (top reads upright, bottom reads inverted,
  // like a coin's rim), rather than flipping orientation per sector.
  const ARC_OUTER = RO + TRACK_W / 2;             // 72 — outer edge of the coloured arc
  const HALF = 30;                                // arc half-span (deg)
  const thetaArmed = theta(armedIdx);
  const R_LABEL = ARC_OUTER + 10;                  // constant 4px outside the arc, all sectors
  const a0 = thetaArmed - HALF;
  const a1 = thetaArmed + HALF;
  const arcPt = (deg) => `${(C + R_LABEL * Math.cos(deg * RAD)).toFixed(2)} ${(C + R_LABEL * Math.sin(deg * RAD)).toFixed(2)}`;
  const labelPath = `M ${arcPt(a0)} A ${R_LABEL} ${R_LABEL} 0 0 1 ${arcPt(a1)}`;
  const labelPathId = `theme-wheel-label-${armed}`;

  const resolve = (clientX, clientY) => {
    const dx = clientX - centerRef.current.x;
    const dy = clientY - centerRef.current.y;
    const dist = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx);
    setKnob({ x: Math.cos(ang) * Math.min(dist, KR), y: Math.sin(ang) * Math.min(dist, KR) });
    if (dist < DEAD) {
      if (targetRef.current !== null) { targetRef.current = null; setTarget(null); }
      return;
    }
    const deg = ang / RAD;
    let best = MODES[0], bestD = Infinity;
    MODES.forEach((m, i) => { const d = angleDiff(deg, theta(i)); if (d < bestD) { bestD = d; best = m; } });
    if (targetRef.current !== best) {
      targetRef.current = best;
      setTarget(best);
      if (best !== mode) setMode(best); // LIVE — the whole site re-skins as you sweep
      sound.playCue('detent');
      if (navigator.vibrate) navigator.vibrate(6);
    }
  };

  const onDown = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    centerRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    resolve(e.clientX, e.clientY);
  };
  const onMove = (e) => { if (dragging) resolve(e.clientX, e.clientY); };
  const onUp = () => {
    // The theme was already applied LIVE while sweeping — release just settles the
    // ball home (a soft confirm) and drops the armed state.
    if (targetRef.current) sound.playCue('settle');
    setDragging(false);
    setKnob({ x: 0, y: 0 });
    targetRef.current = null;
    setTarget(null);
  };
  const pick = (m) => { if (m !== mode) { setMode(m); sound.playCue('theme'); } };

  const ballTransition = dragging || reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 30 };
  const knobLen = Math.hypot(knob.x, knob.y);

  return (
    <div
      ref={wrapRef}
      className="theme-wheel"
      style={{ width: SIZE, height: SIZE, '--sky-swatch': armedSwatch }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      role="group" aria-label={t('sky.ariaOpen')}
    >
      <svg className="theme-wheel__svg" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        {/* faint segmented rim (the five wedges) — same width/radius/caps as the
            colour arc, so the colour arc overlays its slot EXACTLY */}
        <circle cx={C} cy={C} r={RO} fill="none" stroke="var(--color-card-border)" strokeWidth={TRACK_W}
          strokeLinecap="round" strokeDasharray={`${DASH} ${GAP}`}
          transform={`rotate(${theta(0) - SPAN / 2} ${C} ${C})`} opacity="0.55" />
        {/* the single coloured arc — slides to the armed sector via dashoffset
            (same circle as the rim → identical radius, no transform drift) */}
        <motion.circle
          cx={C} cy={C} r={RO} fill="none" strokeWidth={TRACK_W} strokeLinecap="round"
          stroke={armedSwatch}
          strokeDasharray={`${DASH} ${CIRC - DASH}`}
          animate={{ strokeDashoffset: dashOffset }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 26 }}
          // style={{ filter: `drop-shadow(0 0 4px ${SWATCH[armed]})` }}
        />
        {/* The active mode's NAME — curved text hugging the OUTER side of its own
            coloured arc. Plain black/white (per theme), no outline; only the active
            one shows, all facing the wheel's centre (feet inward). */}
        <defs>
          <path id={labelPathId} d={labelPath} fill="none" />
        </defs>
        <motion.text
          key={armed}
          className="theme-wheel__name"
          fill="var(--color-text)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
        >
          <textPath href={`#${labelPathId}`} startOffset="50%" textAnchor="middle">
            {t(`sky.modes.${armed}`)}
          </textPath>
        </motion.text>
      </svg>

      {/* mode icons — no borders; the armed one lifts + takes its hue */}
      {MODES.map((m, i) => {
        const p = iconXY(i);
        const on = armed === m;
        const Icon = ICON[m];
        return (
          <button
            key={m} type="button"
            className="theme-wheel__icon"
            style={{ left: p.x, top: p.y, color: on ? swatchFor(m) : undefined, transform: `translate(-50%, -50%) scale(${on ? 1.18 : 1})` }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => pick(m)}
            aria-label={t(`sky.modes.${m}`)} aria-pressed={mode === m}
          >
            <Icon size={17} />
          </button>
        );
      })}

      {/* spoke from centre to the finger while dragging */}
      {dragging && knobLen > DEAD && (
        <span aria-hidden="true" style={{
          position: 'absolute', left: C, top: C, width: knobLen, height: 2, transformOrigin: '0 50%',
          transform: `rotate(${Math.atan2(knob.y, knob.x) / RAD}deg)`, zIndex: 2,
          background: `linear-gradient(90deg, ${armedSwatch}, transparent)`,
        }} />
      )}

      {/* the draggable ball — VISIBLE at rest with a gentle breathing pulse (so it
          reads as grabbable), follows the finger while dragging, springs home. A
          "drag me" affordance layered over the always-tappable icons. */}
      <motion.div
        className="theme-wheel__ball"
        style={{ marginLeft: -11, marginTop: -11 }}
        animate={dragging
          ? { x: knob.x, y: knob.y, scale: 1 }
          : { x: 0, y: 0, scale: reduce ? 1 : [1, 1.13, 1] }}
        transition={dragging
          ? ballTransition
          : (reduce ? { duration: 0 } : { scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } })}
        aria-hidden="true"
      >
        <span className="theme-wheel__balldot" />
      </motion.div>
      {/* a faint idle halo pulsing out of the ball — the "there's something here" cue */}
      {!dragging && !reduce && (
        <motion.span aria-hidden="true" className="theme-wheel__halo"
          style={{ background: armedSwatch }}
          animate={{ scale: [1, 2.1], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
      )}
    </div>
  );
};

export default ThemeWheel;
