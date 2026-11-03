import type { Source } from "@/domain/source";
import type { SteamEra } from "@/domain/steam-era";

const steamWikipedia: Source = {
  title: "Steam - Wikipedia (inglés)",
  url: "https://en.wikipedia.org/wiki/Steam_(service)",
  kind: "wiki",
};

export const steamEras: SteamEra[] = [
  {
    id: "origins",
    name: "Los orígenes",
    yearFrom: 2002,
    yearTo: 2009,
    summary:
      "Steam nace como una herramienta para actualizar los juegos de Valve y se convierte en tienda con Half-Life 2 y las primeras ventas de terceros.",
    events: [
      {
        id: "steam-beta",
        year: 2002,
        date: "22 de marzo de 2002",
        title: "Beta de Steam",
        description:
          "Valve presenta Steam en la Game Developers Conference y abre la beta.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-launch",
        year: 2003,
        date: "12 de septiembre de 2003",
        title: "Lanzamiento oficial",
        description: "Steam sale de la beta.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-half-life-2",
        year: 2004,
        date: "Noviembre de 2004",
        title: "Half-Life 2 exige Steam",
        description:
          "Half-Life 2 es el primer juego importante que se vende en digital en Steam, y las copias en tienda necesitan el cliente.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-third-party",
        year: 2005,
        title: "Los primeros juegos de terceros",
        description:
          "Valve contrata a desarrolladores externos para publicar juegos como Rag Doll Kung Fu y Darwinia.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-steamworks",
        year: 2008,
        date: "Mayo de 2008",
        title: "Steamworks",
        description:
          "El SDK Steamworks permite a cualquiera integrar Steam en sus juegos sin la intervención directa de Valve.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-cloud",
        year: 2008,
        date: "Septiembre de 2008",
        title: "Steam Cloud",
        description: "Las partidas guardadas se almacenan automáticamente.",
        sources: [steamWikipedia],
      },
    ],
  },
  {
    id: "platform",
    name: "La plataforma",
    yearFrom: 2010,
    yearTo: 2021,
    summary:
      "Steam sale del escritorio de Windows y se abre a creadores, sistemas y mandos: Mac, Linux, Big Picture, Greenlight y Direct.",
    events: [
      {
        id: "steam-mac",
        year: 2010,
        title: "Cliente para Mac OS X",
        description:
          "Steam llega a Mac. En enero de 2010 la plataforma contaba con 25 millones de cuentas activas.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-greenlight",
        year: 2012,
        date: "Julio de 2012",
        title: "Steam Greenlight",
        description:
          "Valve anuncia Greenlight en julio y lo abre en agosto. Los desarrolladores pagan una cuota de 100 dólares, que se dona a Child's Play.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-big-picture",
        year: 2012,
        date: "Diciembre de 2012",
        title: "Big Picture",
        description:
          "El modo pensado para el salón y el mando se lanza en todo el mundo, tras una beta pública en septiembre.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-linux",
        year: 2013,
        title: "Cliente para Linux",
        description: "Steam llega a Linux.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-steamos",
        year: 2015,
        title: "SteamOS y Steam Machines",
        description:
          "Valve publica SteamOS e introduce las Steam Machines, PC de juegos basados en él.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-direct",
        year: 2017,
        date: "13 de junio de 2017",
        title: "Steam Direct",
        description:
          "Sustituye a Greenlight, cerrado la semana anterior. La cuota es de 100 dólares, reembolsable a partir de 1.000 dólares en ventas.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-library-2019",
        year: 2019,
        date: "Octubre de 2019",
        title: "Nueva biblioteca",
        description:
          "Un rediseño visual de la biblioteca llega junto con los eventos de Steam.",
        sources: [steamWikipedia],
      },
    ],
  },
  {
    id: "unified",
    name: "El cliente unificado",
    yearFrom: 2022,
    summary:
      "Con el Steam Deck, Big Picture adopta la interfaz del portátil y, en 2023, el cliente de escritorio se renueva sobre la misma base.",
    events: [
      {
        id: "steam-deck-ships",
        year: 2022,
        date: "Febrero de 2022",
        title: "Llega Steam Deck",
        description: "Los primeros Steam Deck empiezan a enviarse.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-big-picture-deck",
        year: 2022,
        date: "Octubre de 2022",
        title: "Big Picture con la interfaz del Deck",
        description:
          "Valve prueba en beta un Big Picture basado en la interfaz del Steam Deck; saldría completo en febrero de 2023.",
        sources: [steamWikipedia],
      },
      {
        id: "steam-client-2023",
        year: 2023,
        date: "Junio de 2023",
        title: "Cliente de escritorio renovado",
        description:
          "Una renovación visual y de arquitectura unifica el cliente de Steam y el del Steam Deck.",
        sources: [steamWikipedia],
      },
      {
        id: "steamvr-2",
        year: 2023,
        date: "Octubre de 2023",
        title: "SteamVR 2.0",
        description: "SteamVR adopta la interfaz unificada.",
        sources: [steamWikipedia],
      },
    ],
  },
];
