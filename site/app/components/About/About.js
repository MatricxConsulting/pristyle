import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="apropos">
      <div className={styles.content}>
        <div className={`${styles.imageColumn} reveal-left`}>
          <div className={styles.imageGrid}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/categories/robes-1.webp"
                alt="Atelier Sublime Wax | confection artisanale"
                fill
                className={styles.aboutImage}
                sizes="(max-width: 900px) 50vw, 25vw"
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/categories/ensemble-homme-1.webp"
                alt="Tissu wax premium"
                fill
                className={styles.aboutImage}
                sizes="(max-width: 900px) 50vw, 15vw"
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/categories/jupes-1.webp"
                alt="Détail couture wax"
                fill
                className={styles.aboutImage}
                sizes="(max-width: 900px) 50vw, 15vw"
              />
            </div>
          </div>
          <div className={styles.goldFrame} />
        </div>

        <div className={`${styles.textColumn} reveal-right`}>
          <span className="section-label">Notre Histoire</span>
          <h2 className="section-title">L&apos;Élégance Africaine,<br />Sans Effort</h2>
          <p className={styles.description}>
            PRISTYLE DESIGN est une marque de mode mixte qui fusionne la modernité et l’élégance africaine pour créer des pièces accessibles, stylées et identitaires.
          </p>
          <p className={styles.description} style={{ fontStyle: "italic", fontWeight: "500", color: "var(--color-black)" }}>
            &quot;Notre promesse : Le style africain moderne à portée de tous. Soyez stylé sans effort et portez fièrement votre identité.&quot;
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌟</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Excellence Textile</div>
                <div className={styles.featureDesc}>
                  Des tissus sélectionnés pour garantir élégance, confort et durabilité
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🤝</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Fiabilité & Engagement</div>
                <div className={styles.featureDesc}>
                  Le respect de nos engagements et de nos délais avec rigueur
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>✨</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Expérience Client</div>
                <div className={styles.featureDesc}>
                  Au cœur de notre démarche pour un service fluide et satisfaisant
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌍</div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Créativité & Identité</div>
                <div className={styles.featureDesc}>
                  Des créations qui reflètent une identité africaine moderne et assumée
                </div>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je souhaite en savoir plus sur votre atelier PriStyle')}`}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            id="about-cta"
          >
            Découvrir notre atelier
          </a>
        </div>
      </div>
    </section>
  );
}
