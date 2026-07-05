"use client";

import Image from "next/image";
import { useRef } from "react";

import Marquee from "@/components/ui/Marquee";
import { BUSINESS } from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-cream/50">
      {children}
    </h3>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  // Capas separadas: pop de entrada (outer) + flotación idle (inner)
  const mascotPopRef = useRef<HTMLDivElement>(null);
  const mascotFloatRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-footer-reveal]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: { trigger: footerRef.current, start: "top 75%", once: true },
        });

        // La mascota se asoma por el borde con rebote elástico…
        gsap.from(mascotPopRef.current, {
          y: 160,
          rotation: 12,
          duration: 1.2,
          ease: "elastic.out(1, 0.55)",
          scrollTrigger: { trigger: footerRef.current, start: "top 70%", once: true },
        });
        // …y luego flota
        gsap.to(mascotFloatRef.current, {
          y: "-=10",
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.4,
        });
      });
    },
    { scope: footerRef },
  );

  const wiggle = contextSafe(() => {
    gsap.to(mascotFloatRef.current, {
      keyframes: [
        { rotation: -8, duration: 0.1 },
        { rotation: 8, duration: 0.12 },
        { rotation: -5, duration: 0.12 },
        { rotation: 5, duration: 0.12 },
        { rotation: 0, duration: 0.14 },
      ],
      overwrite: "auto",
    });
  });

  return (
    <footer ref={footerRef} id="visitanos" className="relative bg-chocolate text-cream">
      {/* Mascota asomándose por el borde superior */}
      <div
        ref={mascotPopRef}
        className="absolute -top-[5.5rem] right-[6%] z-10 w-24 md:-top-32 md:right-[8%] md:w-40"
      >
        <div ref={mascotFloatRef} onMouseEnter={wiggle} data-cursor-hover>
          <Image
            src={BUSINESS.mascot}
            alt="Mascota de One Cheesecake: una porción de tarta de dibujos animados saludando"
            width={1024}
            height={1024}
            className="h-auto w-full drop-shadow-[0_12px_20px_rgba(74,46,27,0.35)]"
            sizes="(min-width: 768px) 160px, 96px"
          />
        </div>
      </div>

      {/* Bookend del slogan */}
      <Marquee text="Un euro. Un placer. Una experiencia." speed={26} className="border-b border-cream/10" />

      <div className="container-melt grid gap-14 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        {/* Izquierda: cierre grande + CTA */}
        <div className="md:self-center">
          <p data-footer-reveal className="font-accent text-3xl text-gold">
            te esperamos
          </p>
          <h2
            data-footer-reveal
            className="font-wonk mt-3 font-display text-5xl font-semibold leading-[0.9] md:text-7xl"
          >
            Ven a por
            <br />
            la tuya
          </h2>
          <a
            data-footer-reveal
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-block rounded-full bg-cream px-7 py-3.5 font-sans text-sm font-semibold text-chocolate transition-transform duration-300 hover:scale-105 md:text-base"
          >
            Abrir en Google Maps ↗
          </a>
        </div>

        {/* Derecha: mapa + info debajo */}
        <div className="space-y-10">
          {/* Mapa embebido de la ubicación */}
          <a
            data-footer-reveal
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver One Cheesecake en Google Maps"
            className="group block overflow-hidden rounded-2xl border border-cream/15 shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          >
            <iframe
              title="Mapa de One Cheesecake — C/ Pablo Casals 17, Zaragoza"
              src="https://www.google.com/maps?q=C%2F%20Pablo%20Casals%2017%2C%20Zaragoza&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none block h-64 w-full grayscale transition-all duration-500 group-hover:grayscale-0 md:h-72"
            />
          </a>

          {/* Info debajo del mapa */}
          <div data-footer-reveal className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-10">
              <div>
                <InfoLabel>Dónde</InfoLabel>
                <p className="mt-4 font-sans text-lg font-semibold">{BUSINESS.address}</p>
                <p className="mt-1 font-accent text-2xl text-gold">a 3 min de GranCasa</p>
              </div>
              <div>
                <InfoLabel>Cuándo</InfoLabel>
                <p className="mt-4 font-sans text-lg font-semibold">{BUSINESS.hours}</p>
                <p className="mt-1 font-sans text-sm text-cream/60">Domingos y lunes, cerrado</p>
              </div>
            </div>
            <div className="space-y-10">
              <div>
                <InfoLabel>Tranvía</InfoLabel>
                <p className="mt-4 font-sans text-lg font-semibold">{BUSINESS.transport.tram}</p>
              </div>
              <div>
                <InfoLabel>Bus</InfoLabel>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {BUSINESS.transport.bus.map((line) => (
                    <li
                      key={line}
                      className="rounded-full border border-cream/25 px-3.5 py-1.5 font-sans text-sm font-semibold text-cream/90"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra legal */}
      <div className="border-t border-cream/10">
        <div className="container-melt flex flex-wrap items-center justify-between gap-4 py-6 font-sans text-xs text-cream/50">
          <p>© {new Date().getFullYear()} One Cheesecake · Zaragoza</p>
          <p className="font-accent text-lg text-gold/80">hecho con mucho queso</p>
        </div>
      </div>
    </footer>
  );
}
