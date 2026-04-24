import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroImageWrapper}>
        <Image
          src="/images/hero/hero.webp"
          alt="Sublime Wax | Haute Couture Africaine"
          fill
          priority
          fetchPriority="high"
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>

        <h1 className={styles.heroTitle}>
          Le style qui <span className={styles.heroAccent}>parle</span>
          <br />
          pour toi
        </h1>
        <p className={styles.heroSubtitle}>
          PRISTYLE DESIGN, la marque de mode mixte qui fusionne modernité et élégance africaine. Soyez stylé sans effort, portez fièrement votre identité.
        </p>
        <div className={styles.heroCta}>
          <a href="#populaires" className="btn btn-primary" id="hero-cta-discover">
            Découvrir la collection
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je souhaite commander une tenue sur mesure PriStyle')}`}
            className="btn btn-outline"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-contact"
          >
            ✦ Commander sur mesure
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Défiler</span>
        <div className={styles.scrollLine} />
      </div>

      <div className={styles.heroGoldLine} />
    </section>
  );
}
