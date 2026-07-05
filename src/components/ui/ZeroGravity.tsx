"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

// Migas y gotas difuminadas que derivan lentamente por el viewport.
// Posiciones deterministas (SSR-safe); la aleatoriedad vive solo en los tweens.
const BLOBS = [
  { className: "left-[8%] top-[12%] h-24 w-24 bg-gold/20 blur-xl", drift: 90 },
  { className: "right-[10%] top-[22%] h-14 w-14 bg-dusty-blue/25 blur-lg", drift: 70 },
  { className: "left-[18%] top-[55%] h-32 w-32 bg-dusty-blue/15 blur-2xl", drift: 110 },
  { className: "right-[20%] top-[64%] h-16 w-16 bg-chocolate/10 blur-lg", drift: 60 },
  { className: "left-[46%] top-[28%] h-10 w-10 bg-chocolate/15 blur-md", drift: 80 },
  { className: "right-[34%] top-[82%] h-20 w-20 bg-gold/15 blur-xl", drift: 100 },
  { className: "left-[10%] top-[86%] h-12 w-12 bg-gold/20 blur-lg", drift: 60 },
  { className: "right-[6%] top-[46%] h-28 w-28 bg-dusty-blue/10 blur-2xl", drift: 120 },
] as const;

export default function ZeroGravity() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-blob]").forEach((blob) => {
          const drift = Number(blob.dataset.drift ?? 60);
          gsap.to(blob, {
            x: () => gsap.utils.random(-drift, drift),
            y: () => gsap.utils.random(-drift, drift),
            rotation: () => gsap.utils.random(-45, 45),
            duration: () => gsap.utils.random(10, 20),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            repeatRefresh: true, // nueva deriva aleatoria en cada ciclo
            delay: gsap.utils.random(0, 4),
          });
        });
      });
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          data-blob
          data-drift={blob.drift}
          className={`absolute rounded-full will-change-transform ${blob.className}`}
        />
      ))}
    </div>
  );
}
