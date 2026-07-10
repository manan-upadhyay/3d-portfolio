// ─────────────────────────────────────────────────────────────────────────────
// The Chronicle — interactive sound design engine (Phase 4).
//
// A small Web-Audio "sound design system": sparse, intentional cues that reward
// *intent*, never accompany motion. Abstract cues are synthesized (oscillators +
// ADSR + biquad + noise → 0 bytes shipped); a few organic samples (raven + the
// two ambient beds) are optional mp3s that degrade to synthesis if absent.
//
// Architecture: ONE shared AudioContext, created lazily and unlocked on the first
// user gesture (browser autoplay law). A single master chain
//   cue → master(gain) → compressor → destination
// gives consistent level + glue and guards against clipping when cues overlap.
//
// This module is pure audio — no React, no store imports. The UI layer
// (`useSoundStore` + `SoundControl`) drives it through `setEnabled/setVolume`;
// sections fire cues through `playCue` / `hum` / `watch`. Everything no-ops
// safely until unlocked + enabled + the page is in view, so callers never guard.
// ─────────────────────────────────────────────────────────────────────────────
import { createLogger } from './log';

const log = createLogger('sound');

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║  TUNING — edit me. Friendly knobs for the whole sound design.              ║
// ║  • peak  = loudness 0..1 (higher = louder; lower a value to make it gentler)║
// ║  • dur   = length in seconds.                                              ║
// ║  • beds.*.sample / raven = optional mp3s. Drop a file at the given public/  ║
// ║    path and it plays (beds loop; volume still follows the section's scroll- ║
// ║    distance fade). If the file is absent, the synthesized fallback plays.   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
export const CONFIG = {
  theme: { peak: 0.10, dur: 0.62 }, // theme-toggle swoosh (length-synced to the wipe)
  mapOpen: { peak: 0.09 },          // map-open swoosh
  mapClose: { peak: 0.08 },         // map-close swoosh
  chartSwap: { peak: 0.1 },         // arsenal orbit⇄inventory fold/unfurl
  error: { peak: 0.16 },            // contact-form error tone (sleek two-note)
  glitch: { peak: 0.10 },           // voice-change decode
  blip: { peak: 0.11 },             // arsenal hover pluck
  detent: { peak: 0.085 },          // build-reel sprocket tick (per frame crossed)
  rewind: { peak: 0.12 },           // time-machine "wind back" — waking a ruin / crossing an era
  pageflip: { peak: 0.05 },         // time-tunnel — one soft page turn per year/event crossed
  settle: { peak: 0.12 },           // build-reel playhead landing thunk
  click: { peak: 0.14 },            // physical prev/next key — press (bright) + release (soft)
  volumeTick: { peak: 0.05 },       // apple-slider drag tick — pitch rises with the level
  hoverNote: { peak: 0.085 },       // observatory analytics-chip hover note (pitched)
  // ── Face-particle "gathering" — the grains rushing into the portrait. TWEAK ME:
  //    • grains  = how many ticks (more = busier/faster-feeling)
  //    • spread  = seconds the grains span — LOWER = faster, tighter rush
  //    • freqMin/freqMax = pitch window in Hz (raise both = higher/brighter)
  //    • peak    = loudness 0..1
  assembleSwell: { peak: 0.07, grains: 34, spread: 0.95, freqMin: 1500, freqMax: 3800 },
  beds: {
    // Sound audit (owner: the continuous beds were fatiguing in earbuds). The
    // orbit drone was 0.45 — ~12× the sibling lens buzz — and read as an
    // irritating buzz; pulled in line with the lens so it's a soft undertone.
    // The hero astrolabe loop was also eased down a touch.
    hero: { peak: 0.34, sample: '/sounds/astrolabe.mp3' },   // Hero astrolabe loop
    arsenal: { peak: 0.11, sample: '/sounds/arsenal.mp3' },  // Arsenal ambience loop
    lens: { peak: 0.035 },    // face-particle magic-lantern hover buzz
    orbit: { peak: 0.06 },    // observatory constellation hover buzz (soft undertone)
    reel: { peak: 0.14 },     // director's-reel film-transport whir (velocity-driven)
  },
  raven: '/sounds/raven.mp3',       // Contact-send raven (one-shot sample)
};

let ctx = null;          // the one AudioContext
let master = null;       // master GainNode (carries volume / mute)
let comp = null;         // limiter on the master bus
let noise = null;        // cached white-noise buffer (built per-context)

let unlocked = false;    // has a user gesture resumed the context?
let enabled = true;      // user preference (mute switch)
let volume = 0.7;        // user preference 0..1
let armed = false;       // gesture listener attached once?
let pageActive = true;   // is our tab/window currently in view? (no sound if not)
const unlockCbs = [];    // fire-once callbacks for the first gesture unlock

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Effective master level: silent unless unlocked + enabled.
const targetMaster = () => (unlocked && enabled ? volume : 0);

const now = () => ctx.currentTime;

