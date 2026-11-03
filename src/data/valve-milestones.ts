import type { Milestone } from "@/domain/milestone";
import type { Source } from "@/domain/source";

const valveWikipedia: Source = {
  title: "Valve Corporation - Wikipedia (inglés)",
  url: "https://en.wikipedia.org/wiki/Valve_Corporation",
  kind: "wiki",
};

const steamWikipedia: Source = {
  title: "Steam - Wikipedia (inglés)",
  url: "https://en.wikipedia.org/wiki/Steam_(service)",
  kind: "wiki",
};

export const valveMilestones: Milestone[] = [
  {
    id: "valve-founded",
    year: 1996,
    date: "24 de agosto de 1996",
    title: "Fundación de Valve",
    description:
      "Gabe Newell y Mike Harrington, antiguos empleados de Microsoft, fundan Valve en Kirkland (Washington).",
    sources: [valveWikipedia],
  },
  {
    id: "half-life-release",
    year: 1998,
    date: "Noviembre de 1998",
    title: "Lanzamiento de Half-Life",
    description:
      "Valve publica su primer juego, un shooter en primera persona que triunfa entre la crítica y el público.",
    sources: [valveWikipedia],
  },
  {
    id: "steam-launch",
    year: 2003,
    date: "12 de septiembre de 2003",
    title: "Lanzamiento de Steam",
    description:
      "Steam sale de la beta, que había empezado el 22 de marzo de 2002. Nació para repartir parches de los juegos en línea de Valve.",
    sources: [steamWikipedia],
  },
  {
    id: "half-life-2-release",
    year: 2004,
    date: "Noviembre de 2004",
    title: "Half-Life 2 y el motor Source",
    description:
      "Llega Half-Life 2, construido sobre Source, el motor que Valve desarrolló para sustituir a GoldSrc. Las copias en tienda exigían Steam.",
    sources: [valveWikipedia, steamWikipedia],
  },
  {
    id: "orange-box",
    year: 2007,
    date: "Febrero de 2007",
    title: "The Orange Box",
    description:
      "Valve anuncia The Black Box y The Orange Box, paquetes de juegos y expansiones que distribuye Electronic Arts.",
    sources: [valveWikipedia],
  },
  {
    id: "dota-2-release",
    year: 2013,
    title: "Dota 2",
    description:
      "Se publica Dota 2, la secuela de Defense of the Ancients. Valve había contratado a IceFrog en 2009.",
    sources: [valveWikipedia],
  },
  {
    id: "steam-machines",
    year: 2015,
    date: "Noviembre de 2015",
    title: "Steam Machines y Steam Controller",
    description:
      "Valve lanza las Steam Machines, que se venden poco, y el primer Steam Controller.",
    sources: [valveWikipedia],
  },
  {
    id: "valve-index",
    year: 2019,
    date: "Junio de 2019",
    title: "Valve Index",
    description:
      "Valve publica su hardware de realidad virtual de segunda generación.",
    sources: [valveWikipedia],
  },
  {
    id: "half-life-alyx",
    year: 2020,
    date: "Marzo de 2020",
    title: "Half-Life: Alyx",
    description:
      "Llega el juego de realidad virtual de Half-Life, acogido como la primera «killer app» de la VR.",
    sources: [valveWikipedia],
  },
  {
    id: "steam-deck-release",
    year: 2022,
    date: "Febrero de 2022",
    title: "Steam Deck",
    description:
      "Valve anunció su PC portátil en julio de 2021 y empezó a enviarlo en febrero de 2022.",
    sources: [valveWikipedia],
  },
  {
    id: "counter-strike-2",
    year: 2023,
    date: "Septiembre de 2023",
    title: "Counter-Strike 2",
    description:
      "Se publica Counter-Strike 2, con críticas favorables en general y una acogida desigual entre los jugadores.",
    sources: [valveWikipedia],
  },
];
