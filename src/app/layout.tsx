import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import SmoothScrolling from "@/components/providers/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import ZeroGravity from "@/components/ui/ZeroGravity";
import { BUSINESS } from "@/lib/data/menu";
import { caveat, fraunces, quicksand } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "One Cheesecake — Tarta de queso artesanal en Zaragoza",
  description: `${BUSINESS.slogan} Tarta de queso take-away en ${BUSINESS.address}. ${BUSINESS.hours}.`,
  keywords: ["tarta de queso", "cheesecake", "Zaragoza", "take away", "One Cheesecake"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${caveat.variable} ${quicksand.variable}`}
    >
      <body className="bg-cream font-sans text-chocolate antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-chocolate focus:px-5 focus:py-2.5 focus:text-cream"
        >
          Saltar al contenido
        </a>
        <ZeroGravity />
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
        <CustomCursor />
      </body>
    </html>
  );
}
