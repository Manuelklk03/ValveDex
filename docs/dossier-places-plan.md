# Dossieres como lugares — dirección y plan (2026-11-15)

Origen: Manuel dijo que los dossieres seguían siendo «muy simples», con assets que no se ven y demasiado «caja y tarjeta». Crítica con dos revisiones aisladas (diseño + medición en navegador a 1440 px) y decisiones tras `grill-me`.

## Diagnóstico (medido)

- Los 20 dossieres comparten una plantilla: etiqueta, título, resumen, botón, ficha técnica, sello, 7 tarjetas y pie. Las tarjetas ocupan 55–60 % de la altura.
- Arte con opacidad efectiva de 0,07 a 0,5 y contraste de 1,1 a 1,6:1. Con modelo 3D activo, los iconos bajan al 7 % antes de que el modelo cargue (el `.glb` se pide tras el primer hover).
- Un único hueco fijo para iconos, modelo y emblema; el icono solapa el título en los 20.
- 8 de 20 tienen captura de fondo, al 22 % y en gris. Las franjas de las tarjetas usan colores globales de Black Mesa, no la paleta de la saga.
- Móvil: 1250–1390 px por dossier, sin arte.
- Detector de Impeccable: 4 franjas laterales de acento reales (`game-dossier.module.css:904` y `:954`, `universe-stage.module.css:18`, `[sectionSlug]/page.module.css:81`).

## Decisiones de Manuel

1. **Concepto:** un dossier es **un lugar por saga**, con anatomía propia; al entrar «se abre».
2. **Protagonista:** el **modelo 3D gigante** (precargado al entrar en pantalla, ocupa media pantalla, gira con el puntero o el scroll). Donde no hay modelo, escena a sangre.
3. **Gestos por saga:** TF2 elegir clase/equipo; L4D abrir la puerta del refugio; Portal dibujar un portal con el cursor; Half-Life taquilla/pasillo con transición de ascensor.
4. **Apartados:** cambian por saga y enseñan miniaturas reales de sus fichas.

5. **Orden:** primero **Half-Life** (la saga de la v1.0) con su base reutilizable; TF, L4D, Portal y CS en PR sucesivos. Mientras tanto, esas sagas reciben solo arreglos baratos de visibilidad (opacidad, hover, colisiones).
6. **Counter-Strike:** los apartados son un **menú de compra** (tecla o número abre la categoría).
7. **Escenas:** capturas propias con el juego instalado y, para lo que falte (texturas, puertas, rótulos), un brief de lote 2 para Codex.

## Plan por PR

1. **Base y arreglos baratos (todas las sagas):** arte con su propia área de rejilla, iconos a opacidad completa, precarga del `.glb` al entrar en pantalla (IntersectionObserver), no bajar los iconos hasta que el modelo cargue, colores de apartado desde `universe-palettes.ts`, fuera el emblema `::after` de TF y L4D, fuera las franjas laterales.
2. **Half-Life como lugar:** taquilla/pasillo de Black Mesa, apartados como rótulos de pasillo con miniaturas reales, modelo o escena como protagonista, transición de ascensor al hub, versión móvil.
3. **TF2, L4D, Portal y CS** uno a uno con su gesto (clase/equipo, puerta del refugio, portal con el cursor, menú de compra).

## Reglas de diseño

- Sin franjas laterales de acento ni rejilla de 7 tarjetas iguales.
- El arte es la composición: un área de rejilla por asset, nunca `position: absolute` compartido.
- Colores de apartado desde `universe-palettes.ts`.
- Escritorio rico; móvil con banda de arte arriba y apartados en chips o carrusel.
- Sin franjas «1 fuente» ni slug interno en el pie: un dato real de la saga.
- Movimiento condicionado a `prefers-reduced-motion`; teclado con el mismo resultado que el ratón.
