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
    // El multijugador tendrá su propio apartado; hasta entonces se anuncia aquí
    plannedGames: ["Multijugador de Half-Life 1"],
  },
  {
    id: "source",
    universeId: "half-life",
    name: "Source",
    subtitle: "Half-Life 2 y sus episodios",
    summary:
      "Half-Life 2 (2004) y sus episodios llevan la historia años después a la Ciudad 17, bajo el control de la Alianza.",
    status: "available",
  },
  {
    id: "source-2",
    universeId: "half-life",
    name: "Source 2",
    subtitle: "Half-Life: Alyx",
    summary:
      "Half-Life: Alyx (2020), creado para realidad virtual, vuelve a la Ciudad 17 con Alyx Vance como protagonista. Su historia ocurre antes de Half-Life 2.",
    status: "available",
  },
  {
    id: "goldsrc-tf",
    universeId: "team-fortress",
    name: "GoldSrc",
    subtitle: "Team Fortress Classic",
    summary:
      "Team Fortress Classic (1999), el mod de Half-Life que definió el shooter por clases. Dos equipos, nueve clases, un objetivo.",
    status: "available",
  },
  {
    id: "source-tf",
    universeId: "team-fortress",
    name: "Source",
    subtitle: "Team Fortress 2",
    summary:
      "Team Fortress 2 (2007), la secuela libre que perfeccionó la fórmula con estilo artístico único, humor y actualizaciones constantes.",
    status: "available",
  },
];
