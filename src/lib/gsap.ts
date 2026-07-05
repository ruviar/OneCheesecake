import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registro único de plugins: importar SIEMPRE gsap desde "@/lib/gsap",
// nunca directamente desde "gsap", para garantizar el registro.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
}

export { gsap, Observer, ScrollTrigger, useGSAP };
