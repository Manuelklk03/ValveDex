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
  {
    id: "source-l4d",
    universeId: "left-4-dead",
    name: "Source",
    subtitle: "Left 4 Dead",
    summary:
      "Left 4 Dead (2008) y su secuela (2009) definieron el cooperativo de supervivencia con la IA Director y ocho supervivientes memorables.",
    status: "available",
  },
  {
    id: "source-portal",
    universeId: "portal",
    name: "Source",
    subtitle: "Portal y Portal 2",
    summary:
      "Portal (2007) nació de un proyecto de estudiantes y se hizo célebre por su humor y sus puzles; Portal 2 (2011) amplió la historia con cooperativo y geles.",
    status: "available",
  },
  {
    id: "goldsrc-cs",
    universeId: "counter-strike",
    name: "GoldSrc",
    subtitle: "Counter-Strike 1.6, Condition Zero y Deleted Scenes",
    summary:
      "Counter-Strike (2000), el mod de Half-Life que definió el shooter táctico por rondas, y Condition Zero (2004), que añadió campañas para un jugador con bots.",
    status: "available",
  },
  {
    id: "source-cs",
    universeId: "counter-strike",
    name: "Source",
    subtitle: "Counter-Strike: Source y Global Offensive",
    summary:
      "Las entregas de 2004 y 2012 llevaron la serie al motor Source y a la escena competitiva.",
    status: "available",
  },
  {
    id: "source-2-cs",
    universeId: "counter-strike",
    name: "Source 2",
    subtitle: "Counter-Strike 2",
    summary: "Counter-Strike 2 (2023) traslada la serie a Source 2.",
    status: "available",
  },
];
