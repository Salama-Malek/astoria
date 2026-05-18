import { motion } from 'framer-motion';
import { useT, useLang } from '@/lib/i18n';
import { dict } from '@/lib/i18n';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import { EASE_EXPO, fadeUp } from '@/lib/motion';

type Accent = 'c' | 'm' | 'y';

interface ServiceDef {
  key: keyof ReturnType<typeof useT>['services']['items'];
  accent: Accent;
  visual: 'paper-stack' | 'scan-line' | 'portrait' | 'reflective' | 'pvc-panel' | 'copy-bar';
  photo?: string;
  alt?: string;
}

const SERVICES: ServiceDef[] = [
  { key: 'print', accent: 'c', visual: 'paper-stack' },
  { key: 'copy', accent: 'm', visual: 'copy-bar' },
  { key: 'photo', accent: 'y', visual: 'paper-stack', photo: '/photos/framed-prints.webp', alt: 'Framed photo prints' },
  { key: 'id', accent: 'c', visual: 'portrait' },
  { key: 'bind', accent: 'm', visual: 'paper-stack', photo: '/photos/bound-theses.webp', alt: 'Bound dissertation books' },
  { key: 'lam', accent: 'y', visual: 'reflective' },
  { key: 'scan', accent: 'c', visual: 'scan-line' },
  { key: 'tshirt', accent: 'm', visual: 'paper-stack', photo: '/photos/tshirt-board.webp', alt: 'T-shirt printing display' },
  { key: 'pvc', accent: 'y', visual: 'pvc-panel' },
];

const ACCENT_HEX: Record<Accent, string> = { c: '#2db4d8', m: '#e6296b', y: '#f0b020' };

function VisualArt({ visual, accent }: { visual: ServiceDef['visual']; accent: Accent }) {
  const hex = ACCENT_HEX[accent];
  const common = 'absolute inset-0 flex items-center justify-center';
  switch (visual) {
    case 'paper-stack':
      return (
        <div className={common}>
          <div className="relative">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-[140px] h-[180px] -translate-x-1/2 -translate-y-1/2 bg-paper rounded-[2px]"
                style={{
                  transform: `translate(-50%,-50%) translateY(${i * 4}px) translateX(${i * -2}px) rotate(${i - 2}deg)`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 ${24 + i * 4}px ${hex}40`,
                  opacity: 0.92 - i * 0.05,
                }}
              />
            ))}
            <div
              className="absolute left-1/2 top-[calc(50%+24px)] -translate-x-1/2 h-[2px] w-[120px]"
              style={{ background: hex, boxShadow: `0 0 14px ${hex}` }}
            />
          </div>
        </div>
      );
    case 'copy-bar':
      return (
        <div className={common}>
          <div className="relative w-[180px] h-[220px] bg-paper/95 rounded-[2px] overflow-hidden">
            <div
              className="absolute left-0 right-0 h-[14px] animate-[drift_3s_ease-in-out_infinite]"
              style={{
                top: '40%',
                background: `linear-gradient(90deg, transparent, ${hex}, transparent)`,
                boxShadow: `0 0 24px ${hex}`,
              }}
            />
            {[20, 35, 55, 70, 80].map((y, i) => (
              <div key={i} className="absolute left-4 right-4 h-[3px] bg-void/40" style={{ top: `${y}%`, width: `${60 + i * 7}%` }} />
            ))}
          </div>
        </div>
      );
    case 'portrait':
      return (
        <div className={common}>
          <div className="relative">
            <div
              className="h-[180px] w-[140px] rounded-[6px] overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #1d1f24 0%, #2a2c33 60%, #1d1f24 100%)',
              }}
            >
              {/* circular head */}
              <div className="absolute left-1/2 top-[24%] -translate-x-1/2 h-12 w-12 rounded-full bg-paper/15" />
              {/* shoulders */}
              <div className="absolute left-1/2 top-[58%] -translate-x-1/2 h-12 w-24 rounded-t-[50%] bg-paper/12" />
            </div>
            <div
              className="absolute inset-0 rounded-[6px]"
              style={{
                boxShadow: `inset 0 0 40px ${hex}`,
              }}
            />
            <div
              className="absolute left-1/2 -top-3 -translate-x-1/2 h-2 w-12 rounded-full"
              style={{ background: hex, boxShadow: `0 0 16px ${hex}` }}
            />
          </div>
        </div>
      );
    case 'reflective':
      return (
        <div className={common}>
          <div
            className="h-[200px] w-[150px] rounded-[2px]"
            style={{
              background: `linear-gradient(135deg, ${hex}40, ${hex}10 30%, #1a1c20 60%, ${hex}30 100%)`,
              boxShadow: `0 0 48px ${hex}30`,
            }}
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
              }}
            />
          </div>
        </div>
      );
    case 'pvc-panel':
      return (
        <div className={common}>
          <div
            className="h-[200px] w-[160px] rounded-sm bg-[#16161a] flex items-center justify-center"
            style={{ boxShadow: `0 0 32px ${hex}30, inset 0 0 24px rgba(0,0,0,0.6)` }}
          >
            <div className="font-serif italic text-4xl" style={{ color: hex, textShadow: `0 0 16px ${hex}` }}>
              A
            </div>
          </div>
        </div>
      );
    case 'scan-line':
      return (
        <div className={common}>
          <div className="relative w-[180px] h-[220px] bg-[#0e0f12] rounded-[2px] overflow-hidden border border-paper-faint">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-2 right-2 h-px"
                style={{ top: `${10 + i * 9}%`, background: 'rgba(245,240,227,0.18)' }}
              />
            ))}
            <div
              className="absolute left-0 right-0 h-px"
              style={{
                top: '50%',
                background: hex,
                boxShadow: `0 0 16px 2px ${hex}`,
                animation: 'drift 4s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      );
  }
}

