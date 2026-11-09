# Changelog

Este archivo recoge cambios relevantes completados. Las tareas futuras se encuentran en el [roadmap](docs/roadmap.md).

Seguimos la organización de [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), con apartados como Añadido, Cambiado y Corregido cuando tengan contenido.

## Sin publicar

### Añadido

- Páginas de apartado con cabecera compacta y fichas con imagen grande, datos y modelo 3D al pasar el ratón; la ficha de cada entrada tiene cabecera a sangre con su visor 3D o su imagen y un fondo teñido por ella.
- Icono de la pistola de Portal disparando un portal en la tarjeta de su universo.
- Hub de cada juego rehecho: cabecera cinematográfica con captura, iconos de línea y modelo 3D bajo demanda, cifras reales, apartados con miniatura de sus propias fichas y una tira con las capturas de los capítulos.
- Página de cada universo con la misma cabecera y tarjetas de etapa con sus años y número de juegos.
- Rediseño de `/universos`: tarjetas de acceso con la captura del juego, iconos de línea, inclinación y profundidad con el ratón, modelo 3D que gira al activarlas y un fondo de página que cambia con cada saga.
- Dossieres de Half-Life con arte propio: captura de fondo con parallax, iconos de línea que se dibujan y modelo 3D en los de Half-Life 2, Episode One y Episode Two.
- Niveles: cada capítulo muestra la lista de sus mapas y cada nivel tiene su página (`/fichas/<capítulo>/<mapa>`) con descripción, hueco para fotos, personajes, enemigos y armas, navegación entre niveles y fuentes. Los personajes, enemigos y armas de cada nivel se leen de la lista de entidades de los `.bsp` del juego instalado (`scripts/extract-level-entities.mjs`) para Half-Life 1, Opposing Force, Blue Shift, Half-Life 2 y sus episodios.
- Contenido con fuentes de Half-Life 2: Episode One, Episode Two y Half-Life: Alyx, y 34 fichas nuevas de Half-Life 2 (armas, 15 enemigos, personajes, curiosidades y easter eggs) con seis imágenes con licencia indicada.
- Renders propios de Half-Life 2 y sus episodios: 47 fichas (12 armas con visor 3D, enemigos, vehículos y personajes) con imágenes WebP y modelos `.glb`, generados con el nuevo conversor `scripts/source-mdl-to-glb.mjs`, que lee los modelos Source de los VPK del juego instalado (con los brazos bajados en los personajes humanos y los zombis con su headcrab). Sustituyen a cinco capturas de wiki.
- Capturas de Combine OverWiki (licencia Gamescreenshot) de los tres personajes de Half-Life: Decay.
- Cuatro capturas promocionales de Half-Life: Alyx (guantes de gravedad, soldado Combine, Russell y pistola), de su página en Steam.
- Capturas propias de 61 capítulos de Half-Life 1, Opposing Force, Blue Shift, Half-Life 2 y sus episodios, hechas con el juego instalado desde el punto de aparición del jugador.
- Despliegue en Render: staging al llegar a `main` y producción al crear un tag, con aprobación manual y comprobación posterior (`docs/deploy.md`).

### Cambiado

- Gordon Freeman, el G-Man, Barney Calhoun, Eli Vance e Isaac Kleiner tienen una ficha propia en Half-Life 2 (otros modelos) enlazada con la de Half-Life 1 mediante «Otra versión del personaje».

### Corregido

- Mapas de los capítulos de Half-Life 2, Opposing Force y las expansiones contrastados con los archivos del juego (mapas inexistentes quitados, los que faltaban añadidos).
- Spoilers en resúmenes de Half-Life 2; personajes y armas de Team Fortress 2 ya no se atribuyen a Team Fortress Classic; No Mercy de Left 4 Dead y de Left 4 Dead 2 separados; fuentes de Left 4 Dead sobre su propia wiki.

## [0.3.0] — 2026-11-05

Tercera versión: el **bloque Valve, Steam y apertura de la etapa Source**. Incluye la sección de hardware de Valve, figuras clave de la compañía, rediseño histórico de Steam, contenido verificado de Half-Life 2, Team Fortress y Left 4 Dead, suite de 100 pruebas unitarias con cobertura del 100% en selectores y dominio, e integración continua de calidad con SonarCloud y Docker Hub.

### Añadido

