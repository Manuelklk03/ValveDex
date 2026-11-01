# Arquitectura de ValveDex

Fecha de la decisión inicial: **2026-09-30**.

Última actualización: **2026-10-19**: sección Valve (`/valve/historia`, `/valve/personas/[personSlug]`, `/valve/steam`, tipo `ValvePerson`); `/explorar` básico con filas por categoría y `/explorar/[categorySlug]`; relaciones entre fichas (`EntryRelation`); lore por juego (`GameLore`); comparador de imágenes original/HD, pruebas de integridad con Vitest y orden «esqueleto antes que contenido».

Estado: **aplicación Next.js inicializada.** Existen `src/app`, `src/components/layout`, `src/components/ui`, `src/domain`, `src/data`, `src/features/valve`, `src/features/universes`, `src/features/games` y `src/features/catalog` (con `components/`). Rutas existentes: `/`, `/universos`, `/universos/[universeSlug]`, `/universos/[universeSlug]/[gameSlug]`, `/universos/[universeSlug]/[gameSlug]/[sectionSlug]`, `/fichas/[entrySlug]`, `/explorar`, `/explorar/[categorySlug]`, `/valve/historia`, `/valve/personas/[personSlug]` y `/valve/steam`. Funcionalidad `src/features/games` para el hub de juego. Pruebas de integridad en `src/data/data-integrity.test.ts` (Vitest, configuración en `vitest.config.mts`). Este documento evolucionará con el código. Las rutas y carpetas descritas son objetivos, no evidencia de que ya existan. El estado actualizado se mantiene en [STATUS.md](STATUS.md).

## 1. Enfoque

El producto cubrirá progresivamente Valve y todo su catálogo de juegos. La navegación tiene tres niveles:

1. **Portada (Valve):** la empresa, Steam, su historia y otros datos generales de Valve. Paleta oscura de estilo Valve.
2. **Universos:** todas las sagas de Valve (Half-Life, Portal, Team Fortress, Counter-Strike, Left 4 Dead, etc.), cada una con los videojuegos que la forman. Al entrar en un universo, la paleta de colores cambia a la de esa saga.
3. **Hub de videojuego:** dentro de cada juego, apartados como lore, mapas, armas, personajes, enemigos, curiosidades y easter eggs.

La lista de universos y juegos se construirá con datos verificados; un universo sin contenido aún podrá mostrarse como «próximamente». El contenido de la primera entrega se centra en el universo Half-Life con Half-Life, Opposing Force y Blue Shift; Half-Life 2, Ricochet y los demás títulos se incorporarán después.

Una aplicación Next.js organizada por funcionalidades: universos, catálogo, favoritos y comparador. Cada módulo agrupa sus componentes y lógica; las páginas los combinan. Es una convención propia compatible con Next.js, no una estructura obligatoria del framework.

Buscamos responsabilidades claras, tipos explícitos, comprobaciones reproducibles y facilidad para ampliar el contenido. La prioridad de aprendizaje es el frontend React. El backend se incorporará después de completar un recorrido útil de consulta.

## 2. Responsabilidades

| Ruta prevista              | Responsabilidad                                                           |
| -------------------------- | ------------------------------------------------------------------------- |
| `src/app/`                 | Rutas, composición de páginas, layouts y metadatos                        |
| `src/features/valve/`      | Lectura del contenido sobre Valve (hitos y personas)                      |
| `src/features/games/`      | Hub de juego: apartados (`getGameSections`) y, más adelante, su contenido |
| `src/features/universes/`  | Lectura de universos y juegos, tarjetas y tema visual por universo        |
| `src/features/catalog/`    | Tarjetas, fichas, búsqueda, filtros y lectura del catálogo                |
| `src/features/favorites/`  | Estado y persistencia de favoritos, cuando se implemente                  |
| `src/features/comparison/` | Selección y comparación de armas, cuando se implemente                    |
| `src/components/ui/`       | Presentación reutilizable sin lógica de funcionalidad: `Timeline`         |
| `src/components/layout/`   | Cabecera, navegación y pie comunes                                        |
| `src/domain/`              | Tipos y reglas compartidas de juegos, fichas y fuentes, sin React         |
| `src/lib/`                 | Utilidades técnicas compartidas con una finalidad concreta                |
| `src/data/`                | Catálogo local inicial y referencias de contenido                         |
| `public/`                  | Recursos estáticos que se puedan publicar                                 |
| `tests/e2e/`               | Recorridos de usuario en navegador                                        |
| `.github/workflows/`       | Comprobaciones automáticas, cuando se configuren                          |
| `docs/`                    | Arquitectura, planificación y estado de continuidad                       |

