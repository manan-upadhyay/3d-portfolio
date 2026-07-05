import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GitBranch, Hexagon, Package, ScanLine, Braces, Hammer, Check } from 'lucide-react';
import { atelier } from '../constants';

// THE GATE — the CI pipeline (.github/workflows/ci.yml) every commit in the graph
// above crossed before it could merge. Drawn as a vertical run timeline (the shape
// GitHub Actions itself uses): stages flow top→down a rail of nodes into the green
// "merge-ready" gate. Identical, full-width layout on every screen — no horizontal
// scroll, nothing truncated. Data is mirrored 1:1 from the workflow in constants.ci.

const GLYPHS = { branch: GitBranch, node: Hexagon, package: Package, scan: ScanLine, braces: Braces, hammer: Hammer, check: Check };

const CiPipeline = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { ci } = atelier;

  // The full run = the workflow stages + the terminal "merge-ready" gate.
  const stages = [...ci.steps, { id: '__gate', glyph: 'check', label: ci.pass, gate: true }];

  // One-time staggered reveal when the pipeline scrolls into view.
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

      <ol className={`ci-run ${inView ? 'is-in' : ''}`} aria-label={stages.map((s) => s.label).join(' → ')}>
        {stages.map((s, i) => {
          const Icon = GLYPHS[s.glyph];
          return (
            <li key={s.id} className={`ci-stage${s.gate ? ' ci-stage--gate' : ''}`} style={{ '--i': i }}>
              <span className="ci-stage__node" aria-hidden="true"><Icon size={16} strokeWidth={s.gate ? 2.5 : 1.75} /></span>
              <span className="ci-stage__text">
                <span className="ci-stage__label exp-mono">{s.label}</span>
                {s.cmd && <span className="ci-stage__cmd exp-mono">{s.cmd}</span>}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="atelier-card__caption mt-7">{t('atelier.ci.caption')}</p>
    </div>
  );
};

export default CiPipeline;