// Build (once) the context + master bus. Safe to call repeatedly.
function ensureContext() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();

  master = ctx.createGain();
  master.gain.value = targetMaster();

  // A gentle limiter so overlapping cues never clip or jump in loudness.
  comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -10;
  comp.knee.value = 24;
  comp.ratio.value = 12;
  comp.attack.value = 0.003;
  comp.release.value = 0.25;

  master.connect(comp);
  comp.connect(ctx.destination);

  // White-noise bed for whooshes / wingbeats / metallic resonators (2s, reused).
  const len = ctx.sampleRate * 2;
  noise = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  return ctx;
}

// Smoothly move the master toward its effective level.
function applyMaster() {
  if (!master) return;
  const g = master.gain;
  g.cancelScheduledValues(now());
  g.setTargetAtTime(targetMaster(), now(), 0.04);
}

// ── Synthesis helpers ────────────────────────────────────────────────────────

// One-shot oscillator voice with an attack/decay envelope, auto-disconnected.
function blip(t0, { freq = 440, type = 'sine', dur = 0.16, peak = 0.25, attack = 0.005, dest = master, detune = 0, glideTo = null } = {}) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo != null) osc.frequency.exponentialRampToValueAtTime(Math.max(glideTo, 1), t0 + dur);
  osc.detune.value = detune;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(dest);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
  osc.onended = () => { osc.disconnect(); g.disconnect(); };
}

// Filtered noise burst with a gain swell — the basis of every whoosh / wingbeat.
function swoosh(t0, { dur = 0.5, peak = 0.18, type = 'bandpass', from = 1600, to = 400, q = 0.9, dest = master } = {}) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const filt = ctx.createBiquadFilter();
  filt.type = type;
  filt.Q.value = q;
  filt.frequency.setValueAtTime(from, t0);
  filt.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t0 + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + dur * 0.32);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filt).connect(g).connect(dest);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
  src.onended = () => { src.disconnect(); filt.disconnect(); g.disconnect(); };
}

