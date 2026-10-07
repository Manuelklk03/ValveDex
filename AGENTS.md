# Instrucciones para agentes — ValveDex

## Contexto y estado

ValveDex es una enciclopedia dedicada a todo el catálogo de juegos de Valve, incluidos Half-Life 2, Ricochet y las demás sagas. La primera entrega se limita a Half-Life, Opposing Force y Blue Shift. El objetivo es crear un portfolio sólido mientras Manuel aprende React y TypeScript.

Este documento define reglas estables. El avance actual se registra en [docs/STATUS.md](docs/STATUS.md): léelo en cada sesión y contrástalo con el repositorio. No supongas que existen rutas, dependencias, scripts, tests, una API o un despliegue por estar mencionados en la documentación. Las instrucciones vigentes de Manuel y los archivos actuales mandan sobre descripciones antiguas de conversaciones o del README.

## Antes de cambiar código

1. Lee este archivo y [docs/STATUS.md](docs/STATUS.md); después consulta [docs/architecture.md](docs/architecture.md), la entrega activa de [docs/roadmap.md](docs/roadmap.md) y [README.md](README.md) según la tarea.
2. Comprueba `git status`, la rama activa y si existe `package.json`. Solo cuando exista, consulta sus scripts con `npm run`, el lockfile y las configuraciones relevantes. Si falta, la aplicación no está inicializada en esa carpeta: no intentes `npm run check` ni inventes dependencias. Conserva los cambios ajenos a tu tarea.
3. Consulta las instrucciones más específicas de la carpeta que vayas a modificar, si existen.
4. Resume brevemente el objetivo de la tarea. Resuelve decisiones rutinarias dentro del alcance solicitado; pregunta solo cuando falte una decisión que cambie de forma sustancial ese alcance.

## Forma de ayudar a Manuel

- Responde en español, de forma directa y con pasos concretos.
- Explica brevemente el concepto que se practica y distingue React de Next.js cuando corresponda.
- Durante un paso de aprendizaje, identifica la parte que hará Manuel y la comprobación final. Si pide una implementación completa, hazla y explica después lo esencial.
- Proporciona comandos compatibles con la terminal indicada. Alacritty es el emulador: comprueba si utiliza PowerShell, CMD o Bash antes de dar comandos específicos del shell.
- Si entregas un archivo para que lo sustituya manualmente, proporciona su contenido completo y la ruta relativa al proyecto.
- Trabaja en la entrega solicitada; el roadmap no es una orden de implementar automáticamente todas las fases.

## Reglas de arquitectura

- Base elegida: React, Next.js App Router, TypeScript estricto y Tailwind CSS; CSS Modules con BEM para los estilos propios de componentes.
- `src/app` compone páginas, layouts y rutas. La lógica de cada funcionalidad vive en `src/features`.
- Los elementos compartidos van en `src/components`, `src/lib` y `src/domain` solo cuando corresponda por su responsabilidad.
- Los componentes comunes no importan funcionalidades. Evita dependencias circulares y que una funcionalidad importe detalles internos de otra.
- Conserva las fronteras de servidor y cliente. No añadas `"use client"` al layout raíz para resolver una interacción local. El código exclusivo de servidor no debe entrar en imports del cliente.
- Separa datos y presentación. Centraliza la lectura del catálogo; no copies las fichas dentro de las páginas.
- Crea carpetas y abstracciones cuando se necesiten. No añadas infraestructura, librerías de estado o capas por apariencia.

## Reglas de código y contenido

- Identificadores en inglés; interfaz, explicaciones y documentación en español. Componentes en PascalCase; funciones y variables en camelCase; carpetas y archivos en kebab-case, respetando los nombres especiales de Next.js.
- Props y datos tipados. No uses `any`, conversiones forzadas ni desactivaciones de reglas para ocultar un error.
- Estado mínimo y datos derivados calculados a partir de él. Usa efectos para sincronización externa, no para duplicar resultados de filtros en otro estado.
- Valida datos externos y parámetros antes de utilizarlos. TypeScript no valida JSON en ejecución.
- Las referencias de fichas usarán IDs estables. No inventes estadísticas ni relaciones del juego; registra fuentes y diferencias entre versiones.
- Mantén etiquetas, foco visible, controles de teclado y estados vacío/error/carga adecuados al comportamiento real.
- Usa npm y conserva su lockfile. Añade una dependencia solo si resuelve una necesidad de la entrega y explica cuál.
- Cuando existan credenciales, mantenlas fuera del repositorio y del código del navegador; documenta únicamente nombres y ejemplos ficticios.

## Convención BEM para los estilos

