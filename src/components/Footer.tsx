import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="py-12 px-6 md:px-10 bg-ink text-bg border-t border-bg/8">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-6">
        <div className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-bg/50">
          © 2026 Astoria
        </div>
        <div className="font-serif italic text-bg/70 text-base">
          {t({
            ru: 'Сделано с заботой о деталях',
            en: 'Made with care for the details',
          })}
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cmyk-c" />
          <div className="w-2.5 h-2.5 rounded-full bg-cmyk-m" />
          <div className="w-2.5 h-2.5 rounded-full bg-cmyk-y" />
          <div className="w-2.5 h-2.5 rounded-full bg-bg/30" />
        </div>
      </div>
    </footer>
  );
}
