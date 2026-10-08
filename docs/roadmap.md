# Roadmap de ValveDex

Estado inicial: **2026-09-30**. Plan de trabajo personal; el orden puede ajustarse según lo aprendido. Las casillas solo se marcarán con trabajo comprobado.

Última actualización: **2026-10-07**.

Objetivo global: cubrir Valve y todos sus juegos de forma progresiva, con la navegación Valve → Universos → Juego descrita en la [arquitectura](architecture.md). La primera fase de contenido mantiene el universo Half-Life con Half-Life, Opposing Force y Blue Shift. Consulta [STATUS.md](STATUS.md) para saber dónde retomar el trabajo.

## Entrega 0 — Base y documentación

- [x] Preparar los cinco documentos iniciales.
- [x] Definir BEM para las clases propias y su uso con CSS Modules y Tailwind.
- [x] Preparar CLAUDE.md y STATUS.md para dar continuidad entre asistentes.
- [x] Integrarlos con los archivos reales del proyecto.
- [x] Crear o comprobar la aplicación Next.js, TypeScript y Tailwind (build comprobado el 2026-10-07).
- [ ] Registrar la versión compatible de Node.js y mantener el lockfile de npm. El lockfile existe; falta registrar Node.
- [x] Configurar y ejecutar ESLint, TypeScript y Prettier (`npm run check` superado el 2026-10-07).
- [ ] Fijar finales de línea LF con `.gitattributes` para que Prettier no falle en Windows.
- [x] Crear el repositorio con el README, según confirmación de Manuel del 2026-10-07.
- [ ] Preparar una primera CI de lint, tipos, formato y build.

**Se acepta cuando:** Manuel puede instalar y arrancar el proyecto en su entorno de desarrollo y las comprobaciones de esta entrega funcionan. La documentación preparada por sí sola no completa esta fase.

## Entrega 1 — Primer recorrido navegable

- [ ] Definir la paleta base de Valve en variables CSS y el layout adaptable (cabecera con Inicio y Universos, pie).
- [ ] Aplicar BEM al CSS propio y enlazar las clases de CSS Modules desde JSX.
- [ ] Revisar modificadores, selectores y convivencia con las utilidades de Tailwind.
- [ ] Portada sobre Valve: la empresa, Steam e historia, con datos verificados y fuentes.
- [ ] Página `/universos` con todos los universos de Valve; los que aún no tengan contenido, marcados como «próximamente».
- [ ] Página de universo con su paleta propia (empezando por Half-Life) y la lista de sus juegos.
- [ ] Hub de juego para Half-Life, Opposing Force y Blue Shift con sus apartados (lore, mapas, armas, personajes, enemigos, curiosidades, easter eggs).
- [ ] Ficha individual enlazada desde los apartados del hub.
- [ ] Preparar datos reales de los tres juegos con una muestra de cada categoría inicial.
- [ ] Registrar las fuentes y los recursos visuales utilizados.
- [ ] Mostrar relaciones entre fichas y una página 404 útil.
- [ ] Incorporar comprobaciones de integridad de datos y un recorrido E2E.

**Se acepta cuando:** desde la portada se llega a Universos → Half-Life → cada uno de sus tres juegos → un apartado → una ficha, y se sigue una relación sin enlaces rotos, con la paleta del universo aplicada, en móvil y escritorio.

**React que practicaremos:** JSX, componentes, props, listas, claves estables y composición.

**CSS que practicaremos:** bloques, elementos y modificadores BEM; CSS Modules; variables CSS y temas por cascada; responsive y especificidad.

## Entrega 2 — Hub principal, búsqueda y filtros

- [ ] Crear el hub `/explorar` con buscador global y un carrusel horizontal por categoría (armas, mapas, personajes, enemigos…).
- [ ] Filtrar todos los carruseles con la búsqueda, ocultar filas vacías y mostrar «sin resultados».
- [ ] Enlazar «Ver todo» de cada fila al listado completo de esa categoría.
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

## Ampliación posterior

Half-Life 2, Ricochet y el resto del catálogo de Valve quedan fuera del contenido de la primera entrega, pero forman parte del objetivo global. Cada universo nuevo (Portal, Team Fortress, Counter-Strike, Left 4 Dead…) añadirá sus datos, su paleta y los hubs de sus juegos después de consolidar Half-Life y sus dos expansiones iniciales.
