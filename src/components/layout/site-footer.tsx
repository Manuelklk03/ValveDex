import styles from "./site-footer.module.css";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["site-footer__inner"]}>
        <p className={styles["site-footer__notice"]}>
          ValveDex es un proyecto de fans sin relación oficial con Valve
          Corporation. Half-Life, Steam y el resto de nombres y marcas
          pertenecen a sus respectivos propietarios.
        </p>
        <Link href="/creditos" className={styles["site-footer__link"]}>
          Créditos y fuentes
        </Link>
      </div>
    </footer>
  );
}
