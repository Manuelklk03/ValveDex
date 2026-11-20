import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ValveHero } from "@/features/valve/components/valve-hero";
import { getValvePeople } from "@/features/valve/get-valve-people";
import styles from "./people-page.module.css";

export const metadata: Metadata = {
  title: "Gente de Valve",
  description:
    "Fundadores, guionistas y diseñadores que han hecho los juegos y la plataforma de Valve.",
};

export default function ValvePeoplePage() {
  const people = getValvePeople();

  return (
    <main>
      <ValveHero
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Valve", href: "/valve" },
              { label: "Gente" },
            ]}
          />
        }
        eyebrow="Valve"
        title="Gente de Valve"
        intro="Las personas detrás de los juegos y de la plataforma, con su papel y sus fuentes."
      />
      <ul className={styles["people-page__grid"]}>
        {people.map((person) => (
          <li key={person.id} className={styles["people-page__card"]}>
            {person.image ? (
              <Image
                src={person.image.src}
                alt=""
                width={96}
                height={96}
                className={styles["people-page__photo"]}
              />
            ) : (
              <span
                className={styles["people-page__initials"]}
                aria-hidden="true"
              >
                {person.name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
            <div>
              <h2 className={styles["people-page__name"]}>
                <Link
                  href={`/valve/personas/${person.slug}`}
                  className={styles["people-page__link"]}
                >
                  {person.name}
                </Link>
              </h2>
              <p className={styles["people-page__role"]}>{person.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
