# Estado actual — ValveDex

Última actualización: **2026-10-07**.  
Fuente de esta actualización: confirmación de Manuel y salida de su terminal.  
Este archivo es el punto de continuación entre Claude, ChatGPT y Codex.

## Estado confirmado

- Manuel ha creado un repositorio nuevo y solo ha incorporado el README.
- La aplicación Next.js todavía no está inicializada en ese repositorio.
- `npm run check` falla con `ENOENT` porque falta `package.json` en la carpeta desde la que se ejecuta.
- La terminal mostrada es CMD en Windows. La carpeta activa está en `Desktop\ValveDex\ValveDex`.
- La repetición de `ValveDex` en la ruta no demuestra por sí sola un problema: primero hay que crear la aplicación en la raíz real del repositorio.
- Los archivos de configuración y el package.json compartidos en mensajes anteriores no describen este repositorio nuevo.
- Los documentos de este paquete están preparados. Su copia al repositorio todavía no está confirmada.

## Qué existe y qué falta

| Elemento                                          | Estado                                       |
| ------------------------------------------------- | -------------------------------------------- |
| Repositorio y README                              | Creados, según Manuel                        |
| AGENTS, CLAUDE, arquitectura, roadmap y changelog | Preparados para incorporarlos                |
| package.json y código de Next.js                  | Pendientes de crear en el repositorio actual |
| Dependencias y lockfile                           | Pendientes de instalar y comprobar           |
| ESLint, Prettier y scripts de calidad             | Pendientes de configurar y ejecutar          |
| Interfaz, catálogo y datos                        | Pendientes                                   |
| Tests, CI y despliegue                            | Pendientes                                   |

El README contiene presentación y planificación. Cualquier frase antigua que dé por creada la base de la aplicación debe contrastarse con esta confirmación y con los archivos reales.

## Decisiones vigentes

- Producto: enciclopedia de todos los juegos de Valve, incorporados por fases.
- Primera entrega: Half-Life, Opposing Force y Blue Shift.
- Después: Half-Life 2, Ricochet y el resto del catálogo.
- Stack elegido: React + Next.js App Router + TypeScript + npm.
- Estilos: Tailwind y CSS Modules con BEM para el CSS propio.
- Objetivo: proyecto de portfolio y aprendizaje práctico de frontend React.
- Revisión visual del README y retirada de su sección de instalación local: aplazadas por Manuel. No modificar el README durante el arranque técnico.
- Backend, base de datos y despliegue: sin decisión definitiva.

## Tarea inmediata

**Inicializar Next.js en el repositorio existente conservando su README y su historial Git.**

1. Comprobar Node.js, npm, Git y la raíz del repositorio.
2. Generar la base en una carpeta temporal hermana con nombre en minúsculas, sin otro repositorio Git ni instalación de dependencias.
3. Copiar los archivos generados a la raíz del repositorio existente, excluyendo README y los archivos de instrucciones de agentes ya preparados.
4. Poner `valvedex` como nombre del paquete e instalar dependencias en el repositorio final.
5. Arrancar con `npm run dev` y comprobar la página inicial en el navegador.
6. Actualizar este estado con las versiones y resultados reales.

No ejecutar `npm run check` hasta haber creado `package.json` y configurado ese script. No crear un package.json vacío con `npm init -y` como sustituto del proyecto Next.js.

## Siguiente tarea, después del arranque

Configurar y comprobar ESLint, Prettier, TypeScript y los scripts de calidad. Después crear la estructura inicial y la primera pantalla en una rama como `feat/base-layout`.

## Git y comprobaciones

- URL del repositorio actual: pendiente de conocer.
- Rama activa y último commit: pendientes de consultar.
- Cambios locales sin commit: pendientes de consultar.
- Error confirmado: `npm run check` → `ENOENT: package.json no existe`.
- Instalación, lint, tipos, formato y build: no ejecutados con éxito en el repositorio actual según la información disponible.
- Página inicial en navegador: pendiente de comprobar.

## Cómo actualizar este archivo

Al terminar una tarea, actualiza el contenido anterior para que describa el estado vigente, sin acumular copias completas de sesiones antiguas. Registra:

- Fecha y quién aporta la evidencia: agente con acceso al repositorio o confirmación del usuario.
- Qué se ha aplicado y qué archivos han cambiado.
- Rama y commit, solo si se han consultado; cambios sin commit, si existen.
- Comandos ejecutados y resultados reales; revisiones manuales realizadas.
- Bloqueos pendientes y una siguiente tarea concreta.

Si solo se entregan instrucciones, indica «preparadas, pendientes de aplicar». Marca tareas del roadmap solo al completarlas; registra cambios relevantes terminados en CHANGELOG.

## Para continuar en otra IA

Comparte el repositorio actualizado o, como mínimo, `AGENTS.md`, `CLAUDE.md`, este archivo, `architecture.md`, `roadmap.md` y los archivos de código afectados. Ningún chat conoce automáticamente los cambios hechos en otro.
