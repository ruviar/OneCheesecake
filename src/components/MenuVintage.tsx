"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PACKS, DRINKS } from "@/data/menu";

/**
 * Diner Ticket Packs — each pack rendered as a line item on a vintage
 * restaurant ticket paper texture. No card borders, no dashed lines.
 * Uses Quicksand for body text and Caveat for handwritten accents.
 */
export function MenuVintage() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-stagger]", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id="packs"
      ref={sectionRef}
      className="relative bg-cream-100 py-28"
      aria-label="Packs y bebidas"
    >
      <div className="container-cake">
        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <span data-stagger className="pill">
            Vintage Diner Menu
          </span>
          <h2
            data-stagger
            className="mt-4 font-display font-black text-[clamp(2.5rem,7vw,5rem)] leading-none text-choco-700"
          >
            Nuestros <span className="hand-underline">Packs</span> One.
          </h2>
          <p
            data-stagger
            className="mt-3 font-hand text-2xl text-dustyblue-700"
          >
            Elige tu combo favorito ↓
          </p>
        </div>

        {/* Ticket-style packs on paper texture */}
        <div
          data-stagger
          className="relative mx-auto mt-16 max-w-2xl overflow-hidden rounded-[20px]"
          style={{
            backgroundImage: "url('/images/ticket-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Paper overlay for legibility */}
          <div className="absolute inset-0 bg-cream-100/40" />

          <div className="relative px-8 py-10 md:px-12 md:py-14">
            {/* Ticket header */}
            <div className="mb-8 text-center">
              <p className="font-shrik text-3xl text-choco-700 md:text-4xl">
                One Cheesecake
              </p>
              <p className="mt-1 font-hand text-xl text-choco-500">
                — La Comanda —
              </p>
              <div className="mx-auto mt-4 h-[2px] w-full bg-choco-700/20" />
            </div>

            {/* Pack line items */}
            <div className="space-y-8">
              {PACKS.map((pack, i) => (
                <div key={pack.id} className="relative">
                  {/* Pack name + price row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-body text-lg font-semibold text-choco-700 md:text-xl">
                        {pack.name}
                      </h3>
                      <p className="mt-1 font-body text-sm font-semibold text-choco-700/75 md:text-base">
                        {pack.detail}
                      </p>
                    </div>
                    <div className="relative shrink-0">
                      {/* Handwritten circle accent around price */}
                      <span className="font-display text-3xl font-black text-choco-700 md:text-4xl">
                        {pack.price}
                      </span>
                      {/* Caveat accent annotation */}
                      <span
                        className="absolute -right-2 -top-5 block -rotate-12 font-hand text-base text-gold-500 md:text-lg"
                      >
                        {i === 0
                          ? "← ¡chollo!"
                          : i === 1
                          ? "← wow"
                          : "← top 🔥"}
                      </span>
                    </div>
                  </div>

                  {/* Dotted separator (not border — background pattern) */}
                  {i < PACKS.length - 1 && (
                    <div className="mt-6 h-[2px] w-full bg-[repeating-linear-gradient(90deg,#4A2E1B_0_4px,transparent_4px_12px)] opacity-25" />
                  )}
                </div>
              ))}
            </div>

            {/* Ticket footer */}
            <div className="mt-10 border-t-2 border-dashed border-choco-700/20 pt-6">
              <p className="text-center font-hand text-xl text-gold-700">
                &quot;Escríbenos para reservar tu tarta fav&quot; 💛
              </p>
            </div>
          </div>
        </div>

        {/* Drinks section — kept simpler, on paper too */}
        <div
          data-stagger
          className="relative mx-auto mt-10 max-w-md overflow-hidden rounded-[20px]"
          style={{
            backgroundImage: "url('/images/ticket-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="absolute inset-0 bg-cream-100/40" />
          <div className="relative px-8 py-8 md:px-10">
            <h3 className="text-center font-shrik text-2xl text-choco-700 md:text-3xl">
              Refréscate
            </h3>
            <div className="mx-auto mt-3 h-[2px] w-full bg-choco-700/20" />
            <ul className="mt-5 space-y-3 font-body text-choco-700">
              {DRINKS.map((drink) => (
                <li
                  key={drink.name}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="font-semibold">{drink.name}</span>
                  <span className="flex-1 border-b border-dotted border-choco-700/30" />
                  <span className="font-display text-xl font-black">
                    {drink.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
