import Link from 'next/link';
import Image from 'next/image';

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/catalog-media/`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

// Map dossier racine → page collection
const GENDER_ROUTES = {
  femme: '/femme',
  homme: '/homme',
  'tenue-mariage': '/mariage',
  enfant: '/enfant',
};

const COLLECTION_LABELS = {
  femme: 'Collection Femme',
  homme: 'Collection Homme',
  'tenue-mariage': 'Tenue de Mariage',
  enfant: 'Collection Enfant',
};

export async function generateMetadata({ params }) {
  const { path } = await params;
  const imagePath = path.join('/');
  const isLocal = path[0] === 'images';
  const imageUrl = isLocal ? `/${imagePath}` : `${STORAGE_URL}${imagePath}`;
  const encodedPath = path.map(s => encodeURIComponent(s)).join('/');

  const root = isLocal ? path[1] : path[0];
  const collectionLabel = COLLECTION_LABELS[root] || 'Collection PriStyle';
  const title = `Modèle PriStyle – ${collectionLabel}`;
  const description = 'Tenues africaines sur mesure, livrées partout. Commandez sur WhatsApp.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/p/${encodedPath}`,
      siteName: 'PriStyle',
      images: [{ url: imageUrl, width: 800, height: 1067, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params }) {
  const { path } = await params;
  // Next.js décode automatiquement les segments — on récupère les noms réels
  const imagePath = path.join('/');

  // Image locale (ex: images/populaires/...) ou Supabase (ex: femme/robes/...)
  const isLocal = path[0] === 'images';
  const imageUrl = isLocal
    ? `/${imagePath}`
    : `${STORAGE_URL}${imagePath}`;

  const root = isLocal ? path[1] : path[0];
  const collectionHref = GENDER_ROUTES[root] || '/';
  const collectionLabel = COLLECTION_LABELS[root] || 'Collection PriStyle';

  // Reconstruire le shareUrl encodé pour le bouton WA
  const encodedPath = path.map(s => encodeURIComponent(s)).join('/');
  const shareUrl = `${SITE_URL}/p/${encodedPath}`;
  const waMsg = encodeURIComponent(`Bonjour, je suis intéressé(e) par ce modèle PriStyle : ${shareUrl}`);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  const productTitle = `Modèle PriStyle – ${collectionLabel}`;
  const productDescription = 'Tenues africaines sur mesure, livrées partout. Commandez sur WhatsApp.';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productTitle,
    description: productDescription,
    image: imageUrl,
    brand: { '@type': 'Brand', name: 'PriStyle' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'XAF',
      seller: { '@type': 'LocalBusiness', name: 'PriStyle', address: { '@type': 'PostalAddress', addressLocality: 'Douala', addressCountry: 'CM' } },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: collectionLabel, item: `${SITE_URL}${collectionHref}` },
      { '@type': 'ListItem', position: 3, name: productTitle, item: shareUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <style>{`
        .ps-product-page {
          min-height: 100vh;
          background: #FAF7F2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 16px 48px;
        }
        .ps-product-back {
          align-self: flex-start;
          max-width: 560px;
          width: 100%;
          margin: 0 auto 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B6B6B;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .ps-product-back:hover { color: #957F62; }
        .ps-product-card {
          width: 100%;
          max-width: 560px;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
        }
        .ps-product-img-wrap {
          width: 100%;
          position: relative;
          background: #EDE5D8;
        }
        .ps-product-img-wrap img {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        .ps-product-body {
          padding: 24px 24px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        .ps-product-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #957F62;
        }
        .ps-product-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.2rem, 4vw, 1.5rem);
          font-weight: 700;
          color: #1A1A1A;
          line-height: 1.2;
          margin: 0;
        }
        .ps-product-desc {
          font-size: 0.85rem;
          color: #6B6B6B;
          line-height: 1.6;
          margin: 0;
        }
        .ps-product-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #C8A87E;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 14px 32px;
          border-radius: 9999px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .ps-product-cta:hover {
          background: #957F62;
          transform: translateY(-1px);
        }
        .ps-product-see-all {
          font-size: 0.75rem;
          color: #B0A89E;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ps-product-see-all:hover { color: #957F62; }
        @media (max-width: 480px) {
          .ps-product-page { padding: 72px 12px 40px; }
          .ps-product-body { padding: 18px 16px 22px; gap: 12px; }
          .ps-product-cta { font-size: 0.75rem; padding: 12px 24px; }
        }
      `}</style>
      <div className="ps-product-page">
        <Link href={collectionHref} className="ps-product-back">
          ← {collectionLabel}
        </Link>
        <div className="ps-product-card">
          <div className="ps-product-img-wrap">
            <Image
              src={imageUrl}
              alt={`Modèle PriStyle – ${collectionLabel}`}
              width={800}
              height={1067}
              priority
              quality={80}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="ps-product-body">
            <span className="ps-product-label">PriStyle | Sur mesure</span>
            <h1 className="ps-product-title">Ce modèle vous intéresse ?</h1>
            <p className="ps-product-desc">
              Commandez sur mesure directement via WhatsApp. Livraison partout au Cameroun et à l&apos;international.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="ps-product-cta">
              💬 Commander sur WhatsApp
            </a>
            <Link href={collectionHref} className="ps-product-see-all">
              Voir toute la {collectionLabel.toLowerCase()} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