Dentro de una funcionalidad se crearán `components/`, `hooks/`, `utils/` o `server/` según haga falta. Los tests unitarios se colocarán junto al código que prueban. No se crearán directorios vacíos por completar el esquema.

El CSS propio de un componente estará junto a su archivo TSX: por ejemplo, `entry-card.tsx` y `entry-card.module.css` dentro de `src/features/catalog/components/`.

### Reglas de dependencia

- `app` puede componer funcionalidades y componentes comunes.
- Las funcionalidades pueden usar los tipos de dominio, componentes comunes y utilidades técnicas.
- El código común no depende de una funcionalidad concreta.
- Los tipos de dominio no dependen de React, Next.js ni de una base de datos.
- La coordinación entre favoritos y catálogo se hará mediante IDs, props o una interfaz pública pequeña, sin importar detalles internos de almacenamiento.
- El acceso al catálogo local queda concentrado en funciones de lectura del módulo de catálogo. Las páginas y componentes visuales no importan directamente todos los archivos de datos.

## 3. Rutas iniciales

| URL prevista                                     | Función                                                      |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `/`                                              | Portada sobre Valve: empresa, Steam e historia               |
| `/universos`                                     | Todos los universos de Valve                                 |
| `/universos/[universeSlug]`                      | Universo con su paleta y la lista de sus videojuegos         |
| `/universos/[universeSlug]/[gameSlug]`           | Hub del juego: acceso a lore, mapas, armas, personajes…      |
| `/universos/[universeSlug]/[gameSlug]/[section]` | Apartado del hub (por ejemplo `armas` o `easter-eggs`)       |
| `/fichas/[slug]`                                 | Ficha canónica y apariciones en los juegos                   |
| `/explorar`                                      | Hub principal: buscador global y carruseles por categoría    |
| `/explorar/[categorySlug]`                       | Listado completo de una categoría («Ver todo»)               |
| `/valve/historia`                                | Cronología completa de Valve (la portada muestra un resumen) |
| `/valve/personas/[personSlug]`                   | Ficha de una persona de Valve (por ejemplo, Gabe Newell)     |
| `/valve/steam`                                   | Historia y funciones de Steam                                |
| `/creditos`                                      | Todas las fuentes e imágenes, generadas desde los datos      |
| `/favoritos`                                     | Fichas guardadas en este navegador                           |
| `/comparador`                                    | Comparación de armas compatibles                             |

Los segmentos visibles de la URL van en español (`universos`, `armas`); los nombres de parámetros en código, en inglés (`universeSlug`, `gameSlug`). Los apartados del hub serán una lista cerrada y validada; un apartado sin contenido no se enlazará o mostrará un estado vacío.

### Hub principal `/explorar`

Es el punto de búsqueda de todo el contenido, con independencia del universo. Arriba tiene un buscador global y debajo una fila con carrusel horizontal por categoría (armas, mapas, personajes, enemigos…) que mezcla fichas de todos los juegos.

