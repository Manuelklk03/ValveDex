import type { Milestone } from "@/domain/milestone";

const valveWikipedia = {
  title: "Valve Corporation - Wikipedia",
  url: "https://es.wikipedia.org/wiki/Valve_Corporation",
};

export const valveMilestones: Milestone[] = [
  {
    id: "valve-founded",
    year: 1996,
    title: "Fundación de Valve",
    description:
      "Gabe Newell y Mike Harrington, antiguos empleados de Microsoft, fundan Valve.",
    sources: [valveWikipedia],
  },
  {
    id: "half-life-release",
    year: 1998,
    title: "Lanzamiento de Half-Life",
    description:
      "Valve publica su primer juego, que se convierte en un referente de los shooters en primera persona.",
    sources: [valveWikipedia],
  },
  {
    id: "steam-launch",
    year: 2003,
    title: "Lanzamiento de Steam",
    description:
      "Valve lanza Steam, su plataforma para distribuir y actualizar juegos.",
    sources: [
      {
        title: "Steam - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Steam",
      },
    ],
  },
  {
    id: "half-life-2-release",
    year: 2004,
    title: "Half-Life 2 y el motor Source",
    description:
      "Llega Half-Life 2, primer juego construido sobre el motor Source de Valve.",
    sources: [valveWikipedia],
  },
  {
    id: "steam-deck-release",
    year: 2022,
    title: "Steam Deck",
    description:
      "Valve lanza su PC portátil para jugar a la biblioteca de Steam.",
    sources: [valveWikipedia],
  },
];
