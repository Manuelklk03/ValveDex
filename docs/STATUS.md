# Estado actual — ValveDex

Última actualización: **2026-10-12**.  
Fuente: Claude Code con acceso al repositorio local. Lo marcado «según Manuel» no lo ha comprobado el agente.  
Este archivo es el punto de continuación entre Claude, ChatGPT y Codex.

## Modo de trabajo

Manuel escribe el código guiado paso a paso. En **modo plan**, el asistente explica cada archivo, por qué se usa y su lógica, con respuestas breves. En **modo auto**, el asistente solo actualiza documentación (este archivo y, si corresponde, roadmap y CHANGELOG) y no toca código, configuración ni dependencias. Solo implementa código cuando Manuel lo pide expresamente (tareas tediosas). No se pasa al paso siguiente hasta que Manuel confirma que ha terminado el actual.

## Visión del producto (decidida el 2026-10-07)

1. **Portada `/`:** solo sobre Valve: la empresa, Steam, su historia… Paleta oscura de estilo Valve.
2. **`/universos`:** todas las sagas de Valve con sus videojuegos. Al entrar en un universo (por ejemplo, Half-Life), la paleta cambia a la de esa saga.
3. **Hub de cada juego:** lore, mapas, armas, personajes, enemigos, curiosidades, easter eggs…
4. **Hub principal `/explorar`:** buscador global con carruseles horizontales por categoría (armas, mapas…) que mezclan todos los juegos. Previsto para la Entrega 2.

Primer contenido: universo Half-Life con Half-Life, Opposing Force y Blue Shift. Detalle técnico en [architecture.md](architecture.md) (rutas, temas por variables CSS) y objetivos en [roadmap.md](roadmap.md).

## Estado confirmado

