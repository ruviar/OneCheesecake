"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PACKS, DRINKS } from "@/data/menu";

const PACK_TONE: Record<string, string> = {
  cream: "bg-cream-50 text-choco-700",
  gold: "bg-gold-500 text-choco-700",
  blue: "bg-dustyblue-500 text-cream-100",
};

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
        <div className="flex flex-col items-center text-center">
          <span data-stagger className="pill">Vintage Diner Menu</span>
          <h2
            data-stagger
            className="mt-4 font-display font-black text-[clamp(2.5rem,7vw,5rem)] leading-none text-choco-700"
          >
            Nuestros <span className="hand-underline">Packs</span> One.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PACKS.map((p) => (
            <article
              key={p.id}
              data-stagger
              className={`relative flex flex-col justify-between rounded-ticket border-2 border-choco-700 p-7 shadow-retro ${PACK_TONE[p.tone]}`}
            >
              <header>
                <p className="font-hand text-2xl opacity-80">{p.name}</p>
                <h3 className="mt-2 font-shrik text-4xl leading-none">{p.price}</h3>
              </header>
              <div className="ticket-divider my-5 opacity-70" />
              <p className="font-body text-sm">{p.detail}</p>
            </article>
          ))}
        </div>

        <div data-stagger className="mt-20 rounded-ticket border-2 border-choco-700 bg-cream-50 px-6 py-8 shadow-retro-blue">
          <h3 className="text-center font-shrik text-3xl text-choco-700">Refréscate</h3>
          <div className="ticket-divider my-4" />
          <ul className="mx-auto flex max-w-xs flex-col gap-3 font-body text-choco-700">
            {DRINKS.map((d) => (
              <li
                key={d.name}
                className="flex items-baseline justify-between gap-4 border-b border-dotted border-choco-700/40 pb-2"
              >
                <span>{d.name}</span>
                <span className="font-display font-black">{d.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
