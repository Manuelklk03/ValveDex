# Dirección de diseño de ValveDex

Estado: **aprobada por Manuel el 2026-10-23** (paso D1), con las decisiones de la sección 10. Nada de este documento está implementado todavía: el siguiente paso es la muestra D1b.

## 1. Punto de partida

**Lo que hay hoy (comprobado en el código el 2026-10-23):**

- La paleta base de `src/app/globals.css` es, en la práctica, **la de la tienda de Steam** (`#171a21`, `#1b2838`, `#66c0f4`, `#c7d5e0`). La portada de Valve se viste hoy de Steam: hay que separarlas.
- Temas por variables CSS en cascada: `UniverseTheme` (`half-life`, naranja `#f28c28` sobre marrón oscuro) y `GameTheme` (Opposing Force verde, Blue Shift azul). La estructura sirve; los valores son provisionales.
- Tipografía: Geist y Geist Mono, la opción por defecto de la plantilla, elegida sin motivo de marca.
- Todas las zonas comparten la misma composición: cabecera, título y lista o tarjetas. Solo cambia el color.
- No hay recursos visuales propios salvo una imagen (escopeta HD). No hay vídeo, modelos 3D ni fuentes tipográficas descargadas.

**Herramientas comprobadas en esta sesión** (`claude plugin list`): activos `frontend-stack` (router), `frontend-design`, `impeccable`, `taste`, `ui-ux-pro-max`, `emil-design-eng`, `antislop`, `imagegen-skills` y Playwright para capturas. En este paso se cargaron el router de `frontend-stack` y `antislop` (modo DURING). No se ejecutó el `concept-seed` de Impeccable ni el selector de prototipos de Emil: se usarán en la muestra (fase D1b).

## 2. Investigación de referencias

Capturas tomadas con Playwright a 1440 px el 2026-10-23 y colores leídos con `getComputedStyle`. Las capturas están en `.playwright-mcp/` (sin versionar).

