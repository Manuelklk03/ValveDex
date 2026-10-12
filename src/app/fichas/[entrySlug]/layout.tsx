import { GameTheme } from "@/features/games/components/game-theme";
import { UniverseTheme } from "@/features/universes/components/universe-theme";
import { getEntryBySlug } from "@/features/catalog/get-entries";
import {
  getGameById,
  getUniverseById,
} from "@/features/universes/get-universes";

export default async function EntryLayout({
  children,
  params,
}: LayoutProps<"/fichas/[entrySlug]">) {
  const { entrySlug } = await params;

  const entry = getEntryBySlug(entrySlug);
  const firstGameId = entry?.gameIds[0];

  const game = firstGameId ? getGameById(firstGameId) : undefined;
  const universe = game ? getUniverseById(game.universeId) : undefined;

  return (
    <UniverseTheme universeId={universe?.id}>
      <GameTheme gameId={game?.id}>{children}</GameTheme>
    </UniverseTheme>
  );
}
