import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'ru' | 'en';

export type Translatable<T = string> = { ru: T; en: T };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(value: Translatable<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');

  const t = useCallback(
    <T,>(value: Translatable<T>) => value[lang],
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
