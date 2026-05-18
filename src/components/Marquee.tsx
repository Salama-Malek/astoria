import { useLang } from '@/lib/LanguageContext';
import { MARQUEE_ITEMS } from '@/lib/content';

const DOT_COLORS = ['bg-cmyk-c', 'bg-cmyk-m', 'bg-cmyk-y'];

export default function Marquee() {
  const { t } = useLang();
  const items = t(MARQUEE_ITEMS);

  // Double the list so the loop reads continuously
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-8 bg-ink text-bg">
      <div className="flex gap-16 whitespace-nowrap animate-marquee font-serif text-[2.2rem] italic">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-16 flex-shrink-0">
            {item}
            <span className={`inline-block w-2 h-2 rounded-full ${DOT_COLORS[i % 3]}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
