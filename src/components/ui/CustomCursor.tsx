"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const INTERACTIVE = "a, button, [data-cursor-hover]";

// Punto chocolate que sigue al puntero y se expande sobre elementos clicables.
// Solo en dispositivos con puntero fino y sin reduced-motion; el cursor nativo
// se oculta via html.custom-cursor (ver globals.css).
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const dot = dotRef.current;
      if (!dot) return;

      document.documentElement.classList.add("custom-cursor");
      gsap.set(dot, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });

      let visible = false;
      let hovering = false;

      function baseScale(): number {
        return hovering ? 3.2 : 1;
      }

      function onMove(event: PointerEvent): void {
        xTo(event.clientX);
        yTo(event.clientY);
        if (!visible) {
          visible = true;
          gsap.to(dot, { autoAlpha: 1, duration: 0.25 });
        }
      }

      function onOver(event: PointerEvent): void {
        if (!(event.target instanceof Element)) return;
        if (!event.target.closest(INTERACTIVE)) return;
        hovering = true;
        gsap.to(dot, { scale: 3.2, opacity: 0.3, duration: 0.3 });
      }

      function onOut(event: PointerEvent): void {
        if (!(event.target instanceof Element)) return;
        if (!event.target.closest(INTERACTIVE)) return;
        hovering = false;
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      }

      function onDown(): void {
        gsap.to(dot, { scale: baseScale() * 0.7, duration: 0.15 });
      }

      function onUp(): void {
        gsap.to(dot, { scale: baseScale(), duration: 0.25, ease: "back.out(2)" });
      }

      function onLeave(): void {
        visible = false;
        gsap.to(dot, { autoAlpha: 0, duration: 0.25 });
      }

      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        document.documentElement.classList.remove("custom-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });
  });

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full bg-chocolate opacity-0"
    />
  );
}
