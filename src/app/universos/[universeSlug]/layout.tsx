import { UniverseTheme } from "@/features/universes/components/universe-theme";
import { getUniverseBySlug } from "@/features/universes/get-universes";

export default async function UniverseLayout({
  children,
  params,
}: LayoutProps<"/universos/[universeSlug]">) {
  const { universeSlug } = await params;

  const universe = getUniverseBySlug(universeSlug);

  return <UniverseTheme universeId={universe?.id}>{children}</UniverseTheme>;
}
