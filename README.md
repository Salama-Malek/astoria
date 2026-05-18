# Astoria — Landing Page

A bilingual (RU/EN) landing page for **Astoria** photo & print shop. Light theme with bold CMYK accents and an interactive morphing 3D hero (printer → t-shirt press → laminator).

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (utility-first)
- **Three.js** (vanilla, in `useEffect`) — no react-three-fiber dependency
- **Lucide React** for icons

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
├── App.tsx                    # composes all sections
├── main.tsx                   # React entry
├── index.css                  # Tailwind layers + custom CSS
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx               # text + 3D canvas + device tabs
│   ├── Printer3D.tsx          # the Three.js morphing scene
│   ├── Marquee.tsx
│   ├── Services.tsx
│   ├── Gallery.tsx
│   ├── About.tsx
│   ├── Reviews.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── LangToggle.tsx
│   └── SectionEyebrow.tsx
├── lib/
│   ├── LanguageContext.tsx    # RU/EN provider + useLang hook
│   └── content.ts             # ALL TEXT/DATA here — edit me first
└── hooks/
    └── useScrollReveal.ts     # IntersectionObserver reveal
```

## Editing content

Most edits go in **`src/lib/content.ts`** — services, reviews, gallery labels, contact info, marquee strip. Everything is bilingual via `{ ru: '...', en: '...' }` objects.

## Customizing

### Replace gallery placeholders with real photos

In `src/lib/content.ts`, add the `src` field to each gallery item:

```ts
{ num: '01', alt: { ru: 'Витрина', en: 'Storefront' }, accent: 'm', span: 'tall',
  src: '/images/storefront.jpg'  // ← add this
},
```

Drop the image files into `public/images/` and they'll be served at `/images/...`. If `src` is missing, a CMYK-coloured placeholder tile shows instead.

### Replace placeholder reviews

Edit the `REVIEWS` array in `src/lib/content.ts`.

### Hook up the real map

In `src/lib/content.ts`, replace `yandexEmbedUrl` with the embed URL from your Yandex Maps page (Share → Embed code → copy the `src` URL).

### Phone number

Set `CONTACT.phone` in `src/lib/content.ts`. The contact section will pick it up automatically.

### Theme colors

In `tailwind.config.js`, the `cmyk` and `gold` colors are defined. Adjust there and they propagate everywhere.

## The 3D hero

The morphing animation lives in `src/components/Printer3D.tsx`. It uses vanilla Three.js inside a `useEffect` so it works the same in any React setup (including Base44).

Three devices share the same part count so transforms can be lerped between them part-by-part. Click the pill tabs under the canvas to switch — the prop `deviceIndex` flows into the scene via a ref so the animation loop stays continuous.

## Notes

- Fonts are loaded from Google Fonts in `index.html` (Fraunces, Inter Tight, JetBrains Mono).
- The Russian-only fallback locale is `ru` (default on load).
- Mobile menu and lang toggle live in `Navbar.tsx`.
- All sections use `useScrollReveal` for IntersectionObserver-based fade-up.
