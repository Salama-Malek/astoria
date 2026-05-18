import { useLang } from '@/lib/LanguageContext';
import type { Translatable } from '@/lib/LanguageContext';

interface SectionEyebrowProps {
  num: string;
  label: Translatable;
  color?: string;
}

export default function SectionEyebrow({ num, label, color = 'text-cmyk-m' }: SectionEyebrowProps) {
  const { t } = useLang();
  return (
    <div className={`inline-flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.25em] uppercase ${color}`}>
      <span className="text-ink-mute">{num}</span>
      <span className="block w-8 h-px bg-ink/15" />
      <span>{t(label)}</span>
    </div>
  );
}
