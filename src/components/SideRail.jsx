import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from '../lib/smoothScroll';
import { useThemeStore } from '../store/useThemeStore';
import { useVoiceStore } from '../store/useVoiceStore';
import { voiceById } from '../i18n/voices';

// Springy "jelly" physics — a touch of overshoot, settles naturally.
const JELLY = { type: 'spring', stiffness: 320, damping: 22, mass: 0.7 };
const COLLAPSED = 56;
const EXPANDED = 232;

// One rail row — number cell stays put (centred when collapsed); label slides
// in on expand. Shared by the sigil, chapters and the map button.
const Row = ({ no, glyph, label, kbd, active, expanded, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    data-cursor="hover"
    aria-label={ariaLabel}
    title={ariaLabel}
    aria-current={active ? 'true' : undefined}
    className="relative flex items-center w-full h-9 rounded-xl"
  >
    <span
      className="absolute inset-0 rounded-xl transition-opacity duration-300"
      style={{ background: 'rgba(var(--color-ember-rgb),0.1)', opacity: active ? 1 : 0 }}
    />
    {active && (
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full"
        style={{ background: 'var(--color-ember)' }}
      />
    )}
    <span
      className="relative grid place-items-center flex-shrink-0"
      style={{ width: COLLAPSED - 12 }}
    >
      {glyph || (
        <span
          className="text-[11px] font-mono"
          style={{ color: active ? 'var(--color-ember)' : 'var(--color-text-muted)' }}
        >
          {no}
        </span>
      )}
    </span>
    <motion.span
      animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative whitespace-nowrap text-[13.5px] font-medium flex items-center gap-2"
      style={{ color: active ? 'var(--color-text)' : 'var(--color-text-muted)' }}
    >
      {label}
      {kbd && <kbd className="text-[10px] font-mono opacity-60">⌘K</kbd>}
    </motion.span>
  </button>
);

/**
 * Collapsible glass side-rail (breedlove-style). Collapsed it's a slim pill of
 * section numbers, vertically centred; on hover it springs open to reveal the
 * labels. Persistent across the route. Reused on BOTH routes (v2.0 pass 2 / audit
 * #7): the Chronicle passes the six chapters + a Map/Making-of footer; the Atelier
 * passes its acts + a "back to the Chronicle" footer. Purely presentational — the
 * caller supplies resolved `items` ({ id, no, label, onClick }) and footer
 * `actions` ({ key, label, ariaLabel, glyph, onClick, kbd }).
 */
const SideRail = ({ items, activeId, actions = [], visible, ariaLabel, crestLabel }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const { resolvedTheme } = useThemeStore();
  const crest = resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.webp';
  // Ambient voice mark — the active persona, pinned to the rail's foot so it's
  // always in view. Opens the Voice Hall. Reused on both routes (the rail is).
  const voice = useVoiceStore((s) => s.voice);
  const openHall = useVoiceStore((s) => s.openHall);
  const activeVoice = voiceById(voice);

  return (
    <motion.nav
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="hidden md:block fixed left-4 top-1/2 z-40"
      style={{ translateY: '-50%', pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
      aria-label={ariaLabel || 'Chapters'}
    >
      <motion.div
        animate={{ width: expanded ? EXPANDED : COLLAPSED }}
        transition={JELLY}
        className="overflow-hidden rounded-[20px] p-1.5 flex flex-col gap-0.5"
        style={{
          background: 'color-mix(in srgb, var(--color-card-bg) 94%, transparent)',
          border: '1px solid var(--color-card-border)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <Row
          ariaLabel={t('nav.toTop')}
          onClick={scrollToTop}
          expanded={expanded}
          label={crestLabel || 'Manan Upadhyay'}
          glyph={
            <img
              src={crest}
              alt="Manan Upadhyay"
              width={28}
              height={28}
              className="w-7 h-7 rounded-lg object-contain"
              style={{ boxShadow: '0 0 0 1px var(--color-card-border)' }}
            />
          }
        />

        <span className="my-1 h-px mx-2" style={{ background: 'var(--color-card-border)' }} />

        {items.map((c) => (
          <Row
            key={c.id}
            no={c.no}
            label={c.label}
            active={activeId === c.id}
            expanded={expanded}
            ariaLabel={c.label}
            onClick={c.onClick}
          />
        ))}

        {actions.length > 0 && (
          <span className="my-1 h-px mx-2" style={{ background: 'var(--color-card-border)' }} />
        )}

        {actions.map((a) => (
          <Row
            key={a.key}
            ariaLabel={a.ariaLabel || a.label}
            onClick={a.onClick}
            expanded={expanded}
            label={a.label}
            kbd={a.kbd}
            glyph={a.glyph}
          />
        ))}

        {/* Ambient voice mark — always shows who is narrating; opens the Hall. */}
        {activeVoice && (
          <>
            <span className="my-1 h-px mx-2" style={{ background: 'var(--color-card-border)' }} />
            <button
              onClick={openHall}
              data-cursor="hover"
              aria-label={`${t('voiceHall.nowNarrating')}: ${activeVoice.label}`}
              title={`${t('voiceHall.nowNarrating')}: ${activeVoice.label}`}
              className="relative flex items-center w-full h-9 rounded-xl"
            >
              <span className="relative grid place-items-center flex-shrink-0" style={{ width: COLLAPSED - 12 }}>
                <span
                  className="grid place-items-center w-7 h-7 rounded-full font-chronicle text-[11.5px] leading-none"
                  style={{
                    color: 'var(--color-ember)',
                    background: 'rgba(var(--color-ember-rgb),0.14)',
                    border: '1px solid rgba(var(--color-ember-rgb),0.3)',
                  }}
                >
                  {activeVoice.glyph}
                </span>
              </span>
              <motion.span
                animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative min-w-0 text-left"
              >
                <span className="block text-[8.5px] font-bold tracking-[0.18em] uppercase leading-none whitespace-nowrap" style={{ color: 'var(--color-gold)' }}>
                  {t('voiceHall.nowNarrating')}
                </span>
                <span className="block text-[12.5px] font-medium leading-tight mt-0.5 truncate" style={{ color: 'var(--color-text)' }}>
                  {activeVoice.label}
                </span>
              </motion.span>
            </button>
          </>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default SideRail;
