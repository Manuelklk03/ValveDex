ValveDex
El universo de Valve, ficha a ficha.
ValveDex es una enciclopedia interactiva de videojuegos de Valve, inspirada en una Pokédex. Su objetivo es reunir personajes, armas, enemigos, objetos, mapas y localizaciones en una web donde consultar sus características y descubrir cómo se relacionan.
La primera etapa se centra en Half-Life, Half-Life: Opposing Force y Half-Life: Blue Shift.
Proyecto personal desarrollado por Manuel Casinos Pérez para su portfolio, con el objetivo de reforzar React, TypeScript y Next.js mediante una aplicación completa y documentada.
Estado del proyecto
En desarrollo · Configuración inicial.
La base del proyecto está creada con Next.js, React y TypeScript. El trabajo actual se centra en preparar las herramientas de desarrollo y construir la primera interfaz.
Las funcionalidades descritas a continuación son objetivos del proyecto y todavía no están disponibles. Las capturas y el enlace a la demo se añadirán cuando exista una versión navegable.
Alcance inicial
Juego	Contenido previsto
Half-Life	Catálogo del juego original.
Half-Life: Opposing Force	Contenido propio de la expansión y sus diferencias respecto al original.
Half-Life: Blue Shift	Contenido propio de la expansión y sus conexiones con los otros juegos.


El catálogo incluirá personajes, enemigos, armas, objetos, mapas y localizaciones, capítulos y facciones. Las fichas compartidas entre juegos tendrán una identidad común y recogerán sus diferencias cuando corresponda.
La incorporación de otros juegos de Valve queda para fases posteriores.
Funcionalidades previstas
- Catálogo por juego y categoría: explorar el contenido de cada título.
- Fichas de detalle: consultar descripciones, características, apariciones y contenido relacionado.
- Búsqueda, filtros y ordenación: encontrar fichas y compartir enlaces con los filtros aplicados.
- Favoritos: guardar fichas en el navegador para consultarlas más tarde.
- Comparador de armas: comparar armas del mismo juego con estadísticas equivalentes.
- Control de spoilers: decidir cuándo mostrar información que pueda revelar partes de la historia.
- Diseño responsive y accesible: navegar desde móvil, tableta u ordenador, también mediante teclado.
Tecnologías
Tecnología	Uso
React	Construcción de la interfaz mediante componentes.
Next.js · App Router	Rutas, páginas y renderizado de la aplicación.
TypeScript	Tipado de componentes, propiedades y datos.
Tailwind CSS	Utilidades para los estilos.
ESLint	Revisión del código.
npm	Gestión de dependencias y comandos.
Git y GitHub	Control de versiones y documentación del proyecto.


Las versiones de las dependencias se consultan en package.json y package-lock.json.
Prettier y las comprobaciones adicionales de calidad forman parte de la configuración inicial en curso. Las pruebas con Vitest, React Testing Library y Playwright, junto con la integración continua mediante GitHub Actions, se incorporarán en las fases correspondientes.
Organización y estilos
La arquitectura se organizará por funcionalidades, separando las rutas, los componentes compartidos, los datos y la lógica del catálogo. Las carpetas se incorporarán conforme hagan falta.
Ubicación prevista	Responsabilidad
src/app/	Páginas, rutas y layouts de Next.js.
src/features/	Funcionalidades como catálogo, favoritos y comparador.
src/components/	Componentes compartidos de interfaz y estructura.
src/domain/	Tipos y modelos del contenido.
src/data/	Datos locales del catálogo inicial.
src/lib/	Utilidades compartidas.
public/	Recursos estáticos.
docs/	Arquitectura y planificación.


El CSS propio de los componentes utilizará CSS Modules y BEM:
- Bloque: entry-card.
- Elemento: entry-card__title.
- Modificador: entry-card--featured, acompañado de la clase base.
Las utilidades de Tailwind mantendrán sus nombres. Se evitará definir una misma propiedad con Tailwind y CSS propio en el mismo elemento.
Las decisiones completas están en [Arquitectura](docs/architecture.md).
Ejecutar en local
Requisitos
- Node.js en una versión LTS compatible con la versión de Next.js del proyecto.
- npm.
- Git, si se va a clonar el repositorio.
Instalación
1. Clona el repositorio con la URL que aparece en el botón Code de GitHub, o descarga y extrae su ZIP.
2. Abre una terminal en la raíz del proyecto, donde están package.json y package-lock.json.
3. Instala las dependencias y arranca el servidor:
npm ci
npm run dev
Abre http://localhost:3000, o la dirección que indique la terminal. Para detener el servidor, pulsa Ctrl + C.
Comandos de la base del proyecto
Comando	Función
npm run dev	Iniciar el servidor de desarrollo.
npm run build	Generar la compilación de producción.
npm run start	Servir la compilación de producción, después de ejecutar build.
npm run lint	Revisar el código con ESLint.


Los comandos typecheck, format, format:check, lint:fix y check se incorporarán durante la configuración de calidad. Para consultar los scripts disponibles en tu copia:
npm run
Desarrollo y documentación
El trabajo se organizará en tareas y ramas por funcionalidad, con cambios pequeños y revisables. Cada avance irá acompañado de la actualización de los documentos que le correspondan.
Documento	Contenido
[README.md](README.md)	Presentación, estado e instrucciones de ejecución.
[AGENTS.md](AGENTS.md)	Contexto y pautas para trabajar con asistentes y agentes de IA.
[Arquitectura](docs/architecture.md)	Organización del código, modelos y decisiones técnicas.
[CHANGELOG.md](CHANGELOG.md)	Historial de cambios relevantes.
[Roadmap](docs/roadmap.md)	Fases, tareas y objetivos pendientes.


Próximos pasos
- Completar la configuración de calidad del código.
- Crear la estructura visual y la navegación.
- Definir los modelos e incorporar las primeras fichas.
- Implementar búsqueda, filtros y páginas de detalle.
- Añadir favoritos, control de spoilers y comparación.
- Incorporar pruebas, automatizar comprobaciones y publicar una demo.
La API, la base de datos y la gestión de contenido se valorarán en una fase posterior. El alcance detallado se mantiene en el [roadmap](docs/roadmap.md).
Fuentes y recursos
ValveDex es un proyecto de fans independiente, sin afiliación oficial con Valve.
Las fichas incluirán referencias a sus fuentes. Las imágenes y otros recursos de terceros se incorporarán teniendo en cuenta su procedencia y sus condiciones de uso. No se publicarán estadísticas inventadas.
La licencia del código está pendiente de elección. Cualquier licencia que se añada al código propio no se aplicará automáticamente a marcas, imágenes ni otros contenidos de terceros.
Autor
Manuel Casinos Pérez
- GitHub
- LinkedIn
