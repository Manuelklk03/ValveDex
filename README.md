<h1 align="center">λ ValveDex</h1>

<p align="center">
  <strong>Todos los juegos de Valve. Un universo por explorar.</strong>
</p>

<p align="center">
  <img src="https://combineoverwiki.net/images/f/fc/Valvhead.jpg" alt="El hombre de la introducción de Valve, con una válvula roja en la parte posterior de la cabeza" width="560" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&amp;logo=nextdotjs&amp;logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&amp;logo=tailwindcss&amp;logoColor=38BDF8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&amp;logo=eslint&amp;logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&amp;logo=prettier&amp;logoColor=F7B93E" alt="Prettier" />
</p>

<p align="center">
  <strong>🚧 En desarrollo · 🎮 Proyecto de portfolio · 📚 Wiki interactiva</strong>
</p>

<p align="center">
  <a href="#-qué-es-valvedex">Qué es</a> ·
  <a href="#-cómo-se-recorre">Cómo se recorre</a> ·
  <a href="#-estado-del-proyecto">Estado</a> ·
  <a href="#-funcionalidades">Funcionalidades</a> ·
  <a href="#️-tecnologías">Tecnologías</a> ·
  <a href="#-ejecutar-en-local">Ejecutar en local</a>
</p>

---

## 🎮 ¿Qué es ValveDex?

**ValveDex** es una enciclopedia interactiva dedicada a **Valve y a todo su catálogo de juegos**, inspirada en una Pokédex. Reúne la historia de la compañía, sus sagas y, dentro de cada juego, su lore, mapas, armas, personajes, enemigos, curiosidades y easter eggs, con fuentes para cada dato.

Desde los laboratorios de **Half-Life** y **Portal** hasta las partidas de **Counter-Strike**, **Team Fortress**, **Left 4 Dead** y **Dota**: la idea es tener todo Valve en un mismo lugar, **incluidas las expansiones, los clásicos, los proyectos cancelados y los mods más famosos**.

El contenido se incorpora de forma progresiva. **Empezamos por el universo Half-Life con Half-Life, Opposing Force y Blue Shift**, y después ampliaremos la enciclopedia con el resto de sagas y juegos.

Proyecto personal desarrollado por **Manuel Casinos Pérez** para su portfolio, con el objetivo de reforzar React, TypeScript y Next.js mediante una aplicación completa y documentada.

## 🧭 Cómo se recorre

```text
Valve (portada)  →  Universos  →  Universo  →  Juego  →  Apartado  →  Ficha
       /             /universos   /half-life   /half-life  /armas   /fichas/escopeta
```

| Nivel | Qué encontrarás | Aspecto |
| --- | --- | --- |
| 🏠 **Portada** | Valve como empresa, Steam y la historia de la compañía con una cronología. | Paleta oscura de estilo Valve y Steam. |
| 🌌 **Universos** | Todas las sagas de Valve; las que aún no tienen contenido aparecen como «Próximamente». | Paleta de Valve. |
| ☢️ **Universo** | Los juegos de la saga, con año y desarrollador. | Cada universo tiene **su propia paleta** (Half-Life: gris industrial y naranja HEV). |
| 🎮 **Juego** | Hub con lore, mapas, armas, personajes, enemigos, curiosidades y easter eggs. | Cada juego puede tener **su propio tema** (Opposing Force: verde militar; Blue Shift: azul de seguridad). |
| 🗂️ **Apartado** | Las fichas de una categoría en ese juego (por ejemplo, sus armas). | Tema del juego. |
| 📖 **Ficha** | Descripción, juegos en los que aparece y fuentes. | Tema del primer juego en el que aparece. |

Más adelante, un hub **Explorar** reunirá todo el contenido con un buscador global y carruseles por categoría.

## 🕹️ Un proyecto para todo el catálogo de Valve

<table align="center">
  <tr>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/70/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/70/95be6d131fc61f145797317ca437c9765f24b41c.jpg" width="48" height="48" alt="Half-Life" /><br />
        <strong>Half-Life</strong>
      </a>
    </td>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/400/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/400/cfa928ab4119dd137e50d728e8fe703e4e970aff.jpg" width="48" height="48" alt="Portal" /><br />
        <strong>Portal</strong>
      </a>
    </td>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/730/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/730/8dbc71957312bbd3baea65848b545be9eae2a355.jpg" width="48" height="48" alt="Counter-Strike" /><br />
        <strong>Counter-Strike</strong>
      </a>
    </td>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/440/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/440/f568912870a4684f9ec76277a1a404dda6bab213.jpg" width="48" height="48" alt="Team Fortress" /><br />
        <strong>Team Fortress</strong>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/550/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/550/7d5a243f9500d2f8467312822f8af2a2928777ed.jpg" width="48" height="48" alt="Left 4 Dead" /><br />
        <strong>Left 4 Dead</strong>
      </a>
    </td>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/570/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/570/48eb825bb93787945065b460bdc109e395384ebf.jpg" width="48" height="48" alt="Dota" /><br />
        <strong>Dota</strong>
      </a>
    </td>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/300/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/300/062754bb5853b0534283ae27dc5d58200692b22d.jpg" width="48" height="48" alt="Day of Defeat" /><br />
        <strong>Day of Defeat</strong>
      </a>
    </td>
    <td align="center" width="160">
      <a href="https://store.steampowered.com/app/1422450/">
        <img src="https://shared.fastly.steamstatic.com/community_assets/images/apps/1422450/f6da1420a173324d49bcd470fa3eee781ad0fa5e.jpg" width="48" height="48" alt="Deadlock" /><br />
        <strong>Deadlock</strong>
      </a>
    </td>
  </tr>
