import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useT, useLang } from '@/lib/i18n';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import { EASE_EXPO } from '@/lib/motion';

interface Tile {
  src: string;
  alt: { ru: string; en: string };
  span: string;
  rotate: number;
  accent: 'c' | 'm' | 'y';
}

const TILES: Tile[] = [
  {
    src: '/photos/exterior-night-panorama.webp',
    alt: { ru: 'Вечерняя витрина мастерской', en: 'Storefront at dusk' },
    span: 'md:col-span-7 row-span-2 aspect-[16/10]',
    rotate: -1,
    accent: 'y',
  },
  {
    src: '/photos/interior-logo-wall.webp',
    alt: { ru: 'Стена с логотипом Astoria', en: 'Logo wall' },
    span: 'md:col-span-5 aspect-[4/5]',
    rotate: 0.5,
    accent: 'c',
  },
  {
    src: '/photos/interior-counter.webp',
    alt: { ru: 'Стойка ресепшн', en: 'Reception counter' },
    span: 'md:col-span-5 aspect-[3/2]',
    rotate: -0.8,
    accent: 'm',
  },
  {
    src: '/photos/workshop-printers.webp',
    alt: { ru: 'Оборудование мастерской', en: 'Workshop equipment' },
    span: 'md:col-span-7 row-span-2 aspect-[16/10]',
    rotate: 1,
    accent: 'y',
  },
  {
    src: '/photos/binding-covers.webp',
    alt: { ru: 'Цветные обложки для переплёта', en: 'Binding covers' },
    span: 'md:col-span-5 aspect-[4/3]',
    rotate: -0.6,
    accent: 'm',
  },
  {
    src: '/photos/interior-neon-wall.webp',
    alt: { ru: 'Неоновая стена внутри', en: 'Neon wall interior' },
    span: 'md:col-span-6 aspect-[3/2]',
    rotate: 0.6,
    accent: 'y',
  },
  {
    src: '/photos/exterior-day-flag.webp',
    alt: { ru: 'Витрина днём', en: 'Storefront by day' },
    span: 'md:col-span-6 aspect-[3/2]',
    rotate: -1.2,
    accent: 'c',
  },
  {
    src: '/photos/framed-prints.webp',
    alt: { ru: 'Готовая печать в рамах', en: 'Framed prints' },
    span: 'md:col-span-4 aspect-[3/4]',
    rotate: 0.8,
    accent: 'm',
  },
  {
    src: '/photos/exterior-entrance.webp',
    alt: { ru: 'Вход в мастерскую', en: 'Entrance' },
    span: 'md:col-span-4 aspect-[3/4]',
    rotate: -0.4,
    accent: 'y',
  },
  {
    src: '/photos/interior-workspace.webp',
    alt: { ru: 'Рабочая зона', en: 'Workspace' },
    span: 'md:col-span-4 aspect-[3/4]',
    rotate: 1.0,
    accent: 'c',
  },
  {
    src: '/photos/bound-theses.webp',
    alt: { ru: 'Сшитые дипломы', en: 'Bound theses' },
    span: 'md:col-span-6 aspect-[3/2]',
    rotate: -0.7,
    accent: 'm',
  },
  {
    src: '/photos/exterior-night-flag.webp',
    alt: { ru: 'Витрина ночью', en: 'Storefront at night' },
    span: 'md:col-span-6 aspect-[3/2]',
    rotate: 0.5,
    accent: 'y',
  },
];

function accentHex(a: 'c' | 'm' | 'y') {
  return a === 'c' ? '#2db4d8' : a === 'm' ? '#e6296b' : '#f0b020';
}