// ── Cue library ──────────────────────────────────────────────────────────────
// Each cue schedules its voices relative to the context clock and self-cleans.
const CUES = {
  // Theme swap — a single, gentle warm "wipe" of falling air (no chime).
  // Length-matched to the radial reveal (~480ms) + body colour transition (~500ms).
  theme(t0) {
    swoosh(t0, { dur: CONFIG.theme.dur, peak: CONFIG.theme.peak, from: 1400, to: 320, q: 0.6 });
  },

  // Voice switch — a soft "decode" that pairs with the text scramble: short
  // semi-random blips thinning out as it resolves + an airy bed + a resolve tone.
  glitch(t0) {
    const n = 10;
    for (let i = 0; i < n; i++) {
      const dt = (i / n) * 0.5 + Math.random() * 0.02;
      const f = 600 + Math.random() * 1700;
      const pk = CONFIG.glitch.peak * (1 - i / n) * 0.85 + 0.01; // thins as text resolves
      blip(t0 + dt, { freq: f, type: 'triangle', dur: 0.04, peak: pk, attack: 0.001 });
    }
    // swoosh(t0, { dur: 0.5, peak: 0.045, type: 'bandpass', from: 1200, to: 3000, q: 1.2 });
    blip(t0 + 0.5, { freq: 880, type: 'sine', dur: 0.2, peak: 0.06, attack: 0.006 }); // soft resolve
  },

  // Contact-form error — a sleek, iOS-style "uh-oh": two clean descending sine
  // tones (a soft major third down, A4 → F4) over a faint triangle sub for weight.
  // Pure and refined — it reads as a polite "no", never a harsh buzz.
  error(t0) {
    const pk = CONFIG.error.peak;
    blip(t0, { freq: 440, type: 'sine', dur: 0.14, peak: pk, attack: 0.006 });
    blip(t0, { freq: 880, type: 'sine', dur: 0.10, peak: pk * 0.16, attack: 0.004 }); // airy octave gloss
    blip(t0 + 0.12, { freq: 349.23, type: 'sine', dur: 0.22, peak: pk, attack: 0.006 });
    blip(t0 + 0.12, { freq: 174.61, type: 'triangle', dur: 0.22, peak: pk * 0.22, attack: 0.006 }); // sub weight
  },

  // Map opens — a gentle upward swell (drawing the chart open).
  mapOpen(t0) {
    swoosh(t0, { dur: 0.55, peak: CONFIG.mapOpen.peak, from: 260, to: 1500, q: 0.6 });
  },

  // Map closes — a shorter, gentle downward fall (the chart rolling shut).
  mapClose(t0) {
    swoosh(t0, { dur: 0.38, peak: CONFIG.mapClose.peak, from: 1400, to: 260, q: 0.6 });
  },

  // Arsenal view swap, orbit → inventory — NOT one whoosh but a shower of the
  // many bodies themselves leaving their orbits and docking into rows, timed to
  // the actual GSAP flight (Tech.jsx): the first ~0.3s is the orbit's rings/core
  // collapsing (the pause — silent), then the Flip carries ~20 glyphs to their
  // rows staggered (each 0.03, dur 0.95) so items keep arriving until ~1.4s. Each
  // grain is one item ticking as it docks — pitch descends as the field folds
  // down into a list — and a weighted "settle" lands with the last row.
  chartFold(t0) {
    const n = 20;
    const start = 0.3;   // items only start crossing once the rings/core clear
    const span = 1.06;   // through the staggered Flip arrivals
    for (let i = 0; i < n; i++) {
      const p = i / (n - 1);
      const dt = start + p * span + (Math.random() - 0.5) * 0.05;
      const f = Math.max(150, 820 - p * 520 + (Math.random() - 0.5) * 130); // falling into rows
      blip(t0 + dt, { freq: f, type: 'sine', dur: 0.05, peak: CONFIG.chartSwap.peak * (0.26 + 0.2 * (1 - p)), attack: 0.002 });
    }
    const land = start + span + 0.05; // ~1.41 — the last row docks
    blip(t0 + land, { freq: 150, glideTo: 100, type: 'triangle', dur: 0.16, peak: CONFIG.chartSwap.peak * 0.7, attack: 0.004 });
    swoosh(t0 + land, { dur: 0.1, peak: CONFIG.chartSwap.peak * 0.28, type: 'lowpass', from: 640, to: 190, q: 0.7 });
  },

  // Arsenal view swap, inventory → orbit — the reverse flight (Tech.jsx): rows
  // fade for ~0.3s, then the rings redraw and the Flip scatters the glyphs back
  // out into orbit through ~1.4s. Same grains, now rising in pitch and spreading,
  // blooming into a soft high resolve as the rings finish redrawing.
  chartUnfurl(t0) {
    const n = 20;
    const start = 0.32;  // rows clear first, then the sky redraws
    const span = 1.04;
    for (let i = 0; i < n; i++) {
      const p = i / (n - 1);
      const dt = start + p * span + (Math.random() - 0.5) * 0.05;
      const f = 360 + p * 640 + (Math.random() - 0.5) * 150;     // spreading up into rings
      blip(t0 + dt, { freq: f, type: 'sine', dur: 0.05, peak: CONFIG.chartSwap.peak * (0.22 + 0.2 * p), attack: 0.002 });
    }
    const bloom = start + span + 0.03; // ~1.39 — rings settled
    blip(t0 + bloom, { freq: 659.25, type: 'sine', dur: 0.22, peak: CONFIG.chartSwap.peak * 0.5, attack: 0.006 });
    blip(t0 + bloom, { freq: 1318.5, type: 'sine', dur: 0.12, peak: CONFIG.chartSwap.peak * 0.16, attack: 0.004 });
  },

  // Arsenal hover — a tiny pluck; pitch varies per node so a sweep across the
  // orbit reads as a little arpeggio rather than a repeated beep.
  blip(t0, { step = 0 } = {}) {
    const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]; // C-major-ish
    const f = scale[((step % scale.length) + scale.length) % scale.length];
    blip(t0, { freq: f, type: 'sine', dur: 0.13, peak: CONFIG.blip.peak, attack: 0.003 });
    blip(t0, { freq: f * 2, type: 'sine', dur: 0.07, peak: CONFIG.blip.peak * 0.34, attack: 0.002 });
  },

  // Build-reel scrub — a dry mechanical "detent": a film sprocket tooth catching
  // as the playhead crosses a frame. A tight, pitch-stable bandpass noise tick
  // over a faint low knock. Time-gated by the caller so a fast drag ratchets
  // (tick-tick-tick) instead of bursting — the physics of dragging a pin across
  // a sprocketed strip, not a melody.
  detent(t0) {
    swoosh(t0, { dur: 0.038, peak: CONFIG.detent.peak, type: 'bandpass', from: 2700, to: 1500, q: 7 });
    blip(t0, { freq: 184, type: 'square', dur: 0.026, peak: CONFIG.detent.peak * 0.5, attack: 0.0008 });
  },

  // Build-reel landing — a soft, weighted "thunk" when the playhead settles onto
  // a frame (pointer up / nav click): a short low triangle that drops a touch,
  // with a brief lowpassed body. Reads as the strip coming to rest.
  settle(t0) {
    blip(t0, { freq: 132, type: 'triangle', dur: 0.13, peak: CONFIG.settle.peak, attack: 0.004, glideTo: 92 });
    swoosh(t0, { dur: 0.09, peak: CONFIG.settle.peak * 0.4, type: 'lowpass', from: 760, to: 200, q: 0.7 });
  },

  // A physical button — a sharp contact transient + a low body "thock". `up:true`
  // is the softer, lower release, so a full press+release reads as a real key
  // bottoming out then springing back (the addictive two-stage click).
  click(t0, { up = false } = {}) {
    const pk = CONFIG.click.peak * (up ? 0.5 : 1);
    swoosh(t0, { dur: up ? 0.016 : 0.022, peak: pk, type: 'bandpass', from: up ? 2400 : 3200, to: up ? 1400 : 1900, q: 8 });
    blip(t0, { freq: up ? 120 : 160, glideTo: up ? 78 : 96, type: 'triangle', dur: up ? 0.05 : 0.07, peak: pk * 0.7, attack: 0.001 });
  },

  // Observatory analytics hover — a soft glassy bell, pitched by the chip's index
  // in its group across a pentatonic scale, so sweeping the field fast resolves to
  // music (no two adjacent semitones, so it can never sound like noise). The
  // caller passes { step } = the chip's running index.
  hoverNote(t0, { step = 0 } = {}) {
    const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]; // C-major pentatonic, octave+
    const f = scale[((step % scale.length) + scale.length) % scale.length];
    blip(t0, { freq: f, type: 'sine', dur: 0.2, peak: CONFIG.hoverNote.peak, attack: 0.004 });
    blip(t0, { freq: f * 2, type: 'sine', dur: 0.1, peak: CONFIG.hoverNote.peak * 0.22, attack: 0.003 }); // airy octave
  },

  // Time-machine "wind back" — the mechanical rewind that rewards *intent* (waking
  // a preserved ruin, or crossing an era boundary). A ratcheting run of ticks that
  // accelerates then settles, under a falling pitch sweep — a tape/clock spun
  // backwards, resolving on a soft low landing. Never fires on passive scroll.
  rewind(t0) {
    const pk = CONFIG.rewind.peak;
    const n = 14;
    for (let i = 0; i < n; i++) {
      const p = i / (n - 1);
      const dt = p * p * 0.5;                       // ticks bunch up as it winds
      swoosh(t0 + dt, { dur: 0.03, peak: pk * (0.5 + 0.5 * p), type: 'bandpass', from: 2600, to: 1400, q: 8 });
    }
    blip(t0, { freq: 760, glideTo: 150, type: 'sawtooth', dur: 0.52, peak: pk * 0.4, attack: 0.01 }); // falling sweep
    blip(t0 + 0.5, { freq: 120, glideTo: 84, type: 'triangle', dur: 0.16, peak: pk * 0.7, attack: 0.006 }); // landing
  },

  // Time-tunnel "page turn" — one soft paper flip per year/event crossed. A brief
  // high-passed noise swish + a faint low tap. The CALLER fires it once per event
  // boundary, so a fast scroll naturally becomes a flurry of flips and a slow
  // scroll a single turn — velocity for free, and always quiet (never a loud rush).
  pageflip(t0) {
    swoosh(t0, { dur: 0.085, peak: CONFIG.pageflip.peak, type: 'highpass', from: 1900, to: 700, q: 0.6 });
    blip(t0, { freq: 210, type: 'triangle', dur: 0.03, peak: CONFIG.pageflip.peak * 0.5, attack: 0.001 });
  },

  // Face-particle assembly — the gathering: a granular shower of tiny pitched ticks
  // that thickens toward the settle, like thousands of grains rushing into place.
  // No whoosh — pure grains. All knobs live in CONFIG.assembleSwell.
  assembleSwell(t0) {
    const c = CONFIG.assembleSwell;
    for (let i = 0; i < c.grains; i++) {
      const p = i / c.grains;
      const dt = p * c.spread + Math.random() * 0.02;
      const f = c.freqMin + Math.random() * (c.freqMax - c.freqMin);
      blip(t0 + dt, { freq: f, type: 'sine', dur: 0.045, peak: c.peak * (0.35 + 0.65 * p), attack: 0.002 });
    }
  },

  // Apple-volume drag tick — a tiny, dry pitched blip whose frequency rises with
  // the level (0..1), so sliding up sounds like it's "filling". Time-gated by the
  // caller so a fast drag ratchets softly instead of buzzing.
  volumeTick(t0, { level = 0.5 } = {}) {
    const f = 320 + level * 900; // ~320Hz at silent → ~1220Hz at full
    blip(t0, { freq: f, type: 'sine', dur: 0.045, peak: CONFIG.volumeTick.peak, attack: 0.002 });
    blip(t0, { freq: f * 2, type: 'sine', dur: 0.025, peak: CONFIG.volumeTick.peak * 0.3, attack: 0.001 });
  },

  // Sound just turned on — a soft confirmation so the toggle is audible.
  confirm(t0) {
    blip(t0, { freq: 523.25, type: 'triangle', dur: 0.18, peak: 0.16, attack: 0.004 });
    blip(t0 + 0.09, { freq: 783.99, type: 'triangle', dur: 0.22, peak: 0.14, attack: 0.004 });
  },

  // Raven flight — synthesized fallback when the mp3 is absent: three lowpassed
  // wingbeats accelerating away + a short descending caw.
  ravenSynth(t0) {
    [0, 0.13, 0.27].forEach((dt, i) => {
      swoosh(t0 + dt, { dur: 0.16 - i * 0.02, peak: 0.16 - i * 0.03, type: 'lowpass', from: 900, to: 300, q: 0.6 });
    });
    blip(t0 + 0.06, { freq: 520, glideTo: 240, type: 'sawtooth', dur: 0.4, peak: 0.07, attack: 0.01 });
  },
};