</table>

Estas son algunas de las sagas que formarán parte de ValveDex. El alcance incluye **todo el catálogo de videojuegos de Valve**:

- 🎮 **Juegos principales y expansiones** de cada saga.
- 🕰️ **Clásicos** y títulos que no aparecen en esta selección.
- 🗃️ **Proyectos cancelados y prototipos** que nunca llegaron a publicarse.
- 🧩 **Mods famosos** de cada juego, muchos de ellos origen de juegos oficiales.
- 🏢 **Valve como empresa:** su historia, Steam, sus motores y su hardware.

## 🚧 Estado del proyecto

**En desarrollo · Primer recorrido navegable.**

Ya se puede navegar desde la portada hasta la ficha de cada arma de Half-Life. Todavía no hay demo publicada: las capturas y el enlace se añadirán cuando exista una versión desplegada.

| Parte | Estado |
| --- | --- |
| 🏠 Portada sobre Valve y Steam, con cronología de la compañía | ✅ Hecha |
| 🧱 Cabecera, pie y paleta base de Valve | ✅ Hechas |
| 🌌 Página de universos con «Próximamente» | ✅ Hecha |
| ☢️ Página de universo con paleta propia y 404 para universos inexistentes | ✅ Hecha |
| 🎮 Hub de juego con tema propio y apartados | ✅ Hecho |
| 📖 Apartados y fichas | 🛠️ En curso (primeras armas de Half-Life) |
| 🔎 Hub Explorar con buscador y carruseles | 📋 Previsto |
| ⭐ Favoritos, comparador y control de spoilers | 📋 Previsto |
| 🗃️ Proyectos cancelados y 🧩 mods famosos | 📋 Previsto |
| 🌍 Varios idiomas con selector | 📋 Previsto para el final |
| 🚀 Demo publicada | 📋 Pendiente |

El estado detallado de cada paso está en [docs/STATUS.md](docs/STATUS.md).

## ☢️ Primera fase: universo Half-Life

| Juego | Año | Desarrollo | Contenido previsto |
| --- | --- | --- | --- |
| Half-Life | 1998 | Valve | Catálogo del juego original. |
| Half-Life: Opposing Force | 1999 | Gearbox Software | Contenido propio de la expansión y sus diferencias respecto al original. |
| Half-Life: Blue Shift | 2001 | Gearbox Software | Contenido propio de la expansión y sus conexiones con los otros juegos. |

Cada juego tendrá lore, mapas, armas, personajes, enemigos, curiosidades y easter eggs. Las fichas compartidas entre juegos tendrán una identidad común y recogerán sus diferencias cuando corresponda.

Después se completará **todo el universo Half-Life**, y a continuación el resto de sagas.

### 🌌 El universo Half-Life al completo

| Juego | Año | Desarrollo | Tipo |
| --- | --- | --- | --- |
| Half-Life | 1998 | Valve | Juego original |
| Half-Life: Uplink | 1999 | Valve | Demo con contenido exclusivo |
| Half-Life: Opposing Force | 1999 | Gearbox Software | Expansión |
| Half-Life: Blue Shift | 2001 | Gearbox Software | Expansión |
| Half-Life: Decay | 2001 | Gearbox Software | Expansión cooperativa (PlayStation 2) |
| Half-Life: Source | 2004 | Valve | Versión en el motor Source |
| Half-Life 2 | 2004 | Valve | Secuela |
| Half-Life 2: Deathmatch | 2004 | Valve | Multijugador |
| Half-Life 2: Lost Coast | 2005 | Valve | Nivel tecnológico |
| Half-Life 2: Episode One | 2006 | Valve | Episodio |
| Half-Life Deathmatch: Source | 2006 | Valve | Multijugador |
| Half-Life 2: Survivor | 2006 | Taito / Valve | Versión arcade (Japón) |
| Half-Life 2: Episode Two | 2007 | Valve | Episodio |
| Half-Life: Alyx | 2020 | Valve | Precuela en realidad virtual |

