# Astoria — Cinematic Site Design Spec

**Date:** 2026-05-18
**Status:** Draft — awaiting client photos & content before implementation
**Working directory:** `/home/salama-malek/Downloads/astoria-react`

---

## 1. Goal & Voice

Build a premium, cinematic, bilingual (RU/EN) single-page site for **Astoria** — a photo and print shop operating since 2010 — that reads like an Awwwards Site of the Day for a high-end print atelier. The site treats every service (passport photos to dissertation binding) as craft, framed in pure black voids lit only by CMYK glow.

Voice: editorial, restrained, poetic. "Ink hitting paper in the dark," not cyberpunk.

---

## 2. Scope of v1

Build the **entire 7-chapter site end-to-end in one structural pass with placeholders**, then return for polish passes. Out-of-scope for v1: CMS, contact form, e-commerce, analytics, multi-page routing.

**Build now (independent of photos):** Hero (3D), Services, Craft Showcase (3D), Testimonials, Contact, Footer, Navbar, loading screen, bilingual toggle, mouse glow, particles, WebGL transitions.

**Blocked on client photos:** Chapter II (About — hands holding paper), Chapter V (Gallery — shop interior/exterior/work). These get stylized empty slots until photos arrive.

**Implementation does not begin until the client delivers the photo pack.**

---

## 3. Tech Stack (Decided)

- **Framework:** Vite + React 18 + TypeScript (existing project, not Next.js)
- **Styling:** Tailwind CSS (already installed)
- **Component animation:** Framer Motion
- **Scroll orchestration:** GSAP + ScrollTrigger
- **Smooth scroll:** Lenis (`@studio-freight/lenis`)
- **3D:** Three.js + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` (for bloom + chromatic aberration)
- **State:** Zustand (small store for `language` + `activeDevice` + `isLoading`)
- **Fonts:** loaded via `@fontsource/*` or Google Fonts `<link>` in `index.html` (no `next/font`)
- **Icons:** lucide-react (already installed)

**New dependencies to add:** `framer-motion`, `gsap`, `@studio-freight/lenis`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `zustand`, `@fontsource-variable/fraunces`, `@fontsource-variable/inter-tight`, `@fontsource/jetbrains-mono`.

---

## 4. Design Tokens

### Color
```
--bg-void:       #0a0a0c   /* deepest black */
--bg-panel:      #111114   /* charcoal */
--bg-elevated:   #16161a   /* card surfaces */
--paper:         #f5f0e3   /* warm off-white text */
--paper-dim:     rgba(245, 240, 227, 0.65)
--paper-mute:    rgba(245, 240, 227, 0.35)
--cmyk-cyan:     #2db4d8
--cmyk-magenta:  #e6296b
--cmyk-yellow:   #f0b020
--cmyk-key:      #0a0a0c   /* K is the background itself */
```

Glow values: `0 0 24px var(--c) / 0.45`, `0 0 64px var(--c) / 0.25`. Never use CMYK as flat fills on large surfaces — only as light sources, rim lights, and accents.

### Typography
- **Display serif (headlines):** Fraunces Variable — supports Cyrillic, has tasteful italics. Sizes clamp(2.5rem, 8vw, 9rem) for chapter headlines.
- **Body sans:** Inter Tight Variable — weights 200–400. Cyrillic support confirmed.
- **Mono labels:** JetBrains Mono — uppercase, `letter-spacing: 0.22em`, sizes 11–13px.
- Italic in display serif reserved for emotional words: *характером*, *soul*, *мастерская*, *workshop*, *void*, *ink*.

### Motion
- Default ease: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)
- Cinematic ease: `cubic-bezier(0.83, 0, 0.17, 1)` (in-out cubic)
- Reveal duration: 1.0s for headlines, 0.6s for body, 0.4s for micro
- Stagger: 80ms per line
- All animations gated by `prefers-reduced-motion`

### Grid & Spacing
- Max content width: 1440px
- Section vertical padding: clamp(96px, 14vh, 240px)
- Container gutter: clamp(16px, 4vw, 64px)

---

## 5. Architecture

```
src/
  main.tsx
  App.tsx                     # mounts Lenis, Loader, Page
  routes/Page.tsx             # composes all chapters
  lib/
    lenis.ts                  # Lenis singleton + GSAP ScrollTrigger sync
    motion.ts                 # shared variants, easings
    i18n.ts                   # { ru: {...}, en: {...} } dictionary + useT()
    cmyk.ts                   # color tokens as JS exports for Three.js
  state/
    useUIStore.ts             # zustand: language, activeDevice, isLoaded
  components/
    chrome/
      Loader.tsx              # cinematic paper-sheet boot animation
      Navbar.tsx              # transparent → blurred on scroll, lang pill
      Footer.tsx
      MouseGlow.tsx           # mouse-follow soft CMYK glow
      GrainOverlay.tsx        # paper-noise SVG/PNG at 5% opacity
      InkBleedTransition.tsx  # WebGL shader between chapters
      ChapterLabel.tsx        # bilingual "СЕРИЯ N — X / CHAPTER N — Y"
    typography/
      RevealHeading.tsx       # masked line-by-line reveal
      RevealText.tsx          # staggered line fade
      BiText.tsx              # renders RU or EN based on store
    three/
      Scene.tsx               # shared R3F canvas wrapper, postprocessing
      HeroDevice.tsx          # printer / press / laminator switcher
      models/
        PrinterModel.tsx      # R3F primitives, dark steel + CMYK rim
        TShirtPressModel.tsx
        LaminatorModel.tsx
      CraftScrollScene.tsx    # Chapter IV: pinned 3D printer + paper through stages
      InkParticles.tsx        # drifting CMYK ink-dust particles
    chapters/
      Hero.tsx                # Chapter I
      About.tsx               # Chapter II (photo placeholder)
      Services.tsx            # Chapter III (horizontal scroll cards)
      CraftShowcase.tsx       # Chapter IV (pinned scroll scene)
      Gallery.tsx             # Chapter V (photo placeholder grid)
      Testimonials.tsx        # Chapter VI
      Contact.tsx             # Chapter VII
    interactions/
      ChromaticHover.tsx      # RGB split wrapper for images
      TiltCard.tsx            # mouse-tilt + glow for cards
