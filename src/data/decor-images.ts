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
    usedIn: "Tarjeta de universo Left 4 Dead · icono de infectado",
    image: {
      src: "/images/decor/l4d-universe-icon.svg",
      alt: "Silueta de infectado Hunter para universo Left 4 Dead",
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
    usedIn: "Dossier de Left 4 Dead · silueta de infectado (Hunter/Smoker)",
    image: {
      src: "/images/decor/l4d-infected-silhouette.svg",
      alt: "Silueta de Hunter/Smoker para dossier Left 4 Dead",
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
