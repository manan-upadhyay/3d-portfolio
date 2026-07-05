import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, Hammer } from 'lucide-react';
import Hero from '../sections/Hero';
import { ErrorBoundary, SideRail, MapOverlay, StickyCta } from '../components';
import { chapterList } from '../constants';
import { useExpedition } from '../hooks/useExpedition';
import { restoreScroll, consumeSectionRequest, scrollToSection } from '../lib/smoothScroll';
import { sound } from '../lib/sound';
import { track, trackOnce } from '../lib/analytics';

const About = lazy(() => import('../sections/About'));
const Experience = lazy(() => import('../sections/Experience'));
const Tech = lazy(() => import('../sections/Tech'));
const Works = lazy(() => import('../sections/Works'));
const Contact = lazy(() => import('../sections/Contact'));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-2 border-[var(--color-ember)] border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Chapters 00–05 of The Chronicle — the scroll-directed journey. The Atelier
 * coda now lives on its own route (/making-of); the foot of The Realms is the
 * doorway to it (see Works.jsx). On return from the Atelier we restore the
 * scroll position the visitor stepped out from.
 */
const Chronicle = () => {
  const { activeId } = useOutletContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mapOpen, setMapOpen] = useState(false);
  useExpedition(); // accumulate session scroll distance → the Phase 5 recap

  // Rail data: the six chapters, then a Map action + a quiet doorway to the
  // Atelier (audit — always-available making-of nav, kept subtle: an extra
  // footer action below the map, never a seventh "chapter").
  const railItems = chapterList.map((c) => ({
    id: c.id, no: c.no, label: t(`chapters.${c.id}.label`),
    onClick: () => { track('rail_nav', { id: c.id }); scrollToSection(c.id); },
  }));
  const railActions = [
    { key: 'map', label: t('nav.map'), ariaLabel: t('nav.openMap'), kbd: true,
      glyph: <Map size={17} style={{ color: 'var(--color-ember)' }} />, onClick: () => setMapOpen(true) },
    { key: 'makingOf', label: t('nav.makingOf'), ariaLabel: t('nav.makingOf'),
      glyph: <Hammer size={16} style={{ color: 'var(--color-text-muted)' }} />,
      onClick: () => { track('making_of_enter', { from: 'rail' }); navigate('/making-of'); } },
  ];

  // Returning from the Atelier: an explicit destination (e.g. "Contact" tapped
  // on /making-of) wins; otherwise drop the visitor back at the doorway they left.
  useEffect(() => {
    const cancelRequest = consumeSectionRequest();
    const cancelRestore = restoreScroll();
    return () => { cancelRequest(); cancelRestore(); };
  }, []);

  // Map open / close whoosh — fire on transitions only (skip the initial mount).
  const mapWasOpen = useRef(false);
  useEffect(() => {
    if (mapOpen === mapWasOpen.current) return;
    sound.playCue(mapOpen ? 'mapOpen' : 'mapClose');
    if (mapOpen) track('map_open');
    mapWasOpen.current = mapOpen;
  }, [mapOpen]);

  // ⌘K — toggle the realm map (Chronicle-only).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        trackOnce('shortcut:map', 'shortcut_used', { combo: 'cmd+k' }); // keyboard power-user
        setMapOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The mobile MobileMenu (in Layout) is route-agnostic; it opens the map by
  // dispatching this event, which only the Chronicle (owner of the map state) hears.
  useEffect(() => {
    const openMap = () => setMapOpen(true);
    window.addEventListener('chronicle:open-map', openMap);
    return () => window.removeEventListener('chronicle:open-map', openMap);
  }, []);

  return (
    <>
      <SideRail activeId={activeId} items={railItems} actions={railActions} visible={activeId !== 'origin'} />
      <MapOverlay open={mapOpen} onClose={() => setMapOpen(false)} activeId={activeId} />
      <StickyCta activeId={activeId} />

      <Hero />

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}><About /></Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}><Experience /></Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}><Tech /></Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}><Works /></Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Chronicle;
