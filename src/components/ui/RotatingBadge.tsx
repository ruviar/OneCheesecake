"use client";

import { useId, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

interface RotatingBadgeProps {
  /** Texto que rodea el círculo (debe caber en ~460 unidades de circunferencia) */
  text: string;
  /** Contenido fijo del centro (no rota) */
  center?: React.ReactNode;
  className?: string;
}

// Sello giratorio estilo sticker: texto en círculo SVG + centro estático.
export default function RotatingBadge({ text, center, className = "" }: RotatingBadgeProps) {
  const ringRef = useRef<SVGSVGElement>(null);
  const pathId = useId();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 26,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    });
  });

  return (
    <div
      aria-hidden
      className={`relative flex aspect-square items-center justify-center rounded-full bg-gold ${className}`}
    >
      <svg ref={ringRef} viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id={pathId}
            d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>
        <text className="fill-chocolate font-sans text-[13px] font-bold uppercase tracking-[0.18em]">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="font-display text-3xl font-semibold text-chocolate md:text-4xl">
        {center ?? "1€"}
      </span>
    </div>
  );
}
