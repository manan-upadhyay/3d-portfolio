import { useTranslation } from 'react-i18next';
import { useVoiceStore } from '../store/useVoiceStore';
import { voiceById } from '../i18n/voices';

/**
 * Ambient voice mark (mobile) — an always-visible insignia of the active voice
 * so a phone visitor never loses track of who's narrating (desktop shows the
 * same in the SideRail footer). Sits bottom-left, mirroring the menu FAB; tapping
 * opens the persona picker in the mobile menu via the `ui:open-voice` event.
 *
 * Uses the voice's serif monogram (`glyph`) — the registry's canonical mark — so
 * it works today; a per-voice insignia/silhouette SVG can replace the glyph later
 * without touching this wiring.
 */
const MobileVoiceMark = () => {
  const { t } = useTranslation();
  const voice = useVoiceStore((s) => s.voice);
  const active = voiceById(voice);
  if (!active) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('ui:open-voice'))}
      aria-label={`${t('voiceHall.nowNarrating')}: ${active.label}`}
      className="md:hidden fixed bottom-5 left-5 z-40 grid place-items-center w-11 h-11 rounded-full font-chronicle text-[13px] leading-none"
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        color: 'var(--color-ember)',
        boxShadow: 'var(--shadow-card)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {active.glyph}
    </button>
  );
};

export default MobileVoiceMark;
