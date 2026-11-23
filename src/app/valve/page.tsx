import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ValveHero } from "@/features/valve/components/valve-hero";
import { ValveRooms } from "@/features/valve/components/valve-rooms";
import { getValveRooms } from "@/features/valve/get-valve-rooms";

export const metadata: Metadata = {
  title: "Valve",
  description:
    "La empresa detrás de Half-Life y Steam: su historia, la plataforma, su hardware y las personas que la hicieron.",
};

export default function ValvePage() {
  const rooms = getValveRooms();

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
