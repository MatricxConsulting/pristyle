"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

// Tuile satellite Esri World Imagery - Makepe BM, Douala (zoom 14, x=8633, y=8006)
const SAT_TILE = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/14/8006/8633";

export default function MapImage() {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=Makepe+BM%2C+Douala%2C+Cameroun"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mapLink}
      aria-label="Obtenir itineraire PriStyle Makepe BM Douala"
    >
      {!failed ? (
        <img
          src={SAT_TILE}
          alt="Vue satellite Makepe BM Douala"
          className={styles.map}
          loading="lazy"
          width="256"
          height="256"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.mapFallback}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A961" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Makepe BM, Douala, Cameroun</span>
        </div>
      )}

      {!failed && (
        <div className={styles.mapPinOverlay}>
          <svg width="22" height="28" viewBox="0 0 24 32" fill="none">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 8.25 12 20 12 20s12-11.75 12-20C24 5.37 18.63 0 12 0z" fill="#C8A961" />
            <circle cx="12" cy="12" r="5" fill="white" />
          </svg>
        </div>
      )}

      {!failed && (
        <div className={styles.mapAddressLabel}>Makepe BM, Douala</div>
      )}

      <div className={styles.mapOverlayBtn}>Obtenir l&apos;itin&eacute;raire</div>
    </a>
  );
}
