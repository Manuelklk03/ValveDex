# Arquitectura de ValveDex

Fecha de la decisión inicial: **2026-09-30**.

Última actualización: **2026-10-07**, nueva estructura de navegación (Valve → Universos → Juego) y paletas por universo.

Estado: **aplicación Next.js inicializada y comprobada el 2026-10-07; estructura de `src/` pendiente** (solo existe `src/app`). Este documento evolucionará con el código. Las rutas y carpetas descritas son objetivos, no evidencia de que ya existan. El estado actualizado se mantiene en [STATUS.md](STATUS.md).

## 1. Enfoque

El producto cubrirá progresivamente Valve y todo su catálogo de juegos. La navegación tiene tres niveles:

1. **Portada (Valve):** la empresa, Steam, su historia y otros datos generales de Valve. Paleta oscura de estilo Valve.
2. **Universos:** todas las sagas de Valve (Half-Life, Portal, Team Fortress, Counter-Strike, Left 4 Dead, etc.), cada una con los videojuegos que la forman. Al entrar en un universo, la paleta de colores cambia a la de esa saga.
3. **Hub de videojuego:** dentro de cada juego, apartados como lore, mapas, armas, personajes, enemigos, curiosidades y easter eggs.

La lista de universos y juegos se construirá con datos verificados; un universo sin contenido aún podrá mostrarse como «próximamente». El contenido de la primera entrega se centra en el universo Half-Life con Half-Life, Opposing Force y Blue Shift; Half-Life 2, Ricochet y los demás títulos se incorporarán después.

Una aplicación Next.js organizada por funcionalidades: universos, catálogo, favoritos y comparador. Cada módulo agrupa sus componentes y lógica; las páginas los combinan. Es una convención propia compatible con Next.js, no una estructura obligatoria del framework.

Buscamos responsabilidades claras, tipos explícitos, comprobaciones reproducibles y facilidad para ampliar el contenido. La prioridad de aprendizaje es el frontend React. El backend se incorporará después de completar un recorrido útil de consulta.

## 2. Responsabilidades

| Ruta prevista              | Responsabilidad                                                     |
| -------------------------- | ------------------------------------------------------------------- |
| `src/app/`                 | Rutas, composición de páginas, layouts y metadatos                  |
| `src/features/universes/`  | Lectura de universos y juegos, tarjetas y tema visual por universo  |
| `src/features/catalog/`    | Tarjetas, fichas, búsqueda, filtros y lectura del catálogo          |
| `src/features/favorites/`  | Estado y persistencia de favoritos, cuando se implemente            |
| `src/features/comparison/` | Selección y comparación de armas, cuando se implemente              |
| `src/components/ui/`       | Controles de presentación reutilizados: botones, etiquetas o inputs |
| `src/components/layout/`   | Cabecera, navegación y pie comunes                                  |
| `src/domain/`              | Tipos y reglas compartidas de juegos, fichas y fuentes, sin React   |
| `src/lib/`                 | Utilidades técnicas compartidas con una finalidad concreta          |
| `src/data/`                | Catálogo local inicial y referencias de contenido                   |
| `public/`                  | Recursos estáticos que se puedan publicar                           |
| `tests/e2e/`               | Recorridos de usuario en navegador                                  |
| `.github/workflows/`       | Comprobaciones automáticas, cuando se configuren                    |
| `docs/`                    | Arquitectura, planificación y estado de continuidad                 |

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

| URL prevista                                     | Función                                                   |
| ------------------------------------------------ | --------------------------------------------------------- |
| `/`                                              | Portada sobre Valve: empresa, Steam e historia            |
| `/universos`                                     | Todos los universos de Valve                              |
| `/universos/[universeSlug]`                      | Universo con su paleta y la lista de sus videojuegos      |
| `/universos/[universeSlug]/[gameSlug]`           | Hub del juego: acceso a lore, mapas, armas, personajes…   |
| `/universos/[universeSlug]/[gameSlug]/[section]` | Apartado del hub (por ejemplo `armas` o `easter-eggs`)    |
| `/fichas/[slug]`                                 | Ficha canónica y apariciones en los juegos                |
| `/explorar`                                      | Hub principal: buscador global y carruseles por categoría |
| `/favoritos`                                     | Fichas guardadas en este navegador                        |
| `/comparador`                                    | Comparación de armas compatibles                          |

Los segmentos visibles de la URL van en español (`universos`, `armas`); los nombres de parámetros en código, en inglés (`universeSlug`, `gameSlug`). Los apartados del hub serán una lista cerrada y validada; un apartado sin contenido no se enlazará o mostrará un estado vacío.

### Hub principal `/explorar`

Es el punto de búsqueda de todo el contenido, con independencia del universo. Arriba tiene un buscador global y debajo una fila con carrusel horizontal por categoría (armas, mapas, personajes, enemigos…) que mezcla fichas de todos los juegos.

- Al buscar, cada carrusel muestra solo las coincidencias de su categoría y las filas vacías se ocultan; si no hay ninguna coincidencia, se muestra un estado «sin resultados».
- Cada fila tiene un enlace «Ver todo» que abre el listado completo de esa categoría (`/explorar?category=armas`), con los filtros de la Entrega 2.
- El carrusel será un `<ul>` con desplazamiento horizontal y `scroll-snap` en CSS, utilizable con rueda, gesto táctil y teclado. Los botones anterior/siguiente serán un componente de cliente pequeño. No se añadirá una librería de sliders.
- Los resultados filtrados son datos derivados del texto buscado y del catálogo; no se copian a otro estado.

