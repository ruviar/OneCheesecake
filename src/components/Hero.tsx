"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { useFloatingAnimation } from "@/hooks/useFloatingAnimation";

/**
 * Zero Gravity Hero — photorealistic food PNGs float around the headline
 * with asymmetric GSAP yoyo + mouse-repel parallax.
 */

type FloatingAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  layer: "fg" | "fg-right";
};

const FLOATING_ASSETS: FloatingAsset[] = [
  {
    src: "/images/floating-lotus.png",
    alt: "Galleta Lotus",
    width: 220,
    height: 220,
    className:
      "absolute -left-4 bottom-[12%] w-[140px] md:w-[220px] -rotate-12 drop-shadow-2xl",
    layer: "fg",
  },
  {
    src: "/images/floating-pistachio-drip.png",
    alt: "Sirope de pistacho",
    width: 160,
    height: 200,
    className:
      "absolute right-[8%] top-[15%] w-[100px] md:w-[160px] rotate-6 drop-shadow-2xl",
    layer: "fg-right",
  },
  {
    src: "/images/floating-chipsahoy.png",
    alt: "Galleta Chips Ahoy",
    width: 180,
    height: 180,
    className:
      "absolute left-[15%] top-[8%] w-[110px] md:w-[180px] rotate-[18deg] drop-shadow-2xl",
    layer: "fg",
  },
  {
    src: "/images/hero-slice.png",
    alt: "Porción de tarta",
    width: 260,
    height: 260,
    className:
      "absolute -right-6 bottom-[8%] w-[160px] md:w-[260px] -rotate-[10deg] drop-shadow-2xl",
    layer: "fg-right",
  },
];

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
    amplitudeY: 18,
    rotation: 5,
    mouseRadius: 280,
    mouseStrength: 35,
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-[100svh] w-full items-center justify-center overflow-hidden bg-cream-100 pt-20 md:pt-24"
      aria-label="Inicio"
    >
      {/* Background ambient blobs — deep layer for depth */}
      <div
        data-layer="bg"
        className="absolute -left-32 top-1/3 -z-20 h-[640px] w-[640px] rounded-full bg-dustyblue-500/40 blur-[100px]"
      />
      <div
        data-layer="bg"
        className="absolute -right-40 -top-24 -z-20 h-[520px] w-[520px] rounded-full bg-gold-500/30 blur-[110px]"
      />
      <div
        data-layer="bg"
        className="absolute left-1/2 bottom-0 -z-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cream-300/60 blur-[80px]"
      />

      {/* Grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-noise opacity-20 mix-blend-multiply" />

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
          <span className="block text-[clamp(2.4rem,7vw,5.5rem)]">
            Un euro.
          </span>
          <span className="mt-1 block text-[clamp(2.4rem,7vw,5.5rem)] text-dustyblue-700">
            Un placer.
          </span>
          <span className="mt-1 block font-shrik text-[clamp(2.1rem,6vw,4.6rem)] text-choco-700">
            Una experiencia.
          </span>
        </h1>

        <p className="mt-6 max-w-xl font-body text-base md:text-lg text-choco-700/85">
          <span className="block">
            La tarta de queso más barata de Zaragoza.
          </span>
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

      {/* Foreground — floating photorealistic food PNGs (zero gravity) */}
      <div
        ref={floatRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
      >
        {FLOATING_ASSETS.map((asset) => (
          <div
            key={asset.src}
            data-layer={asset.layer}
            data-floating
            className={asset.className}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
