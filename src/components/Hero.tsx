"use client";

import { useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useFloatingAnimation } from "@/hooks/useFloatingAnimation";

/**
 * Deep-parallax hero. Three Z-stacked layers scrub independently against scroll:
 *   bg   → moves up slowly (deep background)
 *   mid  → main typography, moves up moderately
 *   fg   → blurred close-to-lens elements, move up fastest (depth-of-field)
 */
export function Hero() {
  const layers = useMemo(
    () => [
      { selector: "[data-layer='bg']", y: -80, scale: 0.05 },
      { selector: "[data-layer='mid']", y: -180 },
      { selector: "[data-layer='fg']", y: -360, rotation: -4 },
      { selector: "[data-layer='fg-right']", y: -420, rotation: 6 },
    ],
    []
  );

  const sectionRef = useParallax<HTMLDivElement>(layers, {
    scrub: 0.7,
    start: "top top",
    end: "bottom top",
  });

  const floatRef = useFloatingAnimation<HTMLDivElement>({
    selector: "[data-floating]",
    amplitudeY: 14,
    rotation: 4,
    mouseRadius: 260,
    mouseStrength: 30,
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-[100svh] w-full items-center justify-center overflow-hidden bg-cream-100 pt-20 md:pt-24"
      aria-label="Inicio"
    >
      {/* Background dusty blue blob — deep layer */}
      <div
        data-layer="bg"
        className="absolute -left-32 top-1/3 -z-20 h-[640px] w-[640px] rounded-full bg-dustyblue-500/55 blur-[80px]"
      />
      <div
        data-layer="bg"
        className="absolute -right-40 -top-24 -z-20 h-[520px] w-[520px] rounded-full bg-gold-500/40 blur-[90px]"
      />

      {/* Grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-noise opacity-25 mix-blend-multiply" />

      {/* Midground — brand messaging */}
      <div
        data-layer="mid"
        className="container-cake relative z-20 flex flex-col items-center text-center"
      >
        <span className="pill mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-dustyblue-500" />
          Take away · Zaragoza
        </span>

        <h1 className="mx-auto font-display font-black text-balance leading-[1.05] tracking-tight text-choco-700">
          <span className="block text-[clamp(2.4rem,7vw,5.5rem)]">Un euro.</span>
          <span className="mt-1 block text-[clamp(2.4rem,7vw,5.5rem)] text-dustyblue-700">
            Un placer.
          </span>
          <span className="mt-1 block font-shrik text-[clamp(2.1rem,6vw,4.6rem)] text-choco-700">
            Una experiencia.
          </span>
        </h1>

        <p className="mt-6 max-w-xl font-body text-base md:text-lg text-choco-700/85">
          <span className="block">La tarta de queso más barata de Zaragoza.</span>
          <span className="mt-2 block font-hand text-2xl text-dustyblue-700">
            Solo para amantes del cheesecake 💛
          </span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#carta" className="btn-retro btn-retro--blue">
            Descubre nuestra carta
          </a>
          <a href="#ubicacion" className="btn-retro">
            Cómo llegar
          </a>
        </div>
      </div>

      {/* Foreground — out-of-focus close PNGs sitting BEHIND text (z-0).
          Replace with /public/images/*.webp when assets are ready. */}
      <div
        ref={floatRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div
          data-layer="fg"
          data-floating
          className="absolute -left-10 bottom-[-90px] h-72 w-72 rounded-[42%_58%_55%_45%/50%_45%_55%_50%] bg-gold-300/80 blur-[6px]"
        />
        <div
          data-layer="fg"
          data-floating
          className="absolute left-1/4 -bottom-32 h-48 w-48 rounded-full bg-choco-200/80 blur-[3px]"
        />
        <div
          data-layer="fg-right"
          data-floating
          className="absolute -right-16 bottom-0 h-80 w-80 rounded-[55%_45%_60%_40%/45%_55%_45%_55%] bg-dustyblue-300/85 blur-[5px]"
        />
        <div
          data-layer="fg-right"
          data-floating
          className="absolute right-1/3 top-8 h-28 w-28 rounded-full bg-cream-200/90 blur-[2px]"
        />
      </div>
    </section>
  );
}
