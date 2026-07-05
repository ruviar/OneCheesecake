"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const finish = () => {
      setHiding(true);
      window.setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === "complete") {
      const t = window.setTimeout(finish, 500);
      return () => window.clearTimeout(t);
    }

    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-dustyblue-500 transition-opacity duration-500 ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-24 w-24 animate-pulse md:h-32 md:w-32">
        <Image
          src="/images/logo.png"
          alt="One Cheesecake"
          fill
          sizes="128px"
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
