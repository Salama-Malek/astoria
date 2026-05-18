import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { useT, useLang } from '@/lib/i18n';
import { useUIStore, type DeviceKey } from '@/state/useUIStore';
import { deviceColor, textGlowFor } from '@/lib/cmyk';
import { EASE_EXPO } from '@/lib/motion';
import ChapterLabel from '@/components/chrome/ChapterLabel';

const HeroDevice = lazy(() => import('@/components/three/HeroDevice'));

const REVEAL_BASE = 2.4; // matches loader exit

function Headline() {
  const t = useT();
  const activeDevice = useUIStore((s) => s.activeDevice);
  const accentMap: Record<DeviceKey, 'c' | 'm' | 'y'> = {
    printer: 'c',
    press: 'm',
    laminator: 'y',
  };
  const accent = accentMap[activeDevice];

  return (
    <h1 className="display text-paper text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.92]">
      <span className="block overflow-hidden">
        <motion.span
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.05, ease: EASE_EXPO, delay: REVEAL_BASE + 0.1 }}
        >
          {t.hero.h1Pre}{' '}
          <span className={`italic font-normal ${textGlowFor(accent)}`} style={{ color: deviceColor[activeDevice] }}>
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
      className="glass rounded-full p-1.5 flex items-center gap-1"
      role="tablist"
      aria-label="Device showcase"
    >
      {items.map((it) => {
        const isActive = active === it.key;
        const dot =
          it.accent === 'c' ? 'bg-cmyk-c' : it.accent === 'm' ? 'bg-cmyk-m' : 'bg-cmyk-y';
        return (
          <button
            key={it.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => set(it.key)}
            className={`relative px-4 py-2 rounded-full font-mono uppercase text-[10.5px] tracking-wider2 flex items-center gap-2 transition-colors ${
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
            <span className="relative z-10">{t.hero.devices[it.key]}</span>
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

  return (
    <section id="hero" className="relative h-[100svh] min-h-[720px] overflow-hidden">
      {/* Spotlight gradient backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_EXPO, delay: REVEAL_BASE - 0.6 }}
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 18%, rgba(245,240,227,0.08) 0%, rgba(245,240,227,0.03) 30%, transparent 60%)',
        }}
      />

      {/* 3D canvas — fills the lower half */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE_EXPO, delay: REVEAL_BASE + 0.45 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <HeroDevice />
        </Suspense>
      </motion.div>

      {/* Top-left chapter label */}
      <div className="absolute top-[92px] left-0 right-0 z-10">
        <div className="container-x">
          <ChapterLabel
            ru={t.hero.chapterLabel}
            en={t.hero.chapterLabel}
            lang={lang}
            accent={activeDevice === 'printer' ? 'c' : activeDevice === 'press' ? 'm' : 'y'}
          />
        </div>
      </div>

      {/* Headline center-top */}
      <div className="absolute inset-x-0 top-[18%] z-10 pointer-events-none">
        <div className="container-x text-center">
          <Headline />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: REVEAL_BASE + 0.85 }}
            className="mt-6 font-serif italic text-paper-dim text-[clamp(0.95rem,1.4vw,1.25rem)]"
          >
            {t.hero.sub}
          </motion.p>
        </div>
      </div>

      {/* Bottom switcher + scroll cue */}
      <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-8">
        <DeviceSwitcher />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_EXPO, delay: REVEAL_BASE + 1.2 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="mono-label text-paper-mute">{t.hero.scroll}</span>
          <span className="block h-10 w-px bg-gradient-to-b from-paper-mute to-transparent" />
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(10,10,12,0.7) 100%)',
        }}
      />
    </section>
  );
}
