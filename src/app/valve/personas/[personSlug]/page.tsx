import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ValveHero } from "@/features/valve/components/valve-hero";
import { notFound } from "next/navigation";
import {
  getValvePeople,
  getValvePersonBySlug,
} from "@/features/valve/get-valve-people";
import styles from "../../valve-page.module.css";

// Next 16.4 avisa en desarrollo de que `params` se lee fuera de Suspense; la página se genera entera
// en el build, así que se excluye de la validación de navegación instantánea
export const instant = false;

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
    <main>
      <ValveHero
        breadcrumb={
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: person.name }]}
          />
        }
        eyebrow={person.role}
        title={person.name}
        intro={person.summary}
        media={
          person.image && (
            <figure className={styles["valve-page__portrait"]}>
              <Image
                src={person.image.src}
                alt={person.image.alt}
                width={person.image.width}
                height={person.image.height}
                priority
                className={styles["valve-page__portrait-image"]}
              />
              <figcaption className={styles["valve-page__portrait-credit"]}>
                Foto:{" "}
                <a
                  href={person.image.source.url}
                  className={styles["valve-page__source-link"]}
                >
                  {person.image.credit}
                </a>
                {person.image.license && ` · ${person.image.license}`}
              </figcaption>
            </figure>
          )
        }
      />
      <div className={styles["valve-page"]}>
        <section
          className={styles["valve-page__section"]}
          aria-labelledby="sources-title"
        >
          <h2
            id="sources-title"
            className={styles["valve-page__section-title"]}
          >
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
      </div>
    </main>
  );
}