```

**Why this shape:** each chapter is one file you can hold in context. Three.js code is corralled in `three/` so a R3F upgrade doesn't ripple. The i18n module is a flat dictionary — no library — keeping bundle small.

---

## 6. Chapter Specifications

### Chapter I — Hero ("Printed in shadow")
- Fullscreen `<HeroDevice>` R3F canvas, single spotlight from above
- Top-left mono label: "СЕРИЯ I — РЕМЕСЛО" / "CHAPTER I — THE CRAFT"
- Center serif headline (clamp 5rem → 10rem): "Печать с **_характером_**." / "Printing with **_soul_**."
  - Italic word glows in `activeDevice`'s CMYK color
- Subtitle below in italic serif, dim paper: "С 2010 года." / "Since 2010."
- Bottom device-switcher: glass-morphic pill, 3 tabs — Printer (cyan) · T-Shirt Press (magenta) · Laminator (yellow). Switching tab morphs the 3D model with a 1.2s crossfade + glow color shift.
- Bottom-center "SCROLL ↓" thin label
- Page-load sequence (after Loader exits): spotlight fades in (0.6s) → headline mask-up reveal line-by-line (0.8s) → 3D device fades in from below with bloom (1.0s) → switcher slides up (0.4s)
- Mouse parallax on 3D scene, max 5° rotation

### Chapter II — About ("The hands behind the ink")  [BLOCKED — photo required]
- 2-column grid on desktop, stacked on mobile
- **Left:** tall narrow portrait photo of hands holding a freshly printed sheet, silhouetted — `PLACEHOLDER /public/photos/hands-paper.jpg`
- **Right:** chapter label, serif heading "Маленькая мастерская." / "A small workshop.", body paragraphs
- Body copy (placeholder, to be refined): the story of being there at 9am when someone needs a passport photo, open the night before a dissertation defense, treating every job like it matters.
- Sticky stat line, scrolls into view with stagger: "14+ ЛЕТ · 9 УСЛУГ · ТЫСЯЧИ КЛИЕНТОВ" / "14+ YEARS · 9 SERVICES · THOUSANDS OF CLIENTS"

### Chapter III — Services Showcase ("Every craft. Every format.")
Horizontal scroll-snap row of 9 tall portrait cards. Each card has a **stylized 3D-rendered icon-object** (no photos needed) representing the service, plus mono label + bilingual title. Hover: card grows 1.04×, RGB chromatic aberration on the icon, glow intensifies, RU+EN labels reveal.

| # | Service (RU / EN)                              | Glow color |
|---|------------------------------------------------|------------|
| 1 | Печать A4/A3 / A4/A3 Printing                  | cyan       |
| 2 | Ксерокопии / Photocopies                       | magenta    |
| 3 | Печать на фотобумаге / Photo Paper Printing    | yellow     |
| 4 | Фото на документы / ID & Passport Photos       | cyan       |
| 5 | Переплёт / Binding                             | magenta    |
| 6 | Ламинация / Lamination                         | yellow     |
| 7 | Сканирование / Document Scanning               | cyan       |
| 8 | Печать на футболках / T-Shirt Printing         | magenta    |
| 9 | Печать на ПВХ / PVC Printing                   | yellow     |

**No prices anywhere.** Each icon-object: a paper stack, glass scanner bar, glossy print sheet, single portrait spotlight ring, bound spine, reflective laminate sheet, scan line, heat-press fabric square, PVC panel — all built from R3F primitives.

### Chapter IV — Craft Showcase ("From file to physical")
Pinned section (GSAP ScrollTrigger `pin: true`, `scrub: true`) — 3D scene of a printer with a paper sheet feeding through. As scroll progresses, paper advances through stages:

| Scroll % | Stage              | Side panel copy (RU / EN)                  |
|----------|--------------------|--------------------------------------------|
| 0–20     | Blank sheet enters | "Чистый лист." / "A blank sheet."          |
| 20–40    | CMYK pass          | "Четыре цвета. Один отпечаток." / "Four colors. One impression." |
| 40–60    | Finished print     | "Чернила ложатся." / "Ink settles."        |
| 60–80    | Trimmed            | "Точный край." / "A precise edge."         |
| 80–100   | Bound              | "Готово к рукам." / "Ready for hands."     |

Camera dollies slightly forward per stage. CMYK rim light on the paper intensifies during the CMYK-pass stage.

### Chapter V — Gallery ("Step inside")  [BLOCKED — photos required]
- Chapter label "СЕРИЯ V — ГАЛЕРЕЯ / CHAPTER V — GALLERY"
- Asymmetric CSS-grid of 9–12 images (shop interior/exterior/equipment close-ups/finished work)
- Placeholder slots: `/public/photos/gallery/01.jpg` … `12.jpg`
- Each image: loads with a small rotation (random ±2°) and fade-in blur (10px → 0)
- Hover: scale 1.05, RGB chromatic split via `<ChromaticHover>`, tilt 4°, mono caption appears below
- Click → fullscreen cinematic lightbox with black backdrop and CMYK accent corner marks

### Chapter VI — Testimonials ("The mark remains")
- Dark section, 3–6 quote cards floating in 3D space with Z-offset (mouse parallax drives subtle X/Y/Z shift)
- Card structure: giant CMYK quote mark (alternating C/M/Y per card), serif testimonial body, mono caps name, 5 stars in same CMYK color
- **Content source:** real reviews pulled from the Yandex Maps listing, attributed by first name + last initial, translated to EN
  - To be collected before implementation begins. Cite source as "Yandex Maps · {date}" in mono micro-label
- Bottom link: "ВСЕ ОТЗЫВЫ НА ЯНДЕКС.КАРТАХ" / "ALL REVIEWS ON YANDEX MAPS" → `https://yandex.com/maps/-/CPcUiZNP`

