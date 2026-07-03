import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ArrowRight, Download } from 'lucide-react';
import { personalInfo, summon } from '../constants';
import { scrollToSection } from '../lib/smoothScroll';
import { track, trackOnce } from '../lib/analytics';

// A secondary contact prompt that surfaces once the visitor is engaged — after
// they leave the hero/about intro and are in the middle of the journey (work →
// arsenal → projects), then steps aside at Contact where the form itself takes
// over (v1.1 Workstream B: contact reach was only 36.6%). Session-dismissible,
// reduced-motion aware, and out of the way of the bottom-right control cluster.
const SHOW_ON = new Set(['work', 'arsenal', 'projects']);

const StickyCta = ({ activeId }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem('stickyCtaDismissed') === '1'; } catch { return false; }
  });
  const shown = SHOW_ON.has(activeId) && !dismissed;
  const sentRef = useRef(false);

  useEffect(() => {
    if (shown && !sentRef.current) { sentRef.current = true; trackOnce('sticky_cta_shown', 'sticky_cta_shown'); }
  }, [shown]);

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem('stickyCtaDismissed', '1'); } catch { /* private mode — fine */ }
    track('sticky_cta_dismiss');
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="fixed left-4 bottom-4 z-40 max-w-[calc(100vw-2rem)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex items-center gap-2 sm:gap-3 rounded-2xl pl-4 pr-2 py-2"
            style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)', boxShadow: 'var(--shadow-card)' }}
          >
            <span className="hidden sm:block text-[13.5px] font-medium pr-1" style={{ color: 'var(--color-text)' }}>
              {t('stickyCta.text')}
            </span>
            <button
              type="button" data-cursor="hover"
              onClick={() => { track('sticky_cta_click', { target: 'contact' }); scrollToSection('contact'); }}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold"
              style={{ background: 'var(--btn-bg)', color: 'var(--btn-fg)' }}
            >
              {t('stickyCta.cta')} <ArrowRight size={14} />
            </button>
            <a
              href={personalInfo.resumeLink} download={summon.resumeFileName} data-cursor="hover"
              onClick={() => track('sticky_cta_click', { target: 'resume' })}
              aria-label={t('stickyCta.resume')}
              className="hidden sm:grid place-items-center w-9 h-9 rounded-full transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <Download size={16} />
            </a>
            <button
              type="button" onClick={dismiss} data-cursor="hover" aria-label={t('stickyCta.dismiss')}
              className="grid place-items-center w-8 h-8 rounded-full transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCta;