// ── Optional organic sample (the raven, one-shot) ────────────────────────────
let ravenBuffer = null;
let ravenTried = false;

async function loadRaven(url = CONFIG.raven) {
  if (ravenTried) return;
  ravenTried = true;
  if (!ensureContext()) return;
  try {
    const res = await fetch(url);
    if (!res.ok) { log.debug(`raven sample absent (${res.status}) → synth fallback`); return; }
    ravenBuffer = await ctx.decodeAudioData(await res.arrayBuffer());
  } catch {
    ravenBuffer = null; // any failure → graceful synth fallback
    log.debug('raven sample failed to decode → synth fallback');
  }
}

function playRaven(t0) {
  if (ravenBuffer) {
    const src = ctx.createBufferSource();
    const g = ctx.createGain();
    src.buffer = ravenBuffer;
    g.gain.value = 0.9;
    src.connect(g).connect(master);
    src.start(t0);
    src.onended = () => { src.disconnect(); g.disconnect(); };
  } else {
    CUES.ravenSynth(t0);
  }
}

// ── Continuous beds: the Arsenal ambience + the Hero astrolabe ────────────────
// Each is a managed voice that only exists while wanted AND audible. It plays an
// optional looping mp3 if one is provided + present, else a synthesized fallback.
// Built lazily and fully torn down at zero, so nothing sounds in the background
// once you've scrolled away. Section components drive `setLevel()` from scroll
// proximity for a natural distance fade in/out — that works for sample OR synth.

