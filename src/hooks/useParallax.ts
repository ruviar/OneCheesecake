"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type ParallaxLayer = {
  selector: string;
  /** Translation in px applied across the scrub range (negative = upwards). */
  y?: number;
  /** Optional scale delta applied across the scrub range. */
  scale?: number;
  /** Optional rotation delta in degrees. */
  rotation?: number;
};

/**
 * Pin a section and parallax-translate inner layers as the user scrolls.
 * Attach the returned ref to the section element.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  layers: ParallaxLayer[],
  options?: { scrub?: number | boolean; start?: string; end?: string }
) {
  const sectionRef = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: options?.start ?? "top top",
          end: options?.end ?? "bottom top",
          scrub: options?.scrub ?? 0.6,
        },
      });

      layers.forEach((layer) => {
        const targets = section.querySelectorAll(layer.selector);
        if (targets.length === 0) return;
        tl.to(
          targets,
          {
            y: layer.y ?? 0,
            scale: layer.scale != null ? 1 + layer.scale : 1,
            rotation: layer.rotation ?? 0,
            ease: "none",
          },
          0
        );
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [layers, options]);

  return sectionRef;
}
