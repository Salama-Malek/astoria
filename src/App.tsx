import { useEffect } from 'react';
import { useLenis } from '@/lib/lenis';
import { useUIStore } from '@/state/useUIStore';

export default function App() {
  useLenis();
  const setMouse = useUIStore((s) => s.setMouse);
  const setLoaded = useUIStore((s) => s.setLoaded);
  const lang = useUIStore((s) => s.language);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove);
    const t = setTimeout(() => setLoaded(true), 2400);
    return () => {
      window.removeEventListener('mousemove', onMove);
      clearTimeout(t);
    };
  }, [setMouse, setLoaded]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <main className="min-h-screen flex items-center justify-center">
        <div className="container-x text-center">
          <p className="mono-label mb-6 text-cmyk-y">FOUNDATION READY · {lang.toUpperCase()}</p>
          <h1 className="display text-paper text-7xl md:text-9xl">
            Astoria
          </h1>
          <p className="mt-6 font-serif italic text-paper-dim">Building chapters…</p>
        </div>
      </main>
    </>
  );
}
