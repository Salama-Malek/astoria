import { motion, type Variants } from 'framer-motion';
import { EASE_EXPO } from '@/lib/motion';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface Props {
  lines: (string | { text: string; italic?: boolean; glow?: 'c' | 'm' | 'y' | null })[];
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
}

const lineVar: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.95, ease: EASE_EXPO, delay: i * 0.08 },
  }),
};

function glowClass(g?: 'c' | 'm' | 'y' | null) {
  if (g === 'c') return 'text-cmyk-c text-glow-c';
  if (g === 'm') return 'text-cmyk-m text-glow-m';
  if (g === 'y') return 'text-cmyk-y text-glow-y';
  return '';
}

export default function RevealText({ lines, as = 'h2', className = '', delay = 0, stagger = 0.08 }: Props) {
  const Tag = motion[as] as typeof motion.h2;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15%' }}
    >
      {lines.map((line, i) => {
        const obj = typeof line === 'string' ? { text: line } : line;
        return (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className={`inline-block ${obj.italic ? 'italic font-normal' : ''} ${glowClass(obj.glow)}`}
              variants={lineVar}
              custom={i + delay / stagger}
            >
              {obj.text}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
