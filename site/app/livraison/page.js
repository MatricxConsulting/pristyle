import styles from "./Livraison.module.css";

export const metadata = {
  title: "Livraison | PriStyle",
  description: "Informations sur les modalités et frais de livraison de nos créations haute couture africaine sur mesure.",
};

export default function Livraison() {
  return (
    <main className={styles.pageWrapper}>
      <div className="container section-padding">
        <header className={`${styles.header} reveal visible`}>
          <span className="section-label">Informations Pratiques</span>
          <h1 className="section-title">Expédition & Livraison</h1>
          <p className="section-subtitle center">
            Tout ce que vous devez savoir sur la livraison de vos créations sur mesure.
          </p>
        </header>

        <div className={`${styles.contentWrapper} reveal-scale visible`}>
          
          <div className={styles.section}>
            <span className={styles.sectionIcon}>✂️</span>
            <h2>Confection sur mesure</h2>
            <p>
              Chez PriStyle, l'excellence prend du temps. Chaque pièce que nous proposons est 
              entièrement confectionnée sur mesure, en fonction de vos mensurations et de vos 
              choix de tissus (wax, basin, etc.). 
            </p>
            <p>
              Le processus de création, de la découpe du tissu aux finitions à la main, demande 
              un travail minutieux pour garantir une qualité premium et un tombé parfait.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionIcon}>📦</span>
            <h2>Modalités de Livraison</h2>
            <p>
              Une fois votre création terminée dans notre atelier et prête à être portée, 
              nous procédons à son expédition vers l'adresse de votre choix.
            </p>
            <div className={styles.highlightBox}>
              <p>
                <strong>Important :</strong> Après la confection de votre modèle sur mesure, 
                la livraison est effectuée aux frais du client. 
              </p>
            </div>
            <p style={{ marginTop: '1rem' }}>
              Les frais de port sont calculés en fonction du poids du colis et de votre zone de livraison 
              (France métropolitaine ou à l'international). Nous vous communiquerons le montant exact des 
              frais d'expédition lors de la finalisation de votre commande.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionIcon}>⏱️</span>
            <h2>Délais et Suivi</h2>
            <p>
              Nous confions vos précieuses tenues à des transporteurs fiables pour assurer 
              une livraison sécurisée. Dès que votre colis est expédié, nous vous fournissons 
              un numéro de suivi qui vous permettra de consulter son acheminement en temps réel.
            </p>
            <p>
              Pour toute question concernant l'expédition de votre commande, n'hésitez pas 
              à nous contacter via notre page de contact ou sur nos réseaux sociaux.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
