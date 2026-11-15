# Plan hacia la v1.0 — ValveDex

Decidido por Manuel el 2026-11-15 tras un `grill-me` largo. Sustituye al orden anterior del roadmap para lo que queda hasta publicar. El estado de cada bloque se anota en [STATUS.md](STATUS.md).

## Qué es la v1.0

- **Alcance:** todo el universo Half-Life, completo y pulido (contenido verificado, sin datos inventados). Portal, Team Fortress, Left 4 Dead y Counter-Strike salen visibles como universos «beta»: se abren, pero no bloquean la v1.0.
- **Alojamiento:** Render con staging y producción (el pipeline de [deploy.md](deploy.md) ya existe). Dominio propio y métricas básicas al final.
- **Después de la v1.0:** v1.x crece universo a universo.

## Dirección visual y legal (auditoría con capturas, 2026-11-15)

**Qué falla hoy** (12 páginas revisadas a 1440 px): el mismo dibujo de línea se repite en hero, dossier y tarjeta (los supervivientes de L4D, el Gordon HEV); el dossier de L4D es papel crema sobre un fondo oscuro y rompe la página, y cada saga tiene un lenguaje distinto, así que no parece la misma web; los dibujos de línea tapan o flotan sueltos respecto al título; la portada es una válvula roja plana sin ninguna imagen del contenido; y L4D, TF2 y CS son marrón oscuro con acento rojizo: no se distinguen.

**Decisiones de Manuel:**

- **Enfoque ante Valve: se mantiene lo que hay.** Siguen las capturas, renders y modelos de Valve y se añaden assets nuevos encima. Es un proyecto sin ánimo de lucro, informativo y sin monetización, hecho con cariño (palabras de Manuel). Se mantienen el aviso de «proyecto de fans» y los créditos; el riesgo de los `.glb` (2026-10-31) sigue aceptado. La música va por reproductor embebido, sin alojar archivos.
- **Identidad: cada saga es un mundo distinto.** Se mantiene la línea actual (Half-Life expediente, Portal laboratorio, Team Fortress cartel…) y se lleva más lejos. La consistencia sale de la paleta de marca por saga, de la navegación común y de arreglar lo roto, no de una sola estética.
- **Color: paleta de marca estricta por saga**, un color dominante usado igual en tarjeta, dossier, hub y ficha (propuesta: Half-Life naranja HEV, Portal azul y naranja de portales, Team Fortress rojo y azul, Left 4 Dead verde enfermizo, Counter-Strike ocre y gris). Claude la propone y Manuel la aprueba antes de aplicarla.
- **Producción de assets:** los que hagan falta los produce Codex (Claude le prepara cada encargo con medidas, formato y estilo); las capturas tratadas y lo que sea código lo hace Claude.

- **Dossier y fondo: el dossier vive en el mundo.** El fondo de la página es la escena de la saga y el dossier se integra con su paleta y textura; el papel crema solo donde tenga sentido (el expediente de Half-Life).
- **Portada:** hero cinematográfico con una captura propia tratada de Black Mesa o de Steam, con la válvula y el reloj integrados; las sagas, en el siguiente scroll.
- **Contenido de Half-Life:** verificación de todo con Codex en solo lectura antes de publicar (fuentes, cifras, spoilers); lo que no se pueda verificar se marca «por revisar» en la propia ficha.
- **Encargos de assets:** Claude prepara un brief por lote (nombre de archivo, medidas, estilo, color de saga y referencia), Manuel se lo pasa a Codex e integramos los archivos que lleguen a `public/`.

- **Paleta por saga (2026-11-15):** aprobada la propuesta con la condición de Manuel de que **se parezca a su universo**: Half-Life naranja HEV `#F39A2E` sobre carbón; Portal azul Aperture `#3FA9F5` con el naranja de portal solo en detalles; Team Fortress RED `#D14841` y BLU `#5B8FCB` a partes iguales; Left 4 Dead verde enfermizo `#8DB03C` con rojo sangre en detalles; Counter-Strike gris acero `#8FA1B2` con caqui `#C2B280`. Al aplicarla se afinan los tonos contra el arte real de cada saga y se mide el contraste AA.
- **Fuente única del acento:** hoy el acento de cada saga está en dos sitios con valores distintos (`universe-theme.module.css`, por ejemplo Half-Life `#f39a2e`, Portal `#ff9d1f`, TF `#d14841`, L4D `#c43d2e`; y `universe-art.ts`, TF `#e0664a`, L4D `#8fae6a`, Portal `#4fb4ff`). Es parte de por qué las sagas se confunden: se unifica en un solo lugar.
- **Cabecera:** logo, «Universos» (menú grande), «Valve» y «Buscar» (Ctrl+K); «Explorar» pasa dentro del buscador.
- **Pistas de música:** las elige Manuel (un enlace oficial por universo y por juego) y Claude las conecta.
- **Primer lote de assets:** emblemas de saga e iconos de juego que faltan, en [assets-brief-1.md](assets-brief-1.md).

