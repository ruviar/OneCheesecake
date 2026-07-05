"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export type FloatingOptions = {
  /** CSS selector for the floating items inside the container. Default: '[data-floating]'. */
  selector?: string;
  /** Max vertical bob amplitude in px. Default 18. */
  amplitudeY?: number;
  /** Max rotation in degrees. Default 6. */
  rotation?: number;
  /** Mouse repel radius in px. Items inside react. Default 220. */
  mouseRadius?: number;
  /** Max mouse displacement in px. Default 38. */
  mouseStrength?: number;
  /** Disable mouse parallax (useful on touch / reduced motion). */
  disableMouse?: boolean;
};

/**
 * Continuous slow floating + rotation for decorative PNGs, plus mouse-repel parallax.
 * Attach the returned ref to a container; descendants matching `selector` will animate.
 */
export function useFloatingAnimation<T extends HTMLElement = HTMLDivElement>(
  options: FloatingOptions = {}
) {
  const containerRef = useRef<T | null>(null);

  const {
    selector = "[data-floating]",
    amplitudeY = 18,
    rotation = 6,
    mouseRadius = 220,
    mouseStrength = 38,
    disableMouse = false,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(selector)
    );
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        gsap.set(el, { willChange: "transform" });

        if (prefersReduced) return;

        const dur = gsap.utils.random(4.5, 7.5);
        const yA = gsap.utils.random(amplitudeY * 0.5, amplitudeY);
        const rA = gsap.utils.random(rotation * 0.4, rotation);

        gsap.to(el, {
          y: `+=${yA}`,
          rotation: `+=${rA}`,
          duration: dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });

        gsap.to(el, {
          y: `-=${yA * 0.6}`,
          duration: dur * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2 + 0.5,
        });
      });

      if (disableMouse || prefersReduced) return;

      const quickSetters = items.map((el) => ({
        el,
        x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
      }));

      const onMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        quickSetters.forEach(({ el, x, y }) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2 - rect.left;
          const cy = r.top + r.height / 2 - rect.top;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * mouseStrength;
            const ang = Math.atan2(dy, dx);
            x(Math.cos(ang) * force);
            y(Math.sin(ang) * force);
          } else {
            x(0);
            y(0);
          }
        });
      };

      const onLeave = () => {
        quickSetters.forEach(({ x, y }) => {
          x(0);
          y(0);
        });
      };

      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);

      return () => {
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerleave", onLeave);
      };
    }, container);

    return () => ctx.revert();
  }, [
    selector,
    amplitudeY,
    rotation,
    mouseRadius,
    mouseStrength,
    disableMouse,
  ]);

  return containerRef;
}
