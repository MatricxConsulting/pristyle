const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';
const STORAGE_PREFIX = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/catalog-media/`;

// Convertit l'URL d'image Supabase en URL publique de la page produit /p/...
function srcToProductUrl(src) {
  if (!src) return null;
  const idx = src.indexOf('catalog-media/');
  const path = idx >= 0 ? src.slice(idx + 'catalog-media/'.length) : src;
  return `${SITE_URL}/p/${path.split('/').map(encodeURIComponent).join('/')}`;
}

// Génère un JSON-LD ItemList à partir d'une liste produits {id, src}.
export function buildItemListJsonLd({ products, name, page = 1, limit = 18 }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products
      .map((p, i) => {
        const url = srcToProductUrl(p.src);
        if (!url) return null;
        return {
          '@type': 'ListItem',
          position: (page - 1) * limit + i + 1,
          url,
          image: p.src,
        };
      })
      .filter(Boolean),
  };
}
