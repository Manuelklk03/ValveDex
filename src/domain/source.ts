// Fiabilidad de la fuente (decisión de Manuel, 2026-10-25):
// oficial (Valve o los archivos del juego), wiki o comunidad (foros, Reddit, Steam)
export type SourceKind = "official" | "wiki" | "community";

export type Source = {
  title: string;
  url: string;
  kind: SourceKind;
};
