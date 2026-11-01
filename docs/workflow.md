# Forma de trabajar con las IA — ValveDex

**Para qué sirve este archivo:** recoge cómo trabajan Manuel y los asistentes (Claude Code, Codex, ChatGPT) en ValveDex, tal como se ha acordado en las sesiones de octubre de 2026. La memoria de Claude Code es local de cada PC y no viaja con Git: este archivo es la fuente común para los dos equipos. Las reglas estables siguen en [AGENTS.md](../AGENTS.md) y el punto de continuación en [STATUS.md](STATUS.md); si algo de aquí choca con una instrucción nueva de Manuel, manda la instrucción nueva y se actualiza este archivo.

## Reparto del trabajo

- **Lo grande y nuevo lo escribe Manuel, guiado:** páginas, componentes, tipos, funcionalidades y lógica nueva. El asistente explica y entrega el código; Manuel lo escribe o lo copia.
- **El asistente hace por su cuenta:**
  - Los pasos de **datos y contenido** (fichas, capítulos, armas, enemigos, lore, curiosidades…) y los **ajustes pequeños que los acompañan** (una etiqueta, un campo que se pinta en la ficha, un formato), con su rama, commit, PR y merge.
  - La **documentación** (STATUS, roadmap, design, architecture, CHANGELOG) al cerrar cada paso.
  - Los **arreglos que señala Codex** en su revisión, también sobre código que escribió Manuel, explicando qué era cada hallazgo y qué cambió.
- **Manuel puede pedir que el asistente haga cualquier paso** («haz tú el paso 3», «haz tú este U3c»). Entonces lo hace entero, lo comprueba y entrega el mensaje de commit y los comandos.
- Pasos grandes: se dividen en subpasos (U3a, U3b…) y no se pasa al siguiente hasta que Manuel lo confirma («siguiente»).

## Cómo explicar cada paso

- En español, directo y con los comandos para **CMD** de Windows (la terminal de Manuel).
- **Cada archivo nuevo empieza con «Para qué sirve»** (quién lo usa y qué problema resuelve) y después **«Qué hace cada parte»**. Manuel lo pidió expresamente: no basta con explicar las partes.
- En un archivo existente: las **líneas exactas** que cambian y por qué. Si el cambio es largo, el archivo entero para copiar.
- Antes de un paso que defina datos o rutas nuevas, preguntar solo lo que cambie el diseño (skill `grill-me` en Claude) y apuntar en STATUS lo que Manuel decida.
- Al terminar: qué cambió, cómo se comprobó y qué queda sin comprobar. Nunca presentar como comprobado algo que no se ha ejecutado.

## Git (GitHub Flow)

