import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ErrorBoundary } from './components';
import Chronicle from './pages/Chronicle';
import MakingOf from './pages/MakingOf';

const Void = lazy(() => import('./pages/Void'));

// Quiet, full-height fallback for the lazy 404 chunk — centered on the page so
// there's no layout jump before the scene paints (the chunk is a few KB, so this
// is a blink, not a load screen).
const VoidFallback = () => (
  <div className="grid place-items-center min-h-[100dvh]">
    <div className="w-8 h-8 border-2 border-[var(--color-ember)] border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Two routes share one shell (Layout): the scroll-directed Chronicle at `/` and
 * the Atelier — "the making-of" — at `/making-of`. Layout owns the smooth
 * scroll, the global controls, and the footer; each route owns its own chrome.
 *
 * The catch-all `*` renders the cinematic 404 ("Off the Map") — lazy-loaded so
 * it never touches the initial bundle, and wrapped in ErrorBoundary + Suspense.
 */
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Chronicle />} />
        <Route path="making-of" element={<MakingOf />} />
        <Route path="*" element={
          <ErrorBoundary>
            <Suspense fallback={<VoidFallback />}>
              <Void />
            </Suspense>
          </ErrorBoundary>
        } />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

