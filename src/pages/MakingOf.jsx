import { lazy, Suspense, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { ErrorBoundary, SideRail } from '../components';
import { atelierActs } from '../constants';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../lib/smoothScroll';
import { track } from '../lib/analytics';

const Atelier = lazy(() => import('../sections/Atelier'));

// Module-level (stable ref) so useActiveSection's effect doesn't re-run per render.
const ATELIER_IDS = atelierActs.map((a) => a.id);

const PageLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-10 h-10 border-2 border-[var(--color-ember)] border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * The Atelier as its own destination (/making-of) — the workshop behind the
 * Chronicle. It steps outside the six-realm fiction deliberately: a shareable,
 * standalone "behind the curtain" page. The only chrome it adds is a single
 * return doorway; the global controls (sky / voice / sound) come from Layout.
 */
const MakingOf = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const activeAct = useActiveSection(ATELIER_IDS); // rail highlight for the acts

  // The Atelier's own rail (audit #7): its acts, then a quiet "return to the
  // Chronicle" action in the footer slot — the desktop counterpart to the mobile
  // return doorway below.
  const railItems = atelierActs.map((a) => ({
    id: a.id, no: a.no, label: t(a.labelKey),
    onClick: () => { track('rail_nav', { id: a.id, where: 'making-of' }); scrollToSection(a.id); },
  }));
  const railActions = [
    { key: 'home', label: t('makingOf.back'), ariaLabel: t('makingOf.back'),
      glyph: <ArrowLeft size={16} />,
      onClick: () => { track('making_of_exit', { from: 'rail' }); navigate('/'); } },
  ];

  // The Atelier is the "did they go behind the curtain?" signal (beyond the raw
  // /making-of pageview — a named event keeps it in the same funnel vocabulary).
  useEffect(() => { track('atelier_view'); }, []);

  // Scroll-depth on /making-of (Beta 1 tracked only the pageview here). Fire each
  // 25/50/75/100 milestone once so we can see how far the case study is read.
  useEffect(() => {
    const seen = new Set();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !seen.has(m)) { seen.add(m); track('atelier_scroll_depth', { pct: m }); }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <main className="pt-20">
      {/* Desktop: the persistent acts rail (with a quiet "return" action). Mobile
          keeps the top return doorway below (the rail is desktop-only). */}
      <SideRail activeId={activeAct} items={railItems} actions={railActions} visible
        ariaLabel={t('makingOf.back')} crestLabel="Manan Upadhyay" />

      {/* The return doorway — mobile only on desktop the rail's action replaces it. */}
      <Link to="/" data-cursor="hover" className="atelier-return md:hidden">
        <ArrowLeft size={16} strokeWidth={1.75} />
        <span>{t('makingOf.back')}</span>
      </Link>

      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}><Atelier /></Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default MakingOf;
