"use client";

const MESSAGE =
  "LA TARTA DE QUESO MÁS BARATA DE ZARAGOZA 💛 TAKE AWAY 💛 SOLO PARA AMANTES DEL CHEESECAKE 💛";

export function Marquee() {
  const items = Array.from({ length: 6 }, (_, i) => i);
  return (
    <section
      aria-label="Mensaje destacado"
      className="relative border-y-2 border-choco-700 bg-dustyblue-500 py-6 overflow-hidden"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display font-black uppercase text-cream-100 text-[clamp(1.6rem,4vw,3rem)] tracking-tight">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-12">
            {MESSAGE}
          </span>
        ))}
      </div>
    </section>
  );
}
