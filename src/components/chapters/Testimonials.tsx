import { motion } from 'framer-motion';
import { useT, useLang } from '@/lib/i18n';
import { useUIStore } from '@/state/useUIStore';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import { EASE_EXPO, fadeUp } from '@/lib/motion';

const ACCENTS: Array<'c' | 'm' | 'y'> = ['c', 'm', 'y', 'c', 'm', 'y'];
const ACCENT_HEX = { c: '#2db4d8', m: '#e6296b', y: '#f0b020' } as const;

// Depth offsets — z value drives translateZ and parallax intensity
const Z_OFFSETS = [-30, 10, -50, 20, -10, -40];

function StarRow({ color }: { color: string }) {
  return (
    <div className="flex gap-1.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={color}
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.6L18.2 22 12 18.3 5.8 22l1.7-7.4L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useT();
  const lang = useLang();
  const mouseX = useUIStore((s) => s.mouseX);
  const mouseY = useUIStore((s) => s.mouseY);

  return (
    <section
      id="reviews"
      className="relative chapter container-x"
      aria-labelledby="reviews-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(230,41,107,0.06), transparent 60%)',
        }}
      />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <ChapterLabel
            ru={t.reviews.chapterLabel}
            en={t.reviews.chapterLabel}
            lang={lang}
            accent="m"
          />
          <h2
            id="reviews-heading"
            className="display text-paper mt-5 text-[clamp(2.2rem,5.4vw,4.6rem)]"
          >
            {t.reviews.heading}{' '}
            <span className="italic font-normal text-cmyk-m text-glow-m">
              {t.reviews.headingItalic}
            </span>
          </h2>
        </div>
        <p className="mono-label">{t.reviews.source}</p>
      </div>

      <div
        className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 perspective-[1200px]"
        style={{ perspective: '1200px' }}
      >
        {t.reviews.items.map((item, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const color = ACCENT_HEX[accent];
          const z = Z_OFFSETS[i % Z_OFFSETS.length];
          // mouse parallax
          const px = (mouseX - 0.5) * (z / 8);
          const py = (mouseY - 0.5) * (z / 12);

          return (
            <motion.article
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: (i % 3) * 0.1 }}
              style={{
                transform: `translate3d(${px}px, ${py}px, ${z}px)`,
                transformStyle: 'preserve-3d',
              }}
              className="group relative"
            >
              <div className="relative h-full glass rounded-sm p-6 md:p-7 overflow-hidden">
                {/* big opening quote mark */}
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -left-1 font-serif text-[150px] leading-none select-none pointer-events-none"
                  style={{
                    color,
                    opacity: 0.18,
                    textShadow: `0 0 24px ${color}40`,
                  }}
                >
                  “
                </span>

                <div className="relative">
                  <p className="font-serif font-light text-paper text-[clamp(1rem,1.2vw,1.13rem)] leading-[1.55]">
                    {item.quote}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono uppercase text-[11px] tracking-wider2 text-paper-dim">
                      {item.author}
                    </span>
                    <StarRow color={color} />
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `0 30px 70px ${color}26, inset 0 0 0 1px ${color}3a` }}
                />
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="https://yandex.com/maps/-/CPcUiZNP"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 mono-label text-paper hover:text-cmyk-m transition-colors"
        >
          <span className="block h-px w-12 bg-paper-faint group-hover:bg-cmyk-m transition-colors" />
          {t.reviews.moreLink}
          <span className="block h-px w-12 bg-paper-faint group-hover:bg-cmyk-m transition-colors" />
        </a>
      </div>
    </section>
  );
}
