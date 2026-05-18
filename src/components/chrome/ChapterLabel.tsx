import { motion } from 'framer-motion';
import { EASE_EXPO } from '@/lib/motion';

interface Props {
  ru: string;
  en: string;
  lang: 'ru' | 'en';
  accent?: 'c' | 'm' | 'y';
  className?: string;
}

export default function ChapterLabel({ ru, en, lang, accent = 'c', className = '' }: Props) {
  const dot = accent === 'c' ? 'bg-cmyk-c' : accent === 'm' ? 'bg-cmyk-m' : 'bg-cmyk-y';
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className={`flex items-center gap-3 ${className}`}
    >
      <span className={`inline-block h-[6px] w-[6px] rounded-full ${dot} animate-pulse-glow`} />
      <span className="mono-label">{lang === 'ru' ? ru : en}</span>
    </motion.div>
  );
}
