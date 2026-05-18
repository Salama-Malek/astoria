import { useEffect } from 'react';
import { useLenis } from '@/lib/lenis';
import { useUIStore } from '@/state/useUIStore';
import Loader from '@/components/chrome/Loader';
import Navbar from '@/components/chrome/Navbar';
import Footer from '@/components/chrome/Footer';
import MouseGlow from '@/components/chrome/MouseGlow';
import Hero from '@/components/chapters/Hero';
import About from '@/components/chapters/About';
import Services from '@/components/chapters/Services';
import CraftShowcase from '@/components/chapters/CraftShowcase';

export default function App() {
  useLenis();
  const setMouse = useUIStore((s) => s.setMouse);
  const lang = useUIStore((s) => s.language);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [setMouse]);

  return (
    <>
      <Loader />
      <Navbar />
      <MouseGlow />
      <div className="grain-overlay" aria-hidden="true" />

      <main>
        <Hero />

        <About />
        <Services />
        <CraftShowcase />
        <section id="gallery" className="section-y container-x">
          <p className="mono-label text-paper-mute">CHAPTER V — placeholder</p>
        </section>
        <section id="reviews" className="section-y container-x">
          <p className="mono-label text-paper-mute">CHAPTER VI — placeholder</p>
        </section>
        <section id="contact" className="section-y container-x">
          <p className="mono-label text-paper-mute">CHAPTER VII — placeholder</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
