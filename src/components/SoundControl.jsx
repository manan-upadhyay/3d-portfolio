import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSoundStore } from '../store/useSoundStore';
import { useCoachmark } from '../store/useCoachmark';
import { sound } from '../lib/sound';

const JELLY = { type: 'spring', stiffness: 320, damping: 24, mass: 0.7 };
const COLLAPSED = 48;    // the resting button (a circle)
const EXPANDED_H = 164;  // the capsule the circle morphs into on hover

/**
 * Sound control — the audio half of the bottom-right control cluster (Phase 4).
 *
 * Three states, not two:
 *  • muted        — the visitor turned it off (`!enabled`).
 *  • armed/locked — on by preference but the browser autoplay gate is still shut
 *                   (`enabled && !unlocked`); nothing can be heard yet.
 *  • live         — `enabled && unlocked`; sound actually plays.
 *
 * The armed state is the landing state for almost every visitor. To avoid the
 * classic trap — a "turn on sound" coachmark pointing at a button whose normal
 * action is *mute* — the button is context-aware: while the gate is shut, a press
 * IS the unlock gesture (it opens the gate and keeps sound on, with an audible
 * confirm), never a mute. So following the coachmark does exactly what it says.
 * Past the gate the button is an ordinary mute/unmute toggle.
 *
 * Volume (v2.0 follow-up): on hover the circle ITSELF morphs into the volume
 * bar — the same white-bordered pill, with a light-ember liquid rising to the
 * volume level on a jelly spring (the mobile dial's physics). One icon, one
 * object; drag anywhere on the capsule to pour, click the icon to mute.
 */
