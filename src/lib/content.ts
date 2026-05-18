import type { Translatable } from './LanguageContext';

// ── CMYK accent type ────────────────────────────────────────────────────────
export type CmykAccent = 'c' | 'm' | 'y';

export const ACCENT_COLORS: Record<CmykAccent, string> = {
  c: '#2db4d8',
  m: '#e6296b',
  y: '#f0b020',
};

// ── Nav ─────────────────────────────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: Translatable;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'services', label: { ru: 'Услуги', en: 'Services' } },
  { id: 'gallery', label: { ru: 'Галерея', en: 'Gallery' } },
  { id: 'about', label: { ru: 'О нас', en: 'About' } },
  { id: 'reviews', label: { ru: 'Отзывы', en: 'Reviews' } },
  { id: 'contact', label: { ru: 'Контакты', en: 'Contact' } },
];

// ── Services ────────────────────────────────────────────────────────────────
export interface Service {
  num: string;
  iconName: string;
  title: Translatable;
  desc: Translatable;
  accent: CmykAccent;
}

export const SERVICES: Service[] = [
  {
    num: '01',
    iconName: 'Printer',
    title: { ru: 'Печать А4 / А3', en: 'A4 / A3 Printing' },
    desc: { ru: 'Чёрно-белая и цветная печать. Резкие линии, ровные поля.', en: 'Black-and-white and color printing. Sharp lines, even margins.' },
    accent: 'c',
  },
  {
    num: '02',
    iconName: 'Copy',
    title: { ru: 'Ксерокс', en: 'Photocopies' },
    desc: { ru: 'Быстрые копии любых документов. Сразу в руки.', en: 'Quick copies of any document. In your hands fast.' },
    accent: 'm',
  },
  {
    num: '03',
    iconName: 'Image',
    title: { ru: 'Печать на фотобумаге', en: 'Photo Paper Printing' },
    desc: { ru: 'Глянцевая и матовая. Насыщенные цвета, острые детали.', en: 'Glossy and matte. Rich colors, crisp detail.' },
    accent: 'y',
  },
  {
    num: '04',
    iconName: 'Camera',
    title: { ru: 'Фото на документы', en: 'ID & Passport Photos' },
    desc: { ru: 'Обработка и сохранение. 4 готовых снимка по стандарту.', en: 'Retouching and backup. 4 prints meeting every standard.' },
    accent: 'c',
  },
  {
    num: '05',
    iconName: 'BookOpen',
    title: { ru: 'Брошюровка', en: 'Binding' },
    desc: { ru: 'Курсовые, дипломы, журналы. Пластик или металл — на выбор.', en: 'Term papers, theses, journals. Plastic or metal spiral.' },
    accent: 'm',
  },
  {
    num: '06',
    iconName: 'Shield',
    title: { ru: 'Ламинирование', en: 'Lamination' },
    desc: { ru: 'Форматы А4 и А3. Защита от воды, пятен и времени.', en: 'A4 and A3 sizes. Protection against water, stains, time.' },
    accent: 'y',
  },
  {
    num: '07',
    iconName: 'ScanLine',
    title: { ru: 'Сканирование', en: 'Document Scanning' },
    desc: { ru: 'Документы и фото в цифровом виде. На почту, флешку, в облако.', en: 'Documents and photos digitized. Email, drive, or cloud.' },
    accent: 'c',
  },
  {
    num: '08',
    iconName: 'Shirt',
    title: { ru: 'Печать на футболках', en: 'T-Shirt Printing' },
    desc: { ru: 'Любой принт на любой ткани. Краски не трескаются после стирки.', en: 'Any design on any fabric. Inks won\'t crack after washing.' },
    accent: 'm',
  },
  {
    num: '09',
    iconName: 'Layers',
    title: { ru: 'Печать на ПВХ', en: 'PVC Printing' },
    desc: { ru: 'Слова, логотипы, изображения на ПВХ-материалах.', en: 'Words, logos, images on PVC materials.' },
    accent: 'y',
  },
];

// ── Gallery (placeholder labels, swap photos in src field when ready) ───────
export interface GalleryImage {
  /** When you have real photos, set this to a URL/import. Leave undefined for CMYK placeholder. */
  src?: string;
  alt: Translatable;
  /** Layout span hints */
  span?: 'tall' | 'wide';
  /** CMYK placeholder color theme if no src */
  accent: 'c' | 'm' | 'y' | 'k';
  num: string;
}

