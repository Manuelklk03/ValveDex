import { valveMoreHardware } from "./valve-expansion";
import type { ValveHardware } from "@/domain/valve-hardware";

const baseHardware: ValveHardware[] = [
  {
    id: "steam-controller",
    slug: "steam-controller",
    name: "Steam Controller",
    year: 2015,
    category: "controller",
    tagline:
      "El mando diseñado para jugar a todo el catálogo de Steam sin ratón ni teclado.",
    summary:
      "Lanzado en noviembre de 2015, sustituyó los sticks analógicos tradicionales por dos trackpads circulares con retroalimentación háptica de alta fidelidad, gatillos de doble etapa, giroscopio y botones traseros integrados en la empuñadura.",
    specs: [
      {
        label: "Control",
        value: "Dos trackpads hápticos de alta resolución y un stick analógico",
      },
      {
        label: "Sensores",
        value: "Giroscopio y acelerómetros para control por movimiento",
      },
      {
        label: "Conectividad",
        value: "Inalámbrica (dongle USB propio de 2.4 GHz) o cable Micro-USB",
      },
      {
        label: "Alimentación",
        value: "2 pilas AA (hasta 80 horas de autonomía)",
      },
    ],
    sources: [
      {
        title: "Steam Controller - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Steam_Controller",
        kind: "wiki",
      },
      {
        title: "Steam Controller - Valve Support",
        url: "https://help.steampowered.com/es/faqs/view/5253-3BEF-D9F4-58DE",
        kind: "official",
      },
    ],
  },
  {
    id: "steam-link",
    slug: "steam-link",
    name: "Steam Link",
    year: 2015,
    category: "streaming",
    tagline:
      "Dispositivo de transmisión local de baja latencia para jugar al PC en el salón.",
    summary:
      "Lanzado en noviembre de 2015, permitía transmitir vídeo y controles a 1080p y 60 FPS desde un ordenador con Steam hacia cualquier televisor conectado por HDMI a través de la red local doméstica.",
    specs: [
      { label: "Resolución", value: "1080p a 60 FPS" },
      {
        label: "Puertos",
        value: "HDMI 1.4, 3 puertos USB 2.0 y Ethernet 10/100",
      },
      {
        label: "Red",
        value: "Wi-Fi 802.11ac 2x2 (MIMO) y Bluetooth 4.0",
      },
    ],
    sources: [
      {
        title: "Steam Link - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Steam_Link",
        kind: "wiki",
      },
      {
        title: "Hardware de Steam Link - Valve Support",
        url: "https://help.steampowered.com/es/faqs/view/0660-67B4-4B2E-30FD",
        kind: "official",
      },
    ],
  },
  {
    id: "steam-machines",
    slug: "steam-machines",
    name: "Steam Machines",
    year: 2015,
    category: "pc",
    tagline:
      "La iniciativa de ordenadores de salón basados en Linux y SteamOS.",
    summary:
      "Comercializadas en noviembre de 2015 por diversos fabricantes de hardware (Alienware, ZOTAC, CyberPowerPC), combinaban un formato compacto para el salón con SteamOS. Fueron el catalizador inicial del desarrollo del API Vulkan y de la capa de compatibilidad Proton.",
    specs: [
      {
        label: "Sistema operativo",
        value: "SteamOS (basado originalmente en Debian GNU/Linux)",
      },
      {
        label: "Arquitectura",
        value: "x86-64 con gráficos dedicados (NVIDIA y AMD)",
      },
      {
        label: "Controlador",
        value: "Steam Controller incluido por los fabricantes",
      },
    ],
    sources: [
      {
        title: "Steam Machine - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Steam_Machine",
        kind: "wiki",
      },
    ],
  },
  {
    id: "htc-vive",
    slug: "htc-vive",
    name: "HTC Vive",
    year: 2016,
    category: "vr",
    tagline:
      "El sistema pionero de realidad virtual con seguimiento a escala de habitación.",
    summary:
      "Desarrollado conjuntamente entre Valve y HTC y comercializado en abril de 2016. Valve aportó el sistema de seguimiento por láser Lighthouse (SteamVR Tracking) y la plataforma SteamVR, introduciendo por primera vez experiencias de realidad virtual a escala de habitación.",
    specs: [
      {
        label: "Resolución",
        value: "2160 x 1200 combinada (1080 x 1200 por ojo OLED a 90 Hz)",
      },
      { label: "Campo de visión", value: "Aproximadamente 110 grados" },
      {
        label: "Seguimiento",
        value: "Lighthouse 1.0 con estaciones base láser",
      },
    ],
    sources: [
      {
        title: "HTC Vive - Wikipedia",
        url: "https://es.wikipedia.org/wiki/HTC_Vive",
        kind: "wiki",
      },
    ],
  },
  {
    id: "valve-index",
    slug: "valve-index",
    name: "Valve Index",
    year: 2019,
    category: "vr",
    tagline:
      "Fidelidad visual, altavoces flotantes y mandos con seguimiento individual de dedos.",
    summary:
      "Lanzado en junio de 2019, es el primer visor de realidad virtual diseñado y fabricado íntegramente por Valve. Destaca por sus paneles LCD RGB a 120/144 Hz, altavoces BMR fuera de la oreja y mandos con sensores capacitivos que detectan cada dedo de forma independiente.",
    specs: [
      {
        label: "Resolución",
        value: "2880 x 1600 combinada (1440 x 1600 por ojo RGB a 120/144 Hz)",
      },
      {
        label: "Audio",
        value: "Altavoces ultra-nearfield BMR flotantes fuera de la oreja",
      },
      {
        label: "Controladores",
        value:
          "Index Controllers con seguimiento de 5 dedos y sensor de presión",
      },
      {
        label: "Seguimiento",
        value: "SteamVR Tracking 2.0 con estaciones base láser",
      },
    ],
    sources: [
      {
        title: "Valve Index - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Valve_Index",
        kind: "wiki",
      },
      {
        title: "Valve Index - Steam",
        url: "https://store.steampowered.com/valveindex",
        kind: "official",
      },
    ],
  },
  {
    id: "steam-deck",
    slug: "steam-deck",
    name: "Steam Deck",
    year: 2022,
    category: "handheld",
    tagline:
      "Todo el catálogo de Steam en un ordenador portátil potente y ergonómico.",
    summary:
      "Lanzado en febrero de 2022, es un PC portátil para juegos con APU personalizada de AMD (Zen 2 y RDNA 2), doble trackpad y controles completos. Funciona con SteamOS 3 (basado en Arch Linux) y la capa de traducción Proton para ejecutar juegos de Windows en Linux sin adaptación técnica obligatoria.",
    specs: [
      {
        label: "Pantalla",
        value: "LCD IPS de 7 pulgadas, 1280 x 800 a 60 Hz",
      },
      {
        label: "Procesador",
        value: "APU AMD Aerith (CPU Zen 2 de 4 núcleos y GPU RDNA 2)",
      },
      {
        label: "Memoria y batería",
        value: "16 GB LPDDR5 y batería de 40 Wh (2 a 8 horas de autonomía)",
      },
      {
        label: "Sistema operativo",
        value: "SteamOS 3 (basado en Arch Linux) con Proton",
      },
    ],
    sources: [
      {
        title: "Steam Deck - Wikipedia",
        url: "https://es.wikipedia.org/wiki/Steam_Deck",
        kind: "wiki",
      },
      {
        title: "Steam Deck - Sitio oficial de Valve",
        url: "https://www.steamdeck.com/es/",
        kind: "official",
      },
    ],
  },
  {
    id: "steam-deck-oled",
    slug: "steam-deck-oled",
    name: "Steam Deck OLED",
    year: 2023,
    category: "handheld",
    tagline: "Pantalla OLED HDR, mayor autonomía y conectividad Wi-Fi 6E.",
    summary:
      "Presentado en noviembre de 2023 como una profunda revisión del modelo original. Incorpora un panel OLED HDR de 7,4 pulgadas a 90 Hz con negros puros, APU de 6 nm más eficiente, batería de 50 Wh, Wi-Fi 6E y peso ligeramente reducido.",
    specs: [
      {
        label: "Pantalla",
        value:
          "OLED HDR de 7,4 pulgadas, 1280 x 800 a 90 Hz (hasta 1000 nits en HDR)",
      },
      {
        label: "Procesador",
        value: "APU AMD Sephiroth en proceso de 6 nm",
      },
      {
        label: "Batería y red",
        value: "Batería de 50 Wh (3 a 12 horas) y Wi-Fi 6E",
      },
      {
        label: "Peso",
        value: "Aproximadamente 640 gramos (30 gramos menos que el LCD)",
      },
    ],
    sources: [
      {
        title: "Steam Deck OLED - Sitio oficial",
        url: "https://www.steamdeck.com/es/oled",
        kind: "official",
      },
    ],
  },
];

export const valveHardware: ValveHardware[] = [
  ...baseHardware,
  ...valveMoreHardware,
];
