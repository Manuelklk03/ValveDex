import type { UniverseStage } from "@/domain/universe-stage";

export const universeStages: UniverseStage[] = [
  {
    id: "goldsrc",
    universeId: "half-life",
    name: "GoldSrc",
    subtitle: "Half-Life 1 y sus expansiones",
    summary:
      "El primer Half-Life (1998) y las expansiones de Gearbox cuentan el incidente de Black Mesa desde tres puntos de vista: un científico, un marine y un guardia de seguridad.",
    status: "available",
  },
  {
    id: "source",
    universeId: "half-life",
    name: "Source",
    subtitle: "Half-Life 2 y sus episodios",
    summary:
      "Half-Life 2 (2004) y sus episodios llevan la historia años después a la Ciudad 17, bajo el control de la Alianza.",
    status: "coming-soon",
    // shortcut: nombres en texto hasta que estos juegos entren en games.ts; entonces se borran
    plannedGames: [
      "Half-Life 2",
      "Half-Life 2: Episode One",
      "Half-Life 2: Episode Two",
    ],
  },
  {
    id: "source-2",
    universeId: "half-life",
    name: "Source 2",
    subtitle: "Half-Life: Alyx",
    summary:
      "Half-Life: Alyx (2020), creado para realidad virtual, vuelve a la Ciudad 17 con Alyx Vance como protagonista. Su historia ocurre antes de Half-Life 2.",
    status: "coming-soon",
    plannedGames: ["Half-Life: Alyx"],
  },
];