- Nunca en `main`. Una rama por funcionalidad (`feature/`, `fix/`, `docs/`…); **una rama = una funcionalidad completa**.
- **Pasos intermedios:** solo commit y push. **PR y merge, al terminar la funcionalidad** entera.
- **Primer push de una rama nueva:** `git push -u origin <rama>`. Los siguientes, `git push`. Manuel insiste en no confundirlos.
- **Mensaje de commit:** lo redacta el asistente y, salvo que Manuel pida lo contrario, lo escribe Manuel en Vim (`i` una vez, pegar, `Esc`, `:wq`). Formato: título Conventional Commits en español, línea en blanco y lista con `- ` (las continuaciones, sangradas con dos espacios).
- **El merge siempre lleva mensaje propio.** El asistente entrega el título y la lista del merge junto con los comandos:
  1. `notepad .git\MERGE_BODY.txt` → pegar la lista y guardar (con la barra `\`: en 2026-10-26 se perdió y el archivo acabó en la raíz).
  2. `gh pr create --base main --fill`
  3. `gh pr merge --merge --delete-branch --subject "Merge: <título>" --body-file .git\MERGE_BODY.txt`
  4. `git switch main && git pull --ff-only`
- **Tags y GitHub Releases:** solo cuando Manuel lo pide. El asistente avisa cuando ve un punto adecuado. Procedimiento en [STATUS.md](STATUS.md#versiones-del-proyecto).
- Antes de cambiar de PC: árbol limpio y rama subida. En el otro: `git fetch`, `git switch <rama>`, `git pull --ff-only` y, si cambiaron dependencias, `npm ci`.

## Revisión con Codex

- **Codex revisa cada paso**, en solo lectura. Nunca edita: si Manuel cree que Codex ya lo arregló, aclarar que solo revisa.
- En cada encargo, pedirle expresamente la skill **`token-efficient-workflow`** y un brief compacto: objetivo, archivos o commits, qué buscar, solo lectura y formato de respuesta (hallazgos con archivo:línea y gravedad).
- Añadir las skills de Codex que vengan al caso, por ejemplo `vercel-react-best-practices` para código de React y Next.js.
- Desde Claude Code se lanza con el plugin `codex` (`codex-companion.mjs task --effort low "…"`).
- **`claudex`** (`~/.local/bin/claudex.cmd`) abre Claude Code con un modelo de Codex detrás y un puente a las skills de Codex (`~/.agents/skills`). `claudex skills` las lista. Para revisar basta con Codex, que ya tiene esas skills; `claudex` sirve para abrir una sesión entera con ellas.
- El asistente arregla los hallazgos válidos, ejecuta `npm run check` y explica en breve cada uno. Si descarta alguno, dice por qué.

## Diseño

- Fase actual: **diseño provisional**. Manuel aprueba primeras versiones y pide mejorarlas después; no tratarlas como definitivas.
- En Claude, el router `frontend-stack` decide qué skill lidera cada parte (dirección, movimiento, revisión). `antislop` para los textos visibles.
- **Librerías autorizadas por Manuel** (React Bits, GSAP, Lenis, shadcn/ui, Three.js + React Three Fiber + drei): el asistente puede usarlas por iniciativa propia cuando mejoren la página, pero cada una se instala en el paso que la usa y explicando para qué sirve. Nada «por si acaso».
- Componentes propios en CSS Modules + BEM; el movimiento, en componentes de cliente aparte y siempre con movimiento reducido.
- **Muestras visuales:** cuando Manuel quiere ver una propuesta, el asistente la monta en una página temporal (`/muestra/…`, sin indexar), la abre en el navegador de Manuel y la borra al integrar la versión real.
- **Comprobación visual:** capturas a 1440 y 390 px sin scroll horizontal, contraste AA de los colores nuevos, clics reales y teclado (orden de tabulación, foco visible, Escape).

## Contenido

- Investigación a fondo: Combine OverWiki (`curl -sL -A "Mozilla/5.0" "https://combineoverwiki.net/index.php?title=<Página>&action=raw"`), el SDK de Valve, The Cutting Room Floor y foros; la Valve Developer Community bloquea descargas automáticas.
- Cada fuente con su tipo (`official`, `wiki` o `community`); lo que solo cuenta la comunidad se marca así.
- Sin spoilers fuera de `<details>` (`spoiler: true`); cifras (daño, salud, munición) solo con fuente de los archivos del juego; nunca inventar.
- **Imágenes (fase R, desde R3):** cada modelo del juego se convierte a `.glb` con `scripts/mdl-to-glb.mjs` (secuencia opcional) y se fotografía en el navegador con la cámara y la luz del visor 3D, fondo transparente y WebP sin pérdida; las parejas original/HD comparten encuadre. Ya no se usa Half-Life Asset Manager (movía el ratón y el teclado). El banco de capturas es una página temporal que no se versiona. Detalle en STATUS.

## Herramientas del PC de sobremesa (desde el 2026-10-27)

Instaladas según Manuel: Headroom, MemPalace (local), Task Observer, Graphify, SkillUI (CLI), las Agent Skills de Vercel (por ejemplo `vercel-react-best-practices`, `vercel-react-view-transitions` y `writing-guidelines`), Frontend Design, Claude Code Setup, Impeccable, UI/UX Pro Max, Supabase, Vercel, Chrome DevTools, Oh My ClaudeCode, el plugin oficial `codex@openai-codex` y Claudex. El portátil puede no tener las mismas.

- **Comprobar antes de usar:** que estén instaladas no obliga a usarlas; solo cuando la tarea lo pida, y siempre con las normas de este proyecto.
- **Memoria de sesiones:** `claude-mem` sigue desactivado en ValveDex (`.claude/settings.json`) porque MemPalace y claude-mem pueden guardar la misma sesión. No activar los dos.
- **Oh My ClaudeCode:** está habilitado, pero su configuración inicial sobre el `CLAUDE.md` global no se ha ejecutado. No ejecutarla sin que Manuel lo pida.
- **Graphify:** el grafo del proyecto se genera en `graphify-out/` (`graph.html`, `GRAPH_REPORT.md`, `graph.json`) y se consulta con `graphify query "<pregunta>"`. Está en `.gitignore`: el repositorio es público y esos archivos llevan rutas del PC. Primera versión, 2026-10-27: código y documentos, sin las imágenes.
- **Usos previstos en ValveDex:** Chrome DevTools para revisar páginas (peso y nitidez de las imágenes servidas, consola, rendimiento); las skills de Vercel, pedidas a Codex en las revisiones de código de React y Next.js (`vercel-react-best-practices`); Claudex, para abrir una sesión entera con las skills de Codex.

## Entorno y vistas previas

- Comprobaciones: `npm run check` (lint, tipos, formato y pruebas) y `npm run build`.
- Si Turbopack sirve archivos antiguos tras cambiar de rama, parar `npm run dev`, borrar `.next` y arrancarlo de nuevo. Si `npm run typecheck` falla con tipos de `.next/dev` que apuntan a archivos borrados, borrar `.next/dev`.
- Para enseñar una página sin tocar el servidor de Manuel: `npm run build` y `npx next start -p 3001`.

## Preparar Claude Code en otro PC

1. `git pull --ff-only` en `main` y `npm ci`.
2. Instalar los plugins que falten. `.claude/settings.json` (versionado) decide cuáles se usan en ValveDex y pone `ponytail` en `lite`.
3. Leer este archivo, [AGENTS.md](../AGENTS.md), [CLAUDE.md](../CLAUDE.md) y [STATUS.md](STATUS.md).
4. Comprobar que el plugin `codex` funciona y que Codex tiene la skill `token-efficient-workflow`.
5. Guardar en la memoria local de ese Claude un resumen de este archivo, sin copiarlo entero: este archivo sigue siendo la fuente.