- Aplica BEM a las clases propias de CSS: `block`, `block__element`, `block--modifier` y `block__element--modifier`. Usa nombres en inglés y palabras en kebab-case.
- Nombra las clases por su función: `entry-card__title`, no por su posición o apariencia circunstancial.
- Un modificador acompaña a su clase base; no la sustituye. Usa `entry-card entry-card--featured` cuando corresponda.
- Evita cadenas como `entry-card__header__title`: los elementos pertenecen al bloque, aunque estén anidados en el marcado.
- Coloca el CSS propio de un componente en un `.module.css` junto a él. Usa el objeto importado en JSX, por ejemplo `className={styles["entry-card__title"]}`. Un nombre literal no enlaza una clase local transformada por CSS Modules.
- Conserva los nombres de las utilidades de Tailwind y las clases de librerías externas. No crees clases BEM vacías solo para acompañarlas.
- Decide qué sistema controla cada propiedad de un elemento; evita duplicarla entre Tailwind y CSS propio. No dependas del orden de las palabras en `className` para resolver conflictos.
- Reserva el CSS global para estilos comunes, variables y ajustes base. BEM no obliga a añadir clases a cada etiqueta ni cambia los nombres de componentes, variables o atributos HTML.
- Usa selectores de clase simples para los componentes. Evita IDs, cadenas profundas e `!important` para corregir problemas ordinarios de especificidad. Las pseudoclases y media queries mantienen los mismos nombres BEM.

El ejemplo de referencia está en [docs/architecture.md](docs/architecture.md). Revisa esta convención en cada cambio de estilos; Prettier y ESLint no garantizan por sí solos que el CSS siga BEM.

## Comprobaciones

Primero confirma que existe `package.json`; entonces consulta los scripts existentes con `npm run`. Los comandos objetivo están en la arquitectura o en la tarea de configuración; si falta alguno, indícalo o configúralo cuando sea parte de la tarea. Nunca presentes una comprobación pendiente como superada.

Para código, ejecuta lint, comprobación de tipos y las pruebas relacionadas que estén configuradas. Ejecuta el build al cerrar una entrega o modificar rutas, configuración o límites servidor/cliente. Para cambios visuales, revisa móvil, escritorio y teclado. Para documentación, revisa enlaces, comandos y coherencia con el código; no hace falta ejecutar toda la aplicación.

Prueba comportamientos importantes: filtros combinados, fichas inexistentes, integridad de referencias y persistencia de favoritos. No añadas pruebas que solo repitan la implementación. Para recorridos que involucren componentes de servidor asíncronos, usa pruebas de navegador según la compatibilidad real de las herramientas.

## Continuidad entre Claude, ChatGPT y Codex

- `AGENTS.md` contiene las reglas comunes. `CLAUDE.md` importa esas reglas para Claude Code; no mantengas una segunda copia distinta.
- `docs/STATUS.md` contiene el punto de continuación. Actualízalo al cerrar cada tarea real con fecha, cambios, comprobaciones y siguiente paso.
- Una respuesta con instrucciones o archivos descargables no demuestra que Manuel los haya aplicado. Distingue «preparado», «aplicado por el usuario» y «verificado».
- Al cambiar de IA, entrega o lee las versiones actuales del repositorio. El chat de una herramienta no se comparte automáticamente con otra.
- Si trabajas solo por chat, pide únicamente los archivos o resultados necesarios que no puedas inspeccionar. Explica esa limitación; no afirmes que has accedido al PC.
- Antes de empezar, revisa cambios de la sesión anterior. Evita que dos herramientas editen a la vez los mismos archivos del mismo checkout; usa ramas o copias separadas cuando haga falta.
- Mantén una tarea acotada por sesión. Al terminar, deja explícitos los cambios sin commit y los bloqueos, si los hay.

## Documentación y cierre

- Actualiza el README cuando corresponda al alcance solicitado. Manuel ha aplazado su mejora visual y la retirada de la sección de instalación local: conserva esta tarea en el roadmap y no la hagas durante el arranque técnico.
- Actualiza arquitectura cuando cambien responsabilidades o decisiones técnicas.
- Actualiza estas instrucciones si cambian las normas de trabajo.
- Anota cambios completados relevantes en «Sin publicar» del changelog. Las funciones futuras pertenecen al roadmap.
- Marca un objetivo como completado únicamente con evidencia de su implementación y comprobación.
- Usa mensajes de commit tipo `feat(catalog): añadir filtro por juego` o `docs: documentar el arranque`, siguiendo Conventional Commits cuando se realicen commits.
- Al terminar, comunica qué cambió, cómo se comprobó y qué limitación queda. No inventes comandos ejecutados, resultados, métricas o publicaciones.

Formato de referencia: [AGENTS.md](https://agents.md/). Si una herramienta no descubre este archivo automáticamente, indícale explícitamente que lo lea; no mantengas copias divergentes de estas reglas.
