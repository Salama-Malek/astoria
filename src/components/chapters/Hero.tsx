import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { useT, useLang } from '@/lib/i18n';
import { useUIStore, type DeviceKey } from '@/state/useUIStore';
import { deviceColor, textGlowFor } from '@/lib/cmyk';
import { EASE_EXPO } from '@/lib/motion';
import ChapterLabel from '@/components/chrome/ChapterLabel';

const HeroDevice = lazy(() => import('@/components/three/HeroDevice'));

const REVEAL_BASE = 2.4;

const ACCENT_MAP: Record<DeviceKey, 'c' | 'm' | 'y'> = {
  printer: 'c',
  press: 'm',
  laminator: 'y',
};

function Headline() {
  const t = useT();
  const activeDevice = useUIStore((s) => s.activeDevice);
  const accent = ACCENT_MAP[activeDevice];

  return (
    <h1
      className="display text-paper text-[clamp(2.6rem,8.5vw,8rem)] leading-[0.94]"
      style={{ fontVariationSettings: "'opsz' 144" }}
    >
      <span className="block overflow-hidden">
        <motion.span
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.05, ease: EASE_EXPO, delay: REVEAL_BASE + 0.1 }}
        >
          {t.hero.h1Pre}{' '}
          <span
            className={`italic font-normal ${textGlowFor(accent)} transition-colors duration-700`}
            style={{ color: deviceColor[activeDevice] }}
          >
            {t.hero.h1Italic}
          </span>
          {t.hero.h1Post}
        </motion.span>
      </span>
    </h1>
  );
}

function DeviceSwitcher() {
  const t = useT();
  const active = useUIStore((s) => s.activeDevice);
  const set = useUIStore((s) => s.setActiveDevice);
  const lang = useLang();

  const items: Array<{ key: DeviceKey; accent: 'c' | 'm' | 'y' }> = [
    { key: 'printer', accent: 'c' },
    { key: 'press', accent: 'm' },
    { key: 'laminator', accent: 'y' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_EXPO, delay: REVEAL_BASE + 1.0 }}
      className="glass rounded-full p-1 flex items-center gap-0.5"
      role="tablist"
      aria-label="Device showcase"
    >
      {items.map((it) => {
        const isActive = active === it.key;
        const dot = it.accent === 'c' ? 'bg-cmyk-c' : it.accent === 'm' ? 'bg-cmyk-m' : 'bg-cmyk-y';
        return (
          <button
            key={it.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => set(it.key)}
            className={`relative px-4 py-2 rounded-full font-mono uppercase text-[10.5px] tracking-[0.22em] flex items-center gap-2 transition-colors ${
              isActive ? 'text-paper' : 'text-paper-mute hover:text-paper'
            }`}
            lang={lang}
          >
            {isActive && (
              <motion.span
                layoutId="device-pill"
                className="absolute inset-0 rounded-full bg-paper-faint"
                transition={{ duration: 0.5, ease: EASE_EXPO }}
              />
            )}
            <span className={`relative z-10 inline-block h-[6px] w-[6px] rounded-full ${dot}`} />
            <span className="relative z-10 whitespace-nowrap">{t.hero.devices[it.key]}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default function Hero() {
  const t = useT();
  const lang = useLang();
  const activeDevice = useUIStore((s) => s.activeDevice);
  const accent = ACCENT_MAP[activeDevice];

  return (
    <section id="hero" className="relative h-[100svh] min-h-[680px] overflow-hidden">
      {/* Spotlight backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_EXPO, delay: REVEAL_BASE - 0.6 }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 14%, rgba(245,240,227,0.07) 0%, rgba(245,240,227,0.025) 30%, transparent 60%)',
        }}
      />

      {/* 3D canvas — fills the whole hero but visually anchored to lower half via camera framing */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE_EXPO, delay: REVEAL_BASE + 0.45 }}
        className="absolute inset-0 -z-10"
      >
        <Suspense fallback={null}>
          <HeroDevice />
        </Suspense>
      </motion.div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 55%, transparent 50%, rgba(10,10,12,0.72) 100%)',
        }}
      />

      {/* Flex column over the canvas */}
      <div className="relative h-full container-x flex flex-col pt-[88px] pb-8">
        {/* Top: chapter label */}
        <ChapterLabel
          ru={t.hero.chapterLabel}
          en={t.hero.chapterLabel}
          lang={lang}
          accent={accent}
        />

        {/* Headline + sub */}
        <div className="mt-8 md:mt-10 max-w-[1200px] mx-auto text-center pointer-events-none">
          <Headline />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: REVEAL_BASE + 0.85 }}
            className="mt-5 font-serif italic font-normal text-paper-dim text-[clamp(0.95rem,1.3vw,1.2rem)]"
          >
            {t.hero.sub}
          </motion.p>
        </div>

        {/* Spacer that lets the 3D scene shine */}
        <div className="flex-1" />

        {/* Bottom: switcher + scroll cue */}
        <div className="flex flex-col items-center gap-6">
          <DeviceSwitcher />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: REVEAL_BASE + 1.2 }}
            className="flex flex-col items-center gap-2.5"
          >
            <span className="mono-label">{t.hero.scroll}</span>
            <span className="block h-8 w-px bg-gradient-to-b from-paper-mute to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
