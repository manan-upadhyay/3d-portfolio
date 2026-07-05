import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, Compass, Mail, Download, ChevronLeft, ChevronRight,
  Drama, Check, Lock, ChevronDown, Plus, Info, Clapperboard, ArrowUpRight, ArrowLeft,
} from 'lucide-react';
import { useVoiceStore } from '../store/useVoiceStore';
import { useSoundStore } from '../store/useSoundStore';
import { sound } from '../lib/sound';
import { pushOverlay, popOverlay } from '../lib/uiOverlay';
import { personalInfo, chapterList } from '../constants';
import { voicesByCategory, SEALED_VOICES, voiceById } from '../i18n/voices';
import { scrollToSection, requestSection, getLenis } from '../lib/smoothScroll';
import { track } from '../lib/analytics';
import ThemeWheel from './ThemeWheel';
import VolumeDial from './VolumeDial';
import Hovercard from './Hovercard';
import ClueUnlock from './ClueUnlock';
import VoiceRequest from './VoiceRequest';

/**
 * MobileMenu — the single entry point for every control on touch/small screens
 * (v1.1 Workstream E / P1.5). One labelled FAB opens a bottom sheet organised into
 * three self-explanatory groups separated by quiet dividers (no headings needed):
 *
 *   1. Site feel   — the radial ThemeWheel + the Apple-style VolumeDial (tactile
 *                    instruments, not button rows).
 *   2. Explore     — Navigate + Persona, each opening an IN-SHEET drawer VIEW.
 *   3. Quick       — Go to Contact + Download résumé.
 *
 * Sub-views (nav / voice / summon) slide in with a back-chevron header, so no
 * centred modal can ever run off-screen. Portalled so no ancestor can clip it.
 */

// Attribution card body — mirrors the desktop VoiceSwitcher so touch users get the
// same "who is this voice" reference (the info button Beta users missed on mobile).
const infoBody = (info) => (
  <>
    <p className="text-[12px] font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{info.name}</p>
    <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-ember)' }}>{info.source}</p>
    <p className="text-[11px] mt-1.5 leading-snug" style={{ color: 'var(--color-text-muted)' }}>{info.note}</p>
  </>
);

// The PRIMARY actions — Contact (filled) + Résumé (outline). These carry the most
// visual weight in the sheet: they are what the target audience (recruiters, CTOs)
// actually come for. `variant` = 'filled' | 'outline'.
const PrimaryCta = ({ icon: Icon, label, onClick, href, variant }) => {
  const cls = `menu-cta menu-cta--${variant}`;
  const inner = <><Icon size={16} strokeWidth={1.9} aria-hidden="true" /><span>{label}</span></>;
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>{inner}</a>
    : <button type="button" onClick={onClick} className={cls}>{inner}</button>;
};

// A secondary "explore" row inside a grouped iOS-style list (Navigate / Persona).
const ExploreRow = ({ icon: Icon, label, onClick }) => (
  <button type="button" onClick={onClick} className="menu-row">
    <span className="menu-row__icon"><Icon size={16} strokeWidth={1.7} aria-hidden="true" /></span>
    <span className="menu-row__label">{label}</span>
    <ChevronRight size={16} className="menu-row__chev" aria-hidden="true" />
  </button>
);

// The Atelier's own nav sections (v2.0 C5) — the making-of page gets a Navigate
// drawer too, listing its acts instead of the Chronicle chapters. Ids match the
// Act/section anchors in sections/Atelier.jsx; labels are voiced.
const ATELIER_SECTIONS = [
  { id: 'build', no: 'I', labelKey: 'atelier.acts.build' },
  { id: 'engine', no: 'II', labelKey: 'atelier.acts.engine' },
  { id: 'hidden', no: 'III', labelKey: 'atelier.acts.hidden' },
  { id: 'offmap', no: '—', labelKey: 'atelier.offmap.title' },
];

