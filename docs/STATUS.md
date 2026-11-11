# Estado actual — ValveDex

Última actualización: **2026-11-06**.
Fuente: Claude Code y Antigravity con acceso al repositorio local; la comprobación del estado de `main` y de las PR es de Claude Code (2026-11-06).
Este archivo es el punto de continuación entre Claude, ChatGPT y Codex.

## Versión actual: `v0.3.0` (bloque Valve, Steam y apertura de la etapa Source)

El 2026-11-05 se publica `v0.3.0`: bloque de Valve (sección de hardware `/valve/hardware` con 7 dispositivos históricos y 5 nuevas figuras clave en `/valve/personas`), rediseño histórico de Steam con tres épocas, contenido verificado de Half-Life 2, Team Fortress y Left 4 Dead, suite completa de 100 pruebas unitarias con Vitest (100% de cobertura en dominio y selectores), e integración continua con SonarCloud y Docker Hub. Anteriores: `v0.2.0` (2026-10-26, bloque Half-Life 1) y `v0.1.0` (2026-10-23, esqueleto).

## Modo de trabajo

Detalle completo en [workflow.md](workflow.md). En resumen: Manuel escribe guiado lo grande y nuevo (páginas, componentes, tipos, lógica), con «para qué sirve» cada archivo y las líneas exactas de cada cambio; el asistente hace los pasos de datos y contenido con sus ajustes pequeños, la documentación y los arreglos que señala Codex, y cualquier paso que Manuel le pida. Las PRs agrupan entregas sustanciales con al menos 3 commits lógicos y atómicos. Codex revisa cada paso en solo lectura con `token-efficient-workflow`. No se pasa al paso siguiente hasta que Manuel lo confirma.

## Visión del producto (decidida el 2026-10-07)

1. **Portada `/`:** solo sobre Valve: la empresa, Steam, su historia… Paleta oscura de estilo Valve.
2. **`/universos`:** todas las sagas de Valve con sus videojuegos. Al entrar en un universo (por ejemplo, Half-Life), la paleta cambia a la de esa saga.
3. **Hub de cada juego:** lore, mapas, armas, personajes, enemigos, curiosidades, easter eggs…
4. **Hub principal `/explorar`:** buscador global con carruseles horizontales por categoría (armas, mapas…) que mezclan todos los juegos. Previsto para la Entrega 2.

Primer contenido: universo Half-Life con Half-Life, Opposing Force, Blue Shift y Half-Life: Decay. Detalle técnico en [architecture.md](architecture.md) (rutas, temas por variables CSS) y objetivos en [roadmap.md](roadmap.md).

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
  - Imágenes en `public/images/entries/<id>-<juego>.<ext>`. Primera: `spas-12-half-life.jpg` (731 × 453, `File:W_shotgun_hd.jpg` de Combine OverWiki, modelo del High Definition Pack, licencia `Gamescreenshot`: material del juego © Valve). Sustituida en R2 (2026-10-27) por la pareja de capturas propias.
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
- `main` en `ec80932` (2026-11-05, `v0.3.0`), con los tags `v0.1.0`, `v0.2.0` y `v0.3.0`; sin PR abiertas ni ramas remotas pendientes (comprobado el 2026-11-06). PRs #40–#121 en GitHub (diseño D1–D2, contenido Z3–Z4, entrada al universo U1–U3, recursos visuales R1–R3, Half-Life: Decay, rediseño de la etapa Source, DevOps #102–#108, Valve y Steam #111–#119, SonarCloud #120 y `v0.3.0` #121). PRs fusionadas hasta `v0.1.0`:
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
  6. Revisar los cambios y fusionar **siempre con mensaje propio** (decisión de Manuel, 2026-10-25): el asistente entrega el título y la lista del merge; la lista se guarda con `notepad .git\MERGE_BODY.txt` (Git no sigue `.git`) y se fusiona con `gh pr merge --merge --delete-branch --subject "<título>" --body-file .git\MERGE_BODY.txt`. PR y merge solo al terminar la funcionalidad; en los pasos intermedios, commit y `git push`.
  7. `git switch main && git pull --ff-only`.
- **Mensajes de commit:** los redacta la IA y los escribe Manuel (2026-10-16). Al final de cada paso, el asistente entrega el mensaje completo: título Conventional Commits en español (`feat(valve): …`), línea en blanco y descripción en lista con `- ` (las líneas que continúan un punto van sangradas con dos espacios). El asistente no hace el commit salvo petición expresa.
- **Trabajo entre dos PCs:** para continuar una rama sin terminar en el otro equipo, `git push` en el primero y, en el segundo, `git fetch`, `git switch <rama>` y `git pull --ff-only`. La PR se crea cuando la rama está completa. Antes de cambiar de equipo, `git status` debe indicar el árbol limpio y la rama al día con el remoto.
- Es `gh pr`, no `git pr`. En Git Bash, si falta `gh`: `export PATH="$PATH:/c/Program Files/GitHub CLI"`.
- **Vim:** el commit `b031b14` terminó con una línea `i` suelta en la descripción. Pulsa `i` solo una vez al abrir el editor y, antes de `:wq`, `Esc`; si la `i` se cuela en el texto, bórrala antes de guardar.
- **`git pull` en `main`:** la configuración global `merge.ff=false` hace que un `git pull` normal cree un commit de merge local. Usar `git pull --ff-only` o configurar una vez `git config --global pull.ff only`.
- Criterio: una rama = una funcionalidad completa.
- **Si editas algo en GitHub** (por ejemplo, el README), haz `git checkout main && git pull` antes de seguir. Si la rama local ya tenía cambios en el mismo archivo, `git merge origin/main` producirá un conflicto que hay que resolver.

## Comprobaciones

Ejecutadas por Claude el 2026-10-29 en `feature/decay-content`, con Next.js 16.4.2:

