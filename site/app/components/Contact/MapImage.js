"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

export default function MapImage() {
  const [failed, setFailed] = useState(false);

  return (
    <a
      href="https://maps.google.com/maps?q=Makepe+BM,+Douala,+Cameroun"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mapLink}
      aria-label="Voir PriStyle sur Google Maps — Makepe BM, Douala"
    >
      {!failed ? (
        <img
          src="https://staticmap.openstreetmap.de/staticmap.php?center=4.0511,9.7085&zoom=15&size=600x300&markers=4.0511,9.7085,ol-marker"
          alt="Localisation PriStyle | Makepe BM, Douala"
          className={styles.map}
          loading="lazy"
          width="600"
          height="300"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.mapFallback}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A961" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Makepe BM, Douala, Cameroun</span>
        </div>
      )}
      <div className={styles.mapOverlayBtn}>
        <span>📍 Voir sur Google Maps</span>
      </div>
    </a>
  );
}
