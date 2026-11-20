import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ValveHero } from "@/features/valve/components/valve-hero";
import {
  ValveRooms,
  type ValveRoom,
} from "@/features/valve/components/valve-rooms";
import { getSteamEras } from "@/features/valve/get-steam-eras";
import { getValveHardware } from "@/features/valve/get-valve-hardware";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import { getValvePeople } from "@/features/valve/get-valve-people";

export const metadata: Metadata = {
  title: "Valve",
  description:
    "La empresa detrás de Half-Life y Steam: su historia, la plataforma, su hardware y las personas que la hicieron.",
};

export default function ValvePage() {
  const milestones = getValveMilestones().length;
  const eras = getSteamEras().length;
  const devices = getValveHardware().length;
  const people = getValvePeople().length;

  const rooms: ValveRoom[] = [
    {
      id: "history",
      kicker: "Sala 01 · Línea de producción",
      title: "Historia",
      summary:
        "De los antiguos empleados de Microsoft a Half-Life, Steam y Steam Deck: los hitos de la empresa, año a año, con su fuente.",
      meta: `${milestones} hitos`,
      href: "/valve/historia",
    },
    {
      id: "steam",
      kicker: "Sala 02 · La plataforma",
      title: "Steam",
      summary:
        "Cómo una herramienta de actualizaciones se convirtió en la mayor tienda de juegos de PC, en sus tres épocas.",
      meta: `${eras} épocas`,
      href: "/valve/steam",
    },
    {
      id: "hardware",
      kicker: "Sala 03 · Laboratorio",
      title: "Hardware",
      summary:
        "Mandos, realidad virtual y ordenadores portátiles: los dispositivos que Valve ha diseñado, con su ficha técnica.",
      meta: `${devices} dispositivos`,
      href: "/valve/hardware",
    },
    {
      id: "people",
      kicker: "Sala 04 · Credenciales",
      title: "Gente",
      summary:
        "Fundadores, guionistas y diseñadores: las personas clave de Valve y lo que hicieron.",
      meta: `${people} personas`,
      href: "/valve/personas",
    },
  ];

  return (
    <main>
      <ValveHero
        breadcrumb={
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Valve" }]}
          />
        }
        eyebrow="Valve"
        title="Valve"
        intro="La empresa de Bellevue que hizo Half-Life, Team Fortress, Portal y Steam. Elige una sala."
      />
      <ValveRooms rooms={rooms} />
    </main>
  );
}
