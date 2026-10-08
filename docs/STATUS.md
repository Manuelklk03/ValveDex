# Estado actual — ValveDex

Última actualización: **2026-10-08**.  
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

Comprobado por Claude Code el 2026-10-08 en `main` (commit `296a3da` más cambios sin commit del pie).

- Next.js inicializado en la raíz del repositorio.
- `src/app/layout.tsx`: `lang="es"`, metadatos con `title.template`, `<SiteHeader />` antes de `{children}` y `<SiteFooter />` después.
- `src/app/globals.css`: paleta base de Valve (`--background`, `--foreground`, `--surface`, `--border`, `--muted`, `--accent`, `--content-width`), expuesta a Tailwind con `@theme inline`, y `:focus-visible`.
- Cabecera en `src/components/layout/site-header.tsx`: enlaces Inicio, Universos y Explorar generados con `map`, CSS Modules + BEM. Funciona: el build pasa.
  - CSS renombrado a `site-header.module.css` (kebab-case) e import ajustado.
- Pie en `src/components/layout/site-footer.tsx` + `site-footer.module.css`: `<footer>` con aviso de proyecto de fans no oficial; BEM `site-footer`, `__inner`, `__notice`; `margin-top: auto` para quedarse abajo. Escrito por Manuel, sin commit.
- `.gitattributes` creado y commiteado (`* text=auto eol=lf` y binarios).
- `/universos` y `/explorar` todavía no existen: sus enlaces dan 404.
- `src/app/page.tsx` sigue siendo la plantilla de create-next-app.
- Todavía no existen `src/features`, `src/domain`, `src/lib` ni `src/data`.
- Terminal de Manuel: CMD en Windows.

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
- Rama activa: `main`. Último commit: `296a3da Arreglo de Prettier y Update de status`. Ramas: local `component/header`; remotas `feat/base-layout`, `component/header` e `Inicializar-Proyecto`. Se está trabajando directamente en `main`.
- Sin commit: `src/app/layout.tsx`, `src/components/layout/site-footer.tsx`, `site-footer.module.css` (nuevos) y este archivo.

## Comprobaciones

Ejecutadas por Claude el 2026-10-08 con el pie aplicado:

| Comando         | Resultado                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------- |
| `npm run check` | **Falla** solo en `format:check`: `site-footer.tsx` y `site-footer.module.css` están en CRLF |
| `npm run build` | Superado (`/` y `/_not-found` estáticas), con cabecera y pie                                 |

Causa: el editor crea los archivos nuevos con CRLF. `.gitattributes` lo corrige al hacer commit, pero Prettier revisa la copia de trabajo. Solución: `npm run format` y, para que no se repita, configurar VS Code con finales de línea LF (`"files.eol": "
"`, o «CRLF → LF» en la barra de estado).

Comprobado el 2026-10-07: `npm audit --omit=dev` 0 vulnerabilidades; `npm audit` 5 altas solo en desarrollo (`eslint-config-next` → … → `braces`, GHSA-vfj7-8cjw-p6xm). No usar `npm audit fix --force`.

Según Manuel, no comprobado por el agente: `npm run dev` funciona y el `postinstall` de `unrs-resolver` está bloqueado sin afectar a lint ni build. La cabecera no se ha revisado en navegador (teclado, móvil) por el agente.

## Problemas pendientes

- Archivos nuevos creados con CRLF por el editor: configurar VS Code en LF.
- Alertas de `npm audit` en desarrollo.
- Registrar la versión de Node.js.
- `Frase para IA.txt` versionado en la raíz: decidir si se mueve a `docs/` o se elimina.
- CI pendiente.

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                             | Estado                          |
| ---- | ---------------------------------------------------------------------- | ------------------------------- |
| 0    | Rama `feat/base-layout`                                                | Hecho                           |
| 1    | `src/app/layout.tsx`: idioma y metadatos                               | Hecho (commit)                  |
| 2    | `src/app/globals.css`: paleta base de Valve                            | Hecho (commit)                  |
| 3    | `src/components/layout/site-header` (Inicio, Universos, Explorar)      | Hecho                           |
| 4    | `src/components/layout/site-footer` (aviso de fans no oficial)         | Hecho (build); falta formato LF |
| 5    | Portada sobre Valve y Steam en `src/app/page.tsx`                      | Pendiente                       |
| 6    | Tipos `Universe` y `Game`, datos y lectura en `src/features/universes` | Pendiente                       |
| 7    | `/universos` con tarjetas de universo                                  | Pendiente                       |
| 8    | `/universos/[universeSlug]` con tema por universo (Half-Life)          | Pendiente                       |
| 9    | Hub de juego y apartados                                               | Pendiente                       |

## Siguiente paso

1. `npm run format` y `npm run check` hasta que pase; configurar VS Code con LF.
2. Revisar en `npm run dev` cabecera y pie: pie abajo, Tab, ancho móvil (no revisado por el agente en navegador).
3. Commit del pie.
4. Paso 5: portada sobre Valve y Steam en `src/app/page.tsx`, sustituyendo la plantilla (se explicará en modo plan).

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