**🗃️ Proyectos cancelados**

| Proyecto | Desarrollo | Qué era |
| --- | --- | --- |
| Half-Life para Dreamcast | Gearbox Software | Versión para consola, origen de Blue Shift |
| Half-Life 2: Episode Three | Valve | Cierre previsto de la trilogía de episodios |
| Return to Ravenholm | Arkane Studios | Episodio ambientado en Ravenholm |

**🧩 Mods famosos**

| Juego base | Mods |
| --- | --- |
| Half-Life | Counter-Strike y Day of Defeat (después juegos oficiales), Sven Co-op, They Hunger, Natural Selection, Black Mesa (remake, después comercial) |
| Half-Life 2 | Garry's Mod (después comercial), Synergy, MINERVA: Metastasis, Entropy: Zero |

> Lista en revisión: cada juego, proyecto y mod se contrastará con sus fuentes antes de publicarse en la web. Cada saga de Valve tendrá su propio apartado de cancelados y de mods.

## ✨ Funcionalidades

**Disponibles**

- 🧭 **Navegación por niveles:** Valve → Universos → Universo → Juego → Apartado → Ficha.
- 🎨 **Temas por universo y por juego:** la paleta cambia al entrar en cada saga o juego, sin JavaScript en el cliente.
- 📖 **Fichas** con los juegos en los que aparece cada elemento y sus fuentes.
- 🕰️ **Cronología de Valve** con fuentes enlazadas.
- 🚫 **Páginas 404** para universos, juegos, apartados y fichas inexistentes.
- ♿ **Base accesible:** HTML semántico, foco visible y navegación por teclado.

**Previstas**

- 📖 **Más fichas:** personajes, enemigos, mapas, curiosidades y easter eggs de cada juego, con su contenido relacionado.
- 🔎 **Hub Explorar:** buscador global con carruseles por categoría que mezclan todos los juegos.
- 🎛️ **Búsqueda, filtros y ordenación:** encontrar fichas y compartir enlaces con los filtros aplicados.
- ⭐ **Favoritos:** guardar fichas en el navegador para consultarlas más tarde.
- ⚔️ **Comparador de armas:** comparar armas del mismo juego con estadísticas equivalentes.
- 🙈 **Control de spoilers:** decidir cuándo mostrar información que pueda revelar partes de la historia.
- 🗃️ **Proyectos cancelados:** apartado propio para juegos y prototipos que no llegaron a publicarse.
- 🧩 **Mods famosos:** apartado en cada juego con los mods más conocidos, su historia y su relación con los juegos oficiales.
- 🌍 **Varios idiomas:** selector de idioma con traducciones revisadas.
- 📱 **Diseño responsive:** navegar desde móvil, tableta u ordenador.

## 🛠️ Tecnologías

| Tecnología | Uso |
| --- | --- |
| React 19 | Construcción de la interfaz mediante componentes. |
| Next.js 16 · App Router | Rutas dinámicas, layouts anidados, metadatos y prerenderizado. |
| TypeScript (modo estricto) | Tipado de componentes, propiedades y datos. |
| Tailwind CSS 4 | Variables de tema y utilidades. |
| CSS Modules + BEM | Estilos propios de cada componente. |
| ESLint y Prettier | Revisión y formato del código. |
| npm | Gestión de dependencias y comandos. |
| Git, GitHub y GitHub CLI | Ramas por funcionalidad y Pull Requests. |

Las versiones exactas están en `package.json` y `package-lock.json`.

Las pruebas con Vitest, React Testing Library y Playwright, junto con la integración continua mediante GitHub Actions, se incorporarán en las fases correspondientes.

## 🧱 Organización y estilos

La arquitectura se organiza por funcionalidades, separando rutas, componentes compartidos, tipos, datos y lógica de lectura.

| Ubicación | Responsabilidad |
| --- | --- |
| `src/app/` | Páginas, rutas y layouts de Next.js (`/universos/[universeSlug]/[gameSlug]/[sectionSlug]`, `/fichas/[entrySlug]`). |
| `src/features/` | Funcionalidades: `valve`, `universes`, `games`, `catalog` y, más adelante, favoritos y comparador. |
| `src/components/` | Componentes compartidos: cabecera, pie y piezas reutilizables como la cronología. |
| `src/domain/` | Tipos del contenido: universos, juegos, apartados, fichas, hitos y fuentes. |
| `src/data/` | Datos locales del catálogo, con sus fuentes. |
| `public/` | Recursos estáticos. |
| `docs/` | Arquitectura, planificación y estado. |

**Temas por variables CSS.** Los componentes solo usan variables (`--background`, `--accent`…). Cada universo y cada juego las redefine con una clase modificadora y la cascada hace el resto:

