"use client";

import { useLenis } from "lenis/react";

interface ScrollLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  /** Callback tras iniciar la navegación (p.ej. cerrar el menú móvil) */
  onNavigate?: () => void;
}

// Ancla con scroll suave via Lenis (los anchors nativos saltan sin inercia).
export default function ScrollLink({
  href,
  onNavigate,
  children,
  ...rest
}: ScrollLinkProps) {
  const lenis = useLenis();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    onNavigate?.();
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -88, duration: 1.4 });
    } else {
      target.scrollIntoView();
    }
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
