"use client";

import Image from "next/image";
import { useRef } from "react";

import { CAKES, formatPrice } from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

// Galería horizontal pinned: la pista se traslada en X mientras el usuario
// hace scroll vertical. En móvil o con reduced-motion degrada a stack vertical.
export default function CakeGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = (): number => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Barra de progreso de la galería
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Reveals y parallax interno por panel, medidos contra la pista (containerAnimation)
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);
        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-panel-reveal]"), {
            y: 48,
            autoAlpha: 0,
            stagger: 0.09,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 75%",
              once: true,
            },
          });

          const img = panel.querySelector("[data-panel-img]");
          if (img) {
            gsap.fromTo(
              img,
              { x: 70 },
              {
                x: -70,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          }
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="tartas" className="relative overflow-hidden">
      <div ref={trackRef} className="flex flex-col md:h-svh md:w-max md:flex-row">
        {/* Panel intro */}
        <div
          data-panel
          className="flex w-full shrink-0 flex-col justify-center px-6 pb-8 pt-24 md:h-full md:w-[52vw] md:px-20 md:py-0"
        >
          <p data-panel-reveal className="font-accent text-2xl text-dusty-blue md:text-3xl">
            Recién hechas, de horno a caja
          </p>
          <h2
            data-panel-reveal
            className="font-wonk mt-3 font-display text-6xl font-semibold leading-[0.9] text-chocolate md:text-8xl"
          >
            Las Tartas
          </h2>
          <p data-panel-reveal className="mt-6 max-w-md text-base text-chocolate/70 md:text-lg">
            Seis sabores, una obsesión: la textura. Elige tu porción o llévate la
            tarta entera a casa.
          </p>
          <p
            data-panel-reveal
            className="mt-10 hidden items-center gap-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-chocolate/50 md:flex"
          >
            Desliza
            <span aria-hidden className="animate-nudge inline-block">
              →
            </span>
          </p>
        </div>

        {/* Paneles de tartas */}
        {CAKES.map((cake, i) => (
          <article
            key={cake.id}
            data-panel
            className={`flex w-full shrink-0 flex-col justify-center px-6 py-14 md:h-full md:w-[66vw] md:px-16 md:py-0 ${
              i === CAKES.length - 1 ? "md:pr-[12vw]" : ""
            }`}
          >
            <div
              className={`relative mx-auto w-[min(88vw,560px)] md:w-[44vw] ${
                i % 2 === 1 ? "md:translate-y-10" : "md:-translate-y-6"
              }`}
            >
              <div data-panel-img className="relative">
                <Image
                  src={cake.image}
                  alt={`Porción de tarta de queso ${cake.name}`}
                  width={2816}
                  height={1536}
                  sizes="(min-width: 768px) 44vw, 88vw"
                  className="h-auto w-full drop-shadow-[0_28px_40px_rgba(74,46,27,0.25)]"
                />
              </div>
              {cake.special && (
                <span className="absolute -top-3 right-2 rotate-3 rounded-full bg-dusty-blue px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-cream md:-top-1 md:text-sm">
                  Especial del mes
                </span>
              )}

              <div className="relative z-10 -mt-4 text-center md:-mt-8">
                <h3
                  data-panel-reveal
                  className="font-wonk font-display text-[clamp(2.6rem,4.8vw,4.9rem)] font-semibold leading-none text-chocolate"
                >
                  {cake.name}
                </h3>
                <p data-panel-reveal className="mt-2 font-accent text-2xl text-dusty-blue md:text-3xl">
                  {cake.note}
                </p>
                <p data-panel-reveal className="mt-4 font-sans font-semibold text-chocolate">
                  <span className="font-display text-2xl md:text-3xl">
                    {formatPrice(cake.slicePrice)}
                  </span>
                  <span className="text-chocolate/60"> / porción</span>
                  <span aria-hidden className="mx-3 text-gold">
                    ✦
                  </span>
                  <span className="text-chocolate/60">entera </span>
                  {formatPrice(cake.wholePrice)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progreso de la galería (solo desktop, donde hay pin) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center md:flex">
        <div className="h-[3px] w-48 overflow-hidden rounded-full bg-chocolate/10">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>
    </section>
  );
}
