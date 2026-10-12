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

Comprobado por Claude Code el 2026-10-12 en la rama `feature/catalog-entries` (commit `4933ff5` más el paso 10c sin commit).

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
  - `src/data/entries.ts`: 4 armas de Half-Life (palanca, pistola de 9 mm, revólver .357, escopeta) con fuentes de Combine OverWiki y `gameIds: ["half-life"]`.
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
- **Paso 10c (Manuel, sin commit):**
  - Nuevas funciones `getEntries()`, `getEntryBySlug()`, `getUniverseById()`, `getGameById()` y `getGameSectionById()`.
  - Nueva ruta `src/app/fichas/[entrySlug]/`:
    - `layout.tsx` anida `UniverseTheme` y `GameTheme` del primer juego de la ficha.
    - `page.tsx` + `page.module.css` (bloque `entry-page`): categoría, nombre, resumen, «Aparece en» (enlaces al hub, calculados con `flatMap`) y fuentes.
  - **Pendiente (punto 7 del 10c):** enlazar cada ficha desde la página de apartado.
- `README.md` actualizado por Claude el 2026-10-12 con la visión y el estado actuales: recorrido por niveles, temas, universo Half-Life completo, proyectos cancelados y mods. Sin commit.
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
- `main` en `cfb6fc1`. PRs fusionadas:
  - #1–#6: historial reconstruido.
  - #7 `fix/errores-css`.
  - #8 `feature/valve-timeline`.
  - #9 `feature/universes-data`.
  - #10 `feature/universe-page`.
  - #11 `feature/game-hub` (2026-10-11).
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
- Rama activa: `feature/catalog-entries` (`ad31935`, `2654a6e`, `4933ff5`), sin subir ni PR. Sin commit: el 10c (`src/app/fichas/`, `get-entries.ts`, `get-game-sections.ts`, `get-universes.ts`) y la documentación con el README.
- Criterio: una rama = una funcionalidad completa. Esta rama se cierra cuando las fichas sean accesibles desde su apartado.

## Comprobaciones

Ejecutadas por Claude el 2026-10-12 en `feature/catalog-entries`, con el 10c sin commit:

| Comando                | Resultado                                                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Superado                                                                                                                                                                |
| `npm run typecheck`    | Superado                                                                                                                                                                |
| `npm run format:check` | **Falla** en `src/app/fichas/[entrySlug]/layout.tsx`, `page.tsx` y `page.module.css`: CRLF. Se corrige con `npm run format`                                             |
| `npm run build`        | Superado: `/fichas/escopeta`, `/fichas/palanca`, `/fichas/pistola-9mm`, `/fichas/revolver-357` y `/universos/half-life/half-life/armas`, además de las rutas anteriores |

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
- Comprobar con las fuentes los datos de `src/data/games.ts` y `src/data/entries.ts` (enlaces de Combine OverWiki y si las armas aparecen también en las expansiones).
- Las tablas del README sobre el universo Half-Life completo, los proyectos cancelados y los mods se escribieron sin contrastar con fuentes; llevan la nota «Lista en revisión».

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                                         | Estado                                                                   |
| ---- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1–4  | Layout, paleta base, cabecera y pie                                                | Hecho                                                                    |
| 5–6  | Portada sobre Valve y Steam con la cronología                                      | Hecho (PR #6–#8)                                                         |
| 7    | Tipos `Universe` y `Game`, datos, `UniverseCard` y `/universos`                    | Hecho (PR #9)                                                            |
| 8    | `/universos/[universeSlug]` con juegos, 404 y tema Half-Life                       | Hecho (PR #10)                                                           |
| 9    | Hub de juego, apartados y tema propio por juego                                    | Hecho (PR #11)                                                           |
| 10a  | Tipo `Entry`, 4 armas de Half-Life y `getEntriesByGameAndCategory`                 | Hecho (`ad31935`)                                                        |
| 10b  | Apartados enlazados desde el hub y ruta `[sectionSlug]`                            | Hecho (`2654a6e`, `4933ff5`)                                             |
| 10c  | `/fichas/[entrySlug]` con tema, «Aparece en» y fuentes; enlaces desde el apartado  | Ficha aplicada; build superado; faltan los enlaces (punto 7) y el commit |
| —    | Más fichas, lore, Explorar, universo Half-Life completo, cancelados, mods, idiomas | Ver roadmap                                                              |

## Siguiente paso

1. Punto 7 del 10c (Manuel): enlazar las fichas en `[sectionSlug]/page.tsx` y su CSS.
2. `npm run format`, `npm run check`, `npm run build` y revisión en `npm run dev` del recorrido portada → ficha.
3. Commit del 10c y de la documentación, push, PR y merge de `feature/catalog-entries`.
4. Decidir el siguiente bloque: más fichas (personajes, enemigos) y contenido de Opposing Force y Blue Shift, página 404 propia, o empezar el lore.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
