import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { useT, useLang } from '@/lib/i18n';
import ChapterLabel from '@/components/chrome/ChapterLabel';
import { CMYK } from '@/lib/cmyk';
import { EASE_EXPO } from '@/lib/motion';

const STAGE_COLORS = [CMYK.paper, CMYK.cyan, CMYK.magenta, CMYK.yellow, CMYK.key];

export default function CraftShowcase() {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(4, Math.floor(v * 5));
    setStage(idx);
  });

  const paperX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const paperRot = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const printHead = useTransform(scrollYProgress, [0, 0.4, 0.5], ['10%', '90%', '90%']);
  const cmykOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.5], [0, 1, 1]);
  const trimOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const bindOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);

  return (
    <section ref={ref} id="craft" className="relative" aria-labelledby="craft-heading">
      {/* The pinned sticky stage */}
      <div className="relative" style={{ height: '500vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 -z-10"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(240,176,32,0.05), transparent 60%)',
            }}
          />

          <div className="container-x h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-center">
            {/* LEFT: text panel — stages swap */}
            <div className="relative h-full flex flex-col justify-center py-20">
              <ChapterLabel
                ru={t.craft.chapterLabel}
                en={t.craft.chapterLabel}
                lang={lang}
                accent="y"
              />
              <h2
                id="craft-heading"
                className="display text-paper mt-6 text-[clamp(2rem,4.6vw,4.2rem)]"
              >
                {t.craft.heading}{' '}
                <span className="italic font-normal text-cmyk-y text-glow-y">
                  {t.craft.headingItalic}
                </span>
              </h2>

              <div className="relative mt-10 h-[170px]">
                {t.craft.stages.map((s, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: stage === i ? 1 : 0,
                      y: stage === i ? 0 : 16,
                    }}
                    transition={{ duration: 0.5, ease: EASE_EXPO }}
                    className="absolute inset-0"
                    aria-hidden={stage !== i}
                  >
                    <p
                      className="mono-label"
                      style={{ color: STAGE_COLORS[i] === CMYK.key ? CMYK.paper : STAGE_COLORS[i] }}
                    >
                      {String(i + 1).padStart(2, '0')} / 05 · {s.name.toUpperCase()}
                    </p>
                    <p className="mt-4 font-serif font-light text-[clamp(1.3rem,2vw,1.9rem)] text-paper leading-[1.25] tracking-tight">
                      {s.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-10 flex items-center gap-3">
                {t.craft.stages.map((_, i) => (
                  <div
                    key={i}
                    className="h-px flex-1 origin-left transition-all duration-500"
                    style={{
                      background: i <= stage ? STAGE_COLORS[i] === CMYK.key ? CMYK.paper : STAGE_COLORS[i] : 'rgba(245,240,227,0.12)',
                      boxShadow: i === stage ? `0 0 14px ${STAGE_COLORS[i]}` : 'none',
                      transform: i === stage ? 'scaleY(2.5)' : 'scaleY(1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: visual stage */}
            <div className="relative h-[60vh] lg:h-full flex items-center justify-center">
              {/* Printer body */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="relative w-[clamp(280px,32vw,440px)] h-[clamp(340px,40vw,520px)] rounded-md"
                  style={{
                    background: 'linear-gradient(180deg, #1d1f24, #0f1014)',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(245,240,227,0.04)',
                  }}
                >
                  {/* Top lid */}
                  <div className="absolute -top-3 left-[-4%] right-[-4%] h-4 bg-[#2a2c33] rounded-sm" />
                  {/* Print bed area */}
                  <div className="absolute inset-x-6 top-12 bottom-24 bg-[#0a0a0c] rounded-sm overflow-hidden">
                    {/* Print head */}
                    <motion.div
                      style={{ top: printHead }}
                      className="absolute left-2 right-2 h-2 rounded-sm"
                    >
                      <div className="h-full w-full bg-paper-faint relative">
                        <div
                          className="absolute left-1/2 -translate-x-1/2 -top-1 h-1.5 w-1.5 rounded-full"
                          style={{ background: CMYK.cyan, boxShadow: `0 0 8px ${CMYK.cyan}` }}
                        />
                        <div
                          className="absolute left-[40%] -top-1 h-1.5 w-1.5 rounded-full"
                          style={{ background: CMYK.magenta, boxShadow: `0 0 8px ${CMYK.magenta}` }}
                        />
                        <div
                          className="absolute left-[60%] -top-1 h-1.5 w-1.5 rounded-full"
                          style={{ background: CMYK.yellow, boxShadow: `0 0 8px ${CMYK.yellow}` }}
                        />
                      </div>
                    </motion.div>

                    {/* Paper inside */}
                    <motion.div
                      style={{ x: paperX, rotate: paperRot }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] bg-paper rounded-[2px] shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                    >
                      {/* CMYK passes */}
                      <motion.div
                        style={{ opacity: cmykOpacity }}
                        className="absolute inset-0 mix-blend-multiply"
                      >
                        {[CMYK.cyan, CMYK.magenta, CMYK.yellow].map((c, j) => (
                          <div
                            key={c}
                            className="absolute"
                            style={{
                              top: `${20 + j * 18}%`,
                              left: '10%',
                              right: '10%',
                              height: '2px',
                              background: c,
                              transform: `translateX(${j * 2}px)`,
                              opacity: 0.85,
                            }}
                          />
                        ))}
                        <div
                          className="absolute left-[14%] right-[14%] bottom-[20%] h-[70%] rounded-sm"
                          style={{
                            background: `linear-gradient(135deg, ${CMYK.cyan}55, ${CMYK.magenta}55, ${CMYK.yellow}55)`,
                            mixBlendMode: 'multiply',
                          }}
                        />
                      </motion.div>
                      {/* Trim crop marks */}
                      <motion.div style={{ opacity: trimOpacity }} className="absolute inset-0">
                        {[
                          ['top-1 left-1', 'border-l border-t'],
                          ['top-1 right-1', 'border-r border-t'],
                          ['bottom-1 left-1', 'border-l border-b'],
                          ['bottom-1 right-1', 'border-r border-b'],
                        ].map(([pos, b], k) => (
                          <span
                            key={k}
                            className={`absolute ${pos} ${b} border-void/70 h-4 w-4`}
                          />
                        ))}
                      </motion.div>
                      {/* Binding spine */}
                      <motion.div
                        style={{ opacity: bindOpacity }}
                        className="absolute left-0 top-0 bottom-0 w-[10px]"
                      >
                        <div className="h-full w-full bg-[#8a0f33]" />
                        <div className="absolute right-[-2px] top-0 bottom-0 w-[2px] bg-void/50" />
                      </motion.div>
                    </motion.div>
                  </div>
                  {/* Front panel */}
                  <div className="absolute bottom-6 left-6 right-6 h-12 rounded-sm bg-[#0f1014] border border-paper-faint flex items-center px-4 justify-between">
                    <span
                      className="mono-label"
                      style={{ color: STAGE_COLORS[stage] === CMYK.key ? CMYK.paper : STAGE_COLORS[stage] }}
                    >
                      STAGE {String(stage + 1).padStart(2, '0')}
                    </span>
                    <div className="flex gap-1.5">
                      {STAGE_COLORS.map((c, i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: c,
                            boxShadow: i === stage ? `0 0 10px ${c}` : 'none',
                            opacity: i === stage ? 1 : 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Output slot */}
                  <div className="absolute -bottom-1 left-[20%] right-[20%] h-1 bg-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