- Suite ampliada a 100 pruebas unitarias con Vitest cubriendo al 100% la lógica de selectores de catálogo, universos, juegos, dominio y Valve.
- Sección de hardware de Valve en `/valve/hardware` con 7 dispositivos históricos documentados con especificaciones técnicas y fuentes oficiales (Steam Controller, Steam Link, Steam Machines, HTC Vive, Valve Index, Steam Deck y Steam Deck OLED).
- Ampliación de figuras clave de Valve en `/valve/personas` con Marc Laidlaw, Robin Walker, Kim Swift, Erik Johnson y Chet Faliszek con fuentes verificadas.
- Contenido verificado de Half-Life 2 con fuentes de Combine OverWiki: 14 capítulos con sus archivos de mapa, 9 armas icónicas con ranura y munición, personajes, enemigos y curiosidades.
- Lore con control de spoilers completado para todos los juegos del catálogo (Half-Life 2 y episodios, Alyx, Team Fortress Classic y 2, Left 4 Dead 1 y 2).
- Fichas iniciales de Team Fortress (las 9 clases de mercenarios, armas reglamentarias y mapas clásicos) y Left 4 Dead (los 8 supervivientes, infectados especiales y campaña No Mercy).
- Página de Steam rediseñada por épocas (orígenes, plataforma y cliente unificado), cada una con su aspecto, con los hechos y sus fuentes; la historia de Valve muestra la fecha de cada hito.
- Movimiento de la portada con GSAP y Lenis: entrada, cifras que cuentan, válvula que gira con el scroll y la historia de Valve fijada mientras avanza su línea de producción (con movimiento reducido y en móvil, sin animación fija).
- Portada rediseñada: fondo industrial, cifras con el número de juegos, catálogo de juegos por saga, historia de Valve como línea de producción y avance de las épocas de Steam.
- Historia de Valve ampliada a 11 hitos con fecha y fuente (1996–2023) y datos de las tres épocas de Steam (`src/data/steam-eras.ts`), también en `/creditos`.
- Half-Life: Decay como cuarto juego del universo Half-Life: hub, dossier y tema visual propio (PlayStation 2, 2001) en `/universos/half-life`.
- Contenido de Half-Life: Decay: 10 fichas de mapa, 4 personajes, lore en 8 párrafos con los 6 últimos tras el botón de spoilers, 5 easter eggs, 11 curiosidades y 29 apariciones compartidas.
- Informe de cobertura LCOV de Vitest integrado en el análisis de SonarCloud.
- Análisis de calidad y seguridad con SonarCloud en cada PR y en cada push a `main`.
- La imagen de Docker se publica en Docker Hub al fusionar en `main` y al crear un tag de versión.
- ValveDex se puede construir y ejecutar con Docker (`docker compose up --build`); el CI comprueba que la imagen se construye.
- Integración continua con GitHub Actions: lint, tipos, formato, pruebas y build en cada PR.
- Opposing Force: los marines aliados pasan a personajes en cuatro clases con su modelo y versión HD; Blue Shift: imágenes de Rosenberg, Simmons y Walter Bennet.
- Imágenes de Opposing Force: 9 armas (también en 3D), 6 criaturas, Otis, el instructor Barnes y las parejas original/HD del asesino y del apoyo de la HECU.
- Las armas de Half-Life 1 se pueden girar en 3D desde su ficha («Ver en 3D»), comparando el modelo original y el del HD Pack con el mismo deslizador.
- Primeras imágenes propias (fase R): modelos capturados del juego con fondo transparente y visor comparador original/HD.

### Cambiado

- Las tarjetas y los dossiers de Team Fortress y Left 4 Dead llevan sus emblemas oficiales integrados, y la cabecera de las tarjetas de universo vuelve a tener formato.
- Las imágenes de Half-Life 1 se rehacen desde los modelos 3D, con mejor luz; el visor 3D mantiene el arma centrada al girarla.
- Nuevos dossiers de Half-Life: Decay, Half-Life 2, Episode One y Episode Two en el universo Half-Life, cada uno con su material propio, y la misma paleta en su hub, apartados y fichas.

### Corregido

- Limpieza de avisos de calidad en React: sustituidas claves de índice por identificadores estables en `Breadcrumb` y en el lector de lore; eliminado comentario duplicado en `GameDossier`.
- Exclusiones de cobertura alineadas en SonarCloud (`sonar.coverage.exclusions`) y Vitest para centrar el informe en la lógica de negocio y utilidades del proyecto.
- Navegación por teclado en la portada: enfocar la línea de producción o cualquiera de sus estaciones con Tab alinea el scroll vertical con el pin de animación.
- Textos nuevos de Valve y Steam pulidos con criterios enciclopédicos (antislop): precisión factual en acuerdos con terceros, eliminación de coloquialismos y fechas estandarizadas.
- Las páginas de juego y de apartado de Decay, Half-Life 2, Episode One y Episode Two ya no muestran la columna con un color y los laterales con otro: el tema de cada juego se define en un solo sitio.
- Retiradas las fichas y el lore de Half-Life 2 y Episode Two (y el lore de Episode One), que tenían datos sin fuente y spoilers visibles; se rehará con fuentes.
- Las imágenes del comparador se ven más nítidas: capturas más grandes, sin pérdida y servidas sin recomprimir. Al marine de la HECU original ya no le tapa la cara el arma.
- El comparador original/HD dejaba ver el original a través de las zonas transparentes de la imagen HD; ahora cada versión solo se pinta en su lado.
- En el comparador, llevar el control hacia una etiqueta muestra ahora esa versión (antes mostraba la contraria).

## [0.2.0] — 2026-10-26

Segunda versión: el **bloque Half-Life 1** completo (Half-Life 1, Opposing Force y Blue Shift) con contenido real y fuentes, el primer diseño de ValveDex y la entrada al universo Half-Life por etapas. El diseño es provisional y se irá mejorando; las imágenes llegan en la fase de recursos visuales.