### Chapter VII — Contact ("Come find us")
- Massive serif headline center: "Заходите." / "Drop by."
- 2-column layout below: info cards (left) + map (right)
- **3 glass-morphic info cards** with CMYK icon glow:
  - Address (cyan pin icon) — pulled from Yandex Maps page, to be confirmed
  - Phone (magenta phone icon) — pulled from Yandex Maps page, to be confirmed
  - Hours (yellow clock icon) — pulled from Yandex Maps page, to be confirmed
- Right: embedded Yandex Maps iframe with `filter: invert(0.92) hue-rotate(180deg) contrast(0.9)` for dark mode, single bright CMYK pin overlay
- Below map: primary CTA button, solid yellow `#f0b020` bg, black text — "ОТКРЫТЬ ЯНДЕКС.КАРТЫ" / "OPEN YANDEX MAPS" → Yandex link
- **Final scroll sequence:** fade-to-black, Astoria gold wordmark logo emerges center, CMYK swirls glow one by one (cyan → magenta → yellow with 200ms stagger), "EST. 2010" types in below in mono

### Footer
- Pure black, single thin top border in `paper-mute`
- Left: "Astoria" wordmark, small
- Center: "Сделано с заботой о деталях" / "Made with care for the details"
- Right: 4 CMYK dots (C · M · Y · K) with subtle pulse
- Bottom-left: © 2010–2026 Astoria
- Bottom-right: (reserved for social handle if provided)

