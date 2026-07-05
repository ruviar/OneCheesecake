# One Cheesecake — Project Context

## Stack detectado / activo
- Next.js 14 (App Router) + TypeScript estricto
- Tailwind CSS 3 (colores de marca en `tailwind.config.ts`)
- GSAP 3 + ScrollTrigger (animaciones scroll-linked y floating)
- Framer Motion (reservado para micro-UI; aún no usado)
- Fuentes Google: Fraunces, Shrikhand, Caveat, Quicksand (vía `next/font`)

## Estructura
- `src/app/` — layout, page, globals
- `src/components/` — secciones (Hero, Marquee, FlavorGallery, FlyingToppings, MenuVintage, Header, Footer)
- `src/hooks/` — `useParallax`, `useFloatingAnimation`, `useIsomorphicLayoutEffect`
- `src/lib/gsap.ts` — registro centralizado de plugins
- `src/data/menu.ts` — datos del menú (sabores, toppings, packs, bebidas)
- `public/images/` — assets PNG/WebP transparentes (pendiente de cargar)

## Decisiones de diseño relevantes
- Paleta `cream / dustyblue / choco / gold` en `tailwind.config.ts` con escalas.
- Hero usa parallax 4-capas (`bg`, `mid`, `fg`, `fg-right`) con scrub.
- `useFloatingAnimation` aplica bobbing + rotación + repulsión de cursor; respeta `prefers-reduced-motion`.
- `FlavorGallery` pin + scroll horizontal con cards escalando al entrar.
- Marquee con animación CSS (`@keyframes marquee` en config Tailwind) — sin coste JS.

## Próximos pasos sugeridos
- Sustituir blobs decorativos de Hero/Toppings por PNG/WebP reales.
- Añadir sección de Ubicación con iframe de Google Maps.
- Cookie banner + meta SEO local Zaragoza.
- Imagen OG.
