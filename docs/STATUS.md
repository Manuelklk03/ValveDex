# Estado actual — ValveDex

Última actualización: **2026-10-14**.  
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

Comprobado por Claude Code el 2026-10-14 en `main` (`b27a831`, PR #26 fusionada).

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
- **Comparador de imágenes original/HD (PR #20, Manuel):**
  - `src/components/ui/image-compare.tsx` + `.module.css` (bloque `image-compare`): componente de cliente (`"use client"`, `useState`) con dos `next/image` superpuestas, `clip-path` según la posición y un `<input type="range">` etiquetado.
  - `src/domain/entry.ts`: la aparición pasa de `image?: MediaAsset` a `images?: EntryImages` (`original?`, `hd?`).
  - `getEntryThumbnail()` en `get-entries.ts`: devuelve la HD o, si falta, la original (miniatura del apartado).
  - Ficha: si la aparición tiene `original` y `hd`, muestra el comparador; si solo tiene una, la imagen sola con su crédito.
  - Ninguna ficha tiene todavía las dos imágenes: la escopeta solo tiene `hd`, así que el comparador aún no se ve en ninguna página.
- **Integridad de datos con Vitest (PR #21, Manuel):**
  - `vitest` 5.0.3 como dependencia de desarrollo; `vitest.config.mts` (alias `@`, entorno `node`). Renombrado desde `vitest.config.ts` el 2026-10-13 para que Vite lo cargue como ESM y desaparezca su aviso.
  - Scripts `test` (`vitest run`) y `test:watch`; `check` ejecuta ahora también `npm run test`.
  - `src/data/data-integrity.test.ts`, 13 pruebas: IDs y slugs únicos de universos, juegos (slug único por universo), apartados y fichas; juegos con universo existente; fichas con al menos una aparición, sin juegos repetidos ni inexistentes y con fuentes `https`; imágenes existentes en `public/`, con tamaño, `alt` y fuente, sin repetirse entre fichas, y original y HD del mismo tamaño.
- **Paso 15, fichas de muestra (PR #23, Manuel):** `src/data/entries.ts` pasa de 4 a 9 fichas, al menos una por categoría de fichas:
  - Mapa `black-mesa-inbound` (Half-Life).
  - Personaje `gordon-freeman` (los tres juegos, con resumen propio en Opposing Force y Blue Shift).
  - Enemigo `headcrab` (los tres juegos).
  - Curiosidad `goldsrc-engine` (slug `motor-goldsrc`, los tres juegos).
  - Easter egg `gordon-employee-of-the-month` (solo Opposing Force).
  - Fuentes de Combine OverWiki comprobadas por Claude el 2026-10-13 (respuesta 200 y datos presentes en la página).
  - Resultado: Half-Life tiene 6 apartados con contenido (Easter eggs sigue en «Próximamente» en Half-Life); Opposing Force, 5 con el lore; Blue Shift, 4 con el lore.
- **Paso 16, lore por juego (PR #24, Manuel):**
  - `src/domain/game-lore.ts`: `GameLore` (`gameId`, `paragraphs: string[]`, `sources`).
  - `src/data/game-lore.ts`: premisa sin spoilers de los tres juegos, con fuentes `*_storyline` de Combine OverWiki.
  - `src/features/games/get-game-lore.ts`: `getGameLore(gameId)` devuelve `GameLore | undefined`.
  - Página de apartado: `getSectionPageData()` devuelve una unión discriminada (`kind: "lore"` con `lore`, o `kind: "entries"` con `entries`); `hasSectionContent()` decide qué apartados genera `generateStaticParams`. El lore se muestra en un `<article>` (`section-page__lore`, `__lore-text`, `__sources`, `__source-link`).
  - Hub: la tarjeta «Lore» enlaza y muestra «Disponible» si el juego tiene lore (`hasLore`, `isAvailable`, `badge`).
  - 2 pruebas nuevas: el lore pertenece a juegos existentes (uno por juego como máximo) y tiene texto y fuentes `https`.
- **Paso 17, relaciones entre fichas (PR #26, Manuel, hecho en casa):**
  - `src/domain/entry-relation.ts`: `EntryRelationType = "used-by" | "found-in"` y `EntryRelation` (`fromId`, `toId`, `type`).
  - `src/data/entry-relations.ts`: 2 relaciones, palanca → Gordon Freeman (`used-by`) y Gordon Freeman → Black Mesa Inbound (`found-in`).
  - `getEntryById()` en `get-entries.ts`.
  - `src/features/catalog/get-related-entries.ts`: `getRelatedEntries(entryId)` devuelve `RelatedEntry[]` (`label`, `entry`) en los dos sentidos, con etiquetas de `Record<EntryRelationType, { outgoing; incoming }>`. Si un ID no existe, descarta la relación sin avisar (la prueba del paso 17b lo detecta antes).
  - Ficha: sección «Relacionado» (`entry-page__related`, `__related-label`, `__related-link`), solo si hay relaciones; reutiliza estilos con selectores agrupados.
- **Paso 17b (rama `test/entry-relations`, hecho por Claude a petición de Manuel el 2026-10-14, sin PR todavía):**
  - 3 pruebas nuevas en `data-integrity.test.ts`: las relaciones apuntan a fichas existentes, ninguna ficha se relaciona consigo misma y no hay relaciones repetidas. Comprobado que la primera falla con un ID mal escrito (`gordon-freman`).
  - `entry-relations.ts` importa con el alias `@/domain/entry-relation`.
  - Etiquetas sin género fijo y distintas de la sección «Aparece en» de los juegos: `used-by` → «Usuarios» / «Equipo»; `found-in` → «Ubicaciones» / «Presentes aquí».
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
| Vitest       | 5.0.3                                                             |

`next.config.ts` activa `cacheComponents` y `partialPrefetching`.

## Git

- Remoto: `https://github.com/Manuelklk03/ValveDex`.
- `main` en `b27a831`. PRs fusionadas:
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
  - #18 `fix/entry-images`.
  - #19 `docs/update-status`.
  - #20 `feature/image-compare`.
  - #21 `test/data-integrity` (2026-10-12).
  - #22 `docs/update-status`.
  - #23 `feature/skeleton-sample-entries`.
  - #24 `feature/game-lore` (2026-10-13).
  - #25 `docs/update-status`.
  - #26 `feature/entry-relations` (2026-10-14).
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
- Rama abierta: `test/entry-relations` (creada por Manuel desde `b27a831`), con tres commits de Claude: `4a08867` (documentación de la PR #26), `d988f1f` (paso 17b) y la documentación del paso 17b. Sin subir a GitHub.
- **`git pull` en `main`:** la configuración global `merge.ff=false` hace que un `git pull` normal cree un commit de merge local. Usar `git pull --ff-only` o configurar una vez `git config --global pull.ff only`.
- Criterio: una rama = una funcionalidad completa.
- **Si editas algo en GitHub** (por ejemplo, el README), haz `git checkout main && git pull` antes de seguir. Si la rama local ya tenía cambios en el mismo archivo, `git merge origin/main` producirá un conflicto que hay que resolver.

## Comprobaciones

Ejecutadas por Claude el 2026-10-14 en `test/entry-relations` (`d988f1f`):

| Comando         | Resultado                                                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check` | Superado: lint, tipos, formato y 18 pruebas de Vitest                                                                                                                                                    |
| `npm run build` | Superado                                                                                                                                                                                                 |
| HTML generado   | «Relacionado»: `/fichas/palanca` (Usuarios: Gordon Freeman), `/fichas/gordon-freeman` (Equipo: Palanca; Ubicaciones: Black Mesa Inbound) y `/fichas/black-mesa-inbound` (Presentes aquí: Gordon Freeman) |
| Prueba negativa | Con `toId: "gordon-freman"`, «apuntan a fichas existentes» falla e indica `crowbar → gordon-freman`; archivo restaurado después                                                                          |

Comprobado el 2026-10-13 (PR #24): se generan `/lore` en los tres juegos y el hub muestra «Disponible» en Lore.

Con `vitest.config.mts` ya no aparece el aviso de Vite sobre la configuración cargada como CommonJS.

Comprobado el 2026-10-12 en la PR #18: las 5 fuentes de Combine OverWiki respondían 200 y la ficha de la escopeta mostraba su imagen y el crédito completo.

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
- Half-Life no tiene easter eggs todavía (el apartado sigue en «Próximamente»); el texto del lore es solo la premisa, a la espera del control de spoilers.
- Las pruebas no comprueban que los textos coincidan con las fuentes: eso sigue siendo revisión manual.
- El comparador original/HD no tiene ninguna ficha con las dos imágenes: no se ha visto funcionando en una página real. Se deja para la fase de contenido (imágenes sin fondo, PNG o WebP con transparencia, original y HD del mismo tamaño).
- Las tablas del README sobre el universo Half-Life completo, los proyectos cancelados y los mods se escribieron sin contrastar con fuentes; llevan la nota «Lista en revisión».

## Pasos de la interfaz (guiados)

| Paso | Archivo(s)                                                                                        | Estado                |
| ---- | ------------------------------------------------------------------------------------------------- | --------------------- |
| 1–4  | Layout, paleta base, cabecera y pie                                                               | Hecho                 |
| 5–6  | Portada sobre Valve y Steam con la cronología                                                     | Hecho (PR #6–#8)      |
| 7    | Tipos `Universe` y `Game`, datos, `UniverseCard` y `/universos`                                   | Hecho (PR #9)         |
| 8    | `/universos/[universeSlug]` con juegos, 404 y tema Half-Life                                      | Hecho (PR #10)        |
| 9    | Hub de juego, apartados y tema propio por juego                                                   | Hecho (PR #11)        |
| 10   | Fichas: modelo `Entry`, página de apartado y página de ficha                                      | Hecho (PR #14)        |
| 11   | Página 404 propia                                                                                 | Hecho (PR #15)        |
| 12   | `gameIds` → `appearances` (datos propios de cada juego)                                           | Hecho (PR #16)        |
| 13   | Imágenes por aparición (`MediaAsset`, `next/image`)                                               | Hecho (PR #17 y #18)  |
| 13b  | Comparador de imágenes original/HD (`ImageCompare`, componente de cliente)                        | Hecho (PR #20)        |
| 14   | Pruebas de integridad de datos con Vitest                                                         | Hecho (PR #21)        |
| 15   | Esqueleto: una ficha de muestra por categoría y apariciones en OF y BS                            | Hecho (PR #23)        |
| 16   | Esqueleto: lore por juego y su página                                                             | Hecho (PR #24)        |
| 17   | Esqueleto: relaciones entre fichas y bloque «Relacionado»                                         | Hecho (PR #26)        |
| 17b  | Esqueleto: prueba de integridad de las relaciones, alias `@/` y etiquetas sin género              | Hecho, rama sin PR    |
| 18   | Esqueleto: `/explorar` con una fila horizontal por categoría y «Ver todo»                         | Pendiente             |
| 19   | Esqueleto: sección Valve (`/valve/historia`, `/valve/personas/[slug]`, `/valve/steam`)            | Pendiente             |
| 20   | Esqueleto: página de créditos generada desde los datos                                            | Pendiente             |
| —    | Fase de contenido: imágenes sin fondo, comparador visible, más fichas, revisión en navegador, E2E | Después del esqueleto |

## Siguiente paso

Decisión de Manuel (2026-10-13): **terminar primero el esqueleto** (todas las rutas y piezas con datos mínimos, pasos 15–20) y después la fase de contenido (imágenes sin fondo, comparador funcionando, más fichas, revisión visual).

Pasos 15, 16, 17 y 17b terminados (17b pendiente de PR).

1. Manuel, subir y fusionar la rama `test/entry-relations` (documentación y paso 17b):
   ```cmd
   git push -u origin test/entry-relations
   gh pr create --base main --fill
   gh pr merge --merge --delete-branch
   git checkout main && git pull --ff-only
   ```
2. **Paso 18** (guiado en modo plan): `/explorar` básico, con una fila horizontal por categoría (`scroll-snap`), enlace «Ver todo» y sin buscador todavía. El enlace «Explorar» de la cabecera da 404 desde el principio.
3. Pasos 19 (sección Valve) y 20 (créditos). Después, revisión completa de la documentación y el README para todo el proyecto Valve.
4. Pendiente de Manuel: revisar en `npm run dev` el lore, los apartados nuevos y «Relacionado» en móvil y con teclado.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
