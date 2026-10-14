import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isEntryCategory } from "@/domain/entry";
import { EntryCard } from "@/features/catalog/components/entry-card";
import { getEntriesByCategory } from "@/features/catalog/get-entries";
import {
  getGameSectionBySlug,
  getGameSections,
} from "@/features/games/get-game-sections";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getGameSections()
    .filter(
      (section) =>
        isEntryCategory(section.id) &&
        getEntriesByCategory(section.id).length > 0,
    )
    .map((section) => ({ categorySlug: section.slug }));
}

function getCategoryPageData(categorySlug: string) {
  const section = getGameSectionBySlug(categorySlug);

  if (!section || !isEntryCategory(section.id)) {
    return undefined;
  }

  return { section, entries: getEntriesByCategory(section.id) };
}

export async function generateMetadata({
  params,
}: PageProps<"/explorar/[categorySlug]">): Promise<Metadata> {
  const { categorySlug } = await params;
  const data = getCategoryPageData(categorySlug);

  return {
    title: data ? data.section.name : "Categoría no encontrada",
    description: data?.section.description,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/explorar/[categorySlug]">) {
  const { categorySlug } = await params;
  const data = getCategoryPageData(categorySlug);

  if (!data) {
    notFound();
  }

  const { section, entries } = data;

  return (
    <main className={styles["category-page"]}>
      <nav aria-label="Ruta de navegación">
        <Link href="/explorar" className={styles["category-page__back"]}>
          ← Explorar
        </Link>
      </nav>

      <header className={styles["category-page__header"]}>
        <h1 className={styles["category-page__title"]}>{section.name}</h1>
        <p className={styles["category-page__intro"]}>
          {entries.length} {entries.length === 1 ? "ficha" : "fichas"} de todos
          los juegos.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className={styles["category-page__empty"]}>
          Todavía no hay fichas en esta categoría.
        </p>
      ) : (
        <ul className={styles["category-page__grid"]}>
          {entries.map((entry) => (
            <li key={entry.id}>
              <EntryCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
