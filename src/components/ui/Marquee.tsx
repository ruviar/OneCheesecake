"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

interface MarqueeProps {
  text: string;
  /** Segundos que tarda media pista en recorrerse (menor = más rápido) */
  speed?: number;
  className?: string;
}

const REPEATS_PER_HALF = 4;

// Cinta infinita: dos mitades idénticas, xPercent -50 en loop = bucle perfecto.
export default function Marquee({ text, speed = 22, className = "" }: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-marquee-track]", {
          xPercent: -50,
          ease: "none",
          duration: speed,
          repeat: -1,
        });
      });
    },
    { scope: wrapRef },
  );

  const items = Array.from({ length: REPEATS_PER_HALF * 2 });

  return (
    <div
      ref={wrapRef}
      role="marquee"
      aria-label={text}
      className={`overflow-hidden bg-chocolate py-3 md:py-4 ${className}`}
    >
      <div
        data-marquee-track
        aria-hidden
        className="flex w-max items-center gap-8 whitespace-nowrap md:gap-12"
      >
        {items.map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-xl uppercase italic tracking-wide text-cream md:gap-12 md:text-2xl"
          >
            {text}
            <span className="not-italic text-gold" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