function makeBed({ build, peak = 1, sampleUrl = null }) {
  let nodes = null;   // { gain, stop() } once running
  let wanted = false;
  let level = 0;      // 0..1 target
  let buffer = null;  // decoded loop sample (if provided + present)
  let tried = false;

  // Looping-sample bed → gain follows the same distance fade as the synth.
  const buildSample = () => {
    const g = ctx.createGain(); g.gain.value = 0.0001;
    const src = ctx.createBufferSource(); src.buffer = buffer; src.loop = true;
    src.connect(g).connect(master); src.start();
    return {
      gain: g,
      stop() {
        const t = now();
        g.gain.setTargetAtTime(0.0001, t, 0.2);
        try { src.stop(t + 0.6); } catch { /* already stopped */ }
        setTimeout(() => { src.disconnect(); g.disconnect(); }, 800);
      },
    };
  };
  const buildNodes = () => (buffer ? buildSample() : build());
  const ensure = () => { if (nodes || !wanted || level <= 0.001 || !unlocked || !enabled || !ensureContext()) return; nodes = buildNodes(); };
  const apply = () => { if (nodes) nodes.gain.gain.setTargetAtTime(level * peak, now(), 0.3); };

  return {
    setLevel(v) {
      level = Math.max(0, Math.min(1, v));
      wanted = level > 0.001;
      if (wanted) { ensure(); apply(); }
      else if (nodes) { nodes.stop(); nodes = null; }
    },
    start() { wanted = true; ensure(); apply(); },
    stop() { wanted = false; level = 0; if (nodes) { nodes.stop(); nodes = null; } },
    // Forward a live drive value (e.g. needle speed) to the running voice, if it
    // implements one. No-op while the bed isn't sounding (sample beds, or faded out).
    setSpeed(v) { if (nodes && nodes.setSpeed) nodes.setSpeed(v); },
    refresh() { if (wanted && level > 0.001) { ensure(); apply(); } else if (nodes && !enabled) { nodes.stop(); nodes = null; } },
    // Preload the optional loop sample; if the bed is already sounding the synth
    // fallback, swap to the sample seamlessly.
    async loadSample() {
      if (tried || !sampleUrl) return;
      tried = true;
      if (!ensureContext()) return;
      try {
        const res = await fetch(sampleUrl);
        if (!res.ok) return; // absent → keep synth fallback, no console noise
        buffer = await ctx.decodeAudioData(await res.arrayBuffer());
        if (nodes) { nodes.stop(); nodes = null; ensure(); apply(); } // swap synth → sample
      } catch { buffer = null; }
    },
  };
}

// Arsenal ambience (synth fallback) — a low detuned space drone (fundamental +
// a fifth) under a lowpass with a slow LFO "breathing" the cutoff + a faint high
// shimmer. Driven by the Arsenal with distance falloff.
const hum = makeBed({
  peak: CONFIG.beds.arsenal.peak,
  sampleUrl: CONFIG.beds.arsenal.sample,
  build: () => {
    const g = ctx.createGain(); g.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220; lp.Q.value = 0.6;
    const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 58;
    const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = 87; o2.detune.value = 4;
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 464; // faint shimmer
    const sg = ctx.createGain(); sg.gain.value = 0.12;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.18;
    const lfoG = ctx.createGain(); lfoG.gain.value = 60;
    lfo.connect(lfoG).connect(lp.frequency);
    o1.connect(lp); o2.connect(lp); o3.connect(sg).connect(lp);
    lp.connect(g).connect(master);
    [o1, o2, o3, lfo].forEach((o) => o.start());
    return {
      gain: g,
      stop() {
        const t = now();
        g.gain.setTargetAtTime(0.0001, t, 0.2);
        [o1, o2, o3, lfo].forEach((o) => { try { o.stop(t + 0.6); } catch { /* already stopped */ } });
        setTimeout(() => { [o1, o2, o3, lfo, lfoG, sg, lp, g].forEach((n) => n.disconnect()); }, 800);
      },
    };
  },
});

