import { useReducedMotion } from 'framer-motion';

/**
 * Fog — reusable drifting mist, reusing the 404's fog language (the `fog-drift`
 * keyframes + `--color-fog-rgb` token from index.css). Two banks drift in
 * opposition for parallax depth. Fixed and full-viewport so it reads as ambient
 * atmosphere behind a long scroll (unlike the 404's one-screen bottom banks).
 *
 * `density` (0..1) scales opacity — the Time Machine drives this from `--age` so
 * the past literally sinks into thicker "mists of time". Purely decorative:
 * pointer-events none, aria-hidden, and static under reduced-motion.
 */
const Fog = ({ density = 1, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <div className={`tm-fog ${reduce ? 'tm-fog--static' : ''} ${className}`} aria-hidden="true" style={{ '--fog-density': density }}>
      <div className="tm-fog__bank tm-fog__bank--back" />
      <div className="tm-fog__bank tm-fog__bank--front" />
    </div>
  );
};

export default Fog;
