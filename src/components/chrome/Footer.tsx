import { useT } from '@/lib/i18n';
import Wordmark from './Wordmark';

export default function Footer() {
  const t = useT();
  return (
    <footer className="relative border-t border-paper-faint bg-void">
      <div className="container-x pt-10 pb-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Wordmark size={22} />
        <p className="font-serif font-light italic text-paper-dim text-[14px] md:text-center">
          {t.footer.tagline}
        </p>
        <div className="flex items-center gap-2.5" aria-hidden="true">
          {(['c', 'm', 'y', 'k'] as const).map((c) => (
            <span
              key={c}
              className="block h-2 w-2 rounded-full animate-pulse-glow"
              style={{
                background:
                  c === 'c' ? '#2db4d8' : c === 'm' ? '#e6296b' : c === 'y' ? '#f0b020' : '#3a3a40',
                animationDelay: `${'cmyk'.indexOf(c) * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="container-x pb-8 flex flex-col-reverse gap-2 md:flex-row md:justify-between border-t border-paper-faint pt-5">
        <p className="mono-label">© 2010–2026 ASTORIA · {t.footer.rights}</p>
        <p className="mono-label">@ASTORIA1000</p>
      </div>
    </footer>
  );
}
