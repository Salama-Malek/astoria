import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
