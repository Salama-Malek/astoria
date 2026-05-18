import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import Printer3D from './Printer3D';

const DEVICES = [
  { ru: 'Принтер', en: 'Printer', color: '#2db4d8', gradient: 'from-cmyk-c to-cmyk-m' },
  { ru: 'Футболки', en: 'T-Shirt', color: '#e6296b', gradient: 'from-cmyk-m to-cmyk-y' },
  { ru: 'Ламинатор', en: 'Laminator', color: '#f0b020', gradient: 'from-cmyk-y to-cmyk-m' },
] as const;

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const accent = DEVICES[active];

  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 px-6 md:px-10 relative overflow-hidden">
      {/* Ambient colour blobs */}
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[40px]"
        style={{ background: 'radial-gradient(circle, rgba(230,41,107,0.12), transparent 60%)' }} />
      <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[40px]"
        style={{ background: 'radial-gradient(circle, rgba(45,180,216,0.12), transparent 60%)' }} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(26,24,20,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        {/* ── LEFT: text ─────────────────────────────────────────── */}
        <div>
          <div
            className="inline-flex items-center gap-3 mb-7 px-4 py-2 rounded-full font-mono text-[0.72rem] tracking-[0.25em] uppercase opacity-0 animate-fade-up"
            style={{
              animationDelay: '0.2s',
              color: accent.color,
              background: `${accent.color}14`,
              border: `1px solid ${accent.color}33`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-soft"
              style={{ background: accent.color }}
            />
            {t({ ru: 'Фото · Печать · Полиграфия', en: 'Photo · Print · Bindery' })}
          </div>

          <h1 className="font-serif text-[clamp(3rem,7.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.025em] text-ink mb-6">
            <span className="block overflow-hidden">
              <span className="block opacity-0 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
                {t({ ru: 'Печать', en: 'Printing' })}
              </span>
            </span>
            <span className="block overflow-hidden">
              <em
                className="block italic font-normal opacity-0 animate-reveal-up bg-clip-text text-transparent transition-all duration-700"
                style={{
                  animationDelay: '0.5s',
                  backgroundImage: `linear-gradient(135deg, ${accent.color}, ${
                    active === 0 ? '#e6296b' : active === 1 ? '#f0b020' : '#e6296b'
                  })`,
                }}
              >
                {t({ ru: 'с характером.', en: 'with soul.' })}
              </em>
            </span>
          </h1>

          <div
            className="font-serif italic text-2xl text-ink-mute mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.8s' }}
          >
            {t({ ru: 'С 2010 года.', en: 'Since 2010.' })}
          </div>

          <p
            className="text-[1.1rem] text-ink-soft max-w-[480px] leading-[1.65] mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '1s' }}
          >
            {t({
              ru: 'Маленькая мастерская, где к каждому заказу относятся как к своему. Быстро, аккуратно, всегда вовремя.',
              en: 'A small workshop where every order is treated like our own. Fast, careful, always on time.',
            })}
          </p>

          <div
            className="flex flex-wrap gap-4 items-center opacity-0 animate-fade-up"
            style={{ animationDelay: '1.2s' }}
          >
            <button
              onClick={() => scrollTo('services')}
              className="group px-7 py-4 rounded-full bg-ink text-bg font-semibold text-sm shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5 hover:bg-cmyk-m transition-all duration-400 inline-flex items-center gap-2"
            >
              {t({ ru: 'Все услуги', en: 'All services' })}
              <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-4 rounded-full border border-ink/15 text-ink font-semibold text-sm hover:bg-ink hover:text-bg hover:border-ink transition-all duration-400"
            >
              {t({ ru: 'Связаться', en: 'Get in touch' })}
            </button>
          </div>

          {/* Meta stats */}
          <div
            className="flex gap-10 mt-12 pt-8 border-t border-ink/8 opacity-0 animate-fade-up flex-wrap"
            style={{ animationDelay: '1.4s' }}
          >
            <div>
              <div className="font-serif text-[2.2rem] font-medium leading-none text-ink">
                14<em className="not-italic text-cmyk-m">+</em>
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-mute mt-2">
                {t({ ru: 'лет работы', en: 'years' })}
              </div>
            </div>
            <div>
              <div className="font-serif text-[2.2rem] font-medium leading-none text-ink">9</div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-mute mt-2">
                {t({ ru: 'услуг', en: 'services' })}
              </div>
            </div>
            <div>
              <div className="font-serif text-[2.2rem] font-medium leading-none text-ink">
                A4<em className="not-italic text-cmyk-c">·</em>A3
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-mute mt-2">
                {t({ ru: 'форматы', en: 'formats' })}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: 3D canvas ──────────────────────────────────── */}
        <div className="relative w-full aspect-square max-h-[600px] opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {/* Glow */}
          <div
            className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[60px] blur-[30px] opacity-30 transition-colors duration-700"
            style={{ background: `radial-gradient(ellipse, ${accent.color}, transparent 70%)` }}
          />

          <Printer3D deviceIndex={active} />

          {/* Device tabs */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 bg-bg-card p-2 rounded-full shadow-warm-md border border-ink/8 z-20">
            {DEVICES.map((d, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2.5 rounded-full font-mono text-[0.72rem] font-medium tracking-wide transition-all duration-400 whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-ink-mute hover:text-ink hover:bg-bg-soft'
                  }`}
                  style={
                    isActive
                      ? { background: d.color, boxShadow: `0 4px 14px ${d.color}66` }
                      : undefined
                  }
                >
                  {d[lang]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
