import {
  Printer,
  Copy,
  Image as ImageIcon,
  Camera,
  BookOpen,
  Shield,
  ScanLine,
  Shirt,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { SERVICES, ACCENT_COLORS } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionEyebrow from './SectionEyebrow';

const ICON_MAP: Record<string, LucideIcon> = {
  Printer,
  Copy,
  Image: ImageIcon,
  Camera,
  BookOpen,
  Shield,
  ScanLine,
  Shirt,
  Layers,
};

export default function Services() {
  const { t } = useLang();
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section
      id="services"
      className="py-28 md:py-32 px-6 md:px-10 bg-bg-soft border-t border-b border-ink/8 relative"
    >
      <div ref={headRef} className="reveal max-w-[1400px] mx-auto mb-16 grid lg:grid-cols-2 gap-12 items-end">
        <div>
          <SectionEyebrow num="01" label={{ ru: 'Услуги', en: 'Services' }} />
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.025em] text-ink">
            {t({
              ru: (
                <>
                  Что мы <em className="not-italic italic font-normal text-gradient-cm">умеем</em>
                </>
              ),
              en: (
                <>
                  What we <em className="not-italic italic font-normal text-gradient-cm">do</em>
                </>
              ),
            })}
          </h2>
        </div>
        <p className="text-ink-soft text-[1.1rem] leading-[1.65] max-w-[560px] lg:justify-self-end">
          {t({
            ru: 'От одной чёрно-белой копии до полноцветной печати на хлопке. Каждая услуга — с одинаковым вниманием к мелочам.',
            en: 'From a single black-and-white copy to full-color cotton printing. Every job gets the same care for the small things.',
          })}
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-[1400px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SERVICES.map((service) => {
          const Icon = ICON_MAP[service.iconName] ?? Printer;
          const color = ACCENT_COLORS[service.accent];

          return (
            <div
              key={service.num}
              className="group relative bg-bg-card p-8 rounded-[20px] shadow-warm border border-ink/8 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-warm-lg overflow-hidden"
              style={{ ['--card-color' as any]: color }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${color}14, transparent 60%)`,
                }}
              />
              {/* Border on hover */}
              <div
                className="absolute inset-0 rounded-[20px] border-transparent group-hover:border opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ borderColor: color }}
              />

              <span className="absolute top-5 right-6 font-mono text-[0.7rem] text-ink-mute tracking-wider">
                {service.num}
              </span>

              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-6 transition-all duration-400 group-hover:rotate-[-5deg] group-hover:scale-110"
                style={{ background: `${color}1a` }}
              >
                <Icon size={24} strokeWidth={1.5} style={{ color }} />
              </div>

              <h3 className="font-serif text-[1.35rem] font-semibold text-ink mb-2 leading-tight">
                {t(service.title)}
              </h3>
              <p className="text-ink-soft text-[0.92rem] leading-relaxed">{t(service.desc)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
