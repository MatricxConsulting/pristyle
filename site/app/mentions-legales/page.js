import styles from "./Mentions.module.css";

export const metadata = {
  title: "Mentions Légales | PriStyle",
  description: "Mentions légales et informations juridiques du site PriStyle.",
};

export default function MentionsLegales() {
  return (
    <main className={styles.pageWrapper}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <header className={`${styles.header} reveal visible`}>
          <span className="section-label">Informations Juridiques</span>
          <h1 className="section-title">Mentions Légales</h1>
        </header>

        <div className={`${styles.contentWrapper} reveal-scale visible`}>
          
          <div className={styles.section}>
            <p style={{ fontStyle: 'italic', fontWeight: '500', marginBottom: '2rem' }}>
              "Parce que l'<strong>expérience client</strong> et la <strong>fiabilité</strong> sont des valeurs fondamentales chez PRISTYLE DESIGN, nous vous présentons ces mentions légales en toute transparence pour une relation de confiance totale."
            </p>
          </div>
          
          <div className={styles.section}>
            <h2>1. Éditeur du site</h2>
            <p>Le site <strong>PriStyle</strong> est édité par PriStyle.</p>
            <p>
              Pour toute question ou demande d'information concernant le site, ou toute déclaration 
              ou notification d'un événement illicite, vous pouvez nous contacter via notre page contact.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Hébergement</h2>
            <p>Ce site est hébergé par :</p>
            <p>
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723<br />
              États-Unis
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur le site PriStyle, incluant, de façon non limitative, 
              les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que 
              leur mise en forme sont la propriété exclusive de PriStyle, à l'exception des marques, 
              logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication, 
              même partielle, de ces différents éléments est strictement interdite sans l'accord exprès 
              par écrit de PriStyle.
            </p>
          </div>

          <div className={styles.section}>
            <h2>4. Données personnelles</h2>
            <p>
              D'une façon générale, vous pouvez visiter notre site sur Internet sans avoir à décliner 
              votre identité et à fournir des informations personnelles vous concernant. Cependant, nous 
              pouvons parfois vous demander des informations, par exemple pour traiter une commande 
              ou établir une correspondance.
            </p>
            <p>
              Conformément à la réglementation en vigueur (Règlement Général sur la Protection des 
              Données - RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité et 
              d'effacement de vos données ou encore de limitation du traitement.
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. Cookies</h2>
            <p>
              Le site PriStyle peut-être amené à vous demander l'acceptation des cookies pour des besoins 
              de statistiques et d'affichage. Un cookie est une information déposée sur votre disque dur 
              par le serveur du site que vous visitez. Il contient plusieurs données qui sont stockées 
              sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour lire et 
              enregistrer des informations.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
