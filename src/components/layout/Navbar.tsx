"use client";

import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ScrollLink from "@/components/ui/ScrollLink";
import { BUSINESS } from "@/lib/data/menu";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LINKS = [
  { label: "Tartas", href: "#tartas" },
  { label: "Toppings", href: "#toppings" },
  { label: "Packs", href: "#packs" },
  { label: "Visítanos", href: "#visitanos" },
] as const;

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 40,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });

      // Overlay móvil: timeline pausada, se reproduce/revierte al abrir/cerrar
      gsap.set(overlayRef.current, { yPercent: -100 });
      menuTl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, { yPercent: 0, duration: 0.7, ease: "power4.inOut" })
        .fromTo(
          "[data-menu-link]",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" },
          "-=0.2",
        );

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(headerRef.current, { y: -24, autoAlpha: 0, duration: 0.8, delay: 1.2 });
      });
    },
    { scope: headerRef },
  );

  useEffect(() => {
    if (open) {
      lenis?.stop();
      menuTl.current?.play();
    } else {
      lenis?.start();
      menuTl.current?.reverse();
    }
  }, [open, lenis]);

  useEffect(() => {
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* Overlay menú móvil (bajo la barra para que logo y botón queden visibles) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 -z-10 flex flex-col justify-between bg-chocolate px-6 pb-10 pt-32 md:hidden"
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2" aria-label="Menú principal">
          {LINKS.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href}
              onNavigate={() => setOpen(false)}
              data-menu-link
              className="font-display text-5xl font-semibold text-cream transition-colors hover:text-gold"
              tabIndex={open ? 0 : -1}
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>
        <div data-menu-link className="space-y-1 font-sans text-sm text-cream/70">
          <p className="font-accent text-2xl text-gold">{BUSINESS.slogan}</p>
          <p>{BUSINESS.address}</p>
          <p>{BUSINESS.hours}</p>
        </div>
      </div>

      {/* Barra */}
      <div
        className={`transition-all duration-300 ${
          scrolled && !open
            ? "bg-cream/85 shadow-[0_1px_0_0_rgba(74,46,27,0.08)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div
          className={`container-melt flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-3" : "py-4 md:py-5"
          }`}
        >
          <ScrollLink href="#inicio" className="flex items-center gap-3" aria-label="One Cheesecake — inicio">
            <Image
              src={BUSINESS.logo}
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 rounded-full md:h-11 md:w-11"
              priority
            />
            <span
              className={`font-display text-lg font-semibold transition-colors ${
                open ? "text-cream" : "text-chocolate"
              }`}
            >
              One Cheesecake
            </span>
          </ScrollLink>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Menú principal">
            {LINKS.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="group relative font-sans text-sm font-semibold text-chocolate"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </ScrollLink>
            ))}
          </nav>

          <ScrollLink
            href="#visitanos"
            className="hidden rounded-full bg-chocolate px-6 py-2.5 font-sans text-sm font-semibold text-cream transition-transform duration-300 hover:scale-105 md:inline-flex"
          >
            Pedir ahora
          </ScrollLink>

          {/* Hamburguesa */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-0.5 w-6 rounded-full transition-all duration-300 ${
                open ? "rotate-45 bg-cream" : "-translate-y-[4px] bg-chocolate"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded-full transition-all duration-300 ${
                open ? "-rotate-45 bg-cream" : "translate-y-[4px] bg-chocolate"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
