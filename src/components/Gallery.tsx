import { useLang } from '@/lib/LanguageContext';
import { GALLERY } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionEyebrow from './SectionEyebrow';

const ACCENT_BG: Record<'c' | 'm' | 'y' | 'k', string> = {
  m: 'bg-gradient-to-br from-[#ffe4ec] to-[#fbcdd9] text-cmyk-m',
  c: 'bg-gradient-to-br from-[#d8f0f7] to-[#b3def0] text-cmyk-c',
  y: 'bg-gradient-to-br from-[#fff0d0] to-[#fbe0a8] text-cmyk-y',
  k: 'bg-gradient-to-br from-[#ece7d8] to-[#ddd5c0] text-ink',
};

export default function Gallery() {
  const { t } = useLang();
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="gallery" className="py-28 md:py-32 px-6 md:px-10">
      <div ref={headRef} className="reveal max-w-[1400px] mx-auto mb-16 grid lg:grid-cols-2 gap-12 items-end">
        <div>
          <SectionEyebrow num="02" label={{ ru: 'Галерея', en: 'Gallery' }} />
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.025em] text-ink">
            {t({
              ru: (
                <>
                  Загляните <em className="not-italic italic font-normal text-gradient-cm">внутрь</em>
                </>
              ),
              en: (
                <>
                  Step <em className="not-italic italic font-normal text-gradient-cm">inside</em>
                </>
              ),
            })}
          </h2>
        </div>
        <p className="text-ink-soft text-[1.1rem] leading-[1.65] max-w-[560px] lg:justify-self-end">
          {t({
            ru: 'Наша маленькая мастерская — место, где из обычной бумаги получается что-то стоящее.',
            en: 'Our small workshop — where ordinary paper becomes something worth keeping.',
          })}
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4"
      >
        {GALLERY.map((img, i) => (
          <div
            key={i}
            className={`group relative rounded-[18px] overflow-hidden shadow-warm cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-warm-lg hover:z-10 ${
              img.span === 'tall' ? 'row-span-2' : ''
            } ${img.span === 'wide' ? 'col-span-2' : ''}`}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={t(img.alt)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              // CMYK placeholder — swap with real photo by setting src in content.ts
              <div className={`w-full h-full flex items-center justify-center relative ${ACCENT_BG[img.accent]}`}>
                <svg
                  className="w-3/5 h-3/5 opacity-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}

            <span className="absolute top-4 right-4 z-10 font-mono text-[0.7rem] text-ink bg-white/85 backdrop-blur-sm w-7 h-7 rounded-full flex items-center justify-center">
              {img.num}
            </span>

            <span className="absolute bottom-4 left-4 z-10 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-ink bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-md">
              {t(img.alt)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
