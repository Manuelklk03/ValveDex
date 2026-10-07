# Estado actual — ValveDex

Última actualización: **2026-10-07**.  
Fuente de esta actualización: Claude Code con acceso al repositorio local; comandos ejecutados en esta sesión. Lo marcado como «según Manuel» no lo ha comprobado el agente.  
Este archivo es el punto de continuación entre Claude, ChatGPT y Codex.

## Estado confirmado

- La aplicación Next.js está inicializada en la raíz del repositorio (`Desktop\Proyecto ValveDex\ValveDex`), con README e historial Git conservados.
- La carpeta temporal `valvedex-base` ya no existe: la carpeta padre solo contiene `ValveDex`.
- `src/app/page.tsx`, `layout.tsx` y `globals.css` siguen siendo la **plantilla de create-next-app**. La portada propuesta por ChatGPT **no está aplicada**: `page.tsx` no tiene cambios y `src/app/page.module.css` no existe.
- `layout.tsx` mantiene `lang="en"` y los metadatos «Create Next App». Se cambiarán con la primera interfaz.
- Todavía no existen `src/features`, `src/components`, `src/domain`, `src/lib` ni `src/data`.
- La terminal habitual de Manuel es CMD en Windows.

## Versiones comprobadas

| Herramienta  | Versión                                 |
| ------------ | --------------------------------------- |
| Node.js      | 24.21.0 (sin `engines` ni `.nvmrc`)     |
| npm          | 12.1.0                                  |
| Next.js      | 16.4.0 (App Router, `src/`, alias `@/*`) |
| React        | 19.3.0                                  |
| TypeScript   | 5.9.3, `strict: true`                   |
| Tailwind CSS | 4.3.3, cargado con `@tailwindcss/turbopack` |
| ESLint       | 9.39.5 con `eslint-config-next` 16.4.0 y `eslint-config-prettier` |
| Prettier     | 3.9.9                                   |

`next.config.ts` activa `cacheComponents` y `partialPrefetching`.

## Qué existe y qué falta

| Elemento                                          | Estado                                                   |
| ------------------------------------------------- | -------------------------------------------------------- |
| Repositorio, README y documentación de agentes    | En el repositorio                                        |
| package.json, dependencias y lockfile             | Creados; nombre `valvedex`                               |
| ESLint, Prettier, TypeScript y scripts de calidad | Configurados y verificados (ver comprobaciones)          |
| Versión de Node registrada en el proyecto         | Pendiente (`engines` o `.nvmrc`)                         |
| Interfaz, layout común y catálogo                 | Pendientes; la portada sigue siendo la plantilla         |
| Tests, CI y despliegue                            | Pendientes                                               |

## Decisiones vigentes

- Producto: enciclopedia de todos los juegos de Valve, incorporados por fases.
- Primera entrega: Half-Life, Opposing Force y Blue Shift.
- Después: Half-Life 2, Ricochet y el resto del catálogo.
- Stack: React + Next.js App Router + TypeScript + npm.
- Estilos: Tailwind y CSS Modules con BEM para el CSS propio.
- Objetivo: proyecto de portfolio y aprendizaje práctico de frontend React.
- README: su revisión visual y la retirada de la sección de instalación local están aplazadas por Manuel. No modificarlo por ahora.
- Backend, base de datos y despliegue: sin decisión definitiva.
- No ejecutar `npm audit fix --force`: propone bajar `eslint-config-next` a 14.2.35.

## Git y comprobaciones

Consultado por Claude el 2026-10-07:

- Remoto: `https://github.com/Manuelklk03/ValveDex`.
- Rama activa: `Inicializar-Proyecto`, 1 commit por delante de `origin/Inicializar-Proyecto` (sin `push`). Último commit: `adda729 Config del proyecto Inicializada`.
- La rama `Inicializar-Proyecto` aún no está fusionada en `main`. La rama `feat/base-layout` **no existe**.
- Antes de esta actualización el árbol estaba limpio. Cambios de esta sesión sin commit: `docs/STATUS.md`, `docs/roadmap.md`, `docs/architecture.md`, `CHANGELOG.md`.

Ejecutado por Claude el 2026-10-07:

| Comando                 | Resultado                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`         | Superado: lint sin avisos, `next typegen && tsc --noEmit` correcto y Prettier sin diferencias                                                     |
| `npm run build`         | Superado: compilación, TypeScript y generación estática de `/` y `/_not-found`                                                                    |
| `npm audit --omit=dev`  | 0 vulnerabilidades                                                                                                                                |
| `npm audit`             | 5 vulnerabilidades altas solo en desarrollo: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces` (GHSA-vfj7-8cjw-p6xm) |

Según Manuel, no comprobado por el agente:

- `npm run dev` arranca y la página inicial se ve en el navegador.
- El script `postinstall` de `unrs-resolver` está bloqueado; lint y build funcionan igualmente.

## Problemas pendientes

- Alertas de `npm audit` en la cadena de desarrollo; esperar a una versión de `eslint-config-next` que lo corrija o valorar un `overrides` de `braces` comprobando después lint.
- Registrar la versión de Node.js compatible.
- `Frase para IA.txt` está versionado en la raíz; decidir si se mueve a `docs/` o se elimina.
- Primera CI de lint, tipos, formato y build.

## Siguiente paso

**Estructura base y primera interfaz (Entrega 1).**

1. Subir `Inicializar-Proyecto`, abrir una pull request hacia `main` y fusionarla.
2. Crear `feat/base-layout` desde `main` actualizado.
3. Sustituir la plantilla: `lang="es"`, metadatos de ValveDex, variables de diseño en `globals.css` y layout común (cabecera, navegación y pie) en `src/components/layout/`, con CSS Modules y BEM.
4. Crear una portada propia que presente los tres juegos iniciales. Revisar la propuesta de ChatGPT antes de reutilizarla, ya que no está en el repositorio.
5. Ejecutar `npm run check` y `npm run build`, y revisar móvil, escritorio y teclado.

## Cómo actualizar este archivo

Al terminar una tarea, actualiza el contenido anterior para que describa el estado vigente, sin acumular copias completas de sesiones antiguas. Registra:

- Fecha y quién aporta la evidencia: agente con acceso al repositorio o confirmación del usuario.
- Qué se ha aplicado y qué archivos han cambiado.
- Rama y commit, solo si se han consultado; cambios sin commit, si existen.
- Comandos ejecutados y resultados reales; revisiones manuales realizadas.
- Bloqueos pendientes y una siguiente tarea concreta.

Si solo se entregan instrucciones, indica «preparadas, pendientes de aplicar». Marca tareas del roadmap solo al completarlas; registra cambios relevantes terminados en CHANGELOG.

## Para continuar en otra IA

Comparte el repositorio actualizado o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados. Ningún chat conoce automáticamente los cambios hechos en otro.
