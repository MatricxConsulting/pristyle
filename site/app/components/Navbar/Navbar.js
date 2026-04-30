"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Femme", href: "/femme" },
  { label: "Homme", href: "/homme" },
  { label: "Mariage", href: "/mariage" },
  { label: "Enfant", href: "/enfant" },
  { label: "À propos", href: "/a-propos" },
];

const TRANSPARENT_LOGO = {
  src: "/images/logos/pristyle-transparent.webp",
  width: 1593,
  height: 882,
};

const SCROLLED_LOGO = {
  src: "/images/logos/logotextonly-transparent.webp",
  width: 1765,
  height: 693,
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // scrollPos permet de dériver scrolled instantanément lors des navigations
  const [scrollPos, setScrollPos] = useState(0);
  const scrolled = !isHome || scrollPos > 50;
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setHeroVisible(false);
      return;
    }
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      setHeroVisible(window.scrollY < window.innerHeight * 0.7);
    };
    handleScroll(); // vérifier au montage
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const logo = scrolled ? SCROLLED_LOGO : TRANSPARENT_LOGO;

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
          heroVisible && !scrolled ? styles.heroVisible : ""
        }`}
        id="navbar"
      >
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo} id="nav-logo">
            {/* Logo mobile */}
            <Image
              src={logo.src}
              alt="PriStyle Design"
              width={logo.width}
              height={logo.height}
              className={`${styles.logoImage} ${styles.logoMobile}`}
              style={{ width: "auto" }}
              priority
            />
            {/* Logo desktop */}
            <Image
              src={logo.src}
              alt="PriStyle Design"
              width={logo.width}
              height={logo.height}
              className={`${styles.logoImage} ${styles.logoDesktop}`}
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
            {NAV_ITEMS.map((item) => {
              const isHashLink = item.href.includes("#");
              if (isHashLink) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.navLink}
                    onClick={closeMenu}
                    id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  onClick={closeMenu}
                  id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour, je souhaite vous contacter pour une création PriStyle')}`}
              className={`btn btn-primary ${styles.navCta}`}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-contact-btn"
            >
              Nous contacter
            </a>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Menu de navigation"
            id="nav-hamburger"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}
