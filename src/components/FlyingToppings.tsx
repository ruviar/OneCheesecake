"use client";

import { useFloatingAnimation } from "@/hooks/useFloatingAnimation";
import { TOPPINGS } from "@/data/menu";

const SHAPES = [
  "rounded-[42%_58%_55%_45%/50%_45%_55%_50%]",
  "rounded-full",
  "rounded-[55%_45%_60%_40%/45%_55%_45%_55%]",
  "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
];
const COLORS = [
  "bg-gold-500",
  "bg-dustyblue-500",
  "bg-choco-200",
  "bg-cream-300",
  "bg-gold-300",
];

export function FlyingToppings() {
  const containerRef = useFloatingAnimation<HTMLDivElement>({
    selector: "[data-floating]",
    amplitudeY: 22,
    rotation: 8,
    mouseRadius: 240,
    mouseStrength: 42,
  });

  const decor = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    shape: SHAPES[i % SHAPES.length],
    color: COLORS[i % COLORS.length],
    size: 80 + ((i * 37) % 110),
    top: (i * 89) % 78,
    left: (i * 53) % 90,
  }));

  return (
    <section
      id="toppings"
      ref={containerRef}
      className="relative min-h-[80vh] overflow-hidden bg-dustyblue-100 py-28"
      aria-label="Toppings y salsas"
    >
      {/* Floating decorative PNG placeholders */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {decor.map((d) => (
          <span
            key={d.id}
            data-floating
            className={`absolute ${d.shape} ${d.color} opacity-80 mix-blend-multiply shadow-retro-gold`}
            style={{
              width: `${d.size}px`,
              height: `${d.size}px`,
              top: `${d.top}%`,
              left: `${d.left}%`,
            }}
          />
        ))}
      </div>

      <div className="container-cake relative z-10 text-center">
        <span className="pill">+0.80€ c/u</span>
        <h2 className="mt-4 font-display font-black text-[clamp(2.5rem,7vw,5rem)] leading-none text-choco-700">
          ¿Quieres <span className="hand-underline">salsa</span> One?
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {(["salsa", "galleta"] as const).map((kind) => (
            <div
              key={kind}
              className="relative rounded-ticket border-2 border-choco-700 bg-cream-50/95 p-8 shadow-retro backdrop-blur-sm"
            >
              <h3 className="font-shrik text-3xl text-choco-700">
                {kind === "salsa" ? "Salsas" : "Galletas"}
              </h3>
              <div className="ticket-divider my-4" />
              <ul className="grid grid-cols-2 gap-y-2 text-left font-body text-choco-700">
                {TOPPINGS.filter((t) => t.kind === kind).map((t) => (
                  <li key={t.name} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-dustyblue-500" />
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
