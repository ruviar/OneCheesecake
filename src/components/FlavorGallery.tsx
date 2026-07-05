"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { FLAVORS } from "@/data/menu";

const ACCENT_BG: Record<string, string> = {
  blue: "bg-dustyblue-500",
  gold: "bg-gold-500",
  choco: "bg-choco-200",
};

export function FlavorGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => `-${distance()}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-card]")
      );

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.86, rotate: -3, opacity: 0.75 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 85%",
              end: "right 20%",
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="carta"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-cream-100"
      aria-label="Galería de sabores"
    >
      <div
        ref={trackRef}
        className="flex h-full items-center gap-10 pl-[6vw] pr-[20vw] will-change-transform"
      >
        <div className="flex h-[60vh] w-[72vw] max-w-[480px] shrink-0 flex-col justify-center pr-6">
          <span className="pill self-start">La carta</span>
          <h2 className="mt-4 font-display font-black text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.95] text-choco-700">
            Elige tu<br />tarta.
          </h2>
        </div>

        {FLAVORS.map((f) => (
          <article
            key={f.id}
            data-card
            className="relative flex h-[60vh] w-[72vw] max-w-[480px] shrink-0 flex-col justify-between rounded-ticket border-2 border-choco-700 bg-cream-50 p-8 shadow-retro"
          >
            <div
              className={`absolute -right-10 -top-10 h-56 w-56 rounded-full ${ACCENT_BG[f.accent]} opacity-90`}
              aria-hidden
            />
            <div className="relative">
              <p className="pill">{f.id === "especial" ? "Limitado" : "Sabor"}</p>
              <h3 className="mt-4 font-shrik text-5xl leading-none text-choco-700">
                {f.name}
              </h3>
              <p className="mt-3 font-hand text-2xl text-dustyblue-700">
                {f.tagline}
              </p>
            </div>

            <div className="relative mt-auto">
              <div className="ticket-divider mb-4" />
              <div className="flex items-end justify-between font-body text-choco-700">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70">Porción</p>
                  <p className="font-display font-black text-3xl">{f.portion}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest opacity-70">Entera</p>
                  <p className="font-display font-black text-3xl">{f.whole}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