---

## 7. Cross-cutting Systems

### Loading Screen (`<Loader>`)
- Pure black, centered tiny printer silhouette
- A paper sheet animates sliding out of the printer (0.8s)
- Four CMYK ink lines register one by one across the sheet (C → M → Y → K, 200ms apart)
- Sheet settles, then "ASTORIA" gold wordmark fades in (0.6s)
- Whole thing dismisses after 2.4s OR when all assets are ready (whichever later, max 4s)
- Reduced-motion: shows logo only, 0.4s fade

### Bilingual System
- `useUIStore` holds `language: 'ru' | 'en'`
- Default: `ru`
- Persisted to `localStorage` key `astoria.lang`
- Pill toggle in navbar: `RU · EN`
- Switching language re-renders all `<BiText>` instances; no re-route
- `useT()` hook returns the dictionary for current language

### Mouse Glow
- Fixed full-viewport `<div>` with radial gradient, pointer-events none
- Color slowly cycles cyan → magenta → yellow on a 12s loop
- Cursor position updates via `requestAnimationFrame`, eased
- Hidden when `prefers-reduced-motion`

### Ink Particles
- R3F instanced point cloud in the hero canvas, ~120 particles
- Slow drift on Y, occasional CMYK glow flicker
- Disposed on unmount

### Ink-Bleed Transition Between Chapters
- A full-viewport WebGL plane with a noise/displacement shader
- Triggered on scroll past chapter boundary
- Bleeds in matching CMYK color for ~700ms, then dissipates

### Chromatic Aberration on Hover
- `<ChromaticHover>` component: wraps an `<img>` in 3 layered copies with R/G/B channel filters, offset on hover by `mix-blend-mode: screen`
- Used in Services and Gallery

### Performance Budget
- LCP < 2.5s on 4G
- Initial JS < 250KB gzipped (3D + GSAP code-split per chapter via `React.lazy`)
- Three.js scenes disposed on unmount via cleanup effect
- `will-change` only on actively animating elements; removed when idle
- Lenis is the single source of scroll; GSAP ScrollTrigger uses `scrollerProxy` against Lenis

---

## 8. Accessibility

- All decorative WebGL has `aria-hidden`
- Bilingual content uses `lang="ru"` / `lang="en"` on the rendered element
- Focus rings: 2px CMYK-cyan, 4px offset, visible
- Keyboard reaches: nav links, lang toggle, device switcher (arrow keys), service cards, gallery lightbox, CTA button
- `prefers-reduced-motion`: disables Lenis smoothing, particle drift, chromatic aberration, parallax, ink-bleed; keeps fades at ≤0.3s
- Color contrast: paper on void = 17.4:1 ✓
- Lightbox traps focus and returns it on close

---

## 9. Content Status (Blockers Before Build)

| Item                       | Status              | Owner    |
|----------------------------|---------------------|----------|
| About chapter photo        | Awaiting client     | Client   |
| Gallery photos (9–12)      | Awaiting client     | Client   |
| Logo SVG (gold wordmark)   | Awaiting client     | Client   |
| Astoria About body copy    | Will draft, then confirm with client | Claude → Client |
| Testimonials (3–6 reviews) | Pull from Yandex Maps page          | Claude   |
| Address / Phone / Hours    | Pull from Yandex Maps page, confirm | Claude → Client |
| 3D models (printer/press/laminator) | Build in code with R3F primitives | Claude |

**Implementation does not begin until all photos and logo are delivered.**

---

## 10. Out of Scope (Explicitly)

- Multiple pages / routing
- CMS / content management
- Contact form (Yandex Maps CTA replaces it)
- E-commerce / pricing display
- Blog / news section
- Analytics
- Cookie banner (no tracking → none needed for now)
- Service worker / PWA
- Server-side rendering (Vite SPA only)

---

## 11. Success Criteria

- Visiting on a modern laptop in Chrome: site loads in under 3s, runs at sustained 60fps through all 7 chapter scrolls
- Bilingual toggle persists across reloads
- All 9 services visible without prices
- Yandex Maps CTA is reachable in ≤2 scrolls from anywhere via the navbar
- No layout shift after Loader exits
- `prefers-reduced-motion` produces a calm, usable static version
- Lighthouse Performance ≥ 85, Accessibility ≥ 95

---

## 12. Next Step

Once this spec is approved, invoke the **writing-plans** skill to produce a step-by-step implementation plan with task ordering, dependencies, and review checkpoints. Implementation does not begin until the client has delivered photos.