- Al buscar, cada carrusel muestra solo las coincidencias de su categoría y las filas vacías se ocultan; si no hay ninguna coincidencia, se muestra un estado «sin resultados».
- Cada fila tiene un enlace «Ver todo» que abre el listado completo de esa categoría en su propia ruta estática, `/explorar/[categorySlug]` (por ejemplo, `/explorar/armas`). Los filtros de la Entrega 2 se añadirán como parámetros de búsqueda sobre esa página.
- Implementado sin buscador (PR #28): `EntryRow` (fila con `scroll-snap`, sin JavaScript) y `EntryCard` (tarjeta clicable entera) viven en `src/features/catalog/components`; `getEntriesByCategory()` reúne las fichas de todos los juegos.
- El carrusel será un `<ul>` con desplazamiento horizontal y `scroll-snap` en CSS, utilizable con rueda, gesto táctil y teclado. Los botones anterior/siguiente serán un componente de cliente pequeño. No se añadirá una librería de sliders.
- Los resultados filtrados son datos derivados del texto buscado y del catálogo; no se copian a otro estado.

Los filtros públicos se representarán en parámetros como `q`, `game`, `category` y `sort`. Se validarán los valores, se definirán valores por defecto y se mantendrá el funcionamiento del botón Atrás. Un slug inexistente mostrará una página 404.

## 4. Datos y contenido

El diseño inicial contempla estas entidades; sus tipos exactos se escribirán al implementar el catálogo:

| Entidad           | Datos principales                                                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Universe`        | ID, slug, nombre, descripción y estado (`available`/`coming-soon`); implementado. Tema visual pendiente                                                                                                               |
| `Game`            | ID, slug, `universeId`, nombre, desarrollador, descripción, `baseGameId?` y fuentes, más `status` (`released` con `releaseYear` o `cancelled` con `cancelledYear`); implementado. Recursos visuales pendientes        |
| `Entry`           | ID, slug único, nombre, categoría, resumen común, `appearances` y fuentes, más `details` propios de armas, mapas, personajes y enemigos (unión discriminada por `category`); implementado                             |
| `EntryAppearance` | `gameId`, resumen propio e `images` (`EntryImages`: `original?` y `hd?`) de una ficha en ese juego; implementado. Estadísticas por juego pendientes                                                                   |
| `EntryRelation`   | `fromId`, `toId` y `type` (`used-by`, `found-in`); implementado en `src/domain/entry-relation.ts`, datos en `src/data/entry-relations.ts`. Se guarda una vez y se muestra en las dos fichas con `getRelatedEntries()` |
| `Source`          | URL, título y `kind` (`official`, `wiki` o `community`; la ficha marca «(comunidad)»), implementado; fecha de consulta pendiente                                                                                      |
| `Milestone`       | ID, año, título, descripción y fuentes (implementado)                                                                                                                                                                 |
| `MediaAsset`      | `src`, `alt`, `width`, `height`, fuente, crédito y licencia; implementado en `src/domain/media-asset.ts`                                                                                                              |
| `GameLore`        | `gameId`, `paragraphs` (`LoreParagraph`: `text` y `spoiler?`; la página oculta los spoilers tras un `<details>`) y fuentes; implementado                                                                              |

Cuando una aparición tiene imagen original y HD, la ficha las muestra con `ImageCompare` (`src/components/ui`), el único componente de cliente del catálogo: guarda la posición del deslizador en estado local (`useState`) y recibe ambas imágenes por props. Las dos deben medir lo mismo (lo comprueba una prueba). Las imágenes son capturas propias de los modelos del juego, recortadas y sin fondo (WebP con transparencia), con la misma cámara para el original y el HD; `halfLifeModelImages()` (`src/data/model-captures.ts`) les da ruta, texto alternativo, fuente y crédito. El fondo lo pone `ImageCompare` (vitrina con los colores del tema). Desde R1 (2026-10-26) lo usan cinco fichas; el resto llega en las tandas siguientes.

`Entry` se modelará mediante variantes discriminadas por categoría: arma, personaje, enemigo, objeto, localización, mapa, capítulo, facción, curiosidad o easter egg. Los apartados del hub de un juego son vistas de estas fichas filtradas por categoría y juego; el lore es texto propio de cada juego (`GameLore`), no una ficha. La ruta `[sectionSlug]` sirve ambos casos: `getSectionPageData()` devuelve una unión discriminada por `kind` (`"lore"` o `"entries"`) y la página pinta el bloque que corresponde. Cada variante tendrá los campos que necesita; evitaremos un objeto con decenas de propiedades opcionales sin relación.

Los IDs serán estables y diferentes de los nombres visibles. Una ficha compartida conservará su ID en los tres juegos. Las estadísticas deberán indicar juego, versión, dificultad y unidad cuando afecten al valor. «Desconocido» no significa cero. La comparación solo mostrará medidas equivalentes.

Primer caso implementado: `src/data/valve-milestones.ts` contiene los hitos de Valve; `getValveMilestones()` (`src/features/valve`) devuelve una copia ordenada por año, y la página la pasa por props al componente común `Timeline`, que solo depende del tipo `Milestone`. La portada es un resumen: `getLatestValveMilestones(count)` le da los últimos hitos y `/valve/historia` muestra todos. Las personas de Valve tienen su propio tipo (`ValvePerson`: `id`, `slug`, `name`, `role`, `summary`, `sources`), porque no son fichas de juego, y su ruta `/valve/personas/[personSlug]`. Las tres páginas de `/valve` comparten el bloque BEM `valve-page` (`src/app/valve/valve-page.module.css`); un archivo que no se llama `page.tsx` no crea ruta, así que puede vivir en `src/app`.

La relación universo–juego vive solo en `Game.universeId`: `Universe` no guarda la lista de sus juegos, porque dos copias de la misma relación podrían contradecirse. `src/features/universes/get-universes.ts` expone `getUniverses()`, `getUniverseBySlug(slug)` (devuelve `undefined` si no existe, para responder con 404) y `getGamesByUniverse(universeId)`. El `id` es único en todo el proyecto; el `slug` de un juego solo tiene que ser único dentro de su universo (`/universos/half-life/opposing-force`).

Los apartados del hub son una lista cerrada: `GameSectionId` (`src/domain/game-section.ts`) con `id` en inglés y `slug` en español para la URL (`armas`, `easter-eggs`), definidos una sola vez en `src/data/game-sections.ts` y comunes a todos los juegos. `getGameBySlug(universeId, gameSlug)` comprueba ambos campos, porque el slug de un juego solo es único dentro de su universo. La página del hub genera sus rutas con `generateStaticParams` anidado (`flatMap` sobre los universos disponibles y sus juegos). Un apartado sin contenido se muestra como «Próximamente» y no se enlaza.

Las fichas (`src/domain/entry.ts`) usan `EntryCategory = Exclude<GameSectionId, "lore">`: el lore no tiene fichas. El type guard `isEntryCategory()` permite pasar el `id` de un apartado a las funciones del catálogo. Una ficha es **una sola** aunque aparezca en varios juegos (decisión de Manuel del 2026-10-12, «opción B»). Guarda lo común (`summary`, fuentes) y una `EntryAppearance` por juego con lo propio de esa versión: resumen, imagen y, más adelante, estadísticas. Por ejemplo, la escopeta de Half-Life y la de Half-Life 2 son la misma ficha con dos apariciones. Dos elementos realmente distintos serán fichas separadas, enlazadas con una relación. `getEntrySummaryForGame()` usa el resumen del juego y, si no lo hay, el común. `src/features/catalog/get-entries.ts` lee las fichas; el hub solo enlaza los apartados que tienen fichas. La ficha canónica vive en `/fichas/[entrySlug]` para que una ficha compartida tenga una sola URL; su layout anida `UniverseTheme` y `GameTheme` del juego de la primera aparición. Desde la PR #34, `Entry` es una unión discriminada por `category`: comparte `EntryBase` y añade `details` en armas (`slot`, `ammo?`), mapas (`chapter`), personajes (`affiliation`) y enemigos (`origin`); curiosidades y easter eggs no llevan `details`. TypeScript exige los campos de cada categoría al escribir los datos. `getEntryFacts()` (`src/features/catalog`) los convierte en pares etiqueta–valor con un `switch` sobre `category`, y la ficha los muestra en una lista `<dl>`.

**Mods y proyectos cancelados** son juegos (`Game`) con su propio hub, apartados y fichas, en la misma ruta `/universos/[universeSlug]/[gameSlug]`. `Game` es una unión discriminada por `status`: `released` (con `releaseYear`) o `cancelled` (con `cancelledYear`). `baseGameId` liga un mod o un cancelado al juego oficial del que depende. Un mod es un juego publicado con `baseGameId`; un cancelado tiene `status: "cancelled"`. `getOfficialGamesByUniverse()` (publicados sin `baseGameId`) alimenta `/universos` y la página del universo; el hub del juego base lista `getModsByGame()` y `getCancelledGamesByGame()`. `getGameYear()` (`src/domain/game.ts`) ordena por año y `getGameYearLabel()` (`src/features/games`) muestra «1998» o «Cancelado en 2001». Una prueba de integridad exige que mods y cancelados dependan de un juego oficial del mismo universo; cuando haya un cancelado sin juego base se relajará esa regla y se listará en la página del universo.

**Créditos:** `src/features/credits/get-credits.ts` reúne las fuentes de juegos, lore, fichas, hitos y personas, las agrupa por URL con un `Map` y anota dónde se usa cada una; también lista las imágenes con su crédito y licencia. `/creditos` solo pinta ese resultado. Sus pruebas viven junto a la función, porque prueban lógica y no datos.

**Imágenes:** se guardan en `public/images/entries/<id>-<juego>.<ext>` y se muestran con `next/image`, con `width` y `height` reales para reservar su espacio. Cada imagen registra su fuente (preferiblemente la página del archivo, donde constan autor y licencia), su crédito y su licencia. En la ficha la imagen es contenido (`alt` descriptivo, `<figure>` con crédito); en las tarjetas es decorativa (`alt=""`), porque el nombre ya está en el enlace.

**Contenido de Half-Life 1 (Z3, 2026-10-25):** los datos de cada bloque viven en su propio archivo (`src/data/half-life-chapters.ts`, `-weapons`, `-enemies`, `-characters`, `-extras`), que `src/data/entries.ts` reúne con `...spread`. `EntryBase` tiene `notes?` (desarrollo y curiosidades, respaldadas por las fuentes de la ficha). Los `details` se ampliaron: armas con `maxAmmo?` y `damage?`, enemigos con `health?` (ambos `DifficultyValues`, de `src/domain/difficulty.ts`), mapas con `mapFiles` y `designers?`, personajes con `voiceActor?` y `designers?`. `compareEntries()` ordena los mapas por juego y número de capítulo.

**Etapas de un universo (U1–U3, 2026-10-25/26):** `UniverseStage` (`src/domain/universe-stage.ts`, datos en `src/data/universe-stages.ts`) agrupa los juegos oficiales de un universo en etapas editoriales (en Half-Life, por motor: GoldSrc, Source y Source 2), que no indican la cronología de la ficción. Cada juego oficial lleva `stageId`; los mods y los cancelados no (lo comprueba una prueba de integridad). Una etapa `coming-soon` nombra sus juegos en `plannedGames`, como texto y sin enlaces. `getStagesByUniverse()` y `getGamesByStage()` viven en `get-universes.ts`. La página `/universos/[universeSlug]` compone `UniverseStage` (`src/features/universes/components`) con un `GameDossier` (`src/features/games/components`) por juego como `children`, así que ninguna de las dos funcionalidades importa a la otra. El dossier entero abre el hub mediante un enlace en capa y sus apartados quedan por encima con sus propios enlaces, sin anidarlos. El movimiento va en componentes de cliente aparte: `DossierMotion` (entrada con GSAP y cierre de desplegables con Escape) y `SmoothScroll` (`src/components/ui`, Lenis). Las imágenes decorativas de la interfaz (`src/data/decor-images.ts`) se acreditan en `/creditos` y pasan las pruebas de imágenes.

**Ajustes propuestos para fases siguientes (no implementados):**

- **Bloques de juegos dentro de un universo:** implementado como etapas (ver «Etapas de un universo», arriba).
- **Multijugador de Half-Life 1:** un apartado nuevo (`GameSectionId` `"multiplayer"`) que solo se muestra si el juego tiene contenido, con fichas propias pequeñas (modos y mapas) y la información específica de las fichas compartidas (por ejemplo, el daño en multijugador de un arma) como dato de su aparición, sin duplicar fichas.
- **Variantes de imagen:** `MediaAsset` con la variante (`original`, `hd-pack` oficial o `third-party`) y si tiene fondo transparente, para que el comparador solo enfrente variantes comparables.
- **Comportamiento de los NPC:** bloques opcionales y genéricos en la ficha (comportamiento, ataques y habilidades, interacción con el jugador, demostraciones), solo cuando haya información; sin reglas propias de Half-Life en los componentes.
- **Personas y autorías:** un tipo de persona con sus funciones (diseño conceptual, modelado, animación, interpretación, diseño de niveles…) vinculadas a juegos o fichas concretas y con fuentes; sustituirá a los campos `designers` y `voiceActor` de texto cuando exista.

**404:** `src/app/not-found.tsx` responde tanto a `notFound()` como a las URLs sin ruta. Se pinta dentro del layout raíz con la paleta de Valve y ofrece enlaces a Inicio y Universos.

Con `cacheComponents`, `generateStaticParams` debe devolver al menos un parámetro; los slugs no generados se renderizan en tiempo de ejecución y terminan en `notFound()` si no existen. Los tipos `PageProps` y `LayoutProps` los genera `next typegen` según las rutas existentes.

Al incorporar los primeros datos se comprobarán IDs y slugs únicos, referencias válidas, apariciones y fuentes. Se empezará con contenido local pequeño y comprobable; no se presupone que exista una API pública completa de Half-Life.

## 5. Servidor, cliente y estado

Las páginas y layouts podrán permanecer en servidor. Las zonas con interacción —buscador, favoritos o selección de comparación— tendrán límites de cliente pequeños. Los datos enviados al cliente serán los necesarios para esa interacción y compatibles con la serialización de React.

El catálogo se leerá mediante funciones del módulo, protegidas como código de servidor cuando corresponda. Una página de servidor llamará a esas funciones directamente. Los futuros endpoints HTTP reutilizarán esa lógica cuando exista una necesidad de consumo por navegador u otro cliente.

| Estado                               | Ubicación elegida                                    |
| ------------------------------------ | ---------------------------------------------------- |
| Menú abierto y controles locales     | Estado React local                                   |
| Filtros y ordenación compartibles    | URL como referencia para el estado aplicado          |
| Texto aún no aplicado en el buscador | Estado local si hace falta                           |
| Favoritos                            | IDs en `localStorage`, con estado React sincronizado |
| Contenido del catálogo               | Fuente de datos, sin copiarlo a estado global        |

Para favoritos se definirá una clave versionada y se validará el JSON almacenado. La primera renderización será compatible entre servidor y cliente; la lectura del navegador no deberá sobrescribir los favoritos existentes con un array vacío. Se contemplarán almacenamiento no disponible y fichas eliminadas.

Los resultados filtrados serán datos derivados. Los efectos se reservarán para sincronizar con sistemas externos, como el almacenamiento del navegador. Se introducirán hooks propios al extraer lógica útil, no por exigir un número de hooks.

## 6. Diseño y experiencia

Dirección visual: oscura, de estilo Valve y Steam, con lectura clara. Los colores, espacios, tipografía y estados interactivos se definen como variables CSS en `globals.css`.

### Temas por universo

La portada y las páginas generales usan la paleta base de Valve. Cada universo redefine las **mismas variables** (`--background`, `--surface`, `--accent`…) con colores inspirados en sus juegos; por ejemplo, Half-Life con tonos naranja HEV y gris industrial. Los componentes solo usan las variables, nunca colores concretos, así que cambian de aspecto sin modificar su código.

Implementado el 2026-10-11 (PR #10): `src/app/universos/[universeSlug]/layout.tsx` envuelve el contenido en `UniverseTheme` (`src/features/universes/components/universe-theme.tsx`). El modificador se construye a partir del id del universo (`universe-theme--half-life`); un universo sin tema en el CSS se queda con la paleta base. El envoltorio pinta su propio fondo y ocupa el alto disponible (`flex: 1`). Cabecera y pie quedan fuera y mantienen la paleta de Valve.

**Temas por juego (implementado en la PR #11):** cada juego podrá tener su propia paleta (Opposing Force no usará la de Half-Life). `src/app/universos/[universeSlug]/[gameSlug]/layout.tsx` envolverá el contenido en `GameTheme` (`src/features/games/components`) con `game-theme--<gameId>`. Los temas se anidan: Valve → universo → juego. El más interno redefine solo las variables que necesite y el resto se hereda; un juego sin tema propio (Half-Life) usa el del universo. Los apartados futuros heredarán el tema de su juego.

Mecanismo: el layout de `/universos/[universeSlug]` envuelve su contenido en un componente de tema del módulo `universes` que aplica una clase modificadora BEM (`universe-theme universe-theme--half-life`). Esa clase redefine las variables y la cascada CSS las hereda a todo lo que hay dentro. No requiere JavaScript en el cliente ni librerías de temas. Cada paleta nueva debe mantener contraste suficiente entre texto y fondo.

Los nombres, logotipos e imágenes de Valve pertenecen a sus propietarios. La web indicará que es un proyecto de fans no oficial y registrará el origen y las condiciones de uso de cada recurso visual.

Se utilizarán HTML semántico, etiquetas de formulario, foco visible y mensajes comprensibles. Habrá estados de lista vacía y ausencia de resultados; carga y error donde exista trabajo asíncrono real. Las fichas tendrán enlaces propios y los spoilers estarán identificados.

Se revisarán escritorio, móvil y uso por teclado. Las imágenes tendrán tamaños adecuados y una alternativa si faltan. La evaluación visual y las pruebas de navegador complementarán las comprobaciones automáticas; no se afirmará una certificación de accesibilidad sin evaluarla.

### Convención BEM

Aplicaremos la variante de nombres `block__element--modifier` a las clases propias. Es una decisión de este proyecto para mantener nombres claros y practicar CSS estructurado.

| Parte                   | Ejemplo en ValveDex        |
| ----------------------- | -------------------------- |
| Bloque independiente    | `entry-card`               |
| Elemento del bloque     | `entry-card__title`        |
| Variante del bloque     | `entry-card--featured`     |
| Variante de un elemento | `entry-card__tag--spoiler` |

Los modificadores acompañan a su clase base. No representaremos toda la jerarquía del HTML en el nombre: un título dentro de la cabecera sigue siendo `entry-card__title`.

Para CSS propio usaremos archivos `.module.css`, que aíslan los nombres por módulo. BEM expresa el papel de cada clase en el código fuente, aunque el nombre generado para el navegador sea distinto. En HTML convencional se utiliza `class`; en React, `className`.

Este ejemplo ilustra la convención; no acredita un componente ya implementado:

`entry-card.tsx`

```tsx
import styles from "./entry-card.module.css";

type EntryCardProps = {
  name: string;
  featured?: boolean;
};

export function EntryCard({ name, featured = false }: EntryCardProps) {
  const className = [
    styles["entry-card"],
    featured && styles["entry-card--featured"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <h2 className={styles["entry-card__title"]}>{name}</h2>
    </article>
  );
}
```

`entry-card.module.css`

```css
.entry-card {
  padding: 1rem;
  border: 1px solid #64748b;
  border-radius: 0.5rem;
}

.entry-card__title {
  margin: 0;
  font-size: 1.25rem;
}

.entry-card--featured {
  border-color: #f97316;
}
```

Los valores son ilustrativos; los estilos finales utilizarán los valores comunes de diseño acordados.

Tailwind conserva sus utilidades. Lo combinaremos con CSS propio solo donde aporte valor, asignando a cada propiedad un único responsable para evitar conflictos. No añadiremos clases BEM vacías a elementos que solo necesiten utilidades. Los estilos globales se reservarán para la base y las variables compartidas.

**Fase de diseño (decisión de Manuel, 2026-10-23):** los componentes propios siguen con CSS Modules + BEM. Los componentes de shadcn/ui se copian en el proyecto con sus utilidades de Tailwind y no se reescriben en BEM; sus tokens (`--background`, `--primary`…) se definirán a partir de las variables de los temas, para que cambien de paleta con el universo y el juego igual que el resto. Si un componente propio envuelve uno de shadcn, el envoltorio usa BEM y el de shadcn conserva sus utilidades: cada propiedad tiene un único responsable. Las librerías de diseño (GSAP, Lenis, React Bits, shadcn/ui, Three.js + React Three Fiber + drei) se instalan cada una en el paso en que se usan por primera vez; las animaciones y el 3D viven en componentes de cliente pequeños, sin convertir en cliente las páginas ni el layout raíz, y respetan `prefers-reduced-motion`.

La revisión de CSS comprobará nombres coherentes, selectores simples y ausencia de conflictos, también en móvil y estados de interacción. Esta convención no implica cambiar la nomenclatura de TypeScript ni instalar otra herramienta por defecto.

## 7. Calidad y flujo de trabajo

TypeScript estricto para comprobar tipos; ESLint para reglas de código y hooks; Prettier para formato. Sus configuraciones deberán convivir sin reglas de formato duplicadas que entren en conflicto.

Usaremos una rama corta por funcionalidad y una pull request hacia `main` como práctica de revisión. GitHub Actions comprobará una instalación reproducible con `npm ci`, lint, tipos, formato y build. Las pruebas se incorporarán al flujo cuando exista su configuración y casos reales.

**Docker (2026-11-02).** `next.config.ts` usa `output: "standalone"`: el build deja en `.next/standalone` solo lo necesario para ejecutar el servidor. El `Dockerfile` (tres etapas sobre `node:24-alpine`: dependencias con `npm ci`, compilación y ejecución) copia ese servidor, `.next/static` y `public/` a una imagen final que corre con el usuario `node`, sin permisos de administrador y con un healthcheck. `.dockerignore` deja fuera `node_modules`, `.next`, `.git`, los ajustes de herramientas y cualquier `.env`. El CI construye la imagen en cada PR sin publicarla. Las fuentes de `next/font/google` se descargan al compilar, así que el build de la imagen necesita internet.

| Herramienta           | Qué verificará                                                         |
| --------------------- | ---------------------------------------------------------------------- |
| Vitest (instalado)    | Integridad del catálogo (13 pruebas); después, filtros y comparaciones |
| React Testing Library | Interacciones visibles de componentes compatibles                      |
| Playwright            | Navegación real, filtros, fichas y persistencia de favoritos           |

Vitest 5 está instalado (PR #21): `npm run test` ejecuta las pruebas y `npm run check` las incluye. React Testing Library y Playwright siguen previstos. Según la guía de Next.js consultada, Vitest no cubre componentes de servidor asíncronos directamente; sus recorridos se comprobarán con pruebas E2E. Se volverá a comprobar la compatibilidad al instalar las herramientas.

Una entrega se considerará completa cuando cumpla sus criterios del roadmap, pase las comprobaciones aplicables, funcione en los tamaños revisados y tenga la documentación correspondiente actualizada. La entrega inicial de documentos no permite afirmar que esas comprobaciones del código hayan pasado.

## 8. Decisiones iniciales

| Fecha      | Decisión                                                         | Motivo y consecuencia                                                                                                               |
| ---------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-30 | React con Next.js App Router                                     | Combinar aprendizaje de React con páginas individuales y renderizado del contenido; exige distinguir servidor y cliente             |
| 2026-09-30 | Organización por funcionalidades                                 | Mantener cerca el código que cambia junto y facilitar ampliaciones                                                                  |
| 2026-09-30 | Catálogo local inicial                                           | Empezar la interfaz con datos comprobables; el acceso separado facilita cambiar la fuente después                                   |
| 2026-09-30 | TypeScript estricto y npm                                        | Tipos consistentes e instalación reproducible mediante lockfile                                                                     |
| 2026-09-30 | Estado local, URL y persistencia de IDs                          | Asignar a cada estado un lugar claro y evitar duplicaciones                                                                         |
| 2026-10-01 | BEM en el CSS propio y CSS Modules para estilos de componentes   | Practicar estilos con nombres coherentes y alcance local; Tailwind conserva sus utilidades sin duplicar responsabilidades           |
| 2026-10-07 | Reglas comunes en AGENTS, entrada para Claude y estado en STATUS | Continuar entre asistentes sin duplicar reglas ni dar por aplicado lo que solo se propuso en un chat                                |
| 2026-10-07 | Navegación Valve → Universos → Juego, con hub por juego          | Petición de Manuel: portada sobre la empresa y Steam, sagas agrupadas y apartados de lore, mapas, armas, etc.                       |
| 2026-10-07 | Paleta base de Valve y tema por universo mediante variables CSS  | Cada saga tiene identidad visual propia sin duplicar componentes ni añadir librerías de temas                                       |
| 2026-10-12 | Vitest para las pruebas de integridad de datos                   | Los errores de la PR #17 solo se vieron revisando a mano; las pruebas los detectan en `npm run check`                               |
| 2026-10-13 | Completar el esqueleto antes del contenido                       | Decisión de Manuel: todas las rutas y piezas con datos mínimos primero; imágenes sin fondo, comparador visible y más fichas después |

El backend, la base de datos, la autenticación y el proveedor de despliegue están pendientes de decisión. La entrega de backend incluirá consumo de API desde React, validación de respuestas y gestión de errores. Las escrituras administrativas deberán comprobar identidad y permisos en servidor.

La API se documentará con **OpenAPI 3.1** (decisión de Manuel, 2026-10-21). Los esquemas Zod que validen cada route handler serán también la fuente de la especificación, para que documentación y validación no se separen, y se publicará con Swagger UI o Scalar en una ruta como `/api/docs`.

Si una decisión deja de servir, se registrará aquí la fecha, el motivo y la alternativa elegida. El documento describirá entonces la solución real, conservando el historial de decisiones relevante.

## 9. Continuidad documental

- `AGENTS.md`: reglas comunes de trabajo y código.
- `CLAUDE.md`: entrada para Claude Code mediante importaciones, sin duplicar las reglas.
- `docs/STATUS.md`: estado actual, evidencia, bloqueo y siguiente tarea.
- `docs/roadmap.md`: objetivos y criterios de aceptación.
- `CHANGELOG.md`: cambios relevantes terminados.
- `README.md`: presentación pública; su revisión queda aplazada a petición de Manuel.

Los documentos se versionan junto al proyecto. Cada sesión contrasta el estado documentado con los archivos y los resultados de las comprobaciones. Una tarea preparada en el chat sigue pendiente hasta que se aplique y se compruebe.

## 10. Referencias oficiales

Consultadas el 2026-09-30. Para implementar, contrastar con las versiones instaladas.

- [Organización de proyectos en Next.js](https://nextjs.org/docs/app/getting-started/project-structure).
- [Componentes de servidor y cliente](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- [Cuándo no hace falta un efecto en React](https://react.dev/learn/you-might-not-need-an-effect).
- [Modo estricto de TypeScript](https://www.typescriptlang.org/tsconfig/strict.html).
- [Vitest con Next.js](https://nextjs.org/docs/app/guides/testing/vitest).
- [CI de Node.js con GitHub Actions](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs).
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Referencias de estilos consultadas el 2026-10-01:

- [Nomenclatura BEM](https://getbem.com/naming/).
- [CSS y CSS Modules en Next.js](https://nextjs.org/docs/app/getting-started/css).
