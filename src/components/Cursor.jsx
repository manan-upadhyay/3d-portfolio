import { useEffect, useRef } from 'react';

/**
 * Custom cursor: crisp dot (1:1), trailing ring (grows over interactive
 * elements), and a soft backlight. Pure DOM + rAF. Auto-disabled on touch /
 * reduced-motion. The native cursor is hidden only after the custom cursor has
 * successfully painted at least once; if browser/settings support is odd, we
 * fail open to the OS cursor instead of leaving the visitor cursorless.
 */
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    root.classList.remove('has-custom-cursor', 'custom-cursor-active');
    if (!finePointer.matches || reduceMotion.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;
    const els = [dot, ring, glow];

    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my, gx = mx, gy = my;
    let visible = false;
    let nativeHidden = false;
    let raf;

    root.classList.add('has-custom-cursor');

    const show = () => {
      if (!visible) {
        visible = true;
        els.forEach((e) => { e.style.opacity = '1'; });
      }
      if (!nativeHidden) {
        nativeHidden = true;
        root.classList.add('custom-cursor-active');
      }
    };
    const hide = () => {
      visible = false;
      nativeHidden = false;
      root.classList.remove('custom-cursor-active');
      els.forEach((e) => { e.style.opacity = '0'; });
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      show();
    };

    const onOver = (e) => {
      const interactive = e.target.closest?.('a, button, [data-cursor="hover"], input, textarea, label, kbd');
      ring.style.setProperty('--scale', interactive ? '1.7' : '1');
      ring.style.borderColor = interactive ? 'var(--color-ember)' : 'color-mix(in srgb, var(--color-text) 45%, transparent)';
    };
    const onDown = () => ring.style.setProperty('--press', '0.82');
    const onUp = () => ring.style.setProperty('--press', '1');
    // Only hide when the pointer truly leaves the window (not on capture quirks).
    const onOut = (e) => { if (!e.relatedTarget && !e.toElement) hide(); };
    const onBlur = () => hide();

    const loop = () => {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(calc(var(--scale,1) * var(--press,1)))`;
      glow.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseout', onOut);
    window.addEventListener('blur', onBlur);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor', 'custom-cursor-active');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-backlight" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default Cursor;
