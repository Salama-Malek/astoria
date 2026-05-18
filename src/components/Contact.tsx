import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { CONTACT } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: { ru: 'Адрес', en: 'Address' },
    value: { ru: 'Указан на Яндекс.Картах ↓', en: 'See Yandex Maps below ↓' },
    color: '#e6296b',
  },
  {
    icon: Phone,
    label: { ru: 'Телефон', en: 'Phone' },
    value: { ru: '— заполнить —', en: '— to be filled —' },
    color: '#2db4d8',
    muted: true,
  },
  {
    icon: Clock,
    label: { ru: 'Часы работы', en: 'Hours' },
    value: CONTACT.hours,
    color: '#f0b020',
  },
] as const;

export default function Contact() {
  const { t } = useLang();
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="contact" className="py-28 md:py-32 px-6 md:px-10 bg-ink text-bg">
      <div
        ref={headRef}
        className="reveal max-w-[1400px] mx-auto mb-16 grid lg:grid-cols-2 gap-12 items-end"
      >
        <div>
          <div className="inline-flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.25em] uppercase text-cmyk-y">
            <span className="text-bg/40">05</span>
            <span className="block w-8 h-px bg-bg/20" />
            <span>{t({ ru: 'Контакты', en: 'Contact' })}</span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.025em] text-bg">
            {t({
              ru: (
                <>
                  Заходите.{' '}
                  <em className="not-italic italic font-normal text-gradient-ym">Будем рады.</em>
                </>
              ),
              en: (
                <>
                  Drop by.{' '}
                  <em className="not-italic italic font-normal text-gradient-ym">We'd love that.</em>
                </>
              ),
            })}
          </h2>
        </div>
        <p className="text-bg/60 text-[1.1rem] leading-[1.65] max-w-[560px] lg:justify-self-end">
          {t({
            ru: 'Чтобы получить расчёт стоимости или просто узнать, успеем ли мы к завтрашнему дню — свяжитесь любым удобным способом.',
            en: "For a quote or just to find out if we'll make tomorrow's deadline — reach us however suits you.",
          })}
        </p>
      </div>

      <div ref={gridRef} className="reveal max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8">
        {/* Info cards */}
        <div className="space-y-3">
          {INFO_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-bg/[0.04] border border-bg/10 rounded-[18px] p-5 flex items-start gap-4 transition-all duration-400 hover:bg-bg/[0.07] hover:translate-x-1"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}26`, color: item.color }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-bg text-[1.05rem] mb-1">
                    {t(item.label)}
                  </h4>
                  <p className={`text-[0.9rem] leading-relaxed ${('muted' in item && item.muted) ? 'text-bg/40' : 'text-bg/60'}`}>
                    {t(item.value)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div className="space-y-3">
          <div className="rounded-[18px] overflow-hidden h-[280px] border border-bg/10 bg-bg/[0.04]">
            <iframe
              src={CONTACT.yandexEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
              style={{ filter: 'grayscale(0.3)' }}
              title="Yandex Map"
            />
          </div>

          <a
            href={CONTACT.yandexMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cmyk-y text-ink rounded-[18px] px-6 py-5 flex items-center justify-between font-semibold transition-all duration-400 hover:bg-bg hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(240,176,32,0.3)]"
          >
            <span>{t({ ru: 'Открыть Яндекс.Карты', en: 'Open Yandex Maps' })}</span>
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
