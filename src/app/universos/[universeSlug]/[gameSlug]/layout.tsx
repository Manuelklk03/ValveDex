import { GameTheme } from "@/features/games/components/game-theme";
import {
  getGameBySlug,
  getUniverseBySlug,
} from "@/features/universes/get-universes";

export default async function GameLayout({
  children,
  params,
}: LayoutProps<"/universos/[universeSlug]/[gameSlug]">) {
  const { universeSlug, gameSlug } = await params;

  const universe = getUniverseBySlug(universeSlug);

  const game = universe ? getGameBySlug(universe.id, gameSlug) : undefined;

  return <GameTheme gameId={game?.id}>{children}</GameTheme>;
}
