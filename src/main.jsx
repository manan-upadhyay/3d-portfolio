import React from 'react';
import ReactDOM from 'react-dom/client';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';
import App from './App.jsx';
import { resolveSkyMode, SKY_BASE } from './lib/sky';
import { markAnalyticsReady, dntEnabled, registerContext } from './lib/analytics';
import { readVisitor } from './lib/visitor';
import log, { greet } from './lib/log';
import './i18n'; // initialize the Voice (i18next) layer before render
import './index.css';

// Analytics — initialize the PostHog singleton ONCE, before render (the official
// posthog-js pattern). Shared app-wide via <PostHogProvider>; non-component
// callers (Zustand stores, the audio engine) reach the same instance through the
// `track()` facade in lib/analytics.js. Cookieless + anonymous (no consent
// banner). Hard-disabled without a key or under Do-Not-Track.
//   `defaults: '2026-05-30'` opts into PostHog's modern preset: autocapture
//   (heatmaps / rage- + dead-clicks), history-change $pageview, $pageleave, web
//   vitals, and exception autocapture. Session replay is gated in the PostHog
//   project settings (we don't disable it here). See docs/chronicle/ANALYTICS.md.
const PH_KEY = import.meta.env.VITE_POSTHOG_KEY;
const PH_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';
if (PH_KEY && !dntEnabled()) {
  posthog.init(PH_KEY, {
    api_host: PH_HOST,
    defaults: '2026-05-30',
    persistence: 'memory', // cookieless + anonymous → no consent banner
    capture_exceptions: true, // JS error tracking
    // Auto pageview OFF so super-properties (registered synchronously below,
    // before render) attach to the FIRST pageview — the fix for Beta 1's ~90%
    // null device rate. We capture pageviews manually on route change (Layout),
    // which also gives /making-of its own pageview. Web-vitals/$pageleave stay on.
    capture_pageview: false,
  });
  markAnalyticsReady();
  log.info('analytics ready — cookieless PostHog, error capture on');
} else {
  log.info('analytics disabled', dntEnabled() ? '(Do-Not-Track honored)' : '(no key)');
}

// Resolve the visitor's "sky" (Phase 3: auto/dawn/day/dusk/night) and paint the
// base class + data-sky onto <html> before React renders, to prevent a flash.
const initializeTheme = () => {
  let mode = 'auto';
  try {
    const parsed = JSON.parse(localStorage.getItem('theme-storage'));
    // New shape persists `mode`; migrate the legacy `theme` (light|dark|system).
    const legacy = parsed?.state?.theme;
    mode = parsed?.state?.mode
      || (legacy === 'light' ? 'day' : legacy === 'dark' ? 'night' : 'auto');
  } catch {
    mode = 'auto';
    log.warn('theme: could not read persisted sky — falling back to auto');
  }

  const sky = mode === 'auto' ? resolveSkyMode() : mode;
  const base = SKY_BASE[sky] || 'dark';
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(base);
  root.dataset.sky = sky;
  root.style.colorScheme = base;
  log.info(`sky resolved → ${sky} (${base}) from mode "${mode}"`);
};

// Run before React mounts
initializeTheme();

// Super properties — registered SYNCHRONOUSLY here (after the theme is painted,
// before render), so they attach to every event incl. the first $pageview.
// Store-derived props (returning_visitor, sound_enabled, voice) + the live theme
// are added shortly after in Layout; these are the device/static ones that must
// not be null. See docs/chronicle/V1.1-RELEASE-PLAN.md §C (Beta 1: ~90% null).
if (PH_KEY && !dntEnabled()) {
  try {
    const v = readVisitor();
    const root = document.documentElement;
    registerContext({
      app_name: 'chronicle_portfolio',
      beta_round: 'beta_2',
      tracking_version: 'v1.1',
      device_os: v.os,
      device_browser: v.browser,
      device_gpu: v.gpu,
      device_cores: v.cores,
      device_touch: v.touch,
      screen_w: v.screen?.w ?? null,
      screen_h: v.screen?.h ?? null,
      viewport_w: window.innerWidth,
      viewport_h: window.innerHeight,
      language: v.language,
      input_type: window.matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine',
      reduced_motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      initial_theme: root.classList.contains('light') ? 'light' : 'dark',
    });
  } catch { /* analytics must never break boot */ }
}

// Greet the curious soul who opens DevTools (once, on-brand).
greet();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
);
