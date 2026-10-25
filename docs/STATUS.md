# Estado actual — ValveDex

Última actualización: **2026-10-24**.
Fuente: Claude Code con acceso al repositorio local. Lo marcado «según Manuel» no lo ha comprobado el agente.
Este archivo es el punto de continuación entre Claude, ChatGPT y Codex.

## Versión actual: `v0.1.0` (esqueleto terminado)

El 2026-10-23 se cerró el **esqueleto** (pasos 15–22): todas las rutas y piezas existen, funcionan con datos de muestra y tienen pruebas. Se publica como `v0.1.0` (tag de Git y GitHub Release sobre el merge de la PR de documentación de ese día). **Lo siguiente es la fase de diseño** (ver [roadmap.md](roadmap.md#fase-de-diseño-después-del-esqueleto)); el asistente debe recordar a Manuel lo acordado para ella al empezar.

## Modo de trabajo

Manuel escribe el código guiado paso a paso. En **modo plan**, el asistente explica cada archivo, por qué se usa y su lógica, con respuestas breves. En cada cambio sobre un archivo existente indica las líneas exactas que hay que modificar y explica por qué y para qué se hace. Al final de cada paso entrega el mensaje de commit (ver «Git»). En **modo auto**, el asistente solo actualiza documentación (este archivo y, si corresponde, roadmap y CHANGELOG) y no toca código, configuración ni dependencias. Solo implementa código cuando Manuel lo pide expresamente (tareas tediosas). No se pasa al paso siguiente hasta que Manuel confirma que ha terminado el actual.

## Visión del producto (decidida el 2026-10-07)

1. **Portada `/`:** solo sobre Valve: la empresa, Steam, su historia… Paleta oscura de estilo Valve.
2. **`/universos`:** todas las sagas de Valve con sus videojuegos. Al entrar en un universo (por ejemplo, Half-Life), la paleta cambia a la de esa saga.
3. **Hub de cada juego:** lore, mapas, armas, personajes, enemigos, curiosidades, easter eggs…
4. **Hub principal `/explorar`:** buscador global con carruseles horizontales por categoría (armas, mapas…) que mezclan todos los juegos. Previsto para la Entrega 2.

Primer contenido: universo Half-Life con Half-Life, Opposing Force y Blue Shift. Detalle técnico en [architecture.md](architecture.md) (rutas, temas por variables CSS) y objetivos en [roadmap.md](roadmap.md).

## Estado confirmado

Comprobado por Claude Code el 2026-10-23 en `main` (`a0267e4`, PR #38 fusionada).

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
- **Paso 17b (PR #27, hecho por Claude a petición de Manuel el 2026-10-14):**
  - 3 pruebas nuevas en `data-integrity.test.ts`: las relaciones apuntan a fichas existentes, ninguna ficha se relaciona consigo misma y no hay relaciones repetidas. Comprobado que la primera falla con un ID mal escrito (`gordon-freman`).
  - `entry-relations.ts` importa con el alias `@/domain/entry-relation`.
  - Etiquetas sin género fijo y distintas de la sección «Aparece en» de los juegos: `used-by` → «Usuarios» / «Equipo»; `found-in` → «Ubicaciones» / «Presentes aquí».
- **Paso 18, `/explorar` básico (PR #28, Manuel, hecho en el portátil):**
  - `getEntriesByCategory(category)` en `get-entries.ts`: fichas de una categoría de todos los juegos.
  - `src/features/catalog/components/entry-card.tsx` + css: tarjeta de ficha reutilizable, clicable entera con `::after`.
  - `src/features/catalog/components/entry-row.tsx` + css: fila con título, carrusel horizontal con `scroll-snap` (sin JavaScript) y enlace «Ver todo» con el nombre de la categoría oculto con `sr-only` para lectores de pantalla.
  - `/explorar`: una fila por cada categoría con fichas. El enlace «Explorar» de la cabecera ya no da 404.
  - `/explorar/[categorySlug]`: ruta estática con todas las fichas de la categoría en una cuadrícula (`auto-fill` + `minmax`), contador y estado vacío; 404 para el lore y para slugs inexistentes.
  - Todavía sin buscador ni filtros (Entrega 2).
- **Paso 19, sección Valve (PR #29, Manuel, 2026-10-16 a 2026-10-19):**
  - 19a: `/valve/historia` con la cronología completa (`Timeline`). `getLatestValveMilestones(count)` en `get-valve-milestones.ts`: la portada muestra solo los 3 últimos hitos (2003, 2004 y 2022) y enlaza a la historia completa. `src/app/valve/valve-page.module.css`: bloque BEM `valve-page` compartido por las tres páginas.
  - 19b: `src/domain/valve-person.ts` (`ValvePerson`: `id`, `slug`, `name`, `role`, `summary`, `sources`), `src/data/valve-people.ts` (Gabe Newell y Mike Harrington), `src/features/valve/get-valve-people.ts` (`getValvePeople()` ordenadas por nombre, `getValvePersonBySlug()`) y la ruta estática `/valve/personas/[personSlug]` con 404. La sección «Valve» de la portada enlaza a cada fundador (`home-page__people`, `__person-role`, `__more-link`).
  - 19c: `/valve/steam`, con la historia de la plataforma y su fuente (Wikipedia). El texto está en la página; se pasará a `src/data` si crece. La sección «Steam» de la portada enlaza a ella.
  - 2 pruebas nuevas: hitos de Valve con `id` único y fuentes `https`; personas con `id` y `slug` únicos y fuentes `https`.
- **Plugins de Claude Code en el proyecto (PR #31, Claude del portátil a petición de Manuel, 2026-10-21):**
  - `.claude/settings.json` (versionado, compartido por los dos PCs) desactiva **solo en ValveDex** `caveman`, `superpowers`, `claude-mem`, `imagegen-skills`, `taste` y `ui-ux-pro-max`, porque recortan las explicaciones, imponen otro flujo de trabajo o generan código y estilos fuera de la convención BEM del proyecto. La configuración global (`~/.claude/settings.json`) sigue con todos activados para otros proyectos.
  - Siguen activos: `frontend-stack`, `frontend-design`, `impeccable`, `emil-design-eng`, `antislop`, `andrej-karpathy-skills`, `grill-me`, `claude-code-setup` y `ponytail`. Prevalecen las reglas de `AGENTS.md`: Manuel escribe el código y el asistente explica; un plugin no autoriza a implementar ni a resumir las explicaciones.
  - Comprobado por Claude el 2026-10-21 en el PC de sobremesa: tiene instalados los mismos plugins que el portátil (además de `headroom`, ya desactivado globalmente), así que el mismo `.claude/settings.json` sirve en los dos equipos sin cambios.
  - `ponytail` en nivel **lite** solo en este proyecto (`"env": { "PONYTAIL_DEFAULT_MODE": "lite" }` en `.claude/settings.json`, añadido por Claude el 2026-10-21): hace lo que se pide y menciona en una línea la alternativa más simple, sin recortar las explicaciones. Es el único de los plugins activos con opciones configurables; los demás no tienen ajustes. En otros proyectos sigue en `full`. Se aplica al abrir una sesión nueva.
  - `CLAUDE.md` tiene la sección «Plugins de Claude Code en ValveDex» (2026-10-21, a petición de Manuel): el asistente usa `grill-me` por su cuenta antes de pasos que definan datos o rutas nuevas y `antislop` para revisar textos y páginas nuevas antes de cerrar un paso; las skills de diseño, solo para revisar o pulir y siempre como pasos guiados en CSS Modules + BEM y sin dependencias nuevas.
  - `.gitignore` ignora `.claude/settings.local.json`, para que los ajustes personales de cada PC (permisos, preferencias) no se suban al repositorio.
  - Los cambios de plugins se aplican al abrir una sesión nueva de Claude Code: la sesión que estaba abierta durante el cambio aún cargó `caveman` y `ponytail` en modo completo.
- **Paso 20, créditos (PR #33, Manuel, 2026-10-22):** `src/features/credits/get-credits.ts` reúne las fuentes de juegos, lore, fichas, hitos y personas (`collectSourceUses()`), las agrupa por URL con un `Map` (`getSourceCredits()`, con `usedIn`) y lista las imágenes con su ficha, juego, crédito y licencia (`getImageCredits()`). Ruta `/creditos` (bloque BEM `credits-page`, `overflow-wrap: anywhere` para las URL largas) y enlace «Créditos y fuentes» en el pie. 3 pruebas junto a la función (lógica, no datos). Límite: la fuente de `/valve/steam` está escrita en la página y no aparece en los créditos.
- **Paso 21, campos por categoría (PR #34, Manuel, 2026-10-22):** `Entry` es una unión discriminada por `category` sobre `EntryBase`: armas (`slot`, `ammo?`), mapas (`chapter`), personajes (`affiliation`) y enemigos (`origin`); curiosidades y easter eggs sin `details`. Las 7 fichas afectadas tienen sus `details`. `getEntryFacts()` (`src/features/catalog`) los convierte en pares etiqueta–valor con un `switch`; la ficha muestra «Datos» con `<dl>` (`entry-page__facts`, `__fact`, `__fact-label`). 2 pruebas. Las ranuras y la munición no se han contrastado todavía con las fuentes.
- **Seguridad (PR #35, Codex a petición de Manuel, 2026-10-22):** Next.js 16.4.0 → 16.4.2 y `experimental.agentUpgrade: "security"` en `next.config.ts`. Con esa opción, `next build` **falla** si la versión instalada tiene una vulnerabilidad conocida: tras cambiar de PC o de rama con otras dependencias, ejecuta `npm ci` (instala exactamente el lockfile). Comprobado el 2026-10-23: el PC de sobremesa seguía con 16.4.0 instalado y el build fallaba hasta `npm ci`.
- **Paso 22a, mods (PR #36, Manuel, 2026-10-22):** `Game.baseGameId?` liga un mod a su juego. `getOfficialGamesByUniverse()` alimenta `/universos` y la página del universo; `getModsByGame()` la sección «Mods» del hub, y el hub de un mod enlaza a su juego base. Muestra: Sven Co-op. Prueba: cada mod depende de un juego oficial del mismo universo.
- **Paso 22b, proyectos cancelados (PR #38, Manuel con correcciones de Claude, 2026-10-23):** decisión de Manuel tras `grill-me`: un cancelado es un **juego** con hub propio, porque de algunos hay mucha información (mapas, armas…). `Game` es una unión discriminada por `status` (`released` con `releaseYear` | `cancelled` con `cancelledYear`); `getGameYear()` en `src/domain/game.ts` y `getGameYearLabel()` en `src/features/games`. `getOfficialGamesByUniverse()` y `getModsByGame()` solo cuentan juegos publicados; `getCancelledGamesByGame()` alimenta la sección «Proyectos cancelados» del hub del juego base (`game-page__cancelled`, `__cancelled-link`, agrupados con los de mods). Muestra: Half-Life para Dreamcast (fuente comprobada en Combine OverWiki). La prueba de mods cubre también los cancelados: hoy un cancelado necesita juego base; si aparece uno sin él, se relajará la regla y se listará en la página del universo. Corregido de paso un `<h3>` duplicado en la página del universo.
- Todavía no existe `src/lib`.

## Versiones comprobadas

| Herramienta  | Versión                                                           |
| ------------ | ----------------------------------------------------------------- |
| Node.js      | 24.21.0 (sin `engines` ni `.nvmrc`)                               |
| npm          | 12.1.0                                                            |
| Next.js      | 16.4.2 (App Router, `src/`, alias `@/*`)                          |
| React        | 19.3.0                                                            |
| TypeScript   | 5.9.3, `strict: true`                                             |
| Tailwind CSS | 4.3.3, cargado con `@tailwindcss/turbopack`                       |
| ESLint       | 9.39.5 con `eslint-config-next` 16.4.0 y `eslint-config-prettier` |
| Prettier     | 3.9.9                                                             |
| Vitest       | 5.0.3                                                             |

`next.config.ts` activa `cacheComponents` y `partialPrefetching`.

## Git

- Remoto: `https://github.com/Manuelklk03/ValveDex`.
- `main` en `af6252a`, con el tag `v0.1.0`. PRs fusionadas:
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
  - #27 `test/entry-relations`.
  - #28 `feature/explore-page`.
  - #29 `feature/valve-section` (2026-10-19).
  - #30 `docs/update-status`.
  - #31 `chore/claude-plugins` (2026-10-21).
  - #32 `docs/update-status`.
  - #33 `feature/credits-page` (2026-10-22).
  - #34 `feature/entry-details`.
  - #35 `fix/next-security-16.4.2`.
  - #36 `feature/game-mods`.
  - #37 `docs/design-phase`.
  - #38 `feature/cancelled-projects` (2026-10-23).
  - #39 `docs/release-v0.1.0` (tag `v0.1.0`).
- `main` protegida: solo cambios por PR (0 aprobaciones, también para administradores), sin force push ni borrado. El repositorio borra las ramas al mergear.
- Configuración: local `branch.main.mergeoptions=--no-ff` y `pull.rebase=false`; global `pull.rebase=false` y `merge.ff=false`.
- Flujo (GitHub Flow, pedido por Manuel el 2026-10-16):
  1. `git switch main && git pull --ff-only`.
  2. `git switch -c <tipo>/<nombre>` (`feature/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`). Nunca trabajar directamente en `main`.
  3. Commits pequeños y claros.
  4. `git push -u origin <rama>` (la primera vez; después, `git push`).
  5. `gh pr create --base main --fill`.
  6. Revisar los cambios y `gh pr merge --merge --delete-branch`.
  7. `git switch main && git pull --ff-only`.
- **Mensajes de commit:** los redacta la IA y los escribe Manuel (2026-10-16). Al final de cada paso, el asistente entrega el mensaje completo: título Conventional Commits en español (`feat(valve): …`), línea en blanco y descripción en lista con `- ` (las líneas que continúan un punto van sangradas con dos espacios). El asistente no hace el commit salvo petición expresa.
- **Trabajo entre dos PCs:** para continuar una rama sin terminar en el otro equipo, `git push` en el primero y, en el segundo, `git fetch`, `git switch <rama>` y `git pull --ff-only`. La PR se crea cuando la rama está completa. Antes de cambiar de equipo, `git status` debe indicar el árbol limpio y la rama al día con el remoto.
- Es `gh pr`, no `git pr`. En Git Bash, si falta `gh`: `export PATH="$PATH:/c/Program Files/GitHub CLI"`.
- Rama abierta: `chore/design-phase-setup`, creada por Claude el 2026-10-23 desde `af6252a` (tag `v0.1.0`) con la preparación de la fase de diseño.
- **Vim:** el commit `b031b14` terminó con una línea `i` suelta en la descripción. Pulsa `i` solo una vez al abrir el editor y, antes de `:wq`, `Esc`; si la `i` se cuela en el texto, bórrala antes de guardar.
- **`git pull` en `main`:** la configuración global `merge.ff=false` hace que un `git pull` normal cree un commit de merge local. Usar `git pull --ff-only` o configurar una vez `git config --global pull.ff only`.
- Criterio: una rama = una funcionalidad completa.
- **Si editas algo en GitHub** (por ejemplo, el README), haz `git checkout main && git pull` antes de seguir. Si la rama local ya tenía cambios en el mismo archivo, `git merge origin/main` producirá un conflicto que hay que resolver.

## Comprobaciones

Ejecutadas por Claude el 2026-10-23 en `feature/cancelled-projects` (el contenido de la PR #38), con Next.js 16.4.2 instalado mediante `npm ci`:

| Comando         | Resultado                                                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check` | Superado: lint, tipos, formato y 26 pruebas de Vitest (3 archivos)                                                                                                                                               |
| `npm run build` | Superado: 58 páginas estáticas, entre ellas `/universos/half-life/half-life-dreamcast` y `/creditos`                                                                                                             |
| HTML generado   | El hub de Half-Life lista «Proyectos cancelados» con Half-Life para Dreamcast; su hub muestra «Cancelado en 2001» y «Proyecto cancelado basado en Half-Life»; la página del universo no lista mods ni cancelados |

Ejecutadas por Claude el 2026-10-19 en `main` (`2baaaf1`):

| Comando         | Resultado                                                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check` | Superado: lint, tipos, formato y 20 pruebas de Vitest                                                                                                     |
| `npm run build` | Superado: 55 páginas estáticas, entre ellas `/valve/historia`, `/valve/steam`, `/valve/personas/gabe-newell` y `/valve/personas/mike-harrington`          |
| HTML generado   | La portada muestra 3 hitos (2003, 2004 y 2022) y enlaza a `/valve/historia`, a las dos personas y a `/valve/steam`; `/valve/historia` muestra los 5 hitos |

Comprobado el 2026-10-14 (PR #27): «Relacionado» aparece en `/fichas/palanca`, `/fichas/gordon-freeman` y `/fichas/black-mesa-inbound`, y la prueba de relaciones falla con un ID mal escrito (`gordon-freman`).

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
- El comparador original/HD no tiene ninguna ficha con las dos imágenes: no se ha visto funcionando en una página real. Se deja para la tanda de recursos (imágenes sin fondo, PNG o WebP con transparencia, original y HD del mismo tamaño): ver [design.md](design.md#recursos-en-tandas-decisión-de-manuel-2026-10-24).
- Las tablas del README sobre el universo Half-Life completo, los proyectos cancelados y los mods se escribieron sin contrastar con fuentes; llevan la nota «Lista en revisión».
- Los textos de las personas de Valve y de `/valve/steam` no los ha contrastado el agente con sus fuentes.
- La fuente de `/valve/steam` está escrita en la página: no sale en `/creditos` hasta que ese texto pase a `src/data`.
- Contrastar con las fuentes las ranuras y la munición de las armas (paso 21).
- Ninguna página se ha revisado en un navegador (móvil, teclado, contraste): se hará sobre el diseño definitivo.

## Pasos de la interfaz (guiados)

| Paso  | Archivo(s)                                                                                            | Estado               |
| ----- | ----------------------------------------------------------------------------------------------------- | -------------------- |
| 1–4   | Layout, paleta base, cabecera y pie                                                                   | Hecho                |
| 5–6   | Portada sobre Valve y Steam con la cronología                                                         | Hecho (PR #6–#8)     |
| 7     | Tipos `Universe` y `Game`, datos, `UniverseCard` y `/universos`                                       | Hecho (PR #9)        |
| 8     | `/universos/[universeSlug]` con juegos, 404 y tema Half-Life                                          | Hecho (PR #10)       |
| 9     | Hub de juego, apartados y tema propio por juego                                                       | Hecho (PR #11)       |
| 10    | Fichas: modelo `Entry`, página de apartado y página de ficha                                          | Hecho (PR #14)       |
| 11    | Página 404 propia                                                                                     | Hecho (PR #15)       |
| 12    | `gameIds` → `appearances` (datos propios de cada juego)                                               | Hecho (PR #16)       |
| 13    | Imágenes por aparición (`MediaAsset`, `next/image`)                                                   | Hecho (PR #17 y #18) |
| 13b   | Comparador de imágenes original/HD (`ImageCompare`, componente de cliente)                            | Hecho (PR #20)       |
| 14    | Pruebas de integridad de datos con Vitest                                                             | Hecho (PR #21)       |
| 15    | Esqueleto: una ficha de muestra por categoría y apariciones en OF y BS                                | Hecho (PR #23)       |
| 16    | Esqueleto: lore por juego y su página                                                                 | Hecho (PR #24)       |
| 17    | Esqueleto: relaciones entre fichas y bloque «Relacionado»                                             | Hecho (PR #26)       |
| 17b   | Esqueleto: prueba de integridad de las relaciones, alias `@/` y etiquetas sin género                  | Hecho (PR #27)       |
| 18    | Esqueleto: `/explorar` con una fila horizontal por categoría y «Ver todo»                             | Hecho (PR #28)       |
| 19    | Esqueleto: sección Valve (`/valve/historia`, `/valve/personas/[slug]`, `/valve/steam`)                | Hecho (PR #29)       |
| 20    | Esqueleto: página de créditos generada desde los datos                                                | Hecho (PR #33)       |
| 21    | Esqueleto: campos propios por categoría (unión discriminada) y sección «Datos»                        | Hecho (PR #34)       |
| 22a   | Esqueleto: mods como juegos con `baseGameId` y su propio hub                                          | Hecho (PR #36)       |
| 22b   | Esqueleto: proyectos cancelados como juegos con `status: "cancelled"`                                 | Hecho (PR #38)       |
| —     | `v0.1.0`                                                                                              | Publicada 2026-10-23 |
| D1    | Dirección de diseño ([design.md](design.md))                                                          | Hecho (PR #41)       |
| D1b   | Muestra visual `/muestra` (aprobada por Manuel como referencia estética)                              | Hecho (PR #44)       |
| D2    | Sistema de diseño: tokens, fuentes, temas y componentes compartidos                                   | Hecho (PR #45–#51)   |
| Z1–Z4 | Por zonas, contenido real y diseño a la vez: Valve, universos, Half-Life, Opposing Force y Blue Shift | Siguiente            |

## Siguiente paso

Esqueleto terminado y publicado como `v0.1.0` (2026-10-23). **Orden (decisión de Manuel, 2026-10-23):** el esqueleto está hecho y solo tiene datos de muestra y textos provisionales. En lugar de «todo el diseño y después todo el contenido», se hace primero el **sistema de diseño** (D1b y D2) y después **cada zona a la vez: su contenido real con fuentes y su diseño**. No se diseña una zona que todavía no tiene contenido (Steam por épocas, Portal, Left 4 Dead…): sus ideas quedan apuntadas en [design.md](design.md).

1. **Fase de diseño, preparada el 2026-10-23** (rama `chore/design-phase-setup`): plugins de diseño reactivados, reglas de `CLAUDE.md`, `AGENTS.md` y `architecture.md` actualizadas. Decisiones de Manuel: librerías **una a una, al usarlas**; componentes propios en **CSS Modules + BEM** y shadcn/ui con sus utilidades de Tailwind; la preparación la hace Claude. Los plugins reactivados cargan al abrir una sesión nueva de Claude Code.
2. **Paso D1, dirección de diseño: aprobada** el 2026-10-23 y documentada en [design.md](design.md): referencias capturadas con Playwright, lenguaje de Valve, Steam y Half-Life, diferencias entre los tres juegos, movimiento, recursos, tecnología y plan D1b–D9. Decisiones de Manuel: Half-Life como **archivo físico + señalética de las instalaciones** (A + C); **intro oficial de Valve** como grabación propia dentro del juego, según la política de vídeo de Valve (uso no comercial, sin distribuir los archivos del juego); **muestra D1b** aprobada. `.gitignore` ignora `.playwright-mcp/` (capturas de referencia).
   **D1b hecho (2026-10-24, PR #44):** Manuel escribió la primera versión (`dfbae08`); a petición suya, Claude la pulió con las skills de diseño y antislop: cabecera de Valve con la válvula animada (GSAP) y cifras reales, y tres expedientes con ficha técnica, apartados numerados, sellos, rótulo de canto, pie de registro y una ficha desplegable al pasar el ratón con la descripción y las primeras fichas de cada apartado. Lenis y la entrada al hacer scroll (GSAP + ScrollTrigger) solo en la muestra. Comprobado: `npm run check` (26 pruebas), capturas a 1440 y 390 px sin scroll horizontal y contraste AA de los textos nuevos. Manuel la aprueba como **primera referencia estética**: se mejorará cuando haya más contenido. Las imágenes que pasan al desplegar un apartado se dejan para la tanda de imágenes.
   **D2 en marcha (decisión de Manuel: modo mixto).** D2a lo hace Claude (PR #45), ampliado a petición de Manuel porque «parecía solo un recoloreo»: rediseño de la portada, `/universos` (acreditaciones), `/explorar` (índice de sectores), páginas de Valve, créditos y 404, con `--sector-*` globales y la válvula como componente compartido (`src/components/ui/valve-wheel.tsx`). Además: paleta de Valve en `globals.css` (`--accent` blanco y `--valve-red` aparte), Archivo e IBM Plex Mono en el layout, cabecera y pie de Valve, tarjetas «Próximamente» sin opacidad (no pasaban AA) y enlaces «Ver todo» y de la portada subrayados en reposo (revisión de Codex). **D2b hecho (Claude, PR #46 y corrección posterior)**: `UniverseTheme` carga Barlow y Barlow Condensed solo en el universo Half-Life; `GameTheme` da su tema a Opposing Force (títulos en mayúsculas) y Blue Shift. Los temas claros iniciales (papel de Half-Life y blanco de Blue Shift) chocaban con la cabecera y el pie negros; por decisión de Manuel (2026-10-24) los tres son oscuros: Half-Life carbón cálido `#13110e` con texto de papel y el naranja del HUD `#f39a2e`, Opposing Force lona oliva algo más oscura con verde ácido, Blue Shift marino `#0e1320` con el azul del HUD `#8a8aff`. Contraste AA de 5,7:1 a 7,9:1. Manuel lo aprueba como primera versión estética, a afinar más adelante. Aviso: tras cambiar de rama, Turbopack sirvió un `globals.css` antiguo hasta borrar `.next` y reiniciar `npm run dev`. **D2c hecho (2026-10-25):** componentes compartidos escritos por Manuel con guía (Claude arregla lo que señala Codex):
   - D2c-1 `Breadcrumb` (`src/components/ui`, PR #48): ruta de navegación con `aria-current="page"`. El juego `half-life` pasa a llamarse «Half-Life 1» (decisión de Manuel; el slug no cambia).
   - D2c-2 `DossierHeader` (`src/components/ui`, PR #49): título, resumen, `children` y ficha técnica (`<dl>`).
   - D2c-3 `SectorSign` (`src/features/games/components`, PR #50) con `getSectionStatuses()` y 4 pruebas con `vi.mock`: franja del color del sector, número y desplegable dentro del flujo (`grid-template-rows` 0fr → 1fr), sin JavaScript.
   - D2c-4 (Claude, a petición de Manuel, PR #51): `Breadcrumb` en `/explorar/[categoría]`, `/valve/*` y `/creditos`; `DossierHeader` en la página de apartado y en la ficha, que muestra el ID como «Registro» y sus datos en la ficha técnica (desaparece la sección «Datos»).
     **D2 terminado.**
3. **Z3: Half-Life 1, en marcha (2026-10-25).** Manuel elige empezar por esta zona (al terminarla toca `v0.2.0`). Claude investiga a fondo (wikis, Valve Developer Community, The Cutting Room Floor y también foros y comunidades de fans) y Manuel escribe las fichas guiado; Codex revisa con `token-efficient-workflow`. Decisiones de Manuel:
   - **Spoilers:** la premisa se ve; lo que destripa la historia va oculto tras un botón (`<details>`), marcado con `spoiler: true` en los datos.
   - **Mapas:** una ficha por capítulo, con sus archivos de mapa (`c0a0`, `c0a0a`…) como dato técnico.
   - **Fuentes:** cada fuente lleva su tipo (`official`, `wiki` o `community`); lo que solo cuenta la comunidad se presenta como «según la comunidad».
   - **Cifras:** daño, munición y salud solo si vienen de los archivos del juego (`skill.cfg`, por dificultad) con su fuente; nunca estimadas.
     **Siguiente: Z3-0**, ampliar los tipos (`Source.kind`, `DifficultyValues`, campos nuevos de armas, mapas y enemigos, párrafos de lore con spoiler) antes de meter contenido.
4. Después de D1b y D2, **por zonas** (contenido real y diseño a la vez): Valve, entrada de universos, Half-Life, Opposing Force y Blue Shift ([design.md](design.md#9-plan-por-fases)). Los pendientes de contenido (más fichas, textos contrastados, revisión en navegador y E2E) se resuelven dentro de la zona a la que pertenecen. **La intro de Valve, las imágenes y el comparador con imágenes reales** van en tandas de recursos cuando haya varios juegos terminados (decisión de Manuel, 2026-10-24).
5. Tras el esqueleto, revisión completa de la documentación y del README para presentar el proyecto como enciclopedia de todo Valve (aviso de Manuel, 2026-10-13).

## Versiones del proyecto

Decisión de Manuel (2026-10-16): versionado semántico con tags de Git y GitHub Releases, creados solo cuando `main` esté estable y Manuel lo pida. El asistente avisa cuando ve un punto adecuado, pero no crea el tag.

| Versión  | Cuándo                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `v0.1.0` | Al terminar el esqueleto: todas las rutas y piezas existen, funcionan y tienen pruebas                                            |
| `v0.x.0` | Cada bloque grande de contenido estable (por ejemplo, Half-Life completo, después sus expansiones, Half-Life 2…)                  |
| `v0.x.y` | Correcciones y ajustes pequeños                                                                                                   |
| `v1.0.0` | **Todo el universo Half-Life**: todos sus juegos, expansiones y episodios, con proyectos cancelados y mods, revisado y desplegado |
| `v1.x.0` | Cada universo nuevo (Portal, Team Fortress…) o funcionalidad grande posterior                                                     |

Publicadas: **`v0.1.0`** (2026-10-23, esqueleto).

Cómo se crea una versión, cuando Manuel lo indique (siempre sobre `main` actualizado y con `npm run check` y `npm run build` superados):

1. En una rama `docs/release-vX.Y.Z`: subir `"version"` en `package.json` (y `npm install` para actualizar el lockfile), mover «Sin publicar» del CHANGELOG a `## [X.Y.Z] — AAAA-MM-DD` y actualizar este archivo. PR y merge.
2. `git switch main && git pull --ff-only`.
3. `git tag -a vX.Y.Z -m "vX.Y.Z — <resumen>"`: crea un tag **anotado** (con autor, fecha y mensaje) sobre el commit actual.
4. `git push origin vX.Y.Z`: los tags no se suben con un `git push` normal.
5. `gh release create vX.Y.Z --title "vX.Y.Z — <resumen>" --notes-file <notas>.md`: crea la GitHub Release con las notas de esa versión del CHANGELOG (o `--generate-notes` para que GitHub liste las PRs).

`package.json` declara `"version": "0.1.0"` desde la plantilla, así que para `v0.1.0` no hubo que cambiarlo.

## Cómo actualizar este archivo

Describe el estado vigente sin acumular sesiones antiguas. Registra fecha y fuente de la evidencia, archivos cambiados, rama y commit si se han consultado, comandos con resultados reales, bloqueos y siguiente paso. Lo solo propuesto se marca como «preparado, pendiente de aplicar».

## Para continuar en otra IA

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados.
