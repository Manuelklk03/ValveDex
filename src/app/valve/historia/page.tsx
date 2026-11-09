import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Timeline } from "@/components/ui/timeline";
import { getValveMilestones } from "@/features/valve/get-valve-milestones";
import { ValveHero } from "@/features/valve/components/valve-hero";
import styles from "../valve-page.module.css";

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
              { label: "Historia de Valve" },
            ]}
          />
        }
        eyebrow="Valve"
        title="Historia de Valve"
        intro="Los momentos clave de Valve, desde su fundación en 1996"
      />
      <div className={styles["valve-page"]}>
        <Timeline milestones={milestones} />
      </div>
    </main>
  );
}
