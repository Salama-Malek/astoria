import { useEffect, useRef } from 'react';
import { CMYK } from '@/lib/cmyk';
import { prefersReducedMotion } from '@/lib/motion';

const COLORS = [CMYK.cyan, CMYK.magenta, CMYK.yellow];

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let t0 = performance.now();

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = (now: number) => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;

      const elapsed = (now - t0) / 12000;
      const phase = (elapsed % 1) * 3;
      const i = Math.floor(phase);
      const f = phase - i;
      const a = COLORS[i % 3];
      const b = COLORS[(i + 1) % 3];
      const mix = mixHex(a, b, f);

      el.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      el.style.background = `radial-gradient(circle at center, ${mix}33, ${mix}00 60%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[640px] w-[640px] rounded-full mix-blend-screen will-change-transform"
      style={{ transform: 'translate3d(-9999px, -9999px, 0)' }}
    />
  );
}

function mixHex(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;
  const br = (bh >> 16) & 0xff;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const blue = Math.round(ab + (bb - ab) * t);
  return `#${((r << 16) | (g << 8) | blue).toString(16).padStart(6, '0')}`;
}
