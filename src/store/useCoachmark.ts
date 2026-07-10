import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Coachmark coordinator — guarantees only ONE bottom-right coachmark bubble is
 * visible at a time, so the Sound hint and the Voice entice note never overlap.
 *
 * Both controls sit in the same corner and pop UPWARD; if both showed at once
 * they'd stack into an unreadable pile. Each control `request`s the stage when
 * its own conditions are met and renders its bubble only while it `owns` it.
 * Requesting preempts whoever currently holds the stage (the later, more
 * intentional invitation wins — typically the Voice note once the visitor is
 * deep enough in the journey), and `release` clears it only if still the owner.
 *
 * `dismissed` is the persisted "already handled once" memory: once a coachmark
 * has had its single shot — the visitor acted on it, or its show window elapsed —
 * it's retired for good so a returning visitor is never nagged again (the value
 * audit's "unmissable once, then never nag"). `request` is a no-op for a
 * dismissed id, so a retired hint can't reclaim the stage.
 */
type CoachmarkId = 'sound' | 'voice';

interface CoachmarkState {
  active: CoachmarkId | null;
  /** Ids that have had their one-time show and are retired for good. Persisted. */
  dismissed: CoachmarkId[];
  /** Claim the stage (preempts any current holder). No-op if already dismissed. */
  request: (id: CoachmarkId) => void;
  /** Give up the stage — only clears if `id` is the current holder. */
  release: (id: CoachmarkId) => void;
  /** Retire this coachmark forever (persisted) and yield the stage if it holds it. */
  dismiss: (id: CoachmarkId) => void;
  /** Convenience: does `id` currently own the stage? */
  owns: (id: CoachmarkId) => boolean;
  /** Has `id` already had its one-time show? */
  isDismissed: (id: CoachmarkId) => boolean;
}

export const useCoachmark = create<CoachmarkState>()(
  persist(
    (set, get) => ({
      active: null,
      dismissed: [],
      request: (id) => set((s) => (s.dismissed.includes(id) ? s : { active: id })),
      release: (id) => set((s) => (s.active === id ? { active: null } : s)),
      dismiss: (id) =>
        set((s) => ({
          active: s.active === id ? null : s.active,
          dismissed: s.dismissed.includes(id) ? s.dismissed : [...s.dismissed, id],
        })),
      owns: (id) => get().active === id,
      isDismissed: (id) => get().dismissed.includes(id),
    }),
    {
      name: 'coachmark-storage',
      // Only the retired-forever memory persists; `active` is session stage state.
      partialize: (s) => ({ dismissed: s.dismissed }),
    },
  ),
);
