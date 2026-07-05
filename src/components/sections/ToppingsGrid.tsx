"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import {
  COOKIE_TOPPINGS,
  DRINKS,
  formatPrice,
  SAUCE_TOPPINGS,
  TOPPING_PRICE,
} from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

type Tab = "sauce" | "cookie";

/** "Dulce de Leche" -> "/images/toppings/sauce-dulce-de-leche.png" */
function toppingImage(type: Tab, name: string): string {
  return `/images/toppings/${type}-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
}

const TABS: readonly { id: Tab; label: string; items: readonly string[] }[] = [
  { id: "sauce", label: "Salsas", items: SAUCE_TOPPINGS },
  { id: "cookie", label: "Galleta", items: COOKIE_TOPPINGS },
];

export default function ToppingsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("sauce");

  const items = tab === "sauce" ? SAUCE_TOPPINGS : COOKIE_TOPPINGS;

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
      });
    },
    { scope: sectionRef },
  );

  // Anima las tarjetas nuevas cada vez que cambia la pestaña
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-topping-card]", {
          y: 28,
          autoAlpha: 0,
          scale: 0.92,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    },
    { scope: gridRef, dependencies: [tab] },
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

      {/* Selector de pestañas */}
      <div
        data-section-reveal
        role="tablist"
        aria-label="Tipo de topping"
        className="mt-12 inline-flex gap-1 rounded-full bg-chocolate/5 p-1.5 md:mt-16"
      >
        {TABS.map((t) => {
          const selected = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-7 py-2.5 font-sans text-sm font-semibold transition-colors duration-300 md:text-base ${
                selected
                  ? "bg-chocolate text-cream"
                  : "text-chocolate/60 hover:text-chocolate"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Grid del grupo activo */}
      <div
        ref={gridRef}
        role="tabpanel"
        className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:mt-12 md:grid-cols-4 md:gap-8 lg:grid-cols-7"
      >
        {items.map((name) => (
          <article key={name} data-topping-card className="group">
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_14px_28px_rgba(74,46,27,0.15)]">
              <Image
                src={toppingImage(tab, name)}
                alt={`Topping de ${name.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 14vw, (min-width: 640px) 30vw, 45vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <p className="mt-3 text-center font-sans font-semibold text-chocolate">{name}</p>
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