// Hero astrolabe (synth fallback) — a revolving gear whose sound IS the needle's
// motion: a low rotational rumble + sharp gear-tooth clicks that are *silent at
// rest* and swell in only while the alidade turns. Both the click rate (the
// gear-tooth LFO) and the loudness are driven live by the needle's angular speed
// via `setSpeed(radPerSec)`, called every frame by the astrolabe. So the gear
// spins exactly as fast as the cursor sweeps the needle. Hero-local, scroll-faded.
const TWO_PI = Math.PI * 2;
const GEAR_TEETH = 26;        // teeth per full needle revolution → click rate
const GEAR_MAX_HZ = 38;       // ceiling on the tooth-click rate (rad/s can spike)
const GEAR_FULL_SPEED = 6;    // needle rad/s at which the gear reaches full volume
// Phone speakers sit closer to the ear and compress harder than laptop drivers
// — the same gear level that reads subtle on a MacBook ran hot on an iPhone
// (v2.0 M1). No web API calibrates output per device, so coarse-pointer
// hardware gets a fixed attenuation of this one bed.
const COARSE_GEAR_TRIM = 0.55;
const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;
const watch = makeBed({
  peak: CONFIG.beds.hero.peak * (isCoarsePointer() ? COARSE_GEAR_TRIM : 1),
  sampleUrl: CONFIG.beds.hero.sample,
  build: () => {
    const g = ctx.createGain(); g.gain.value = 0.0001;

    // Motion gate — the whole gear runs through this; it sits silent until the
    // needle moves, so there is no constant background drone (driven by setSpeed).
    const motion = ctx.createGain(); motion.gain.value = 0.0001;

    // Rotational rumble (the gear body turning).
    const rumble = ctx.createOscillator(); rumble.type = 'sawtooth'; rumble.frequency.value = 64;
    const rumLp = ctx.createBiquadFilter(); rumLp.type = 'lowpass'; rumLp.frequency.value = 180; rumLp.Q.value = 0.5;
    const rumG = ctx.createGain(); rumG.gain.value = 0.02;
    rumble.connect(rumLp).connect(rumG).connect(motion);

    // Gear-tooth clicks: resonant noise gated by an inverted saw LFO whose rate
    // is set live to the needle's revolving speed.
    const src = ctx.createBufferSource(); src.buffer = noise; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3000; bp.Q.value = 25;
    const bp2 = ctx.createBiquadFilter(); bp2.type = 'bandpass'; bp2.frequency.value = 1150; bp2.Q.value = 7;
    const gate = ctx.createGain(); gate.gain.value = 0.35;
    const lfo = ctx.createOscillator(); lfo.type = 'sawtooth'; lfo.frequency.value = 0.0001; // teeth rate := needle speed
    const lfoAmt = ctx.createGain(); lfoAmt.gain.value = -0.40; // inverted → sharp tick + decay
    lfo.connect(lfoAmt).connect(gate.gain);
    src.connect(bp).connect(gate);
    src.connect(bp2).connect(gate);
    gate.connect(motion);

    motion.connect(g);
    g.connect(master);
    [rumble, lfo].forEach((o) => o.start()); src.start();
    return {
      gain: g,
      // Map the needle's angular speed (rad/s) → gear-tooth click rate + loudness.
      setSpeed(radPerSec) {
        const speed = Math.abs(radPerSec) || 0;
        const t = now();
        const clickHz = Math.min((speed / TWO_PI) * GEAR_TEETH, GEAR_MAX_HZ);
        lfo.frequency.setTargetAtTime(Math.max(clickHz, 0.0001), t, 0.05);
        const m = Math.min(speed / GEAR_FULL_SPEED, 1);
        motion.gain.setTargetAtTime(0.0001 + m, t, 0.08);
      },
      stop() {
        const t = now();
        g.gain.setTargetAtTime(0.0001, t, 0.2);
        try { src.stop(t + 0.6); } catch { /* already stopped */ }
        [rumble, lfo].forEach((o) => { try { o.stop(t + 0.6); } catch { /* already stopped */ } });
        setTimeout(() => { [rumble, rumLp, rumG, motion, src, bp, bp2, gate, lfo, lfoAmt, g].forEach((n) => n.disconnect()); }, 800);
      },
    };
  },
});

