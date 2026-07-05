"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  COOKIE_TOPPINGS,
  DRINKS,
  formatPrice,
  SAUCE_TOPPINGS,
  TOPPING_PRICE,
} from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

interface ToppingItem {
  name: string;
  type: "sauce" | "cookie";
}

const ALL_TOPPINGS: ToppingItem[] = [
  ...SAUCE_TOPPINGS.map((name) => ({ name, type: "sauce" as const })),
  ...COOKIE_TOPPINGS.map((name) => ({ name, type: "cookie" as const })),
];

export default function ToppingsGrid() {
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

        gsap.from("[data-topping-card]", {
          y: 48,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-toppings-grid]", start: "top 80%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="toppings" className="container-melt py-28 md:py-40">
      {/* Cabecera */}
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <p data-section-reveal className="font-accent text-2xl text-dusty-blue md:text-3xl">
            tu porción, tus reglas
          </p>
          <h2
            data-section-reveal
            className="font-wonk mt-3 font-display text-5xl font-semibold leading-[0.9] text-chocolate md:text-7xl"
          >
            Móntatela
            <br />
            a tu gusto
          </h2>
        </div>
        <p
          data-section-reveal
          className="-rotate-2 pb-2 font-accent text-3xl leading-tight text-gold md:text-4xl"
        >
          cualquier topping
          <br />
          +{formatPrice(TOPPING_PRICE)}
        </p>
      </div>

      {/* Grid de toppings con imágenes */}
      <div
        data-toppings-grid
        className="mt-16 grid gap-6 md:mt-24 md:grid-cols-4 md:gap-8 sm:grid-cols-2"
      >
        {ALL_TOPPINGS.map((topping) => (
          <article key={topping.name} data-topping-card className="flex flex-col">
            {/* Placeholder para imagen (reemplazar con foto real) */}
            <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-chocolate/10 to-dusty-blue/10">
              <Image
                src={`/images/toppings/${topping.type}-${topping.name.toLowerCase().replace(/\s+/g, "-")}.png`}
                alt={topping.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.opacity = "0";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0">
                <span className="text-xs text-chocolate/30">
                  {topping.name.toLowerCase()}
                </span>
              </div>
            </div>

            <h3 className="font-sans font-semibold text-chocolate">{topping.name}</h3>
            <p className="mt-1 text-sm font-semibold text-chocolate/60">
              +{formatPrice(TOPPING_PRICE)}
            </p>
          </article>
        ))}
      </div>

      {/* Bebidas */}
      <p
        data-section-reveal
        className="mt-20 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-chocolate/60 md:mt-28 md:text-sm"
      >
        <span className="text-chocolate/40">Para acompañar — </span>
        {DRINKS.map((drink, i) => (
          <span key={drink.name}>
            {drink.name} {formatPrice(drink.price)}
            {i < DRINKS.length - 1 && (
              <span aria-hidden className="mx-3 text-gold">
                ✦
              </span>
            )}
          </span>
        ))}
      </p>
    </section>
  );
}
