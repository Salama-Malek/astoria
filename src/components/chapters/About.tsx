import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useT, useLang } from '@/lib/i18n';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import { EASE_EXPO, fadeUp, stagger } from '@/lib/motion';

export default function About() {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const captionY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section
      ref={ref}
      id="about"
      className="relative chapter chapter-tall container-x"
      aria-labelledby="about-heading"
    >
      {/* Light beam top-left */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 10% 0%, rgba(240,176,32,0.07), transparent 55%)',
        }}
      />

      <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
        {/* Left: portrait image with parallax */}
        <div className="relative aspect-[3/4] lg:aspect-[2/3] overflow-hidden lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.4, ease: EASE_EXPO }}
            className="absolute inset-0"
          >
            <motion.img
              src="/photos/hands-keychains.webp"
              alt={lang === 'ru' ? 'Руки с фотобрелоками' : 'Hands holding photo keychains'}
              style={{ y: imageY }}
              className="absolute inset-0 h-[115%] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* tone overlay */}
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  'linear-gradient(135deg, rgba(10,10,12,0.55), rgba(10,10,12,0.15) 50%, rgba(10,10,12,0.75))',
              }}
              aria-hidden="true"
            />
            {/* magenta rim */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-px"
              style={{ boxShadow: '0 0 32px 6px rgba(230,41,107,0.45)' }}
              aria-hidden="true"
            />
          </motion.div>

          <motion.figcaption
            style={{ y: captionY }}
            className="absolute left-0 right-0 bottom-0 p-6"
          >
            <p className="mono-label text-paper-mute">{t.about.caption}</p>
          </motion.figcaption>
        </div>

        {/* Right: copy */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15%' }}
          className="lg:pt-6"
        >
          <motion.div variants={fadeUp}>
            <ChapterLabel
              ru={t.about.chapterLabel}
              en={t.about.chapterLabel}
              lang={lang}
              accent="m"
            />
          </motion.div>

          <motion.h2
            id="about-heading"
            variants={fadeUp}
            className="display text-paper mt-6 text-[clamp(2.2rem,5.4vw,5rem)]"
          >
            {t.about.heading}
            <br />
            <span className="italic font-normal text-paper-dim">{t.about.headingItalic}</span>
          </motion.h2>

          <div className="mt-8 space-y-5 text-[clamp(0.98rem,1.1vw,1.13rem)] text-paper-dim leading-[1.65] max-w-[60ch] font-light">
            <motion.p variants={fadeUp}>{t.about.p1}</motion.p>
            <motion.p variants={fadeUp}>{t.about.p2}</motion.p>
            <motion.p variants={fadeUp}>{t.about.p3}</motion.p>
          </div>

          {/* Stat line */}
          <motion.div
            variants={fadeUp}
            className="mt-12 border-t border-paper-faint pt-6 flex flex-wrap items-baseline gap-x-7 gap-y-3"
          >
            {t.about.stat.split('·').map((chunk, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: EASE_EXPO }}
                className="font-mono uppercase tracking-wider2 text-[12px] md:text-[13px] text-paper"
              >
                {chunk.trim()}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
