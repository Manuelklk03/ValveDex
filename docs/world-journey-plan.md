# Plan del viaje por el mundo de Valve

Decidido por Manuel el 2026-11-23. Describe **solo el paseo por el mundo principal**: cómo se ve cada parada al viajar. El interior de cada página se diseñará después, parada por parada, y seguirá siendo interactivo.

## Reglas transversales

- **Skeletons:** toda la web muestra skeletons mientras carga.
- **Fondo común:** zona industrial de Valve (tuberías, vapor, metal), siempre animada, que cambia de material según la parada.
- **Tarjetas flotantes:** cada vez que un texto menciona un nombre, un juego, Steam o hardware, aparece una animación de tarjeta flotante con un enlace a su página de referencia. La historia lo engloba todo sobre Valve.
- **Diseño:** las PRs de diseño se dejan abiertas hasta que Manuel diga que se fusionan.

## Paradas del viaje (en orden)

1. **Pantalla principal.** Una pared en una zona industrial llena de tuberías que sueltan vapor (guiño al nombre de Steam). En la pared, un reloj medidor y, saliendo de él, la válvula roja. Al avanzar por el mundo se pasa a la siguiente parada.
2. **Entrada al mundo.** Animación del hombre calvo con la válvula de Valve en la nuca que gira la cabeza; suena la música de Valve y se entra en el hub principal.
3. **Historia.** Fondo industrial. Un pergamino se va escribiendo con la historia de la empresa (muy extensa) y alrededor flotan el logo de Steam, el de Half-Life y objetos que representan cómo se construyó Valve. Las menciones abren tarjetas flotantes.
4. **Personal.** La silueta de Gabe Newell con una corona de rey al fondo, fondo industrial animado y paneles de contratos con las imágenes disponibles del personal.
5. **Hardware.** Alrededor de un icono de Valve al que le caen billetes flotan en 3D la Steam Machine, las gafas VR y los demás dispositivos. Fondo industrial.
6. **Steam.** Flotan en 3D los distintos iconos que tuvo Steam con el tiempo. El fondo es de Steam y cambia con transiciones entre épocas (colores y tipografías de cada etapa).
7. **Universos.** Flotan en 3D los iconos de los juegos. Al entrar, lo que antes era la galaxia es ahora un **mapa negro, con estilo e interactivo**: cada universo ocupa un lugar y a su alrededor hay elementos de su temática; al pasar el ratón salen animaciones relacionadas con el tema.

## Decisiones de implementación

- **Intro:** la original, grabada por Manuel dentro del juego y guardada en public/videos/valve-intro.mp4 (la recreación 3D no sería exacta). Suena una vez por sesión; se puede saltar.
- **Música:** no se aloja; la de la intro viene en el vídeo.
- **Esquina:** la pared gira en una esquina a la izquierda y las tuberías la siguen; la cámara la dobla y el resto de paradas están en el pasillo que se abre tras ella.

## Pendiente de definir

El interior de cada parada (qué se ve y cómo se interactúa al entrar en ella).
