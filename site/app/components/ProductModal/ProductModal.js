"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./ProductModal.module.css";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pristyle.vercel.app";
const STORAGE_PREFIX =
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "") +
  "/storage/v1/object/public/catalog-media/";

function buildWaLink(src) {
  let rawPath;
  if (src.startsWith(STORAGE_PREFIX)) {
    rawPath = src.slice(STORAGE_PREFIX.length);
  } else {
    // image locale : /images/populaires/nom fichier.webp
    rawPath = src.replace(/^\//, '');
  }
  // Encoder chaque segment pour gérer les espaces et parenthèses
  const encodedPath = rawPath.split('/').map(s => encodeURIComponent(s)).join('/');
  const shareUrl = `${SITE_URL}/p/${encodedPath}`;
  const msg = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par ce modèle PriStyle : ${shareUrl}`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function ProductModal({ src, onClose }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ rx: 0, ry: 0 });
  const currentRef = useRef({ rx: 0, ry: 0 });
  const isMovingRef = useRef(false);
  const idleTimerRef = useRef(null);

  const waLink = buildWaLink(src);

  /* --- Animation loop (smooth lerp) — tourne seulement si la souris bouge --- */
  const startRaf = useCallback(() => {
    if (rafRef.current) return;
    function animate() {
      const t = targetRef.current;
      const c = currentRef.current;
      c.rx += (t.rx - c.rx) * 0.12;
      c.ry += (t.ry - c.ry) * 0.12;
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(900px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(1.02,1.02,1.02)`;
      }
      // Arrêter le rAF quand la convergence est suffisante
      if (Math.abs(t.rx - c.rx) < 0.01 && Math.abs(t.ry - c.ry) < 0.01 && !isMovingRef.current) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  /* --- Mouse tilt --- */
  function onMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y / rect.height) - 0.5) * 14;
    const ry = ((x / rect.width) - 0.5) * 14;
    targetRef.current = { rx, ry };
    isMovingRef.current = true;
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => { isMovingRef.current = false; }, 150);
    startRaf();
  }

  function onMouseLeave() {
    targetRef.current = { rx: 0, ry: 0 };
    isMovingRef.current = false;
    startRaf();
  }

  /* --- Touch tilt --- */
  function onTouchMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const rx = -((y / rect.height) - 0.5) * 10;
    const ry = ((x / rect.width) - 0.5) * 10;
    targetRef.current = { rx, ry };
    isMovingRef.current = true;
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => { isMovingRef.current = false; }, 150);
    startRaf();
  }

  function onTouchEnd() {
    targetRef.current = { rx: 0, ry: 0 };
    isMovingRef.current = false;
    startRaf();
  }

  /* --- Close on backdrop click & Escape --- */
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Fermer */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {/* Image 3D */}
        <div
          className={styles.cardWrap}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div ref={cardRef} className={styles.card}>
            <Image
              src={src}
              alt="Modèle PriStyle"
              fill
              quality={80}
              sizes="(max-width: 600px) 95vw, 480px"
              style={{ objectFit: "cover", borderRadius: "inherit" }}
              priority
            />
            {/* Reflet lumineux qui suit le tilt */}
            <div className={styles.glare} />
          </div>
        </div>

        {/* Bas du modal */}
        <div className={styles.body}>
          <p className={styles.bodyTitle}>Ce modèle vous plaît ?</p>
          <p className={styles.bodyDesc}>
            Envoyez un message à PriStyle pour le commander sur mesure | taille,
            tissu et délai adaptés à vos besoins.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.85L.057 23.885a.5.5 0 0 0 .606.612l6.224-1.633A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.695-.516-5.228-1.415l-.374-.221-3.894 1.021 1.004-3.796-.243-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Commander sur mesure
          </a>
        </div>
      </div>
    </div>
  );
}
