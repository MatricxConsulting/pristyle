import Hero from "./components/Hero/Hero";
import Marquee from "./components/Marquee/Marquee";
import GenderSection from "./components/GenderSection/GenderSection";
import CategoryCards from "./components/CategoryCards/CategoryCards";
import MarriageSection from "./components/MarriageSection/MarriageSection";
import EnfantSection from "./components/EnfantSection/EnfantSection";
import Contact from "./components/Contact/Contact";
import PopularCarousel from "./components/PopularCarousel/PopularCarousel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pristyle.vercel.app";

export const metadata = {
  alternates: { canonical: SITE_URL },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PRISTYLE DESIGN",
  alternateName: "PriStyle",
  url: SITE_URL,
  inLanguage: "fr-FR",
  publisher: { "@type": "Organization", name: "PRISTYLE DESIGN", url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/femme?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PRISTYLE DESIGN",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/pristyle-og.webp`,
  sameAs: [
    "https://www.instagram.com/pristyle_design/",
    "https://www.tiktok.com/@pristyle_design",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : "+237671979650",
    contactType: "customer service",
    areaServed: ["CM", "FR", "Africa"],
    availableLanguage: ["French"],
  },
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <Hero />
      <Marquee />
      <PopularCarousel />
      <GenderSection />
      <CategoryCards />
      <MarriageSection />
      <EnfantSection />
      <Contact />
    </main>
  );
}
