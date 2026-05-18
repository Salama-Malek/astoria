import { create } from 'zustand';

export type Lang = 'ru' | 'en';
export type DeviceKey = 'printer' | 'press' | 'laminator';

interface UIState {
  language: Lang;
  setLanguage: (l: Lang) => void;
  toggleLanguage: () => void;

  activeDevice: DeviceKey;
  setActiveDevice: (d: DeviceKey) => void;

  isLoaded: boolean;
  setLoaded: (b: boolean) => void;

  mouseX: number;
  mouseY: number;
  setMouse: (x: number, y: number) => void;
}

const STORAGE_KEY = 'astoria.lang';

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'ru';
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'en' || v === 'ru' ? v : 'ru';
}

export const useUIStore = create<UIState>((set) => ({
  language: readInitialLang(),
  setLanguage: (l) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
    set({ language: l });
  },
  toggleLanguage: () =>
    set((s) => {
      const next: Lang = s.language === 'ru' ? 'en' : 'ru';
      if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return { language: next };
    }),

  activeDevice: 'printer',
  setActiveDevice: (d) => set({ activeDevice: d }),

  isLoaded: false,
  setLoaded: (b) => set({ isLoaded: b }),

  mouseX: 0.5,
  mouseY: 0.5,
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
}));
