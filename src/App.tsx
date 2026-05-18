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
import Gallery from '@/components/chapters/Gallery';
import Testimonials from '@/components/chapters/Testimonials';
import Contact from '@/components/chapters/Contact';

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
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
