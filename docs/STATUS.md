# Estado actual — ValveDex

Última actualización: **2026-10-11**.  
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

Comprobado por Claude Code el 2026-10-11 en la rama `feature/game-hub` (commit `1b23835` más el paso 9b sin commit).

- Next.js inicializado en la raíz del repositorio. Terminal de Manuel: CMD en Windows.
- `src/app/layout.tsx`: `lang="es"`, metadatos con `title.template`, `<SiteHeader />` antes de `{children}` y `<SiteFooter />` después.
- `src/app/globals.css`: paleta base de Valve (`--background`, `--foreground`, `--surface`, `--border`, `--muted`, `--accent`, `--content-width`), expuesta a Tailwind con `@theme inline`, y `:focus-visible`.
- `next.config.ts`: la regla de Turbopack con `@tailwindcss/turbopack` se aplica solo a `globals.css`, para no anular CSS Modules (PR #7).
- `src/components/layout/`: `site-header` y `site-footer`, con CSS Modules y BEM.
- **Portada `/`** (PR #6–#8): hero, «Valve», «Historia de Valve» (`Timeline` + `getValveMilestones()`) y «Steam».
- **`/universos`** (PR #9): `UniverseCard` (`src/features/universes/components`) con el modificador `--coming-soon` y la tarjeta entera clicable mediante `::after` del enlace. Datos en `src/data/universes.ts` y `src/data/games.ts`; lectura en `src/features/universes/get-universes.ts`.
- **`/universos/[universeSlug]`** (PR #10):
  - `page.tsx`:
    - `generateStaticParams` genera solo los universos `available`.
    - `generateMetadata` pone el nombre del universo como título.
    - `notFound()` si el slug no existe o el universo es `coming-soon`.
    - Lista de juegos con estado vacío. Cada tarjeta enlaza a su hub (`universe-page__game-link` con `::after`) desde el 9b, sin commit.
  - `layout.tsx` + `src/features/universes/components/universe-theme.tsx`: envuelve el contenido en `universe-theme universe-theme--<id>`, que redefine las variables CSS.
  - Tema `half-life`: gris industrial y naranja HEV (`--accent: #f28c28`). Cabecera y pie quedan fuera del tema.
- **Paso 9a (commit `1b23835`, Manuel):**
  - `src/domain/game-section.ts`: `GameSectionId` (unión cerrada: `lore`, `maps`, `weapons`, `characters`, `enemies`, `trivia`, `easter-eggs`) y `GameSection` (`id`, `slug`, `name`, `description`).
  - `src/data/game-sections.ts`: los 7 apartados, con slug en español (`mapas`, `armas`, `personajes`, `enemigos`, `curiosidades`…).
  - `getGameBySlug(universeId, gameSlug)` añadido a `src/features/universes/get-universes.ts`.
  - Nueva funcionalidad `src/features/games/get-game-sections.ts` con `getGameSections()`, que devuelve una copia.
  - Se usan en el 9b.
- **Paso 9b (Manuel, sin commit):**
  - `src/app/universos/[universeSlug]/[gameSlug]/page.tsx` + `page.module.css` (bloque BEM `game-page`).
  - `generateStaticParams` anidado con `flatMap`: genera los universos disponibles con cada uno de sus juegos.
  - Función local `getUniverseAndGame()`, compartida por `generateMetadata` y la página.
  - `notFound()` si el universo no está disponible o el juego no pertenece a él.
  - Enlace «← universo» dentro de un `<nav>`.
  - Cabecera con año, desarrollador, descripción y fuentes; los 7 apartados en un grid con «Próximamente», sin enlace.
  - Hereda el tema del universo a través del layout de `[universeSlug]`.
  - En `[universeSlug]/page.tsx`: corregida la clase `universe-page-empty` → `universe-page__empty`, y `||` → `??` en `generateMetadata`.
- `/explorar` todavía no existe.
- Todavía no existe `src/lib`.

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
- `main` en `1de5125`. PRs fusionadas:
  - #1–#6: historial reconstruido.
  - #7 `fix/errores-css`.
  - #8 `feature/valve-timeline`.
  - #9 `feature/universes-data`.
  - #10 `feature/universe-page` (2026-10-11).
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
- Rama activa: `feature/game-hub` (`1b23835`), sin subir ni PR. Sin commit: el paso 9b y la documentación. Se fusiona cuando Manuel decida si el 9c (temas por juego) entra en esta rama o en otra.
- Criterio: una rama = una funcionalidad completa.

## Comprobaciones

Ejecutadas por Claude el 2026-10-11 en `feature/game-hub`, con el 9b sin commit:

| Comando                | Resultado                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Superado                                                                                                                                     |
| `npm run typecheck`    | Superado                                                                                                                                     |
| `npm run format:check` | Superado                                                                                                                                     |
| `npm run build`        | Superado. Estáticas: `/`, `/universos`, `/universos/half-life` y `/universos/half-life/half-life`; las otras 2 rutas de juego, parciales (◐) |

`LayoutProps` y `PageProps` los genera `next typegen` a partir de las rutas existentes. Al crear un `page.tsx` o un `layout.tsx` nuevo, ejecuta `npm run typecheck` (o mantén `npm run dev` abierto) y, si VS Code sigue marcando error, ejecuta «TypeScript: Restart TS Server».

Causa del CRLF: VS Code crea los archivos nuevos con CRLF. `.gitattributes` lo corrige al hacer commit, pero Prettier revisa la copia de trabajo. Solución: `npm run format`. Para que no se repita, configura VS Code con `"files.eol": "\n"` o cambia «CRLF → LF» en la barra de estado.

Comprobado el 2026-10-07: `npm audit --omit=dev` da 0 vulnerabilidades; `npm audit` da 5 altas solo en desarrollo (`eslint-config-next` → … → `braces`, GHSA-vfj7-8cjw-p6xm). No usar `npm audit fix --force`.

Según Manuel, no comprobado por el agente: `npm run dev` funciona. El agente no ha revisado en el navegador (teclado, móvil, contraste del tema Half-Life) ninguna página.

## Problemas pendientes

- Archivos nuevos creados con CRLF por el editor: configurar VS Code en LF.
- Alertas de `npm audit` en desarrollo.
- Registrar la versión de Node.js (`engines` o `.nvmrc`).
- `Frase para IA.txt` versionado en la raíz: decidir si se mueve a `docs/` o se elimina.
- CI pendiente.
- Comprobar las fechas, los desarrolladores y los enlaces de `src/data/games.ts` con las fuentes.

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                                                                                       | Estado                                        |
| ---- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 1–4  | Layout, paleta base, cabecera y pie                                                                                              | Hecho                                         |
| 5–6  | Portada sobre Valve y Steam con la cronología                                                                                    | Hecho (PR #6–#8)                              |
| 7    | Tipos `Universe` y `Game`, datos, `UniverseCard` y `/universos`                                                                  | Hecho (PR #9)                                 |
| 8    | `/universos/[universeSlug]` con juegos, 404 y tema Half-Life                                                                     | Hecho (PR #10)                                |
| 9a   | `GameSection`, `game-sections.ts`, `getGameBySlug`, `getGameSections`                                                            | Hecho (`1b23835`)                             |
| 9b   | `/universos/[universeSlug]/[gameSlug]` y enlaces desde la página del universo                                                    | Aplicado; check y build superados; sin commit |
| 9c   | Tema propio por juego: `GameTheme` + `[gameSlug]/layout.tsx` (p. ej. Opposing Force verde militar, Blue Shift azul de seguridad) | Decidido por Manuel; pendiente                |
| 10   | Apartados del hub y fichas (`Entry`)                                                                                             | Pendiente                                     |
| —    | Varios idiomas con selector                                                                                                      | Idea para el final (ver roadmap)              |

## Siguiente paso

1. Manuel: revisar en `npm run dev`:
   - `/universos/half-life`: clic en una tarjeta → hub del juego.
   - «← Half-Life» vuelve al universo.
   - `/universos/portal/half-life` y `/universos/half-life/inventado` dan 404.
2. Commit del 9b y de la documentación.
3. 9c (guiado en modo plan), en esta rama o en una nueva:
   - `src/features/games/components/game-theme.tsx` + `.module.css`, con modificadores `game-theme--<gameId>`.
   - `src/app/universos/[universeSlug]/[gameSlug]/layout.tsx`.
   - Half-Life 1 no necesita entrada: hereda el tema del universo.
4. Push, PR y merge de la rama con el flujo habitual.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
