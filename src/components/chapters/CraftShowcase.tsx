import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { useT, useLang } from '@/lib/i18n';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import { CMYK } from '@/lib/cmyk';
import { EASE_EXPO } from '@/lib/motion';

const STAGE_COUNT = 5;
// Visible color per stage label (key stays in paper for readability)
const STAGE_COLORS = [CMYK.paper, CMYK.cyan, CMYK.magenta, CMYK.yellow, CMYK.paper];
const STAGE_RAW = [CMYK.paper, CMYK.cyan, CMYK.magenta, CMYK.yellow, CMYK.key];

export default function CraftShowcase() {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  // Scroll spans the whole tall container. Sticky child = 100vh.
  // Container height = 380vh → 280vh of "pinned scroll" = 56vh per stage.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Map progress so stage 4 locks in at 0.85 instead of 1.0 — that
    // removes the dead air at the bottom of the section.
    const adjusted = Math.min(v / 0.92, 1);
    const idx = Math.min(STAGE_COUNT - 1, Math.floor(adjusted * STAGE_COUNT));
    setStage(idx);
  });

  // Bound visual transforms to the same 0-0.92 window
  const headTop = useTransform(scrollYProgress, [0, 0.32], ['8%', '88%']);
  const cmykOpacity = useTransform(scrollYProgress, [0.18, 0.36], [0, 1]);
  const cmykIntensity = useTransform(scrollYProgress, [0.18, 0.42, 0.52], [0, 1, 1]);
  const settledOpacity = useTransform(scrollYProgress, [0.42, 0.56], [0, 1]);
  const trimOpacity = useTransform(scrollYProgress, [0.56, 0.7], [0, 1]);
  const trimScale = useTransform(scrollYProgress, [0.56, 0.7], [1.12, 1]);
  const bindOpacity = useTransform(scrollYProgress, [0.76, 0.88], [0, 1]);
  const paperLift = useTransform(scrollYProgress, [0.7, 0.92], ['0%', '-3%']);

  return (
    <section ref={ref} id="craft" className="relative" aria-labelledby="craft-heading">
      <div className="relative" style={{ height: '380vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* atmospheric backdrop */}
          <div
            className="absolute inset-0 -z-10"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(240,176,32,0.05), transparent 60%)',
            }}
          />

          <div className="container-x h-full grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-center">
            {/* LEFT — narrative panel */}
            <div className="relative flex flex-col justify-center py-16">
              <ChapterLabel
                ru={t.craft.chapterLabel}
                en={t.craft.chapterLabel}
                lang={lang}
                accent="y"
              />

              <h2
                id="craft-heading"
                className="display text-paper mt-5 text-[clamp(2rem,4.4vw,3.8rem)]"
              >
                {t.craft.heading}{' '}
                <span className="italic font-normal text-cmyk-y text-glow-y">
                  {t.craft.headingItalic}
                </span>
              </h2>

              <div className="relative mt-8 h-[150px]">
                {t.craft.stages.map((s, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: stage === i ? 1 : 0, y: stage === i ? 0 : 14 }}
                    transition={{ duration: 0.5, ease: EASE_EXPO }}
                    className="absolute inset-0"
                    aria-hidden={stage !== i}
                  >
                    <p className="mono-label" style={{ color: STAGE_COLORS[i] }}>
                      {String(i + 1).padStart(2, '0')} / 05 · {s.name.toUpperCase()}
                    </p>
                    <p className="mt-4 font-serif font-light text-[clamp(1.25rem,1.8vw,1.75rem)] text-paper leading-[1.25] tracking-tight max-w-[28ch]">
                      {s.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* progress segments */}
              <div className="mt-10 grid grid-cols-5 gap-2.5">
                {t.craft.stages.map((_, i) => (
                  <div
                    key={i}
                    className="h-px origin-left transition-all duration-500"
                    style={{
                      background: i <= stage ? STAGE_COLORS[i] : 'rgba(245,240,227,0.12)',
                      boxShadow: i === stage ? `0 0 12px ${STAGE_RAW[i]}` : 'none',
                      transform: i === stage ? 'scaleY(3)' : 'scaleY(1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — printer scene */}
            <div className="relative h-[55vh] lg:h-[78vh] flex items-center justify-center">
              <motion.div
                style={{ y: paperLift }}
                className="relative w-[clamp(280px,30vw,420px)] aspect-[3/4] rounded-md"
              >
                {/* Printer chassis */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background:
                      'linear-gradient(180deg, #232529 0%, #15161a 60%, #0d0e11 100%)',
                    boxShadow:
                      '0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,240,227,0.04) inset',
                  }}
                />
                {/* Top lip */}
                <div className="absolute -top-2 left-[-3%] right-[-3%] h-3 bg-[#2a2c33] rounded-t-sm" />

                {/* Bed window */}
                <div className="absolute inset-x-5 top-10 bottom-20 bg-[#06070a] rounded-sm overflow-hidden border border-paper-faint">
                  {/* Print head bar */}
                  <motion.div
                    style={{ top: headTop }}
                    className="absolute left-3 right-3 h-1.5 rounded-sm bg-paper-faint"
                  >
                    <div
                      className="absolute -top-1 left-[28%] h-2 w-2 rounded-full"
                      style={{ background: CMYK.cyan, boxShadow: `0 0 10px ${CMYK.cyan}` }}
                    />
                    <div
                      className="absolute -top-1 left-[48%] h-2 w-2 rounded-full"
                      style={{ background: CMYK.magenta, boxShadow: `0 0 10px ${CMYK.magenta}` }}
                    />
                    <div
                      className="absolute -top-1 left-[68%] h-2 w-2 rounded-full"
                      style={{ background: CMYK.yellow, boxShadow: `0 0 10px ${CMYK.yellow}` }}
                    />
                  </motion.div>

                  {/* Paper sheet */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[70%] h-[82%] bg-paper rounded-[2px] shadow-[0_8px_20px_rgba(0,0,0,0.45)] overflow-hidden">
                      {/* Stage 2 — CMYK pass lines */}
                      <motion.div style={{ opacity: cmykOpacity }} className="absolute inset-0 mix-blend-multiply">
                        {[CMYK.cyan, CMYK.magenta, CMYK.yellow].map((c, j) => (
                          <motion.div
                            key={c}
                            className="absolute"
                            style={{
                              top: `${22 + j * 14}%`,
                              left: '12%',
                              right: '12%',
                              height: '2px',
                              background: c,
                              opacity: 0.9,
                              transform: `translateX(${j * 3}px)`,
                            }}
                          />
                        ))}
                      </motion.div>
                      {/* Stage 3 — settled image */}
                      <motion.div
                        style={{ opacity: settledOpacity }}
                        className="absolute inset-[12%] rounded-sm"
                      >
                        <motion.div
                          style={{ opacity: cmykIntensity }}
                          className="absolute inset-0 rounded-sm"
                          aria-hidden="true"
                        >
                          <div
                            className="absolute inset-0 rounded-sm mix-blend-multiply"
                            style={{
                              background: `
                                radial-gradient(ellipse 60% 40% at 30% 30%, ${CMYK.cyan}aa, transparent 60%),
                                radial-gradient(ellipse 50% 50% at 70% 35%, ${CMYK.magenta}aa, transparent 60%),
                                radial-gradient(ellipse 70% 50% at 50% 75%, ${CMYK.yellow}aa, transparent 60%)
                              `,
                            }}
                          />
                          {/* simulated text lines */}
                          {[18, 30, 42, 60, 72].map((y, k) => (
                            <div
                              key={k}
                              className="absolute left-[18%] h-[2px] bg-void/55 rounded-full"
                              style={{ top: `${y}%`, width: `${56 + k * 6}%` }}
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                      {/* Stage 4 — trim crop-marks */}
                      <motion.div style={{ opacity: trimOpacity, scale: trimScale }} className="absolute inset-0">
                        {(
                          [
                            ['top-1.5 left-1.5', 'border-l-2 border-t-2'],
                            ['top-1.5 right-1.5', 'border-r-2 border-t-2'],
                            ['bottom-1.5 left-1.5', 'border-l-2 border-b-2'],
                            ['bottom-1.5 right-1.5', 'border-r-2 border-b-2'],
                          ] as const
                        ).map(([pos, b], k) => (
                          <span
                            key={k}
                            className={`absolute ${pos} ${b} h-4 w-4`}
                            style={{ borderColor: 'rgba(10,10,12,0.85)' }}
                          />
                        ))}
                      </motion.div>
                      {/* Stage 5 — bind spine */}
                      <motion.div
                        style={{ opacity: bindOpacity }}
                        className="absolute left-0 top-0 bottom-0 w-[14px]"
                      >
                        <div className="h-full w-full bg-[#7a1130]" />
                        <div className="absolute right-[-2px] inset-y-0 w-[2px] bg-void/45" />
                        {/* fake gold-stamp title */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center font-mono text-[7px] tracking-[0.3em] text-[#e6b938]/80 whitespace-nowrap">
                          ASTORIA
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Front panel */}
                <div className="absolute bottom-5 left-5 right-5 h-12 rounded-sm bg-[#0c0d10] border border-paper-faint flex items-center px-4 justify-between">
                  <span className="mono-label" style={{ color: STAGE_COLORS[stage] }}>
                    STAGE {String(stage + 1).padStart(2, '0')}
                  </span>
                  <div className="flex gap-1.5">
                    {STAGE_RAW.map((c, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: c,
                          boxShadow: i === stage ? `0 0 10px ${c}` : 'none',
                          opacity: i === stage ? 1 : 0.28,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Output slot */}
                <div className="absolute -bottom-1 left-[22%] right-[22%] h-1 rounded-sm bg-black" />
              </motion.div>

              {/* corner crosshairs around the scene */}
              {(
                [
                  ['top-0 left-0 border-l border-t', 'top-left'],
                  ['top-0 right-0 border-r border-t', 'top-right'],
                  ['bottom-0 left-0 border-l border-b', 'bottom-left'],
                  ['bottom-0 right-0 border-r border-b', 'bottom-right'],
                ] as const
              ).map(([pos], k) => (
                <span
                  key={k}
                  className={`pointer-events-none absolute ${pos} h-5 w-5 border-paper-faint`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
