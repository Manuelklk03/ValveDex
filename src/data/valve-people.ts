import { valveMorePeople } from "./valve-expansion";
import type { ValvePerson } from "@/domain/valve-person";

const basePeople: ValvePerson[] = [
  {
    id: "gabe-newell",
    slug: "gabe-newell",
    name: "Gabe Newell",
    role: "Cofundador y presidente",
    summary:
      "Trabajó trece años en Microsoft antes de fundar Valve en 1996 junto a Mike Harrington.",
    image: {
      src: "/images/people/gabe-newell-gdc-2010.webp",
      alt: "Gabe Newell de frente, con gafas redondas, recogiendo un premio en la Game Developers Conference de 2010",
      width: 800,
      height: 990,
      source: {
        title: "File:Gabe Newell GDC 2010 (cropped 2).jpg - Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Gabe_Newell_GDC_2010_(cropped_2).jpg",
        kind: "wiki",
      },
      credit: "Official GDC; recortada y convertida a WebP",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    sources: [
      {
        title: "Gabe Newell - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Gabe_Newell",
        kind: "wiki",
      },
    ],
  },
  {
    id: "mike-harrington",
    slug: "mike-harrington",
    name: "Mike Harrington",
    role: "Cofundador",
    summary:
      "Antiguo programador de Microsoft, cofundó Valve en 1996 y dejó la empresa en el año 2000.",
    sources: [
      {
        title: "Valve Corporation - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Valve_Corporation",
        kind: "wiki",
      },
    ],
  },
  {
    id: "marc-laidlaw",
    slug: "marc-laidlaw",
    name: "Marc Laidlaw",
    role: "Guionista principal",
    summary:
      "Novelista de ciencia ficción que definió la narrativa ambiental de Black Mesa y la Resistencia como guionista principal de Half-Life, Half-Life 2 y sus episodios.",
    image: {
      src: "/images/people/marc-laidlaw.webp",
      alt: "Marc Laidlaw en la Game Developers Conference de 2011",
      width: 211,
      height: 274,
      source: {
        title: "File:Marc Laidlaw 2011.jpg - Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Marc_Laidlaw_2011.jpg",
        kind: "wiki",
      },
      credit: "Official GDC; recortada y convertida a WebP",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    sources: [
      {
        title: "Marc Laidlaw - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Marc_Laidlaw",
        kind: "wiki",
      },
      {
        title: "Marc Laidlaw - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Marc_Laidlaw",
        kind: "wiki",
      },
    ],
  },
  {
    id: "robin-walker",
    slug: "robin-walker",
    name: "Robin Walker",
    role: "Diseñador de juego y director",
    summary:
      "Cocreador del mod Team Fortress para Quake; contratado por Valve en 1998, lideró Team Fortress Classic, Team Fortress 2 y dirigió Half-Life: Alyx.",
    image: {
      src: "/images/people/robin-walker.webp",
      alt: "Robin Walker hablando con un micrófono en la mano",
      width: 640,
      height: 920,
      source: {
        title: "File:Robin Walker 2.png - Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Robin_Walker_2.png",
        kind: "wiki",
      },
      credit: "Washington Interactive Network; recortada y convertida a WebP",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
    sources: [
      {
        title: "Robin Walker - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Robin_Walker",
        kind: "wiki",
      },
      {
        title: "Robin Walker - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Robin_Walker_(game_designer)",
        kind: "wiki",
      },
    ],
  },
  {
    id: "kim-swift",
    slug: "kim-swift",
    name: "Kim Swift",
    role: "Diseñadora de niveles y líder de proyecto",
    summary:
      "Líder del equipo del DigiPen creador de Narbacular Drop; contratada por Valve, lideró el diseño y la dirección del desarrollo del primer Portal.",
    image: {
      src: "/images/people/kim-swift.webp",
      alt: "Kim Swift en un panel de la Game Developers Conference de 2010",
      width: 640,
      height: 877,
      source: {
        title:
          "File:Kim Swift - Game Developers Conference 2010 - Panel Day 4 (1).jpg - Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Kim_Swift_-_Game_Developers_Conference_2010_-_Panel_Day_4_(1).jpg",
        kind: "wiki",
      },
      credit: "Official GDC; recortada y convertida a WebP",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    sources: [
      {
        title: "Kim Swift - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Kim_Swift",
        kind: "wiki",
      },
      {
        title: "Kim Swift - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Kim_Swift",
        kind: "wiki",
      },
    ],
  },
  {
    id: "erik-johnson",
    slug: "erik-johnson",
    name: "Erik Johnson",
    role: "Director de desarrollo y operaciones",
    summary:
      "Uno de los primeros miembros del equipo de Valve desde 1996; coordinó la producción del primer Half-Life y la gestión comercial y técnica de Steam y Dota 2.",
    sources: [
      {
        title: "Erik Johnson - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Erik_Johnson",
        kind: "wiki",
      },
    ],
  },
  {
    id: "chet-faliszek",
    slug: "chet-faliszek",
    name: "Chet Faliszek",
    role: "Guionista y evangelista de realidad virtual",
    summary:
      "Coguionista de Half-Life 2: Episode One, Episode Two, Portal, Left 4 Dead y Left 4 Dead 2 junto a Erik Wolpaw, además de portavoz de los primeros pasos de Valve en realidad virtual.",
    image: {
      src: "/images/people/chet-faliszek.webp",
      alt: "Chet Faliszek en los Game Developers Conference Awards de 2012",
      width: 640,
      height: 796,
      source: {
        title:
          "File:Gdc 2012 wolpaw faliszek pinkerton cropped (cropped 1).jpg - Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Gdc_2012_wolpaw_faliszek_pinkerton_cropped_(cropped_1).jpg",
        kind: "wiki",
      },
      credit: "Official GDC; recortada y convertida a WebP",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    sources: [
      {
        title: "Chet Faliszek - Combine OverWiki",
        url: "https://combineoverwiki.net/wiki/Chet_Faliszek",
        kind: "wiki",
      },
      {
        title: "Chet Faliszek - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Chet_Faliszek",
        kind: "wiki",
      },
    ],
  },
];

export const valvePeople: ValvePerson[] = [...basePeople, ...valveMorePeople];
