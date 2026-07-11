import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { sound } from '../lib/sound';
import { track, trackOnce } from '../lib/analytics';

// ─────────────────────────────────────────────────────────────────────────────
// TemporalProbe — the Time Machine's companion (feedback §4, Phases 1 + 2).
//
// A reactive "temporal probe" drone that flies in, hovers with real spring
// physics, sweeps a scan-beam over the page (elements it passes glitch/glow),
// resists being dragged (and breaks free if you pin it), recoils when poked (and
// gets crankier the more you poke), and cracks context-aware jokes — cheeky, but
// never at the visitor's expense. It's ONLY on /time-machine, off on touch +
// reduced motion, and always trivially dismissible (remembered).
//
// Phase 2 adds: it RIDES THE DESCENT (an active scroll tugs it along and it scans
// each ruin as you reach it), some card scans FAIL/glitch (the old ruin resists),
// it DODGES YOUR CURSOR when it gets close (the desktop analog of gyro tilt — the
// probe is desktop-only, where gyro/haptics don't apply), and hit/escape fire
// optional HAPTICS (`navigator.vibrate`, a no-op on desktop/iOS — progressive).
//
// It's a LIVING companion that knows what you're doing: it scans + comments on the
// side rail, the narrator + the sound control (and flies over to inspect whichever
// you hover), locks onto its target with an animated reticle, and reacts to your
// behaviour — fast scrolling, climbing back toward the present, or going idle. The
// quip tip flips above/below the craft and stays clamped in the viewport, so it's
// never clipped when the probe scans near the top edge.
//
// No 3D libs: one Canvas2D sprite (pseudo-depth via scale + shadow + a 1px
// chromatic time-echo), a hand-rolled spring-damper integrator in one rAF loop,
// and cheap point-in-cone tests against a few cached element rects. All motion
// is transform/opacity; the loop pauses with the tab (rAF) and is fully torn down
// on unmount.
// ─────────────────────────────────────────────────────────────────────────────

const DISMISS_KEY = 'tm-probe-dismissed';

// Which page elements the beam reciprocates with. `scan` = eligible fly-to
// destinations (each maps to a quip category); all get the glitch glow when the
// beam sweeps them. Re-queried live (elements mount/scroll). The controls carry a
// `data-probe-scan` hook so the probe can find + comment on them (feedback: scan
// the side rail, narrator + sound controls, and react to the visitor touching them).
const TARGETS = [
  { sel: '#era-threshold h1', kind: 'title', scan: true },
  { sel: '.tm-exhibit', kind: 'card', scan: true },
  { sel: '#era-floor h2', kind: 'floor', scan: true },
  { sel: '[data-probe-scan="rail"]', kind: 'rail', scan: true },
  { sel: '[data-probe-scan="voice"]', kind: 'voice', scan: true },
  { sel: '[data-probe-scan="sound"]', kind: 'sound', scan: true },
  { sel: '.tm-rail2', kind: 'tunnel', scan: false }, // reciprocation glow only
];