// ── Navigate drawer — a scannable numbered chapter list (faster than a map plate
// on a phone, and it never clips). On /making-of it lists the Atelier's acts. ──
const NavDrawer = ({ activeId, onTravel, isChronicle }) => {
  const { t } = useTranslation();
  if (!isChronicle) {
    return (
      <div className="flex flex-col gap-2 pb-1">
        {ATELIER_SECTIONS.map((p) => (
          <button key={p.id} type="button" onClick={() => onTravel(p.id)}
            className="sheet-card flex items-center gap-3.5 h-14 px-3 text-left">
            <span className="grid place-items-center w-8 h-8 rounded-full font-chronicle text-[13px] font-semibold flex-shrink-0"
              style={{ color: 'var(--color-text-muted)', border: '1px solid color-mix(in srgb, var(--color-text) 18%, transparent)' }}>
              {p.no}
            </span>
            <span className="block text-[14px] font-medium leading-tight" style={{ color: 'var(--color-text)' }}>
              {t(p.labelKey)}
            </span>
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 pb-1">
      {chapterList.map((p) => {
        const active = activeId === p.id;
        const label = t(`chapters.${p.id}.label`);
        const sub = t(`chapters.${p.id}.sub`);
        return (
          <button key={p.id} type="button" onClick={() => onTravel(p.id)}
            className={`sheet-card ${active ? 'sheet-card--active' : ''} flex items-center gap-3.5 h-14 px-3 text-left`}
            aria-current={active ? 'true' : undefined}>
            <span className="grid place-items-center w-8 h-8 rounded-full font-chronicle text-[13px] font-semibold flex-shrink-0"
              style={{
                background: active ? 'var(--color-ember)' : 'transparent',
                color: active ? '#1a1208' : 'var(--color-text-muted)',
                border: `1px solid ${active ? 'var(--color-ember)' : 'color-mix(in srgb, var(--color-text) 18%, transparent)'}`,
              }}>
              {p.no}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium leading-tight" style={{ color: active ? 'var(--color-ember)' : 'var(--color-text)' }}>
                {label}
              </span>
              {/* only show the sub when it actually differs from the label
                  (origin/about have identical label+sub — no redundant echo) */}
              {sub && sub !== label && (
                <span className="block text-[11.5px] leading-tight mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>
                  {sub}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// One voice row inside the Persona drawer. Now carries the ⓘ reference (name +
// show) that desktop has — restored for touch. Sealed rows expand ClueUnlock.
const VoiceDrawerRow = ({ v, active, locked, onSelect }) => {
  const [answering, setAnswering] = useState(false);
  useEffect(() => { if (!locked) setAnswering(false); }, [locked]);
  return (
    <div className={`sheet-card ${active ? 'sheet-card--active' : ''} overflow-hidden`}>
      <div className="flex items-center">
        <button type="button" onClick={locked ? () => setAnswering((o) => !o) : onSelect}
          aria-expanded={locked ? answering : undefined} aria-pressed={!locked ? active : undefined}
          className="flex items-center gap-3 flex-1 min-w-0 px-3.5 py-2.5 text-left">
          <span className="grid place-items-center w-5 flex-shrink-0">
            {locked ? <Lock size={13} style={{ color: 'var(--color-text-muted)' }} />
              : active ? <Check size={15} style={{ color: 'var(--color-ember)' }} />
              : <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-card-border)' }} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-medium leading-tight" style={{ color: active ? 'var(--color-ember)' : 'var(--color-text)', fontStyle: locked ? 'italic' : 'normal' }}>
              {locked ? v.sample : v.label}
            </span>
            <span className="block text-[11.5px] leading-snug mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {locked ? `Clue — ${v.hint}` : v.sample}
            </span>
          </span>
          {locked && <ChevronDown size={15} className="flex-shrink-0 transition-transform" style={{ color: 'var(--color-text-muted)', transform: answering ? 'rotate(180deg)' : 'none' }} />}
        </button>

        {v.info && (
          <Hovercard
            className="grid place-items-center w-9 h-9 mr-1.5 rounded-full flex-shrink-0"
            width={220}
            ariaLabel={`What is this voice? ${v.info.name}, ${v.info.source}`}
            content={infoBody(v.info)}
          >
            <Info size={15} style={{ color: 'var(--color-text-muted)' }} />
          </Hovercard>
        )}
      </div>
      <AnimatePresence initial={false}>
        {locked && answering && (
          <div className="px-3.5 pb-2.5">
            <ClueUnlock key="u" voice={v} onUnlocked={() => setAnswering(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Persona drawer — a fixed "now narrating" header, a SCROLLING roster, and a
// sticky footer (summon + discovery count). Only the roster scrolls. ─────────────
const VoiceDrawer = ({ onSummon }) => {
  const { t } = useTranslation();
  const { voice, setVoice, isUnlocked } = useVoiceStore();
  const groups = voicesByCategory();
  const discovered = SEALED_VOICES.filter((id) => isUnlocked(id)).length;
  const activeVoice = voiceById(voice);
  const choose = (id) => { if (id !== voice) setVoice(id); };

  return (
    <div className="flex flex-col" style={{ maxHeight: '72vh' }}>
      {/* fixed header — always shows who's narrating (desktop parity) */}
      {activeVoice && (
        <div className="flex items-center gap-3 pb-3 flex-shrink-0">
          <span className="grid place-items-center w-10 h-10 rounded-full flex-shrink-0 font-chronicle text-[15px]"
            style={{ background: 'rgba(var(--color-ember-rgb),0.14)', color: 'var(--color-ember)', border: '1px solid rgba(var(--color-ember-rgb),0.3)' }}>
            {activeVoice.glyph}
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              {t('voiceHall.nowNarrating')}
            </span>
            <span className="block text-[15px] font-semibold leading-tight" style={{ color: 'var(--color-ember)' }}>
              {activeVoice.label}
            </span>
          </span>
        </div>
      )}

      {/* scrolling roster — the only scrollable region */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain -mx-1 px-1" data-lenis-prevent>
        <div className="flex flex-col gap-4 pb-2">
          {groups.map((g) => (
            <div key={g.id} className="flex flex-col gap-2">
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold px-1" style={{ color: 'var(--color-text-muted)' }}>
                {t(`voiceHall.categories.${g.id}`)}
              </p>
              {g.items.map((v) => (
                <VoiceDrawerRow key={v.id} v={v} active={voice === v.id}
                  locked={v.locked && !isUnlocked(v.id)} onSelect={() => choose(v.id)} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* sticky footer — summon (its own page) + the discovery count */}
      <div className="flex-shrink-0 pt-3" style={{ borderTop: '1px solid var(--color-card-border)' }}>
        <button type="button" onClick={onSummon}
          className="flex items-center gap-2.5 w-full px-3.5 py-3 rounded-xl text-[13px] font-medium"
          style={{ border: '1px dashed var(--color-card-border)', color: 'var(--color-text)', background: 'color-mix(in srgb, var(--color-primary) 40%, transparent)' }}>
          <Plus size={15} style={{ color: 'var(--color-ember)' }} />
          <span className="flex-1 text-left">{t('voiceHall.request.cta')}</span>
          <ChevronRight size={15} style={{ color: 'var(--color-text-muted)' }} />
        </button>
        <p className="text-[11px] text-center mt-2.5" style={{ color: 'var(--color-text-muted)' }}>
          <span className="font-mono uppercase tracking-wider">{t('voiceHall.found', { count: discovered, total: SEALED_VOICES.length })}</span>
        </p>
      </div>
    </div>
  );
};

const SLIDE = { type: 'spring', stiffness: 380, damping: 38 };

const MobileMenu = ({ activeId }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isChronicle = pathname === '/';
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('main'); // main | nav | voice | summon
  const dragControls = useDragControls(); // swipe-down close, started from the grabber
  const { enabled, unlocked } = useSoundStore();
  const soundArmed = enabled && !unlocked; // on by preference, browser gate still shut

  // One-time (per session) coach-tip on the FAB — on mobile the sound/theme/voice
  // controls live INSIDE this menu, so a first-time visitor has no way to know the
  // sound layer exists. A quiet bubble points them here, then never nags again.
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('menuCoachSeen') === '1'; } catch { /* private mode */ }
    if (seen) return undefined;
    const inT = setTimeout(() => setShowTip(true), 2600);
    const outT = setTimeout(() => setShowTip(false), 10000);
    return () => { clearTimeout(inT); clearTimeout(outT); };
  }, []);
  const dismissTip = () => {
    if (!showTip) return;
    setShowTip(false);
    try { sessionStorage.setItem('menuCoachSeen', '1'); } catch { /* private mode */ }
  };

  const goBack = () => setView(view === 'summon' ? 'voice' : 'main');

  // Hard-lock the page while the sheet is open (v2.0 C3) — same mechanism as the
  // Voice Hall: stop Lenis (desktop-sized touch devices) AND overflow:hidden the
  // document so touch scroll inside the sheet can never chain to the page.
  useEffect(() => {
    if (!open) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open]);

  // Escape steps back a sub-view first, else closes. Reset on route change / close.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (view === 'summon') setView('voice');
      else if (view !== 'main') setView('main');
      else setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, view]);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (!open) setView('main'); }, [open]);
  // While the sheet is open it sits IN FRONT of the hero — register it as an overlay
  // so the astrolabe goes dormant (frozen needle, silent gear) behind it.
  useEffect(() => {
    if (!open) return undefined;
    pushOverlay();
    return () => popOverlay();
  }, [open]);

  const close = () => setOpen(false);
  const onContact = () => {
    track('mobile_menu_cta', { target: 'contact' });
    close();
    if (isChronicle) setTimeout(() => scrollToSection('contact'), 140);
    else { requestSection('contact'); navigate('/'); } // route home → land on Summon (v2.0 C5)
  };
  const onTravel = (id) => { track('map_travel', { id, from: 'mobile' }); close(); setTimeout(() => scrollToSection(id), 140); };
  const onMakingOf = () => { track('making_of_enter', { from: 'mobile' }); close(); navigate('/making-of'); };
  const onBackHome = () => { track('mobile_menu_cta', { target: 'home' }); close(); navigate('/'); };

  const inSub = view !== 'main';
  const title = view === 'nav' ? t('nav.navigate')
    : view === 'voice' ? t('voice.menuTitle')
    : view === 'summon' ? t('voiceHall.request.cta')
    : null;

  return createPortal(
    <div className="md:hidden">
      {/* FAB coach-tip — one-time, points at the menu where sound/theme/voice live. */}
      <AnimatePresence>
        {showTip && !open && (
          <motion.button
            type="button"
            onClick={() => { dismissTip(); sound.suppressReward(); sound.unlock(); setOpen(true); }}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed bottom-20 right-5 z-[60] max-w-[75vw] text-left rounded-2xl px-4 py-3"
            style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)', boxShadow: 'var(--shadow-card)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <p className="text-[12.5px] leading-snug" style={{ color: 'var(--color-text)' }}>{t('nav.menuCoach')}</p>
            <span className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
              style={{ background: 'var(--color-card-bg)', borderRight: '1px solid var(--color-card-border)', borderBottom: '1px solid var(--color-card-border)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => { const next = !open; setOpen(next); if (next) { dismissTip(); sound.suppressReward(); sound.unlock(); } }}
        aria-label={open ? t('nav.close') : t('nav.menu')}
        aria-expanded={open}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-[60] grid place-items-center w-12 h-12 rounded-full"
        style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)', boxShadow: 'var(--shadow-card)', color: 'var(--color-ember)' }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
        {/* "sound is primed" dot — a quiet signal there's an audio layer waiting. */}
        {soundArmed && !open && (
          <motion.span
            className="absolute top-1 right-1 w-2 h-2 rounded-full pointer-events-none"
            style={{ background: 'var(--color-ember)' }}
            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.45)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              role="menu" aria-label={t('nav.menu')}
              className="mobile-sheet fixed bottom-0 inset-x-0 z-[58] rounded-t-3xl px-5 pt-3 pb-[64px]"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              /* Swipe-down to dismiss (v2.0 C5) — the gesture every bottom sheet
                 has trained users to expect. The drag starts ONLY from the header
                 grabber (dragControls), so it never fights the scrolling lists. */
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => { if (info.offset.y > 90 || info.velocity.y > 600) close(); }}
            >
              {/* header — grabber (main) OR back-chevron + title (sub-view). Both
                  are the swipe-down handle: touch here and pull to dismiss. */}
              {inSub ? (
                <div className="flex items-center gap-2 mb-4 -ml-1"
                  style={{ touchAction: 'none' }}
                  onPointerDown={(e) => dragControls.start(e)}>
                  <button type="button" onClick={goBack} aria-label={t('nav.menu')}
                    className="grid place-items-center w-9 h-9 rounded-full flex-shrink-0"
                    style={{ border: '1px solid var(--color-card-border)', color: 'var(--color-text)' }}>
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-[13px] font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--color-text-muted)' }}>{title}</span>
                </div>
              ) : (
                <div className="mb-5 -mx-5 px-5 pt-1 pb-2" style={{ touchAction: 'none' }}
                  onPointerDown={(e) => dragControls.start(e)} aria-hidden="true">
                  <div className="mx-auto h-1 w-10 rounded-full" style={{ background: 'var(--color-card-border)' }} />
                </div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {view === 'main' && (
                  <motion.div key="main" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={SLIDE}
                    className="overflow-y-auto overscroll-contain" data-lenis-prevent style={{ maxHeight: '76vh' }}>

    {/* 1 · Site feel — dial LEFT, theme wheel RIGHT (v2.0 C2: the wheel is
                        the richer gesture and belongs under the thumb, which rests
                        on the right for most hands). */}
                    <div className="feel-row">
                      <div className="feel-well"><VolumeDial /></div>
                      <div className="feel-well"><ThemeWheel /></div>
                    </div>

                    <hr className="sheet-divider" />

                    {/* 2 · PRIMARY — the reason recruiters/CTOs are here. Given the most
                        weight: a filled Contact + a strong Résumé, above everything else. */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <PrimaryCta variant="filled" icon={Mail} label={t('footer.getInTouch')} onClick={onContact} />
                      <PrimaryCta variant="outline" icon={Download} label={t('hero.ctaResume')} href={personalInfo.resumeLink}
                        onClick={() => { track('mobile_menu_cta', { target: 'resume' }); close(); }} />
                    </div>

                    {/* 3 · Explore — secondary, a quiet grouped list. Navigate now
                        exists on BOTH routes (v2.0 C5): the making-of page gets its
                        own act list in the drawer. */}
                    <div className="menu-list mt-4">
                      <ExploreRow icon={Compass} label={t('nav.navigate')} onClick={() => setView('nav')} />
                      <ExploreRow icon={Drama} label={t('nav.voice')} onClick={() => setView('voice')} />
                    </div>

                    {/* 4 · The other route — a quiet footnote (not a peer of the
                        above): the making-of doorway on the Chronicle, the way home
                        on /making-of. */}
                    {isChronicle ? (
                      <button type="button" onClick={onMakingOf} className="menu-footlink">
                        <Clapperboard size={13} strokeWidth={1.7} aria-hidden="true" />
                        {t('atelier.eyebrow')}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </button>
                    ) : (
                      <button type="button" onClick={onBackHome} className="menu-footlink">
                        <ArrowLeft size={13} strokeWidth={1.7} aria-hidden="true" />
                        {t('makingOf.back')}
                      </button>
                    )}
                  </motion.div>
                )}

                {view === 'nav' && (
                  <motion.div key="nav" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={SLIDE}
                    className="overflow-y-auto overscroll-contain" data-lenis-prevent style={{ maxHeight: '72vh' }}>
                    <NavDrawer activeId={activeId} onTravel={onTravel} isChronicle={isChronicle} />
                  </motion.div>
                )}

                {view === 'voice' && (
                  <motion.div key="voice" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={SLIDE}>
                    <VoiceDrawer onSummon={() => setView('summon')} />
                  </motion.div>
                )}

                {view === 'summon' && (
                  <motion.div key="summon" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={SLIDE}
                    className="overflow-y-auto overscroll-contain" data-lenis-prevent style={{ maxHeight: '72vh' }}>
                    <VoiceRequest />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

export default MobileMenu;
