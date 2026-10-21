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
- **Skills de diseño (`frontend-stack`, `impeccable`, `frontend-design`, `emil-design-eng`):** solo para revisar una página (accesibilidad, contraste, móvil, teclado) o en la fase de pulido, o cuando Manuel lo pida. Sus propuestas se entregan como pasos guiados, en CSS Modules + BEM y sin dependencias nuevas (nada de GSAP, Lenis, shadcn… sin pedirlo).
- **`andrej-karpathy-skills` y `ponytail` (lite):** cambios mínimos y sin adornos, pero nunca a costa de las explicaciones.
- **`claude-code-setup`:** solo para revisar la configuración de Claude Code.
