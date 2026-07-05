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

/** "Dulce de Leche" -> "/images/toppings/sauce-dulce-de-leche.png" */
function toppingImage(type: "sauce" | "cookie", name: string): string {
  return `/images/toppings/${type}-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
}

function ToppingGroup({
  title,
  type,
  items,
}: {
  title: string;
  type: "sauce" | "cookie";
  items: readonly string[];
}) {
  return (
    <div data-topping-group>
      <h3 className="flex items-center gap-4 font-sans text-sm font-bold uppercase tracking-[0.25em] text-chocolate/50">
        {title}
        <span aria-hidden className="h-px flex-1 bg-chocolate/15" />
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-7">
        {items.map((name) => (
          <article key={name} data-topping-card className="group">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={toppingImage(type, name)}
                alt={`Topping de ${name.toLowerCase()}`}
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <h4 className="mt-3 font-sans font-semibold text-chocolate">{name}</h4>
          </article>
        ))}
      </div>
    </div>
  );
}

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

        gsap.utils.toArray<HTMLElement>("[data-topping-group]").forEach((group) => {
          gsap.from(group.querySelectorAll("[data-topping-card]"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 80%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="toppings" className="container-melt py-28 md:py-40">
      {/* Cabecera: título a la izquierda, precio único como nota al margen */}
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
            <br />a tu gusto
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

      <div className="mt-16 space-y-20 md:mt-24">
        <ToppingGroup title="Salsas" type="sauce" items={SAUCE_TOPPINGS} />
        <ToppingGroup title="Galleta" type="cookie" items={COOKIE_TOPPINGS} />
      </div>

      {/* Bebidas: una sola línea utilitaria */}
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
