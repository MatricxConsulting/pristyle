import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <div className={styles.logoMark} aria-label="PriStyle">PS</div>
          <p className={styles.brandDesc}>
            Haute couture africaine sur mesure. Des créations uniques en tissu
            wax, confectionnées avec passion et savoir-faire artisanal.
          </p>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Collections</h4>
          <div className={styles.footerLinks}>
            <a href="#femme" className={styles.footerLink}>
              Collection Femme
            </a>
            <a href="#homme" className={styles.footerLink}>
              Collection Homme
            </a>
            <a href="#mariage" className={styles.footerLink}>
              Tenues Mariage
            </a>
            <a href="#" className={styles.footerLink}>
              Collection Enfant
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Catégories</h4>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              Boubous
            </a>
            <a href="#" className={styles.footerLink}>
              Robes Africaines
            </a>
            <a href="#" className={styles.footerLink}>
              Ensembles
            </a>
            <a href="#" className={styles.footerLink}>
              Jupes & Hauts
            </a>
            <a href="#" className={styles.footerLink}>
              Vestes & Bombers
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Informations</h4>
          <div className={styles.footerLinks}>
            <Link href="/a-propos" className={styles.footerLink}>
              À propos
            </Link>
            <a href="/#contact" className={styles.footerLink}>
              Contact
            </a>
            <Link href="/livraison" className={styles.footerLink}>
              Livraison
            </Link>
            <Link href="/mentions-legales" className={styles.footerLink}>
              Mentions légales
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          © {year} PriStyle — Tous droits réservés
        </span>
        <span className={styles.footerCredit}>
          Powered by{" "}
          <a href="https://brianbiendou.com" target="_blank" rel="noopener noreferrer">
            Brian BIENDOU
          </a>
        </span>
      </div>
    </footer>
  );
}
