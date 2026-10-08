# Estado actual — ValveDex

Última actualización: **2026-10-07**.  
Fuente: Claude Code con acceso al repositorio local. Lo marcado «según Manuel» no lo ha comprobado el agente.  
Este archivo es el punto de continuación entre Claude, ChatGPT y Codex.

## Modo de trabajo

Manuel escribe el código guiado paso a paso: el asistente explica cada archivo, por qué se usa y su lógica, con respuestas breves. El asistente solo implementa directamente lo que Manuel pida. La documentación se actualiza cuando Manuel lo solicite.

## Visión del producto (decidida el 2026-10-07)

1. **Portada `/`:** solo sobre Valve: la empresa, Steam, su historia… Paleta oscura de estilo Valve.
2. **`/universos`:** todas las sagas de Valve con sus videojuegos. Al entrar en un universo (por ejemplo, Half-Life), la paleta cambia a la de esa saga.
3. **Hub de cada juego:** lore, mapas, armas, personajes, enemigos, curiosidades, easter eggs…
4. **Hub principal `/explorar`:** buscador global con carruseles horizontales por categoría (armas, mapas…) que mezclan todos los juegos. Previsto para la Entrega 2.

Primer contenido: universo Half-Life con Half-Life, Opposing Force y Blue Shift. Detalle técnico en [architecture.md](architecture.md) (rutas, temas por variables CSS) y objetivos en [roadmap.md](roadmap.md).

## Estado confirmado

- Next.js inicializado en la raíz del repositorio. `valvedex-base` ya no existe.
- La portada de ChatGPT nunca se aplicó (`page.module.css` no existe).
- `src/app/layout.tsx`: **aplicado por Manuel** (`lang="es"` y metadatos con `title.template`). Sin commit.
- `src/app/page.tsx` y `globals.css` siguen siendo la plantilla de create-next-app.
- Todavía no existen `src/features`, `src/components`, `src/domain`, `src/lib` ni `src/data`.
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
- Rama activa: `feat/base-layout`. Último commit: `63996a1 Proyecto inicializado`.
- Sin commit: `src/app/layout.tsx` y la documentación de esta sesión (AGENTS, STATUS, arquitectura, roadmap, CHANGELOG).

## Comprobaciones

Ejecutadas por Claude el 2026-10-07, antes de cambiar de rama:

| Comando                | Resultado                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run check`        | Superado                                                                                                           |
| `npm run build`        | Superado (`/` y `/_not-found` estáticas)                                                                           |
| `npm audit --omit=dev` | 0 vulnerabilidades                                                                                                 |
| `npm audit`            | 5 altas solo en desarrollo: `eslint-config-next` → … → `braces` (GHSA-vfj7-8cjw-p6xm). No usar `audit fix --force` |

Después de cambiar a `feat/base-layout`, `prettier --check .` **falla en 14 archivos**. La causa es que `core.autocrlf=true` reescribió los archivos con CRLF, mientras que `.prettierrc.json` exige `endOfLine: "lf"`. El contenido no ha cambiado.

Según Manuel, no comprobado por el agente: `npm run dev` funciona y el `postinstall` de `unrs-resolver` está bloqueado sin afectar a lint ni build.

## Problemas pendientes

- **Finales de línea (bloquea `npm run check`):** crear `.gitattributes` con `* text=auto eol=lf` y ejecutar `npx prettier --write .`.
- Alertas de `npm audit` en desarrollo.
- Registrar la versión de Node.js.
- `Frase para IA.txt` versionado en la raíz: decidir si se mueve a `docs/` o se elimina.
- CI pendiente.

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                             | Estado                  |
| ---- | ---------------------------------------------------------------------- | ----------------------- |
| 0    | Rama `feat/base-layout`                                                | Hecho                   |
| 1    | `src/app/layout.tsx`: idioma y metadatos                               | Aplicado, sin comprobar |
| 2    | `src/app/globals.css`: paleta base de Valve                            | Siguiente               |
| 3    | `src/components/layout/site-header` (Inicio, Universos, Explorar)      | Pendiente               |
| 4    | `src/components/layout/site-footer` (aviso de fans no oficial)         | Pendiente               |
| 5    | Portada sobre Valve y Steam en `src/app/page.tsx`                      | Pendiente               |
| 6    | Tipos `Universe` y `Game`, datos y lectura en `src/features/universes` | Pendiente               |
| 7    | `/universos` con tarjetas de universo                                  | Pendiente               |
| 8    | `/universos/[universeSlug]` con tema por universo (Half-Life)          | Pendiente               |
| 9    | Hub de juego y apartados                                               | Pendiente               |

## Siguiente paso

Corregir los finales de línea y comprobar con `npm run check`. Después, paso 2: `globals.css` con la paleta base de Valve.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
