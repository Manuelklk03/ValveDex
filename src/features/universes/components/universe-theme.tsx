import type { ReactNode } from "react";
import styles from "./universe-theme.module.css";

type UniverseThemeProps = {
  universeId?: string;
  children: ReactNode;
};

export function UniverseTheme({ universeId, children }: UniverseThemeProps) {
  const themeClass = universeId
    ? styles[`universe-theme--${universeId}`]
    : undefined;

  const className = themeClass
    ? `${styles["universe-theme"]} ${themeClass}`
    : styles["universe-theme"];

  return <div className={className}>{children}</div>;
}
