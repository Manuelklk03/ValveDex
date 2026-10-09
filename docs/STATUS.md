# Estado actual — ValveDex

Última actualización: **2026-10-09**.  
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

Comprobado por Claude Code el 2026-10-09 en la rama `feature/valve-timeline` (commit `5722bc6`).

- Next.js inicializado en la raíz del repositorio. Terminal de Manuel: CMD en Windows.
- `src/app/layout.tsx`: `lang="es"`, metadatos con `title.template`, `<SiteHeader />` antes de `{children}` y `<SiteFooter />` después.
- `src/app/globals.css`: paleta base de Valve (`--background`, `--foreground`, `--surface`, `--border`, `--muted`, `--accent`, `--content-width`), expuesta a Tailwind con `@theme inline`, y `:focus-visible`.
- `next.config.ts`: la regla de Turbopack con `@tailwindcss/turbopack` se aplica solo a `globals.css`. Antes usaba `"*.css"` y convertía los `.module.css` en CSS global, así que ninguna clase de CSS Modules llegaba al HTML (corregido en la PR #7).
- `src/components/layout/`: `site-header` (Inicio, Universos, Explorar) y `site-footer` (aviso de fans no oficial), con CSS Modules y BEM.
- `src/app/page.tsx` + `page.module.css`: portada v1 con hero, sección «Valve» y sección «Steam» (BEM `home-page`, `home-page__section-text`).
- **Paso 6a (commit `fd3d6fb`, Manuel):**
  - `src/domain/source.ts`: tipo `Source` (`title`, `url`).
  - `src/domain/milestone.ts`: tipo `Milestone` (`id`, `year`, `title`, `description`, `sources`).
  - `src/data/valve-milestones.ts`: 5 hitos (1996, 1998, 2003, 2004, 2022) con fuentes de Wikipedia.
  - `src/features/valve/get-valve-milestones.ts`: `getValveMilestones()` devuelve una copia ordenada por año.
  - Borrado el archivo `e` que se coló en `d2f0e04`.
- **Paso 6b.1 (commit `5722bc6`, Manuel):**
  - `src/components/ui/timeline.tsx`: componente de servidor `Timeline` con props tipadas (`TimelineProps`), estado vacío, `<ol>` con `key={milestone.id}`, `<time dateTime>`, `<h3>` y enlaces a las fuentes.
  - `src/components/ui/timeline.module.css`: BEM `timeline`, `__item`, `__year`, `__title`, `__description`, `__sources`, `__source-link`, `__empty`. Línea vertical con `border-left` y punto con `::before`.
  - El mismo commit incluye cambios en `Frase para IA.txt`.
  - El componente **todavía no se usa** en ninguna página.
- `/universos` y `/explorar` todavía no existen: sus enlaces dan 404.
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
- Historial de `main` reconstruido el 2026-10-08 con PRs reales y merge commits (#1–#6). Copias de seguridad temporales ya borradas.
- PR #7 `fix/errores-css` fusionada: `main` en `baccec6`.
- `main` protegida: solo cambios por PR (0 aprobaciones, también para administradores), sin force push ni borrado. El repositorio borra las ramas al mergear.
- Configuración comprobada el 2026-10-09:
  - Local: `branch.main.mergeoptions=--no-ff`, `pull.rebase=false`.
  - Global: `pull.rebase=false`, `merge.ff=false`.
- Flujo: rama desde `main` → commits → `git push` → `gh pr create --base main --fill` → `gh pr merge --merge --delete-branch` → `git checkout main && git pull`.
- Rama activa: `feature/valve-timeline`, **1 commit por delante** de `origin/feature/valve-timeline` (`5722bc6` sin subir). Sin PR todavía.
- Criterio acordado: una rama = una funcionalidad completa. `feature/valve-timeline` no se mergea hasta que el 6b.2 muestre la cronología en la portada.

## Comprobaciones

Ejecutadas por Claude el 2026-10-09 en `feature/valve-timeline` (`5722bc6`):

| Comando                | Resultado                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Superado                                                                                                    |
| `npm run typecheck`    | Superado                                                                                                    |
| `npm run format:check` | **Falla** en `timeline.tsx` y `timeline.module.css`: CRLF en la copia de trabajo (en el commit están en LF) |
| `npm run build`        | No ejecutado en esta sesión                                                                                 |

Causa del CRLF: VS Code crea los archivos nuevos con CRLF. `.gitattributes` lo corrige al hacer commit, pero Prettier revisa la copia de trabajo. Solución: `npm run format`. Para que no se repita, configura VS Code con `"files.eol": "\n"` o cambia «CRLF → LF» en la barra de estado.

Comprobado el 2026-10-07: `npm audit --omit=dev` da 0 vulnerabilidades; `npm audit` da 5 altas solo en desarrollo (`eslint-config-next` → … → `braces`, GHSA-vfj7-8cjw-p6xm). No usar `npm audit fix --force`.

Según Manuel, no comprobado por el agente: `npm run dev` funciona. Cabecera, pie y portada no se han revisado en navegador (teclado, móvil) por el agente.

## Problemas pendientes

- Archivos nuevos creados con CRLF por el editor: configurar VS Code en LF.
- Alertas de `npm audit` en desarrollo.
- Registrar la versión de Node.js (`engines` o `.nvmrc`).
- `Frase para IA.txt` versionado en la raíz y modificado en `5722bc6`: decidir si se mueve a `docs/` o se elimina.
- CI pendiente.

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                                                | Estado                              |
| ---- | ----------------------------------------------------------------------------------------- | ----------------------------------- |
| 1    | `src/app/layout.tsx`: idioma y metadatos                                                  | Hecho                               |
| 2    | `src/app/globals.css`: paleta base de Valve                                               | Hecho                               |
| 3    | `src/components/layout/site-header`                                                       | Hecho                               |
| 4    | `src/components/layout/site-footer`                                                       | Hecho                               |
| 5    | Portada v1 sobre Valve y Steam en `src/app/page.tsx`                                      | Hecho (PR #6, #7)                   |
| 6a   | Tipos `Source` y `Milestone`, datos `valve-milestones`, lectura `getValveMilestones`      | Hecho (`fd3d6fb`)                   |
| 6b.1 | `src/components/ui/timeline.tsx` + `timeline.module.css`                                  | Hecho (`5722bc6`); falta formato LF |
| 6b.2 | Sección «Historia de Valve» en `src/app/page.tsx` con `Timeline` y `getValveMilestones()` | Preparado, pendiente de aplicar     |
| 7    | Tipos `Universe` y `Game`, datos y lectura en `src/features/universes`                    | Pendiente (rama nueva desde `main`) |
| 8    | `/universos` con tarjetas de universo                                                     | Pendiente                           |
| 9    | `/universos/[universeSlug]` con tema por universo (Half-Life)                             | Pendiente                           |
| 10   | Hub de juego y apartados                                                                  | Pendiente                           |

## Siguiente paso

1. 6b.2 (Manuel, guiado en modo plan): importar `Timeline` y `getValveMilestones` en `page.tsx` y añadir la sección «Historia de Valve» entre «Valve» y «Steam».
2. `npm run format`, `npm run check`, `npm run build` y `npm run dev` (Tab y ancho móvil).
3. Commit `feat(home): mostrar la cronología de Valve en la portada`, `git push`, PR con `gh pr create --base main --fill`, `gh pr merge --merge --delete-branch` y `git checkout main && git pull`.
4. Paso 7 en una rama nueva desde `main`.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
