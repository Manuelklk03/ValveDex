import type { ReactNode } from "react";
import { ElevatorTransition } from "@/components/ui/elevator-transition";

// El ascensor (entrada animada) vive aquí para que sobreviva a la navegación entre el mapa de universos y cada
// universo: se cierra en una página y se abre en la siguiente
export default function UniversesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ElevatorTransition />
    </>
  );
}
