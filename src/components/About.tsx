import { useLang } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionEyebrow from './SectionEyebrow';

export default function About() {
  const { t } = useLang();
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const statsRef = useScrollReveal();

  return (
    <section
      id="about"
      className="py-28 md:py-32 px-6 md:px-10 bg-bg-soft border-t border-ink/8"
    >
      <div ref={headRef} className="reveal max-w-[1400px] mx-auto mb-16">
        <SectionEyebrow num="03" label={{ ru: 'О нас', en: 'About' }} />
        <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.025em] text-ink">
          {t({
            ru: (
              <>
                Маленькая <em className="not-italic italic font-normal text-gradient-cm">мастерская</em>
              </>
            ),
            en: (
              <>
                A small <em className="not-italic italic font-normal text-gradient-cm">workshop</em>
              </>
            ),
          })}
        </h2>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center mb-20"
      >
        {/* Text */}
        <div>
          <h3 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-medium leading-[1.15] text-ink mb-6 tracking-[-0.02em]">
            {t({
              ru: (
                <>
                  Печать — это не просто кнопка{' '}
                  <em className="not-italic italic font-normal text-cmyk-m">«ОК».</em>
                </>
              ),
              en: (
                <>
                  Printing isn't just clicking{' '}
                  <em className="not-italic italic font-normal text-cmyk-m">"OK".</em>
                </>
              ),
            })}
          </h3>

          <p className="text-ink-soft text-[1.05rem] leading-[1.7] mb-5">
            {t({
              ru: (
                <>
                  Когда вам нужно сдать <strong className="text-ink font-semibold">дипломную работу завтра утром</strong> —
                  у нас уже горит свет. Когда вам нужна{' '}
                  <strong className="text-ink font-semibold">фотография на паспорт</strong> прямо сейчас — у нас всё готово.
                </>
              ),
              en: (
                <>
                  When your <strong className="text-ink font-semibold">dissertation is due tomorrow morning</strong> —
                  our lights are already on. When you need a{' '}
                  <strong className="text-ink font-semibold">passport photo</strong> right now — we're ready.
                </>
              ),
            })}
          </p>

          <p className="text-ink-soft text-[1.05rem] leading-[1.7]">
            {t({
              ru: 'Astoria — это место, где мы делаем работу так, как сделали бы её для себя. Чисто. Точно. Без лишних слов и неприятных неожиданностей.',
              en: 'Astoria is where we do the work the way we\'d do it for ourselves. Clean. Precise. Without small talk or unpleasant surprises.',
            })}
          </p>
        </div>

        {/* Monogram card */}
        <div className="aspect-[4/5] bg-bg-card rounded-3xl p-10 shadow-warm-lg border border-ink/8 relative overflow-hidden flex flex-col justify-between">
          {/* Color blobs */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(230,41,107,0.08), transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(45,180,216,0.08), transparent 40%)
              `,
            }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-ink-mute">
              CMYK · 100%
            </span>
            <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-ink-mute">
              № 01
            </span>
          </div>

          <div
            className="relative z-10 font-serif italic font-medium text-[14rem] leading-[0.85] text-center text-gradient-gold"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(201,162,39,0.2))' }}
          >
            A
          </div>

          <div className="relative z-10 flex justify-between items-end">
            <span className="font-serif italic text-ink-mute text-[1.1rem]">est. 2010</span>
            <div className="flex gap-1.5">
              <div className="w-[22px] h-[22px] rounded-md bg-cmyk-c shadow-warm" />
              <div className="w-[22px] h-[22px] rounded-md bg-cmyk-m shadow-warm" />
              <div className="w-[22px] h-[22px] rounded-md bg-cmyk-y shadow-warm" />
              <div className="w-[22px] h-[22px] rounded-md bg-cmyk-k shadow-warm" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="reveal max-w-[1400px] mx-auto grid md:grid-cols-3 gap-5">
        {[
          { num: '14+', color: 'text-cmyk-m', label: { ru: 'лет работы', en: 'years of craft' } },
          { num: '9', color: 'text-cmyk-c', label: { ru: 'видов услуг', en: 'services' } },
          { num: '1000+', color: 'text-cmyk-y', label: { ru: 'довольных клиентов', en: 'happy clients' } },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-bg-card p-10 rounded-[20px] border border-ink/8 shadow-warm text-center transition-all duration-400 hover:-translate-y-1 hover:shadow-warm-md"
          >
            <div className={`font-serif text-[3.5rem] font-medium leading-none mb-2 ${stat.color}`}>
              {stat.num}
            </div>
            <div className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-ink-mute">
              {t(stat.label)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
