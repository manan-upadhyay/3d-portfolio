import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSoundStore } from '../store/useSoundStore';
import { useThemeStore } from '../store/useThemeStore';
import { sound } from '../lib/sound';

// ── Apple-style volume dial ──────────────────────────────────────────────────
// A liquid capsule that fills bottom→top. Drag anywhere to set 0→100. The fill
// rides a bouncy SPRING, so on release it overshoots and settles like jelly; the
// capsule squashes while held (the iOS feel) and a pitched tick syncs to the drag.
// The liquid's HUE tracks the SELECTED theme mode — the exact same value the wheel
// paints its arc with — so the two controls always match (including on "auto").
// `width`/`height` let the desktop SoundControl popover reuse the same instrument
// at a smaller size (one volume UI everywhere — v2.0 D1).
const SKY_HUE = {
  auto: 'var(--sky-auto)', dawn: 'var(--sky-dawn)', day: 'var(--sky-day)',
  dusk: 'var(--sky-dusk)', night: 'var(--sky-night)',
};

const VolumeDial = ({ width = 54, height = 156 }) => {
  const { t } = useTranslation();
  const { enabled, volume, setVolume, setEnabled } = useSoundStore();
  // Match the wheel exactly: use the selected mode's hue, and on `auto` borrow the
  // sky it resolves to (auto has no colour of its own).
  const mode = useThemeStore((s) => s.mode);
  const resolvedSky = useThemeStore((s) => s.resolvedSky);
  const hueKey = mode === 'auto' ? resolvedSky : mode;
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const lastTick = useRef(volume);

  const level = enabled ? volume : 0;
  const Icon = level === 0 ? VolumeX : level < 0.5 ? Volume1 : Volume2;

  // Jelly: the fill target snaps, the spring wobbles toward it.
  const targetPct = useMotionValue(level * 100);
  const springPct = useSpring(targetPct, { stiffness: 170, damping: 12, mass: 1 });
  const fillHeight = useTransform(springPct, (v) => `${Math.max(0, Math.min(100, v))}%`);
  useEffect(() => { targetPct.set(level * 100); }, [level, targetPct]);

  const apply = (v) => {
    const c = Math.max(0, Math.min(1, v));
    if (c > 0 && !enabled) setEnabled(true);
    else if (c === 0 && enabled) setEnabled(false);
    if (c > 0) setVolume(c);
    targetPct.set(c * 100);
    if (Math.abs(c - lastTick.current) > 0.05) {
      lastTick.current = c;
      sound.playCue('volumeTick', { level: c });
    }
  };

  const fromPointer = (clientY) => {
    const r = trackRef.current.getBoundingClientRect();
    apply(1 - (clientY - r.top) / r.height);
  };
  const onDown = (e) => {
    sound.suppressReward(); // this dial isn't the hero — don't fire the off-screen spin reward
    sound.unlock();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    fromPointer(e.clientY);
  };
  const onMove = (e) => { if (dragging) fromPointer(e.clientY); };
  const onUp = () => setDragging(false);
  const onKey = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); apply(level + 0.1); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); apply(level - 0.1); }
  };

  return (
    <motion.div
      ref={trackRef}
      className="vol-apple"
      style={{ width, height, '--vol-hue': SKY_HUE[hueKey] || 'var(--color-ember)' }}
      animate={{ scaleX: dragging ? 1.05 : 1, scaleY: dragging ? 0.99 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      onKeyDown={onKey}
      role="slider" tabIndex={0}
      aria-label={t('sound.volume')}
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(level * 100)}
    >
      <motion.span className="vol-apple__fill" style={{ height: fillHeight }}>
        <span className="vol-apple__surface" />
      </motion.span>
      <span className="vol-apple__icon"><Icon size={17} /></span>
    </motion.div>
  );
};

export default VolumeDial;
