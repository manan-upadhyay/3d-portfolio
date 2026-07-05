import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GitBranch, Hexagon, Package, ScanLine, Braces, Hammer, Check } from 'lucide-react';
import { atelier } from '../constants';

// THE GATE — the CI pipeline (.github/workflows/ci.yml) every commit in the graph
// above crossed before it could merge. Deliberately quiet: a mono step-chain, not
// a paragraph. The value it signals is that this is a *pipeline*, not a hobby push
// — lint, types, and a clean build gate every change on push and on every PR.
// Data (the ordered stages) is mirrored 1:1 from the workflow in constants.ci.

const GLYPHS = { branch: GitBranch, node: Hexagon, package: Package, scan: ScanLine, braces: Braces, hammer: Hammer };

const CiPipeline = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { ci } = atelier;

  // One-time staggered reveal when the chain scrolls into view.
  useEffect(() => {
    if (reduce) { setInView(true); return undefined; }
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div ref={ref} className="ci-pipeline">
      <div className="ci-pipeline__meta">
        <span className="ci-pipeline__on">{t('atelier.ci.on')}</span>
        <span className="ci-pipeline__triggers">
          {ci.triggers.map((tr) => (
            <span key={tr} className="ci-pipeline__trigger exp-mono">{tr}</span>
          ))}
        </span>
      </div>

      <ol className={`ci-chain ${inView ? 'is-in' : ''}`} aria-label={ci.steps.map((s) => s.label).join(' → ')}>
        {ci.steps.map((s, i) => {
          const Icon = GLYPHS[s.glyph];
          return (
            <li key={s.id} className="ci-step" style={{ '--i': i }}>
              <span className="ci-step__icon" aria-hidden="true"><Icon size={15} strokeWidth={1.75} /></span>
              <span className="ci-step__body">
                <span className="ci-step__label exp-mono">{s.label}</span>
                <span className="ci-step__cmd exp-mono">{s.cmd}</span>
              </span>
            </li>
          );
        })}
        <li className="ci-step ci-step--pass" style={{ '--i': ci.steps.length }}>
          <span className="ci-step__icon" aria-hidden="true"><Check size={15} strokeWidth={2.25} /></span>
          <span className="ci-step__body">
            <span className="ci-step__label exp-mono">{ci.pass}</span>
          </span>
        </li>
      </ol>

      <p className="atelier-card__caption mt-6">{t('atelier.ci.caption')}</p>
    </div>
  );
};

export default CiPipeline;