**Assets que hacen falta:**

| Asset                                                                                                                                                          | Quién                             | Para qué                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------ |
| Un icono de línea por juego que aún no tiene (Decay, Alyx, los dos Counter-Strike de GoldSrc y Source 2, Portal 2) y una variante limpia sin texto superpuesto | Codex                             | Hero de cada juego, sin repetir el de otro sitio |
| Un emblema por saga (logo de línea simple, un solo color)                                                                                                      | Codex                             | Tarjeta, menú grande, buscador y pie             |
| Fondos por saga y por juego (capturas propias tratadas, y generados donde no haya juego instalado)                                                             | Claude                            | Hero y dossier                                   |
| Texturas y patrones por saga (papel, hormigón, panel, ceniza…)                                                                                                 | Codex                             | Dossier y tarjetas de cada mundo                 |
| Imagen real para la portada (captura de Black Mesa o cliente de Steam sobre el fondo industrial)                                                               | Claude                            | Que la portada enseñe contenido                  |
| Página «Acerca de» con el aviso de proyecto de fans sin ánimo de lucro                                                                                         | Claude (texto), Manuel (revisión) | Presentación ante Valve                          |

## Principios

- **Cinematográfico e inmersivo:** cada universo y juego se siente un mundo propio. Las capturas son propias del juego instalado (método de `STATUS.md`), tratadas como fondo.
- **Fluido en un portátil normal y sobrio en móvil:** los efectos pesados solo con puntero fino; en móvil se degradan a imágenes y fundidos. Se mide con Lighthouse antes de publicar.
- **El movimiento nunca condiciona el contenido:** todo se ve sin JavaScript de animación (el fallo de los dossieres ocultos hasta el scroll no puede repetirse). Con «reducir movimiento», versión quieta.
- **Audio opt-in:** apagado por defecto.

## Bloques, por orden

1. **Fiabilidad.**
   - Dossieres siempre visibles (hecho el 2026-11-15: `DossierMotion` ya no oculta nada).
   - Fondos de cada universo y juego que tengan que ver con su temática (capturas propias, tratadas).
   - Revisión con teclado y móvil de las páginas ya hechas.
   - Página «Acerca de» con el aviso de proyecto de fans sin ánimo de lucro.
2. **Paleta por saga y assets.** Paleta de marca estricta por saga aprobada por Manuel y aplicada igual en tarjeta, dossier, hub y ficha; fin de los dibujos repetidos; encargos de assets a Codex (ver la tabla).
3. **Navegación.**
   - Buscador global (Ctrl+K) sobre fichas, juegos y universos.
   - Menú grande por universo en la cabecera (universos → juegos → apartados, con el tema de cada saga).
   - Mapa visual del sitio en la portada (Valve, Steam y universos).
   - Fichas relacionadas y «siguiente» narrativo, y recorrido capítulo a capítulo en cada juego.
4. **Universos inmersivos** (sigue el ambiente vivo del bloque 1 ya hecho).
   - Transición al entrar en un universo (con salto para movimiento reducido).
   - Hero a pantalla completa con capas, partículas y modelo 3D en universo y juego.
   - Cursor y detalles propios de cada saga (visor HEV, panel de Aperture, HUD de TF2…).
   - Dossier por dentro, página del universo y fichas de personaje, arma y enemigo (bloques 2–4 del plan anterior).
5. **Valve y Steam:** portada (estructura, ritmo del scroll, válvula, fondo, textos), historia de Valve (más hitos con imagen), Steam por épocas (capturas de cada cliente) y personas y hardware (fotos que faltan y vista 3D).
6. **Audio.** Botón «Activar sonido» en la cabecera, apagado y recordado. Con él activado, al pasar el ratón por un universo suena un tema de su banda sonora, y al pasar por un juego, un tema propio, con fundido de entrada y salida. La banda sonora tiene copyright de Valve y la web es pública: se usa un **reproductor embebido** del canal oficial (sin alojar ningún archivo) y no se versionan `.mp3`. Detalle por decidir al llegar: qué plataforma y qué pista de cada juego.
7. **Cierre:** rendimiento (Lighthouse), accesibilidad, contraste, despliegue en staging y producción, README y `v1.0.0`.

## Riesgos conocidos

- El audio embebido depende de un tercero y del gesto del visitante; hay que tener un plan para cuando no cargue (la web funciona muda).
- Las capturas propias solo existen de los juegos instalados: Half-Life: Decay y Alyx necesitarán fondos generados o capturas oficiales.
- Mucho contenido de Source (HL2, episodios, Alyx) sigue sin contrastar con las fuentes: es parte del alcance de la v1.0.
