import type { MediaAsset } from "@/domain/media-asset";

// Imágenes decorativas de la interfaz: no pertenecen a ninguna ficha, pero se acreditan en /creditos
export const decorImages: { image: MediaAsset; usedIn: string }[] = [
  {
    usedIn:
      "Universo Half-Life · etapa Source 2 y dossiers de Episode One y Alyx",
    image: {
      src: "/images/decor/combine-main-symbol.svg",
      alt: "Emblema principal de la Alianza",
      width: 1410,
      height: 1395,
      source: {
        title: "File:Combine main symbol.svg - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/File:Combine_main_symbol.svg",
        kind: "wiki",
      },
      credit: "Vectorizado por Klow a partir de una textura de Half-Life 2",
      license: "Uso legítimo (material © Valve)",
    },
  },
  {
    usedIn: "Dossier de Team Fortress 2 · emblema de clase",
    image: {
      src: "/images/decor/tf2-class-silhouette.svg",
      alt: "Silueta genérica de clase de Team Fortress 2",
      width: 100,
      height: 100,
      source: {
        title: "Ilustración original para ValveDex",
        url: "https://github.com/Manuelklk03/ValveDex",
        kind: "official",
      },
      credit: "Dibujo original simplificado para ValveDex",
      license: "CC0 (dominio público)",
    },
  },
  {
    usedIn:
      "Tarjeta del universo Team Fortress y dossiers de Team Fortress Classic y Team Fortress 2 · emblema de Team Fortress 2",
    image: {
      src: "/images/decor/tf2-emblem.png",
      alt: "Emblema circular de Team Fortress 2, en los colores de los equipos RED y BLU",
      width: 512,
      height: 512,
      source: {
        title: "Icono de Team Fortress 2 en Steam",
        url: "https://shared.fastly.steamstatic.com/community_assets/images/apps/440/f568912870a4684f9ec76277a1a404dda6bab213.ico",
        kind: "official",
      },
      credit:
        "Valve, icono original distribuido en Steam; sin el fondo gris para pintarlo con los colores RED y BLU",
      license: "Material © Valve",
    },
  },
  {
    usedIn:
      "Tarjeta del universo Left 4 Dead y dossiers de Left 4 Dead y Left 4 Dead 2 · icono del primer juego",
    image: {
      src: "/images/decor/l4d-official-icon.png",
      alt: "Icono de Left 4 Dead",
      width: 256,
      height: 256,
      source: {
        title: "Icono de Left 4 Dead en Steam",
        url: "https://shared.fastly.steamstatic.com/community_assets/images/apps/500/dea36504f7c4dac7c657e77a0fac8a274e2af2d3.ico",
        kind: "official",
      },
      credit: "Valve, icono original distribuido en Steam",
      license: "Material © Valve",
    },
  },
  {
    usedIn:
      "Dossier de Left 4 Dead 2 · silueta de infectado especial (Spitter/Jockey)",
    image: {
      src: "/images/decor/l4d2-special-silhouette.svg",
      alt: "Silueta de Spitter/Jockey para dossier Left 4 Dead 2",
      width: 100,
      height: 100,
      source: {
        title: "Ilustración original para ValveDex",
        url: "https://github.com/Manuelklk03/ValveDex",
        kind: "official",
      },
      credit: "Dibujo original simplificado para ValveDex",
      license: "CC0 (dominio público)",
    },
  },
];
