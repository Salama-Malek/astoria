import { useLang } from '@/lib/LanguageContext';
import type { Lang } from '@/lib/LanguageContext';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ['ru', 'en'];

  return (
    <div className="flex bg-bg-card border border-ink/8 rounded-full p-[3px] shadow-warm">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-300 ${
            lang === l
              ? 'bg-ink text-bg'
              : 'text-ink-mute hover:text-ink'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
