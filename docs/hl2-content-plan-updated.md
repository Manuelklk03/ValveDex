# Plan actualizado para añadir el resto del contenido de Half-Life 2

## Objetivo

Completar el contenido de Half-Life 2 en `feature/hl2-content-lore`: apartados (mapas, armas, personajes, enemigos, curiosidades, easter eggs) siguiendo el modelo de Half-Life 1.

## Estructura de datos

- **Archivo:** `src/data/half-life-2-content.ts`
- **Tipo:** `HalfLife2Content`
- **Campos:**
  - `chapters: HalfLife2Chapter[]` (mapas)
  - `weapons: HalfLife2Weapon[]` (armas)
  - `characters: HalfLife2Character[]` (personajes)
  - `enemies: HalfLife2Enemy[]` (enemigos)
  - `trivia: HalfLife2Trivia[]` (curiosidades)
  - `easterEggs: HalfLife2EasterEgg[]` (easter eggs)

## Contenido que falta de Half-Life 2

### 1. Mapas (`chapters`)
- **10 mapas:** 9 misiones de la campaña + Xen Attacks extra
- **Archivos de mapa:** Los nombres de archivo de los mapas de Half-Life 2
- **Diseñadores:** Los diseñadores de cada mapa según Combine OverWiki
- **Notas de desarrollo:** Información del desarrollo de cada mapa

### 2. Armas (`weapons`)
- **9 armas:** MP5, escopeta, ballesta, lanzacohetes, cañón tau, cañón de gluones, Hivehand, granada, carga de satchel
- **Munición y daño:** Según el SDK de Valve y skill.cfg
- **Notas de desarrollo y mecánicas:** Información técnica
- **Técnicas de speedrun:** Referencias a SourceRuns

### 3. Personajes (`characters`)
- **10 personajes:** Gordon Freeman, Barney Calhoun, Eli Vance, Alyx Vance, Richard Keller, Gina Cross, Colette Green, vortigaunts X-8973 y R-4913
- **Afiliación:** Equipo/rol de cada personaje
- **Voz y diseño:** Actores de voz y diseñadores de apariencia
- **Notas de desarrollo:** Información sobre el desarrollo de cada personaje

### 4. Enemigos (`enemies`)
- **16 enemigos:** headcrab, fastheadcrab, explosionheadcrab, hazmat, houndeye, bullsquid, gonarca, tentáculo, pit worm, volcán, stasis, aura, voltigore, guardia X, Strider, Hunter, etc.
- **Salud y daño:** Según variables de skill.cfg o SDK de Valve
- **Notas de desarrollo y mecánicas:** Información técnica por enemigo

### 5. Curiosidades (`trivia`)
- **11 curiosidades:** Datos técnicos, historias de fondo, Easter eggs escondidos, etc.
- **Fuentes:** Combine OverWiki, testimonios de desarrolladores, etc.

### 6. Easter eggs (`easter_eggs`)
- **5 easter eggs:** Taquillas de desarrolladores, "Gordon, empleado del mes", "The Package", etc.
- **Detalles:** Cómo desbloquear, significado, contexto

## Próximos pasos

1. **Crear `src/data/half-life-2-content.ts`** con todas las secciones
2. **Actualizar `src/features/catalog/get-entries.ts`** para leer el content de Half-Life 2
3. **Actualizar `src/features/catalog/get-section-statuses.ts`** para incluir las secciones de Half-Life 2
4. **Actualizar el hub de Half-Life 2** para mostrar todas las tarjetas de apartados disponibles
5. **Crear páginas para cada apartado** siguiendo el patrón de Half-Life 1
6. **Actualizar documentación** en STATUS.md, CHANGELOG.md, etc.

## Integración

- **Mapas:** Los mapas se mostrarán en `/universos/half-life/half-life-2/mapa/[slug]`
- **Armas:** Las armas se mostrarán en `/universos/half-life/half-life-2/arma/[slug]`
- **Personajes:** Los personajes se mostrarán en `/universos/half-life/half-life-2/personaje/[slug]`
- **Enemigos:** Los enemigos se mostrarán en `/universos/half-life/half-life-2/enemigo/[slug]`
- **Curiosidades:** Las curiosidades se mostrarán en `/universos/half-life/half-life-2/curiosidad/[slug]`
- **Easter eggs:** Los easter eggs se mostrarán en `/universos/half-life/half-life-2/easter-egg/[slug]`

## Fuentes

- **Combine OverWiki:** https://combineoverwiki.net/wiki/Half-Life_2
- **SourceRuns:** Comunidad de speedruners
- **Valve Developer Community:** SDK y documentación oficial
- **Testigos de desarrollo:** Entrevistas y diarios de desarrollo de Valve

## Notas

- El diseño y el tema visual ya están hechos en `feature/hl2-dossier`
- Solo falta el contenido (datos) en `feature/hl2-content-lore`
- Seguir el mismo formato, convención de nombres y organización que Half-Life 1
- Utilizar `kind: "official"`, `kind: "wiki"`, o `kind: "community"` según la fuente
- Garantizar contraste WCAG AA para todos los colores nuevos
- No inventar datos: registrar siempre la fuente