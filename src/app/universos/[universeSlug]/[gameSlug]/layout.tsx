import { TeamScope } from "@/components/ui/team-scope";
import { getGameTeams } from "@/data/game-teams";
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
  const teams = game ? getGameTeams(game.id) : [];

  return (
    <GameTheme gameId={game?.id}>
      {game && teams.length > 0 ? (
        <TeamScope storageKey={game.id} teams={teams}>
          {children}
        </TeamScope>
      ) : (
        children
      )}
    </GameTheme>
  );
}
