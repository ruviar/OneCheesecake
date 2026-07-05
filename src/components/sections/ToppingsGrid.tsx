"use client";

import { useRef } from "react";

import {
  COOKIE_TOPPINGS,
  DRINKS,
  formatPrice,
  SAUCE_TOPPINGS,
  TOPPING_PRICE,
} from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

// Etiquetas manuscritas: tamaño y rotación ciclan para el efecto "pizarra"
const SIZES = [
  "text-4xl md:text-5xl",
  "text-3xl md:text-4xl",
  "text-5xl md:text-6xl",
] as const;
const TILTS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"] as const;
const INKS = ["text-chocolate", "text-chocolate/75", "text-dusty-blue"] as const;

function ToppingCloud({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-4 font-sans text-sm font-bold uppercase tracking-[0.25em] text-chocolate/50">
        {title}
        <span aria-hidden className="h-px flex-1 bg-chocolate/15" />
      </h3>
      <ul className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-5">
        {items.map((topping, i) => (
          <li
            key={topping}
            data-topping
            className={`inline-block cursor-default font-accent leading-none transition-transform duration-300 hover:-translate-y-1 hover:text-gold ${
              SIZES[i % SIZES.length]
            } ${TILTS[i % TILTS.length]} ${INKS[i % INKS.length]}`}
          >
            {topping}
          </li>
        ))}
      </ul>
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

        // Las etiquetas caen con rotación aleatoria y orden barajado
        gsap.utils.toArray<HTMLElement>("[data-topping-cloud]").forEach((cloud) => {
          gsap.from(cloud.querySelectorAll("[data-topping]"), {
            y: 28,
            autoAlpha: 0,
            rotation: () => gsap.utils.random(-14, 14),
            duration: 0.6,
            ease: "back.out(1.6)",
            stagger: { each: 0.06, from: "random" },
            scrollTrigger: { trigger: cloud, start: "top 80%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="toppings" className="container-melt py-28 md:py-40">
      {/* Cabecera asimétrica: título a la izquierda, precio único como nota al margen */}
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

      {/* Grid roto: salsas arriba-izquierda, galletas abajo-derecha */}
      <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
        <div data-topping-cloud className="md:col-span-7">
          <ToppingCloud title="Salsas" items={SAUCE_TOPPINGS} />
        </div>
        <div data-topping-cloud className="md:col-span-5 md:mt-28">
          <ToppingCloud title="Galleta" items={COOKIE_TOPPINGS} />
        </div>
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
