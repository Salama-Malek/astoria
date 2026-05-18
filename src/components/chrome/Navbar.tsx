import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/state/useUIStore';
import { useT } from '@/lib/i18n';
import { scrollToSection } from '@/lib/lenis';
import Wordmark from './Wordmark';
import { EASE_EXPO } from '@/lib/motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lang = useUIStore((s) => s.language);
  const toggle = useUIStore((s) => s.toggleLanguage);
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: Array<[string, keyof typeof t.nav]> = [
    ['about', 'about'],
    ['services', 'services'],
    ['craft', 'craft'],
    ['gallery', 'gallery'],
    ['reviews', 'reviews'],
    ['contact', 'contact'],
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_EXPO, delay: 2.6 }}
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 ${
        scrolled ? 'bg-void/70 backdrop-blur-xl border-b border-paper-faint' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-[64px]">
        <button
          onClick={() => scrollToSection('hero')}
          className="group"
          aria-label="Astoria — home"
        >
          <Wordmark size={22} />
        </button>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {links.map(([id, key]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="mono-label hover:text-paper transition-colors"
            >
              {t.nav[key]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="glass rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wider2 flex items-center gap-1.5"
            aria-label="Toggle language"
          >
            <span className={lang === 'ru' ? 'text-paper' : 'text-paper-mute'}>RU</span>
            <span className="text-paper-mute">·</span>
            <span className={lang === 'en' ? 'text-paper' : 'text-paper-mute'}>EN</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
