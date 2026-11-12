import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { isEntryCategory } from "@/domain/entry";
import type { GameSection } from "@/domain/game-section";
import { dossierArt } from "@/data/dossier-art";
import { engineerBuildings } from "@/data/team-fortress-buildings";
import { TeamEntryCount } from "@/components/ui/team-entry-count";
import { TeamPicker } from "@/components/ui/team-picker";
import { getGameTeams } from "@/data/game-teams";
import { BuildingList } from "@/features/catalog/components/building-list";
import { EntryTile } from "@/features/catalog/components/entry-tile";
import {
  getEntryAppearance,
  getEntryThumbnail,
  getEntrySummaryForGame,
} from "@/features/catalog/get-entries";
import { getEntryFacts } from "@/features/catalog/get-entry-facts";
import { GameHero } from "@/features/games/components/game-hero";
import { getGameLore } from "@/features/games/get-game-lore";
import {
  getRivalTeam,
  groupOrder,
  getSectionEntries,
  getTeamLeaders,
  type SectionEntry,
  type SectionGroup,
} from "@/features/games/get-section-entries";
import {
  getGameSectionBySlug,
  getGameSections,
} from "@/features/games/get-game-sections";
import {
  getGamesByUniverse,
  getUniverseAndGame,
  getUniverses,
} from "@/features/universes/get-universes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import styles from "./page.module.css";

function hasSectionContent(gameId: string, section: GameSection): boolean {
  return isEntryCategory(section.id)
    ? getSectionEntries(gameId, section.id).length > 0
    : getGameLore(gameId) !== undefined;
}

// Next 16.4 avisa en desarrollo de que `params` se lee fuera de Suspense; la página se genera entera
// en el build, así que se excluye de la validación de navegación instantánea
export const instant = false;

export function generateStaticParams() {
  return getUniverses()
    .filter((universe) => universe.status === "available")
    .flatMap((universe) =>
      getGamesByUniverse(universe.id).flatMap((game) =>
        getGameSections()
          .filter((section) => hasSectionContent(game.id, section))
          .map((section) => ({
            universeSlug: universe.slug,
            gameSlug: game.slug,
            sectionSlug: section.slug,
          })),
      ),
    );
}

function getSectionPageData(
  universeSlug: string,
  gameSlug: string,
  sectionSlug: string,
) {
  const result = getUniverseAndGame(universeSlug, gameSlug);
  const section = getGameSectionBySlug(sectionSlug);

  if (!result || !section) {
    return undefined;
  }

  if (!isEntryCategory(section.id)) {
    const lore = getGameLore(result.game.id);

    return lore
      ? { ...result, section, kind: "lore" as const, lore }
      : undefined;
  }

  const entries = getSectionEntries(result.game.id, section.id);

  return { ...result, section, kind: "entries" as const, entries };
}

export async function generateMetadata({
  params,
}: PageProps<"/universos/[universeSlug]/[gameSlug]/[sectionSlug]">): Promise<Metadata> {
  const { universeSlug, gameSlug, sectionSlug } = await params;
  const data = getSectionPageData(universeSlug, gameSlug, sectionSlug);

  return {
    title: data
      ? `${data.section.name} · ${data.game.name}`
      : "Apartado no encontrado",
    description: data?.section.description,
  };
}

// Orden y título de cada grupo: en «Personajes» es tu equipo; en «Enemigos», el rival
const groupTitles: Record<"own" | "rival", Record<SectionGroup, string>> = {
  own: {
    leader: "Líder del equipo",
    mercenaries: "Mercenarios",
    robots: "Robots",
    units: "Unidades",
    others: "Otros personajes",
  },
  rival: {
    leader: "Líder rival",
    mercenaries: "Mercenarios rivales",
    robots: "Robots",
    units: "Unidades rivales",
    others: "Otros enemigos",
  },
};

// Equipos de un grupo de fichas: la unión de los suyos, o ninguno (visible siempre) si alguna ficha sirve a todos
function getGroupTeams(items: SectionEntry[]): string | undefined {
  return items.every((item) => item.teams)
    ? [...new Set(items.flatMap((item) => item.teams ?? []))].join(" ")
    : undefined;
}

