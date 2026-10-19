import type { ValvePerson } from "@/domain/valve-person";

export const valvePeople: ValvePerson[] = [
  {
    id: "gabe-newell",
    slug: "gabe-newell",
    name: "Gabe Newell",
    role: "Cofundador y presidente",
    summary:
      "Trabajó trece años en Microsoft antes de fundar Valve en 1996 junto a Mike Harrington.",
    sources: [
      {
        title: "Gabe Newell - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Gabe_Newell",
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
      },
    ],
  },
];
