import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getValveHardware } from "@/features/valve/get-valve-hardware";
import { HardwareCard } from "@/features/valve/components/hardware-card";
import styles from "./hardware-page.module.css";

export const metadata: Metadata = {
  title: "Hardware de Valve",
  description:
    "Dispositivos, mandos, realidad virtual y ordenadores desarrollados por Valve.",
};

export default function ValveHardwarePage() {
  const hardwareList = getValveHardware();

  return (
    <main className={styles["hardware-page"]}>
      <Breadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: "Hardware" }]}
      />

      <header className={styles["hardware-page__header"]}>
        <p className={styles["hardware-page__eyebrow"]}>Valve</p>
        <h1 className={styles["hardware-page__title"]}>Hardware de Valve</h1>
        <p className={styles["hardware-page__intro"]}>
          De la experimentación con controladores hápticos y sistemas de
          realidad virtual a escala de habitación, hasta ordenadores portátiles
          para juegos. El recorrido tecnológico de los dispositivos diseñados
          por Valve.
        </p>
      </header>

      <section
        className={styles["hardware-page__grid"]}
        aria-label="Catálogo de hardware de Valve"
      >
        {hardwareList.map((device) => (
          <HardwareCard key={device.id} hardware={device} />
        ))}
      </section>

      <nav
        className={styles["hardware-page__nav"]}
        aria-label="Secciones relacionadas de Valve"
      >
        <Link
          href="/valve/historia"
          className={styles["hardware-page__nav-link"]}
        >
          ← Ver la historia completa de Valve
        </Link>
        <Link href="/valve/steam" className={styles["hardware-page__nav-link"]}>
          Conocer las épocas de Steam →
        </Link>
      </nav>
    </main>
  );
}
