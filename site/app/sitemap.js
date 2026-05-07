import { getCollectionSubcategories, getAllProductImagePaths } from '@/lib/data';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';
const NOW = new Date();

export default async function sitemap() {
  const staticRoutes = [
    { url: BASE,                           changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/femme`,                changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/homme`,                changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/mariage`,              changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/enfant`,               changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/a-propos`,             changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/livraison`,            changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/mentions-legales`,     changeFrequency: 'yearly',  priority: 0.2 },
  ].map(r => ({ ...r, lastModified: NOW }));

  let subcatRoutes = [];
  let productRoutes = [];

  try {
    const [femmeSubcats, hommeSubcats, mariageSubcats, enfantSubcats, productPaths] = await Promise.all([
      getCollectionSubcategories('femme'),
      getCollectionSubcategories('homme'),
      getCollectionSubcategories('tenue-mariage'),
      getCollectionSubcategories('enfant'),
      getAllProductImagePaths(),
    ]);

    const buildSubcat = (gender, slug, priority = 0.8) => ({
      url: `${BASE}/${gender}/${slug}`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority,
    });

    subcatRoutes = [
      ...femmeSubcats.map(s => buildSubcat('femme', s.slug)),
      ...hommeSubcats.map(s => buildSubcat('homme', s.slug)),
      ...mariageSubcats.map(s => buildSubcat('mariage', s.slug)),
      ...enfantSubcats.map(s => buildSubcat('enfant', s.slug, 0.7)),
    ];

    productRoutes = productPaths.map(p => ({
      url: `${BASE}/p/${p.split('/').map(encodeURIComponent).join('/')}`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // Supabase indisponible au build : on se contente des routes statiques
  }

  return [...staticRoutes, ...subcatRoutes, ...productRoutes];
}
