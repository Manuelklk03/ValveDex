# Estado actual — ValveDex

Última actualización: **2026-10-10**.  
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

Comprobado por Claude Code el 2026-10-10 en la rama `feature/universes-data` (commit `81c0c5d` más la página `/universos` sin commit).

- Next.js inicializado en la raíz del repositorio. Terminal de Manuel: CMD en Windows.
- `src/app/layout.tsx`: `lang="es"`, metadatos con `title.template`, `<SiteHeader />` antes de `{children}` y `<SiteFooter />` después.
- `src/app/globals.css`: paleta base de Valve (`--background`, `--foreground`, `--surface`, `--border`, `--muted`, `--accent`, `--content-width`), expuesta a Tailwind con `@theme inline`, y `:focus-visible`.
- `next.config.ts`: la regla de Turbopack con `@tailwindcss/turbopack` se aplica solo a `globals.css`, para no anular CSS Modules (PR #7).
- `src/components/layout/`: `site-header` (Inicio, Universos, Explorar) y `site-footer` (aviso de fans no oficial), con CSS Modules y BEM.
- **Portada** (`src/app/page.tsx`, PR #8): hero, sección «Valve», sección «Historia de Valve» con `<Timeline milestones={getValveMilestones()} />` y sección «Steam».
  - Datos: `src/domain/source.ts`, `src/domain/milestone.ts`, `src/data/valve-milestones.ts` (5 hitos con fuentes) y `src/features/valve/get-valve-milestones.ts`.
  - Componente común `src/components/ui/timeline.tsx` + `.module.css`.
- **Paso 7a (commit `b0d40e2`, Manuel):**
  - `src/domain/universe.ts`: `UniverseStatus` (`"available" | "coming-soon"`) y `Universe` (`id`, `slug`, `name`, `description`, `status`).
  - `src/domain/game.ts`: `Game` (`id`, `slug`, `universeId`, `name`, `releaseYear`, `developer`, `description`, `sources`). La relación universo–juego vive solo en `Game.universeId`.
  - `src/data/universes.ts`: Half-Life (`available`); Portal, Team Fortress, Counter-Strike y Left 4 Dead (`coming-soon`).
  - `src/data/games.ts`: Half-Life (1998, Valve), Opposing Force (1999, Gearbox Software) y Blue Shift (2001, Gearbox Software), con fuentes de Wikipedia. Datos a contrastar por Manuel con las fuentes.
  - `src/features/universes/get-universes.ts`: `getUniverses()` (copia), `getUniverseBySlug(slug)` (`Universe | undefined`) y `getGamesByUniverse(universeId)` (filtrados y ordenados por año).
- **Paso 7b:**
  - `src/features/universes/components/universe-card.tsx` + `.module.css` (commit `81c0c5d`). BEM `universe-card` con el modificador `--coming-soon`. Solo los universos disponibles enlazan a `/universos/[slug]`; la tarjeta entera es clicable mediante `::after` del enlace. Muestra «N juegos» o «Próximamente».
  - `src/app/universos/page.tsx` + `page.module.css` (**sin commit**). Metadatos «Universos»; `<ul>` en grid `auto-fill` con `UniverseCard` y `gameCount` calculado con `getGamesByUniverse(...).length`.
- `/universos/half-life` todavía da 404 (paso 8). `/explorar` sigue sin existir.
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
- `main` en `985424f` (PR #8 `feature/valve-timeline` fusionada el 2026-10-09). PRs anteriores: #1–#6 (historial reconstruido), #7 `fix/errores-css`.
- `main` protegida: solo cambios por PR (0 aprobaciones, también para administradores), sin force push ni borrado. El repositorio borra las ramas al mergear.
- Configuración: local `branch.main.mergeoptions=--no-ff` y `pull.rebase=false`; global `pull.rebase=false` y `merge.ff=false`.
- Flujo: rama desde `main` actualizado → commits → `git push -u origin <rama>` (la primera vez) → `gh pr create --base main --fill` → `gh pr merge --merge --delete-branch` → `git checkout main && git pull`. Es `gh pr`, no `git pr`. En Git Bash, si falta `gh`: `export PATH="$PATH:/c/Program Files/GitHub CLI"`.
- Rama activa: `feature/universes-data` (`b0d40e2`, `81c0c5d`), sin PR. Sin commit: `src/app/universos/` y esta documentación. `universe-card.*` aparecen modificados solo por el cambio CRLF → LF de `npm run format`; `git diff` está vacío.
- Criterio: una rama = una funcionalidad completa. Esta rama se mergea con el 7b terminado.

## Comprobaciones

Ejecutadas por Claude el 2026-10-10 en `feature/universes-data`, con `src/app/universos/` sin commit:

| Comando                | Resultado                                             |
| ---------------------- | ----------------------------------------------------- |
| `npm run lint`         | Superado                                              |
| `npm run typecheck`    | Superado                                              |
| `npm run format:check` | Superado                                              |
| `npm run build`        | Superado: `/`, `/_not-found` y `/universos` estáticas |

Causa del CRLF: VS Code crea los archivos nuevos con CRLF. `.gitattributes` lo corrige al hacer commit, pero Prettier revisa la copia de trabajo. Solución: `npm run format`. Para que no se repita, configura VS Code con `"files.eol": "\n"` o cambia «CRLF → LF» en la barra de estado.

Comprobado el 2026-10-07: `npm audit --omit=dev` da 0 vulnerabilidades; `npm audit` da 5 altas solo en desarrollo (`eslint-config-next` → … → `braces`, GHSA-vfj7-8cjw-p6xm). No usar `npm audit fix --force`.

Según Manuel, no comprobado por el agente: `npm run dev` funciona. El agente no ha revisado en navegador (teclado, móvil) la cabecera, el pie, la portada ni `/universos`.

## Problemas pendientes

- Archivos nuevos creados con CRLF por el editor: configurar VS Code en LF.
- Alertas de `npm audit` en desarrollo.
- Registrar la versión de Node.js (`engines` o `.nvmrc`).
- `Frase para IA.txt` versionado en la raíz: decidir si se mueve a `docs/` o se elimina.
- CI pendiente.
- Comprobar las fechas, los desarrolladores y los enlaces de `src/data/games.ts` con las fuentes.

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                                          | Estado                                      |
| ---- | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| 1–4  | Layout, paleta base, cabecera y pie                                                 | Hecho                                       |
| 5    | Portada v1 sobre Valve y Steam                                                      | Hecho (PR #6, #7)                           |
| 6    | Cronología de Valve: tipos, datos, `Timeline` y sección en la portada               | Hecho (PR #8)                               |
| 7a   | Tipos `Universe` y `Game`, datos y lectura en `src/features/universes`              | Hecho (`b0d40e2`)                           |
| 7b   | `UniverseCard` y página `/universos`                                                | Aplicado; build superado; página sin commit |
| 8    | `/universos/[universeSlug]`: universo con sus juegos, tema propio (Half-Life) y 404 | Pendiente                                   |
| 9    | Hub de juego `/universos/[universeSlug]/[gameSlug]` y apartados                     | Pendiente                                   |
| —    | Varios idiomas con selector                                                         | Idea para el final (ver roadmap)            |

## Siguiente paso

1. Manuel: revisar `/universos` en `npm run dev`. Deben verse 5 tarjetas, Half-Life con «3 juegos» y el resto con «Próximamente»; Tab solo se detiene en Half-Life; en móvil se ve una columna.
2. Commit de `src/app/universos/` y de la documentación, `git push -u origin feature/universes-data`, `gh pr create --base main --fill`, `gh pr merge --merge --delete-branch` y `git checkout main && git pull`.
3. Paso 8 en una rama nueva desde `main`: página del universo con `getUniverseBySlug`, `notFound()` para slugs inexistentes, lista de juegos y tema Half-Life con variables CSS.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