### Añadido

- Opposing Force: los marines aliados pasan a personajes en cuatro clases (soldados, ametralladores, médicos e ingenieros) con su modelo y versión HD; Blue Shift: imágenes de Rosenberg, Simmons y Walter Bennet.
- Entrada al universo Half-Life por etapas (U1–U3): GoldSrc (Half-Life 1, Opposing Force y Blue Shift, más el multijugador anunciado), Source (Half-Life 2 y sus episodios) y Source 2 (Half-Life: Alyx), estas dos en preparación. Cada juego tiene un dossier que abre su hub y enlaza a sus apartados con desplegables; Source lleva la λ de la Resistencia y Source 2 el emblema de la Alianza (acreditado en `/creditos`). Entrada de los dossiers con GSAP y scroll suave con Lenis, desactivados con movimiento reducido. Diseño provisional, aprobado como primera versión.
- Muestra visual D1b en `/muestra` (no indexada): cabecera de Valve con la válvula animada y tres expedientes (Half-Life, Opposing Force y Blue Shift) con sus apartados, ficha técnica, sellos y una ficha desplegable con las primeras fichas de cada apartado. Aprobada por Manuel como primera referencia estética.
- Paleta y fuentes de Valve en toda la web (D2a): casi negro, blanco cálido y rojo solo en la válvula y la acción principal; Archivo e IBM Plex Mono en lugar de Geist; colores de sector globales (`--sector-*`).
- Temas de Half-Life (D2b), oscuros para enlazar con la cabecera y el pie negros: Half-Life en carbón cálido con texto de papel y el naranja del HUD; Opposing Force en lona oliva con verde ácido y títulos en mayúsculas; Blue Shift en el marino del uniforme con el azul del HUD. Barlow y Barlow Condensed en todo el universo Half-Life.
- Half-Life 1, capítulos (Z3-1): las 20 fichas de capítulo con archivos de mapa, diseñadores y curiosidades del desarrollo con fuentes, en el orden del juego.
- Half-Life 1, armas (Z3-2): las 14 armas con ranura, munición máxima, daño por dificultad y curiosidades del desarrollo y del speedrun, con fuentes del SDK de Valve, `skill.cfg`, Combine OverWiki y SourceRuns; las fuentes de comunidad se marcan en la ficha.
- Half-Life 1, enemigos (Z3-3): 22 enemigos con origen, salud por dificultad y curiosidades del desarrollo, con fuentes de `skill.cfg`, el SDK de Valve y Combine OverWiki.
- Half-Life 1, personajes (Z3-4): 7 personajes con afiliación, voz, diseño y curiosidades del desarrollo, sin spoilers.
- Half-Life 1, lore (Z3-5): la historia completa, con la premisa visible y el resto oculto tras el botón de spoilers.
- Half-Life 1, easter eggs y curiosidades (Z3-6): 9 easter eggs y 10 curiosidades del desarrollo, las versiones y la recepción del juego.
- Opposing Force y Blue Shift (Z4): capítulos, armas y enemigos nuevos de Opposing Force, personajes, curiosidades y lore completo de las dos expansiones, y las apariciones en ellas de las fichas de Half-Life 1.
- Componentes compartidos (D2c): ruta de navegación (`Breadcrumb`) en todas las páginas interiores, cabecera de expediente (`DossierHeader`) en el hub, los apartados y las fichas (el ID de cada ficha se muestra como número de registro) y señal de sector (`SectorSign`) con desplegable en el hub. El primer juego se muestra como «Half-Life 1».
- Rediseño de las páginas de Valve: portada con la válvula, secciones numeradas con tubería y ficha técnica; línea de tiempo como línea de producción; `/universos` como acreditaciones de acceso; `/explorar` con índice de sectores y fichas con su color; páginas de Valve, créditos y 404 con el mismo lenguaje.
- Dependencias de diseño: `gsap` y `@gsap/react` (giro de la válvula y entrada de los expedientes) y `lenis` (scroll suave), usadas en la muestra `/muestra` y en la página del universo.

## [0.1.0] — 2026-10-23

Primera versión: el **esqueleto** completo. Todas las rutas y piezas existen, funcionan con datos de muestra y tienen pruebas. El diseño visual y el contenido completo llegan en las fases siguientes.

### Seguridad

- 2026-10-22: Next.js actualizado de 16.4.0 a 16.4.2 y `experimental.agentUpgrade` configurado como `"security"`, conservando las demás opciones. Verificados lint, tipos, formato, 26 pruebas, compilación y respuestas HTTP de producción.

### Añadido

- Opposing Force: los marines aliados pasan a personajes en cuatro clases (soldados, ametralladores, médicos e ingenieros) con su modelo y versión HD; Blue Shift: imágenes de Rosenberg, Simmons y Walter Bennet.
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

- Las imágenes de Half-Life 1 se rehacen desde los modelos 3D, con mejor luz; el visor 3D mantiene el arma centrada al girarla.
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