```text
Paleta de Valve  →  universe-theme--half-life  →  game-theme--half-life-opposing-force
```

El CSS propio de los componentes utiliza **CSS Modules y BEM**:

- Bloque: `universe-card`.
- Elemento: `universe-card__title`.
- Modificador: `universe-card--coming-soon`, acompañado de la clase base.

Las utilidades de Tailwind mantienen sus nombres. Se evita definir una misma propiedad con Tailwind y CSS propio en el mismo elemento.

Las decisiones completas están en [Arquitectura](docs/architecture.md).

## 🚀 Ejecutar en local

### 📋 Requisitos

- Node.js en una versión LTS compatible con la versión de Next.js del proyecto.
- npm.
- Git, si se va a clonar el repositorio.

### 📦 Instalación

1. Clona el repositorio con la URL que aparece en el botón **Code** de GitHub, o descarga y extrae su ZIP.
2. Abre una terminal en la raíz del proyecto, donde están `package.json` y `package-lock.json`.
3. Instala las dependencias y arranca el servidor:

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000), o la dirección que indique la terminal. Para detener el servidor, pulsa `Ctrl + C`.

### ⌨️ Comandos

| Comando | Función |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm run build` | Generar la compilación de producción. |
| `npm run start` | Servir la compilación de producción, después de ejecutar `build`. |
| `npm run lint` | Revisar el código con ESLint. |
| `npm run lint:fix` | Corregir automáticamente lo que ESLint pueda arreglar. |
| `npm run typecheck` | Generar los tipos de las rutas y comprobar TypeScript. |
| `npm run format` | Formatear el proyecto con Prettier. |
| `npm run format:check` | Comprobar el formato sin modificar archivos. |
| `npm run check` | Ejecutar lint, tipos y formato de una vez. |

## 📚 Desarrollo y documentación

Cada funcionalidad se desarrolla en su propia rama y entra en `main` mediante una Pull Request. La rama principal está protegida, y cada avance va acompañado de la actualización de sus documentos.

| Documento | Contenido |
| --- | --- |
| [README.md](README.md) | Presentación, estado e instrucciones de ejecución. |
| [AGENTS.md](AGENTS.md) | Contexto y pautas para trabajar con asistentes y agentes de IA. |
| [Estado](docs/STATUS.md) | Punto exacto en el que está el desarrollo y siguiente paso. |
| [Arquitectura](docs/architecture.md) | Organización del código, modelos y decisiones técnicas. |
| [Roadmap](docs/roadmap.md) | Fases, tareas y objetivos pendientes. |
| [CHANGELOG.md](CHANGELOG.md) | Historial de cambios relevantes. |

## 🗺️ Próximos pasos

- Añadir más fichas (personajes, enemigos, mapas…) y completar los apartados de Half-Life, Opposing Force y Blue Shift.
- Crear el hub Explorar con buscador, filtros y carruseles.
- Añadir favoritos, control de spoilers y comparación de armas.
- Incorporar pruebas, automatizar comprobaciones y publicar una demo.
- Completar el universo Half-Life: Uplink, Decay, Half-Life: Source, Half-Life 2 y sus episodios, Half-Life: Alyx y sus proyectos cancelados.
- Ampliar el catálogo al resto de sagas, con los proyectos cancelados y los mods famosos de cada juego.
- Traducir la web a otros idiomas.

La API, la base de datos y la gestión de contenido se valorarán en una fase posterior. El alcance detallado se mantiene en el [roadmap](docs/roadmap.md).

## 🖼️ Fuentes y recursos

ValveDex es un proyecto de fans independiente, sin afiliación oficial con Valve.

- **Imagen de cabecera:** identidad visual de Valve, consultada en [Combine OverWiki — Mr. Valve](https://combineoverwiki.net/wiki/Mr._Valve).
- **Iconos de juegos:** recursos de las fichas de [Steam](https://store.steampowered.com/publisher/valve), enlazadas en cada icono.
- **Insignias tecnológicas:** [Shields.io](https://shields.io/).
- **Datos del contenido:** cada hito, juego y ficha enlaza a sus fuentes (Wikipedia, Combine OverWiki, ModDB…).

Las imágenes y marcas de los juegos pertenecen a sus respectivos titulares.

Las imágenes y otros recursos de terceros se incorporarán teniendo en cuenta su procedencia y sus condiciones de uso. No se publicarán estadísticas inventadas.

La licencia del código está pendiente de elección. Cualquier licencia que se añada al código propio no se aplicará automáticamente a marcas, imágenes ni otros contenidos de terceros.

## 👨‍💻 Autor

**Manuel Casinos Pérez**

- 🐙 [GitHub](https://github.com/Manuelklk03)
- 💼 [LinkedIn](https://www.linkedin.com/in/manuel-casinos-perez/)