// scan kind → the voiced quip category it speaks.
const SCAN_QUIP = {
  title: 'scanTitle', card: 'scanCard', floor: 'scanFloor',
  rail: 'scanRail', voice: 'scanVoice', sound: 'scanSound',
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = (a, b) => a + Math.random() * (b - a);

const TemporalProbe = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const canvasRef = useRef(null);
  const quipRef = useRef(null);
  const dismissRef = useRef(null);
  // Shared with the rAF loop so `dismiss()` can report whether the visitor ever
  // engaged (poked/dragged) and how long the probe was up — the annoyance signal.
  const engagedRef = useRef(false);
  const summonAtRef = useRef(0);
  const [quip, setQuip] = useState(null); // { id, text }
  // Dismiss is persisted, but ALWAYS reversible — when dismissed we render a small
  // recall chip instead, so a visitor who clicked the × can bring the probe back
  // (no browser-data-clearing required). Kept in state so recall re-mounts it live.
  const [dismissed, setDismissed] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(DISMISS_KEY) === '1',
  );

  // Coarse pointer (touch) → the drag/poke play doesn't translate; skip entirely.
  const coarse =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (reduce || coarse || dismissed) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    // Reset per mount (also on recall, which re-runs this effect).
    engagedRef.current = false;
    summonAtRef.current = performance.now();

    // Brand accent for the core glow (this canvas is generated art → hex is fine
    // per CLAUDE.md §4.3; ember ties it to the theme).
    const ember =
      getComputedStyle(document.documentElement).getPropertyValue('--color-ember').trim() ||
      '#d98c3d';

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── State (physics + behaviour), all mutation kept off React. ────────────
    const S = {
      x: W + 120,
      y: -120,
      vx: 0,
      vy: 0,
      homeX: rand(W * 0.55, W * 0.82),
      homeY: rand(H * 0.16, H * 0.34),
      mode: 'flyin',
      modeUntil: 0,
      nextActAt: 0,       // when the probe next "does something" (varied cadence)
      lastScanEl: null,   // avoid scanning the same target twice in a row
      scanEl: null,
      scanKind: null,
      beam: 0, // 0..1 beam intensity (ramps in/out)
      anger: 0,
      strain: 0,
      dragging: false,
      grabDX: 0,
      grabDY: 0,
      cursorX: 0,
      cursorY: 0,
      cursorSpeed: 0,
      bob: Math.random() * 10,
      tilt: 0,
      lastQuipAt: 0,
      quipUntil: 0,
      hoverX: W / 2,     // live cursor (for the dodge), tracked always
      hoverY: H / 2,
      scrollV: 0,        // recent scroll delta (drives the descent-follow tug)
      scrollAccum: 0,    // decaying scroll burst (drives fast-scroll / back-up quips)
      lastInteractAt: 0, // last scroll/pointer move (drives the "still there?" boredom)
      reactUntil: 0,     // cooldown so reactions never spam
      failing: false,    // is the current scan destined to glitch out?
      failAt: 0,
      failFired: false,
      scanRect: null,    // full rect of the scanned element → the lock-on reticle
      hoverCtrlEl: null, // control the cursor is dwelling over (voice/sound/rail)
      hoverCtrlSince: 0,
      ctrlReactUntil: 0,
      emCheck: 0,        // throttle for the elementFromPoint hover probe
      scannedAt: new Map(), // el → last-scan time, so it re-scans, not repeats
    };

    // ── Target rects (cached; recomputed on scroll/resize). ──────────────────
    let rects = [];
    const measure = () => {
      const out = [];
      TARGETS.forEach((tg) => {
        document.querySelectorAll(tg.sel).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) return;
          out.push({
            el,
            kind: tg.kind,
            scan: tg.scan,
            // Point the beam should land on: the top-centre of the element.
            px: r.left + r.width / 2,
            py: r.top + Math.min(70, r.height / 2),
            // Full rect (clamped-in-viewport) for the lock-on reticle in draw().
            rx: r.left, ry: r.top, rw: r.width, rh: r.height,
            onScreen: r.bottom > 0 && r.top < H,
          });
        });
      });
      rects = out;
    };
    measure();
    let measureDirty = false;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      measureDirty = true;
      const y = window.scrollY;
      const d = y - lastScrollY;
      S.scrollV = d;                                         // descent tug
      S.scrollAccum = clamp(S.scrollAccum + d, -4000, 4000); // burst → reactions
      S.lastInteractAt = performance.now();
      lastScrollY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Track the cursor at all times (the idle "dodge" reads it, not just drags).
    const onHover = (e) => { S.hoverX = e.clientX; S.hoverY = e.clientY; S.lastInteractAt = performance.now(); };
    window.addEventListener('pointermove', onHover, { passive: true });

    // Optional haptics — Android/Chrome only; a silent no-op on desktop + iOS.
    const buzz = (pattern) => { if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch { /* unsupported */ } } };

    // A failed scan: the ruin resists — a hard chromatic glitch on the element.
    const flashFail = (el) => {
      el.classList.add('tm-scanned--fail');
      setTimeout(() => el.classList.remove('tm-scanned--fail'), 620);
    };

    // ── Quips ────────────────────────────────────────────────────────────────
    // Reading time for a line (~180 wpm + a generous base), so longer quips stay up
    // long enough to actually read and short ones don't overstay. This is what the
    // scan lingers for, so the probe never flies off mid-sentence.
    const readTime = (text) => {
      const words = String(text).trim().split(/\s+/).filter(Boolean).length;
      return clamp(2600 + words * 360, 3600, 8500);
    };
    let lastQuipId = '';
    const say = (cat, hold) => {
      const pool = t(`timeMachine.probe.quips.${cat}`, { returnObjects: true });
      const list = Array.isArray(pool) ? pool : [String(pool)];
      let pick = list[Math.floor(Math.random() * list.length)];
      if (list.length > 1 && `${cat}:${pick}` === lastQuipId) {
        pick = list[(list.indexOf(pick) + 1) % list.length];
      }
      lastQuipId = `${cat}:${pick}`;
      const dur = hold != null ? hold : readTime(pick);
      S.quipUntil = performance.now() + dur;
      setQuip({ id: lastQuipId + Math.random(), text: pick });
      return dur;
    };

    // ── Behaviour helpers ─────────────────────────────────────────────────────
    const inCone = (px, py) => {
      const ax = S.x;
      const ay = S.y + 16 * scaleNow();
      const dy = py - ay;
      if (dy <= 6 || dy > 540) return false;
      const spread = dy * 0.46 + 26;
      return Math.abs(px - ax) < spread;
    };
    const scaleNow = () => (S.mode === 'flyin' ? 0.7 : 1);

    const beginScan = (target, forced = false) => {
      const nowP = performance.now();
      S.scanEl = target.el;
      S.lastScanEl = target.el;
      S.scanKind = target.kind;
      S.scannedAt.set(target.el, nowP);
      S.mode = 'scan';
      // Only ruins (cards) resist; a control/rail scan never "fails".
      S.failing = target.kind === 'card' && !forced && Math.random() < 0.34;
      S.failAt = nowP + rand(1400, 2100);
      S.failFired = false;
      sound.playCue('probeScan');
      // Not every scan narrates — sometimes it just quietly reads the surface, so it
      // never feels like a machine announcing each move. A forced (hovered) scan,
      // which is a direct reply to the visitor, always speaks.
      if (forced || Math.random() < 0.62) {
        // Hold the target for the WHOLE reading window (+ a beat), so the visitor can
        // finish the line before the probe drifts off — this is the "stay longer" fix.
        const hold = say(SCAN_QUIP[target.kind] || 'idle');
        S.modeUntil = nowP + hold + 500;
      } else {
        S.modeUntil = nowP + rand(2800, 3800); // a silent read can be briefer
      }
    };

    const pickScan = () => {
      // Avoid re-scanning the same target back-to-back; fall back only if it's the
      // sole option on screen.
      let cands = rects.filter((r) => r.scan && r.onScreen && r.el !== S.lastScanEl);
      if (!cands.length) cands = rects.filter((r) => r.scan && r.onScreen);
      if (!cands.length) { S.nextActAt = performance.now() + 2500; return; }
      const nowP = performance.now();
      const vc = H / 2;
      // Weighted-random pick: favour targets near the viewport centre + not scanned
      // recently, but with genuine randomness so it never reads as deterministic.
      const weight = (r) => {
        const center = 1 - Math.min(1, Math.abs(r.py - vc) / (H * 0.6));
        const recency = Math.min(1, (nowP - (S.scannedAt.get(r.el) || 0)) / 12000);
        return 0.15 + center * 0.7 + recency * 0.6 + Math.random() * 0.6;
      };
      cands.sort((a, b) => weight(b) - weight(a));
      const top = cands.slice(0, Math.min(3, cands.length));
      beginScan(top[Math.floor(Math.random() * top.length)]);
    };

    // Fly over and scan a specific element (the visitor is inspecting a control).
    const forceScanEl = (el) => {
      const entry = rects.find((r) => r.el === el);
      if (entry) beginScan(entry, true);
    };

    const wander = () => {
      S.homeX = rand(W * 0.12, W * 0.86);
      S.homeY = rand(H * 0.14, H * 0.42);
    };

    // A little physical flourish — a playful hop + tilt kick. Pure motion, no beam:
    // one of the idle "living" behaviours that isn't a scan.
    const flourish = () => {
      S.vy -= rand(120, 240);
      S.vx += rand(-150, 150);
      S.tilt += rand(-0.32, 0.32);
    };

    // The idle "brain": each time it's due to act, it does SOMETHING varied — scan,
    // patrol to a new spot, muse, a flourish, or just hover quietly — with a varied
    // cadence, so the loop never feels like a fixed scan→scan→scan program (RDR2-ish).
    const chooseAction = () => {
      const nowP = performance.now();
      const scannable = rects.some((r) => r.scan && r.onScreen);
      const roll = Math.random();
      if (roll < 0.5 && scannable) {
        pickScan();
      } else if (roll < 0.68) {
        wander();
        if (Math.random() < 0.4) say('idle');
      } else if (roll < 0.82) {
        say('idle');                       // muse in place
      } else if (roll < 0.93) {
        flourish();
        if (Math.random() < 0.45) say('idle');
      } // else: hover quietly (a natural pause)
      S.nextActAt = nowP + rand(2600, 8500); // varied gaps between beats
    };

    const doEscape = (fromX, fromY) => {
      S.dragging = false;
      S.strain = 0;
      const dx = S.x - fromX;
      const dy = S.y - fromY;
      const d = Math.hypot(dx, dy) || 1;
      S.vx += (dx / d) * 1500 + rand(-200, 200);
      S.vy += (dy / d) * 1500 - 300;
      S.mode = 'escape';
      S.modeUntil = performance.now() + 1100;
      S.homeX = rand(W * 0.15, W * 0.85);
      S.homeY = rand(H * 0.12, H * 0.3);
      sound.playCue('probeEscape');
      buzz([15, 35, 15]);
      say('escape');
      trackOnce('probe_escape', 'probe_escape');
    };

    // ── Pointer: hit-test the craft (capture phase so we can swallow a poke). ──
    const hitCraft = (px, py) => {
      const cy = S.bobOffset ?? S.y; // the drawn craft centre (bob included)
      return Math.hypot(px - S.x, py - cy) < 42;
    };
    let downAt = 0;
    let downX = 0;
    let downY = 0;
    let moved = 0;

    const onDown = (e) => {
      if (e.button != null && e.button !== 0) return;
      // Let the dismiss chip get its own click (it rides inside the hit radius).
      if (dismissRef.current && dismissRef.current.contains(e.target)) return;
      if (!hitCraft(e.clientX, e.clientY)) return; // let the page have it
      e.preventDefault();
      e.stopPropagation();
      engagedRef.current = true; // any deliberate grab counts as engagement
      S.dragging = true;
      S.mode = 'drag';
      S.grabDX = S.x - e.clientX;
      S.grabDY = S.y - e.clientY;
      S.cursorX = e.clientX;
      S.cursorY = e.clientY;
      downAt = performance.now();
      downX = e.clientX; downY = e.clientY; moved = 0;
      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', onUp, { passive: true });
    };
    const onMove = (e) => {
      const dx = e.clientX - S.cursorX;
      const dy = e.clientY - S.cursorY;
      S.cursorSpeed = Math.hypot(dx, dy) / 0.016; // px/s-ish
      S.cursorX = e.clientX;
      S.cursorY = e.clientY;
      moved += Math.hypot(e.clientX - downX, e.clientY - downY);
      downX = e.clientX; downY = e.clientY;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      const quick = performance.now() - downAt < 220;
      if (S.dragging && quick && moved < 8) {
        // A poke, not a drag → recoil + anger.
        S.dragging = false;
        const awayX = S.x - S.cursorX;
        const awayY = S.y - S.cursorY;
        const d = Math.hypot(awayX, awayY) || 1;
        S.vx += (awayX / d) * 700 + rand(-120, 120);
        S.vy += (awayY / d) * 700 - 200;
        S.anger = Math.min(S.anger + 1, 4);
        S.mode = 'idle';
        S.nextActAt = performance.now() + 4200; // let the recoil quip breathe
        sound.playCue('probeHit');
        buzz(28);
        say(S.anger >= 3 ? 'angry' : 'hit');
        trackOnce('probe_hit', 'probe_hit');
      } else if (S.dragging) {
        S.dragging = false;
        S.mode = 'idle';
        S.nextActAt = performance.now() + 2000;
      }
    };
    window.addEventListener('pointerdown', onDown, { capture: true });

    // ── The loop ───────────────────────────────────────────────────────────────
    let raf = 0;
    let prev = performance.now();
    trackOnce('probe_summon', 'probe_summon');

    const step = (nowT) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((nowT - prev) / 1000, 0.05);
      prev = nowT;
      if (measureDirty) { measure(); measureDirty = false; }

      // Cursor speed decays when the pointer stops feeding motion.
      S.cursorSpeed *= Math.max(0, 1 - dt * 6);
      S.anger = Math.max(0, S.anger - dt * 0.18);

      // ── Target selection per mode ─────────────────────────────────────────
      let tx = S.homeX;
      let ty = S.homeY;
      let wantBeam = 0;

      if (S.mode === 'flyin') {
        if (Math.hypot(S.x - S.homeX, S.y - S.homeY) < 46) {
          S.mode = 'idle';
          S.nextActAt = nowT + rand(1400, 2600);
          sound.playCue('probeAppear');
          say('greet');
        }
      } else if (S.mode === 'idle') {
        if (nowT > S.nextActAt) chooseAction();
        // Skittish — it dodges the cursor when it drifts close (still catchable for
        // a deliberate poke; the push is gentle and only near-range).
        const ddx = S.x - S.hoverX;
        const ddy = (S.bobOffset ?? S.y) - S.hoverY;
        const dd = Math.hypot(ddx, ddy) || 1;
        if (dd < 140) { const push = (140 - dd) / 140; tx += (ddx / dd) * push * 130; ty += (ddy / dd) * push * 130; }
      } else if (S.mode === 'scan') {
        const r = rects.find((x) => x.el === S.scanEl);
        if (r) {
          tx = clamp(r.px, 70, W - 70);
          // Hover a comfortable altitude ABOVE the aim point — but never hug the very
          // top (so the quip tip is never clipped) nor the bottom edge.
          ty = clamp(r.py - 150, 96, H - 150);
          S.scanRect = { x: r.rx, y: r.ry, w: r.rw, h: r.rh };
        }
        wantBeam = S.failFired ? 0 : 1; // the beam cuts out on a failed scan
        // The ruin resists: partway through, the scan glitches and the probe sputters.
        if (S.failing && !S.failFired && nowT > S.failAt) {
          S.failFired = true;
          S.vy -= 240; S.vx += rand(-160, 160); // physical sputter/recoil
          sound.playCue('glitch');
          buzz(20);
          const hold = say('scanFail'); // the quip stays readable even as it recoils
          S.modeUntil = nowT + Math.min(hold, 1400); // linger a touch, then bail
          if (r) flashFail(r.el);
        }
        if (nowT > S.modeUntil || !r || !r.onScreen) {
          S.mode = 'idle';
          S.scanEl = null;
          S.scanRect = null;
          S.nextActAt = nowT + rand(4500, 8000);
        }
      } else if (S.mode === 'drag') {
        // Follow the cursor, but a repulsion that grows with strain makes it lag
        // and strain away — pin it (stop feeding motion) and it breaks free.
        const feed = clamp(S.cursorSpeed / 380, 0, 1);
        S.strain = clamp(S.strain + dt * (1.15 - feed * 1.9), 0, 1.4);
        const cx = S.cursorX + S.grabDX;
        const cy = S.cursorY + S.grabDY;
        const rdx = S.x - S.cursorX;
        const rdy = S.y - S.cursorY;
        const rd = Math.hypot(rdx, rdy) || 1;
        tx = cx + (rdx / rd) * S.strain * 46;
        ty = cy + (rdy / rd) * S.strain * 46;
        if (S.strain >= 1.3) doEscape(S.cursorX, S.cursorY);
      } else if (S.mode === 'escape') {
        if (nowT > S.modeUntil) { S.mode = 'idle'; S.nextActAt = nowT + rand(3000, 5000); }
      }

      // ── Reactions: the probe notices what you're doing and speaks to it ────
      S.scrollAccum *= Math.max(0, 1 - dt * 2.2); // the burst fades
      const canReact = (S.mode === 'idle' || S.mode === 'scan') && !S.dragging;
      if (canReact && nowT > S.reactUntil) {
        // A fast scroll / climbing back are DIRECT responses to the visitor, so they
        // interrupt whatever it's saying; boredom is low-priority (waits for a gap).
        if (S.scrollAccum > 1050) { say('fastScroll'); S.reactUntil = nowT + 8000; S.scrollAccum = 0; }
        else if (S.scrollAccum < -950) { say('backUp'); S.reactUntil = nowT + 9000; S.scrollAccum = 0; }
        else if (nowT > S.quipUntil && S.lastInteractAt && nowT - S.lastInteractAt > 22000) { say('bored'); S.reactUntil = nowT + 22000; S.lastInteractAt = nowT; }
      }
      // Hover-intent: the cursor dwelling on a control → it flies over to inspect it
      // (so it "knows" you're eyeing the voice / sound / rail). Throttled elementFromPoint.
      S.emCheck += dt;
      if (S.emCheck > 0.25) {
        S.emCheck = 0;
        const under = document.elementFromPoint(S.hoverX, S.hoverY);
        const ctrl = under && under.closest ? under.closest('[data-probe-scan]') : null;
        if (ctrl && ctrl === S.hoverCtrlEl) {
          if (S.mode === 'idle' && nowT - S.hoverCtrlSince > 500 && nowT > S.ctrlReactUntil) {
            forceScanEl(ctrl);
            S.ctrlReactUntil = nowT + 10000;
          }
        } else { S.hoverCtrlEl = ctrl; S.hoverCtrlSince = nowT; }
      }

      // Ride the descent: while free-hovering, an active scroll tugs the craft along
      // so it trails you down the strata instead of sitting still (a following lag).
      if (S.mode === 'idle' || S.mode === 'scan') S.vy += clamp(S.scrollV, -90, 90) * 4 * dt;
      S.scrollV *= Math.max(0, 1 - dt * 8);

      // ── Spring-damper integration ─────────────────────────────────────────
      const angry = S.anger;
      const K = (S.mode === 'drag' ? 42 : S.mode === 'flyin' ? 18 : 16) + angry * 3;
      const D = (S.mode === 'drag' ? 9 : S.mode === 'flyin' ? 8.4 : 6.4) - angry * 0.7;
      const ax = K * (tx - S.x) - D * S.vx;
      const ay = K * (ty - S.y) - D * S.vy;
      S.vx += ax * dt;
      S.vy += ay * dt;
      // Anger jitter — physical crankiness.
      if (angry > 0.5) {
        S.vx += rand(-1, 1) * angry * 26;
        S.vy += rand(-1, 1) * angry * 26;
      }
      S.x += S.vx * dt;
      S.y += S.vy * dt;

      // Keep it on screen — except while flying in from off-screen, or mid-escape,
      // where the craft is deliberately allowed past the edges.
      if (S.mode !== 'escape' && S.mode !== 'flyin') {
        if (S.x < 40) { S.x = 40; S.vx *= -0.4; }
        if (S.x > W - 40) { S.x = W - 40; S.vx *= -0.4; }
        if (S.y < 44) { S.y = 44; S.vy *= -0.4; }
        if (S.y > H - 90) { S.y = H - 90; S.vy *= -0.4; }
      }

      // Bob + bank.
      S.bob += dt * (1.6 + angry * 0.8);
      S.bobOffset = S.y + Math.sin(S.bob * 1.8) * 3.5 + Math.sin(S.bob * 0.9) * 2;
      S.tilt = clamp(S.tilt + (clamp(-S.vx * 0.0007, -0.35, 0.35) - S.tilt) * dt * 8, -0.4, 0.4);
      S.beam += ((wantBeam ? 1 : 0) - S.beam) * dt * 5;

      // ── Reciprocation: elements under the beam glitch/glow. ────────────────
      if (S.beam > 0.25) {
        for (let i = 0; i < rects.length; i++) {
          const r = rects[i];
          const on = inCone(r.px, r.py);
          r.el.classList.toggle('tm-scanned', on);
        }
      } else if (S.beamWasOn) {
        rects.forEach((r) => r.el.classList.remove('tm-scanned'));
      }
      S.beamWasOn = S.beam > 0.25;

      draw(ctx, S, ember, W, nowT);

      // Position the quip bubble — above the craft, but flipped BELOW when the craft
      // is near the top (so the tip is never clipped), and clamped within the
      // viewport horizontally + vertically.
      if (quipRef.current) {
        const el = quipRef.current;
        if (nowT < S.quipUntil + 400) {
          const bw = el.offsetWidth || 200;
          const bh = el.offsetHeight || 44;
          const below = S.bobOffset < bh + 74;
          const bx = clamp(S.x, bw / 2 + 8, W - bw / 2 - 8);
          let by = below ? S.bobOffset + 30 : S.bobOffset - 30;
          if (below) by = Math.min(by, H - bh - 8);
          el.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px) translate(-50%, ${below ? '0%' : '-100%'})`;
          el.classList.toggle('tm-probe__quip--below', below);
        }
        el.style.opacity = nowT < S.quipUntil ? '1' : '0';
      }
      if (dismissRef.current) {
        dismissRef.current.style.transform =
          `translate(${(S.x + 30).toFixed(1)}px, ${(S.bobOffset - 30).toFixed(1)}px)`;
      }
    };
    raf = requestAnimationFrame(step);

    const onResize = () => { resize(); measure(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', onDown, { capture: true });
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointermove', onHover);
      window.removeEventListener('pointerup', onUp);
      rects.forEach((r) => r.el.classList.remove('tm-scanned', 'tm-scanned--fail'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, coarse, dismissed, t]);

  // No probe at all on touch / reduced motion (and no recall — there's nothing to
  // recall to on those platforms).
  if (reduce || coarse) return null;

  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* private mode */ }
    track('probe_dismiss', {
      engaged: engagedRef.current, // did they poke/drag it before sending it off?
      seconds: summonAtRef.current ? Math.round((performance.now() - summonAtRef.current) / 1000) : 0,
    });
    setDismissed(true);
  };
  const recall = () => {
    try { localStorage.removeItem(DISMISS_KEY); } catch { /* private mode */ }
    track('probe_recall');
    setDismissed(false); // re-mounts the effect → the probe flies back in
  };

  // Dismissed → a small, always-there recall chip (icon collapsed, label on hover)
  // so the probe is never truly lost. Bottom-left, clear of the rail + controls.
  if (dismissed) {
    return (
      <button
        type="button"
        className="tm-probe-recall"
        onClick={recall}
        aria-label={t('timeMachine.probe.recall')}
        title={t('timeMachine.probe.recall')}
        data-cursor="hover"
      >
        <svg className="tm-probe-recall__glyph" viewBox="0 0 24 24" fill="none" aria-hidden>
          <ellipse cx="12" cy="15" rx="9" ry="3.1" fill="currentColor" opacity="0.85" />
          <path d="M6.4 14.2a5.6 4 0 0 1 11.2 0z" fill="currentColor" opacity="0.45" />
          <circle cx="12" cy="13.4" r="1.5" fill="var(--color-ember)" />
          <path d="M8.2 18.5 6.6 21M15.8 18.5 17.4 21M12 18.8V21.6" stroke="var(--color-ember)" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        </svg>
        <span className="tm-probe-recall__label">{t('timeMachine.probe.recall')}</span>
      </button>
    );
  }

  return (
    <>
      <canvas ref={canvasRef} className="tm-probe" aria-hidden />
      <div ref={quipRef} className="tm-probe__quip" role="status" aria-live="polite">
        {quip?.text}
      </div>
      <button
        ref={dismissRef}
        type="button"
        className="tm-probe__dismiss"
        onClick={dismiss}
        aria-label={t('timeMachine.probe.dismiss')}
        title={t('timeMachine.probe.dismiss')}
        data-cursor="hover"
      >
        <X size={12} strokeWidth={2.5} />
      </button>
    </>
  );
};

// ── Canvas draw: the temporal-probe sprite. ──────────────────────────────────
function draw(ctx, S, ember, W, nowT) {
  ctx.clearRect(0, 0, W, ctx.canvas.height);
  const cx = S.x;
  const cy = S.bobOffset;
  const angry = S.anger;

  // Beam cone (behind the craft) when scanning.
  if (S.beam > 0.02) {
    const len = 500;
    const spread = len * 0.46 + 26;
    const g = ctx.createLinearGradient(0, cy, 0, cy + len);
    const a = 0.14 * S.beam;
    g.addColorStop(0, `rgba(120, 220, 255, ${a})`);
    g.addColorStop(1, 'rgba(120, 220, 255, 0)');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    ctx.moveTo(cx - 14, cy + 12);
    ctx.lineTo(cx + 14, cy + 12);
    ctx.lineTo(cx + spread, cy + len);
    ctx.lineTo(cx - spread, cy + len);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    // Sweeping scanline.
    const sweep = cy + 12 + ((nowT / 900) % 1) * (len - 12);
    const sw = 12 + ((sweep - cy) / len) * (spread - 12);
    ctx.strokeStyle = `rgba(150, 230, 255, ${0.3 * S.beam})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - sw, sweep);
    ctx.lineTo(cx + sw, sweep);
    ctx.stroke();
    ctx.restore();
  }

  // Lock-on reticle on the scanned target — animated corner brackets + a sweeping
  // readout line. Makes the scan feel like a real instrument acquiring the ruin.
  if (S.beam > 0.3 && S.scanRect) {
    const { x, y, w, h } = S.scanRect;
    ctx.save();
    ctx.strokeStyle = `rgba(140, 225, 255, ${0.72 * S.beam})`;
    ctx.lineWidth = 1.5;
    const c = Math.max(8, Math.min(20, w / 3, h / 3));
    const corner = (px, py, sx, sy) => {
      ctx.beginPath();
      ctx.moveTo(px + sx * c, py);
      ctx.lineTo(px, py);
      ctx.lineTo(px, py + sy * c);
      ctx.stroke();
    };
    corner(x, y, 1, 1); corner(x + w, y, -1, 1);
    corner(x, y + h, 1, -1); corner(x + w, y + h, -1, -1);
    // A scan line sweeping down the target.
    const sy = y + ((nowT / 1400) % 1) * h;
    ctx.strokeStyle = `rgba(140, 225, 255, ${0.26 * S.beam})`;
    ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x + w, sy); ctx.stroke();
    ctx.restore();
  }

  // Soft shadow the craft casts below it (grows with beam / proximity).
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 40, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ── The hull. Draw a silhouette fn we can reuse for the chromatic echo. ────
  const hull = (ox, oy) => {
    ctx.save();
    ctx.translate(cx + ox, cy + oy);
    ctx.rotate(S.tilt);
    // Saucer body.
    const body = ctx.createLinearGradient(0, -10, 0, 12);
    body.addColorStop(0, '#e9edf4');
    body.addColorStop(0.5, '#9aa4b4');
    body.addColorStop(1, '#3a4150');
    ctx.beginPath();
    ctx.ellipse(0, 4, 26, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();
    // Dome.
    const dome = ctx.createRadialGradient(-4, -6, 1, 0, -2, 16);
    dome.addColorStop(0, 'rgba(190, 240, 255, 0.95)');
    dome.addColorStop(1, 'rgba(90, 130, 170, 0.85)');
    ctx.beginPath();
    ctx.ellipse(0, -1, 13, 11, 0, Math.PI, Math.PI * 2);
    ctx.fillStyle = dome;
    ctx.fill();
    ctx.restore();
  };

  // 1px chromatic time-echo (arrives-from-another-moment feel).
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 0.25;
  hullTint(ctx, cx, cy, S.tilt, -1.4, 0, 'rgba(255,60,90,0.5)');
  hullTint(ctx, cx, cy, S.tilt, 1.4, 0, 'rgba(60,200,255,0.5)');
  ctx.restore();

  hull(0, 0);

  // Rotating rim lights + the core "eye".
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(S.tilt);
  const lights = 5;
  for (let i = 0; i < lights; i++) {
    const ang = (nowT / 700) + (i / lights) * Math.PI * 2;
    const lx = Math.cos(ang) * 22;
    const lz = Math.sin(ang);
    if (lz < 0) continue; // front-facing only
    ctx.globalAlpha = 0.4 + lz * 0.5;
    ctx.fillStyle = angry > 1.5 ? '#ff5a5a' : '#8fe3ff';
    ctx.beginPath();
    ctx.arc(lx, 5, 1.7, 0, Math.PI * 2);
    ctx.fill();
  }
  // Core.
  ctx.globalAlpha = 1;
  const coreCol = angry > 1.5 ? '#ff5a5a' : ember;
  const cg = ctx.createRadialGradient(0, -1, 0, 0, -1, 9);
  cg.addColorStop(0, '#fff');
  cg.addColorStop(0.4, coreCol);
  cg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.arc(0, -1, 8 + Math.sin(nowT / 200) * 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// A flat-tinted hull silhouette for the chromatic-aberration echo layers.
function hullTint(ctx, cx, cy, tilt, ox, oy, color) {
  ctx.save();
  ctx.translate(cx + ox, cy + oy);
  ctx.rotate(tilt);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 4, 26, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, -1, 13, 11, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default TemporalProbe;