function ServiceCard({
  def,
  index,
}: {
  def: ServiceDef;
  index: number;
}) {
  const t = useT();
  const lang = useLang();
  const item = t.services.items[def.key];
  const accentHex = ACCENT_HEX[def.accent];
  const accentText =
    def.accent === 'c' ? 'text-cmyk-c' : def.accent === 'm' ? 'text-cmyk-m' : 'text-cmyk-y';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE_EXPO, delay: (index % 4) * 0.06 }}
      className="group relative shrink-0 w-[clamp(280px,32vw,380px)] h-[clamp(440px,60vh,580px)] snap-center"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-sm bg-elevated border border-paper-faint transition-all duration-700 ease-expo group-hover:-translate-y-2"
        style={
          {
            // group hover glow via CSS variable
            '--accent': accentHex,
          } as React.CSSProperties
        }
      >
        {/* Visual zone — top 70% */}
        <div className="relative h-[68%] overflow-hidden bg-[#0e0f12]">
          {def.photo ? (
            <img
              src={def.photo}
              alt={def.alt ?? ''}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.06]"
            />
          ) : (
            <VisualArt visual={def.visual} accent={def.accent} />
          )}
          {/* tone wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,12,0.2) 0%, rgba(10,10,12,0.5) 70%, rgba(10,10,12,0.9) 100%)',
            }}
          />
          {/* chromatic aberration overlays on hover */}
          {def.photo && (
            <>
              <img
                src={def.photo}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-80 mix-blend-screen transition-opacity duration-500"
                style={{ filter: 'url(#filter-r)', transform: 'translate(-4px, 0)' }}
              />
              <img
                src={def.photo}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-80 mix-blend-screen transition-opacity duration-500"
                style={{ filter: 'url(#filter-b)', transform: 'translate(4px, 0)' }}
              />
            </>
          )}
          {/* accent rim line at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{ background: accentHex, boxShadow: `0 0 18px ${accentHex}` }}
          />
        </div>

        {/* Text zone */}
        <div className="relative h-[32%] p-5 md:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <span className={`mono-label ${accentText}`}>
              {String(index + 1).padStart(2, '0')} / 09
            </span>
            <span className="font-mono uppercase text-[9.5px] tracking-wider2 text-paper-mute opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {lang === 'ru' ? dict.en.services.items[def.key].name : dict.ru.services.items[def.key].name}
            </span>
          </div>
          <div>
            <h3 className="font-serif text-[clamp(1.3rem,2vw,1.7rem)] text-paper leading-tight">
              {item.name}
            </h3>
            <p className="mt-2 text-sm text-paper-dim font-light leading-snug">{item.desc}</p>
          </div>
        </div>

        {/* outer hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ boxShadow: `0 24px 70px ${accentHex}26, 0 0 0 1px ${accentHex}3a inset` }}
        />
      </div>
    </motion.article>
  );
}

export default function Services() {
  const t = useT();
  const lang = useLang();

  return (
    <section id="services" className="relative section-y" aria-labelledby="services-heading">
      {/* SVG filters for chromatic aberration */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="filter-r" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="filter-b" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="container-x flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <ChapterLabel
            ru={t.services.chapterLabel}
            en={t.services.chapterLabel}
            lang={lang}
            accent="c"
          />
          <motion.h2
            id="services-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15%' }}
            className="display text-paper mt-6 text-[clamp(2.4rem,6vw,5rem)]"
          >
            {t.services.heading}{' '}
            <span className="italic font-normal text-cmyk-c text-glow-c">
              {t.services.headingItalic}
            </span>
          </motion.h2>
        </div>
        <p className="text-paper-dim font-light max-w-[36ch] md:text-right">
          {t.services.sub}
        </p>
      </div>

      <div
        className="mt-16 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-10 px-[max(16px,4vw)] [scrollbar-width:thin]"
        style={{ scrollPaddingLeft: '4vw' }}
      >
        {SERVICES.map((def, i) => (
          <ServiceCard key={def.key} def={def} index={i} />
        ))}
        <div aria-hidden="true" className="shrink-0 w-[4vw]" />
      </div>

      <div className="container-x mt-2 flex items-center gap-3">
        <span className="mono-label text-paper-mute">SCROLL →</span>
        <div className="h-px flex-1 bg-paper-faint" />
        <span className="font-mono text-[11px] tracking-wider2 text-paper-mute">09 SERVICES</span>
      </div>
    </section>
  );
}
