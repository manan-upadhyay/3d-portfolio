import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { playCue } from '../lib/sound';
import { sendRaven, EMAIL_RE } from '../lib/raven';
import { track } from '../lib/analytics';
import RavenNotice from './RavenNotice';
import RavenBurst from './RavenBurst';

/* The "Summon a Voice" form — a visitor asks for a new narrator. Submits through
   the same raven endpoint as Contact and bursts into a celebratory confirmation.
   Shared by the Voice Hall (a collapsed disclosure) and the mobile Persona drawer,
   so the request path is identical everywhere. Persona is the only required field;
   email is optional but, if given, must be valid. */
const VoiceRequest = () => {
  const { t } = useTranslation();
  const [persona, setPersona] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const sendRef = useRef(null);     // the raven flock erupts from the Send button…
  const originRef = useRef(null);   // …whose centre we capture before it swaps out
  const personaRef = useRef(null);
  const emailRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!persona.trim()) { playCue('error'); setState('error'); personaRef.current?.focus(); return; }
    if (email.trim() && !EMAIL_RE.test(email)) { playCue('error'); setState('error'); emailRef.current?.focus(); return; }
    // Capture the button's centre now — the form swaps to the done panel on
    // success, unmounting the button before the burst can read its position.
    const r = sendRef.current?.getBoundingClientRect();
    if (r) originRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    setState('sending');
    track('voice_summon_submit', { persona: persona.trim().slice(0, 60) });
    const result = await sendRaven({
      name: `Voice request — ${persona.trim()}`.slice(0, 110),
      email,
      message: `A visitor would love to hear the site in this voice:\n\n  ${persona.trim()}\n\n${note.trim() || '(no note left)'}`,
      inquiry: 'Voice request',
      company: '',
    });
    track(result.ok ? 'voice_summon_success' : 'voice_summon_error');
    setState(result.ok ? 'done' : 'error');
  };

  return (
    <aside className="voice-summon" aria-label={t('voiceHall.request.cta')}>
      <div className="voice-summon__aura" aria-hidden="true" />
      {/* The raven flock — erupts from the Send button on a successful summon. */}
      <RavenBurst active={state === 'done'} origin={originRef.current} />
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div key="done" className="voice-summon__done"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <span className="voice-summon__burst" aria-hidden="true">
              {[...Array(8)].map((_, i) => <i key={i} style={{ '--a': `${i * 45}deg` }} />)}
              <Sparkles size={22} />
            </span>
            <p className="voice-summon__donetitle font-chronicle">{t('voiceHall.request.done')}</p>
            <p className="voice-summon__donesub">{t('voiceHall.request.doneSub', { persona: persona.trim() })}</p>
          </motion.div>
        ) : (
          <motion.form key="form" className="voice-summon__form" onSubmit={submit}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate>
            {/* Intro line ↔ error share one slot at the top, so an error is seen
                instantly (no scrolling) and never grows the form past the modal. */}
            {state === 'error'
              ? <RavenNotice type="error">{t('voiceHall.request.error')}</RavenNotice>
              : <p className="voice-summon__lede">{t('voiceHall.request.ctaSub')}</p>}

            <label className="voice-summon__field">
              <span className="voice-summon__fieldlabel">
                {t('voiceHall.request.persona')}<span aria-hidden="true" style={{ color: 'var(--color-ember)', marginLeft: 3 }}>*</span>
              </span>
              <input
                ref={personaRef}
                value={persona} onChange={(e) => { setPersona(e.target.value); setState('idle'); }}
                placeholder={t('voiceHall.request.personaPlaceholder')} aria-label={t('voiceHall.request.persona')}
                aria-required="true" aria-invalid={state === 'error' && !persona.trim()}
                className="voice-summon__input" data-cursor="hover" maxLength={80}
              />
            </label>
            <label className="voice-summon__field">
              <span className="voice-summon__fieldlabel">
                {t('voiceHall.request.email')} <span style={{ opacity: 0.55, fontWeight: 400 }}>{t('common.optional')}</span>
              </span>
              <input
                ref={emailRef}
                type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState('idle'); }}
                placeholder={t('voiceHall.request.emailPlaceholder')} aria-label={t('voiceHall.request.email')}
                aria-invalid={state === 'error' && email.trim() && !EMAIL_RE.test(email)}
                className="voice-summon__input" data-cursor="hover" maxLength={200}
              />
            </label>
            <label className="voice-summon__field">
              <span className="voice-summon__fieldlabel">
                {t('voiceHall.request.note')} <span style={{ opacity: 0.55, fontWeight: 400 }}>{t('common.optional')}</span>
              </span>
              <input
                value={note} onChange={(e) => setNote(e.target.value)}
                placeholder={t('voiceHall.request.notePlaceholder')} aria-label={t('voiceHall.request.note')}
                className="voice-summon__input" data-cursor="hover" maxLength={200}
              />
            </label>

            <button ref={sendRef} type="submit" className="voice-summon__send" data-cursor="hover" disabled={state === 'sending'}>
              {state === 'sending'
                ? <><Loader2 size={15} className="animate-spin" /> {t('voiceHall.request.sending')}</>
                : <><Send size={15} /> {t('voiceHall.request.send')}</>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default VoiceRequest;
