import { useEffect, useState } from 'react';
import { Lock, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/useThemeStore';
import ClueUnlock from './ClueUnlock';

// Per-voice portrait convention: a PRE-PROCESSED, theme-specific plate (the frame,
// monogram and gold-halftone portrait are all baked into the image) lives at
// `public/voices/<dark|light>/<id>.webp`. It is rendered DIRECTLY — no FaceParticles,
// no extra card frame — because the art already is the finished plate. Absent →
// the serif monogram fallback (so voices without art still preview cleanly).
const portraitSrc = (id, theme) => `/voices/${theme}/${id}.webp`;

/**
 * VoicePreviewCard — the shared "who is this voice" detail card, used by BOTH the
 * desktop Voice Hall side panel and the mobile menu's preview view. Shows the
 * pre-rendered portrait plate (theme-matched) over the full identity: origin →
 * real name → persona → description. Preview NEVER applies; only the explicit
 * apply button (or solving a sealed voice's clue) does. Sealed voices keep the
 * wax-lock (the portrait is the reward for unlocking), with name + clue below.
 */
const VoicePreviewCard = ({ v, active, locked, onApply, onUnlocked }) => {
  const { t } = useTranslation();
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme);
  const theme = resolvedTheme === 'light' ? 'light' : 'dark';
  const [portrait, setPortrait] = useState('idle'); // 'idle' | 'ok' | 'none'

  useEffect(() => {
    if (locked) { setPortrait('none'); return undefined; } // sealed → wax lock, the portrait is the reward
    let live = true;
    setPortrait('idle');
    const img = new Image();
    img.onload = () => { if (live) setPortrait('ok'); };
    img.onerror = () => { if (live) setPortrait('none'); }; // asset absent → monogram
    img.src = portraitSrc(v.id, theme);
    return () => { live = false; };
  }, [v.id, locked, theme]);

  return (
    <>
      {/* Image + identity scroll together (desktop); only the action is pinned to
          the foot of the panel, so the CTA is ALWAYS in view and the least-important
          text is the only thing that ever scrolls/cuts. */}
      <div className="voice-preview__scroll">
        <div className="voice-preview__stage">
          {portrait === 'ok' ? (
            // The finished plate — rendered directly (it carries its own frame).
            <img src={portraitSrc(v.id, theme)} alt="" aria-hidden="true" className="voice-preview__portrait" />
          ) : (
            <div className="voice-preview__screen">
              <div className="voice-preview__crest font-chronicle" aria-hidden="true">
                {locked ? <Lock size={24} strokeWidth={1.75} /> : v.glyph}
              </div>
            </div>
          )}
        </div>

        <div className="voice-preview__deck">
          <p className="voice-preview__eyebrow">
            {locked && v.info?.source
              ? `${t('voiceHall.preview.sealed')} · ${v.info.source}`
              : locked
                ? t('voiceHall.preview.sealed')
                : (v.info?.source || t('voiceHall.preview.eyebrow'))}
          </p>
          <h3 className="voice-preview__name font-chronicle">{v.info?.name || v.label}</h3>
          {v.info && <p className="voice-preview__persona">{v.label}</p>}
          {(v.info?.note || (!v.info && v.sample)) && (
            <p className="voice-preview__note">{v.info?.note || v.sample}</p>
          )}
        </div>
      </div>

      {/* Pinned action bar — always visible. Sealed voices carry the clue here too,
          right by the input, so the answer and its hint stay together. */}
      <div className="voice-preview__action">
        {locked ? (
          <>
            <p className="voice-preview__clueline"><span className="voice-preview__cluelabel">{t('voiceHall.preview.clue')}</span> {v.hint}</p>
            <ClueUnlock voice={v} autoFocus={false} onUnlocked={onUnlocked} />
          </>
        ) : active ? (
          <span className="voice-preview__badge"><Check size={13} /> {t('voiceHall.preview.active')}</span>
        ) : (
          <button type="button" className="voice-preview__apply" data-cursor="hover" onClick={onApply}>
            {t('voiceHall.preview.apply')}
          </button>
        )}
      </div>
    </>
  );
};

export default VoicePreviewCard;
