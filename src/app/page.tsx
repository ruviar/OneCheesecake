import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { FlavorScroll } from "@/components/FlavorScroll";
import { FlyingToppings } from "@/components/FlyingToppings";
import { MenuVintage } from "@/components/MenuVintage";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Marquee />
      <FlavorScroll />
      <FlyingToppings />
      <MenuVintage />
      <Footer />
    </main>
  );
}
