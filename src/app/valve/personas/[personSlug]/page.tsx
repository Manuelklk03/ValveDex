import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";
import {
  getValvePeople,
  getValvePersonBySlug,
} from "@/features/valve/get-valve-people";
import styles from "../../valve-page.module.css";

export function generateStaticParams() {
  return getValvePeople().map((person) => ({
    personSlug: person.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/valve/personas/[personSlug]">): Promise<Metadata> {
  const { personSlug } = await params;

  const person = getValvePersonBySlug(personSlug);
  return {
    title: person?.name ?? "Persona no encontrada",
    description: person?.summary ?? "Descripción no encontrada",
  };
}

export default async function ValvePersonPage({
  params,
}: PageProps<"/valve/personas/[personSlug]">) {
  const { personSlug } = await params;

  const person = getValvePersonBySlug(personSlug);

  if (!person) return notFound();

  return (
    <main className={styles["valve-page"]}>
      <Breadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: person.name }]}
      />
      <header className={styles["valve-page__header"]}>
        <p className={styles["valve-page__eyebrow"]}>{person.role}</p>
        <h1 className={styles["valve-page__title"]}>{person.name}</h1>
        <p className={styles["valve-page__intro"]}>{person.summary}</p>
      </header>
      <section
        className={styles["valve-page__section"]}
        aria-labelledby="sources-title"
      >
        <h2 id="sources-title" className={styles["valve-page__section-title"]}>
          Fuentes
        </h2>
        <ul className={styles["valve-page__sources"]}>
          {person.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                className={styles["valve-page__source-link"]}
              >
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
