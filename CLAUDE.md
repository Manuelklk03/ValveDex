# Claude — ValveDex

@AGENTS.md
@docs/STATUS.md

Las reglas comunes y el estado se mantienen en los archivos importados.
Consulta `docs/architecture.md` y `docs/roadmap.md` cuando la tarea lo requiera.
Comprueba los archivos reales antes de continuar y actualiza `docs/STATUS.md` al cerrar la tarea.

En Claude web, adjunta también los archivos referenciados y el código relevante: las importaciones de Claude Code no sustituyen a los adjuntos de un chat web.

## Plugins de Claude Code en ValveDex

`.claude/settings.json` decide qué plugins están activos en el proyecto (y pone `ponytail` en `lite`). Si un plugin pide otra forma de trabajar, mandan `AGENTS.md` y el modo guiado: Manuel escribe el código y el asistente explica.

- **`grill-me`:** úsalo por iniciativa propia antes de un paso que defina datos o rutas nuevas (por ejemplo, campos por categoría, proyectos cancelados y mods, el buscador de `/explorar`). Haz las preguntas que cambien el diseño, no las de rutina, y apunta en `STATUS.md` lo que Manuel decida.
- **`antislop`:** úsalo por iniciativa propia para revisar textos visibles (portada, fichas, lore, README) y las páginas nuevas antes de cerrar un paso. Entrega los hallazgos como cambios guiados, con líneas exactas.
- **Skills de diseño (fase de diseño, desde el 2026-10-23):** `frontend-stack` es el director: decide qué skill lidera cada parte (dirección visual, tipografía, color, movimiento) y resuelve los conflictos entre ellas. Apoyan `impeccable`, `frontend-design`, `emil-design-eng`, `taste`, `ui-ux-pro-max` e `imagegen-skills` (referencias visuales y recursos). Sus propuestas se entregan como pasos guiados: Manuel escribe el código.
- **Dependencias de diseño:** permitidas GSAP, Lenis, React Bits, shadcn/ui y Three.js + React Three Fiber (+ drei), pero **cada una se instala en el paso en el que se usa por primera vez**, explicando para qué sirve. Nada se instala «por si acaso».
- **Estilos:** los componentes propios siguen con CSS Modules + BEM. Los componentes de shadcn/ui usan sus utilidades de Tailwind tal cual; sus colores salen de las mismas variables CSS de los temas. Detalle en `docs/architecture.md`.
- **`andrej-karpathy-skills` y `ponytail` (lite):** cambios mínimos y sin adornos, pero nunca a costa de las explicaciones.
- **`claude-code-setup`:** solo para revisar la configuración de Claude Code.

Siguen desactivados en el proyecto `caveman`, `superpowers` y `claude-mem`, porque recortan las explicaciones o imponen otro flujo. Fase actual: **diseño** (ver [docs/roadmap.md](docs/roadmap.md#fase-de-diseño-después-del-esqueleto)).
