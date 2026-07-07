import { useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Linkedin, Github, Download, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../constants';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useThemeStore } from '../store/useThemeStore';
import { useVoiceStore } from '../store/useVoiceStore';
import { useSmoothScroll, getLenis, scrollToSection, requestSection } from '../lib/smoothScroll';
import { useActiveSection } from '../hooks/useActiveSection';
import { useEngagementAnalytics } from '../hooks/useEngagementAnalytics';
import { useVisitStore } from '../hooks/useExpedition';
import { sound } from '../lib/sound';
import { track, trackOnce, registerContext, capturePageview } from '../lib/analytics';
import { useSoundStore } from '../store/useSoundStore'; // rehydrate sound prefs into the engine at boot
import Cursor from './Cursor';
import SkyControl from './SkyControl';
import ControlCluster from './ControlCluster';
import MobileMenu from './MobileMenu';
import MobileVoiceMark from './MobileVoiceMark';
import DayNightToggle from './DayNightToggle';
import EasterEggListener from './EasterEggListener';
import VoiceTransition from './VoiceTransition';
import VoiceHall from './VoiceHall';

/**
 * On every route change, settle the scroll. The Chronicle restores its own
 * remembered position on mount (see Chronicle.jsx); any other destination — the
 * Atelier, or a fresh deep-link — should simply open at the top.
 */
const ScrollManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/') return; // Chronicle handles its own restore
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * The persistent shell shared by every route: smooth scroll, the global
 * controls (sky / voice / sound), the boot side-effects, and the footer. Route
 * content renders through <Outlet/>; the live `activeId` is handed down so the
 * Chronicle's SideRail + map and the voice "entice" note stay scroll-aware.
 */
const Layout = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === 'dark';
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useSmoothScroll();
  const activeId = useActiveSection();
  useEngagementAnalytics(activeId, pathname); // section_view + scroll_depth

  // Sound engine boot: arm the first-gesture unlock + preload the optional raven
  // sample (degrades to a synthesized flight if the file is absent).
  useEffect(() => {
    sound.arm();
    sound.loadRaven();
    sound.loadBeds(); // preload the optional astrolabe + arsenal loop samples
    useVisitStore.getState().bump(); // count this visit (local tally for the recap)

    // Analytics — "did they ever hear the site?" (fire-once on first unlock).
    sound.onUnlock(() => track('sound_first_play'));

    // Store-derived super-properties. The device/static ones (device_os/browser,
    // beta_round, tracking_version…) are registered SYNCHRONOUSLY in main.jsx
    // before the first pageview (the null-rate fix); these three need the stores,
    // which are ready by mount. Voice/theme stay fresh via their own effects.
    registerContext({
      returning_visitor: useVisitStore.getState().visits > 1,
      sound_enabled: useSoundStore.getState().enabled,
      voice: useVoiceStore.getState().voice,
    });

    // Session heartbeats — capture the depth of SHORT sessions that the
    // page-leave recap misses (Beta 1 recap coverage was only ~36%). One-shot each.
    const beats = [15, 30, 60].map((s) =>
      setTimeout(() => track('session_heartbeat', { seconds: s }), s * 1000));
    return () => beats.forEach(clearTimeout);
  }, []);

  // Pageviews — captured manually (auto-pageview is off; see main.jsx) on initial
  // mount and every SPA route change, so both `/` and `/making-of` are tracked and
  // every pageview carries the super-properties registered before render.
  useEffect(() => { capturePageview(); }, [pathname]);

  // Keep the resolved theme as a live super-property so every event/heatmap can
  // be split by dark vs light.
  useEffect(() => { registerContext({ theme: resolvedTheme }); }, [resolvedTheme]);

  // ⇧⌘V (⇧⌃V) — summon the Voice Hall. Global to every route.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        trackOnce('shortcut:hall', 'shortcut_used', { combo: 'shift+cmd+v' }); // keyboard power-user
        const { hallOpen, openHall, closeHall } = useVoiceStore.getState();
        (hallOpen ? closeHall : openHall)();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative z-0 min-h-screen transition-colors duration-500"
      style={{ background: isDark ? 'var(--color-primary)' : 'var(--gradient-hero)' }}>
      <div className={isDark ? 'aurora-bg' : 'sunrise-bg'} />

      {/* persistent chrome — present on every route. On md: down the scattered
          floating controls collapse into a single MobileMenu (Workstream E). */}
      <Cursor />
      <div className="hidden md:block fixed top-5 right-5 z-40"><SkyControl /></div>
      {/* The sun/moon flip stayed a crowd favourite — keep it on mobile too (the
          full 5-mode sky picker also lives in the MobileMenu). */}
      <div className="md:hidden fixed top-4 right-4 z-40"><DayNightToggle /></div>
      <div className="hidden md:contents"><ControlCluster activeId={activeId} /></div>
      <MobileMenu activeId={activeId} />
      <MobileVoiceMark />
      <EasterEggListener />
      <VoiceTransition />
      <VoiceHall />
      <ScrollManager />

      <Outlet context={{ activeId }} />

      {/* Final conversion scene — the journey closes on a clear ask, not a dead
          end (v1.1 Workstream B). Doubles as the /making-of closing CTA. */}
      <footer className="border-t" style={{ borderColor: 'var(--color-card-border)' }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="font-chronicle font-semibold leading-[1.05] text-[clamp(32px,5vw,54px)]" style={{ color: 'var(--color-text)' }}>
            {t('footer.closeHead')}
          </h2>
          <p className="mt-4 text-[16px] leading-[26px] max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            {t('footer.closeSub')}
          </p>

          {/* Mobile gets its own composition (v2.0 feedback: the wrapping row read
              congested + asymmetric on phones): a full-width primary ask, then a
              symmetric 3-up row of quiet links. Desktop keeps the inline row. */}
          <div className="footer-actions mt-8">
            <button
              type="button" data-cursor="hover" className="btn-primary footer-actions__primary"
              onClick={() => { track('footer_cta', { target: 'contact' }); if (pathname === '/') scrollToSection('contact'); else { requestSection('contact'); navigate('/'); } }}>
              {t('footer.getInTouch')}
            </button>
            <div className="footer-actions__links">
              <a href={personalInfo.resumeLink} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                onClick={() => track('footer_cta', { target: 'resume' })}
                className="footer-actions__link link-hover" style={{ color: 'var(--color-text)' }}>
                <Download size={15} /> {t('footer.resume')}
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                onClick={() => track('footer_cta', { target: 'linkedin' })}
                className="footer-actions__link link-hover" style={{ color: 'var(--color-text-muted)' }}>
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                onClick={() => track('footer_cta', { target: 'github' })}
                className="footer-actions__link link-hover" style={{ color: 'var(--color-text-muted)' }}>
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>

          {/* The quiet, always-reachable doorway to the Atelier (hidden while there). */}
          {pathname !== '/making-of' && (
            <Link to="/making-of" data-cursor="hover"
              onClick={() => track('making_of_enter', { from: 'footer' })}
              className="atelier-footer-link font-chronicle italic text-[14px] inline-flex items-center gap-1.5 mt-12 transition-colors"
              style={{ color: 'var(--color-text-muted)' }}>
              {t('footer.atelierLink')} <ArrowUpRight size={13} />
            </Link>
          )}
          <p className="text-xs mt-6" style={{ color: 'var(--color-text-muted)' }}>
            {t('footer.credit', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Layout;