// Face-particle magic-lantern hover buzz — a warm electric drone: a detuned
// sawtooth pair (root + a fifth) through a bandpass that a slow LFO breathes,
// plus a faint high partial. Driven on/off by the lens hover (setLevel 1/0).
const lens = makeBed({
  peak: CONFIG.beds.lens.peak,
  build: () => {
    const g = ctx.createGain(); g.gain.value = 0.0001;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 320; bp.Q.value = 0.8;
    const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 82;
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = 123; o2.detune.value = 7;
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 548;
    const sg = ctx.createGain(); sg.gain.value = 0.08;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.25;
    const lfoG = ctx.createGain(); lfoG.gain.value = 95;
    lfo.connect(lfoG).connect(bp.frequency);
    o1.connect(bp); o2.connect(bp); o3.connect(sg).connect(bp);
    bp.connect(g).connect(master);
    [o1, o2, o3, lfo].forEach((o) => o.start());
    return {
      gain: g,
      stop() {
        const t = now();
        g.gain.setTargetAtTime(0.0001, t, 0.2);
        [o1, o2, o3, lfo].forEach((o) => { try { o.stop(t + 0.6); } catch { /* already stopped */ } });
        setTimeout(() => { [o1, o2, o3, lfo, lfoG, sg, bp, g].forEach((n) => n.disconnect()); }, 800);
      },
    };
  },
});

// Observatory constellation hover buzz — a sibling of `lens`, intentionally NOT
// identical: cooler and airier (triangle root, a higher shimmer, lowpass instead
// of bandpass), so the two surfaces feel related but distinct.
const orbit = makeBed({
  peak: CONFIG.beds.orbit.peak,
  build: () => {
    const g = ctx.createGain(); g.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 300; lp.Q.value = 0.6;
    const o1 = ctx.createOscillator(); o1.type = 'triangle'; o1.frequency.value = 65;
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 98; o2.detune.value = 5;
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 392;
    const sg = ctx.createGain(); sg.gain.value = 0.06;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.16;
    const lfoG = ctx.createGain(); lfoG.gain.value = 70;
    lfo.connect(lfoG).connect(lp.frequency);
    o1.connect(lp); o2.connect(lp); o3.connect(sg).connect(lp);
    lp.connect(g).connect(master);
    [o1, o2, o3, lfo].forEach((o) => o.start());
    return {
      gain: g,
      stop() {
        const t = now();
        g.gain.setTargetAtTime(0.0001, t, 0.2);
        [o1, o2, o3, lfo].forEach((o) => { try { o.stop(t + 0.6); } catch { /* already stopped */ } });
        setTimeout(() => { [o1, o2, o3, lfo, lfoG, sg, lp, g].forEach((n) => n.disconnect()); }, 800);
      },
    };
  },
});

// Director's-reel film transport — the sound of dragging film across a gate:
// a sliding hiss (noise → bandpass) + a low motor hum + a touch of flutter/wow,
// all behind a motion gate that is SILENT at rest and swells with scrub velocity.
// Driven live by the reel's playhead speed via setSpeed(posUnitsPerSec); the
// faster you scrub, the louder + brighter the transport. Built once on first
// interaction; setSpeed(0) at rest keeps it inaudible without tearing down.
const REEL_FULL_SPEED = 2.4;  // pos-units/sec at which the whir reaches full
const reel = makeBed({
  peak: CONFIG.beds.reel.peak,
  build: () => {
    const g = ctx.createGain(); g.gain.value = 0.0001;
    const motion = ctx.createGain(); motion.gain.value = 0.0001; // gate: silent until moving

    const src = ctx.createBufferSource(); src.buffer = noise; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1700; bp.Q.value = 0.8;
    const hissG = ctx.createGain(); hissG.gain.value = 0.6;
    src.connect(bp).connect(hissG).connect(motion);

    const motor = ctx.createOscillator(); motor.type = 'sawtooth'; motor.frequency.value = 72;
    const motorLp = ctx.createBiquadFilter(); motorLp.type = 'lowpass'; motorLp.frequency.value = 150; motorLp.Q.value = 0.5;
    const motorG = ctx.createGain(); motorG.gain.value = 0.16;
    motor.connect(motorLp).connect(motorG).connect(motion);

    const flutter = ctx.createOscillator(); flutter.type = 'sine'; flutter.frequency.value = 8;
    const flutterG = ctx.createGain(); flutterG.gain.value = 140;
    flutter.connect(flutterG).connect(bp.frequency);

    motion.connect(g).connect(master);
    [motor, flutter].forEach((o) => o.start()); src.start();
    return {
      gain: g,
      setSpeed(v) {
        const s = Math.min(Math.abs(v) / REEL_FULL_SPEED, 1);
        const t = now();
        motion.gain.setTargetAtTime(0.0001 + s, t, 0.05);
        bp.frequency.setTargetAtTime(1100 + s * 2800, t, 0.05); // brighter the faster you scrub
      },
      stop() {
        const t = now();
        g.gain.setTargetAtTime(0.0001, t, 0.2);
        try { src.stop(t + 0.6); } catch { /* already stopped */ }
        [motor, flutter].forEach((o) => { try { o.stop(t + 0.6); } catch { /* already stopped */ } });
        setTimeout(() => { [src, bp, hissG, motor, motorLp, motorG, flutter, flutterG, motion, g].forEach((nd) => nd.disconnect()); }, 800);
      },
    };
  },
});

