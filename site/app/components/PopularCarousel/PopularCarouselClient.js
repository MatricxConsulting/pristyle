"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./PopularCarousel.module.css";

const ProductModal = dynamic(
  () => import("../ProductModal/ProductModal"),
  { ssr: false }
);

const SPEED = 54;
const RESUME_DELAY = 5000;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PopularCarouselClient({ items }) {
  const [carouselItems, setCarouselItems] = useState([]);
  const [grabbing, setGrabbing] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);

  const trackRef = useRef(null);
  const posRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    const shuffled = shuffleArray(items);
    setCarouselItems([...shuffled, ...shuffled]);
  }, [items]);

  useEffect(() => {
    if (carouselItems.length === 0) return;
    let rafId;
    let lastTs = null;

    function tick(ts) {
      if (!isDraggingRef.current && trackRef.current) {
        if (lastTs !== null) {
          const dt = Math.min((ts - lastTs) / 1000, 0.1);
          posRef.current += SPEED * dt;
          const half = trackRef.current.scrollWidth / 2;
          if (half > 0 && posRef.current >= half) posRef.current -= half;
          trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
        }
        lastTs = ts;
      } else {
        lastTs = null; // reset pour éviter un saut à la reprise
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimerRef.current);
    };
  }, [carouselItems]);

  function onPointerDown(e) {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setGrabbing(true);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    clearTimeout(resumeTimerRef.current);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 3) hasDraggedRef.current = true;
    let newPos = dragStartPosRef.current - dx;
    const track = trackRef.current;
    if (track) {
      const half = track.scrollWidth / 2;
      if (half > 0) newPos = ((newPos % half) + half) % half;
    }
    posRef.current = newPos;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-newPos}px)`;
  }

  function onPointerUp() {
    if (!isDraggingRef.current) return;
    setGrabbing(false);
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isDraggingRef.current = false;
    }, RESUME_DELAY);
    // Réinitialise hasDragged après un court délai pour que les clics suivants fonctionnent
    setTimeout(() => { hasDraggedRef.current = false; }, 300);
  }

  // Empêche les clics sur les liens si l'user a dragué
  function onClickCapture(e) {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  if (carouselItems.length === 0) return null;

  return (
    <>
    <div
      className={`${styles.carouselContainer}${grabbing ? ` ${styles.grabbing}` : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
      style={{ touchAction: "pan-y" }}
    >
      <div ref={trackRef} className={styles.carouselTrack}>
        {carouselItems.map((item, index) => (
          <div key={`${item.filename}-${index}`} className={styles.carouselItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 250px, 350px"
                className={styles.image}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.overlay}>
                <button
                  className={styles.ctaBtn}
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalSrc(item.src);
                  }}
                >
                  ✦ Commander sur mesure
                </button>
                <button
                  className={styles.voirPlusBtn}
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalSrc(item.src);
                  }}
                >
                  Voir plus
                </button>
              </div>
            </div>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>

    {modalSrc && (
      <ProductModal src={modalSrc} onClose={() => setModalSrc(null)} />
    )}
  </>
  );
}
