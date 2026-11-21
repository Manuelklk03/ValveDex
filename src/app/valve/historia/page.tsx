import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import { HistoryLine } from "@/features/valve/components/history-line";
import { ValveHero } from "@/features/valve/components/valve-hero";

export const metadata: Metadata = {
  title: "Historia de Valve",
  description: "Cronología de Valve, desde su fundación en 1996",
};

export default function ValveHistoryPage() {
  const milestones = getValveMilestones();

  return (
    <main>
      <ValveHero
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Valve", href: "/valve" },
              { label: "Historia" },
            ]}
          />
        }
        eyebrow="Valve"
        title="Historia de Valve"
        intro="Los momentos clave de Valve, desde su fundación en 1996"
      />
      <HistoryLine milestones={milestones} />
    </main>
  );
}