| Fuente                                                                                                                         | Relación                  | Elemento distintivo                                                                                                                          | Voz                                                               | Recurso principal                                    | Qué podemos aprovechar                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [valvesoftware.com](https://www.valvesoftware.com/en/)                                                                         | Oficial, Valve            | Wordmark `VALVE` en bloque rojo; negro, blanco y rojo `#F74843`; tipografía Apercu con contraste extremo de peso (200 y 900)                 | «We make games, Steam, and hardware. Join us.»                    | Foto oscurecida a sangre con titulares rojos enormes | Identidad sobria: solo tres colores. ValveDex puede añadir la parte industrial (válvula, maquinaria) que la web oficial no usa                                      |
| [steampowered.com, octubre de 2004](https://web.archive.org/web/20041015074457/http://www.steampowered.com/) (Wayback Machine) | Oficial, Steam histórico  | Verde oliva `#4c5844` y `#3e4637`, texto `#d8ded3` y `#a0aa95`, acento dorado `#c99933`; Verdana                                             | «Steam delivers Valve's games to your desktop…»                   | Panel central con botones biselados                  | Paleta verificable de la primera época de Steam (web, no cliente)                                                                                                   |
| [store.steampowered.com](https://store.steampowered.com/)                                                                      | Oficial, Steam actual     | Azul nocturno (`#0f1924`, `#171d25`), texto `#c6d4df`, azul `#66c0f4`; Motiva Sans                                                           | «Bienvenidos a Steam»                                             | Tienda densa con cápsulas de juego                   | La paleta que hoy usa ValveDex por error: pertenece a la sección Steam                                                                                              |
| [half-life.com](https://www.half-life.com/en/halflife)                                                                         | Oficial, Half-Life        | Fondo claro `#e9e8e9`, texto marrón `#4b423c`, pestaña naranja; DIN en mayúsculas espaciadas; λ dentro del wordmark                          | «An experiment goes horribly wrong» (titular, leído parcialmente) | Captura del juego a sangre con el wordmark           | La web oficial de Half-Life es **clara**, no oscura: apoya la idea de «documento de laboratorio»                                                                    |
| [Combine OverWiki](https://combineoverwiki.net/wiki/Black_Mesa_Research_Facility)                                              | Misma categoría (wiki)    | MediaWiki estándar: barra lateral, índice, ficha lateral (infobox)                                                                           | «the original Half-Life wiki»                                     | Infobox con el logo de Black Mesa                    | Es el estándar de la categoría: genérico. Hueco: ninguna wiki presenta el contenido como un archivo del propio mundo                                                |
| [Black Mesa (Crowbar Collective)](https://www.crowbarcollective.com/games/black-mesa)                                          | Misma franquicia (remake) | Escena del vestíbulo de Black Mesa; **franjas de color por sector** en la pared («Research», «Development», «Personnel»)                     | «Relive Half-Life, Valve Software's revolutionary debut…»         | Wordmark con λ naranja                               | La señalética de colores por sector existe en el mundo del juego (Combine OverWiki la describe en los pasillos): es un recurso propio para navegar entre categorías |
| [Steam: Opposing Force](https://store.steampowered.com/app/50/) y [Blue Shift](https://store.steampowered.com/app/130/)        | Oficial, cápsulas         | Medallón λ de metal oxidado; verde ácido y oliva con máscara de gas de la HECU (OF); azul intenso con el chaleco de seguridad de Barney (BS) | Textos de tienda                                                  | Cápsula con personaje y wordmark espaciado           | Confirma la base compartida (λ metálico, wordmark) y el color propio de cada expansión                                                                              |
| [SCP Foundation wiki](https://scp-wiki.wikidot.com/scp-173)                                                                    | Fuera de la categoría     | Ficha con formato de expediente: «Item #», «Object Class», «Special Containment Procedures»                                                  | «Secure, Contain, Protect»                                        | Documento institucional ficticio                     | El formato de expediente se lee bien y estructura datos; ValveDex lo adapta con datos reales, sin inventar clasificaciones                                          |
| [Science Museum Group Collection](https://collection.sciencemuseumgroup.org.uk/search/objects?q=geiger%20counter)              | Fuera de la categoría     | Objetos fotografiados sobre fondo neutro, como piezas de museo; filtros claros                                                               | «Search our collection»                                           | Buscador grande y cuadrícula de objetos              | Presentar armas y objetos como piezas catalogadas, con foto limpia y ficha técnica                                                                                  |

**Recuento:** 4 referencias de la misma categoría o del mismo mundo inspeccionadas con captura (Valve, Steam 2004, half-life.com, Combine OverWiki), más el remake Black Mesa y las cápsulas de Steam; 2 de fuera (SCP, Science Museum). **No disponibles:** la wiki de Half-Life en Fandom y la colección de Cooper Hewitt devolvieron 403.

**Intro de Valve** ([Combine OverWiki, «Mr. Valve»](https://combineoverwiki.net/wiki/Mr._Valve)): versión de 1998 con un hombre con perilla y una válvula en el ojo («Open your eyes»), foto sepia; versión de 2004 casi en blanco y negro con la válvula roja; desde 2007, hombre de espaldas con la válvula en la nuca («Open your mind»). No consta la duración. Fechas tomadas de una wiki de fans: no se han encontrado fuentes primarias de Valve que las confirmen, así que la web no las citará como datos hasta tenerlas.

**Épocas de Steam:** lanzamiento el 12 de septiembre de 2003; cliente verde oliva hasta el rediseño de 2010 (beta el 23 de febrero y publicación el 26 de abril de 2010, según un mensaje de desarrollador citado en los foros de Steam); Big Picture en diciembre de 2012; biblioteca nueva en octubre de 2019; interfaz de Steam Deck en Big Picture en febrero de 2023 y nuevo cliente de escritorio en junio de 2023 ([Wikipedia](<https://en.wikipedia.org/wiki/Steam_(service)>)). Los colores del **cliente** de cada época están **sin verificar**: se investigarán con capturas al llegar a la sección Steam.

**Lo que la investigación deja claro:** las wikis de la categoría usan todas la misma plantilla genérica. Lo que ValveDex puede tener como propio es presentar cada universo **como un archivo de su mundo**: documentos, acreditaciones y señalética que existen en los juegos, con datos reales y fuentes.

## 3. Jerarquía de navegación

```
ValveDex (portada: Valve)
├── Valve: historia, personas
├── Steam: historia y épocas (sección futura con identidad propia)
├── Universos
│   └── Universo (Half-Life)
│       └── Juego o expansión (Half-Life, Opposing Force, Blue Shift; mods y cancelados)
│           └── Categoría (lore, mapas, armas, personajes, enemigos…)
│               └── Ficha
├── Explorar (búsqueda transversal)
└── Créditos
```

- **Marco común:** la cabecera global y la ruta de navegación (breadcrumb) tienen siempre la misma posición y el mismo comportamiento. Cambia su piel, no su sitio: así se reconoce dónde estás aunque cambie el mundo.
- **Cada nivel tiene un recurso propio**, para que entrar se note: universo = acreditación de acceso; juego = expediente o contenedor del personaje (maletín, taquilla); categoría = sector señalizado; ficha = documento archivado.

## 4. Lenguaje visual por zona

Los colores son **interpretación de ValveDex** basada en las referencias medidas; ninguno se presenta como oficial salvo los marcados «medido». Todos pasarán la comprobación de contraste (WCAG AA) de `antislop` en el paso D2.

### Valve (portada y sección corporativa)

- **Oficial (medido):** negro, blanco, rojo `#F74843`, wordmark en bloque, contraste de pesos 200 y 900.
- **Interpretación ValveDex:** casi negro con textura de metal pavonado, blanco cálido y el rojo como **único acento**: la válvula y la acción principal, nada más. Lenguaje industrial: tuberías, manómetros y la rueda de la válvula como motivo de identidad.
- **Tipografía:** grotesca con pesos extremos, como la oficial (Apercu es comercial). Candidata gratuita: **Archivo** (Google Fonts, eje de anchura y pesos de 100 a 900): titulares anchos y pesados, texto ligero.
- **Composición:** una entrada a pantalla completa con un solo punto focal (la válvula); después, la historia como una línea de producción que avanza con el scroll, no como tarjetas repetidas.

### Steam (sección futura, identidad separada de Valve)

- Cada época recupera su paleta y su tipo de interfaz, reinterpretados: **2003–2010**, verde oliva y dorado con Verdana (medido en la web de 2004); **2010–2023**, azul nocturno y azul claro (medido en la tienda actual); **2023 en adelante**, el cliente unificado.
- Las épocas se presentan como **capas de interfaz**: al avanzar por la historia, la página cambia de «skin», como lo hacía el cliente. Sin copiar pantallas: biseles, densidad y color de cada época sobre nuestro contenido.
- **Pendiente:** verificar con capturas los colores del cliente de cada época antes de fijarlos.

### Universo Half-Life (base compartida)

- **Recurso central: el archivo de Black Mesa.** Documentos de laboratorio sobre papel claro (la web oficial de Half-Life también es clara), sellos, códigos de registro y la **señalética por sectores con franjas de color**, que existe en el juego.
- **Uso real de los datos:** el ID estable de cada ficha se muestra como número de registro; los «Datos» (paso 21) se presentan como hoja técnica; las fuentes, como referencias del expediente. No se inventan clasificaciones ni niveles de seguridad.
- **Tipografía:** de señalética, de la familia DIN, como la web oficial (DIN es comercial). Candidata gratuita: **Barlow** y **Barlow Condensed**, inspiradas en la señalización vial. Para códigos y datos técnicos, **IBM Plex Mono**, solo en datos y nunca en titulares.
- **Color:** papel `#ece9e2` y tinta casi negra; el naranja Half-Life como acento de acción y de peligro; los colores de sector solo en la señalética de categorías.

### Half-Life, Opposing Force y Blue Shift

Comparten estructura (cabecera de expediente, sectores y fichas) y cambian de **material, composición y movimiento**, no solo de color:

|                        | Half-Life                                  | Opposing Force                                           | Blue Shift                                  |
| ---------------------- | ------------------------------------------ | -------------------------------------------------------- | ------------------------------------------- |
| Punto de vista         | Científico (Gordon Freeman)                | Marine de la HECU (Adrian Shephard)                      | Guardia de seguridad (Barney Calhoun)       |
| Material               | Papel de laboratorio, carpeta con pestañas | Lona, metal pintado, plantilla de estarcido              | Plástico de acreditación, taquilla metálica |
| Entrada                | Carpeta de expediente que se abre          | Maletín militar que se abre                              | Taquilla o tarjeta de acceso                |
| Color (interpretación) | Papel claro, tinta, naranja                | Oliva oscuro y verde ácido de la cápsula oficial         | Azul de seguridad y marino del uniforme     |
| Tipografía             | Barlow (señalética)                        | Barlow Condensed en mayúsculas, estilo estarcido militar | Barlow, con etiquetas de acreditación       |
| Movimiento             | Pausado, mecánico (puertas hidráulicas)    | Seco y rápido                                            | Deslizante, de tarjeta y cerradura          |

**HUD de cada juego (revisado el 2026-10-23):** el de Half-Life es naranja; el de Opposing Force, verde, RGB 0 160 0, y forma parte del chaleco del protagonista; el de Blue Shift, azul, RGB 95 95 255, ligado al casco. Los valores RGB vienen de un borrador de usuario de [Combine OverWiki](https://combineoverwiki.net/wiki/User:Barnz/Heads-up_display), no de un artículo revisado: se tomarán como referencia de color, no como dato de la web. Los menús y la señalética se revisarán con capturas del juego en D7.

### Otros universos (ideas para más adelante, no se desarrollan ahora)

- **Portal:** carteles de las cámaras de prueba de Aperture Science, que son el recurso más reconocible del juego (número de cámara y pictogramas).
- **Left 4 Dead:** carteles y folletos de emergencia de CEDA y pintadas de las habitaciones seguras. Comprobar qué existe en cada juego antes de usarlo.

## 5. Efectos, animación y 3D

Cada efecto tiene una función. Si no la tiene, no se hace.

| Efecto                                                   | Función                                               | Dónde                        | Sin movimiento (`prefers-reduced-motion`) o sin WebGL |
| -------------------------------------------------------- | ----------------------------------------------------- | ---------------------------- | ----------------------------------------------------- |
| Intro de Valve                                           | Entrada memorable y presentación de la marca          | Primera visita a la portada  | Fotograma fijo y botón «Entrar», o se omite           |
| Apertura de acreditación, expediente, maletín o taquilla | Marca el cambio de nivel y de mundo                   | Universo → juego             | Cambio directo con fundido corto                      |
| Transición entre niveles                                 | Mantener la orientación: de dónde vienes y adónde vas | Navegación jerárquica        | Sin animación                                         |
| Señalética de sectores                                   | Orientación dentro del juego                          | Categorías                   | Igual, es estática                                    |
| Visor 3D de armas y objetos                              | Ver detalles: girar y acercar                         | Fichas con modelo disponible | Imagen o secuencia de imágenes                        |
| Microinteracciones por universo                          | Respuesta al usuario con la voz del mundo             | Enlaces, botones, foco       | Solo cambio de color o de borde                       |

### Intro de Valve: comportamiento

- Botón visible **«Omitir intro»** desde el primer fotograma, enfocado al empezar, y `Esc` para saltarla.
- Duración máxima de unos 6 segundos. El contenido de la portada ya está en el HTML debajo: la intro no retrasa la carga de la página ni oculta el contenido a buscadores ni a lectores de pantalla.
- **Sin sonido** al empezar; un botón permite activarlo.
- **Visitas posteriores:** no se repite. Se recuerda en `localStorage` (con `try/catch`), y el pie ofrece «Ver intro».
- **Movimiento reducido:** no se reproduce; se ve un fotograma fijo o directamente la portada.
- **Error o carga lenta:** si el recurso no está listo en unos 2 segundos o falla, se salta sin mensaje de error.
- **Sin JavaScript:** no aparece; la portada se ve normal.

### Lenguaje de movimiento

| Tipo                                           | Duración   | Curva                                     |
| ---------------------------------------------- | ---------- | ----------------------------------------- |
| Microinteracción (hover, foco, pulsación)      | 120–180 ms | Salida rápida (`ease-out`)                |
| Cambio de estado (abrir menú, pestaña)         | 200–280 ms | `ease-out`                                |
| Cambio de nivel (abrir expediente, transición) | 450–700 ms | Entrada y salida con inercia mecánica     |
| Intro                                          | ≤ 6 s      | Coreografía propia, siempre interrumpible |

- Un solo movimiento protagonista por pantalla; el resto, quieto.
- Matices por universo dentro de estos márgenes (más lento y pesado en Half-Life, más seco en Opposing Force).
- Nunca se anima el contenido esencial para que aparezca: el texto está visible aunque falle la animación.

### Presupuesto de rendimiento (a validar en cada paso)

- Las páginas de consulta (hub, categorías, fichas sin modelo) no cargan Three.js ni GSAP.
- El 3D se carga **solo** donde se usa, después de pintar el contenido, y con imagen de reserva.
- Objetivo de Core Web Vitals en móvil: LCP < 2,5 s, CLS < 0,1, INP < 200 ms. Se mide con Lighthouse en cada fase, no se supone.

## 6. Recursos

| Recurso                                                | ¿Lo tenemos? | Cómo conseguirlo                                                                               | Riesgo                                                            |
| ------------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Vídeo de la intro de Valve                             | No           | Grabación propia de la intro dentro del juego (ver abajo)                                      | El vídeo, el hombre y el logotipo son de Valve                    |
| Modelo 3D de una válvula industrial                    | No           | Modelarlo (Blender) o un modelo con licencia CC0 o CC-BY                                       | Comprobar la licencia y citarla en `/creditos`                    |
| Modelos 3D de armas                                    | No           | Los modelos del juego son material de Valve; los de fans suelen derivar de ellos               | Licencia dudosa: usar imágenes hasta tener uno con licencia clara |
| Imágenes de armas y objetos (sin fondo, original y HD) | 1 de 4       | Capturas propias del juego, recortadas                                                         | «Gamescreenshot»: material del juego © Valve, como la escopeta    |
| Capturas de HUD, menús y señalética de los juegos      | No           | Capturas propias o de wikis con fuente                                                         | Solo como referencia de diseño, no se publican sin crédito        |
| Fuentes tipográficas                                   | No           | Archivo, Barlow, Barlow Condensed e IBM Plex Mono (Google Fonts, licencia OFL) con `next/font` | Ninguno: licencia abierta                                         |
| Texturas (papel, metal, lona)                          | No           | Crearlas en CSS o SVG, o fotos con licencia CC0                                                | Peso de las imágenes                                              |
| Sonido de la intro                                     | No           | Solo con licencia clara; sin sonido por defecto                                                | Derechos del audio                                                |

### Decisión: la intro oficial de Valve (2026-10-23)

Manuel elige usar **la intro oficial**: el hombre calvo de espaldas con la válvula en la nuca («Open your mind», versión de 2007 en adelante).

La [política de vídeo de Valve](https://store.steampowered.com/video_policy) permite publicar en una web vídeos hechos con contenido de sus juegos, siempre que el uso no sea comercial. En cambio, **no** permite extraer recursos de los juegos y distribuirlos por separado. Por eso:

- **Sí:** grabar nosotros la intro mientras se reproduce en el juego (una captura de vídeo propia) y publicar esa grabación en ValveDex.
- **No:** copiar el archivo de vídeo de la carpeta del juego y subirlo tal cual.
- Uso **no comercial**, sin anuncios de pago por ver ni venta. Crédito «© Valve Corporation» en `/creditos`, y se retira si Valve lo pide.
- La política habla de vídeos; no menciona el uso del logotipo fuera de un vídeo. La intro se usa como vídeo y el logotipo no se reutiliza como marca de ValveDex.

Pendiente para D4: hacer la grabación (resolución, duración y formato), comprimirla (WebM o MP4, con fotograma de póster) y comprobar su peso.

## 7. Tecnología

| Necesidad                              | Recomendación                                                                         | Por qué                                                                                                                                                    | Coste                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Transiciones entre niveles             | **CSS y la View Transitions API del navegador**                                       | Nativa y sin dependencia; el soporte de Next.js y React se comprobará en el paso                                                                           | 0 KB; en navegadores sin soporte, cambio directo                                           |
| Animaciones de la interfaz y aperturas | **CSS** (`@keyframes`, transiciones)                                                  | Suficiente para casi todo y respeta `prefers-reduced-motion` con una media query                                                                           | 0 KB                                                                                       |
| Coreografía de la intro                | **GSAP**, solo si CSS no basta                                                        | Línea de tiempo controlable, interrumpible y sincronizable con el vídeo o el 3D                                                                            | ~25 KB gzip solo en la portada; revisar la licencia al instalar                            |
| 3D (válvula, visor de armas)           | **Three.js + React Three Fiber + drei**                                               | Escena declarativa en React; `OrbitControls` de drei para girar y acercar                                                                                  | ~150 KB gzip o más; carga diferida con `next/dynamic` y `ssr: false`, solo en esas páginas |
| Diálogos, menús, pestañas accesibles   | **shadcn/ui** cuando haga falta el primero (por ejemplo, el buscador de la Entrega 2) | Radix resuelve foco, teclado y ARIA                                                                                                                        | Código copiado al proyecto, con Radix como dependencia                                     |
| Efectos puntuales                      | **React Bits**, solo un efecto concreto y adaptado                                    | Son componentes para copiar, no una librería                                                                                                               | Revisar cada uno: accesibilidad y movimiento reducido                                      |
| Scroll suave                           | **Lenis: no por ahora**                                                               | Choca con los carruseles de `scroll-snap` de `/explorar`, puede alterar las anclas y el foco, y en una wiki de consulta el scroll nativo es más predecible | Se evalúa solo en la portada, en la muestra, midiendo anclas, teclado y rendimiento        |

Todo se instala **en el paso en que se usa por primera vez**, explicando para qué sirve (regla de `CLAUDE.md`).

## 8. Arquitectura visual

- **Tokens en capas**, con las variables CSS que ya se usan:
  1. Primitivos en `globals.css`: escala de espaciado, radios, duraciones y curvas, y familias tipográficas.
  2. Semánticos por zona: `--background`, `--foreground`, `--surface`, `--accent`… Ya existen; se añaden `--paper`, `--ink`, `--signal` y `--font-display` solo cuando un componente los necesite.
  3. Temas por clase en cascada, como ahora: zona (`valve`, `steam`) → universo (`UniverseTheme`) → juego (`GameTheme`).
- **Componentes compartidos con variantes justificadas:** la ruta de navegación, la cabecera de expediente, la señal de sector y la hoja de datos. Cambian por variables CSS y, como mucho, un modificador BEM por universo.
- **Composiciones propias** solo donde la identidad lo exige: la entrada de cada universo (acreditación, carpeta, maletín, taquilla) es un componente de ese universo en `src/features/<universo>/components`, no un componente universal lleno de condiciones.
- **CSS Modules + BEM** para todo lo propio; shadcn/ui con sus utilidades de Tailwind (ver `architecture.md`).
- **Cliente solo donde hay interacción:** la intro, el visor 3D y las aperturas animadas son islas de cliente pequeñas. Las páginas y layouts siguen en servidor.

## 9. Plan por fases

| Fase                                | Contenido                                                                                                                                                                                                                                                                              | Validación                                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **D1** (este documento)             | Dirección, referencias, recursos, tecnología                                                                                                                                                                                                                                           | Aprobación de Manuel                                                                                            |
| **D1b: muestra visual**             | Una sola pantalla estática, sin librerías: la cabecera de un hub de juego con dos o tres sectores, en sus tres variantes (Half-Life, Opposing Force, Blue Shift), más el primer pantallazo de la portada de Valve sin intro. Ruta de prueba aislada, que se borra o se integra después | Capturas en escritorio (1440 px) y móvil (390 px) con Playwright, contraste, teclado y revisión de `impeccable` |
| **D2: sistema**                     | Tokens, fuentes con `next/font` y temas revisados                                                                                                                                                                                                                                      | Contraste de cada pareja de colores con `antislop`                                                              |
| **D3: portada de Valve**            | Composición, sin intro                                                                                                                                                                                                                                                                 | Capturas y Lighthouse                                                                                           |
| **D4: intro**                       | Según la decisión de recursos; primera dependencia (GSAP o Three.js) si hace falta                                                                                                                                                                                                     | Teclado, movimiento reducido, error de carga, segunda visita                                                    |
| **D5: universos**                   | Entradas como acreditaciones                                                                                                                                                                                                                                                           | Capturas, teclado y móvil                                                                                       |
| **D6: Half-Life**                   | Hub, sectores, ficha como documento                                                                                                                                                                                                                                                    | Capturas y auditoría                                                                                            |
| **D7: Opposing Force y Blue Shift** | Sus variantes de material, entrada y movimiento                                                                                                                                                                                                                                        | Comparación lado a lado con Half-Life                                                                           |
| **D8: visor 3D**                    | Solo cuando haya un modelo con licencia clara                                                                                                                                                                                                                                          | Rendimiento y alternativa sin WebGL                                                                             |
| **D9: transiciones entre niveles**  | View Transitions                                                                                                                                                                                                                                                                       | Movimiento reducido, botón Atrás y foco                                                                         |
| **Más adelante**                    | Sección Steam por épocas                                                                                                                                                                                                                                                               | Tras verificar los colores de cada cliente                                                                      |

## 10. Decisiones de Manuel (2026-10-23)

1. **Dirección del universo Half-Life: A + C.** Archivo físico (documentos, carpetas, sellos y materiales) para el contenido, y señalética de las instalaciones (franjas de color por sector, pictogramas y rótulos) para la navegación. Descartada la B (terminal), por el riesgo de caer en el tópico de la «terminal falsa».
2. **Intro:** la oficial de Valve, como grabación propia dentro del juego y con las condiciones de la sección 6.
3. **Muestra D1b:** aprobada con el alcance de la sección 9.
