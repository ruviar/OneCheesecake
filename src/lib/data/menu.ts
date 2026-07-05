// Única fuente de verdad de datos de negocio. No hardcodear precios en componentes.

export interface Cake {
  readonly id: string;
  readonly name: string;
  /** Nota de sabor manuscrita (Caveat) que acompaña al nombre */
  readonly note: string;
  readonly slicePrice: number;
  readonly wholePrice: number;
  readonly image: string;
  /** Especial del Mes */
  readonly special?: boolean;
}

export interface Drink {
  readonly name: string;
  readonly price: number;
}

export interface Pack {
  readonly id: string;
  readonly name: string;
  /** Nota manuscrita (Caveat) sobre el nombre */
  readonly tagline: string;
  /** Fórmula del combo, partes separadas por " + " (se renderiza como ecuación) */
  readonly description: string;
  readonly price: number;
  /** Banner dusty-blue destacado */
  readonly highlight?: string;
}

export const CAKES: readonly Cake[] = [
  { id: "clasica", name: "La Clásica", note: "cremosa por dentro, tostada por fuera", slicePrice: 1.0, wholePrice: 15.0, image: "/images/tarta_clasica.png" },
  { id: "kinder", name: "Kinder Bueno", note: "para los muy chocolateros", slicePrice: 2.5, wholePrice: 25.0, image: "/images/tarta_kinder.png" },
  { id: "choco-blanco", name: "Choco Blanco", note: "dulce, sedosa, peligrosa", slicePrice: 2.5, wholePrice: 25.0, image: "/images/tarta_chocoblanco.png" },
  { id: "lotus", name: "La Lotus", note: "caramelizada y especiada", slicePrice: 2.5, wholePrice: 25.0, image: "/images/tarta_lotus.png" },
  { id: "pistachito", name: "Pistachito", note: "verde, salado, adictivo", slicePrice: 2.5, wholePrice: 25.0, image: "/images/tarta_pistacho.png" },
  // TODO: sustituir imagen cuando exista foto real de Caramelo y Pretzel
  { id: "especial-mes", name: "Caramelo y Pretzel", note: "dulce + salado, solo este mes", slicePrice: 2.5, wholePrice: 25.0, image: "/images/tarta_croissant.png", special: true },
];

export const TOPPING_PRICE = 0.8;

export const SAUCE_TOPPINGS: readonly string[] = [
  "Choco Blanco",
  "Lotus",
  "Avellana",
  "Nocilla",
  "Pistacho",
  "Dulce de Leche",
  "Mermelada",
];

export const COOKIE_TOPPINGS: readonly string[] = [
  "Chips Ahoy",
  "Dinosaurus",
  "Filipinos",
  "Lotus",
  "Oreo",
  "Pistacho",
  "Simpsons",
];

export const DRINKS: readonly Drink[] = [
  { name: "Agua", price: 1.2 },
  { name: "Refrescos", price: 1.8 },
  { name: "Zumo", price: 1.8 },
  { name: "Café", price: 1.2 },
];

export const PACKS: readonly Pack[] = [
  { id: "basic", name: "Pack Basic", tagline: "para empezar", description: "Porción Clásica + 1 Topping + Bebida", price: 3.3, highlight: "El más pedido" },
  { id: "especial", name: "Pack Especial", tagline: "para los de las salsas", description: "Porción Clásica + 3 Toppings", price: 3.3 },
  { id: "premium", name: "Pack Premium", tagline: "el capricho completo", description: "Porción Premium + 1 Topping + Bebida", price: 4.5 },
];

export const BUSINESS = {
  name: "One Cheesecake",
  slogan: "Un euro. Un placer. Una experiencia.",
  marquee: "LA TARTA DE QUESO MÁS BARATA DE ZARAGOZA",
  address: "C/ Pablo Casals 17, Zaragoza",
  landmark: "A 3 minutos de GranCasa",
  hours: "Martes a Sábado · 17:00 – 22:00",
  transport: {
    tram: "L1 · Pablo Neruda",
    bus: ["23", "43", "44", "50", "Ci1", "Ci2"],
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=C%2F%20Pablo%20Casals%2017%2C%20Zaragoza",
  logo: "/images/logo.png",
  mascot: "/images/mascot.png",
} as const;

/** 2.5 -> "2,50€" */
export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace(".", ",")}€`;
}
