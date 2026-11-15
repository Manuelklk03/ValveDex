import { NavMenu } from "@/components/ui/nav-menu";
import {
  getUniverseMenuGroups,
  getValveMenuGroups,
} from "@/features/navigation/get-nav-menus";

// Navegación principal de la cabecera: dos menús grandes (Universos y Valve). «Explorar» se busca con Ctrl+K.
export function MainNav() {
  return (
    <>
      <li>
        <NavMenu
          label="Universos"
          groups={getUniverseMenuGroups()}
          footerLink={{ label: "Ver todos los universos", href: "/universos" }}
        />
      </li>
      <li>
        <NavMenu label="Valve" groups={getValveMenuGroups()} />
      </li>
    </>
  );
}