const SoundControl = () => {
  const { t } = useTranslation();
  const { enabled, volume, unlocked, toggle, setVolume, setEnabled } = useSoundStore();
  const { active: activeCoach, request: requestCoach, release: releaseCoach } = useCoachmark();
  const [expanded, setExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);
  const lastTick = useRef(volume);
  // The hint is visible only while THIS control owns the shared coachmark stage,
  // so it can never overlap the Voice entice note (see useCoachmark).
  const showNote = activeCoach === 'sound';
  // Was the autoplay gate still shut at the moment this press began? Captured on
  // the button's own pointerdown (which fires before the global window unlock
  // listener), so the click handler can't be fooled by the gate opening mid-press.
  const pressLocked = useRef(false);

  const armed = enabled && !unlocked; // on by preference, but the browser holds it
  const live = enabled && unlocked;   // actually audible
  const level = enabled ? volume : 0;

  // Jelly liquid — the fill target snaps, the spring overshoots and settles
  // (identical physics to the mobile VolumeDial, so the two controls feel like
  // one instrument).
  const targetPct = useMotionValue(level * 100);
  const springPct = useSpring(targetPct, { stiffness: 170, damping: 12, mass: 1 });
  const fillHeight = useTransform(springPct, (v) => `${Math.max(0, Math.min(100, v))}%`);
  useEffect(() => { targetPct.set(level * 100); }, [level, targetPct]);

  // Coachmark: appears a beat after landing while still locked, and dismisses the
  // instant we leave the armed state (the gate opens, or the visitor mutes).
  useEffect(() => {
    if (!armed) { releaseCoach('sound'); return undefined; }
    const inT = setTimeout(() => requestCoach('sound'), 1200);
    return () => { clearTimeout(inT); releaseCoach('sound'); };
  }, [armed, requestCoach, releaseCoach]);

  const capturePress = () => { pressLocked.current = !sound.isUnlocked(); };

  const onPress = () => {
    if (pressLocked.current) {
      // First press while the browser gate is shut: this click IS the unlock
      // gesture, and sound ends up ON either way (never a mute on a locked press).
      if (!enabled) {
        // muted + locked → enabling already unlocks the gate AND plays the confirm
        // cue (see store.setEnabled), so this single call lands us in the live state.
        toggle();
      } else {
        // armed (on-by-preference, locked) → open the gate and confirm audibly.
        sound.unlock();
        sound.playCue('confirm');
      }
    } else {
      // Past the gate the button is an ordinary mute/unmute toggle.
      toggle();
    }
  };

  // Pouring — drag (or click) anywhere on the capsule sets the level; hitting
  // zero mutes, rising from zero unmutes, ticks pitch up with the level.
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
    sound.suppressReward(); // pouring volume isn't the hero — no off-screen spin reward
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

  // Expand into the bar on hover — but only on devices that actually hover.
  // On touch, a synthetic `mouseenter` (with no matching `mouseleave`) would leave
  // the control stuck open; coarse pointers just tap the button to toggle.
  const onEnter = () => { if (window.matchMedia('(hover: hover)').matches) setExpanded(true); };

  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={() => { setExpanded(false); setDragging(false); }}
    >
      {/* Armed-but-locked coachmark — a clear, action-first invitation pointing at
          the speaker, which (above) genuinely turns sound on when pressed. */}
      <AnimatePresence>
        {showNote && armed && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={JELLY}
            className="absolute bottom-full right-0 mb-3 w-56 origin-bottom-right rounded-2xl px-4 py-3 pointer-events-none"
            style={{
              background: 'color-mix(in srgb, var(--color-card-bg) 96%, transparent)',
              border: '1px solid var(--color-card-border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <p className="text-[12px] leading-snug" style={{ color: 'var(--color-text)' }}>
              {t('sound.enableHint')}
            </p>
            <span
              className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
              style={{ background: 'var(--color-card-bg)', borderRight: '1px solid var(--color-card-border)', borderBottom: '1px solid var(--color-card-border)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The one object: a circle at rest, THE volume bar on hover. */}
      <motion.div
        ref={trackRef}
        animate={{ height: expanded ? EXPANDED_H : COLLAPSED }}
        transition={JELLY}
        className="soundpop w-12 relative overflow-hidden rounded-full"
        onPointerDown={expanded ? onDown : undefined}
        onPointerMove={expanded ? onMove : undefined}
        onPointerUp={expanded ? onUp : undefined}
        onPointerCancel={expanded ? onUp : undefined}
        onKeyDown={expanded ? onKey : undefined}
        role={expanded ? 'slider' : undefined}
        tabIndex={expanded ? 0 : -1}
        aria-label={t('sound.volume')}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(level * 100)}
        style={{
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-card-border)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-card)',
          cursor: expanded ? 'ns-resize' : 'pointer',
          touchAction: 'none',
        }}
      >
        {/* the light-ember liquid — rises to the level on the jelly spring; at
            rest it's clipped away, so the collapsed circle looks untouched */}
        <motion.span
          className="soundpop__fill"
          style={{ height: fillHeight, opacity: expanded ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* press = activate (while locked) or mute/unmute (once live) —
            pinned to the capsule's foot, the same single icon in both states */}
        <motion.button
          onPointerDown={(e) => { e.stopPropagation(); capturePress(); }}
          onClick={onPress}
          data-cursor="hover"
          whileTap={{ scale: 0.88 }}
          transition={JELLY}
          aria-label={live ? t('sound.toggleOff') : t('sound.toggleOn')}
          title={live ? t('sound.toggleOff') : t('sound.toggleOn')}
          aria-pressed={live}
          /* Sized by the container's CONTENT box (inset-x-0 + aspect-square), not
             a fixed 48px: the 1px border makes the content box 46px, and a 48px
             button overflowed it under overflow:hidden — the inner circle sat
             visibly off-center (v2.0 round 3). */
          className="absolute inset-x-0 bottom-0 aspect-square grid place-items-center"
        >
          {/* "Primed" pulse — shown ONLY while armed (locked). A plain conditional
              (not AnimatePresence) so it vanishes the very instant audio unlocks. */}
          {armed && !expanded && (
            <motion.span
              className="absolute top-2 right-2 w-2 h-2 rounded-full pointer-events-none"
              style={{ background: 'var(--color-ember)' }}
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <span
            className="grid place-items-center w-9 h-9 rounded-full transition-colors"
            style={
              expanded
                // Expanded: the liquid IS the state colour — the icon rides bare on it.
                ? { background: 'transparent', border: 'none', color: level > 0.08 ? 'var(--color-ember)' : 'var(--color-text-muted)' }
                // Collapsed: live = ember wash; armed = dormant-but-inviting; muted = neutral.
                : {
                    background: live ? 'rgba(var(--color-ember-rgb),0.16)' : 'var(--color-card-bg)',
                    color: live ? 'var(--color-ember)' : armed ? 'var(--color-text)' : 'var(--color-text-muted)',
                    border: live ? 'none' : `1px solid ${armed ? 'rgba(var(--color-ember-rgb),0.5)' : 'var(--color-card-border)'}`,
                  }
            }
          >
            {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SoundControl;