export const GALLERY: GalleryImage[] = [
  { num: '01', alt: { ru: 'Витрина', en: 'Storefront' }, accent: 'm', span: 'tall' },
  { num: '02', alt: { ru: 'Принтеры', en: 'Printers' }, accent: 'c' },
  { num: '03', alt: { ru: 'Фотозона', en: 'Photo booth' }, accent: 'y' },
  { num: '04', alt: { ru: 'Брошюровка', en: 'Binding' }, accent: 'k', span: 'tall' },
  { num: '05', alt: { ru: 'Печать на ткани', en: 'Fabric prints' }, accent: 'c', span: 'wide' },
  { num: '06', alt: { ru: 'Детали', en: 'Details' }, accent: 'm' },
  { num: '07', alt: { ru: 'Ламинатор', en: 'Laminator' }, accent: 'y' },
  { num: '08', alt: { ru: 'Снаружи', en: 'Outside' }, accent: 'k' },
];

// ── Reviews ─────────────────────────────────────────────────────────────────
export interface Review {
  name: Translatable;
  text: Translatable;
  stars: number;
  accent: CmykAccent;
}

export const REVIEWS: Review[] = [
  {
    name: { ru: 'Анна М.', en: 'Anna M.' },
    text: {
      ru: 'Отличная типография! Фото на документы — быстро и качественно. Рекомендую всем!',
      en: 'Great print shop! ID photos — fast and quality. Highly recommend!',
    },
    stars: 5,
    accent: 'm',
  },
  {
    name: { ru: 'Дмитрий К.', en: 'Dmitry K.' },
    text: {
      ru: 'Печатал диплом перед защитой — сделали за час. Огромное спасибо за оперативность!',
      en: 'Printed my thesis before the defense — done in an hour. Huge thanks!',
    },
    stars: 5,
    accent: 'c',
  },
  {
    name: { ru: 'Елена В.', en: 'Elena V.' },
    text: {
      ru: 'Уже несколько лет хожу только сюда. Всегда приветливо, всегда аккуратно.',
      en: 'Been coming here for years. Always friendly, always careful.',
    },
    stars: 5,
    accent: 'y',
  },
  {
    name: { ru: 'Сергей П.', en: 'Sergey P.' },
    text: {
      ru: 'Заказывал печать на футболках — результат превзошёл ожидания. Очень доволен!',
      en: 'Ordered T-shirt printing — result exceeded expectations. Very happy!',
    },
    stars: 5,
    accent: 'm',
  },
  {
    name: { ru: 'Марина Л.', en: 'Marina L.' },
    text: {
      ru: 'Ламинировали документы — всё идеально. Приятные цены, отличное обслуживание.',
      en: 'Had documents laminated — everything perfect. Great prices and service.',
    },
    stars: 5,
    accent: 'c',
  },
  {
    name: { ru: 'Алексей Р.', en: 'Alexey R.' },
    text: {
      ru: 'Печать на ПВХ получилась отлично. Профессиональный подход к каждой задаче.',
      en: 'PVC printing turned out great. Professional approach to every task.',
    },
    stars: 4,
    accent: 'y',
  },
];

// ── Marquee strip ───────────────────────────────────────────────────────────
export const MARQUEE_ITEMS: Translatable<string[]> = {
  ru: [
    'Печать А4 · А3',
    'Брошюровка',
    'Фото на документы',
    'Ламинирование',
    'Печать на футболках',
    'Сканирование',
    'Печать на ПВХ',
  ],
  en: [
    'A4 · A3 Print',
    'Binding',
    'ID Photos',
    'Lamination',
    'T-Shirt Print',
    'Scanning',
    'PVC Print',
  ],
};

// ── Contact ─────────────────────────────────────────────────────────────────
export const CONTACT = {
  yandexMapUrl: 'https://yandex.com/maps/-/CPcUiZNP',
  // TODO: replace iframe URL with the embed code from your actual Yandex Maps page
  yandexEmbedUrl: 'https://yandex.com/map-widget/v1/?ll=37.6173%2C55.7558&z=14&l=map',
  phone: '', // TODO: fill in
  hours: {
    ru: 'Пн–Сб · с утра до вечера',
    en: 'Mon–Sat · morning to evening',
  } as Translatable,
};