export default async function SectionPage({
  params,
}: PageProps<"/universos/[universeSlug]/[gameSlug]/[sectionSlug]">) {
  const { universeSlug, gameSlug, sectionSlug } = await params;

  const data = getSectionPageData(universeSlug, gameSlug, sectionSlug);

  if (!data) {
    notFound();
  }

  const { universe, game, section } = data;

  const teams = getGameTeams(game.id);
  const items = data.kind === "entries" ? data.entries : [];
  const titles = groupTitles[section.id === "enemies" ? "rival" : "own"];
  const groups = groupOrder
    .map((group) => ({
      group,
      items: items.filter((item) => item.group === group),
    }))
    .filter((group) => group.items.length > 0);
  // Solo se agrupa en los juegos con equipos y si hay algo más que el grupo de «otros»
  const isGrouped =
    teams.length > 0 && groups.some((group) => group.group !== "others");

  function renderTile({ entry, teams: visibleTeams, isRival }: SectionEntry) {
    const buildings = engineerBuildings.filter(
      (building) =>
        building.gameId === game.id &&
        (entry.id === "tf-engineer" || entry.id === "tfc-class-engineer"),
    );
    const images = getEntryAppearance(entry, game.id)?.images;
    // Como enemigo, cada equipo ve la ficha con la piel del rival (RED ve al mercenario BLU)
    const rivalImages = Object.fromEntries(
      teams.flatMap((team) => {
        const image = images?.teams?.[getRivalTeam(entry.id, team.id) ?? ""];
        return image ? [[team.id, image]] : [];
      }),
    );

    return (
      <EntryTile
        key={entry.id}
        href={
          entry.category === section.id
            ? `/fichas/${entry.slug}`
            : `/fichas/${entry.slug}?apartado=${section.slug}`
        }
        name={entry.name}
        summary={getEntrySummaryForGame(entry, game.id)}
        image={getEntryThumbnail(entry, game.id)}
        teamImages={isRival ? rivalImages : images?.teams}
        isCapture={section.id === "maps"}
        model={images?.models?.original}
        facts={getEntryFacts(entry).slice(0, 2)}
        teams={visibleTeams?.join(" ")}
      >
        <BuildingList buildings={buildings} />
      </EntryTile>
    );
  }

  return (
    <main className={styles["section-page"]}>
      {/* El acento de la cabecera es el color del sector del apartado */}
      <div
        style={{ "--accent": `var(--sector-${section.id})` } as CSSProperties}
      >
        <GameHero
          compact
          name={section.name}
          summary={section.description}
          art={
            dossierArt[game.id]?.backdrop
              ? { backdrop: dossierArt[game.id].backdrop, icons: [] }
              : undefined
          }
          specs={[
            { label: "Juego", value: game.name },
            {
              label: "Contenido",
              value:
                data.kind === "lore" ? (
                  `${data.lore.paragraphs.length} ${data.lore.paragraphs.length === 1 ? "párrafo" : "párrafos"}`
                ) : (
                  <TeamEntryCount
                    total={items.length}
                    counts={Object.fromEntries(
                      teams.map((team) => [
                        team.id,
                        items.filter(
                          (item) => !item.teams || item.teams.includes(team.id),
                        ).length,
                      ]),
                    )}
                  />
                ),
            },
          ]}
          breadcrumb={
            <Breadcrumb
              items={[
                { label: "Universos", href: "/universos" },
                { label: universe.name, href: `/universos/${universe.slug}` },
                {
                  label: game.name,
                  href: `/universos/${universe.slug}/${game.slug}`,
                },
                { label: section.name },
              ]}
            />
          }
        />
      </div>

      <div className={styles["section-page__content"]}>
        <TeamPicker leaders={getTeamLeaders(game.id)} />

        {data.kind === "lore" && (
          <article className={styles["section-page__lore"]}>
            {data.lore.paragraphs
              .filter((paragraph) => !paragraph.spoiler)
              .map((paragraph, index) => (
                <p
                  key={`lore-premise-${index}`}
                  className={styles["section-page__lore-text"]}
                >
                  {paragraph.text}
                </p>
              ))}
            {data.lore.paragraphs.some((paragraph) => paragraph.spoiler) && (
              <details className={styles["section-page__spoilers"]}>
                <summary className={styles["section-page__spoilers-toggle"]}>
                  Contiene spoilers: mostrar el resto de la historia
                </summary>
                {data.lore.paragraphs
                  .filter((paragraph) => paragraph.spoiler)
                  .map((paragraph, index) => (
                    <p
                      key={`lore-spoiler-${index}`}
                      className={styles["section-page__lore-text"]}
                    >
                      {paragraph.text}
                    </p>
                  ))}
              </details>
            )}
            <p className={styles["section-page__sources"]}>
              Fuente:{" "}
              {data.lore.sources.map((source, index) => (
                <span key={source.url}>
                  {index > 0 && ", "}
                  <a
                    href={source.url}
                    className={styles["section-page__source-link"]}
                  >
                    {source.title}
                  </a>
                </span>
              ))}
            </p>
          </article>
        )}

        {data.kind === "entries" &&
          (data.entries.length === 0 ? (
            <p className={styles["section-page__empty"]}>
              Todavía no hay fichas en este apartado.
            </p>
          ) : isGrouped ? (
            groups.map(({ group, items: groupItems }) => (
              <section
                key={group}
                className={styles["section-page__group"]}
                aria-labelledby={`group-${group}`}
                data-teams={getGroupTeams(groupItems)}
              >
                <h2
                  id={`group-${group}`}
                  className={styles["section-page__group-title"]}
                >
                  {titles[group]}
                </h2>
                <ul className={styles["section-page__entries"]}>
                  {groupItems.map(renderTile)}
                </ul>
              </section>
            ))
          ) : (
            <ul className={styles["section-page__entries"]}>
              {items.map(renderTile)}
            </ul>
          ))}
      </div>
    </main>
  );
}
