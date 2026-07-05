import Image from "next/image";

function ScrollBreak() {
  const ITEMS = [
    "ESCRÍBENOS PARA RESERVAR TU TARTA FAV",
    "C/ PABLO CASALS 17 · ZARAGOZA",
    "MARTES A SÁBADO · 17:00 — 22:00",
    "TAKE AWAY",
  ];
  const row = Array.from({ length: 2 }, (_, i) => i);
  return (
    <div className="relative isolate overflow-hidden border-y-[3px] border-cream-100/40 bg-gold-500 text-choco-700">
      <div
        className="flex w-max gap-10 whitespace-nowrap py-4 font-display text-2xl font-black uppercase tracking-tight md:text-3xl"
        style={{ animation: "marquee 38s linear infinite" }}
      >
        {row.map((r) => (
          <span key={r} className="flex items-center gap-10">
            {ITEMS.map((it, k) => (
              <span key={`${r}-${k}`} className="flex items-center gap-10">
                <span>{it}</span>
                <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-choco-700 bg-cream-100">
                  <span className="h-2 w-2 rounded-full bg-choco-700" />
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="relative isolate bg-choco-700 text-cream-100">
      <ScrollBreak />

      {/* Map + details */}
      <div id="ubicacion" className="container-cake grid gap-10 py-20 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="pill !border-cream-100/40 !bg-transparent !text-cream-100">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-300" /> Ubicación
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-black leading-[0.95]">
            Te esperamos en
            <br />
            <span className="hand-underline text-gold-300">Pablo Casals 17</span>.
          </h2>
          <div className="grid gap-4 font-body md:grid-cols-2">
            <div>
              <p className="font-display text-xs font-black uppercase tracking-widest text-gold-300/80">
                Dirección
              </p>
              <p className="mt-1">C/ Pablo Casals 17, Zaragoza</p>
              <p className="text-sm opacity-80">A 3 minutos de GranCasa</p>
            </div>
            <div>
              <p className="font-display text-xs font-black uppercase tracking-widest text-gold-300/80">
                Horario
              </p>
              <p className="mt-1">Martes a Sábado</p>
              <p className="text-sm opacity-80">17:00 — 22:00</p>
            </div>
            <div>
              <p className="font-display text-xs font-black uppercase tracking-widest text-gold-300/80">
                Tranvía
              </p>
              <p className="mt-1">Línea 1 · Parada Pablo Neruda</p>
            </div>
            <div>
              <p className="font-display text-xs font-black uppercase tracking-widest text-gold-300/80">
                Autobús
              </p>
              <p className="mt-1">23 · 43 · 44 · 50 · Ci1 · Ci2</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calle+Pablo+Casals+17+Zaragoza"
              target="_blank"
              rel="noreferrer"
              className="btn-retro !bg-gold-500 !text-choco-700"
            >
              Cómo llegar
            </a>
            <a
              href="https://www.tiktok.com/@onesecret111"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-ticket border-2 border-cream-100/40 px-4 py-2.5 font-display text-xs font-black uppercase tracking-wide text-cream-100 transition hover:border-cream-100"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M19.6 6.32a5.6 5.6 0 01-3.36-1.12V15.4a5.6 5.6 0 11-5.6-5.6c.18 0 .35 0 .53.03v2.51a3.07 3.07 0 102.04 2.9V2h2.49a5.6 5.6 0 005.6 5.6V6.32h-.7z" />
              </svg>
              @onesecret111
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-ticket border-2 border-cream-100/30 bg-choco-900 shadow-retro md:aspect-auto md:min-h-[360px]">
          <iframe
            title="Mapa de One Cheesecake en Zaragoza"
            src="https://www.google.com/maps?q=Calle+Pablo+Casals+17+Zaragoza&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale-[0.4] contrast-110"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </div>

      {/* Bottom info row */}
      <div className="container-cake grid gap-10 border-t border-cream-100/15 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="relative inline-block h-12 w-12">
              <Image
                src="/images/mascot-retro.png"
                alt=""
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
            <p className="font-shrik text-3xl">One Cheesecake</p>
          </div>
          <p className="font-hand text-2xl text-gold-300">
            Solo para amantes del cheesecake 💛
          </p>
          <p className="max-w-xs text-sm opacity-80">
            Servicio Take Away. La tarta de queso más barata de Zaragoza.
          </p>
        </div>

        <div>
          <p className="font-display text-xs font-black uppercase tracking-widest text-gold-300/80">
            Navega
          </p>
          <ul className="mt-3 space-y-1.5 font-body">
            <li><a href="#carta" className="transition hover:text-gold-300">Carta</a></li>
            <li><a href="#toppings" className="transition hover:text-gold-300">Toppings</a></li>
            <li><a href="#packs" className="transition hover:text-gold-300">Packs</a></li>
            <li><a href="#ubicacion" className="transition hover:text-gold-300">Ubicación</a></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-xs font-black uppercase tracking-widest text-gold-300/80">
            Síguenos
          </p>
          <ul className="mt-3 space-y-1.5 font-body">
            <li>
              <a
                href="https://www.tiktok.com/@onesecret111"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gold-300"
              >
                TikTok · @onesecret111
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-gold-300">
                Instagram
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs opacity-70">
            Escríbenos para reservar tu tarta fav.
          </p>
        </div>
      </div>

      <div className="border-t border-cream-100/15 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} One Cheesecake · Hecho con cariño en Zaragoza
      </div>
    </footer>
  );
}
