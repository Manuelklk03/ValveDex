import Link from "next/link";
import styles from "./valve-rooms.module.css";

export type ValveRoom = {
  id: "history" | "steam" | "hardware" | "people";
  title: string;
  kicker: string;
  summary: string;
  // Dato corto que se lee de un vistazo («11 hitos», «3 épocas»…)
  meta: string;
  href: string;
};

type ValveRoomsProps = {
  rooms: ValveRoom[];
};

// Las cuatro salas de Valve: franjas a todo el ancho, cada una con su material, su número gigante y un enlace que
// cubre toda la sala. Alternan de lado y aparecen al hacer scroll (solo con scroll-driven animations)
export function ValveRooms({ rooms }: ValveRoomsProps) {
  return (
    <ol className={styles["valve-rooms"]}>
      {rooms.map((room, index) => (
        <li
          key={room.id}
          className={`${styles["valve-room"]} ${styles[`valve-room--${room.id}`]}`}
        >
          <span className={styles["valve-room__number"]} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className={styles["valve-room__body"]}>
            <p className={styles["valve-room__kicker"]}>{room.kicker}</p>
            <h2 className={styles["valve-room__title"]}>
              <Link href={room.href} className={styles["valve-room__link"]}>
                {room.title}
              </Link>
            </h2>
            <p className={styles["valve-room__summary"]}>{room.summary}</p>
            <p className={styles["valve-room__meta"]}>
              <span>{room.meta}</span>
              <span className={styles["valve-room__enter"]} aria-hidden="true">
                Entrar →
              </span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
