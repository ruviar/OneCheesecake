"use client";

import Image from "next/image";
import { useRef } from "react";

import { CAKES, type Cake, formatPrice } from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

function CakeCard({ cake, featured = false }: { cake: Cake; featured?: boolean }) {
  return (
    <article
      data-cake-card
      className={`flex flex-col ${featured ? "items-center text-center" : ""}`}
    >
      {cake.special && (
        <span className="mb-2 inline-block w-fit -rotate-2 rounded-full bg-dusty-blue px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-cream">
          Especial del mes
        </span>
      )}

      <div className="relative w-full">
        <Image
          src={cake.image}
          alt={`Porción de tarta de queso ${cake.name}`}
          width={2816}
          height={1536}
          sizes={
            featured
              ? "(min-width: 768px) 640px, 100%"
              : "(min-width: 768px) calc(33.333% - 27px), 100%"
          }
          priority={featured}
          className="h-auto w-full rounded-sm drop-shadow-[0_24px_36px_rgba(74,46,27,0.2)]"
        />
      </div>

      <div className="relative z-10 -mt-3 md:-mt-5">
        <h3
          className={`font-wonk font-display font-semibold leading-none text-chocolate ${
            featured ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
          }`}
        >
          {cake.name}
        </h3>
        <p
          className={`mt-2 font-accent text-dusty-blue ${
            featured ? "text-xl md:text-2xl" : "text-lg md:text-xl"
          }`}
        >
          {cake.note}
        </p>
        <p className="mt-3 font-sans text-sm font-semibold text-chocolate">
          <span
            className={`font-display ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
          >
            {formatPrice(cake.slicePrice)}
          </span>
          <span className="text-chocolate/60"> / porción</span>
          <span aria-hidden className="mx-2 text-gold">
            ✦
          </span>
          <span className="text-chocolate/60">entera </span>
          {formatPrice(cake.wholePrice)}
        </p>
      </div>
    </article>
  );
}

// Especial del mes destacada arriba y centrada; el resto en grid alineado.
export default function CakeGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = CAKES.find((cake) => cake.special);
  const rest = CAKES.filter((cake) => !cake.special);

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

        gsap.from("[data-cake-card]", {
          y: 64,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cakes-grid]", start: "top 75%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="tartas" className="container-melt py-28 md:py-40">
      {/* Cabecera */}
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <p data-section-reveal className="font-accent text-2xl text-dusty-blue md:text-3xl">
            Recién hechas, de horno a caja
          </p>
          <h2
            data-section-reveal
            className="font-wonk mt-3 font-display text-5xl font-semibold leading-[0.9] text-chocolate md:text-7xl"
          >
            Las Tartas
          </h2>
        </div>
        <p data-section-reveal className="pb-2 font-accent text-xl text-dusty-blue md:text-2xl">
          seis sabores,
          <br />
          una obsesión
        </p>
      </div>

      {/* Especial del mes: destacada, grande y centrada */}
      <div data-cakes-grid className="mt-16 md:mt-24">
        {featured && (
          <div className="mx-auto max-w-lg md:max-w-2xl">
            <CakeCard cake={featured} featured />
          </div>
        )}

        {/* Resto, alineadas en filas limpias */}
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
          {rest.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </div>
    </section>
  );
}
