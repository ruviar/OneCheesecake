"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { FLAVORS } from "@/data/menu";

/**
 * Scroll-driven flavor showcase: giant cheesecake rotates while flavor
 * names cycle on the left with staggered fade-up transitions.
 * Uses ScrollTrigger pin for a full-viewport sticky experience.
 */
export function FlavorScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cakeRef = useRef<HTMLDivElement | null>(null);
  const textTrackRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const cake = cakeRef.current;
    const textTrack = textTrackRef.current;
    if (!section || !cake || !textTrack) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const flavorSlides = gsap.utils.toArray<HTMLElement>(
        textTrack.querySelectorAll("[data-flavor-slide]")
      );

      // Main timeline pinned to the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Each flavor gets a full viewport of scroll distance
          end: () => `+=${window.innerHeight * FLAVORS.length}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Rotate cheesecake 360° across the full scroll
      if (!prefersReduced) {
        tl.to(
          cake,
          {
            rotation: 360,
            ease: "none",
            duration: FLAVORS.length,
          },
          0
        );
      }

      // Cycle through flavor text slides
      flavorSlides.forEach((slide, i) => {
        if (i === 0) {
          // First slide is already visible
          tl.to(
            slide,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
            },
            0
          );
          // Fade out first slide before second comes in
          if (flavorSlides.length > 1) {
            tl.to(
              slide,
              {
                opacity: 0,
                y: -40,
                duration: 0.3,
              },
              0.7
            );
          }
        } else {
          const startTime = i;
          // Fade in
          tl.fromTo(
            slide,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
            },
            startTime
          );
          // Fade out (not on the last slide)
          if (i < flavorSlides.length - 1) {
            tl.to(
              slide,
              {
                opacity: 0,
                y: -40,
                duration: 0.3,
              },
              startTime + 0.7
            );
          }
        }
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id="carta"
      ref={sectionRef}
      className="relative flex h-[100svh] items-center overflow-hidden bg-cream-100"
      aria-label="Galería de sabores"
    >
      {/* Decorative accent blobs */}
      <div
        className="absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-dustyblue-500/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-500/15 blur-[80px]"
        aria-hidden
      />

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-15 mix-blend-multiply" />

      <div className="container-cake relative z-10 grid h-full grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.2fr] lg:grid-cols-[0.8fr_1.4fr]">
        {/* Left: Flavor text that cycles */}
        <div className="relative flex flex-col justify-center py-20">
          <span className="pill mb-6 self-start">La carta</span>

          {/* Stacked slides — only one visible at a time */}
          <div ref={textTrackRef} className="relative min-h-[240px]">
            {FLAVORS.map((flavor, i) => (
              <div
                key={flavor.id}
                data-flavor-slide
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="font-hand text-xl text-dustyblue-700 md:text-2xl">
                  {flavor.tagline}
                </p>
                <h2 className="mt-2 font-shrik text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92] text-choco-700">
                  {flavor.name}
                </h2>

                <div className="mt-6 flex items-end gap-8">
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-choco-700/60">
                      Porción
                    </p>
                    <p className="font-display text-4xl font-black text-choco-700 md:text-5xl">
                      {flavor.portion}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-choco-700/60">
                      Entera
                    </p>
                    <p className="font-display text-3xl font-black text-choco-500 md:text-4xl">
                      {flavor.whole}
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-hand text-lg text-gold-700">
                  {i + 1} / {FLAVORS.length}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Giant cheesecake — 80%+ viewport, bleeds off the edge */}
        <div className="relative flex items-center justify-center md:justify-end">
          <div
            ref={cakeRef}
            className="relative w-[75vw] max-w-[700px] md:w-[55vw] md:translate-x-[12%] lg:w-[48vw]"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/images/cheesecake-top.png"
              alt="Tarta de queso vista cenital"
              width={800}
              height={800}
              className="h-auto w-full object-contain drop-shadow-[0_20px_60px_rgba(74,46,27,0.25)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center" aria-hidden>
        <p className="font-hand text-sm text-choco-700/50">
          scroll para explorar sabores ↓
        </p>
      </div>
    </section>
  );
}
