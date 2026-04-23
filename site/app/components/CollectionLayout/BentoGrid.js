"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./CollectionLayout.module.css";

const ProductModal = dynamic(
  () => import("../ProductModal/ProductModal"),
  { ssr: false }
);

export default function BentoGrid({ products, subcategoryName = 'Modèle PriStyle' }) {
  const [modalSrc, setModalSrc] = useState(null);

  return (
    <>
      <div className={styles.bentoGrid}>
        {products.map((p, i) => (
          <div key={p.id ?? i} className={styles.bentoCard}>
            <div
              className={styles.bentoImgWrap}
              ref={el => {
                // Marquer le wrapper comme chargé dès que le composant est monté côté client
                // (les images eagerly chargées sont déjà dans le cache)
                if (el && i < 2) el.dataset.loaded = '1';
              }}
            >
              <Image
                src={p.src}
                alt={`${subcategoryName} wax sur mesure – modèle ${i + 1} | PriStyle Douala`}
                width={600}
                height={800}
                className={styles.bentoImg}
                sizes="(max-width: 480px) 50vw, (max-width: 860px) 50vw, 30vw"
                loading={i < 2 ? "eager" : "lazy"}
                priority={i === 0}
                quality={68}
                placeholder="empty"
                onLoad={e => {
                  const wrap = e.currentTarget.closest(`.${styles.bentoImgWrap}`);
                  if (wrap) wrap.dataset.loaded = '1';
                }}
              />
            </div>
            <div className={styles.bentoOverlay}>
              <button
                className={styles.bentoCta}
                onClick={() => setModalSrc(p.src)}
                type="button"
              >
                <span className={styles.ctaLong}>💬 Commander sur mesure</span>
                <span className={styles.ctaShort}>💬 Commander</span>
              </button>
              <button
                className={styles.bentoVoirPlusBtn}
                onClick={() => setModalSrc(p.src)}
                type="button"
              >
                Voir plus
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalSrc && (
        <ProductModal src={modalSrc} onClose={() => setModalSrc(null)} />
      )}
    </>
  );
}
