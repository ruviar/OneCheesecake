import Footer from "@/components/layout/Footer";
import CakeGallery from "@/components/sections/CakeGallery";
import Hero from "@/components/sections/Hero";
import PacksSection from "@/components/sections/PacksSection";
import ToppingsGrid from "@/components/sections/ToppingsGrid";

export default function Home() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <CakeGallery />
        <ToppingsGrid />
        <PacksSection />
      </main>
      <Footer />
    </>
  );
}
