import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { NAV_ITEMS } from '@/lib/content';
import Logo from './Logo';
import LangToggle from './LangToggle';

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-2xl border-b border-ink/8 py-3 px-10 md:px-10'
          : 'bg-transparent py-5 px-10'
      } max-md:px-5 ${scrolled ? 'max-md:py-3' : 'max-md:py-4'}`}
    >
      <div className="flex items-center justify-between">
        <button onClick={scrollTop} className="flex items-center gap-3 cursor-pointer">
          <Logo />
          <span className="font-serif text-2xl font-semibold tracking-tight text-gradient-gold">
            Astoria
          </span>
        </button>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-7 text-[0.85rem] font-medium">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative text-ink-soft hover:text-cmyk-m transition-colors duration-300 group"
              >
                {t(item.label)}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-current scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-400" />
              </button>
            ))}
          </div>

          <LangToggle />

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-ink/10 text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-ink/8 pt-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left font-serif text-xl text-ink-soft hover:text-cmyk-m transition-colors"
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
