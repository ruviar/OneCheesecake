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

interface ToppingEntry {
  name: string;
  src: string;
}

/** "Dulce de Leche" -> "/images/toppings/sauce-dulce-de-leche.png" */
function toppingImage(type: "sauce" | "cookie", name: string): string {
  return `/images/toppings/${type}-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
}

const SAUCES: ToppingEntry[] = SAUCE_TOPPINGS.map((name) => ({
  name,
  src: toppingImage("sauce", name),
}));
const COOKIES: ToppingEntry[] = COOKIE_TOPPINGS.map((name) => ({
  name,
  src: toppingImage("cookie", name),
}));
const ALL_TOPPINGS: ToppingEntry[] = [...SAUCES, ...COOKIES];

function ToppingList({
  title,
  items,
  onHover,
}: {
  title: string;
  items: ToppingEntry[];
  onHover: (src: string) => void;
}) {
  return (
    <div data-topping-group>
      <h3 className="flex items-center gap-4 font-sans text-sm font-bold uppercase tracking-[0.25em] text-chocolate/50">
        {title}
        <span aria-hidden className="h-px flex-1 bg-chocolate/15" />
      </h3>
      <ul className="mt-4">
        {items.map(({ name, src }) => (
          <li key={name}>
            <div
              data-topping-row
              onPointerEnter={() => onHover(src)}
              className="group flex items-center gap-4 border-b border-chocolate/10 py-4 md:py-5"
            >
              {/* Miniatura solo en móvil; en desktop la foto flota junto al cursor */}
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl md:hidden">
                <Image
                  src={src}
                  alt={`Topping de ${name.toLowerCase()}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="font-wonk font-display text-2xl font-medium text-chocolate transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-gold md:text-3xl">
                {name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ToppingsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

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
          gsap.from(group.querySelectorAll("[data-topping-row]"), {
            y: 24,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 80%", once: true },
          });
        });
      });

      // La foto sigue al cursor (solo puntero fino)
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        const preview = previewRef.current;
        if (!section || !preview) return;

        const xTo = gsap.quickTo(preview, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.45, ease: "power3" });
        function onMove(event: PointerEvent): void {
          xTo(event.clientX);
          yTo(event.clientY - 24);
        }
        section.addEventListener("pointermove", onMove);
        return () => section.removeEventListener("pointermove", onMove);
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

      {/* Listas editoriales; al salir del bloque se oculta la foto flotante */}
      <div
        className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-x-20"
        onPointerLeave={() => setActive(null)}
      >
        <ToppingList title="Salsas" items={SAUCES} onHover={setActive} />
        <ToppingList title="Galleta" items={COOKIES} onHover={setActive} />
      </div>

      {/* Foto flotante que sigue al cursor (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <div
          className={`relative h-52 w-52 -translate-x-1/2 -translate-y-full rotate-3 overflow-hidden rounded-2xl shadow-[0_24px_48px_rgba(74,46,27,0.3)] transition-all duration-300 ${
            active ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {ALL_TOPPINGS.map(({ src }) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="208px"
              className={`object-cover transition-opacity duration-200 ${
                active === src ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
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