Los filtros públicos se representarán en parámetros como `q`, `game`, `category` y `sort`. Se validarán los valores, se definirán valores por defecto y se mantendrá el funcionamiento del botón Atrás. Un slug inexistente mostrará una página 404.

## 4. Datos y contenido

El diseño inicial contempla estas entidades; sus tipos exactos se escribirán al implementar el catálogo:

| Entidad      | Datos principales                                                        |
| ------------ | ------------------------------------------------------------------------ |
| `Universe`   | ID, slug, nombre, descripción, tema visual e IDs de sus juegos           |
| `Game`       | ID, slug, universo, nombre, año, descripción y recursos visuales         |
| `Entry`      | ID, slug único, nombre, categoría, resumen, apariciones y fuentes        |
| `Appearance` | Juego y diferencias concretas de una ficha en ese juego                  |
| `Relation`   | ID de origen, ID de destino y tipo de relación                           |
| `Source`     | URL, título y fecha de consulta                                          |
| `MediaAsset` | Recurso, texto alternativo, origen, autor y condiciones de uso conocidas |

`Entry` se modelará mediante variantes discriminadas por categoría: arma, personaje, enemigo, objeto, localización, mapa, capítulo, facción, curiosidad o easter egg. Los apartados del hub de un juego son vistas de estas fichas filtradas por categoría y juego; el lore puede empezar como texto propio del juego. Cada variante tendrá los campos que necesita; evitaremos un objeto con decenas de propiedades opcionales sin relación.

Los IDs serán estables y diferentes de los nombres visibles. Una ficha compartida conservará su ID en los tres juegos. Las estadísticas deberán indicar juego, versión, dificultad y unidad cuando afecten al valor. «Desconocido» no significa cero. La comparación solo mostrará medidas equivalentes.

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

Mecanismo previsto: el layout de `/universos/[universeSlug]` envuelve su contenido en un componente de tema del módulo `universes` que aplica una clase modificadora BEM (`universe-theme universe-theme--half-life`). Esa clase redefine las variables y la cascada CSS las hereda a todo lo que hay dentro. No requiere JavaScript en el cliente ni librerías de temas. Cada paleta nueva debe mantener contraste suficiente entre texto y fondo.

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

La revisión de CSS comprobará nombres coherentes, selectores simples y ausencia de conflictos, también en móvil y estados de interacción. Esta convención no implica cambiar la nomenclatura de TypeScript ni instalar otra herramienta por defecto.

## 7. Calidad y flujo de trabajo

TypeScript estricto para comprobar tipos; ESLint para reglas de código y hooks; Prettier para formato. Sus configuraciones deberán convivir sin reglas de formato duplicadas que entren en conflicto.

Usaremos una rama corta por funcionalidad y una pull request hacia `main` como práctica de revisión. GitHub Actions comprobará una instalación reproducible con `npm ci`, lint, tipos, formato y build. Las pruebas se incorporarán al flujo cuando exista su configuración y casos reales.

| Herramienta prevista  | Qué verificará                                                   |
| --------------------- | ---------------------------------------------------------------- |
| Vitest                | Reglas puras de filtros, comparaciones e integridad del catálogo |
| React Testing Library | Interacciones visibles de componentes compatibles                |
| Playwright            | Navegación real, filtros, fichas y persistencia de favoritos     |

Según la guía de Next.js consultada, Vitest no cubre componentes de servidor asíncronos directamente; sus recorridos se comprobarán con pruebas E2E. Se volverá a comprobar la compatibilidad al instalar las herramientas.

Una entrega se considerará completa cuando cumpla sus criterios del roadmap, pase las comprobaciones aplicables, funcione en los tamaños revisados y tenga la documentación correspondiente actualizada. La entrega inicial de documentos no permite afirmar que esas comprobaciones del código hayan pasado.

## 8. Decisiones iniciales

| Fecha      | Decisión                                                         | Motivo y consecuencia                                                                                                     |
| ---------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-30 | React con Next.js App Router                                     | Combinar aprendizaje de React con páginas individuales y renderizado del contenido; exige distinguir servidor y cliente   |
| 2026-09-30 | Organización por funcionalidades                                 | Mantener cerca el código que cambia junto y facilitar ampliaciones                                                        |
| 2026-09-30 | Catálogo local inicial                                           | Empezar la interfaz con datos comprobables; el acceso separado facilita cambiar la fuente después                         |
| 2026-09-30 | TypeScript estricto y npm                                        | Tipos consistentes e instalación reproducible mediante lockfile                                                           |
| 2026-09-30 | Estado local, URL y persistencia de IDs                          | Asignar a cada estado un lugar claro y evitar duplicaciones                                                               |
| 2026-10-01 | BEM en el CSS propio y CSS Modules para estilos de componentes   | Practicar estilos con nombres coherentes y alcance local; Tailwind conserva sus utilidades sin duplicar responsabilidades |
| 2026-10-07 | Reglas comunes en AGENTS, entrada para Claude y estado en STATUS | Continuar entre asistentes sin duplicar reglas ni dar por aplicado lo que solo se propuso en un chat                      |
| 2026-10-07 | Navegación Valve → Universos → Juego, con hub por juego          | Petición de Manuel: portada sobre la empresa y Steam, sagas agrupadas y apartados de lore, mapas, armas, etc.             |
| 2026-10-07 | Paleta base de Valve y tema por universo mediante variables CSS  | Cada saga tiene identidad visual propia sin duplicar componentes ni añadir librerías de temas                             |

El backend, la base de datos, la autenticación y el proveedor de despliegue están pendientes de decisión. La entrega de backend incluirá consumo de API desde React, validación de respuestas y gestión de errores. Las escrituras administrativas deberán comprobar identidad y permisos en servidor.

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
