// Equipo que se puede elegir en el hub de un juego (RED/BLU/GRAY en Team Fortress, T/CT en Counter-Strike)
export type Team = {
  id: string;
  name: string;
  // Acento que tiñe el hub, los apartados y las tarjetas mientras el equipo está elegido
  accent: string;
  summary: string;
};