| Comando         | Resultado                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check` | Superado: lint, tipos, formato y 38 pruebas de Vitest (5 archivos)                                                                                                |
| `npm run build` | Superado: 235 páginas estáticas, entre ellas `/universos/half-life/decay`, sus apartados y las fichas nuevas                                                      |
| HTML generado   | El hub de Decay cuenta 10 mapas, 4 personajes, 11 curiosidades y 5 easter eggs; `/fichas/palanca` y `/fichas/rosenberg` muestran Half-Life: Decay en «Aparece en» |

Diagnóstico de esa sesión: un `next start` antiguo seguía sirviendo un build viejo en el puerto 3001 y hacía que los apartados de Decay mostraran «0 fichas». Se cerraron todos los procesos `next start -p 3001`, se borró `.next` y se reconstruyó. Antes de comprobar HTML servido, revisa `Get-CimInstance Win32_Process -Filter "Name='node.exe'"`.

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
- Despliegue pendiente: hay integración continua, imagen de Docker publicada en Docker Hub y SonarCloud, pero no hay staging ni producción (ver [roadmap.md](roadmap.md#fase-devops-al-final-con-el-proyecto-avanzado-decisión-de-manuel-2026-11-01)).
- El contenido de Half-Life 2, Team Fortress y Left 4 Dead (PR `652266d`, 2026-11-04) lo trajo otra herramienta con la etiqueta «verificado»: Claude Code no lo ha contrastado con las fuentes. El contenido anterior de esa etapa (Kilo Code) tenía datos inventados.
- Comprobar con las fuentes los datos de `src/data/games.ts` y los textos de `src/data/entries.ts`, y si las armas aparecen también en las expansiones. Los enlaces de las fichas ya se han verificado (2026-10-12).
- Las pruebas no comprueban que los textos coincidan con las fuentes: eso sigue siendo revisión manual.
- El comparador original/HD ya se ve en 20 fichas de Half-Life 1 (R1 y R2); faltan las parejas de Opposing Force y Blue Shift (R3) y una imagen única para lo que no cambió con el High Definition Pack. Ver [design.md](design.md#recursos-en-tandas-decisión-de-manuel-2026-10-24).
- Las tablas del README sobre el universo Half-Life completo, los proyectos cancelados y los mods se escribieron sin contrastar con fuentes; llevan la nota «Lista en revisión».
- Los textos de las personas de Valve no los ha contrastado el agente con sus fuentes. Los hitos de Valve y las épocas de Steam (`valve-milestones.ts` y `steam-eras.ts`) salen de Wikipedia en inglés y los revisó Codex; los colores de las épocas son interpretación de ValveDex, sin contrastar con capturas históricas del cliente.
- Contrastar con las fuentes las ranuras y la munición de las armas (paso 21).
- Revisión en navegador: la portada, `/valve/steam` y `/valve/historia` se revisaron en escritorio y móvil (Claude Code, 2026-11-04); el resto de páginas no. Los colores de TF, L4D y las épocas de Steam pasaron contraste AA; el recorrido completo con teclado de las demás páginas está pendiente.

## Pasos de la interfaz (guiados)

| Paso  | Archivo(s)                                                                                            | Estado                                                       |
| ----- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1–4   | Layout, paleta base, cabecera y pie                                                                   | Hecho                                                        |
| 5–6   | Portada sobre Valve y Steam con la cronología                                                         | Hecho (PR #6–#8)                                             |
| 7     | Tipos `Universe` y `Game`, datos, `UniverseCard` y `/universos`                                       | Hecho (PR #9)                                                |
| 8     | `/universos/[universeSlug]` con juegos, 404 y tema Half-Life                                          | Hecho (PR #10)                                               |
| 9     | Hub de juego, apartados y tema propio por juego                                                       | Hecho (PR #11)                                               |
| 10    | Fichas: modelo `Entry`, página de apartado y página de ficha                                          | Hecho (PR #14)                                               |
| 11    | Página 404 propia                                                                                     | Hecho (PR #15)                                               |
| 12    | `gameIds` → `appearances` (datos propios de cada juego)                                               | Hecho (PR #16)                                               |
| 13    | Imágenes por aparición (`MediaAsset`, `next/image`)                                                   | Hecho (PR #17 y #18)                                         |
| 13b   | Comparador de imágenes original/HD (`ImageCompare`, componente de cliente)                            | Hecho (PR #20)                                               |
| 14    | Pruebas de integridad de datos con Vitest                                                             | Hecho (PR #21)                                               |
| 15    | Esqueleto: una ficha de muestra por categoría y apariciones en OF y BS                                | Hecho (PR #23)                                               |
| 16    | Esqueleto: lore por juego y su página                                                                 | Hecho (PR #24)                                               |
| 17    | Esqueleto: relaciones entre fichas y bloque «Relacionado»                                             | Hecho (PR #26)                                               |
| 17b   | Esqueleto: prueba de integridad de las relaciones, alias `@/` y etiquetas sin género                  | Hecho (PR #27)                                               |
| 18    | Esqueleto: `/explorar` con una fila horizontal por categoría y «Ver todo»                             | Hecho (PR #28)                                               |
| 19    | Esqueleto: sección Valve (`/valve/historia`, `/valve/personas/[slug]`, `/valve/steam`)                | Hecho (PR #29)                                               |
| 20    | Esqueleto: página de créditos generada desde los datos                                                | Hecho (PR #33)                                               |
| 21    | Esqueleto: campos propios por categoría (unión discriminada) y sección «Datos»                        | Hecho (PR #34)                                               |
| 22a   | Esqueleto: mods como juegos con `baseGameId` y su propio hub                                          | Hecho (PR #36)                                               |
| 22b   | Esqueleto: proyectos cancelados como juegos con `status: "cancelled"`                                 | Hecho (PR #38)                                               |
| —     | `v0.1.0`                                                                                              | Publicada 2026-10-23                                         |
| D1    | Dirección de diseño ([design.md](design.md))                                                          | Hecho (PR #41)                                               |
| D1b   | Muestra visual `/muestra` (aprobada por Manuel como referencia estética)                              | Hecho (PR #44)                                               |
| D2    | Sistema de diseño: tokens, fuentes, temas y componentes compartidos                                   | Hecho (PR #45–#51)                                           |
| Z1–Z4 | Por zonas, contenido real y diseño a la vez: Valve, universos, Half-Life, Opposing Force y Blue Shift | Hecho (PR #52–#59)                                           |
| Z4H   | Half-Life: Decay: dossier, tema y contenido completo                                                  | Hecho (PR #74, #75, #77 y #78)                               |
| Z5a   | Half-Life 2, Episode One y Episode Two: dossiers y temas (rediseñados el 2026-10-31)                  | Hecho (primera versión)                                      |
| Z5b   | Contenido de la etapa Source con fuentes                                                              | Parcial: HL2, TF y L4D sin verificar; faltan Episodes y Alyx |
| V1–V5 | Valve y Steam: historia ampliada, portada con movimiento, Steam por épocas, personas y hardware       | Hecho (PR #111–#115 y #119)                                  |
| —     | `v0.3.0`                                                                                              | Publicada 2026-11-05                                         |

## Siguiente paso

**Recomendado (Claude Code, 2026-11-06), por este orden; Manuel decide:**

1. **Verificar el contenido de Half-Life 2, Team Fortress y Left 4 Dead** (PR `652266d`) contra Combine OverWiki, Official TF2 Wiki y los archivos del juego, con Codex en solo lectura: fuentes que respondan, cifras con origen, spoilers solo dentro de `<details>` y nada inventado.
2. **Despliegue de staging y producción** (roadmap, fase DevOps): decidir antes el alojamiento (la imagen de Docker Hub ya existe) y cómo se promociona una versión de staging a producción; los secretos los mete Manuel en GitHub.
3. **Completar la etapa Source:** contenido con fuentes de Episode One, Episode Two y Alyx (hoy solo tienen lore).
4. Opcionales: intro de Valve con grabación propia, recorrido con teclado del resto de páginas y `v0.4.0` cuando haya un bloque nuevo estable.

**Ampliación de datos y detalle de las fichas (Claude con cuatro agentes de investigación, 2026-11-10, rama `fix/universe-gate-navigation`; petición de Manuel: actualizar y ampliar los datos de todo lo abierto, crear páginas nuevas si hace falta, mejorar las páginas de detalle y arreglar que el dossier de `/universos` no entra al universo):**

- _Arreglo:_ en `UniverseGate` el enlace era solo el título y su capa `::after` se calculaba contra el cuadro de texto (que GSAP desplaza), así que la tarjeta no era clicable. Ahora un enlace propio cubre el marco entero. Comprobado con clics en tres puntos de cada saga abierta.
- _Datos nuevos (archivos `*-expansion.ts`, cableados en `entries.ts` o en los archivos de datos de Valve):_ `team-fortress-expansion.ts` (122 fichas: 37 mapas de TF2 y 11 de TFC, 43 armas, 16 personajes —las 10 clases de TFC con salud, armadura y velocidad de la wiki—, 8 enemigos de Mann vs. Machine y Halloween, 18 curiosidades), `left-4-dead-expansion.ts` (86: 18 campañas, 11 infectados, 34 armas y objetos, 3 personajes, 20 curiosidades), `half-life-extra-games.ts` (56: Sven Co-op, Dreamcast y curiosidades de HL2, los episodios y Alyx) y `valve-expansion.ts` (22 hitos de 1999 a 2026, 10 personas sin foto, 5 dispositivos y 17 hechos de Steam). Total de fichas: unas 610 (antes 349).
- _Fuentes:_ Official TF2 Wiki (su HTML devuelve una página anti-bot a `curl`; se verificó con `?action=raw`), Wikipedia, la wiki oficial de Sven Co-op, la nota de prensa de Sierra y Valve y la wiki de Fandom de L4D (no se puede descargar, pero su API respondió). Combine OverWiki devolvió 500 durante toda la sesión: no se usó. Se descartaron tres fichas de Dreamcast cuya única fuente era una web de aficionados solo `http` (la prueba exige `https`) y una frase sin fuente de Jeep Barnett.
- _Detalle de la ficha:_ `getEntrySiblings` (3 pruebas) y un bloque «Más de {apartado} en {juego}» con las mismas tarjetas de la página de apartado y un pie anterior/siguiente.
- _Datos por revisar:_ los hitos y el hardware de 2025–26 (Steam Machine, Steam Frame y Steam Controller) salen de Wikipedia, que se contradice sobre el día de lanzamiento de Steam Frame (se usó el 18 de septiembre de 2026); cinco nombres de mapa de L4D (`l4d_river01_docks`, `l4d_river02_barge`, `l4d_river03_port`, `c14m1_junkyard` y `c14m2_lighthouse`) no se pudieron comprobar contra los archivos instalados (los 67 restantes sí); la fecha de la cancelación del port de Dreamcast (15 o 16 de junio de 2001) y los textos de las fichas no se han contrastado con Codex.
- _Comprobado:_ `npm run check` (117 pruebas) y `npm run build`. Sin comprobar: las páginas nuevas en navegador (solo se comprobó la ficha con el bloque nuevo a 1440 y 390 px), recorrido con teclado y la revisión de Codex del contenido.
- _Revisión de Codex (2026-11-10):_ corregidos 3 spoilers visibles y una cifra sin fuente. Sin corregir: las cifras de salud, daño y munición de las fichas nuevas de TF y L4D salen de sus wikis, no de los archivos del juego (hay que contrastarlas), y «Más de…» de la ficha usa siempre el primer juego de la ficha.
- _Pendiente (siguiente):_ imágenes para las fichas nuevas (TF2 y L4D tienen renders solo de los modelos principales) y revisar el contenido con Codex.

**Portal y Counter-Strike abiertos (Claude con dos agentes de investigación, 2026-11-11, rama `feature/portal-counter-strike`; petición de Manuel: seguir con el siguiente paso, que era abrir los dos universos «Próximamente»):**

- _Estructura:_ `universes.ts` pasa los dos a «disponible»; seis juegos nuevos en `games.ts` (Portal 2007, Portal 2 2011, Counter-Strike 2000, Source 2004, Global Offensive 2012 y Counter-Strike 2 2023, con Wikipedia como fuente), cuatro etapas (Source de Portal; GoldSrc, Source y Source 2 de Counter-Strike), temas de universo y de juego (`universe-theme` y `game-theme`), seis variantes de dossier (`dossier-looks.ts`, `game-dossier.module.css`) y arte con los iconos de línea de Manuel (`dossier-art.ts`).
- _Contenido:_ `portal-expansion.ts` (56 fichas: 18 mapas, 11 armas y objetos, 12 personajes, 3 enemigos, 8 curiosidades y 4 easter eggs) y `portal-lore.ts`; `counter-strike-entries.ts` (95 fichas: 20 mapas, 41 armas y equipo, 10 bandos y unidades, 19 curiosidades y 5 easter eggs) y `counter-strike-lore.ts`. Mapas de Portal y de Counter-Strike: Source comprobados contra los `.bsp` instalados; los de Global Offensive y Counter-Strike 2 salen solo de las wikis (el juego de `H:` no tiene mapas y CS2 no está instalado).
- _Por revisar:_ Portal 1 no tiene capítulos oficiales (las 4 fichas de mapa agrupan las cámaras por criterio de ValveDex); `sp_a2_intro` y el reparto de `sp_a2_bts1`/`bts2` salen de Portal Wiki sin contrastar con el juego; las fuentes de la wiki de Counter-Strike (Fandom) no se pueden descargar con `curl` (el agente las leyó por su API); la fecha de la nueva versión de Cache, la lista de mapas de Active Duty y la apariencia de la Negev, el MP5, la G3SG1, la HE y la Five-SeveN salen de etiquetas de wiki ambiguas; sin revisión de Codex; los apartados de enemigos de Counter-Strike y los modelos y capturas de los dos universos están vacíos.
- _Comprobado:_ `npm run check` (117 pruebas) y `npm run build`; en un servidor de producción a 1440 y 390 px, `/universos`, las dos páginas de universo, un hub de cada saga y la página de mapas de Portal 2 cargan sin errores de página ni desborde, y el clic en la tarjeta de Portal entra al universo. Sin comprobar: recorrido con teclado, contraste AA de los dossieres a simple vista (calculado: tinta 13–15:1, texto atenuado 5,6–6,1:1, acento 5,1–5,3:1) y las páginas de ficha nuevas.
- _Pendiente (siguiente):_ capturas y modelos 3D propios de Portal, Portal 2 y Counter-Strike (los juegos están instalados salvo CS2), revisión de Codex del contenido nuevo, contrastar las cifras de TF y L4D con los archivos del juego y la tarea de «Más de…» por juego.

**Modelos de Team Fortress 2, reloj en el fondo y humo (Claude, 2026-11-10, rama `feature/tf2-models`; decisiones de Manuel: capturar TF2, el reloj debe ser el manómetro del fondo en su posición y no uno aparte, el vapor debe parecer humo y no focos, y una foto mejor de Gabe Newell):**

- _TF2:_ `source-mdl-to-glb` con el mod `tf` (tf2_misc + tf2_textures); 12 renders (nueve mercenarios en equipo RED, minigun, lanzacohetes y llave inglesa; las tres armas con .glb). Los personajes vienen tumbados en su pose de referencia: se giran 90° sobre X y las armas 90° sobre Z para fotografiarlos. El Heavy (`tf2-heavy.glb`, texturas a 512 px) gira en el dossier de TF2; `ModelSpinner` y `DossierArt` ganan `roll`. Sin imagen: el reloj de invisibilidad (no hay modelo `w_` suelto) y la versión BLU de cada mercenario.
- _Reloj:_ `BackdropClock` (cliente) convierte el manómetro de `IndustrialBackdrop` en un reloj con la hora real (sale con las 10:10:30 y el efecto lo pone en hora); la manecilla roja avanza a saltos con rebote y no se muestra con «reducir movimiento». Se borra `ValveClock`.
- _Humo:_ los «focos» (chorros cónicos y degradados radiales) se sustituyen por tres sprites de nube procedurales (`public/images/decor/steam-{1,2,3}.webp`, generados con ruido multioctava, sin autor ni fuente externa) animados con CSS (suben, se ensanchan girando y se disipan); opacidad máxima 0,17 para el contraste del texto atenuado (calculado, no medido).
- _Gabe Newell:_ retrato de los GDC Awards 2010 (`File:Gabe Newell GDC 2010 (cropped 2).jpg`, Official GDC, CC BY 2.0) en vez del perfil de The International 2018.
- _Comprobado:_ `npm run check` (114 pruebas), `npm run build` y, en el servidor de producción a 1440 px, el dossier de TF2 con el Heavy girando, la ficha del Heavy con su render, la portada con el reloj y el humo y la página de Gabe Newell. Nota: el servidor de desarrollo de Manuel servía el dossier de TF2 sin el modelo (caché de la página); se comprobó con `next start`. Sin comprobar: móvil, rendimiento del humo en un móvil real y teclado.

**Modelos de Left 4 Dead y refinado de los dossieres de TF y L4D (Claude, 2026-11-10, rama `feature/dossier-tf-l4d-refinement`; decisión de Manuel: modelos solo de Left 4 Dead 1 y 2 por ahora, sin capturar TF2 ni CS:S):**

- _Conversor:_ `source-mdl-to-glb.mjs` lee los VPK de Left 4 Dead y Left 4 Dead 2 (mods `l4d` y `l4d2`, .mdl v49) y acepta VMT con claves sin comillas (`$baseTexture "…"`, como escriben L4D; antes salían sin textura). `GLB_TEXTURE_MAX=512` reduce las texturas para los modelos de dossier (400–500 KB en vez de varios MB).
- _Renders:_ 17 en `source-captures.ts` (supervivientes de L4D1 y L4D2, Hunter, Smoker, Boomer, Tank, Witch, Charger, escopeta automática, bomba de tubo y sartén; las tres armas con .glb para el visor 3D). Tank y Charger vienen tumbados en su pose de referencia y se giraron 90° sobre X al fotografiarlos. Los ojos salen con el color por defecto (su material no tiene textura). El banco de capturas es una página temporal que no se versiona.
- _Dossieres:_ la Witch (L4D1) y el Jockey (L4D2) giran al activar el dossier; los iconos de línea de TF salen mitad RED y mitad BLU y los de L4D en rojo sangre y ocre; `iconsOpacity` por dossier y los iconos solo ceden el sitio cuando hay un modelo 3D. Team Fortress sigue sin modelos 3D (TF2 está instalado y se puede capturar cuando Manuel lo pida).
- _Revisión de Codex del bloque 3:_ las fotos CC BY enlazan su licencia (`MediaAsset.licenseUrl`) y dicen que están recortadas y convertidas a WebP; el vapor baja su opacidad máxima a 0,135 para que el texto atenuado conserve 4,5:1 (calculado, no medido en pantalla).
- _Comprobado:_ `npm run check` (114 pruebas), `npm run build` y, en navegador a 1440 px, los dossieres de TF y L4D con el ratón dentro y fuera, sin errores de página. Sin comprobar: móvil de los dossieres con el modelo 3D, rendimiento real y teclado.

**Rediseño realista, bloque 3: Valve y Steam (Claude, 2026-11-09, rama `feature/valve-steam-redesign`; decisión de Manuel: foto a los desarrolladores que tengan una libre, sin capturar TF2, L4D2 ni CS:S todavía):**

- _Fotos:_ `ValvePerson.image` (`MediaAsset`) con cinco retratos de Wikimedia Commons (CC BY 2.0 y 3.0, licencia y autor comprobados con la API de Commons) en `public/images/people/`: Gabe Newell, Marc Laidlaw (solo 211 px de ancho), Robin Walker, Kim Swift y Chet Faliszek. Mike Harrington y Erik Johnson no tienen foto libre y se quedan sin imagen (en la portada, con sus iniciales). Las fotos salen en `/creditos` y las pruebas de imágenes y de créditos las cubren.
- _Portada:_ `ValveClock` (cliente, reloj de pared en SVG con la hora real; el HTML sale con las 10:10 y el efecto lo pone en hora, sin desajuste de hidratación; la manecilla roja da un paso por segundo y no se muestra con «reducir movimiento»), montado en la esquina de la válvula sin girar con el scroll. `IndustrialBackdrop` gana tres salidas de vapor sobre las bridas (CSS puro; con movimiento reducido, una nube quieta y tenue).
- _Páginas:_ `ValveHero` (cabecera a sangre con el fondo industrial y el vapor) en `/valve/historia`, `/valve/hardware` y `/valve/personas/[slug]`, esta última con la foto y su crédito. `/valve/steam` conserva su diseño por épocas. «Figuras clave» de la portada con foto redonda.
- _Comprobado:_ `npm run check` (114 pruebas), `npm run build` y, en navegador a 1440 y 390 px, la portada, dos fichas de persona (con y sin foto), la historia y el hardware sin desbordes ni errores de página. Sin comprobar: contraste AA del texto sobre el fondo con vapor, recorrido con teclado y el movimiento en un móvil real.
- _Pendiente:_ fondos por etapa y línea de tiempo en la página del universo, y fondos y 3D de TF, L4D, CS y Portal cuando Manuel decida capturar esos juegos.

**Rediseño realista, bloque 2b: apartados y fichas (Claude, 2026-11-09, rama `feature/section-entry-redesign`):**

- _Página de apartado:_ `GameHero` con `compact` y `EntryTile` (cliente: imagen grande, datos en chips, resumen, insignia «3D» y un solo `ModelSpinner` mientras la ficha está activa por ratón o teclado).
- _Ficha (`/fichas/[slug]`):_ `EntryHero` (cabecera a sangre con fondo desenfocado de su propia imagen, hoja técnica y visor a la derecha) y `EntryMedia` (comparador, 3D o imagen con crédito, también en «Aparece en»). La primera aparición no se repite.
- _Portal:_ icono `portal-gun-fire` (anillo del portal redibujado por Claude, no es el archivo original de Manuel).
- _Comprobado:_ `npm run check` (114 pruebas) y, en navegador a 1440 y 390 px, `/fichas/palanca-half-life-2`, `gordon-freeman` y `anomalous-materials` sin desbordes ni errores. Sin comprobar: contraste AA sobre el fondo teñido, teclado en las fichas nuevas y revisión de Codex.
- _Pendiente:_ bloque 3 (Valve y Steam: fotos de personas, reloj animado y vapor).

**Rediseño realista, bloque 2: hub de juego y página del universo (Claude, 2026-11-09, rama `feature/hub-redesign`; brief del director de diseño y skills `emil-design-eng:animate`, `impeccable` y `frontend-design`):**

- _Correcciones de Manuel tras el bloque 1:_ hormiga león fuera de Half-Life 2 (queda en Episode Two con el Hunter), nuevo icono del Gordon de Half-Life 2 (`gordon-hl2.webp`, con la palanca y la granada) junto al emblema C17, y las piernas de Barney ya no se cortan (`iconsHeight` por juego en `dossier-art.ts`).
- _Hub de juego (`/universos/[universo]/[juego]`):_ `GameHero` (captura a sangre con parallax, iconos de línea que se dibujan, ficha técnica y botón «Ver un modelo 3D» con un solo lienzo por página), `StatStrip` (cifras reales que cuentan al entrar), `SectionPortal` (apartados con la miniatura real de sus fichas; sin imagen propia, el icono de línea del juego), `ChapterStrip` (carrusel con imán de las capturas de capítulo). `SectorSign` borrado. Datos en `get-game-overview.ts`.
- _Página del universo:_ reutiliza `GameHero` con el arte de `universe-art.ts` y sustituye los chips de etapa por tarjetas con años y número de juegos. Se borra la λ y el título antiguos.
- _Movimiento:_ tokens `--ease-out` y `--ease-in-out` en `globals.css`, hover solo con puntero fino y todo condicionado a `prefers-reduced-motion`; las cifras y los iconos llegan ya en su valor final sin JavaScript.
- _Comprobado:_ `npm run check`, `npm run build` y, en navegador a 1440 y 390 px, los hubs de Half-Life 1, Half-Life 2 y Alyx y la página del universo, sin errores de página ni desborde.
- _Pendiente (siguiente):_ fondos por etapa y línea de tiempo en la página del universo, una mejora más de los dossieres (tira de miniaturas), páginas de apartado y de ficha (tarjetas con modelo 3D y ficha con cabecera a sangre) y el bloque de Valve y Steam (fotos de personas, reloj animado, vapor en las tuberías). Sin medir el contraste AA de los textos sobre las capturas.

**Rediseño realista, bloque 1: universos y dossieres (Claude, 2026-11-09, rama `feature/universes-redesign`; decisiones de Manuel: orden universos y dossieres → tarjetas y fichas → Valve y Steam, modelo 3D del juego que gira en las tarjetas, iconos de línea suyos):**

- _Iconos:_ 17 iconos de línea dibujados por Manuel (`public/images/icons/*.webp`, recortados a 1000 px, trazo negro con alfa que se tiñe con `mask-image`) mapeados en `src/data/universe-art.ts` (`lineIcons`). Hunter y hormiga león en Episode Two, Ciudadela en Episode One, calavera C17 y hormiga león en Half-Life 2, pistola en Alyx, Gordon (HEV), marine de la HECU, Barney y Gina y Colette en sus juegos, mercenarios de TF2, supervivientes de L4D1 y L4D2, Counter-Strike y Portal (pistola, cubo, Wheatley y GLaDOS; los de Portal 2 aún sin usar).
- _`/universos`:_ `UniverseGate` (tarjeta de acceso con captura de fondo, icono de línea, inclinación y profundidad con el ratón, icono que se dibuja con GSAP y modelo 3D que gira al activarla) y `SagaBackdrop` (fondo fijo que cambia con la saga que se tiene delante). `UniverseCard` borrada. El modelo 3D solo sale en Half-Life (palanca inclinada 55°); las demás sagas aún no tienen capturas ni modelos propios.
- _Dossieres de `/universos/half-life`:_ capa de arte `DossierArt` (captura tenue con parallax, iconos grandes que se dibujan, modelo 3D al activarlo: arma gravitatoria en HL2, zombine en Episode One, Hunter en Episode Two) en los ocho dossieres, con datos en `src/data/dossier-art.ts`. Retiradas las siluetas pequeñas antiguas de HL2, EP1, EP2 y Alyx. Blue Shift: la banda azul pasa a un pseudo-elemento por debajo del arte y el icono de Barney lleva un tinte en dos tonos.
- _Estado activo:_ `useHoverFocus` separa el ratón y el foco de teclado (salir de uno no apaga el otro) y con «reducir movimiento» el modelo 3D se muestra quieto.
- _Comprobado:_ `npm run check`, `npm run build` y, en navegador, `/universos` y los ocho dossieres a 1440 px (sin errores de página, sin desborde en móvil en `/universos`). Sin comprobar: contraste AA de los textos sobre las capturas, rendimiento en móvil real, los dossieres de Team Fortress y Left 4 Dead (llevan arte pero no se han revisado en pantalla) y el recorrido completo con teclado.
- _Pendiente del rediseño:_ bloque 2 (páginas de tarjetas y de detalle de armas, personajes, etc.) y bloque 3 (Valve y Steam: fotos de Gabe y más gente, reloj junto a la válvula animado y tuberías con vapor). Fondos y 3D para Team Fortress, Left 4 Dead, Counter-Strike y Portal esperan la decisión de capturar TF2, L4D2 y CS:S.

**Imágenes de todo el universo Half-Life, antes del despliegue (Claude, 2026-11-08, rama `feature/source-visual-resources`; decisión de Manuel: render 3D propio para Source, wiki y capturas oficiales para lo no instalado, y capítulos incluidos):**

- _Tanda 0, inventario:_ instalados HL2, Episode One, Episode Two, Lost Coast, TF2, L4D2 y CS:S; Alyx y Decay no. Los modelos Source están en VPK (`hl2_misc_dir.vpk` tiene 2.209 `.mdl`) con `.vvd`, `.vtx` y texturas.
- _Tanda 1, conversor Source (hecha):_ `scripts/source-mdl-to-glb.mjs` + `scripts/lib/{vpk,vtf,glb}.mjs`. Lee `.mdl` v44–49, `.vvd` y `.vtx`, comprueba que son del mismo modelo, decodifica VTF (DXT1/3/5 y sin comprimir), aplica `$alphatest`/`$translucent` y omite el difuminado de aspas. Pose de referencia (A-pose en los personajes). `sharp` declarada como dependencia de desarrollo (antes solo llegaba por Next.js). Sin probar: ojos, cubemaps, tintes `$color2` y v49 (L4D2).
- _Tanda 2, renders de HL2 y episodios (hecha):_ 47 fichas con render propio (`src/data/source-captures.ts`; 12 armas con `.glb` y visor 3D). Banco de capturas fuera del repositorio, con la cámara y la luz de `ModelCompare` (ACES, fondo transparente, recorte y WebP sin pérdida). Sin imagen: francotirador Combine (conserva su captura de wiki), vortigaunt de la Resistencia, torreta, Gordon de HL2 y las fichas sin modelo propio.
- _Tanda 3, Alyx y Decay (parcial):_ solo 3 imágenes (Gina Cross, Colette Green y Richard Keller, `src/data/wiki-screenshots.ts`, Combine OverWiki, licencia Gamescreenshot comprobada en la página del archivo). **Bloqueado:** las imágenes de Alyx están en Fandom, cuyo CDN exige un desafío de Cloudflare (no se elude), y Combine OverWiki casi no tiene imágenes de Alyx. Fandom declara `Gamescreenshot` en solo 6 de las que se miraron (guantes, supresor, soldado, headcrab blindado, Russell y gnomo); el resto es `Fairuse`, arte promocional, composiciones de usuarios o sin licencia.
- _Tanda 4, capítulos (hecha, 61 de 67):_ capturas propias de cada capítulo en `src/data/chapter-captures.ts`. Se arranca el juego en una ventana sin bordes en 0,0 a 1280×720, se carga el primer mapa del capítulo, se oculta el HUD y se fotografía la pantalla (Source: `+host_framerate 30 +wait 450 +jpeg`; GoldSrc: espera fija de 22 s y captura de pantalla con `CopyFromScreen`, porque en GoldSrc `wait` espera un solo fotograma, `exec` no retrasa nada y la línea de comandos admite solo 50 argumentos). Donde el punto de aparición sale a oscuras o mirando a una pared se prueba otro mapa del capítulo y se elige la toma más nítida (desviación del laplaciano); las oscuras se aclaran con una curva gamma (`brightened` en el crédito). Cifras: HL1 14, Opposing Force 13, Blue Shift 9, HL2 13, Episode One 5 y Episode Two 7. Sin imagen: Endgame y Dark Energy (todos sus mapas salen casi negros) y cuatro capítulos cuya mejor toma no se entiende (We've Got Hostiles, Residue Processing, The Package y Blast Pit). Decay y Alyx no tienen capturas de capítulo (juegos no instalados).
- _Alyx (hecho, parcial):_ decisión de Manuel de usar las capturas oficiales de la tienda de Steam. Se bajan las 12 (`store.steampowered.com/api/appdetails`, app 546560), pero son promocionales y **sin etiqueta de capítulo**: solo se asignan las 4 que muestran claramente su tema (guantes de gravedad, soldado Combine, Russell y la pistola), en `src/data/wiki-screenshots.ts` con la fuente de la tienda. Las otras 8 y los 11 capítulos de Alyx quedan sin imagen para no atribuir una escena al capítulo equivocado.
- _Correcciones de pose y cuerpos (hechas a petición de Manuel):_ `[brazos]` en el conversor (24° baja los brazos de los 13 personajes humanos, con esqueleto ValveBiped y pesos de hueso), zombis con su grupo `headcrab` activado (el venenoso, `0,1,1,1,1,0`) y materiales aditivos omitidos (el cristal de las gafas de Kleiner salía negro). Las pruebas del conversor son visuales, con un banco de capturas fuera del repositorio.
- _Comprobado:_ `npm run check` (114 pruebas) y `npm run build`; HTML de `/fichas/palanca-half-life-2` con imagen, `.glb`, «Ver en 3D» y crédito. Sin comprobar en navegador el visor 3D de las armas nuevas.

**Limpieza de la etapa Source (Claude, 2026-10-31, rama `fix/source-cleanup`):**

- _Contenido retirado (decisión de Manuel):_ `src/data/half-life-2-content.ts` (52 fichas) y `src/data/half-life-2-episode-two-content.ts` (42 fichas), y el lore de Half-Life 2, Episode One y Episode Two. Tenían diseñadores inventados («Dhab8», «Jessek»), archivos de mapa y argumentos incorrectos, cifras sin fuente (la pistola con munición .357), notas inventadas y spoilers visibles (la muerte de Eli Vance en un resumen). Se rehará con fuentes, como Half-Life 1. Corregidos los resúmenes de Episode One y Episode Two en `games.ts`.
- _Fallo de los fondos:_ los colores de cada juego estaban en tres sitios (`GameTheme`, clases `game-page--*` y `section-page--*`) con valores distintos; las copias de las páginas solo pintaban la columna central y resucitaban temas descartados (papel claro de Half-Life 1, blanco de Blue Shift). Ahora solo `GameTheme` define el tema, con Episode One y Episode Two incluidos (provisionales hasta el rediseño); borrado `get-game-theme.ts`, duplicado de `dossier-looks.ts`.
- _Otros:_ Prettier en los archivos de Kilo; borrados `hl2-v8-1440.png`, `hl2-v9-1440.png`, `lambda-test5.png` y los planes `docs/hl2-content-plan*.md`.
- _Comprobado:_ `npm run check` (lint, tipos, formato y 38 pruebas), `npm run build` (238 páginas) y el hub de Episode Two con el fondo del tema a todo el ancho.
- _Decisión de Manuel para el rediseño:_ lo hace Claude entero, sin volcar el código en el chat; explicación paso a paso solo si Manuel la pide. Arte pedido: Decay como archivo del laboratorio de Gina y Colette; Half-Life 2 con Resistencia, Ciudad 17, Ravenholm y el naranja del traje HEV; Episode One como documento de la Alianza en la Ciudadela (hormigón, Stalkers, emblema de los Combine Elite); Episode Two como archivo de la base de White Forest con la paleta de los vortigaunts, la silueta del Hunter y las hormigas león.

**Rediseño de los dossiers de Decay, Half-Life 2, Episode One y Episode Two (Claude, 2026-10-31, rama `feature/source-dossiers-redesign`; aprobado por Manuel como primera fase de diseño, a mejorar en la fase de solo diseño):**

- Decay: hoja de registro del laboratorio de Materiales Anómalos (papel de calibración, banda lavanda/coral de Gina Cross y Colette Green, visado de las dos). Half-Life 2: cartel de la Resistencia con cinta sobre hormigón, λ a espray, naranja HEV y sello de Ravenholm. Episode One: directiva de la Alianza en la Ciudadela (placas de metal, esquinas cortadas, emblema acreditado de la Alianza, silueta de la Ciudadela, aviso de núcleo inestable). Episode Two: hoja de la base de White Forest sobre mapa topográfico (verde vortigaunt, ámbar de hormigas león, silueta de un Hunter).
- Cada variante pasa de unas 250 líneas a unas 50; `GameTheme` usa la misma paleta en hub, apartados y fichas. Siluetas propias del Hunter y de la Ciudadela; borrados los SVG de Kilo sin uso.
- Comprobado: `npm run check` (38 pruebas), `npm run build` (238 páginas), capturas a 1440 y 390 px sin scroll horizontal, contraste AA de los textos nuevos y revisión de Codex (2 hallazgos corregidos). Sin comprobar: recorrido con teclado y la animación de entrada sin movimiento reducido.

**Visor 3D de las armas (Claude, 2026-10-31, rama `feature/weapon-3d-viewer`; decisión de Manuel tras `grill-me`: modelo 3D real, en el mismo comparador, antes de R3):**

- `scripts/mdl-to-glb.mjs`: conversor propio de `.mdl` GoldSrc v10 a `.glb` (pose del fotograma 0, cuerpo y piel por defecto, texturas de 8 bits a PNG con `sharp`, también las de `*t.mdl`). Uso: `node scripts/mdl-to-glb.mjs <modelo.mdl> <salida.glb>`.
- 24 `.glb` en `public/models/entries/` (12 armas de Half-Life 1, original y HD; unos 800 KB en total). `halfLifeModelImages()` añade `images.models` a los modelos `w_`.
- `ImageCompare` gana el botón «Ver en 3D»; `ModelCompare` (Three.js 0.187, React Three Fiber 9, drei 10, cargado con `next/dynamic` solo al pulsarlo) pinta en un lienzo el original a la izquierda de la cortina y el HD a la derecha con la misma cámara; se gira arrastrando o con las flechas.
- Prueba nueva: los modelos declarados existen en `public/` (39 pruebas).
- Comprobado: `npm run check`, `npm run build` (238 páginas) y el visor en `/fichas/palanca` y `/fichas/canon-tau` (texturas, cortina y flechas). Riesgo aceptado por Manuel: los `.glb` publican geometría y texturas de Valve. Pendiente: acreditar los modelos en `/creditos`.

**R3: imágenes y 3D de Opposing Force, y nuevas imágenes de Half-Life 1 (Claude, 2026-11-01, rama `feature/hl1-visual-resources-r3`; decisiones de Manuel tras `grill-me`):**

- _Método nuevo:_ las imágenes ya no salen de Half-Life Asset Manager (movía el ratón y el teclado). Cada modelo se convierte a `.glb` (`scripts/mdl-to-glb.mjs`, ahora con secuencia opcional y grupos de secuencias `NN.mdl`) y se fotografía en el navegador con la misma cámara y luz que el visor 3D, con fondo transparente; las parejas comparten encuadre y se recortan con el mismo rectángulo. El banco de capturas es una página temporal que no se versiona.
- _Half-Life 1:_ las 20 parejas rehechas con la luz nueva (a petición de Manuel) y con sus tamaños actualizados; el crédito dice ahora «Render propio del modelo…».
- _Opposing Force:_ imagen única de 9 armas (con visor 3D de un solo modelo), 6 criaturas (pit drone, soldado de choque, voltigore, gonome, pit worm y gusano gen), Otis y el instructor Barnes; pareja original/HD del asesino de operaciones encubiertas y de los ingenieros y médicos de la HECU. `opposingForceModelImages()` en `model-captures.ts`.
- _Visor 3D:_ encuadre por la esfera que envuelve el modelo y giro sobre su centro (el arma ya no se sale del marco al girarla); luz de estudio (principal, relleno y contorno); admite un solo modelo sin cortina, y la ficha lo usa también para imágenes sin pareja HD.
- _Decisiones de Manuel:_ las fichas de Half-Life 1 que salen en las expansiones reutilizan sus imágenes de HL1; los personajes sin modelo propio (Shephard, Sharp, Walter Bennet) quedan sin imagen.
- _Cierre de R3 (2026-11-01, a petición de Manuel):_ en Opposing Force los marines son compañeros, no enemigos: se quita `hecu-marine` de sus apariciones y la ficha conjunta de apoyo se sustituye por cuatro clases con su modelo aliado y pareja HD: soldados (MP5 o escopeta), ametralladores (M249), médicos e ingenieros (cuerpos, cabezas y armas según el SDK reconstruido por TWHL; salud y curación de la lista de variables de la comunidad). El conversor elige cuerpo por parte y familia de piel (Simmons, cabeza Luther, usa la piel 1 de manos oscuras, como en el SDK de Valve). Blue Shift: Rosenberg (cuerpo 3), Simmons (cuerpo 2) y Walter Bennet (cuerpo 0) con pareja original/HD, según las entidades de `ba_yard5a`, `ba_teleport1` y `ba_outro`. Shock roach criatura con su imagen. El crédito de las armas con visor indica que el `.glb` sale del mismo archivo.
- _Sin imagen (sin fuente):_ Harold (no aparece con ese nombre en los mapas), Shephard, Sharp y el resto de personajes sin modelo propio.
- _Comprobado:_ `npm run check` (39 pruebas) y, en el navegador, `/fichas/desert-eagle` (imagen y 3D girado), `/fichas/asesino-black-ops` (pareja alineada) y una hoja de contactos de las 41 imágenes.

**DevOps-1: integración continua (Claude, 2026-11-02, a petición de Manuel; rama `chore/ci-github-actions`, PR #102):** `.github/workflows/ci.yml` ejecuta en cada PR hacia `main` y en cada push a `main` dos trabajos en Ubuntu con Node 24 y caché de npm: «Calidad» (`npm ci`, lint, tipos, formato y pruebas como pasos separados) y «Build de Next.js» (solo si la calidad pasa). Permisos de solo lectura y cancelación de ejecuciones viejas de la misma rama. Comprobado: los dos trabajos en verde (55 s y 35 s) y, con un commit temporal mal formateado, falla justo el paso «Formato (Prettier)» y el build se salta; el commit se revirtió. Borrada la rama local sin uso `feature/hl2-content-research`. Pendiente (Manuel, en GitHub): exigir los dos checks en la regla de `main`. Siguientes pasos: Docker, Docker Hub con secretos y SonarQube.

**DevOps-2: ValveDex en Docker (Claude, 2026-11-02; rama `chore/docker`):** `Dockerfile` de tres etapas sobre `node:24-alpine` (dependencias con `npm ci`, compilación y ejecución), `.dockerignore`, `docker-compose.yml` (`docker compose up --build`, puerto 3000) y `output: "standalone"` en `next.config.ts`, activado solo en el build de la imagen con `NEXT_OUTPUT=standalone` (hallazgo de Codex: `next start` avisa con ese modo y no debe cambiar). La imagen corre con el usuario `node` y tiene healthcheck. El CI gana el trabajo «Imagen de Docker», que construye la imagen sin publicarla. Comprobado en local: `npm run check` (39 pruebas), `npm run build` (250 páginas), imagen de 352 MB (la base de Node pesa la mayor parte; `node_modules` 38 MB, `public` 11 MB) y, dentro del contenedor, 200 en `/`, `/universos/half-life`, `/fichas/palanca`, el optimizador de imágenes (`sharp`) y un modelo `.glb`; usuario `node` y estado «healthy». Siguiente: DevOps-3, publicar en Docker Hub con secretos de GitHub (los mete Manuel).

**DevOps-3: publicar en Docker Hub (Claude, 2026-11-02; rama `chore/docker-publish`):** `.github/workflows/docker-publish.yml` construye y publica la imagen `<usuario>/valvedex` en Docker Hub en cada push a `main` (etiquetas `latest` y el commit corto) y en cada tag `v*` (la versión, por ejemplo `0.2.0`). Nunca se ejecuta en PR, para no usar secretos con código sin revisar. Usa los secretos de GitHub `DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN` (creados por Manuel; el token no pasó por el chat ni por el repositorio). Solo amd64. La regla de `main` exige ya los tres checks (Calidad, Build e Imagen de Docker). Siguiente: DevOps-4, SonarQube.

**DevOps-4: SonarCloud (Claude, 2026-11-02; rama `chore/sonarcloud`):** `sonar-project.properties` (organización `manuelklk03`, proyecto `Manuelklk03_ValveDex`, público; analiza `src` y `scripts`, trata los `*.test.ts` como pruebas y no cuenta `src/data` como duplicado) y `.github/workflows/sonarcloud.yml`, que analiza en cada PR hacia `main` y en cada push a `main` con el secreto `SONAR_TOKEN` (creado por Manuel; «Automatic Analysis» desactivado en SonarCloud). Todavía sin cobertura de pruebas ni puerta de calidad bloqueante: se decidirá con el primer informe.

**DevOps-4a: primer informe y cobertura (Codex, 2026-11-03; rama `chore/sonar-coverage`, PR #108):** el análisis de `main` en SonarCloud para `d9ce60e` terminó correctamente: puerta de calidad en verde, 0 errores, 0 vulnerabilidades, 67 problemas de mantenibilidad y 0 % de cobertura porque no se enviaba ningún informe. Se añade `@vitest/coverage-v8` en la misma versión que Vitest, el comando `npm run test:coverage`, configuración LCOV en `vitest.config.mts` y generación del informe antes del análisis de SonarCloud. El informe incluye archivos sin pruebas de `src` y `scripts`, para que el porcentaje no se infle al contar solo los módulos importados por los tests. En local: 39 pruebas, 17,59 % de líneas cubiertas, `npm run check` y `npm run build` (250 páginas) correctos. En la PR, el trabajo de SonarCloud pasa y muestra 14,3 % de cobertura global con la puerta de calidad en verde. Pendiente: confirmar el resultado en `main`; después decidir qué rutas merecen nuevas pruebas y si se exige la puerta de calidad como check obligatorio.

**Iconografía de Team Fortress y Left 4 Dead (Claude, 2026-11-03, rama `feature/universe-cards-tf-l4d`; continúa el trabajo de Kilo Code, que dejó sin guardar los iconos oficiales de Steam):** tarjetas de `/universos`: restaurados los estilos de la cabecera de acreditación (la de Half-Life salía como «Acceso concedidohalf-life»), y TF y L4D comparten estructura con Half-Life; el emblema de TF2 (`tf2-emblem.png`, el icono oficial sin el fondo gris) se pinta con `mask` en RED y BLU, y el «4» de L4D va como marca de agua, sin el panel rectangular que los separaba. Dossiers de Team Fortress Classic, Team Fortress 2, Left 4 Dead y Left 4 Dead 2: marca grande en el hueco entre el texto y la ficha técnica (desde 64rem), como la λ de Half-Life 1; TF en los dos colores de equipo y L4D 2 en tono ocre. Borrada la silueta dibujada de infectado de L4D (sin uso) y actualizados sus créditos. Color de acento de L4D aclarado para AA (5,36:1). Comprobado: `npm run check` (39 pruebas), build (250 páginas), capturas a 1440 px y 1024 px y tarjeta en móvil sin scroll horizontal. Sin comprobar: la revisión con teclado.

**Mejora de Valve y Steam, en marcha (Claude, 2026-11-04; decisiones de Manuel tras `grill-me`):** Steam con épocas y «skin» propia; portada con movimiento alto (cinematográfico, con versión simplificada en móvil y movimiento reducido), fondo industrial, cifras vivas, juegos destacados e historia como línea de producción; historia de Valve ampliada con fuentes. Tandas: (1) `feature/valve-content`, (2) `feature/home-redesign`, (3) `feature/home-motion`, (4) `feature/steam-eras`, (5) revisión final. Las páginas nuevas se explican archivo a archivo en el chat; el diseño puro lo hace Claude sin explicarlo.

- _Tanda 1 hecha (rama `feature/valve-content`):_ 11 hitos de Valve (1996–2023) con fecha y fuente en `valve-milestones.ts`; campo opcional `date` en `Milestone`; `src/domain/steam-era.ts`, `src/data/steam-eras.ts` (3 épocas con 17 hechos, fuente: Wikipedia en inglés, kind `wiki`) y `get-steam-eras.ts`; las épocas salen en `/creditos`; prueba nueva (épocas sin solaparse). Comprobado: `npm run check` (41 pruebas). Sin comprobar contra fuente primaria: Wikipedia se contradice sobre el año de Steam (2002 en la introducción, 2003 en el cuerpo); se usó 2003 con la beta de 2002. Los colores de cada época se verificarán con capturas en la tanda 4.

- _Tanda 2 hecha (rama `feature/home-redesign`, estática; el movimiento va en la tanda 3):_ portada con fondo industrial (`IndustrialBackdrop`: tuberías con bridas y manómetro en SVG), 4 cifras (sagas, juegos, fichas y apartados), sección «Juegos» (`GamesShowcase`: una placa por juego oficial agrupada por saga, con el color de la saga), «Historia» como línea de producción (`ProductionLine`: los 11 hitos en una tubería horizontal con scroll, enfocable con teclado) y «Steam» con el avance de sus tres épocas (`SteamErasTeaser`, enlaces a `/valve/steam#<época>`; los anclajes llegan en la tanda 4). Comprobado: `npm run check` (41 pruebas), `npm run build` (250 páginas), capturas a escritorio y a 375 px sin scroll horizontal. Sin comprobar: teclado y contraste AA de las tarjetas de época.

- _Tanda 3 hecha (rama `feature/home-motion`):_ `HomeMotion` (`src/features/valve/components/home-motion.tsx`, componente de cliente) con GSAP + ScrollTrigger y `SmoothScroll` (Lenis) en la portada: entrada de la cabecera, cifras que cuentan, válvula que gira con el scroll de toda la página, fondo industrial con parallax, secciones que aparecen y la historia fijada en pantalla (desde 56rem) mientras la tubería avanza con un «fluido» (`--flow`). Con «reducir movimiento» nada se anima y la tubería se desliza a mano; en móvil no hay pin. Los ganchos son atributos `data-*` (`data-hero-item`, `data-count`, `data-home-wheel`, `data-home-reveal`, `data-home-pin`, `data-line-scroller`, `data-parallax-backdrop`). Comprobado en navegador: el pin mantiene la sección en su sitio mientras `scrollLeft` pasa de 0 a 2735 px, las cifras acaban en su valor, reducido y móvil sin pin y sin desbordes. Límite conocido: con el pin activo, tabular hasta una fuente de la tubería no recoloca el scroll de la página.

- _Tanda 4 hecha (rama `feature/steam-eras`):_ `/valve/steam` reescrita: introducción con la paleta de Valve (cifras de la beta, el lanzamiento y los usuarios de 2021, e índice de épocas) y tres franjas a todo el ancho, una por época, cada una con su «skin» (orígenes: verde oliva, dorado y Verdana con biseles; plataforma: azul nocturno con cápsulas; cliente unificado: plano, redondeado y azul vivo). Los hechos salen de `steam-eras.ts` con su fuente; los anclajes `#origins`, `#platform` y `#unified` funcionan (los usa el avance de la portada). Las paletas pasan a `globals.css` (`--steam-*`), compartidas con `SteamErasTeaser`. `SteamMotion` anima la entrada de cada época (no con movimiento reducido). `/valve/historia` muestra ahora la fecha de cada hito. Contraste AA de los 11 pares de color (mínimo 5,42:1). Comprobado: `npm run check` (41 pruebas), `npm run build`, capturas a escritorio y 375 px sin desbordes. Los colores son interpretación de ValveDex, no oficiales; no se han contrastado con capturas históricas del cliente.

- _Tanda 5 hecha (revisión final y pulido):_ recorrido completo con teclado en `/`, `/valve/steam`, `/valve/historia` y `/creditos` con foco visible en todos los elementos interactivos y tarjetas (`:has(:focus-visible)`); en `HomeMotion`, `handleFocusIn` enfoca y alinea el scroll también al enfocar el contenedor de la línea de producción; revisión con antislop de los textos nuevos de `steam-eras.ts` y `valve-milestones.ts` (tono enciclopédico directo, precisión en acuerdos de distribución de terceros y fechas); paleta de Steam como interpretación de diseño basada en las etapas del cliente (verde militar de 2003, azul nocturno de 2010 y cliente unificado de 2022), sin contrastar con capturas históricas del cliente. Comprobado: `npm run check` (41 pruebas, tipos, formato y lint). Fusionada en `main` con PR #115 (`23ea01e`).

**Contenido con fuentes de Half-Life 2 y universos disponibles (Claude, 2026-11-04, rama `feature/hl2-and-universes-content`):**

- _Lore por juego (`src/data/game-lore.ts`):_ completado para todos los juegos del catálogo con fuentes de Combine OverWiki y Official TF2 Wiki (`half-life-2`, `half-life-2-episode-one`, `half-life-2-episode-two`, `half-life-alyx`, `team-fortress-classic`, `team-fortress-2`, `left-4-dead` y `left-4-dead-2`), con spoilers protegidos tras `<details>`.
- _Half-Life 2 (`src/data/half-life-2.ts`):_ 14 capítulos canónicos con archivos de mapa del motor Source (`d1_trainstation_01` a `d3_breen_01`), 9 armas icónicas (incluyendo el arma gravitatoria, rifle de pulso AR2 y ferópodo), personajes clave (Alyx Vance, Wallace Breen, Judith Mossman, Padre Grigori y D0g; Gordon Freeman, G-Man, Barney, Eli y Kleiner vinculados mediante apariciones), 6 enemigos (Protección Civil, soldados Overwatch, Striders, cañonera Combine, zombis rápidos y hormigas león) y 2 extras (física Havok y el Vortigaunt profeta).
- _Team Fortress (`src/data/team-fortress.ts`):_ las 9 clases de mercenarios como personajes con actores de voz y trasfondo (Heavy, Scout, Soldier, Spy, Medic, Engineer, Pyro, Demoman y Sniper), armas reglamentarias (Minigun, lanzacohetes, llave inglesa y reloj de invisibilidad), mapas clásicos (2Fort, Dustbowl) y trivia de los cortos «Meet the Team».
- _Left 4 Dead (`src/data/left-4-dead.ts`):_ los 8 supervivientes de L4D1 y L4D2 (Bill, Zoey, Louis, Francis, Coach, Ellis, Nick, Rochelle), 6 infectados especiales (Hunter, Smoker, Boomer, Tank, Witch, Charger), armas (escopeta automática, bomba de tubo, sartén), campaña Alta médica (No Mercy) y curiosidad del Director de IA.
- _Comprobado:_ `npm run check` (41 pruebas en verde, ESLint, TypeScript estricto y Prettier sin errores).

**Auditoría de spoilers, regla de 3 commits y pruebas de integridad (Antigravity, 2026-11-05, PR #118, merge `b320ea6`):**

- _Flujo de trabajo formalizado:_ regla en `AGENTS.md`, `docs/workflow.md` y `docs/STATUS.md` exigiendo que cada PR agrupe trabajo sustancial estructurado en al menos 3 commits atómicos y lógicos.
- _Auditoría de spoilers:_ eliminada la revelación del giro de Judith Mossman en el capítulo Entrelazamiento y en su ficha de personaje; suprimido el desenlace del reactor en Energía oscura; suavizadas notas de trasfondo en Alyx Vance y Bill Overbeck.
- _Pruebas de integridad:_ nuevas comprobaciones automáticas en `src/data/data-integrity.test.ts` para verificar mapas de capítulos (archivos `.bsp` existentes y números válidos), estadísticas de armas (slots y municiones consistentes), y ausencia de párrafos vacíos en el lore.
- _Comprobado:_ 44 pruebas de Vitest, ESLint, TypeScript estricto, Prettier y los 4 checks de GitHub Actions (Calidad, SonarCloud, Build y Docker) en verde.

**Ampliación de la sección de Valve: personas y hardware (Antigravity, 2026-11-05, PR #119, merge `5e656ff`):**

- _Personas clave de Valve (`src/data/valve-people.ts`):_ ampliadas de 2 a 7 figuras con fuentes verificadas (Marc Laidlaw, Robin Walker, Kim Swift, Erik Johnson y Chet Faliszek).
- _Catálogo de Hardware (`src/domain/valve-hardware.ts` y `src/data/valve-hardware.ts`):_ 7 dispositivos documentados con ficha técnica, año, categoría y fuentes oficiales (Steam Controller, Steam Link, Steam Machines, HTC Vive, Valve Index, Steam Deck y Steam Deck OLED).
- _Página `/valve/hardware`:_ nueva ruta estática con el componente `HardwareCard` en CSS Modules con BEM, migas de pan y enlaces cruzados hacia la historia y Steam.
- _Portada `/`:_ la sección 01 muestra «Figuras clave» y enlace al catálogo de hardware.
- _Créditos y pruebas:_ hardware integrado en `get-credits.ts` y pruebas de integridad de hardware en `data-integrity.test.ts`.

**Limpieza de SonarCloud y ampliación de cobertura (Antigravity, 2026-11-05, rama `chore/sonarcloud-cleanup-and-coverage`):**

- _Calidad de código:_ eliminadas claves de array index en `Breadcrumb` y en el lector de lore; suprimido comentario duplicado en `GameDossier`.
- _Configuración de cobertura:_ exclusiones alineadas en `sonar-project.properties` y `vitest.config.mts` para centrar el informe en la lógica de negocio y utilidades reales del proyecto.
- _Suite de pruebas:_ suite ampliada a 100 tests con Vitest cubriendo al 100% las funciones y líneas de `features/catalog`, `features/credits`, `features/games`, `features/valve`, `domain` y `data`.
- _Comprobado:_ `npm run check` (100 pruebas en verde, tipos y formateo superados).

**Niveles, Source completo y despliegue (Claude Code con agentes de investigación, 2026-11-06; rama `feature/levels-and-source-content`; decisiones de Manuel tras `grill-me`: Render, imágenes de la wiki para HL2 ahora y 3D de Source después, fotos de niveles después, lista de niveles en todos los juegos y detalle completo en HL2):**

- _Niveles:_ cada capítulo lista sus mapas y cada mapa tiene página (`/fichas/<capítulo>/<mapa>`, 916 páginas estáticas en total). Las wikis no dicen qué ocurre en cada mapa (solo en cada capítulo), así que los personajes, enemigos y armas de cada nivel se leen de la **lista de entidades de los `.bsp` del juego instalado** (332 mapas de HL1, OF, BS, HL2 y episodios) y se enlazan a fichas con `levels/entity-entries.ts`. Las fichas manuales de nivel (con descripción y fuente) son pocas: 1 de HL2 (Energía oscura) y 9 de los episodios; las demás páginas muestran número, archivo de mapa, navegación y las fichas del mapa. Los niveles se llaman «Nivel N» porque ninguna fuente da nombres por mapa. Fotos de nivel: hueco previsto, sin imágenes.
- _Datos de mapas auditados con los archivos del juego:_ capítulos de HL2 corregidos con los `chapterN.cfg` (el informe de Codex tenía razón en canals_01a/04, town_01a/02a, coast_06, c17_06a/b, c17_10a/b y c17_12b, y se equivocaba con `d2_prison_01`, que empieza en Sandtraps); `d2_coast_02.bsp` está vacío en el juego y se quitó; OF: `of2a5b` y `of3a3` no existen (se quitaron) y se añadió `of2a6`. HL1 y BS: todos sus mapas existen. Orden de los mapas dentro de un capítulo: por nombre de archivo, que puede no coincidir con el orden de juego (p. ej. los `d1_town_*`).
- _Contenido nuevo (agentes con fuentes):_ Episode One (5 capítulos y 14 mapas reales, zombine, 7 curiosidades), Episode Two (7 capítulos, hunter, hormiga león obrera, Magnusson, vortigaunt solitario, dispositivo Magnusson, 7 curiosidades), Half-Life: Alyx (11 capítulos con mapas **no verificados** porque el juego no está instalado, 6 armas, 9 enemigos, 4 personajes, 8 curiosidades) y 34 fichas de HL2 (crowbar y granada propias, 15 enemigos, 7 personajes con las versiones de HL2 de Gordon, G-Man, Barney, Eli y Kleiner, 10 extras, 6 imágenes con licencia «Gamescreenshot»). Sin cifras de salud ni daño sin fuente.
- _Separación HL1/HL2:_ los cinco personajes tienen ficha propia por juego, enlazadas con la relación `same-character` («Otra versión del personaje»). Las armas de HL1 y HL2 ya eran fichas distintas.
- _Verificación de Codex del contenido de HL2, TF y L4D (PR `652266d`):_ corregidos spoilers de HL2, los mapas, la escopeta, TF2 solo en TF2 (y lore de TFC sin trasfondo de TF2), No Mercy separado por juego y las fuentes de L4D (ahora su wiki de Fandom; **no se pudieron comprobar** porque Fandom bloquea las descargas automáticas).
- _Despliegue:_ `docker-publish.yml` despliega staging en Render al llegar a `main` y producción al crear un tag (aprobación manual); guía en [deploy.md](deploy.md). **Pendiente de Manuel:** crear los dos servicios en Render y los entornos `staging` y `production` de GitHub con `RENDER_DEPLOY_HOOK`, `STAGING_URL` y `PRODUCTION_URL`, y después la variable del repositorio `DEPLOY_ENABLED=true` (hasta entonces los trabajos de despliegue se omiten). La web publica `/version` con el commit de su imagen y el pipeline espera a verlo (revisado por Codex: producción solo acepta tags `vX.Y.Z` y los `curl` tienen tiempo máximo).
- _Comprobado:_ `npm run check` (114 pruebas), `npm run build` (916 páginas) y capturas de un nivel de HL2. La revisión de Codex de la rama dio 6 hallazgos, corregidos: el extractor valida la cabecera y los límites del lump y falla si un mapa no se puede leer; la clase `npc_antlion` no se enlaza en Episode Two (no distingue la hormiga león obrera); spoilers del último nivel de Episode One y de Energía oscura movidos a párrafos ocultos; dos cifras sin fuente de archivos del juego (cargador de la escopeta de Alyx y dardos del hunter) y una afirmación sin fuente sobre la hormiga león de Alyx, retiradas; la nota de la página de nivel dice «algunas» fichas. Sin comprobar: recorrido con teclado de las páginas de nivel.
- _Pendiente:_ nombres y descripciones por nivel con fuente (ninguna wiki las da por mapa), fotos de niveles, mapas de Alyx contra el juego, 3D de los modelos de Source, contenido de Decay, TF y L4D por niveles (juegos no instalados) y las clases sin ficha (barnacle, stalker, consejero…).

**Situación el 2026-10-30:** Half-Life: Decay quedó integrado en `main` con la PR #78. Half-Life 2 abre la etapa Source con su primer dossier en la rama `feature/hl2-dossier`: aviso de la Protección Civil sobre el hormigón de la Ciudad 17, naranja del HUD y de la Resistencia (`#ff9b21`), cian de la Alianza (`#6fb9c9`), tema propio en el hub y una única λ dibujada en SVG. Faltan el contenido de Half-Life 2 (apartados y fichas) y **R3**, las parejas HD de Opposing Force y Blue Shift.

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
     **Z3-0 hecho (PR #52):** `Source.kind`, `DifficultyValues`, campos de armas, mapas y enemigos y párrafos de lore con spoiler.
     **Z3-1 hecho (Claude, a petición de Manuel):** los 20 capítulos de Half-Life 1 en `src/data/half-life-chapters.ts` (Hazard Course como «Entrenamiento opcional», 1–18 y Endgame como 19, según Combine OverWiki), con archivos de mapa, diseñadores con fuente y notas de desarrollo (campo nuevo `notes`, sección «Desarrollo y curiosidades» de la ficha). Los 9 capítulos sin página propia en Combine OverWiki toman los mapas de una guía de Kosgames (`kind: "community"`). Los capítulos se ordenan por juego y número (`compareEntries`, 2 pruebas). Codex comprobó los datos de 4 capítulos contra la fuente.
     **Z3-2 hecho (Claude):** las 14 armas de Half-Life 1 en `src/data/half-life-weapons.ts` (las 4 antiguas conservan id, slug e imagen), con ranura del HUD, munición, munición máxima (`weapons.h` del SDK de Valve), daño por dificultad (copia de `skill.cfg` en GitHub; la Hivehand, fijo en `gamerules.cpp`) y notas de desarrollo, mecánicas y técnicas de speedrun (SourceRuns, `kind: "community"`). La ficha marca las fuentes de comunidad con «(comunidad)» (ajuste pequeño, permitido por Manuel).
     **Z3-3 hecho (Claude):** 22 enemigos de Half-Life 1 en `src/data/half-life-enemies.ts` (el headcrab conserva id y sus 3 apariciones), con origen, salud por dificultad (`skill.cfg` o, si no tiene variable, el código del SDK) y notas de desarrollo y mecánicas. La gonarca no lleva cifra de salud porque el código la recalcula en cada punto del mapa. Las cifras usan la coma decimal (`toLocaleString("es")`).
     **Z3-4 hecho (Claude):** 7 personajes de Half-Life 1 en `src/data/half-life-characters.ts` (Gordon conserva id y apariciones), con afiliación, voz y diseño (campos nuevos `voiceActor` y `designers`) y notas de desarrollo. Eli, Kleiner y Barney Calhoun se presentan como personajes que recibieron nombre después de Half-Life. Se quitó un spoiler antiguo del resumen de Gordon en Blue Shift. El asistente holográfico y la megafonía (tecnología) quedan para Z3-6; Walter Bennet, para Opposing Force; el Administrador, para Half-Life 2 (su identidad sería spoiler).
     **Z3-5 hecho (Claude):** el lore de Half-Life 1 tiene 2 párrafos visibles sin spoilers y 6 ocultos tras el botón (`spoiler: true`) con la historia completa hasta la elección final, según Combine OverWiki. La premisa ya no dice que el ejército viene a silenciar el incidente.
     **Z3-6 hecho (Claude):** 9 easter eggs y 10 curiosidades de Half-Life 1 en `src/data/half-life-extras.ts` (taquillas de los desarrolladores, la taquilla de Gordon, la megafonía Vox, el asistente holográfico, la versión alemana, Day One, Uplink, la alfa de 1997, los nombres en clave…). Fuera a propósito: el chiste de la caja de munición (sensible), los récords de speedrun (cambian a menudo) y un dato de Reddit que no se pudo leer. **Con esto, el contenido de Half-Life 1 (Z3) está completo: punto adecuado para `v0.2.0` cuando Manuel lo indique.**
     **Z4: cierre del bloque Half-Life 1 (Claude, 2026-10-25, rama `feature/hl1-expansions`, sin commit por indicación de Manuel).**

     _Trabajo completado:_
     - **Opposing Force** (`src/data/opposing-force.ts`): 14 capítulos (Boot Camp, 1–12 y Conclusion) con archivos de mapa, 9 armas nuevas, 8 enemigos nuevos (incluida la raza X), 6 personajes (Shephard, Barnes, Sharp, Otis, ingenieros y médicos de la HECU y Walter Bennet), una curiosidad y su lore completo (2 párrafos visibles y 3 con spoiler).
     - **Blue Shift** (`src/data/blue-shift.ts`): 9 capítulos (Hazard Course, 1–8), 3 personajes nuevos (Rosenberg, Simmons y Harold), 3 curiosidades (chaleco y casco, «Guard Duty», High Definition Pack), 4 easter eggs y su lore completo (2 visibles y 3 con spoiler). No tiene armas ni enemigos nuevos.
     - **Apariciones compartidas** (`src/data/expansion-appearances.ts`): 27 fichas de Half-Life 1 aparecen en Opposing Force y 22 en Blue Shift (más Otis y Walter Bennet, que se comparten entre las dos), según la lista de apariciones de su página de Combine OverWiki; Barney Calhoun tiene resumen propio en Blue Shift. `entries.ts` las fusiona y una prueba nueva comprueba que apuntan a fichas existentes.
     - Ficha de GoldSrc ampliada; «Gordon, empleado del mes» con su capítulo y su fuente.

     _Resultados comprobados:_ `npm run check` (34 pruebas); las 134 fuentes distintas del catálogo responden 200; capturas del hub de Opposing Force (7 de 7 apartados) y de la ficha del cañón desplazador. Total: 141 fichas (Half-Life 1: 84 apariciones; Opposing Force: 70; Blue Shift: 46).

     _Pendientes y bloqueos:_
     - Las cifras de Opposing Force salen de un volcado de variables y de una copia de `skill.cfg` publicados por la comunidad (marcados así): Valve no ha publicado los de esta expansión.
     - La salud del gusano gen no tiene cifra: las variables (70/90/100) contradicen a Combine OverWiki (840/1080/1200).
     - Los mapas de los capítulos de Opposing Force y Blue Shift sin página propia salen de la wiki de SourceRuns y de la tabla de localizaciones de Combine OverWiki; la Valve Developer Community bloquea las descargas automáticas.
     - Las armas que solo están en multijugador (por ejemplo, el .357 o la ballesta en Opposing Force) no se han marcado como apariciones: irán al apartado «Multijugador».
     - Sven Co-op y Half-Life para Dreamcast siguen solo con su hub: su contenido no forma parte de este bloque.
     - Los datos de `src/data/games.ts` siguen sin contrastar con fuentes (pendiente antiguo).

     _Decisiones futuras documentadas_ (Manuel, 2026-10-25; detalle en [roadmap.md](roadmap.md#después-de-half-life-1-decisiones-de-manuel-2026-10-25), [design.md](design.md#universo-half-life-para-toda-la-saga-decisión-de-manuel-2026-10-25) y [architecture.md](architecture.md#4-datos-y-contenido)): el universo Half-Life representará toda la saga al entrar Half-Life 2 y Alyx; juegos agrupados por bloques con títulos; apartado «Multijugador» para Half-Life 1; fase de recursos visuales (variantes original, HD oficial y de terceros); comportamiento de los NPC; fichas de creadores. Nada de esto está implementado.

     _Hecho:_ commit, PR #59 y merge (`2c10717`).

     **Entrada al universo Half-Life, adelantada (decisión de Manuel, 2026-10-25; rama `feature/half-life-universe-entry`):** antes de Half-Life 2 se rediseña `/universos/half-life` con tres etapas (GoldSrc, Source y Source 2) y dossiers por juego inspirados solo en los de `/muestra`. El resto de universos sigue para la reforma posterior.
     - _Revisado por Claude:_ capturas de `/universos/half-life` y `/muestra` a 1440 px; código de la página, de los dossiers de `/muestra` (no integrados en ninguna página real), `SectorSign` y `getSectionStatuses()`.
     - _Propuesta, aplicada en U3:_ ver [design.md](design.md#propuesta-para-la-entrada-al-universo-aplicada-en-u3-2026-10-26).
     - _U1 hecho (2026-10-25, Manuel los puntos 1–3 y Claude los 4–7 a petición suya):_ `UniverseStage` (`src/domain/universe-stage.ts`) y `src/data/universe-stages.ts` con GoldSrc (disponible), Source y Source 2 («En preparación», con `plannedGames` en texto); `Game.stageId` en Half-Life 1, Opposing Force y Blue Shift; `getStagesByUniverse()` y `getGamesByStage()`; descripción del universo con la Ciudad 17; 3 pruebas de integridad de las etapas. Comprobado: `npm run check` (37 pruebas) y la prueba falla si Blue Shift pierde su `stageId`. Codex confirmó fechas y cronología con half-life.com y Steam, y señaló que la prueba aceptaba nombres previstos vacíos (corregido).
     - _U1 publicado:_ PR #60 (Manuel).
     - _U2 hecho (Claude, rama `feature/half-life-universe-page`, sin commit):_ dirección con `frontend-design` y referencias de Combine OverWiki (Ciudad 17, Zona de Cuarentena, emblema de la Alianza). Muestra temporal en `/muestra/universo` (`src/app/muestra/universo/`), aprobada por Manuel como primera versión, a mejorar después; a petición suya, Source lleva la λ de la Resistencia y Source 2 el emblema de la Alianza. Detalle en [design.md](design.md#dirección-aprobada-en-u2-manuel-2026-10-25-primera-versión-a-mejorar). Comprobado: capturas a 1440 y 390 px sin scroll horizontal, contraste AA de los colores nuevos (mínimo 6,46:1) y clics reales (el cuerpo del dossier abre el hub; un apartado abre su categoría). Sin comprobar: recorrido con teclado y colores contra capturas del juego.
     - _U2 publicado:_ PR #61 (Manuel). U3 en la rama `feature/half-life-universe-page-u3`:
       - _U3a (Manuel con Claude, `5df6cc1`):_ `GameDossier` (`src/features/games/components`), `dossier-looks.ts` y su CSS (bloque `game-dossier`).
       - _U3b (Manuel con Claude, `d66be1e`):_ `UniverseStage` (`src/features/universes/components`, dossiers como `children`) y su CSS; el precinto de la Zona de Cuarentena pasa a `::after`; GoldSrc anuncia el multijugador en `plannedGames`.
       - _U3c (Claude, a petición de Manuel, sin commit):_ `/universos/[universeSlug]` con la entrada (título, presentación, λ e índice de etapas) y una `UniverseStage` por etapa; `DossierMotion` (entrada GSAP y Escape) y `SmoothScroll` (`src/components/ui`, Lenis con `anchors`, desactivado con movimiento reducido). Codex encontró que el `overflow: hidden` del dossier de Blue Shift recortaba el contorno de foco y los desplegables (corregido: la banda azul redondea sus esquinas). Comprobado: `npm run check` (37 pruebas), `npm run build` (198 páginas), capturas a 1440 y 390 px sin scroll horizontal, clics (dossier → hub, apartado → categoría), orden de tabulación (índice, «Abrir el dossier de…» y sus apartados), foco visible, Escape y el índice bajando con Lenis. Sin comprobar en navegador: movimiento reducido.
     - _U3d (Claude, sin commit):_ `src/data/decor-images.ts` con el emblema de la Alianza (fuente comprobada: 200); `getImageCredits()` devuelve `{ image, usedIn }` e incluye las imágenes decorativas, que salen en `/creditos`; las pruebas de imágenes de `data-integrity.test.ts` cubren también las decorativas. Borrada la muestra `/muestra/universo` (y `.next/dev`, con tipos antiguos que apuntaban a ella). Documentados design, roadmap, architecture y CHANGELOG. Codex (con `vercel-react-best-practices`) señaló que la prueba de créditos solo contaba imágenes: ahora comprueba cada imagen decorativa con su uso y que no se repitan. Comprobado: `npm run check` (38 pruebas), `npm run build` (197 páginas) y el emblema en `/creditos`.
     - _U3 publicado:_ commit, PR y merge (`e4bb818`), con mensaje propio mediante `--subject` y `--body-file`.
     - _`v0.2.0` publicada (2026-10-26)._

     **R: recursos visuales del bloque Half-Life 1 (en marcha desde el 2026-10-26, rama `feature/hl1-visual-resources`).** Decisiones de Manuel:
     - **Origen:** capturas propias de los modelos con su juego instalado (`H:\SteamLibrary\steamapps\common\Half-Life`: `valve` y `valve_hd`, `gearbox` y `gearbox_hd`, `bshift` y `bshift_hd`) y el visor gratuito Half-Life Asset Manager 3.0.0. Solo se hace con los juegos que lo permitan; las wikis quedan como alternativa.
     - **Sin fondo:** el visor captura con fondo transparente (`[Video] TransparentScreenshots=true`). Claude recorta con `sharp` (ya instalado con Next.js), coloca original y HD en el mismo lienzo y exporta WebP con transparencia. El fondo lo pone la web: el comparador tiene un foco de luz con los colores del tema.
     - **Piloto:** científico, guardia de seguridad, marine de la HECU, palanca y pistola de 9 mm, que existen en `valve` y `valve_hd`. Después, el resto de parejas HD y una imagen única para lo que no cambió con el HD Pack.
     - **Animaciones y comportamiento de los NPC:** después de las imágenes, con el mismo visor.
     - _R1 hecho (Claude, 2026-10-26, rama `feature/hl1-visual-resources-r1`, con permiso expreso de Manuel para ejecutar el visor):_ Claude maneja la versión portable de Half-Life Asset Manager (`--portable`, configuración escrita en su `.ini`) con PowerShell: abre el modelo, elige la secuencia, pausa en el fotograma 0, fija la cámara Arc Ball con valores exactos (campo de visión 30°) y captura con F10. Mismos valores para original y HD, así que la pareja coincide al deslizar el comparador. Personajes alineados por el origen del modelo; armas con el modelo del mundo (`w_`, sin manos: el `v_` HD añade la otra mano) y cada silueta centrada, porque el HD Pack cambió su origen. Secuencias: `idle1` (científico y guardia) y `standing_mp5` (marine: su `idle1` es otra animación en el HD). Datos con `halfLifeModelImages()` (`src/data/model-captures.ts`) en científicos, guardias, marine de la HECU, palanca y pistola de 9 mm; 10 WebP en `public/images/entries/`. `ImageCompare` gana el fondo de vitrina y un alto máximo (`max-height` + `object-fit: contain` en las dos imágenes). Scripts y capturas en bruto en `C:\Users\manue\Desktop\capturas-valvedex` (fuera del repositorio). Codex (con `vercel-react-best-practices`) no encontró errores; solo una línea desactualizada de `architecture.md` (corregida). Comprobado: `npm run check` (38 pruebas), `npm run build` (197 páginas) y el comparador en `/fichas/cientificos-de-black-mesa` y `/fichas/palanca` a 1440 y 390 px.
     - _Corrección (2026-10-26, a petición de Manuel):_ con imágenes transparentes, el original asomaba por las zonas vacías del HD (el pelo del científico y del guardia). `ImageCompare` recorta ahora también la imagen original por su lado (`clip-path`), así que cada versión solo se pinta en su mitad. Comprobado con el deslizador en «HD Pack»: no queda rastro del original.
     - _R2 hecho (Claude, 2026-10-27, rama `feature/hl1-visual-resources-r2`):_ 15 parejas más de Half-Life 1. Criaturas y personajes: zombi, houndeye, bullsquid, vortigaunt (`islave.mdl`) y G-Man. Armas (modelo `w_`): MP5, escopeta, ballesta, lanzacohetes, cañón tau, cañón de gluones, Hivehand, granada, carga de satchel y snark. La escopeta deja la imagen HD de la wiki (`spas-12-half-life.jpg`, borrada) por su pareja propia. Encuadre automático: el script lee la cámara que el visor calcula para el original y la aleja para el campo de visión de 30°, y aplica los mismos valores al HD (`hlam-pair.ps1`). La MP5 se captura desde arriba con giro de 180°, porque su modelo está orientado de otra forma; el bullsquid HD no muestra la cola en esa postura (diferencia real del modelo). Sin pareja HD de su modelo: el revólver .357 y la mina láser. Codex encontró dos textos alternativos con un nombre distinto al de la ficha (snark y carga de mochila) y una línea antigua sobre la imagen de la escopeta: corregidos. Comprobado: `npm run check` (38 pruebas), `npm run build` (197 páginas) y el comparador en `/fichas/g-man` y `/fichas/subfusil-mp5`.
     - _Nitidez (2026-10-27, a petición de Manuel):_ las 20 parejas se recapturan con los paneles del visor ocultos (`Asset > Show Edit Controls`), así que la vista 3D pasa de 708 a unos 960 px de alto y los modelos salen un 35–45 % más grandes; WebP sin pérdida (`lossless`); y `ImageCompare` pide calidad 100 con `sizes` (Next.js 16 solo admite calidad 75 por defecto: se añadió `images.qualities: [75, 100]` en `next.config.ts`). Codex desaconsejó `unoptimized`: servía las 40 imágenes enteras (3,6 MB) también en el móvil; con calidad 100 y `sizes` cada una pesa unos 58 KB a 640 px y se ve igual de nítida. El marine de la HECU se captura con giro de 120°: con 150° el arma le tapaba la cara en el original. El script restaura `AreEditControlsVisible=true` en el `.ini` antes de cada captura y captura desde `Video > Take Screenshot...`. Comprobado: `npm run check` (38 pruebas), `npm run build` y `/fichas/zombi` sirviendo `w=640&q=100` (58 KB).
     - **Punto de continuación (2026-10-27, al cerrar la sesión por falta de uso):**
       - _Objetivo de R2:_ dar al comparador original/HD todas las fichas de Half-Life 1 cuyo modelo cambió con el High Definition Pack, con capturas propias sin fondo, misma cámara en cada pareja y nitidez suficiente.
       - _Terminado y comprobado:_ 20 fichas de Half-Life 1 con su pareja (5 del piloto R1 y 15 de R2), recapturadas con la vista 3D ampliada y en WebP sin pérdida; el comparador recorta las dos imágenes por su lado, la bola va hacia la versión que se ve, pide calidad 100 con `sizes` y tiene fondo de vitrina; el marine de la HECU ya no tiene la cara tapada. Publicado en `main` (PR #65 a #69). Documentación de herramientas (PR #70) y `graphify-out/` en `.gitignore` (PR #71).
       - _Archivos tocados en R1–R2:_ `src/data/model-captures.ts`, `src/data/half-life-weapons.ts`, `src/data/half-life-enemies.ts`, `src/data/half-life-characters.ts`, `src/components/ui/image-compare.tsx` y su `.module.css`, `next.config.ts` (`images.qualities`), `public/images/entries/*.webp` (40 archivos; se borró `spas-12-half-life.jpg`), `docs/STATUS.md`, `docs/workflow.md`, `docs/architecture.md`, `CHANGELOG.md` y `.gitignore`.
       - _Pruebas:_ la última ejecución en `main` antes de este cambio pasó `npm run check` (lint, tipos, formato y 38 pruebas de Vitest) y `npm run build` (197 páginas). Este cambio solo toca este archivo; no se han vuelto a ejecutar.
       - _Falta:_ R3, las parejas HD de Opposing Force (`gearbox` y `gearbox_hd`) y Blue Shift (`bshift` y `bshift_hd`); imagen única para lo que no cambió con el HD Pack (headcrab, revólver .357, mina láser y el resto de criaturas y objetos); revisión con teclado y movimiento reducido del comparador; los scripts de captura viven fuera del repositorio, solo en el PC de sobremesa.
       - _Siguiente paso concreto:_ en una rama `feature/hl1-visual-resources-r3`, listar los modelos que existen en `gearbox` y `gearbox_hd` y cruzarlos con las fichas de `src/data/opposing-force.ts`, antes de capturar nada.
         **Half-Life: Decay (2026-10-28 y 2026-10-29).** Cuarto juego del universo Half-Life, añadido tras R2 por decisión de Manuel.
     - _Dossier y tema (2026-10-28, PR #74, #75 y #77):_ `main` queda en `6b4804e` con Decay como juego propio del bloque GoldSrc: hub, dossier, tema visual propio (PlayStation 2, 2001) y su tarjeta en `/universos/half-life`.
     - _Contenido (rama `feature/decay-content`, commits `8d88696`, `c2573c9` y `1c0a4fc`):_ un solo archivo `src/data/half-life-decay.ts` con tres exports, siguiendo el patrón de `opposing-force.ts`:
       - `halfLifeDecayChapters`: 10 fichas de mapa, las 9 misiones de la campaña y la extra Xen Attacks, con archivos de mapa, diseñadores y notas. Los nombres de mapa de las misiones sin página propia salen de SourceRuns (`kind: "community"`), como en Z3-1.
       - `halfLifeDecayCharacters`: 4 fichas (Gina Cross, Colette Green, Richard Keller y la pareja de vortigaunts X-8973 y R-4913), con afiliación, voz y notas de desarrollo.
       - `halfLifeDecayExtras`: 5 easter eggs y 11 curiosidades.
       - Lore de 8 párrafos en `src/data/game-lore.ts` (2 visibles y 6 con `spoiler: true`).
       - `src/data/expansion-appearances.ts`: lista `decay` con 29 fichas de Half-Life 1 que también aparecen en Decay, comprobadas una a una en la lista de apariciones de su página de Combine OverWiki. Quedan fuera el cañón tau, el cañón de gluones, la ballesta, el revólver .357, el barnacle, el ictiosaurio, la gonarca, la gargantúa, el tentáculo y la sanguijuela. Gordon Freeman y Kleiner solo se mencionan.
     - _Cifras:_ 170 fichas en total (141 anteriores + 29 apariciones compartidas); Decay tiene 30 fichas propias (10 mapas, 4 personajes, 11 curiosidades y 5 easter eggs) y 235 páginas estáticas.
     - _Comprobado:_ `npm run check` (38 pruebas) y `npm run build` (235 páginas); el hub de Decay muestra 10 mapas, 4 personajes, 11 curiosidades y 5 easter eggs, y `/fichas/palanca` y `/fichas/rosenberg` listan Half-Life: Decay.
     - _Publicación:_ contenido en la rama, **pendiente de PR y merge** al escribir esto.
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

Publicadas: **`v0.1.0`** (2026-10-23, esqueleto), **`v0.2.0`** (2026-10-26, bloque Half-Life 1) y **`v0.3.0`** (2026-11-05, bloque Valve, Steam y apertura de la etapa Source).

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

Comparte el repositorio o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `workflow.md`, `architecture.md`, `roadmap.md` y los archivos de código afectados.
