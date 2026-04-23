import { getCollectionSubcategories } from '@/lib/data';

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';

  const staticRoutes = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/femme`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/homme`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/mariage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/enfant`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  let subcatRoutes = [];
  try {
    const [femmeSubcats, hommeSubcats] = await Promise.all([
      getCollectionSubcategories('femme'),
      getCollectionSubcategories('homme'),
    ]);
    subcatRoutes = [
      ...femmeSubcats.map(s => ({
        url: `${base}/femme/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })),
      ...hommeSubcats.map(s => ({
        url: `${base}/homme/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })),
    ];
  } catch {
    // Supabase indisponible au build : on se contente des routes statiques
  }

  return [...staticRoutes, ...subcatRoutes];
}
