# One Cheesecake — Contexto del proyecto

Landing e-commerce premium para tienda take-away de tartas de queso en Zaragoza.
Estética "Melt Cakes" (meltcakes.com): minimalista, cream, producto protagonista.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript estricto
- Tailwind CSS 3.4 (config en `tailwind.config.ts`)
- Lenis (`lenis/react`) sincronizado con `gsap.ticker` (autoRaf: false)
- GSAP 3.13 + @gsap/react: registro central en `src/lib/gsap.ts` (importar SIEMPRE desde ahí)

## Decisiones
- Paleta estricta: cream #F6F3EB (fondo, nunca blanco), dusty-blue #7B96A6, chocolate #4A2E1B (texto), gold #D4B872
- Fuentes: Fraunces (display), Caveat (accent), Quicksand (body) — via next/font, variables CSS
- Datos de negocio SOLO en `src/lib/data/menu.ts` (precios, horarios, transporte)
- Imágenes reales en `public/images/` — `tarta_croissant.png` es placeholder del "Especial del Mes: Caramelo y Pretzel"
- Utility `.container-melt` en globals.css para el layout con negative space

## Plan por fases (esperar confirmación del usuario entre fases)
1. ✅ Core: scaffold, Tailwind, fonts, Lenis+GSAP
2. ✅ Navbar sticky (blur al scroll, overlay móvil GSAP) + Hero "Melt": CHEESECAKE gigante
   con "One" en Caveat oro, porción real superpuesta (3 capas de parallax: scroll/float/ratón),
   sello giratorio "DESDE 1€" (ui/RotatingBadge), marquee infinito (ui/Marquee reutilizable)
3. ✅ Galería horizontal pinned (sections/CakeGallery): pista 52vw intro + 6×66vw,
   containerAnimation para reveals/parallax por panel, barra de progreso gold,
   degrada a stack vertical en <768px o reduced-motion. Campo `note` añadido a Cake.
4. ✅ Grid asimétrico (sections/ToppingsGrid + PacksSection): toppings como nube de
   etiquetas Caveat (tamaños/rotaciones ciclados, reveal barajado con back.out),
   bebidas en línea utilitaria, packs como "ecuación tipográfica" en escalera.
   Campos `tagline`/`highlight` añadidos a Pack.
5. ✅ Footer chocolate (layout/Footer): mascota asomándose con elastic.out + wiggle
   en hover, marquee-bookend del slogan, grid Dónde/Cuándo/Tranvía/Bus (chips),
   CTA Google Maps (BUSINESS.mapsUrl), barra legal.

## Features UX obligatorias — TODAS implementadas
- ✅ Marquee hero + bookend footer (ui/Marquee)
- ✅ Zero-gravity background (ui/ZeroGravity): 8 blobs deterministas (SSR-safe),
  deriva aleatoria solo en tweens, repeatRefresh, fixed -z-10
- ✅ Custom cursor (ui/CustomCursor): quickTo, expande sobre a/button/[data-cursor-hover],
  solo (pointer:fine) + no-reduced-motion; html.custom-cursor oculta el nativo
- ✅ Mascota rubber-hose en footer

PROYECTO COMPLETO (5/5 fases) + iteración post-feedback:
- Scroll horizontal eliminado → tartas en grid masonry; packs alineados (slot fijo
  + mt-auto); toppings con fotos reales en /public/images/toppings/{type}-{slug}.png;
  custom cursor eliminado; especial del mes = El Croissant (la clásica con croissant).

## Deploy
- Producción: https://one-cheesecake.vercel.app (proyecto Vercel: one-cheesecake)
- Repo: https://github.com/ruviar/OneCheesecake (conectado a Vercel)
- CI/CD: `git push` a main = deploy automático a producción. NO usar `vercel deploy` manual.
- El historial antiguo del repo se conservó vía merge -s ours (a8a76bb).

## Convenciones de animación
- Todo motion dentro de gsap.matchMedia("(prefers-reduced-motion: no-preference)")
- Capas separadas cuando varios tweens tocan la misma propiedad (ver Hero: parallax/float/ratón)
- Navegación por anclas SIEMPRE con ui/ScrollLink (Lenis scrollTo, offset -88 por navbar fija)
- Las tartas son PNG horizontales 2816×1536 (¡no verticales!) — diseñar la galería en consecuencia
