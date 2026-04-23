import Image from "next/image";
import styles from "./APropos.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';

export const metadata = {
  title: "À propos de PriStyle | Couturière Africaine à Douala",
  description: "Découvrez l'histoire de PriStyle, couturière africaine basée à Douala, Cameroun. Plus de 10 ans de passion pour la mode wax et la haute couture africaine sur mesure.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
  openGraph: {
    title: "À propos de PriStyle | Couturière Africaine à Douala",
    description: "Découvrez l'histoire de PriStyle, couturière africaine basée à Douala, Cameroun. Plus de 10 ans de passion pour la mode wax et la haute couture africaine sur mesure.",
    url: `${SITE_URL}/a-propos`,
    siteName: 'PriStyle',
  },
};

export default function APropos() {
  return (
    <main className={styles.pageWrapper}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <header className={`${styles.header} reveal visible`}>
          <span className="section-label">Notre Histoire</span>
          <h1 className="section-title">PriStyle, l'élégance africaine sur mesure</h1>
          <p className="section-subtitle center">
            Une passion pour le tissu wax, transformée en créations de haute couture uniques.
          </p>
        </header>

        <div className={styles.contentGrid}>
          <div className={`${styles.imageWrapper} reveal-left visible`}>
            {/* We can use a placeholder image from Supabase or just a generic placeholder if we don't have one */}
            <Image
              src="/images/apropos/apropos.webp"
              alt="Atelier de confection PriStyle"
              width={600}
              height={800}
              className={styles.image}
            />
          </div>

          <div className={`${styles.textContent} stagger`}>
            <div className={`${styles.textBlock} reveal-right visible`}>
              <h3>Notre Vision</h3>
              <p>
                Chez PriStyle, nous croyons que chaque vêtement doit raconter une histoire. 
                Notre vision est de fusionner l'authenticité et la richesse des tissus africains, 
                notamment le wax, avec des coupes modernes et élégantes. Nous créons des pièces 
                qui subliment la silhouette et célèbrent la culture africaine avec raffinement.
              </p>
            </div>

            <div className={`${styles.textBlock} reveal-right visible`}>
              <h3>Savoir-faire Artisanal</h3>
              <p>
                Toutes nos créations sont confectionnées sur mesure avec un soin méticuleux. 
                De la sélection minutieuse des motifs à la dernière retouche, chaque étape est 
                réalisée avec une passion inébranlable pour la couture. Notre objectif est de 
                vous offrir des vêtements de haute qualité qui vous accompagnent dans les moments 
                les plus importants de votre vie.
              </p>
            </div>
          </div>
        </div>

        <section className={`${styles.values} reveal visible`}>
          <h2 className="section-title">Nos Valeurs</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h4>Qualité Premium</h4>
              <p>Sélection des meilleurs tissus et finitions impeccables pour des créations durables.</p>
            </div>
            <div className={styles.valueCard}>
              <h4>Sur Mesure</h4>
              <p>Des vêtements adaptés à votre morphologie pour un tombé parfait et un confort absolu.</p>
            </div>
            <div className={styles.valueCard}>
              <h4>Héritage</h4>
              <p>Mise en valeur du patrimoine culturel africain à travers des designs contemporains.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
