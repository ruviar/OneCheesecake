import type { Metadata } from "next";
import { Fraunces, Shrikhand, Caveat, Quicksand } from "next/font/google";
import { Loader } from "@/components/Loader";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-shrikhand",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Cheesecake — Un euro. Un placer. Una experiencia.",
  description:
    "La tarta de queso más barata de Zaragoza. Take away en C/ Pablo Casals 17. Solo para amantes del cheesecake.",
  openGraph: {
    title: "One Cheesecake",
    description: "Un euro. Un placer. Una experiencia.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${shrikhand.variable} ${caveat.variable} ${quicksand.variable}`}
    >
      <body>
        <Loader />
        {children}
      </body>
    </html>
  );
}
