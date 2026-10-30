# Plan para añadir el apartado de lore de Half-Life 2

## Objetivo

Añadir el apartado de lore de Half-Life 2 con 8 párrafos, con botón de spoilers (como Half-Life 1) y fuentes de Combine OverWiki.

## Estructura de datos

- **Archivo:** `src/data/half-life-2-lore.ts`
- **Tipo:** `LoreEntry[]`
- **Campos:**
  - `id`: string (ej: "half-life-2-lore-1")
  - `slug`: string (ej: "introduccion-a-la-ciudad-17")
  - `title`: string (ej: "Introducción a la Ciudad 17")
  - `content`: string (párrafo de lore)
  - `spoiler`: boolean (false por defecto)

## Párrafos de lore

1. Introducción a la Ciudad 17
2. La Resistencia
3. El Comandante Wallace Breen
4. El Portal a la Zona de Cuarentena
5. La Ciudad 17 bajo control de la Alianza
6. El ataque de la Resistencia
7. La Zona de Cuarentena y Xen
8. La victoria de la Resistencia y el futuro

## Fuentes

- Combine OverWiki (https://combineoverwiki.net/wiki/Half-Life_2)
- half-life.com (https://www.half-life.com)

## Integración

- Actualizar `src/features/catalog/get-entries.ts` para leer el lore de Half-Life 2
- Actualizar `src/features/catalog/get-lore-for-game()` para incluir lore de Half-Life 2
- Actualizar el componente de lore en `/fichas/[entrySlug]/page.tsx` para leer el lore de Half-Life 2
- Mantener el mismo diseño que Half-Life 1 (botón de spoilers, párrafos con spoiler)

## Próximos pasos

1. Implementar los 8 párrafos de lore
2. Integrar en el catálogo
3. Actualizar documentación
4. Verificar que el botón de spoilers funciona correctamente
5. Añadir más apartados (mapas, armas, personajes, etc.)