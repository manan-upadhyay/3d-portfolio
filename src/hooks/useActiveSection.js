import { useState, useEffect } from 'react';

export const SECTION_IDS = ['origin', 'about', 'work', 'arsenal', 'projects', 'contact'];

/** Tracks which section is currently centered in the viewport (scroll-driven).
 *  Defaults to the Chronicle chapters; pass a custom ordered `ids` list to track
 *  a different route (e.g. the Atelier acts on /making-of). */
export const useActiveSection = (ids = SECTION_IDS) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const line = window.scrollY + window.innerHeight * 0.4;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [ids]); // callers pass a stable module-level ids array

  return active;
};
