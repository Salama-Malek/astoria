import { Star } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { REVIEWS, ACCENT_COLORS, CONTACT } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionEyebrow from './SectionEyebrow';

const ROTATIONS = ['-0.8deg', '0.5deg', '-0.4deg', '0.8deg', '-0.6deg', '0.4deg'];

export default function Reviews() {
  const { t } = useLang();
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="reviews" className="py-28 md:py-32 px-6 md:px-10">
      <div
        ref={headRef}
        className="reveal max-w-[1400px] mx-auto mb-16 grid lg:grid-cols-2 gap-12 items-end"
      >
        <div>
          <SectionEyebrow num="04" label={{ ru: 'Отзывы', en: 'Reviews' }} />
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.025em] text-ink">
            {t({
              ru: (
                <>
                  Что говорят <em className="not-italic italic font-normal text-gradient-cm">клиенты</em>
                </>
              ),
              en: (
                <>
                  What clients <em className="not-italic italic font-normal text-gradient-cm">say</em>
                </>
              ),
            })}
          </h2>
        </div>
        <p className="text-ink-soft text-[1.1rem] leading-[1.65] max-w-[560px] lg:justify-self-end">
          {t({
            ru: 'Не наши слова — слова людей, которые приходят к нам годами. И возвращаются.',
            en: "Not our words — the words of people who've come for years. And kept coming back.",
          })}
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-[1400px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {REVIEWS.map((review, i) => {
          const color = ACCENT_COLORS[review.accent];
          return (
            <div
              key={i}
              className="bg-bg-card p-8 rounded-[20px] shadow-warm border border-ink/8 relative transition-all duration-400 hover:!rotate-0 hover:-translate-y-1 hover:shadow-warm-lg hover:z-10"
              style={{ transform: `rotate(${ROTATIONS[i]})` }}
            >
              <div
                className="font-serif text-[4rem] leading-[0.5] mb-4 opacity-30"
                style={{ color }}
              >
                &ldquo;
              </div>

              <p className="text-ink-soft text-[0.95rem] leading-[1.6] mb-6 min-h-[5rem]">
                {t(review.text)}
              </p>

              <div className="flex justify-between items-center border-t border-ink/8 pt-4">
                <span className="font-serif font-semibold text-ink text-[0.95rem]">
                  {t(review.name)}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} size={14} fill={color} color={color} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <a
          href={CONTACT.yandexMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-[0.8rem] tracking-[0.1em] text-ink border-b border-ink/15 pb-1 hover:text-cmyk-m hover:border-cmyk-m transition-colors duration-300"
        >
          {t({ ru: 'Все отзывы на Яндекс.Картах →', en: 'All reviews on Yandex Maps →' })}
        </a>
      </div>
    </section>
  );
}
