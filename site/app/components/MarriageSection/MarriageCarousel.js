"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./MarriageSection.module.css";

const ProductModal = dynamic(
  () => import("../ProductModal/ProductModal"),
  { ssr: false }
);

const SPEED = 83;          // px/s
const RESUME_DELAY = 5000; // ms avant reprise auto après drag

function shuffleAndPick(arr, count) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export default function MarriageCarousel({ allImages }) {
  const [items, setItems] = useState([]);
  const [grabbing, setGrabbing] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);

  const trackRef = useRef(null);
  const posRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    const picked = shuffleAndPick(allImages, 50);
    setItems([...picked, ...picked]);
  }, [allImages]);

  useEffect(() => {
    if (items.length === 0) return;
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
        lastTs = null;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimerRef.current);
    };
  }, [items]);

  function onPointerDown(e) {
    isPointerDownRef.current = true;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setGrabbing(true);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    clearTimeout(resumeTimerRef.current);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isPointerDownRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 8) hasDraggedRef.current = true;
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
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setGrabbing(false);
    clearTimeout(resumeTimerRef.current);
    if (hasDraggedRef.current) {
      resumeTimerRef.current = setTimeout(() => {
        isDraggingRef.current = false;
      }, RESUME_DELAY);
    } else {
      isDraggingRef.current = false;
    }
    hasDraggedRef.current = false;
  }

  if (items.length === 0) {
    return <div className={styles.carouselOuter} style={{ minHeight: "360px" }} />;
  }

  return (
    <>
    <div
      className={`${styles.carouselOuter}${grabbing ? ` ${styles.grabbing}` : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "pan-y" }}
    >
      <div ref={trackRef} className={styles.carouselTrack}>
        {items.map((img, i) => (
          <div key={i} className={styles.marriageCard}>
            <Image
              src={img.src}
              alt={`Tenue de mariage ${(i % (items.length / 2)) + 1}`}
              fill
              className={styles.marriageImage}
              sizes="300px"
            />
            <div className={styles.marriageOverlay} />
            {img.isBestSeller && (
              <span className={styles.goldBadge}>Best-seller</span>
            )}
            <div className={styles.marriageCtaGroup}>
              <button
                className={styles.marriageCta}
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalSrc(img.src);
                }}
              >
                ✦ Commander sur mesure
              </button>
              <button
                className={styles.marriageVoirPlusBtn}
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalSrc(img.src);
                }}
              >
                Voir plus
              </button>
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
