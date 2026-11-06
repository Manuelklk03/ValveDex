import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DossierHeader } from "@/components/ui/dossier-header";
import { EntryCard } from "@/features/catalog/components/entry-card";
import {
  getLevelEntries,
  getLevelPage,
  getLevelPaths,
} from "@/features/catalog/get-levels";
import { getGameSectionById } from "@/features/games/get-game-sections";
import {
  getGameById,
  getUniverseById,
} from "@/features/universes/get-universes";
import styles from "./level-page.module.css";

export function generateStaticParams() {
  return getLevelPaths();
}

export async function generateMetadata({
  params,
}: PageProps<"/fichas/[entrySlug]/[levelSlug]">): Promise<Metadata> {
  const { entrySlug, levelSlug } = await params;
  const page = getLevelPage(entrySlug, levelSlug);

  if (!page) return { title: "Nivel no encontrado" };

  return {
    title: `${page.level.title} · ${page.chapter.name}`,
    description: page.level.detail?.summary ?? page.chapter.summary,
  };
}

export default async function LevelPage({
  params,
}: PageProps<"/fichas/[entrySlug]/[levelSlug]">) {
  const { entrySlug, levelSlug } = await params;
  const page = getLevelPage(entrySlug, levelSlug);

  if (!page) notFound();

  const { chapter, level, previous, next } = page;
  const detail = level.detail;
  const { characters, weapons, enemies } = getLevelEntries(level);
  const groups = [
    { id: "characters", title: "Personajes que aparecen", entries: characters },
    { id: "weapons", title: "Armas que se encuentran", entries: weapons },
    { id: "enemies", title: "Enemigos que aparecen", entries: enemies },
  ].filter((group) => group.entries.length > 0);

  const game = getGameById(chapter.appearances[0]?.gameId ?? "");
  const universe = game ? getUniverseById(game.universeId) : undefined;
  const section = getGameSectionById("maps");
  const gamePath =
    game && universe ? `/universos/${universe.slug}/${game.slug}` : undefined;
  const chapterPath = `/fichas/${chapter.slug}`;
  const visibleParagraphs = detail?.paragraphs?.filter((p) => !p.spoiler) ?? [];
  const spoilerParagraphs = detail?.paragraphs?.filter((p) => p.spoiler) ?? [];

  return (
    <main className={styles["level-page"]}>
      <Breadcrumb
        items={[
          { label: "Universos", href: "/universos" },
          ...(universe && game && gamePath
            ? [
                { label: universe.name, href: `/universos/${universe.slug}` },
                { label: game.name, href: gamePath },
              ]
            : []),
          ...(section && gamePath
            ? [{ label: section.name, href: `${gamePath}/${section.slug}` }]
            : []),
          { label: chapter.name, href: chapterPath },
          { label: level.title },
        ]}
      />

      <DossierHeader
        title={level.title}
        summary={
          detail?.summary ??
          `Nivel ${level.order} de ${level.total} del capítulo «${chapter.name}». Todavía no tiene ficha detallada.`
        }
        specs={[
          { label: "Archivo de mapa", value: level.mapFile },
          { label: "Capítulo", value: chapter.name },
          { label: "Nivel", value: `${level.order} de ${level.total}` },
          ...(game ? [{ label: "Juego", value: game.name }] : []),
        ]}
      />

      {(visibleParagraphs.length > 0 || spoilerParagraphs.length > 0) && (
        <section
          className={styles["level-page__section"]}
          aria-labelledby="level-description-title"
        >
          <h2
            id="level-description-title"
            className={styles["level-page__section-title"]}
          >
            Qué se hace en el nivel
          </h2>
          <div className={styles["level-page__text"]}>
            {visibleParagraphs.map((paragraph) => (
              <p key={paragraph.text}>{paragraph.text}</p>
            ))}
          </div>
          {spoilerParagraphs.length > 0 && (
            <details className={styles["level-page__spoiler"]}>
              <summary className={styles["level-page__spoiler-summary"]}>
                Mostrar detalles que revelan la historia
              </summary>
              <div className={styles["level-page__text"]}>
                {spoilerParagraphs.map((paragraph) => (
                  <p key={paragraph.text}>{paragraph.text}</p>
                ))}
              </div>
            </details>
          )}
        </section>
      )}

      <section
        className={styles["level-page__section"]}
        aria-labelledby="level-images-title"
      >
        <h2
          id="level-images-title"
          className={styles["level-page__section-title"]}
        >
          Fotos del nivel
        </h2>
        {detail?.images && detail.images.length > 0 ? (
          <ul className={styles["level-page__images"]}>
            {detail.images.map((image) => (
              <li key={image.src} className={styles["level-page__figure"]}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className={styles["level-page__image"]}
                />
                <p className={styles["level-page__credit"]}>
                  Imagen:{" "}
                  <a
                    href={image.source.url}
                    className={styles["level-page__source-link"]}
                  >
                    {image.source.title}
                  </a>
                  {image.credit && ` · ${image.credit}`}
                  {image.license && ` · ${image.license}`}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles["level-page__empty"]}>
            Todavía no hay fotos de este nivel.
          </p>
        )}
      </section>

      {groups.map((group) => (
        <section
          key={group.id}
          className={styles["level-page__section"]}
          aria-labelledby={`level-${group.id}-title`}
        >
          <h2
            id={`level-${group.id}-title`}
            className={styles["level-page__section-title"]}
          >
            {group.title}
          </h2>
          <ul className={styles["level-page__cards"]}>
            {group.entries.map((entry) => (
              <li key={entry.id}>
                <EntryCard entry={entry} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {level.fromGameFiles && (
        <p className={styles["level-page__note"]}>
          Los personajes, enemigos y armas de este nivel se han leído de la
          lista de entidades del archivo del mapa ({level.mapFile}.bsp) del
          juego. Pueden faltar los que se crean por script o los que todavía no
          tienen ficha.
        </p>
      )}

      {detail && (
        <section
          className={styles["level-page__section"]}
          aria-labelledby="level-sources-title"
        >
          <h2
            id="level-sources-title"
            className={styles["level-page__section-title"]}
          >
            Fuentes
          </h2>
          <ul className={styles["level-page__sources"]}>
            {detail.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  className={styles["level-page__source-link"]}
                >
                  {source.title}
                </a>
                {source.kind === "community" && (
                  <span className={styles["level-page__source-kind"]}>
                    {" "}
                    (comunidad)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav
        className={styles["level-page__pager"]}
        aria-label="Niveles del capítulo"
      >
        {previous ? (
          <Link
            href={`${chapterPath}/${previous.mapFile}`}
            className={styles["level-page__pager-link"]}
          >
            <span className={styles["level-page__pager-label"]}>Anterior</span>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        <Link href={chapterPath} className={styles["level-page__pager-link"]}>
          <span className={styles["level-page__pager-label"]}>Capítulo</span>
          {chapter.name}
        </Link>
        {next ? (
          <Link
            href={`${chapterPath}/${next.mapFile}`}
            className={styles["level-page__pager-link"]}
          >
            <span className={styles["level-page__pager-label"]}>Siguiente</span>
            {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
