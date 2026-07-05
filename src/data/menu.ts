export type Flavor = {
  id: string;
  name: string;
  tagline: string;
  portion: string;
  whole: string;
  accent: "blue" | "gold" | "choco";
};

export const FLAVORS: Flavor[] = [
  {
    id: "clasica",
    name: "La Clásica",
    tagline: "Cremosa. Inquebrantable.",
    portion: "1.00€",
    whole: "15.00€",
    accent: "gold",
  },
  {
    id: "kinder",
    name: "Kinder Bueno",
    tagline: "Tu infancia, pero adulta.",
    portion: "2.00€",
    whole: "22.00€",
    accent: "choco",
  },
  {
    id: "choco-blanco",
    name: "Choco Blanco",
    tagline: "Suavidad nivel poema.",
    portion: "1.80€",
    whole: "20.00€",
    accent: "blue",
  },
  {
    id: "lotus",
    name: "La Lotus",
    tagline: "Caramelo con personalidad.",
    portion: "2.00€",
    whole: "22.00€",
    accent: "gold",
  },
  {
    id: "pistacho",
    name: "Pistachito",
    tagline: "Verde envidia. Sabor leyenda.",
    portion: "2.50€",
    whole: "25.00€",
    accent: "blue",
  },
  {
    id: "especial",
    name: "Especial del mes",
    tagline: "Sorpresa rotativa.",
    portion: "2.50€",
    whole: "25.00€",
    accent: "choco",
  },
];

export type Topping = { name: string; kind: "salsa" | "galleta" };

export const TOPPINGS: Topping[] = [
  { name: "Choco Blanco", kind: "salsa" },
  { name: "Lotus", kind: "salsa" },
  { name: "Avellana (Kinder)", kind: "salsa" },
  { name: "Nocilla", kind: "salsa" },
  { name: "Pistacho", kind: "salsa" },
  { name: "Dulce de Leche", kind: "salsa" },
  { name: "Mermelada", kind: "salsa" },
  { name: "Chips Ahoy", kind: "galleta" },
  { name: "Dinosaurus", kind: "galleta" },
  { name: "Filipinos", kind: "galleta" },
  { name: "Lotus", kind: "galleta" },
  { name: "Oreo", kind: "galleta" },
  { name: "Pistacho", kind: "galleta" },
  { name: "Simpsons", kind: "galleta" },
];

export const PACKS = [
  {
    id: "basic",
    name: "Pack Basic",
    detail: "Porción Clásica + 1 Topping + Bebida",
    price: "3.30€",
    tone: "cream" as const,
  },
  {
    id: "especial",
    name: "Pack Especial",
    detail: "Porción Clásica + 3 Toppings",
    price: "3.30€",
    tone: "gold" as const,
  },
  {
    id: "premium",
    name: "Pack Premium",
    detail: "Porción Premium + 1 Topping + Bebida",
    price: "4.50€",
    tone: "blue" as const,
  },
];

export const DRINKS = [
  { name: "Agua", price: "1.20€" },
  { name: "Café", price: "1.20€" },
  { name: "Refrescos", price: "1.80€" },
  { name: "Zumo", price: "1.80€" },
];
