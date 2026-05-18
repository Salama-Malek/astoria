# Astoria — Cinematic Print Shop Site

A premium, bilingual (RU/EN), cinematic single-page site for **Astoria** — a Moscow photo and print shop operating since 2010.

Pure black voids, CMYK glow accents, a 3D printer / T-shirt press / laminator that morphs in the hero, GSAP-pinned paper-through-stages craft showcase, lightbox gallery built from real shop photography.

**Repo:** [github.com/Salama-Malek/astoria](https://github.com/Salama-Malek/astoria)

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** — dark `void` palette + CMYK tokens + glow shadows
- **Three.js** via **@react-three/fiber** + **drei** + **postprocessing** (bloom)
- **Framer Motion** for component animations
- **GSAP + ScrollTrigger** synced with **Lenis** for cinematic smooth scrolling
- **Zustand** for UI state (language, active device, mouse, loader)

## Setup

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:5173
npm run build    # → /dist
npm run preview
```

## Architecture

```text
src/
├── App.tsx                            # mounts chrome + composes chapters
├── main.tsx
├── index.css                          # Tailwind layers, grain, glass, scrollbars
│
├── state/useUIStore.ts                # Zustand: language, activeDevice, mouse
├── lib/
│   ├── i18n.ts                        # RU/EN dictionary + useT() + useLang()
│   ├── lenis.ts                       # Lenis singleton + GSAP ticker sync
│   ├── cmyk.ts                        # CMYK tokens + device→color map
│   └── motion.ts                      # shared easings + variants
│
├── components/
│   ├── chrome/
│   │   ├── Loader.tsx                 # paper-sheet + CMYK registration
│   │   ├── Navbar.tsx                 # transparent → blur on scroll
│   │   ├── Footer.tsx
│   │   ├── MouseGlow.tsx              # cycling CMYK cursor glow
│   │   ├── ChapterLabel.tsx
│   │   └── Wordmark.tsx               # gold-gradient italic + CMYK swooshes
│   │
│   ├── chapters/
│   │   ├── Hero.tsx                   # Ch I — 3D + headline + switcher
│   │   ├── About.tsx                  # Ch II — workshop story + hands photo
│   │   ├── Services.tsx               # Ch III — 9 horizontal cards
│   │   ├── CraftShowcase.tsx          # Ch IV — pinned paper-through-5-stages
│   │   ├── Gallery.tsx                # Ch V — asymmetric grid + lightbox
│   │   ├── Testimonials.tsx           # Ch VI — floating CMYK quote cards
│   │   └── Contact.tsx                # Ch VII — info, Yandex map, final reveal
│   │
│   ├── three/
│   │   ├── HeroDevice.tsx             # R3F canvas + lights + bloom
│   │   ├── InkParticles.tsx           # CMYK additive points
│   │   └── models/
│   │       ├── PrinterModel.tsx
│   │       ├── TShirtPressModel.tsx
│   │       └── LaminatorModel.tsx
│   │
│   └── typography/
│       ├── BiText.tsx                 # renders RU or EN per current lang
│       └── RevealText.tsx             # masked line-by-line reveal
│
└── public/photos/                     # 23 real shop photos + MANIFEST.md
```

## Editing copy

All RU/EN content lives in **`src/lib/i18n.ts`** as a single typed dictionary. Both languages have the same shape; the `useT()` hook returns the active language's slice.

## Photos

Real client photos are under `public/photos/`. Each photo has a descriptive slug; `public/photos/MANIFEST.md` documents what each one is and where it appears on the site.

## Performance

- Hero R3F canvas is `React.lazy` so initial paint never blocks on 3D
- Manual chunk split (Vite `manualChunks`): three / r3f / motion / gsap-lenis isolated from app code
- Lenis is the single source of scroll truth; GSAP `ScrollTrigger.update` is fed from Lenis
- `prefers-reduced-motion` disables Lenis, mouse glow, particle drift

## Brand

- Email: `astoria_323@mail.ru`
- Telegram: `@ASTORIA1000`
- Yandex Maps: [open the listing](https://yandex.com/maps/-/CPcUiZNP)
- Since 2010
