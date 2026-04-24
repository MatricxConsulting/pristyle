import "./globals.css";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";
import { Analytics } from "@vercel/analytics/react";

// Self-hosted via Next.js → zéro round-trip réseau externe, préchargé automatiquement
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app'),
  title: {
    default: "PRISTYLE DESIGN | Le style qui parle pour toi",
    template: "%s | PRISTYLE DESIGN",
  },
  description:
    "PRISTYLE DESIGN, la marque de mode mixte qui fusionne modernité et élégance africaine. Soyez stylé sans effort, portez fièrement votre identité.",
  keywords: [
    "couturière Cameroun",
    "mode africaine Cameroun",
    "tenue wax sur mesure Douala",
    "haute couture africaine",
    "robe africaine wax",
    "boubou sur mesure Cameroun",
    "tenue mariage africain",
    "couturière Douala",
    "pristyle",
    "mode wax Afrique",
    "tissu wax Cameroun",
    "tenue africaine moderne sur mesure",
    "ensemble wax homme femme",
    "meilleure couturière Afrique",
  ],
  openGraph: {
    title: "PRISTYLE DESIGN | Le style qui parle pour toi",
    description:
      "PRISTYLE DESIGN, la marque de mode mixte qui fusionne modernité et élégance africaine. Soyez stylé sans effort, portez fièrement votre identité.",
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app',
    siteName: "PRISTYLE DESIGN",
    images: [
      {
        url: "/images/logos/logoimagetexte.webp",
        width: 1200,
        height: 630,
        alt: "PriStyle | Haute Couture Africaine Cameroun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISTYLE DESIGN | Le style qui parle pour toi",
    description:
      "PRISTYLE DESIGN, la marque de mode mixte qui fusionne modernité et élégance africaine. Soyez stylé sans effort, portez fièrement votre identité.",
    images: ["/images/logos/logoimagetexte.webp"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        {/* Préconnexion Supabase pour charger les images plus vite */}
        <link rel="preconnect" href="https://hycvllacbcyetrvogpdl.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hycvllacbcyetrvogpdl.supabase.co" />
        {/* JSON-LD — LocalBusiness pour Google (référencement local Cameroun) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ClothingStore"],
              name: "PRISTYLE DESIGN",
              description:
                "PRISTYLE DESIGN, marque de mode mixte fusionnant modernité et élégance africaine à Douala. Le style africain moderne à portée de tous.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://pristyle.vercel.app",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://pristyle.vercel.app"}/images/logos/logoimagetexte.webp`,
              image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://pristyle.vercel.app"}/images/logos/logoimagetexte.webp`,
              telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
                ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
                : "+33644814218",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Makepe BM",
                addressLocality: "Douala",
                addressRegion: "Littoral",
                addressCountry: "CM",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "4.0511",
                longitude: "9.7679",
              },
              priceRange: "$$",
              areaServed: [
                { "@type": "Country", name: "Cameroun" },
                { "@type": "Continent", name: "Afrique" },
                { "@type": "Country", name: "France" },
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "19:00",
              },
              knowsAbout: [
                "Mode wax africaine",
                "Sur mesure couture",
                "Tenues de mariage africaines",
                "Boubou",
                "Robes africaines",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <style>{`.reveal,.reveal-left,.reveal-right,.reveal-scale{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Navbar />
        {children}
        <Footer />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