Comprobado por Claude Code el 2026-10-12 en `main` (`7abf44e`, PR #18 fusionada).

- Next.js inicializado en la raíz del repositorio. Terminal de Manuel: CMD en Windows.
- `src/app/layout.tsx`: `lang="es"`, metadatos con `title.template`, `<SiteHeader />` y `<SiteFooter />`.
- `src/app/globals.css`: paleta base de Valve en variables CSS, expuesta a Tailwind con `@theme inline`, y `:focus-visible`.
- `next.config.ts`: el loader de Tailwind solo procesa `globals.css`, para no anular CSS Modules (PR #7).
- **Portada `/`** (PR #6–#8): hero, «Valve», «Historia de Valve» (`Timeline` + `getValveMilestones()`) y «Steam».
- **`/universos`** (PR #9): `UniverseCard` con el modificador `--coming-soon` y la tarjeta entera clicable.
- **`/universos/[universeSlug]`** (PR #10): juegos enlazados a su hub, 404 para universos inexistentes o «Próximamente». `layout.tsx` + `UniverseTheme` (tema `half-life`).
- **`/universos/[universeSlug]/[gameSlug]`** (PR #11):
  - Hub con cabecera, fuentes y apartados.
  - `layout.tsx` + `GameTheme` (`src/features/games/components`): temas `half-life-opposing-force` (verde militar) y `half-life-blue-shift` (azul). Half-Life hereda el del universo.
  - `UniverseTheme` es flex en columna para que el tema del juego ocupe todo el alto.
- **Paso 10a (`ad31935`):**
  - `src/domain/entry.ts`: `EntryCategory = Exclude<GameSectionId, "lore">` y `Entry` (`id`, `slug`, `name`, `category`, `summary`, `gameIds`, `sources`).
  - `src/data/entries.ts`: 4 armas de Half-Life (palanca, pistola de 9 mm, revólver .357, escopeta) con fuentes de Combine OverWiki.
  - `src/features/catalog/get-entries.ts`: `getEntriesByGameAndCategory()`, ordenadas con `localeCompare(…, "es")`.
- **Paso 10b (`2654a6e`, `4933ff5`):**
  - Type guard `isEntryCategory()` en `src/domain/entry.ts`.
  - `getUniverseAndGame()` movida a `get-universes.ts`.
  - `getGameSectionBySlug()`.
  - El hub cuenta las fichas de cada apartado: los que tienen fichas enlazan y muestran «N fichas» (modificador `game-page__card--available`); el resto, «Próximamente».
  - Nueva ruta `[gameSlug]/[sectionSlug]` (bloque BEM `section-page`):
    - `generateStaticParams` triple, solo para apartados con fichas.
    - `getSectionPageData()`.
    - 404 para el lore y para slugs inexistentes.
    - Lista de fichas.
- **Paso 10c (Manuel, `a1aae3a`, PR #14):**
  - Nuevas funciones `getEntries()`, `getEntryBySlug()`, `getUniverseById()`, `getGameById()` y `getGameSectionById()`.
  - Nueva ruta `src/app/fichas/[entrySlug]/`:
    - `layout.tsx` anida `UniverseTheme` y `GameTheme` del primer juego de la ficha.
    - `page.tsx` + `page.module.css` (bloque `entry-page`): categoría, nombre, resumen, «Aparece en» (enlaces al hub, calculados con `flatMap`) y fuentes.
  - Cada ficha de la página de apartado enlaza a `/fichas/[slug]` (`section-page__entry-link` con `::after`).
- **Paso 11 (PR #15):** `src/app/not-found.tsx` + `not-found.module.css` (bloque `not-found-page`). Se muestra con `notFound()` y con URLs sin ruta, dentro del layout raíz y con la paleta de Valve, con enlaces a Inicio y Universos.
- **Paso 12 (PR #16, decisión «opción B» de Manuel):** cada ficha guarda `appearances: EntryAppearance[]` (`gameId`, `summary?`, `image?`) en lugar de `gameIds`.
  - `getEntryAppearance()` y `getEntrySummaryForGame()` en `get-entries.ts`.
  - La página de apartado muestra el resumen del juego.
  - La ficha muestra el resumen y la imagen de cada aparición.
- **Paso 13 (PR #17 y #18):**
  - `src/domain/media-asset.ts`: `MediaAsset` (`src`, `alt`, `width`, `height`, `source`, `credit?`, `license?`).
  - Imágenes en `public/images/entries/<id>-<juego>.<ext>`. Primera: `spas-12-half-life.jpg` (731 × 453, `File:W_shotgun_hd.jpg` de Combine OverWiki, modelo del High Definition Pack, licencia `Gamescreenshot`: material del juego © Valve).
  - Ficha: `next/image` dentro de `<figure>` con crédito y enlace a la fuente.
  - Apartado: miniatura decorativa (`alt=""`).
  - La PR #17 se fusionó con errores, corregidos por Claude en la PR #18 a petición de Manuel:
    - Faltaba el archivo de imagen.
    - Las 4 armas tenían el bloque de imagen de la escopeta, con `width`/`height` 0.
    - Un comentario de ejemplo había sustituido el nombre, el enlace y el resumen de cada ficha en la página de apartado.
    - Las fuentes apuntaban a una página de desambiguación (`SPAS-12`); ahora apuntan a los artículos reales.
- `README.md` actualizado el 2026-10-12 con la visión y el estado actuales: recorrido por niveles, temas, universo Half-Life completo, proyectos cancelados y mods. Manuel también lo editó en GitHub (PR #12 y #13); el conflicto se resolvió conservando la versión de la rama, que incluía esos cambios y el estado más reciente.
- `/explorar` todavía no existe. Todavía no existe `src/lib`.

## Versiones comprobadas

| Herramienta  | Versión                                                           |
| ------------ | ----------------------------------------------------------------- |
| Node.js      | 24.21.0 (sin `engines` ni `.nvmrc`)                               |
| npm          | 12.1.0                                                            |
| Next.js      | 16.4.0 (App Router, `src/`, alias `@/*`)                          |
| React        | 19.3.0                                                            |
| TypeScript   | 5.9.3, `strict: true`                                             |
| Tailwind CSS | 4.3.3, cargado con `@tailwindcss/turbopack`                       |
| ESLint       | 9.39.5 con `eslint-config-next` 16.4.0 y `eslint-config-prettier` |
| Prettier     | 3.9.9                                                             |

`next.config.ts` activa `cacheComponents` y `partialPrefetching`.

## Git

- Remoto: `https://github.com/Manuelklk03/ValveDex`.
- `main` en `7abf44e`. PRs fusionadas:
  - #1–#6: historial reconstruido.
  - #7 `fix/errores-css`.
  - #8 `feature/valve-timeline`.
  - #9 `feature/universes-data`.
  - #10 `feature/universe-page`.
  - #11 `feature/game-hub`.
  - #12 y #13: README editado directamente en GitHub.
  - #14 `feature/catalog-entries`.
  - #15 `feature/not-found`.
  - #16 `refactor/entry-appearances`.
  - #17 `feature/entry-images`.
  - #18 `fix/entry-images` (2026-10-12).
- `main` protegida: solo cambios por PR (0 aprobaciones, también para administradores), sin force push ni borrado. El repositorio borra las ramas al mergear.
- Configuración: local `branch.main.mergeoptions=--no-ff` y `pull.rebase=false`; global `pull.rebase=false` y `merge.ff=false`.
- Flujo:
  1. Rama desde `main` actualizado.
  2. Commits.
  3. `git push -u origin <rama>` (la primera vez).
  4. `gh pr create --base main --fill`.
  5. `gh pr merge --merge --delete-branch`.
  6. `git checkout main && git pull`.
- Es `gh pr`, no `git pr`. En Git Bash, si falta `gh`: `export PATH="$PATH:/c/Program Files/GitHub CLI"`.
- Esta actualización de la documentación va en la rama `docs/update-status`. Tras fusionarla no queda ninguna otra rama.
- Criterio: una rama = una funcionalidad completa.
- **Si editas algo en GitHub** (por ejemplo, el README), haz `git checkout main && git pull` antes de seguir. Si la rama local ya tenía cambios en el mismo archivo, `git merge origin/main` producirá un conflicto que hay que resolver.

## Comprobaciones

Ejecutadas por Claude el 2026-10-12 en `fix/entry-images` (`03c9145`, PR #18):

| Comando               | Resultado                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`       | Superado (lint, tipos y formato)                                                                                                                                                                                                                 |
| `npm run build`       | Superado                                                                                                                                                                                                                                         |
| `next start` + `curl` | `/universos/half-life/half-life/armas` muestra las 4 fichas con nombre y enlace; solo la escopeta lleva imagen (731 × 453, servida por `/_next/image`, 200). `/fichas/escopeta` muestra el crédito completo. `/fichas/palanca` no muestra figura |
| URLs de las fuentes   | Las 5 fuentes de Combine OverWiki responden 200                                                                                                                                                                                                  |

`LayoutProps` y `PageProps` los genera `next typegen` a partir de las rutas existentes. Al crear un `page.tsx` o un `layout.tsx` nuevo, ejecuta `npm run typecheck` (o mantén `npm run dev` abierto) y, si VS Code sigue marcando error, ejecuta «TypeScript: Restart TS Server».

Causa del CRLF: VS Code crea los archivos nuevos con CRLF. `.gitattributes` lo corrige al hacer commit, pero Prettier revisa la copia de trabajo. Solución: `npm run format`. Para que no se repita, configura VS Code con `"files.eol": "\n"` o cambia «CRLF → LF» en la barra de estado.

Comprobado el 2026-10-07: `npm audit --omit=dev` da 0 vulnerabilidades; `npm audit` da 5 altas solo en desarrollo (`eslint-config-next` → … → `braces`, GHSA-vfj7-8cjw-p6xm). No usar `npm audit fix --force`.

Según Manuel, no comprobado por el agente: `npm run dev` funciona. El agente ha comprobado el HTML servido, pero no ha revisado en un navegador (teclado, móvil, contraste de los temas) ninguna página.

## Problemas pendientes

- Archivos nuevos creados con CRLF por el editor: configurar VS Code en LF.
- Alertas de `npm audit` en desarrollo.
- Registrar la versión de Node.js (`engines` o `.nvmrc`).
- `Frase para IA.txt` versionado en la raíz: decidir si se mueve a `docs/` o se elimina.
- CI pendiente.
- Comprobar con las fuentes los datos de `src/data/games.ts` y los textos de `src/data/entries.ts`, y si las armas aparecen también en las expansiones. Los enlaces de las fichas ya se han verificado (2026-10-12).
- Sin comprobaciones automáticas de integridad de datos: los errores de la PR #17 (archivo de imagen inexistente, datos copiados de otra ficha, tamaños a 0) solo se detectaron revisando a mano.
- Las tablas del README sobre el universo Half-Life completo, los proyectos cancelados y los mods se escribieron sin contrastar con fuentes; llevan la nota «Lista en revisión».

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                                             | Estado               |
| ---- | -------------------------------------------------------------------------------------- | -------------------- |
| 1–4  | Layout, paleta base, cabecera y pie                                                    | Hecho                |
| 5–6  | Portada sobre Valve y Steam con la cronología                                          | Hecho (PR #6–#8)     |
| 7    | Tipos `Universe` y `Game`, datos, `UniverseCard` y `/universos`                        | Hecho (PR #9)        |
| 8    | `/universos/[universeSlug]` con juegos, 404 y tema Half-Life                           | Hecho (PR #10)       |
| 9    | Hub de juego, apartados y tema propio por juego                                        | Hecho (PR #11)       |
| 10   | Fichas: modelo `Entry`, página de apartado y página de ficha                           | Hecho (PR #14)       |
| 11   | Página 404 propia                                                                      | Hecho (PR #15)       |
| 12   | `gameIds` → `appearances` (datos propios de cada juego)                                | Hecho (PR #16)       |
| 13   | Imágenes por aparición (`MediaAsset`, `next/image`)                                    | Hecho (PR #17 y #18) |
| —    | Integridad de datos, relaciones, más fichas, lore, Explorar, cancelados, mods, idiomas | Ver roadmap          |

## Siguiente paso

1. Manuel: revisar en `npm run dev` la escopeta en «Armas» y en su ficha (imagen, crédito, móvil).
2. Paso 14 propuesto: **comprobaciones de integridad de datos**. Pide la Entrega 1 y habría detectado los errores de la PR #17:
   - IDs y slugs únicos.
   - Referencias válidas (`gameId`, `universeId`).
   - Imágenes existentes en `public/` con tamaño mayor que 0.
   - Fuentes presentes.

   Requiere elegir y añadir una herramienta de pruebas (Vitest, prevista en la arquitectura).

3. Después: relaciones entre fichas, más fichas y las expansiones.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