/** Preload both ambient-bed loop samples (graceful if absent). */
function loadBeds() {
  hum.loadSample();
  watch.loadSample();
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Resume the context (must be called from inside a user gesture). */
function unlock() {
  if (!ensureContext()) return;
  // A user gesture is itself proof the page is active — resume UNCONDITIONALLY.
  // (Previously this was gated on `pageActive`, which relied on
  // `document.hasFocus()`; that returns false on many mobile browsers, so the
  // context never resumed on phones and no sound ever played after the tap.)
  pageActive = true;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  const wasLocked = !unlocked;
  unlocked = true;
  applyMaster();
  hum.refresh();
  watch.refresh();
  lens.refresh();
  orbit.refresh();
  reel.refresh();
  // On the very first unlock, fire any one-shot listeners (e.g. the hero spins
  // the astrolabe so the visitor is rewarded with the synced gear sound the
  // instant audio becomes legal — see Hero.jsx). Each runs at most once.
  if (wasLocked) {
    log.info('audio unlocked by first gesture — cues live');
    while (unlockCbs.length) { try { unlockCbs.shift()(); } catch { /* listener threw — ignore */ } }
  }
}

/** Register a fire-once callback for the first audio unlock. Runs immediately if
 *  already unlocked, so callers never miss it. */
function onUnlock(fn) {
  if (typeof fn !== 'function') return;
  if (unlocked) { try { fn(); } catch { /* ignore */ } return; }
  unlockCbs.push(fn);
}

// Page in view → resume; tab/window switched away → suspend (truly stops the
// clock, so beds + any in-flight cue freeze until we're back). Sound only ever
// plays while the page is actually on screen.
function setPageActive(active) {
  pageActive = active;
  if (!ctx) return;
  if (active && unlocked && enabled) ctx.resume().catch(() => {});
  else ctx.suspend().catch(() => {});
}

/** Attach the one-time gesture unlock + the page-visibility gating. Idempotent. */
function arm() {
  if (armed || typeof window === 'undefined') return;
  armed = true;
  const onGesture = () => unlock();
  window.addEventListener('pointerdown', onGesture, { once: true, passive: true });
  window.addEventListener('keydown', onGesture, { once: true });
  window.addEventListener('touchstart', onGesture, { once: true, passive: true });

  // Gate on document VISIBILITY only. `document.hasFocus()` is unreliable on
  // mobile (the URL bar / soft keyboard steal focus, and Safari often reports
  // false), which used to keep the page "inactive" and suspend audio on phones.
  pageActive = document.visibilityState !== 'hidden';
  const sync = () => setPageActive(document.visibilityState !== 'hidden');
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('focus', sync);
}

function setEnabled(v) {
  enabled = !!v;
  if (ctx) { applyMaster(); if (v && pageActive && ctx.state === 'suspended') ctx.resume().catch(() => {}); }
  hum.refresh();
  watch.refresh();
  lens.refresh();
  orbit.refresh();
  reel.refresh();
}

function setVolume(v) {
  volume = Math.max(0, Math.min(1, v));
  if (ctx) applyMaster();
}

/** Fire a one-shot cue by name (no-op until unlocked + enabled + page in view). */
function playCue(name, opts) {
  if (!unlocked || !enabled || !pageActive || reduceMotion()) return;
  if (!ensureContext()) return;
  const t0 = now() + 0.001;
  if (name === 'raven') return playRaven(t0);
  const fn = CUES[name];
  if (fn) fn(t0, opts || {});
}

/** Has a user gesture resumed the audio context yet? (The browser autoplay gate.)
 *  Distinct from the `enabled` preference: audio only actually plays once BOTH are
 *  true. The UI reads this to show the "armed but locked" coachmark on landing. */
function isUnlocked() {
  return unlocked;
}

// When the FIRST unlock is triggered by a control the visitor is *looking at*
// somewhere other than the hero (the mobile menu, the volume dial), the hero's
// one-shot "reward" (auto-spinning the astrolabe with a synced sound) fires
// off-screen — a phantom noise from nowhere. A menu/control calls suppressReward()
// right before it unlocks; the hero's reward callback consumes the flag and skips.
let rewardSuppressed = false;
function suppressReward() { rewardSuppressed = true; }
function consumeRewardSuppressed() { const v = rewardSuppressed; rewardSuppressed = false; return v; }

export const sound = {
  arm,
  unlock,
  onUnlock,
  isUnlocked,
  suppressReward,
  consumeRewardSuppressed,
  setEnabled,
  setVolume,
  playCue,
  loadRaven,
  loadBeds,
  hum,
  watch,
  lens,
  orbit,
  reel,
  reduceMotion,
};

export { playCue };
