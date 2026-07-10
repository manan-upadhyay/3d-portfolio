import { lazy, Suspense, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { ErrorBoundary, SideRail } from '../components';
import { eraActs } from '../constants';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../lib/smoothScroll';
import { track } from '../lib/analytics';

const TimeMachine = lazy(() => import('../sections/TimeMachine'));

// Module-level (stable ref) so useActiveSection's effect doesn't re-run per render.
const ERA_IDS = eraActs.map((a) => a.id);

const PageLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-10 h-10 border-2 border-[var(--color-ember)] border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * The Time Machine as its own destination (/time-machine) — the STRATA coda that
 * showcases Manan's earlier portfolios as preserved ruins you descend to reach.
 * Off the six-realm spine (like /making-of); its only chrome is the era rail +
 * a return doorway. Global controls (sky / voice / sound) come from Layout.
 */
const TimeMachinePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const activeEra = useActiveSection(ERA_IDS); // rail highlight for the strata

  const railItems = eraActs.map((a) => ({
    id: a.id, no: a.no, label: t(a.labelKey),
    onClick: () => { track('rail_nav', { id: a.id, where: 'time-machine' }); scrollToSection(a.id); },
  }));
  const railActions = [
    { key: 'home', label: t('timeMachine.back'), ariaLabel: t('timeMachine.back'),
      glyph: <ArrowLeft size={16} />,
      onClick: () => { track('time_machine_exit', { from: 'rail' }); navigate('/'); } },
  ];

  useEffect(() => { track('time_machine_view'); }, []);

  return (
    <main className="pt-20">
      <SideRail activeId={activeEra} items={railItems} actions={railActions} visible
        ariaLabel={t('timeMachine.back')} crestLabel="Manan Upadhyay" />

      {/* Return doorway — mobile only (the rail is desktop-only). */}
      <Link to="/" data-cursor="hover" className="atelier-return md:hidden">
        <ArrowLeft size={16} strokeWidth={1.75} />
        <span>{t('timeMachine.back')}</span>
      </Link>

      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}><TimeMachine /></Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default TimeMachinePage;
