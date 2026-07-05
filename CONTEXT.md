# BRAND GUIDELINES & PROJECT CONTEXT: ONE CHEESECAKE

## 1. Identidad de Marca
* **Nombre de la empresa:** One Cheesecake
* **Eslogan principal:** "Un euro. Un placer. Una experiencia."
* **Claim secundario:** "Solo para amantes del Cheesecake 💛" / "La tarta de queso más barata de Zaragoza".
* **Tono de comunicación:** Cercano, divertido, juvenil, directo ("Escríbenos para reservar tu tarta fav!").
* **Público objetivo:** Público joven, estudiantes y familias. Personas que buscan un capricho dulce, rápido y económico en formato take-away.

## 2. Sistema de Diseño (Design System)

### 2.1. Paleta de Colores (CSS Variables)
El diseño se basa en tonos pastel desaturados que recuerdan a la repostería clásica, contrastados con un marrón oscuro para legibilidad.
* `--color-bg-cream`: `#F6F3EB` (Color principal de fondo, imita el color de la tarta/galleta).
* `--color-brand-blue`: `#7B96A6` (Azul empolvado, usado en banners, botones principales y círculos de fondo).
* `--color-text-brown`: `#4A2E1B` (Marrón chocolate. Uso: Texto principal, precios, títulos).
* `--color-accent-gold`: `#D4B872` (Dorado/mostaza suave. Uso: Detalles, iconos, subrayados tipo marcador).
* `--color-white`: `#FFFFFF` (Para texto sobre el azul oscuro o fondos de tarjetas).

### 2.2. Tipografía (Google Fonts recomendadas)
* **Títulos principales (H1, H2):** `Fraunces` (Black/900) o `Shrikhand`. (Busca un efecto bold, retro, con remates gruesos, similar a "Cooper Black").
* **Subtítulos y destacados creativos:** `Caveat` o `Kalam`. (Estilo rotulador/mano alzada para textos como "¿Quieres salsa One?" o "Consigue tu pack").
* **Cuerpo de texto y Menú (p, li):** `Quicksand` o `Nunito`. (Sans-serif redondeada, limpia y muy legible para los listados de precios).

### 2.3. Estilo Visual y UI (UI Components)
* **Botones y Tarjetas:** Bordes redondeados suaves (`border-radius: 12px` o superior para botones).
* **Separadores:** Uso de líneas onduladas o punteadas para separar secciones del menú (estilo ticket vintage).
* **Ilustraciones:** Estilo "Rubber hose cartoon" (mascotas vintage con guantes blancos). Elementos decorativos abstractos (manchas de fondo color azul o mostaza) detrás de las fotos de producto.
* **Sombras:** Planas o inexistentes (Flat design retro). Evitar sombras difuminadas modernas; preferir sombras sólidas (offset) si se usan.

## 3. Arquitectura de la Información (Sitemap & Content)

### Sección 1: Hero (Inicio)
* **Logo** en el Header + Enlace a TikTok (@onesecret111) y botón de "Reservar/Contacto".
* **Mensaje central:** "Un euro. Un placer. Una experiencia."
* **CTA principal:** "Descubre nuestra carta".

### Sección 2: El Menú (Estructura de Datos)
El componente del menú debe dividirse en 4 categorías visuales:

**1. Elige tu Tarta**
* *Sabores:* La Clásica, Kinder Bueno, Choco Blanco, La Lotus, Pistachito, Especial del mes.
* *Precios:* Porción (Desde 1.00€ hasta 2.50€) | Tarta Entera (Desde 15.00€ hasta 25.00€).

**2. Toppings y Salsas (+0.80€ c/u)**
* *Salsas:* Choco Blanco, Lotus, Avellana (Kinder), Nocilla, Pistacho, Dulce de Leche, Mermelada.
* *Galletas:* Chips Ahoy, Dinosaurus, Filipinos, Lotus, Oreo, Pistacho, Simpsons.

**3. Nuestros Packs One**
* *Pack Basic:* Porción Clásica + 1 Topping + Bebida (3.30€)
* *Pack Especial:* Porción Clásica + 3 Toppings (3.30€)
* *Pack Premium:* Porción Premium + 1 Topping + Bebida (4.50€)

**4. Refréscate**
* Agua (1.20€), Café (1.20€), Refrescos (1.80€), Zumo (1.80€).

### Sección 3: Ubicación y Horarios
* **Dirección:** C/ Pablo Casals 17, Zaragoza. (A 3 minutos de GranCasa).
* **Horario:** Martes a Sábado de 17:00 a 22:00.
* **Cómo llegar (Info útil para el usuario):**
    * *Tranvía:* Línea 1 (Parada Pablo Neruda).
    * *Autobús:* Líneas 23, 43, 44, 50, Ci1, Ci2.
* **Mapa:** Incluir iframe de Google Maps centrado en la dirección.

### Sección 4: Footer
* Links legales, redes sociales (TikTok, Instagram), dirección y horario resumido. "Servicio Take Away".

## 4. Instrucciones para el Agente (Tech Stack)
* Desarrollar usando [Insertar aquí tu framework: React/Next.js/HTML-CSS puro].
* Crear una estructura modular (componente para los ítems del menú, componente para los packs).
* Asegurar que el diseño sea Mobile-First (fundamental, ya que el tráfico vendrá de Instagram y TikTok).