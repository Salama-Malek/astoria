import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useT, useLang } from '@/lib/i18n';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import Wordmark from '@/components/chrome/Wordmark';
import { EASE_EXPO, fadeUp, stagger } from '@/lib/motion';
import { CMYK } from '@/lib/cmyk';

const YANDEX_URL = 'https://yandex.com/maps/-/CPcUiZNP';

const ICONS = {
  pin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M21 12c0 4.4-4 8-9 8-1.4 0-2.7-.3-3.9-.8L3 21l1.2-4.2C3.4 15.3 3 13.7 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
    </svg>
  ),
  mail: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  ),
  clock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2.2" />
    </svg>
  ),
} as const;

function InfoCard({
  label,
  value,
  icon,
  accent,
  href,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: 'c' | 'm' | 'y';
  href?: string;
}) {
  const hex = accent === 'c' ? CMYK.cyan : accent === 'm' ? CMYK.magenta : CMYK.yellow;
  const inner = (
    <div className="relative glass rounded-sm p-5 md:p-6 h-full overflow-hidden transition-transform duration-700 ease-expo group-hover:-translate-y-1">
      <div className="flex items-center gap-3" style={{ color: hex }}>
        <span style={{ filter: `drop-shadow(0 0 8px ${hex})` }}>{icon}</span>
        <span className="font-mono uppercase text-[10.5px] tracking-[0.22em]">{label}</span>
      </div>
      <p className="mt-4 text-paper font-serif font-light text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.3]">
        {value}
      </p>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ boxShadow: `0 24px 60px ${hex}24, inset 0 0 0 1px ${hex}40` }}
      />
    </div>
  );
  return (
    <motion.div variants={fadeUp} className="group">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}

export default function Contact() {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  // Final logo fade-in tied to end of section
  const logoOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0.7, 0.95], [0.9, 1]);

  return (
    <section ref={ref} id="contact" className="relative" aria-labelledby="contact-heading">
      {/* Main contact block */}
      <div className="container-x chapter pb-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <ChapterLabel
            ru={t.contact.chapterLabel}
            en={t.contact.chapterLabel}
            lang={lang}
            accent="y"
          />
          <p className="mono-label text-paper-mute">{t.contact.sub}</p>
        </div>

        <motion.h2
          id="contact-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15%' }}
          className="display text-paper mt-8 text-center text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.95]"
        >
          {t.contact.heading.slice(0, -1)}
          <span className="italic font-normal text-cmyk-y text-glow-y">
            {t.contact.heading.slice(-1)}
          </span>
        </motion.h2>

        {/* Info cards + map */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-8">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start"
          >
            <InfoCard
              label={t.contact.address.label}
              value={t.contact.address.value}
              icon={ICONS.pin}
              accent="c"
              href={YANDEX_URL}
            />
            <InfoCard
              label={t.contact.phone.label}
              value={t.contact.phone.value}
              icon={ICONS.chat}
              accent="m"
              href="https://t.me/ASTORIA1000"
            />
            <InfoCard
              label={t.contact.email.label}
              value={t.contact.email.value}
              icon={ICONS.mail}
              accent="y"
              href="mailto:astoria_323@mail.ru"
            />
            <InfoCard
              label={t.contact.hours.label}
              value={t.contact.hours.value}
              icon={ICONS.clock}
              accent="c"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.0, ease: EASE_EXPO }}
            className="relative overflow-hidden rounded-sm border border-paper-faint aspect-[4/3] lg:aspect-auto lg:min-h-[480px]"
          >
            <iframe
              src="https://yandex.com/map-widget/v1/?ll=37.617635%2C55.755814&z=11&pt=37.617635,55.755814,pm2rdm"
              className="absolute inset-0 h-full w-full"
              style={{
                filter: 'invert(0.92) hue-rotate(180deg) contrast(0.92) saturate(0.7)',
                border: 0,
              }}
              loading="lazy"
              title="Astoria on Yandex Maps"
            />
            {/* CMYK pin overlay (visual marker on top of inverted map) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
              aria-hidden="true"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: CMYK.yellow, boxShadow: `0 0 18px ${CMYK.yellow}, 0 0 36px ${CMYK.yellow}80` }}
              />
            </div>
            {/* Map overlay frame */}
            <div className="pointer-events-none absolute inset-0">
              {(
                [
                  ['top-0 left-0 border-l border-t', CMYK.yellow],
                  ['top-0 right-0 border-r border-t', CMYK.yellow],
                  ['bottom-0 left-0 border-l border-b', CMYK.yellow],
                  ['bottom-0 right-0 border-r border-b', CMYK.yellow],
                ] as const
              ).map(([pos, c], i) => (
                <span
                  key={i}
                  className={`absolute ${pos} h-5 w-5`}
                  style={{ borderColor: c, boxShadow: `0 0 12px ${c}` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <motion.a
            href={YANDEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="group inline-flex items-center gap-3 bg-cmyk-y text-void font-mono font-medium uppercase text-[12px] tracking-[0.22em] px-7 py-3.5 rounded-full hover:shadow-glow-y transition-shadow"
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-void" />
            {t.contact.cta}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </div>
      </div>

      {/* Final reveal — fade to black with logo emerging */}
      <div className="relative mt-24 mb-8 min-h-[50vh] flex flex-col items-center justify-center">
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale }}
          className="flex flex-col items-center"
        >
          <Wordmark size={64} />
          {/* CMYK swirls below the wordmark, lit one by one */}
          <div className="mt-6 flex gap-3" aria-hidden="true">
            {([CMYK.cyan, CMYK.magenta, CMYK.yellow] as const).map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.2 + i * 0.25 }}
                className="block h-2 w-12 rounded-full"
                style={{ background: c, boxShadow: `0 0 16px ${c}, 0 0 36px ${c}40` }}
              />
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: EASE_EXPO, delay: 2.0 }}
            className="mt-10 font-mono uppercase text-[12px] tracking-wider3 text-paper-dim"
          >
            {t.contact.est}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
