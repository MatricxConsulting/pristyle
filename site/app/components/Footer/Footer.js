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
            PRISTYLE DESIGN est une marque de mode mixte qui fusionne la modernité et l’élégance africaine. Le style qui parle pour toi.
          </p>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Collections</h4>
          <div className={styles.footerLinks}>
            <Link href="/femme" className={styles.footerLink}>
              Collection Femme
            </Link>
            <Link href="/homme" className={styles.footerLink}>
              Collection Homme
            </Link>
            <Link href="/mariage" className={styles.footerLink}>
              Tenues Mariage
            </Link>
            <Link href="/enfant" className={styles.footerLink}>
              Collection Enfant
            </Link>
          </div>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Catégories</h4>
          <div className={styles.footerLinks}>
            <Link href="/femme/boubou-femme" className={styles.footerLink}>
              Boubous Femme
            </Link>
            <Link href="/femme/robes-africaines" className={styles.footerLink}>
              Robes Africaines
            </Link>
            <Link href="/homme/boubou-homme" className={styles.footerLink}>
              Boubous Homme
            </Link>
            <Link href="/homme/ensemble-homme" className={styles.footerLink}>
              Ensembles
            </Link>
            <Link href="/femme/jupes" className={styles.footerLink}>
              Jupes &amp; Hauts
            </Link>
            <Link href="/femme/vestes-bombers" className={styles.footerLink}>
              Vestes &amp; Bombers
            </Link>
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
          © {year} PriStyle | Tous droits réservés
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