export default function Gallery() {
  const t = useT();
  const lang = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % TILES.length)), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + TILES.length) % TILES.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('overflow-hidden');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('overflow-hidden');
    };
  }, [open, close, next, prev]);

  return (
    <section
      id="gallery"
      className="relative section-y container-x min-h-[100svh]"
      aria-labelledby="gallery-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <ChapterLabel
            ru={t.gallery.chapterLabel}
            en={t.gallery.chapterLabel}
            lang={lang}
            accent="y"
          />
          <h2
            id="gallery-heading"
            className="display text-paper mt-5 text-[clamp(2.2rem,5.4vw,4.6rem)]"
          >
            {t.gallery.heading}{' '}
            <span className="italic font-normal text-cmyk-y text-glow-y">
              {t.gallery.headingItalic}
            </span>
          </h2>
        </div>
        <p className="text-paper-dim font-light max-w-[40ch] md:text-right text-[15px] leading-[1.55]">{t.gallery.sub}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-4">
        {TILES.map((tile, i) => (
          <motion.button
            key={tile.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 30, rotate: tile.rotate * 2, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: tile.rotate, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE_EXPO, delay: (i % 4) * 0.05 }}
            whileHover={{ scale: 1.025, rotate: 0, transition: { duration: 0.6, ease: EASE_EXPO } }}
            className={`group relative overflow-hidden bg-elevated rounded-sm ${tile.span}`}
            aria-label={lang === 'ru' ? tile.alt.ru : tile.alt.en}
          >
            <img
              src={tile.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.07]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,10,12,0.2) 0%, rgba(10,10,12,0.55) 80%, rgba(10,10,12,0.85) 100%)',
              }}
            />
            {/* chromatic shift on hover */}
            <img
              src={tile.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-70 mix-blend-screen transition-opacity duration-500"
              style={{ filter: 'url(#filter-r)', transform: 'translate(-4px, 0)' }}
            />
            <img
              src={tile.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-70 mix-blend-screen transition-opacity duration-500"
              style={{ filter: 'url(#filter-b)', transform: 'translate(4px, 0)' }}
            />
            {/* accent rim */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: `inset 0 0 0 1px ${accentHex(tile.accent)}aa, 0 30px 80px ${accentHex(tile.accent)}30` }}
            />
            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <p
                className={`mono-label text-paper-mute opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-500`}
                style={{ color: accentHex(tile.accent) }}
              >
                {String(i + 1).padStart(2, '0')} · {(lang === 'ru' ? tile.alt.ru : tile.alt.en).toUpperCase()}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="fixed inset-0 z-[150] bg-void/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-6 right-6 glass rounded-full px-3 py-2 mono-label text-paper hover:scale-105 transition-transform"
              aria-label="Close"
            >
              ESC ✕
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 glass rounded-full h-12 w-12 flex items-center justify-center text-paper hover:scale-110 transition-transform"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 glass rounded-full h-12 w-12 flex items-center justify-center text-paper hover:scale-110 transition-transform"
              aria-label="Next"
            >
              ›
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="relative max-h-[85vh] max-w-[1200px] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={TILES[open].src}
                alt={lang === 'ru' ? TILES[open].alt.ru : TILES[open].alt.en}
                className="max-h-[78vh] max-w-full object-contain"
              />
              {/* corner marks */}
              {(
                [
                  ['top-0 left-0 border-l border-t', accentHex(TILES[open].accent)],
                  ['top-0 right-0 border-r border-t', accentHex(TILES[open].accent)],
                  ['bottom-12 left-0 border-l border-b', accentHex(TILES[open].accent)],
                  ['bottom-12 right-0 border-r border-b', accentHex(TILES[open].accent)],
                ] as const
              ).map(([pos, c], k) => (
                <span
                  key={k}
                  className={`absolute ${pos} h-6 w-6 pointer-events-none`}
                  style={{ borderColor: c, boxShadow: `0 0 12px ${c}` }}
                />
              ))}
              <p
                className="mt-4 mono-label"
                style={{ color: accentHex(TILES[open].accent) }}
              >
                {String(open + 1).padStart(2, '0')} / {String(TILES.length).padStart(2, '0')} · {(lang === 'ru' ? TILES[open].alt.ru : TILES[open].alt.en).toUpperCase()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
