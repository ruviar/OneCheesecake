"use client";

import { useRef } from "react";

import { formatPrice, PACKS } from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";


export default function PacksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-section-reveal]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        });

        gsap.from("[data-pack]", {
          y: 64,
          autoAlpha: 0,
          stagger: 0.16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-packs-grid]", start: "top 78%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="packs" className="container-melt pb-28 pt-12 md:pb-36 md:pt-16">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
        <h2
          data-section-reveal
          className="font-wonk font-display text-5xl font-semibold leading-[0.9] text-chocolate md:text-7xl"
        >
          Los Packs
        </h2>
        <p data-section-reveal className="pb-2 font-accent text-2xl text-dusty-blue md:text-3xl">
          las cuentas salen solas
        </p>
      </div>

      <div data-packs-grid className="mt-16 grid gap-16 md:mt-20 md:grid-cols-3 md:gap-12">
        {PACKS.map((pack) => (
          <article key={pack.id} data-pack className="flex flex-col">
            {/* Slot de altura fija: con o sin banner, todo arranca a la misma altura */}
            <div className="h-8">
              {pack.highlight && (
                <span className="inline-block -rotate-2 rounded-full bg-dusty-blue px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-cream">
                  {pack.highlight}
                </span>
              )}
            </div>
            <p className="mt-4 font-accent text-2xl text-dusty-blue">{pack.tagline}</p>
            <h3 className="font-wonk mt-1 font-display text-3xl font-semibold text-chocolate md:text-4xl">
              {pack.name}
            </h3>

            {/* La fórmula del combo como ecuación tipográfica */}
            <ul className="mb-5 mt-6 space-y-2 font-sans text-base font-semibold text-chocolate/80 md:text-lg">
              {pack.description.split(" + ").map((part, j) => (
                <li key={part} className="flex items-baseline gap-3">
                  <span aria-hidden className={`font-display text-gold ${j === 0 ? "invisible" : ""}`}>
                    +
                  </span>
                  {part}
                </li>
              ))}
            </ul>
            {/* mt-auto ancla la línea de total abajo: los tres precios quedan a ras */}
            <p className="mt-auto border-t-2 border-chocolate/15 pt-4 font-display text-5xl font-semibold text-chocolate md:text-6xl">
              {formatPrice(pack.price)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
