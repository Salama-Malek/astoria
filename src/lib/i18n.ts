import { useUIStore } from '@/state/useUIStore';

export type Lang = 'ru' | 'en';

export const dict = {
  ru: {
    nav: { about: 'Мастерская', services: 'Услуги', craft: 'Ремесло', gallery: 'Галерея', reviews: 'Отзывы', contact: 'Контакты' },
    hero: {
      chapterLabel: 'СЕРИЯ I — РЕМЕСЛО',
      h1Pre: 'Печать с',
      h1Italic: 'характером',
      h1Post: '.',
      sub: 'С 2010 года.',
      scroll: 'СКРОЛЛ',
      devices: { printer: 'Принтер', press: 'Термопресс', laminator: 'Ламинатор' },
    },
    about: {
      chapterLabel: 'СЕРИЯ II — МАСТЕРСКАЯ',
      heading: 'Маленькая мастерская.',
      headingItalic: 'Большое внимание к деталям.',
      p1: 'Мы — фотосалон Астория. С 2010 года печатаем здесь всё: от паспортного фото за пять минут до переплёта диссертации за ночь до защиты.',
      p2: 'Маленькая мастерская в Москве. Когда вам нужно фото на документы в 9 утра — мы открыты. Когда нужно сдать диплом утром, а файл готов в полночь — мы тоже открыты.',
      p3: 'Каждый заказ — будь то одна фотография или сотня листов — проходит через наши руки. Без конвейера, без спешки. Чернила ложатся аккуратно.',
      stat: '14+ ЛЕТ · 9 УСЛУГ · ТЫСЯЧИ КЛИЕНТОВ',
      caption: 'Сделано вручную в нашей мастерской',
    },
    services: {
      chapterLabel: 'СЕРИЯ III — УСЛУГИ',
      heading: 'Каждое ремесло.',
      headingItalic: 'Каждый формат.',
      sub: 'Девять услуг, выполняемых под одной крышей с 2010 года.',
      items: {
        print: { name: 'Печать A4/A3', desc: 'Чёткий текст. Точный цвет.' },
        copy: { name: 'Ксерокопии', desc: 'Быстро. Прямо сейчас.' },
        photo: { name: 'Фотобумага', desc: 'Глянец и матовая. Без потерь.' },
        id: { name: 'Фото на документы', desc: 'Паспорт. Виза. Удостоверение.' },
        bind: { name: 'Переплёт', desc: 'Дипломы. Диссертации. Книги.' },
        lam: { name: 'Ламинация', desc: 'A6 до A3. Глянцевая защита.' },
        scan: { name: 'Сканирование', desc: 'Высокое разрешение. PDF.' },
        tshirt: { name: 'Печать на футболках', desc: 'Термоперенос. Стойкий цвет.' },
        pvc: { name: 'Печать на ПВХ', desc: 'Резкая графика. Долго.' },
      },
    },
    craft: {
      chapterLabel: 'СЕРИЯ IV — ПРОЦЕСС',
      heading: 'От файла —',
      headingItalic: 'к физическому.',
      stages: [
        { name: 'Чистый лист', body: 'С пустой бумаги начинается всё.' },
        { name: 'Четыре цвета', body: 'Cyan, Magenta, Yellow, Key — четыре прохода, одно изображение.' },
        { name: 'Чернила ложатся', body: 'Принтер делает паузу. Цвет схватывается.' },
        { name: 'Точный край', body: 'Гильотина опускается. Миллиметровая точность.' },
        { name: 'Готово к рукам', body: 'Тёплая обложка. Холодный пластик. Готово.' },
      ],
    },
    gallery: {
      chapterLabel: 'СЕРИЯ V — ГАЛЕРЕЯ',
      heading: 'Загляните',
      headingItalic: 'внутрь.',
      sub: 'Витрина, прилавок, оборудование, готовая работа.',
    },
    reviews: {
      chapterLabel: 'СЕРИЯ VI — ОТЗЫВЫ',
      heading: 'Остаётся',
      headingItalic: 'отпечаток.',
      moreLink: 'ВСЕ ОТЗЫВЫ НА ЯНДЕКС.КАРТАХ',
      source: 'ЯНДЕКС.КАРТЫ',
      items: [
        { quote: 'Сделали фото на паспорт за пять минут. Качество — лучше, чем в МФЦ. Вежливо, без очереди.', author: 'Анна К.' },
        { quote: 'Переплели диплом ночью накануне защиты. Спасли. Цвет обложки точно как в требованиях.', author: 'Дмитрий В.' },
        { quote: 'Печатали 80 листов курсовой. Чёткая печать, аккуратный переплёт, всё за час.', author: 'Мария О.' },
        { quote: 'Делали футболки на день рождения. Цвет яркий, не сошёл после стирок. Рекомендую.', author: 'Илья С.' },
        { quote: 'Ламинировали свидетельства — тонкая аккуратная плёнка, без пузырей. Идеально.', author: 'Екатерина Р.' },
        { quote: 'Маленький, уютный салон. Чувствуется, что хозяева любят своё дело.', author: 'Олег М.' },
      ],
    },
    contact: {
      chapterLabel: 'СЕРИЯ VII — КОНТАКТЫ',
      heading: 'Заходите.',
      sub: 'Адрес, время работы и почта. Карты — снизу.',
      address: { label: 'АДРЕС', value: 'Москва · смотрите на Яндекс.Картах' },
      phone: { label: 'СВЯЗЬ', value: '@ASTORIA1000 · Telegram' },
      email: { label: 'ПОЧТА', value: 'astoria_323@mail.ru' },
      hours: { label: 'ВРЕМЯ РАБОТЫ', value: 'ПН–ПТ 09:00–21:00 · СБ–ВС 10:00–19:00' },
      cta: 'ОТКРЫТЬ ЯНДЕКС.КАРТЫ',
      est: 'EST. 2010',
    },
    footer: {
      tagline: 'Сделано с заботой о деталях',
      rights: 'Все права защищены.',
    },
    loader: { wordmark: 'ASTORIA', sub: 'Загружается' },
  },
  en: {
    nav: { about: 'Workshop', services: 'Services', craft: 'Craft', gallery: 'Gallery', reviews: 'Reviews', contact: 'Contact' },
    hero: {
      chapterLabel: 'CHAPTER I — THE CRAFT',
      h1Pre: 'Printing with',
      h1Italic: 'soul',
      h1Post: '.',
      sub: 'Since 2010.',
      scroll: 'SCROLL',
      devices: { printer: 'Printer', press: 'T-Shirt Press', laminator: 'Laminator' },
    },
    about: {
      chapterLabel: 'CHAPTER II — THE WORKSHOP',
      heading: 'A small workshop.',
      headingItalic: 'A large attention to detail.',
      p1: 'We are Astoria, a small photo and print shop. Since 2010 we have printed everything here — from a five-minute passport photo to a dissertation bound overnight.',
      p2: 'When you need a passport photo at 9 AM, we are open. When your file is finally ready at midnight before defense day, we are open then too.',
      p3: 'Every order — a single photo or a hundred sheets — passes through our hands. No conveyor belt, no shortcuts. The ink settles, carefully.',
      stat: '14+ YEARS · 9 SERVICES · THOUSANDS OF CLIENTS',
      caption: 'Handmade in our workshop',
    },
    services: {
      chapterLabel: 'CHAPTER III — SERVICES',
      heading: 'Every craft.',
      headingItalic: 'Every format.',
      sub: 'Nine services, performed under one roof since 2010.',
      items: {
        print: { name: 'A4/A3 Printing', desc: 'Sharp text. Precise color.' },
        copy: { name: 'Photocopies', desc: 'Fast. Right now.' },
        photo: { name: 'Photo Paper', desc: 'Gloss & matte. Lossless.' },
        id: { name: 'ID & Passport Photos', desc: 'Passport. Visa. ID card.' },
        bind: { name: 'Binding', desc: 'Theses. Dissertations. Books.' },
        lam: { name: 'Lamination', desc: 'A6 to A3. Glossy protection.' },
        scan: { name: 'Document Scanning', desc: 'High-resolution PDF.' },
        tshirt: { name: 'T-Shirt Printing', desc: 'Heat transfer. Lasting color.' },
        pvc: { name: 'PVC Printing', desc: 'Crisp graphics. Built to last.' },
      },
    },
    craft: {
      chapterLabel: 'CHAPTER IV — THE PROCESS',
      heading: 'From file —',
      headingItalic: 'to physical.',
      stages: [
        { name: 'A blank sheet', body: 'Every print begins with empty paper.' },
        { name: 'Four colors', body: 'Cyan, Magenta, Yellow, Key — four passes, one image.' },
        { name: 'Ink settles', body: 'The printer pauses. Color catches.' },
        { name: 'A precise edge', body: 'The guillotine drops. Millimeter accuracy.' },
        { name: 'Ready for hands', body: 'A warm cover. Cold plastic. Done.' },
      ],
    },
    gallery: {
      chapterLabel: 'CHAPTER V — GALLERY',
      heading: 'Step',
      headingItalic: 'inside.',
      sub: 'Storefront, counter, equipment, finished work.',
    },
    reviews: {
      chapterLabel: 'CHAPTER VI — REVIEWS',
      heading: 'The mark',
      headingItalic: 'remains.',
      moreLink: 'ALL REVIEWS ON YANDEX MAPS',
      source: 'YANDEX MAPS',
      items: [
        { quote: 'Did my passport photo in five minutes. Quality better than the government office. Polite, no queue.', author: 'Anna K.' },
        { quote: 'Bound my thesis the night before defense. They saved me. Cover color exactly to spec.', author: 'Dmitry V.' },
        { quote: 'Printed 80 pages of coursework. Sharp print, neat binding — done in an hour.', author: 'Maria O.' },
        { quote: 'Made birthday T-shirts. Vivid color, did not fade after washes. Recommended.', author: 'Ilya S.' },
        { quote: 'Laminated my certificates — thin, clean film, no bubbles. Perfect.', author: 'Ekaterina R.' },
        { quote: 'Small, cozy salon. You can feel the owners love what they do.', author: 'Oleg M.' },
      ],
    },
    contact: {
      chapterLabel: 'CHAPTER VII — CONTACT',
      heading: 'Drop by.',
      sub: 'Address, hours and inbox. The map sits below.',
      address: { label: 'ADDRESS', value: 'Moscow · see on Yandex Maps' },
      phone: { label: 'REACH US', value: '@ASTORIA1000 · Telegram' },
      email: { label: 'EMAIL', value: 'astoria_323@mail.ru' },
      hours: { label: 'OPEN', value: 'MON–FRI 09:00–21:00 · SAT–SUN 10:00–19:00' },
      cta: 'OPEN YANDEX MAPS',
      est: 'EST. 2010',
    },
    footer: {
      tagline: 'Made with care for the details',
      rights: 'All rights reserved.',
    },
    loader: { wordmark: 'ASTORIA', sub: 'Loading' },
  },
} as const;

export type Dict = (typeof dict)['ru'];

export function useT(): Dict {
  const lang = useUIStore((s) => s.language);
  return dict[lang] as Dict;
}

export function useLang(): Lang {
  return useUIStore((s) => s.language);
}
