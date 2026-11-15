# Brief de assets, lote 1 — emblemas e iconos de juego

Para pasar a Codex. Lo prepara Claude (2026-11-15); Manuel lo lanza y Claude integra en `public/` lo que llegue. Decisiones en [v1-plan.md](v1-plan.md).

## Estilo (igual que los 19 iconos que ya existen en `public/images/icons/`)

- **Dibujo de línea** de un solo trazo negro, sin relleno, sobre **fondo transparente** (alfa). La web lo tiñe con `mask-image`, así que el color no importa: solo la forma.
- **WebP** con alfa, **1000 px en el lado largo** (como los actuales: de 471×1016 a 1016×542). Un archivo por icono, nombre en kebab-case.
- Trazo de grosor constante y limpio, sin sombras ni degradados. Referencias: los iconos actuales (`gordon-hev.webp`, `hunter.webp`, `tf2-mercenaries.webp`, `left-4-dead.webp`).
- Sin texto dentro del dibujo y sin dejar márgenes enormes alrededor.
- Silueta reconocible a tamaño pequeño (se usan desde 3 rem hasta pantalla completa).

## A. Emblema de saga (5)

Marca simple de un trazo, **cuadrada (1000 × 1000)**, pensada para tarjeta, menú grande, buscador y pie. Debe parecerse a su saga.

| Archivo                      | Saga           | Idea                                                                     |
| ---------------------------- | -------------- | ------------------------------------------------------------------------ |
| `emblem-half-life.webp`      | Half-Life      | Lambda dentro de un anillo, trazo de señalética de Black Mesa            |
| `emblem-portal.webp`         | Portal         | Dos portales (óvalos) enfrentados con la bola de energía                 |
| `emblem-team-fortress.webp`  | Team Fortress  | Mira circular con el rombo de equipo, al estilo de cartel de los años 60 |
| `emblem-left-4-dead.webp`    | Left 4 Dead    | El «4» salpicado de tres garras, sin la palabra Left                     |
| `emblem-counter-strike.webp` | Counter-Strike | Escudo o placa táctica con una mira, sin las siglas CT/T                 |

## B. Iconos de juego que faltan (7)

Hoy se repite un mismo dibujo en varios juegos. Estos sustituyen a la repetición; cada uno distinto y reconocible de su juego.

| Archivo                                             | Juego                  | Sustituye a       | Idea                                                                                  |
| --------------------------------------------------- | ---------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `team-fortress-classic.webp`                        | Team Fortress Classic  | `tf2-mercenaries` | Clases de 1999 (soldado con casco, ingeniero…) en pose de póster militar              |
| `counter-strike-1-6.webp`                           | Counter-Strike (1.6)   | `counter-strike`  | Terrorista con pasamontañas y AK-47, estilo 2000                                      |
| `counter-strike-condition-zero.webp`                | Condition Zero         | `counter-strike`  | Antiterrorista con casco y MP5, en acción                                             |
| `counter-strike-condition-zero-deleted-scenes.webp` | Deleted Scenes         | `counter-strike`  | Igual que el anterior pero con escena de misión (rehén o bomba), distinta composición |
| `counter-strike-source.webp`                        | Counter-Strike: Source | `counter-strike`  | GIGN o SAS con casco y fusil, pose lateral                                            |
| `counter-strike-global-offensive.webp`              | Global Offensive       | `counter-strike`  | Soldado de élite con chaleco y rifle moderno                                          |
| `counter-strike-2.webp`                             | Counter-Strike 2       | `counter-strike`  | Misma línea que GO con detalles actuales (humo volumétrico)                           |

## Entrega

- Una carpeta `lote-1/` con los 12 archivos y un `README` de una línea por archivo.
- Si algún dibujo no sale con la calidad de los actuales, **que lo diga** en lugar de entregarlo.
- Los iconos nuevos sustituyen a los repetidos al integrarlos; las fichas que ya los usan no cambian.

## Qué hace Claude después

Copiar a `public/images/icons/`, registrarlos en `src/data/universe-art.ts` (`lineIcons`) y `src/data/dossier-art.ts`, comprobar dibujo, tinte y tamaño en cada tarjeta y dossier, y anotar el crédito.
