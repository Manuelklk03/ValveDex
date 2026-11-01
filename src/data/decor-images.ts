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
];
