import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, ChevronDown, ChevronLeft, ChevronRight, Info, Feather, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useVoiceStore } from '../store/useVoiceStore';
import { voicesByCategory, voiceById, SEALED_VOICES } from '../i18n/voices';
import { getLenis } from '../lib/smoothScroll';
import { pushOverlay, popOverlay, lockBodyScroll, unlockBodyScroll } from '../lib/uiOverlay';
import { trackOnce } from '../lib/analytics';
import Hovercard from './Hovercard';
import ClueUnlock from './ClueUnlock';
import VoicePreviewCard from './VoicePreviewCard';
import VoiceRequest from './VoiceRequest';

// A single reactive "is this a desktop-width viewport?" flag — the preview panel
// is a desktop-only affordance (mobile gets its own gyro-lens flow later), so the
// Hall keeps its calm single-column roster on phones.
const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 820px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 820px)');
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desktop;
};

const STAGGER = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } } };
const ITEM = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 330, damping: 26 } } };

// Attribution card body — who a voice is borrowed from (rendered in a portalled
// Hovercard so it can never be clipped by the scrolling Hall body).
const infoBody = (info) => (
  <>
    <p className="text-[12px] font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{info.name}</p>
    <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-ember)' }}>{info.source}</p>
    <p className="text-[11px] mt-1.5 leading-snug" style={{ color: 'var(--color-text-muted)' }}>{info.note}</p>
  </>
);

