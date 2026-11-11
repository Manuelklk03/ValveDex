"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { Team } from "@/domain/team";
import styles from "./team-scope.module.css";

// Equipo elegido en un juego (RED/BLU/GRAY, T/CT). El equipo tiñe la página con su acento y oculta, solo con CSS,
// las fichas que no son suyas (las que llevan `data-teams` sin su id); se recuerda entre visitas en localStorage.

type TeamContextValue = {
  team: Team;
  teams: Team[];
  setTeam: (id: string) => void;
};

const TeamContext = createContext<TeamContextValue | undefined>(undefined);

export function useTeam(): TeamContextValue | undefined {
  return useContext(TeamContext);
}

// localStorage como almacén externo: el HTML del servidor sale con el primer equipo y, al montar, React lo cambia al guardado
const listeners = new Set<() => void>();
// Respaldo en memoria si localStorage no está disponible: la elección dura mientras la pestaña está abierta
const memory = new Map<string, string>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readSaved(key: string): string | null {
  try {
    return window.localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

type TeamScopeProps = {
  // Clave para recordar la elección de este juego (su id)
  storageKey: string;
  teams: Team[];
  children: ReactNode;
};

export function TeamScope({ storageKey, teams, children }: TeamScopeProps) {
  const key = `valvedex-team-${storageKey}`;
  const saved = useSyncExternalStore(
    subscribe,
    () => readSaved(key),
    () => null,
  );

  const setTeam = useCallback(
    (id: string) => {
      memory.set(key, id);
      try {
        window.localStorage.setItem(key, id);
      } catch {
        // Sin almacenamiento: queda el respaldo en memoria
      }
      listeners.forEach((notify) => notify());
    },
    [key],
  );

  const team = teams.find((candidate) => candidate.id === saved) ?? teams[0];
  const value = useMemo(
    () => ({ team, teams, setTeam }),
    [team, teams, setTeam],
  );

  return (
    <TeamContext.Provider value={value}>
      <div
        className={styles["team-scope"]}
        data-team={team.id}
        style={{ "--accent": team.accent } as CSSProperties}
      >
        {children}
      </div>
    </TeamContext.Provider>
  );
}
