import { getSteamEras } from "./get-steam-eras";
import { getValveHardware } from "./get-valve-hardware";
import { getValveMilestones } from "./get-valve-milestones";
import { getValvePeople } from "./get-valve-people";
import type { ValveRoom } from "./components/valve-rooms";

// Las cuatro salas de Valve con sus recuentos reales: las usan /valve y la portada
export function getValveRooms(): ValveRoom[] {
  return [
    {
      id: "history",
      kicker: "Sala 01 · Línea de producción",
      title: "Historia",
      summary:
        "De los antiguos empleados de Microsoft a Half-Life, Steam y Steam Deck: los hitos de la empresa, año a año, con su fuente.",
      meta: `${getValveMilestones().length} hitos`,
      href: "/valve/historia",
    },
    {
      id: "steam",
      kicker: "Sala 02 · La plataforma",
      title: "Steam",
      summary:
        "Cómo una herramienta de actualizaciones se convirtió en la mayor tienda de juegos de PC, en sus tres épocas.",
      meta: `${getSteamEras().length} épocas`,
      href: "/valve/steam",
    },
    {
      id: "hardware",
      kicker: "Sala 03 · Laboratorio",
      title: "Hardware",
      summary:
        "Mandos, realidad virtual y ordenadores portátiles: los dispositivos que Valve ha diseñado, con su ficha técnica.",
      meta: `${getValveHardware().length} dispositivos`,
      href: "/valve/hardware",
    },
    {
      id: "people",
      kicker: "Sala 04 · Credenciales",
      title: "Gente",
      summary:
        "Fundadores, guionistas y diseñadores: las personas clave de Valve y lo que hicieron.",
      meta: `${getValvePeople().length} personas`,
      href: "/valve/personas",
    },
  ];
}
