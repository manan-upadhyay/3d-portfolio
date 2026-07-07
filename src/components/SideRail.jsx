import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
//
// The trailing hint (revealed with the label) teaches what a row *does*, so the
// three behaviours never look alike: a `kbd` chip = "opens a panel in place"
// (a command, shortcut shown); `nav` = a ↗ = "leaves for another page"; neither
// = a plain section you scroll to. Kept subtle + muted so cohesion survives.
const Row = ({ no, glyph, label, kbd, nav, active, expanded, onClick, ariaLabel }) => (
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
      style={{
        width: COLLAPSED - 12,
        // One icon language: glyphs inherit this (lucide uses currentColor), so
        // every leading cell — number or icon — rests muted and lifts to ember
        // only when its row is active. No per-item accent colors.
        color: active ? 'var(--color-ember)' : 'var(--color-text-muted)',
      }}
    >
      {glyph || <span className="text-[11px] font-mono">{no}</span>}
    </span>
    <motion.span
      animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative flex-1 min-w-0 flex items-center gap-2 pr-2.5"
      style={{ color: active ? 'var(--color-text)' : 'var(--color-text-muted)' }}
    >
      <span className="truncate text-[13.5px] font-medium">{label}</span>
      {kbd && (
        <kbd
          className="ml-auto flex-shrink-0 text-[9.5px] font-mono tracking-wide px-1.5 py-0.5 rounded-[5px]"
          style={{
            color: 'var(--color-text-muted)',
            background: 'color-mix(in srgb, var(--color-text) 6%, transparent)',
            border: '1px solid var(--color-card-border)',
          }}
        >
          {kbd}
        </kbd>
      )}
      {nav && <ArrowUpRight size={14} className="ml-auto flex-shrink-0" style={{ opacity: 0.55 }} />}
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
            nav={a.nav}
            glyph={a.glyph}
          />
        ))}

        {/* Ambient voice mark — who is narrating; opens the Hall. Rendered as a
            plain row (monogram glyph + single-line label) so it reads as one of
            the rail's own items, not a separate widget. The "now narrating"
            context lives in the aria-label/title rather than a caps eyebrow. */}
        {activeVoice && (
          <>
            <span className="my-1 h-px mx-2" style={{ background: 'var(--color-card-border)' }} />
            {/* Group caption so the persona name below reads as "the narrator",
                not a mystery item. Collapses to zero height when the rail is a
                slim pill; muted small-caps keeps it a quiet label, not a badge. */}
            <motion.div
              initial={false}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <span
                className="block px-3 pt-1 pb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap"
                style={{ color: 'color-mix(in srgb, var(--color-text) 45%, transparent)' }}
              >
                {t('voiceHall.nowNarrating')}
              </span>
            </motion.div>
            <Row
              onClick={openHall}
              expanded={expanded}
              label={activeVoice.label}
              ariaLabel={`${t('voiceHall.nowNarrating')}: ${activeVoice.label}`}
              glyph={
                <span
                  className="grid place-items-center w-7 h-7 rounded-full font-chronicle text-[11.5px] leading-none"
                  style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-card-border)' }}
                >
                  {activeVoice.glyph}
                </span>
              }
            />
          </>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default SideRail;
