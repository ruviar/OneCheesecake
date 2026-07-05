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

function ToppingMarquee({
  title,
  items,
  direction = "ltr",
}: {
  title: string;
  items: readonly string[];
  direction?: "ltr" | "rtl";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      if (!track) return;

      const isRtl = direction === "rtl";
      const distance = 50; // % de desplazamiento

      const tl = gsap.to(track, {
        xPercent: isRtl ? distance : -distance,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      // Pausa al hover
      const wrap = wrapRef.current;
      wrap?.addEventListener("mouseenter", () => tl.pause());
      wrap?.addEventListener("mouseleave", () => tl.play());

      return () => {
        wrap?.removeEventListener("mouseenter", () => tl.pause());
        wrap?.removeEventListener("mouseleave", () => tl.play());
      };
    });
  });

  // Duplicar items para seamless loop
  const doubled = [...items, ...items];

  return (
    <div ref={wrapRef} className="group overflow-hidden">
      <p className="mb-4 flex items-center gap-3 font-accent text-xl text-dusty-blue">
        {title}
        <span aria-hidden className="h-px flex-1 bg-dusty-blue/15" />
      </p>
      <div className="relative">
        <div ref={trackRef} className="flex w-max gap-4 md:gap-6">
          {doubled.map((name, i) => {
            const type = SAUCE_TOPPINGS.includes(name) ? "sauce" : "cookie";
            const isSecond = i >= items.length;
            return (
              <div
                key={`${name}-${isSecond}`}
                data-topping-card
                className="group/card shrink-0 transition-transform duration-300 group-hover:scale-105"
              >
                <div className="relative h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={toppingImage(type, name)}
                    alt={`Topping de ${name.toLowerCase()}`}
                    fill
                    sizes="(min-width: 768px) 192px, 160px"
                    className="object-cover transition-opacity duration-300 group-hover/card:opacity-90"
                  />
                </div>
                <p className="mt-3 text-center font-sans font-semibold text-chocolate">
                  {name}
                </p>
              </div>
            );
          })}
        </div>
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

      {/* Cintas infinitas */}
      <div className="mt-14 space-y-10 md:mt-20 md:space-y-12">
        <ToppingMarquee title="Salsas" items={SAUCE_TOPPINGS} direction="ltr" />
        <ToppingMarquee title="Galleta" items={COOKIE_TOPPINGS} direction="rtl" />
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
