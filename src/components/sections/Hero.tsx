"use client";

import Image from "next/image";
import { useRef } from "react";

import Marquee from "@/components/ui/Marquee";
import RotatingBadge from "@/components/ui/RotatingBadge";
import ScrollLink from "@/components/ui/ScrollLink";
import { BUSINESS } from "@/lib/data/menu";
import { gsap, useGSAP } from "@/lib/gsap";

const HEADLINE = "CHEESECAKE";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Tres capas sobre la tarta para que los tweens no compitan por `y`:
  // parallaxRef (scrub de scroll) > floatRef (intro + flotación) > imgRef (ratón)
  const parallaxRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-hero-eyebrow]", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.15)
          .from(
            "[data-hero-letter]",
            { yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.045 },
            0.3,
          )
          .from(
            "[data-hero-script]",
            { scale: 0.5, rotation: -12, autoAlpha: 0, duration: 0.6, ease: "back.out(2)" },
            0.95,
          )
          .from(
            floatRef.current,
            { y: 90, scale: 0.94, autoAlpha: 0, duration: 1.1 },
            0.55,
          )
          .from(
            "[data-hero-badge]",
            { scale: 0, rotation: -30, duration: 0.7, ease: "back.out(1.8)" },
            1.1,
          )
          .from("[data-hero-meta]", { y: 24, autoAlpha: 0, stagger: 0.12, duration: 0.7 }, 1.15)
          .from("[data-hero-marquee]", { yPercent: 100, duration: 0.8, ease: "power4.out" }, 1.2);

        // Flotación idle de la porción
        gsap.to(floatRef.current, {
          y: "-=14",
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });

        // Parallax de scroll: la tarta se despega más lento que el texto
        gsap.to(parallaxRef.current, {
          y: 130,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to("[data-hero-headline]", {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Parallax de ratón sobre la porción
        const xTo = gsap.quickTo(imgRef.current, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(imgRef.current, "y", { duration: 0.7, ease: "power3" });
        function onMove(event: PointerEvent): void {
          xTo((event.clientX / window.innerWidth - 0.5) * 32);
          yTo((event.clientY / window.innerHeight - 0.5) * 20);
        }
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Eyebrow */}
      <p
        data-hero-eyebrow
        className="container-melt pt-32 text-center font-accent text-2xl text-dusty-blue md:pt-36 md:text-3xl"
      >
        {BUSINESS.slogan}
      </p>

      {/* Titular gigante + script superpuesto */}
      <div data-hero-headline className="relative mt-2 md:mt-0">
        <h1
          aria-label="One Cheesecake"
          className="font-wonk select-none text-center font-display text-[clamp(3.2rem,12.5vw,11.75rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-chocolate"
        >
          <span aria-hidden className="inline-block">
            {HEADLINE.split("").map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span data-hero-letter className="inline-block">
                  {letter}
                </span>
              </span>
            ))}
          </span>
        </h1>
        <span
          data-hero-script
          aria-hidden
          className="absolute -top-[0.55em] left-[6%] -rotate-6 font-accent text-[clamp(2.4rem,6.5vw,6rem)] leading-none text-gold md:left-[10%]"
        >
          One
        </span>
      </div>

      {/* Porción flotante superpuesta al titular */}
      <div ref={parallaxRef} className="relative z-10 -mt-[6vw] md:-mt-[5vw]">
        {/* Overlay oscuro difuminado detrás */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-1/2 bg-gradient-to-b from-chocolate/0 via-chocolate/15 to-chocolate/0 blur-3xl"
        />
        <div ref={floatRef} className="relative mx-auto w-[min(78vw,700px)]">
          <div ref={imgRef} className="relative">
            <Image
              src="/images/tarta_clasica.png"
              alt="Porción de tarta de queso La Clásica, cremosa y con la superficie tostada"
              width={2816}
              height={1536}
              priority
              sizes="(min-width: 768px) 700px, 78vw"
              className="h-auto w-full drop-shadow-[0_30px_45px_rgba(74,46,27,0.28)]"
            />
            <div data-hero-badge className="absolute -right-[4%] bottom-[8%] md:-right-[8%]">
              <RotatingBadge
                text="DESDE 1€ LA PORCIÓN ✦ HECHA CADA DÍA ✦"
                center="1€"
                className="w-24 rotate-6 md:w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meta inferior asimétrica: CTAs / horario */}
      <div className="container-melt mt-auto flex items-end justify-between gap-6 pb-10 pt-10 md:pb-14">
        <div data-hero-meta className="flex flex-wrap items-center gap-5">
          <ScrollLink
            href="#tartas"
            className="rounded-full bg-chocolate px-7 py-3.5 font-sans text-sm font-semibold text-cream transition-transform duration-300 hover:scale-105 md:text-base"
          >
            Ver la carta
          </ScrollLink>
          <ScrollLink
            href="#visitanos"
            className="font-sans text-sm font-semibold text-chocolate underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-dusty-blue md:text-base"
          >
            Cómo llegar ↗
          </ScrollLink>
        </div>
        <div
          data-hero-meta
          className="hidden text-right font-sans text-xs font-semibold uppercase tracking-[0.2em] text-chocolate/60 sm:block"
        >
          <p>{BUSINESS.hours}</p>
          <p className="mt-1">{BUSINESS.address}</p>
        </div>
      </div>

      {/* Marquee inferior */}
      <div data-hero-marquee>
        <Marquee text={BUSINESS.marquee} />
      </div>
    </section>
  );
}
