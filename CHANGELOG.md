# Changelog

Este archivo recoge cambios relevantes completados. Las tareas futuras se encuentran en el [roadmap](docs/roadmap.md).

Seguimos la organización de [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), con apartados como Añadido, Cambiado y Corregido cuando tengan contenido.

## Sin publicar

Nada todavía.

## [0.1.0] — 2026-10-23

Primera versión: el **esqueleto** completo. Todas las rutas y piezas existen, funcionan con datos de muestra y tienen pruebas. El diseño visual y el contenido completo llegan en las fases siguientes.

### Seguridad

- 2026-10-22: Next.js actualizado de 16.4.0 a 16.4.2 y `experimental.agentUpgrade` configurado como `"security"`, conservando las demás opciones. Verificados lint, tipos, formato, 26 pruebas, compilación y respuestas HTTP de producción.

### Añadido

- 2026-10-23: proyectos cancelados como juegos con `status: "cancelled"` y su propio hub (apartados, lore y fichas como cualquier juego); el hub del juego base los lista y el del cancelado enlaza a su juego base. Primer proyecto: Half-Life para Dreamcast (PR #38).
- 2026-10-22: mods como juegos con `baseGameId` y su propio hub; `/universos` y la página del universo solo muestran juegos oficiales y el hub de cada juego lista sus mods. Primer mod: Sven Co-op (PR #36).
- 2026-10-22: campos propios por categoría: `Entry` es una unión discriminada por `category` (ranura y munición de las armas, capítulo de los mapas, afiliación de los personajes, origen de los enemigos) y la ficha muestra la sección «Datos» con `getEntryFacts()` (PR #34).
- 2026-10-22: página `/creditos` generada desde los datos, con las fuentes agrupadas por URL y dónde se usa cada una, y las imágenes con su crédito y licencia; enlazada desde el pie (PR #33).
- 2026-10-21: configuración de Claude Code del proyecto (`.claude/settings.json`): solo quedan activos los plugins compatibles con el aprendizaje guiado y la convención del proyecto; `.claude/settings.local.json` queda fuera de Git (PR #31).
- 2026-10-19: sección Valve: `/valve/historia` con la cronología completa, `/valve/personas/[personSlug]` con los dos fundadores y `/valve/steam`; la portada muestra los 3 últimos hitos y enlaza a las tres páginas; pruebas de integridad de hitos y personas (PR #29).
- 2026-10-14: página `/explorar` con una fila horizontal por categoría (`EntryRow`, `EntryCard`) y página `/explorar/[categorySlug]` con todas las fichas de cada categoría («Ver todo»); el enlace «Explorar» de la cabecera ya no da 404 (PR #28).
- 2026-10-14: pruebas de integridad de las relaciones (fichas existentes, sin autorrelaciones ni duplicados); etiquetas de relación sin género fijo («Usuarios», «Equipo», «Ubicaciones», «Presentes aquí»).
- 2026-10-14: relaciones entre fichas (`EntryRelation`, `getRelatedEntries()`) y bloque «Relacionado» en la ficha, en las dos direcciones; primeras relaciones: palanca → Gordon Freeman y Gordon Freeman → Black Mesa Inbound (PR #26).
- 2026-10-13: lore de Half-Life, Opposing Force y Blue Shift (`GameLore`, `getGameLore()`), con su página de apartado, la tarjeta «Lore» del hub como «Disponible» y dos pruebas de integridad (PR #24).
- 2026-10-13: fichas de muestra en todas las categorías (mapa, personaje, enemigo, curiosidad y easter egg) con apariciones en Opposing Force y Blue Shift (PR #23).
- 2026-10-12: pruebas de integridad de datos con Vitest (IDs y slugs únicos, referencias entre universos, juegos y fichas, fuentes e imágenes); `npm run check` las ejecuta (PR #21).
- 2026-10-12: comparador de imágenes original/HD (`ImageCompare`) en las fichas; las apariciones guardan `images.original` e `images.hd` (PR #20).
- 2026-10-12: imágenes por juego en las fichas (`MediaAsset`, `next/image`), con fuente, crédito y licencia; primera imagen: escopeta de Half-Life (PR #17 y #18).
- 2026-10-12: página 404 propia con enlaces a Inicio y Universos (PR #15).
- 2026-10-12: fichas (`Entry`) con las cuatro primeras armas de Half-Life, página de apartado `/universos/[universeSlug]/[gameSlug]/[sectionSlug]` y página de ficha `/fichas/[entrySlug]` con el tema del juego, «Aparece en» y fuentes. PR #14.
- 2026-10-12: README actualizado con el recorrido por niveles, los temas, el universo Half-Life completo, los proyectos cancelados y los mods famosos.
- 2026-10-11: tema visual propio por juego (Opposing Force y Blue Shift) mediante `GameTheme` (PR #11).
- 2026-10-11: hub de juego `/universos/[universeSlug]/[gameSlug]` con cabecera, fuentes y apartados «Próximamente»; los juegos de la página del universo enlazan a su hub. Incluye los tipos y datos de los apartados, `getGameBySlug()` y `getGameSections()`. PR #11.
- 2026-10-11: página `/universos/[universeSlug]` con la lista de juegos, 404 para universos inexistentes o «Próximamente» y tema visual de Half-Life mediante variables CSS (PR #10).
- 2026-10-10: tipos `Universe` y `Game`, datos de cinco universos y de los tres juegos de Half-Life, funciones de lectura, `UniverseCard` y página `/universos` (PR #9).
- 2026-10-09: sección «Historia de Valve» en la portada: tipos `Source` y `Milestone`, cinco hitos con fuentes, `getValveMilestones()` y componente reutilizable `Timeline` (PR #8).
- 2026-10-08: cabecera, pie y portada v1 sobre Valve y Steam (PR #3–#6).
- 2026-10-07: aplicación inicializada con Next.js 16.4.0, React 19.3.0, TypeScript estricto, Tailwind CSS 4, ESLint, Prettier y scripts `lint`, `typecheck`, `format:check` y `check`.
- 2026-10-07: CLAUDE.md y docs/STATUS.md incorporados al repositorio para compartir reglas y estado entre Claude, ChatGPT y Codex.
- Documentación inicial: README, instrucciones para agentes, arquitectura, changelog y roadmap.
- Definición del alcance inicial de Half-Life, Opposing Force y Blue Shift.
- Decisiones de organización por funcionalidades y criterios de aceptación para las primeras entregas.

### Cambiado

- 2026-10-23: `Game` es una unión discriminada por `status` (`released` con `releaseYear` o `cancelled` con `cancelledYear`); `getGameYearLabel()` muestra «1998» o «Cancelado en 2001» (PR #38).
- 2026-10-13: `vitest.config.ts` renombrado a `vitest.config.mts` para que Vite lo cargue como ESM y desaparezca su aviso.
- 2026-10-12: cada ficha guarda sus apariciones por juego (`appearances`) en lugar de `gameIds`, para tener resumen, imagen y, más adelante, estadísticas propias de cada juego (PR #16).
- 2026-10-07: nueva estructura del producto documentada: portada sobre Valve y Steam, sección Universos con paleta propia por saga y hub por juego (lore, mapas, armas, personajes, curiosidades, easter eggs), más un hub principal `/explorar` con buscador global y carruseles por categoría. Actualizados AGENTS, arquitectura y roadmap.
- 2026-10-07: actualizado el protocolo de continuidad y el alcance global de todos los juegos de Valve, conservando la primera fase de Half-Life y sus expansiones. Documentado que el repositorio actual solo tiene el README y falta inicializar la aplicación.
- 2026-10-01: documentada la convención BEM para las clases de CSS propias, su uso en React con CSS Modules y su convivencia con Tailwind. Actualizados README, instrucciones para agentes, arquitectura y roadmap. La aplicación de estilos en la web sigue pendiente.

### Corregido

- 2026-10-23: `<h3>` duplicado dentro del título de cada juego en la página del universo (PR #38).
- 2026-10-12: imágenes de las fichas (faltaba el archivo y había datos copiados de la escopeta en otras armas), nombre y enlace de las fichas en la página de apartado y fuentes que apuntaban a una página de desambiguación (PR #18).
- 2026-10-11: la clase del estado vacío de la página de universo (`universe-page-empty` → `universe-page__empty`) no existía en el CSS Module.
- 2026-10-08: `next.config.ts` aplicaba el loader de Tailwind a todos los `.css` y anulaba CSS Modules; la regla se limita a `globals.css` (PR #7).

## Publicaciones

Al publicar una versión, los cambios de «Sin publicar» se mueven a una sección con su número y su fecha (`AAAA-MM-DD`), que coincide con el tag de Git y la GitHub Release. No se copia cada commit ni se registran funciones planificadas como terminadas.

- `v0.1.0` (2026-10-23): esqueleto completo.
