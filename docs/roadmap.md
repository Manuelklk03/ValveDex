# Roadmap de ValveDex

Estado inicial: **2026-09-30**. Plan de trabajo personal; el orden puede ajustarse según lo aprendido. Las casillas solo se marcarán con trabajo comprobado.

Última actualización: **2026-10-14** (tras la PR #26).

Objetivo global: cubrir Valve y todos sus juegos de forma progresiva, con la navegación Valve → Universos → Juego descrita en la [arquitectura](architecture.md). La primera fase de contenido mantiene el universo Half-Life con Half-Life, Opposing Force y Blue Shift. Consulta [STATUS.md](STATUS.md) para saber dónde retomar el trabajo.

## Entrega 0 — Base y documentación

- [x] Preparar los cinco documentos iniciales.
- [x] Definir BEM para las clases propias y su uso con CSS Modules y Tailwind.
- [x] Preparar CLAUDE.md y STATUS.md para dar continuidad entre asistentes.
- [x] Integrarlos con los archivos reales del proyecto.
- [x] Crear o comprobar la aplicación Next.js, TypeScript y Tailwind (build comprobado el 2026-10-07).
- [ ] Registrar la versión compatible de Node.js y mantener el lockfile de npm. El lockfile existe; falta registrar Node.
- [x] Configurar y ejecutar ESLint, TypeScript y Prettier (`npm run check` superado el 2026-10-07).
- [x] Fijar finales de línea LF con `.gitattributes` para que Prettier no falle en Windows. Los archivos nuevos que crea VS Code siguen en CRLF hasta ejecutar `npm run format`.
- [x] Crear el repositorio con el README, según confirmación de Manuel del 2026-10-07.
- [ ] Preparar una primera CI de lint, tipos, formato y build.

**Se acepta cuando:** Manuel puede instalar y arrancar el proyecto en su entorno de desarrollo y las comprobaciones de esta entrega funcionan. La documentación preparada por sí sola no completa esta fase.

## Entrega 1 — Primer recorrido navegable

- [ ] Definir la paleta base de Valve en variables CSS y el layout adaptable (cabecera con Inicio y Universos, pie). Paleta, cabecera y pie aplicados (build superado el 2026-10-08); falta revisar móvil y teclado en navegador.
- [ ] Aplicar BEM al CSS propio y enlazar las clases de CSS Modules desde JSX.
- [ ] Revisar modificadores, selectores y convivencia con las utilidades de Tailwind.
- [ ] Portada sobre Valve: la empresa, Steam e historia, con datos verificados y fuentes. v1 con hero, Valve y Steam (PR #6, #7). Cronología «Historia de Valve» con 5 hitos y fuentes (PR #8). Pendiente: revisión en navegador y ampliar contenido.
- [ ] Página `/universos` con todos los universos de Valve; los que aún no tengan contenido, marcados como «próximamente». Hecha (PR #9, build superado); falta la revisión en navegador.
- [ ] Página de universo con su paleta propia (empezando por Half-Life) y la lista de sus juegos. Hecha (PR #10, build superado): tema por variables CSS y 404 para universos inexistentes o «Próximamente». Falta revisar el contraste y el teclado en navegador.
- [ ] Hub de juego para Half-Life, Opposing Force y Blue Shift con sus apartados (lore, mapas, armas, personajes, enemigos, curiosidades, easter eggs). Hub con cabecera, fuentes, apartados y tema propio por juego (PR #11). Los apartados con contenido enlazan a su página: fichas de muestra en todas las categorías (PR #23) y lore de los tres juegos (PR #24). Falta un easter egg de Half-Life y la revisión en navegador.
- [ ] Ficha individual enlazada desde los apartados del hub. Hecha (PR #14, #16 y #18): `/fichas/[entrySlug]` con tema, «Aparece en», datos e imagen por juego, y fuentes. Falta la revisión en navegador.
- [ ] Preparar datos reales de los tres juegos con una muestra de cada categoría inicial. Muestra mínima del esqueleto hecha (PR #23: 9 fichas, todas las categorías; apariciones en los tres juegos); falta ampliarla en la fase de contenido.
- [x] Registrar las fuentes y los recursos visuales utilizados. Cada ficha, juego, hito y persona tiene fuentes; cada imagen guarda fuente, crédito y licencia (`MediaAsset`), y `/creditos` lo reúne todo desde los datos (PR #33). Límite conocido: la fuente de `/valve/steam` está escrita en la página y no sale en los créditos.
- [x] Campos propios por categoría: `Entry` como unión discriminada por `category` y sección «Datos» en la ficha (PR #34).
- [x] Mods y proyectos cancelados como juegos con su propio hub: mods con `baseGameId` (PR #36) y cancelados con `status: "cancelled"` (PR #38). Muestras: Sven Co-op y Half-Life para Dreamcast.
- [ ] Mostrar relaciones entre fichas y una página 404 útil. La 404 está hecha (PR #15). Relaciones hechas (PR #26: `EntryRelation`, bloque «Relacionado» en las dos direcciones) con su prueba de integridad (PR #27). Falta la revisión en navegador para marcarlo.
- [ ] Sección Valve: `/valve/historia`, `/valve/personas/[personSlug]` y `/valve/steam`, con la portada como resumen (PR #29). Falta la revisión en navegador y contrastar los textos con sus fuentes.
- [x] Incorporar comprobaciones de integridad de datos (Vitest, PR #21; 20 pruebas y `npm run check` superado el 2026-10-19).
- [ ] Incorporar un recorrido E2E.

**Orden acordado (2026-10-13, ampliado el 2026-10-20):** completar antes el esqueleto (pasos 15–22 de STATUS: fichas de muestra en todas las categorías, lore, relaciones, `/explorar` básico, sección Valve, créditos, campos por categoría, mods y proyectos cancelados) y dejar para después el diseño, el contenido y el pulido. **Esqueleto terminado el 2026-10-23 y publicado como `v0.1.0`.** Lo que queda sin marcar en esta entrega es la revisión en navegador y el contenido real, que se harán sobre el diseño definitivo.

**Versiones (decisión de Manuel, 2026-10-16):** `v0.1.0` al cerrar el esqueleto; `v0.x` por cada bloque grande de contenido; `v1.0.0` cuando esté completo **todo el universo Half-Life** (no solo esta entrega). Detalle en [STATUS.md](STATUS.md#versiones-del-proyecto).

**Se acepta cuando:** desde la portada se llega a Universos → Half-Life → cada uno de sus tres juegos → un apartado → una ficha, y se sigue una relación sin enlaces rotos, con la paleta del universo aplicada, en móvil y escritorio.

**React que practicaremos:** JSX, componentes, props, listas, claves estables y composición.

**CSS que practicaremos:** bloques, elementos y modificadores BEM; CSS Modules; variables CSS y temas por cascada; responsive y especificidad.

## Entrega 2 — Hub principal, búsqueda y filtros

- [ ] Crear el hub `/explorar` con buscador global y un carrusel horizontal por categoría (armas, mapas, personajes, enemigos…). Hecho sin buscador (PR #28): una fila con `scroll-snap` por cada categoría con fichas.
- [ ] Filtrar todos los carruseles con la búsqueda, ocultar filas vacías y mostrar «sin resultados».
- [ ] Enlazar «Ver todo» de cada fila al listado completo de esa categoría. Hecho como ruta `/explorar/[categorySlug]` (PR #28) en lugar de `?category=`; falta la revisión en navegador.
- [ ] Buscar por nombre y combinar filtros por juego y categoría.
- [ ] Añadir ordenación, contador y limpieza de filtros.
- [ ] Reflejar los filtros aplicados en la URL.
- [ ] Resolver valores desconocidos y búsquedas sin resultados.
- [ ] Probar combinaciones de filtros y navegación Atrás.

**Se acepta cuando:** copiar la URL reproduce los filtros y limpiar devuelve el catálogo previsto.

**React que practicaremos:** estado, eventos, inputs controlados, datos derivados y un componente de cliente pequeño (botones del carrusel).

## Entrega 3 — Favoritos, spoilers y comparación

- [ ] Guardar y quitar favoritos con persistencia local.
- [ ] Gestionar almacenamiento dañado o no disponible sin bloquear la web.
- [ ] Incorporar control de spoilers.
- [ ] Comparar armas del mismo juego con datos equivalentes.
- [ ] Probar favoritos después de recargar y el manejo de comparaciones incompatibles.

**Se acepta cuando:** las preferencias funcionan, no se borran favoritos al arrancar y el comparador identifica los datos que faltan.

**React que practicaremos:** hooks propios, sincronización externa, estado compartido cuando haga falta y renderizado condicional.

## Entrega 4 — API y gestión de contenido

- [ ] Elegir y documentar backend, base de datos y autenticación.
- [ ] Documentar la API con **OpenAPI 3.1** (decisión de Manuel, 2026-10-21): los mismos esquemas Zod que validan los route handlers generarán la especificación, publicada con Swagger UI o Scalar en una ruta como `/api/docs`.
- [ ] Consumir la API desde React con estados de carga, error y reintento.
- [ ] Añadir formularios de edición y validación.
- [ ] Proteger las operaciones de escritura en servidor.
- [ ] Probar persistencia y rechazo de operaciones sin permisos.

**Se acepta cuando:** los datos persisten y la API aplica validación y permisos, también fuera de la interfaz.

**React que practicaremos:** asincronía, formularios, validación y separación entre estado de interfaz y datos remotos.

## Entrega 5 — Publicación para el portfolio

- [ ] Completar la revisión responsive, de teclado y de errores.
- [ ] Revisar imágenes, metadatos y rendimiento con resultados reales.
- [ ] Ejecutar el flujo de CI y los recorridos principales.
- [ ] Publicar una versión y verificar la web desplegada.
- [ ] Añadir capturas, demo y guía de uso real al README.
- [ ] Mejorar iconos e imágenes de Valve y ampliar la presentación de juegos, incluidos Half-Life 2 y Ricochet.
- [ ] Retirar la sección de ejecución local del README público cuando se revise, según la preferencia de Manuel; conservar las instrucciones necesarias para el desarrollo en la documentación técnica.
- [ ] Registrar la versión publicada en el changelog.

**Se acepta cuando:** la demo funciona desde un dispositivo externo y el repositorio explica el alcance real, el acceso a la demo, las decisiones y las limitaciones conocidas.

## Fase de diseño (después del esqueleto)

Acordado con Manuel el 2026-10-22. El esqueleto actual es solo estructura y datos de prueba: el diseño final será mucho más ambicioso (3D, animaciones, transiciones, efectos), con calidad de portfolio.

**Orden:** esqueleto (22a mods, 22b cancelados) → `v0.1.0` → **fase de diseño** → contenido completo de Half-Life sobre ese diseño. Esqueleto y `v0.1.0` hechos el 2026-10-23: la fase de diseño es la siguiente.

**Preparación (hecha el 2026-10-23, decisiones de Manuel):**

- [x] Reactivados en `.claude/settings.json` `taste`, `ui-ux-pro-max` e `imagegen-skills`; siguen desactivados `caveman`, `superpowers` y `claude-mem`.
- [x] `CLAUDE.md`: `frontend-stack` dirige las skills de diseño; se permiten dependencias de diseño.
- [x] Las librerías se instalan **cada una en el paso en que se usa por primera vez**, explicando para qué sirve:
  - **GSAP**: animaciones y secuencias complejas.
  - **Lenis**: scroll suave.
  - **React Bits**: componentes y efectos animados listos para adaptar.
  - **shadcn/ui** (Radix UI + Tailwind): componentes accesibles (diálogos, menús, pestañas…).
  - **Three.js + React Three Fiber (+ drei)**: escenas y modelos 3D (por ejemplo, armas que giran en su ficha).
- [x] Estilos: componentes propios en CSS Modules + BEM; shadcn/ui con sus utilidades de Tailwind y colores de las variables de los temas (`architecture.md`).
- Se mantiene el modo guiado: Manuel escribe el código con la explicación de cada archivo.

**Pasos previstos:**

- [x] D1. Dirección de diseño (aprobada el 2026-10-23, [design.md](design.md)): brief de `frontend-stack` (público, estética, tipografía, color, composición, movimiento y qué librería entra dónde), decidido con Manuel antes de escribir código.
- [ ] D2. Sistema de diseño: tokens (tipografía, espaciado, radios, sombras, movimiento) en `globals.css` y paletas de los temas revisadas con la comprobación de contraste de `antislop`.
- [ ] D3 y siguientes: rediseño página a página (portada, universos, hub, apartado, ficha, `/explorar`…), cada uno con su librería cuando haga falta y revisado en móvil, teclado y `prefers-reduced-motion`.

## Ampliación posterior

La sección Valve ya tiene páginas propias (PR #29): historia completa (5 hitos), personas (los dos fundadores) y Steam. Crecerá con más hitos, más personas clave, motores (GoldSrc, Source, Source 2), hardware y curiosidades, siempre con fuentes.

**Universo Half-Life completo (según Manuel, 2026-10-12):** después de Half-Life, Opposing Force y Blue Shift se añadirán Uplink, Decay, Half-Life: Source, Half-Life 2 (con Deathmatch y Lost Coast), los episodios, Half-Life Deathmatch: Source, Half-Life 2: Survivor y Half-Life: Alyx. La lista del README está pendiente de contrastar con fuentes.

**Proyectos cancelados y mods famosos (según Manuel, 2026-10-12):** cada saga tendrá un apartado de proyectos cancelados y prototipos (por ejemplo, Half-Life para Dreamcast, Episode Three o Return to Ravenholm) y otro de mods famosos de cada juego (por ejemplo, Black Mesa, Sven Co-op o Garry's Mod). Necesitarán sus propios tipos de datos (proyecto cancelado y mod, con juego base, autores, estado y fuentes); se diseñarán cuando toque.

**Varios idiomas (al final del proyecto, según Manuel):** selector de idioma y rutas por idioma (`/es/…`, `/en/…`). Los textos de la interfaz irán en archivos de traducción y los del contenido tendrán una versión por idioma en los datos. Las traducciones se generarán (con IA si conviene), se revisarán y quedarán guardadas en el proyecto, no se traducirán en el navegador. Mientras tanto se mantienen los textos en `src/data` y no repartidos por los componentes.

Half-Life 2, Ricochet y el resto del catálogo de Valve quedan fuera del contenido de la primera entrega, pero forman parte del objetivo global. Cada universo nuevo (Portal, Team Fortress, Counter-Strike, Left 4 Dead…) añadirá sus datos, su paleta y los hubs de sus juegos después de consolidar Half-Life y sus dos expansiones iniciales.
