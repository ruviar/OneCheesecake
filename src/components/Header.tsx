"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between border-b-2 border-choco-700 bg-cream-50/90 px-6 py-2.5 backdrop-blur-sm md:px-10">
        <Link
          href="/"
          className="font-shrik text-xl text-choco-700 tracking-tight"
        >
          One<span className="text-dustyblue-500">.</span>Cheesecake
        </Link>

        <nav className="hidden items-center gap-7 md:flex font-body text-sm font-semibold text-choco-700">
          <a href="#carta" className="hover:text-dustyblue-700 transition">Carta</a>
          <a href="#packs" className="hover:text-dustyblue-700 transition">Packs</a>
          <a href="#toppings" className="hover:text-dustyblue-700 transition">Toppings</a>
          <a href="#ubicacion" className="hover:text-dustyblue-700 transition">Ubicación</a>
        </nav>

        <a
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-ticket border-2 border-choco-700 bg-dustyblue-500 px-4 py-2 font-display text-xs font-black uppercase tracking-wide text-cream-100 transition-all duration-150 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-retro active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
