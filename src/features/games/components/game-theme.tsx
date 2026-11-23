import type { ReactNode } from "react";
import { ChromeSync } from "@/components/ui/chrome-sync";
import styles from "./game-theme.module.css";

type GameThemeProps = {
  gameId?: string;
  children: ReactNode;
};

export function GameTheme({ gameId, children }: GameThemeProps) {
  const themeClass = gameId ? styles[`game-theme--${gameId}`] : undefined;

  const className = themeClass
    ? `${styles["game-theme"]} ${themeClass}`
    : styles["game-theme"];

  return (
    <div className={className} data-chrome-theme>
      <ChromeSync />
      {children}
    </div>
  );
}