// One voice card — a collectible-style plate. Open/unlocked → a monogram medallion
// + label, selectable. The active narrator is marked with the ember border/wash
// plus a small corner tick (the prominent "Now narrating" read lives in the fixed
// spotlight above the list). Sealed → a wax-seal lock + the iconic quote + a
// "Clue —" line + an ⓘ reference tooltip. Tapping a sealed plate expands the
// touch-friendly `ClueUnlock` field (the only unlock path on phones), so a locked
// row is never a dead tap.
// `desktop` mode: a chip is a PREVIEW trigger only (details + unlock + apply all
// live in the right-hand panel), so the inline clue field and the ⓘ hovercard —
// whose whole job the panel now does — are withheld. `selected` marks the voice
// currently shown in the panel. On mobile (no panel) the chip keeps its original
// job: open voice → apply on tap; sealed voice → expand the inline clue field,
// with the ⓘ reference tooltip.
const VoiceChip = ({ v, active, locked, selected, desktop, onSelect, onPreview }) => {
  const [answering, setAnswering] = useState(false);
  // Collapse the field once the voice opens (locked → false on the next render).
  useEffect(() => { if (!locked) setAnswering(false); }, [locked]);

  const onClick = desktop
    ? () => onPreview(v)
    : locked ? () => setAnswering((o) => !o) : onSelect;

  return (
    <motion.div variants={ITEM} className="voice-chip" data-active={active} data-locked={locked}
      data-selected={desktop && selected ? true : undefined} data-answering={answering || undefined}>
      {/* header row — button + info stay on one line; the clue field expands as a
          separate block BELOW so the info icon never reflows to a new line (which
          caused the content shift + janky open/close). */}
      <div className="voice-chip__top">
        <button
          type="button"
          role="option"
          aria-selected={desktop ? selected : active}
          aria-expanded={!desktop && locked ? answering : undefined}
          data-cursor="hover"
          onClick={onClick}
          className="voice-chip__hit"
        >
          <span className="voice-chip__glyph">
            {locked ? <Lock size={14} /> : <span className="font-chronicle">{v.glyph}</span>}
          </span>
          <span className="min-w-0 flex-1">
            <span className="voice-chip__label" style={{ fontStyle: locked ? 'italic' : 'normal' }}>
              {locked ? v.sample : v.label}
            </span>
            <span className="voice-chip__sub">{locked ? `Clue — ${v.hint}` : v.sample}</span>
          </span>
          {active ? (
            <span className="voice-chip__tick" aria-hidden="true"><Check size={12} /></span>
          ) : !desktop && locked ? (
            <span className="voice-chip__caret" data-open={answering || undefined} aria-hidden="true"><ChevronDown size={14} /></span>
          ) : selected && desktop ? (
            <span className="voice-chip__caret" aria-hidden="true"><ChevronRight size={14} /></span>
          ) : null}
        </button>

        {!desktop && v.info && (
          <Hovercard
            className="voice-chip__info"
            width={210}
            ariaLabel={`What is this voice? ${v.info.name}, ${v.info.source}`}
            content={infoBody(v.info)}
          >
            <Info size={13} />
          </Hovercard>
        )}
      </div>

      <AnimatePresence initial={false}>
        {!desktop && locked && answering && (
          <ClueUnlock key="unlock" voice={v} onUnlocked={() => setAnswering(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * The Voice Hall — a cinematic overlay for picking who narrates the site. v1.1
 * pared it to one clean object: the current voice IS the header (its glyph + name
 * under a "now narrating" eyebrow), then a single scrolling roster of collectible
 * voice plates, then a collapsed "Summon a voice" disclosure (the request form
 * that used to fill a whole right rail). The search bar is gone (few voices; it
 * went unused, like the map's). Picking a voice keeps the Hall open and re-skins
 * everything (this Hall included) in their words, so visitors can try several in a
 * row. Lifted open-state lives in `useVoiceStore` (`hallOpen`) so the popover,
 * recap constellation, and ⌘K map can all summon it.
 */
const VoiceHall = () => {
  const { t } = useTranslation();
  const { hallOpen, closeHall, voice, setVoice, isUnlocked } = useVoiceStore();
  const desktop = useIsDesktop();
  // 'roster' | 'summon' — the summon request is its OWN page inside the Hall
  // (v2.0 D4, mirroring the mobile drawer flow) with a back chevron; the header
  // and footer stay fixed, and only the roster ever scrolls.
  const [view, setView] = useState('roster');
  // Desktop only: which voice is shown in the preview panel (defaults to the
  // active voice each time the Hall opens). Preview is decoupled from apply.
  const [preview, setPreview] = useState(voice);

  useEffect(() => {
    if (!hallOpen) return undefined;
    setView('roster');
    setPreview(voice);
    // Hard-lock the page while the Hall is open. Lenis drives the whole-page
    // scroll, so we stop it AND lock the document — `lockBodyScroll` sets
    // overflow:hidden and pads for the scrollbar width so the page doesn't
    // reflow/"zoom" as the scrollbar disappears (and reappears on close). Inner
    // scrollers carry `data-lenis-prevent` + `overscroll-behavior:contain` so they
    // still scroll natively without leaking to the background.
    const lenis = getLenis();
    lenis?.stop();
    lockBodyScroll();
    pushOverlay(); // hush the hero astrolabe behind the blur
    // Escape steps back out of the summon page first, then closes the Hall.
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setView((v) => {
        if (v === 'summon') return 'roster';
        closeHall();
        return v;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockBodyScroll();
      lenis?.start();
      popOverlay();
    };
  }, [hallOpen, closeHall]);

  const groups = voicesByCategory();
  const discovered = SEALED_VOICES.filter((id) => isUnlocked(id)).length;
  const activeVoice = voiceById(voice);
  const previewVoice = voiceById(preview) || activeVoice;
  const previewLocked = !!(previewVoice && previewVoice.locked && !isUnlocked(previewVoice.id));
  // Picking a voice keeps the Hall open — the copy (this Hall too) re-skins live,
  // inviting the visitor to try several before they close.
  const choose = (id) => { if (id !== voice) setVoice(id); };
  // Desktop: clicking a chip only PREVIEWS it (no re-skin). Analytics counts each
  // voice previewed once/session → "previewed most" vs the applied count below.
  const onPreview = (v) => {
    setPreview(v.id);
    trackOnce(`voice_preview:${v.id}`, 'voice_previewed', { voice: v.id, locked: v.locked && !isUnlocked(v.id), source: 'hall' });
  };
  // Desktop: the panel's apply button is the ONLY thing that re-skins the site.
  // Counted once/session per voice → directly comparable to the preview count.
  const applyPreview = () => {
    if (!previewVoice) return;
    trackOnce(`voice_apply:${previewVoice.id}`, 'voice_applied', { voice: previewVoice.id, source: 'hall' });
    choose(previewVoice.id);
  };

  // Footer — full-width, slim: just the "summon a voice" tile (the discovery
  // count moved up to the Secret Ones category header). Standard popup footer.
  const allFound = discovered >= SEALED_VOICES.length;
  const footerEl = (
    <div className="voice-hall__footer px-6 py-2.5 border-t"
      style={{ borderColor: 'var(--color-card-border)' }}>
      <button type="button" onClick={() => setView('summon')} data-cursor="hover"
        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
        style={{
          border: allFound ? '1px solid rgba(var(--color-ember-rgb),0.5)' : '1px dashed var(--color-card-border)',
          color: 'var(--color-text)',
          background: allFound ? 'rgba(var(--color-ember-rgb),0.12)' : 'color-mix(in srgb, var(--color-primary) 40%, transparent)',
        }}>
        <Plus size={15} style={{ color: 'var(--color-ember)' }} />
        <span className="flex-1 text-left">{t('voiceHall.request.cta')}</span>
        <ChevronRight size={15} style={{ color: 'var(--color-text-muted)' }} />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {hallOpen && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label={t('voiceHall.title')}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }} onClick={closeHall} />

          <motion.div className={`voice-hall relative w-full rounded-3xl overflow-hidden flex flex-col ${desktop && view === 'roster' ? 'max-w-3xl' : 'max-w-lg'}`}
            style={{ maxHeight: 'min(88vh, 720px)' }}
            initial={{ scale: 0.94, y: 14, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}>

            {/* ambient backdrop — ember/gold aura + faint star dust */}
            <div className="voice-hall__aura" aria-hidden="true" />

            {/* header — FIXED on both views. Roster: the current voice IS the
                header. Summon: a back chevron + the request title (v2.0 D4). */}
            <div className="voice-hall__header">
              {view === 'summon' ? (
                <>
                  <button type="button" onClick={() => setView('roster')} aria-label={t('voiceHall.request.back')} data-cursor="hover"
                    className="grid place-items-center w-8 h-8 rounded-lg flex-shrink-0" style={{ border: '1px solid var(--color-card-border)', color: 'var(--color-text)' }}>
                    <ChevronLeft size={16} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="voice-spotlight__eyebrow">{t('voiceHall.request.section')}</p>
                    <h2 className="voice-hall__title font-chronicle">{t('voiceHall.request.cta')}</h2>
                  </div>
                </>
              ) : (
                <>
                  <motion.span key={`g-${activeVoice?.id}`} className="voice-hall__crest font-chronicle"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
                    {activeVoice ? activeVoice.glyph : <Feather size={18} />}
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="voice-spotlight__eyebrow">{t('voiceHall.nowNarrating')}</p>
                    <motion.h2 key={`n-${activeVoice?.id}`} className="voice-hall__title font-chronicle"
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                      {activeVoice ? activeVoice.label : t('voiceHall.title')}
                    </motion.h2>
                  </div>
                </>
              )}
              <button type="button" onClick={closeHall} aria-label={t('voiceHall.close')} data-cursor="hover"
                className="grid place-items-center w-8 h-8 rounded-lg flex-shrink-0" style={{ border: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)' }}>
                <X size={15} />
              </button>
            </div>

            {view === 'summon' ? (
              /* The summon page — the form stands alone, always fully visible
                 (its own pane scrolls only if a short viewport forces it). */
              <motion.div key="summon" className="voice-hall__body" data-lenis-prevent
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
                <VoiceRequest />
              </motion.div>
            ) : (
              /* The roster — the ONLY scrolling region of the Hall.
                 data-lenis-prevent so the wheel scrolls THIS pane, not the page. */
              <>
              {/* Plain explainer so a non-technical visitor knows what this menu
                  does — FIXED between the header and the scrolling roster (owner
                  follow-up), so only the voice list scrolls. */}
              <p className="voice-hall__explainer">{t('voiceHall.explainer')}</p>
              <div className="voice-hall__cols" data-two={desktop || undefined}>
                <div className="voice-hall__body" data-lenis-prevent>
                  {groups.map((g) => (
                    <section key={g.id} className="voice-hall__group">
                      {/* sticky category header — sticks to the top of the scroll
                          area; the sealed row also carries the discovery count. */}
                      <div className="voice-hall__grouplabel">
                        <span>{t(`voiceHall.categories.${g.id}`)}</span>
                        {g.id === 'sealed' && (
                          <span className="voice-hall__groupcount">{t('voiceHall.foundShort', { count: discovered, total: SEALED_VOICES.length })}</span>
                        )}
                      </div>
                      <motion.div className="voice-hall__list" variants={STAGGER} initial="hidden" animate="show">
                        {g.items.map((v) => (
                          <VoiceChip key={v.id} v={v} active={voice === v.id}
                            locked={v.locked && !isUnlocked(v.id)}
                            desktop={desktop} selected={preview === v.id}
                            onPreview={onPreview} onSelect={() => choose(v.id)} />
                        ))}
                      </motion.div>
                    </section>
                  ))}
                </div>
                {desktop && previewVoice && (
                  <aside className="voice-preview" aria-live="polite" data-lenis-prevent>
                    <VoicePreviewCard
                      key={previewVoice.id}
                      v={previewVoice}
                      active={voice === previewVoice.id}
                      locked={previewLocked}
                      onApply={applyPreview}
                      onUnlocked={() => setPreview(previewVoice.id)}
                    />
                  </aside>
                )}
              </div>
              {/* Full-width footer — the standard popup pattern. */}
              {footerEl}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceHall;
