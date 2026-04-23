import { notFound } from 'next/navigation';
import CollectionLayout from '../../components/CollectionLayout/CollectionLayout';
import { getCollectionSubcategories, getSubcategoryProducts } from '../../../lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';

export async function generateMetadata({ params }) {
  const { subcategory } = await params;
  const subcategories = await getCollectionSubcategories('enfant');
  const current = subcategories.find(s => s.slug === subcategory);

  if (!current) return { title: 'Tenues Enfant | PriStyle' };

  const title = `${current.name} Wax Enfant Sur Mesure | PriStyle`;
  const description = `${current.name} africains pour enfant confectionnés sur mesure à Douala. ${current.count} modèles en tissu wax premium. Livraison partout au Cameroun et à l'international.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/enfant/${subcategory}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/enfant/${subcategory}`,
      siteName: 'PriStyle',
    },
  };
}

export async function generateStaticParams() {
  try {
    const subcategories = await getCollectionSubcategories('enfant');
    return subcategories.map(s => ({ subcategory: s.slug }));
  } catch {
    return [];
  }
}

export default async function EnfantSubcategoryPage({ params, searchParams }) {
  const { subcategory } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page || '1', 10));

  const subcategories = await getCollectionSubcategories('enfant');
  const current = subcategories.find(s => s.slug === subcategory);

  if (!current) notFound();

  const { products, total } = await getSubcategoryProducts(subcategory, page, 18);

  const seoText = `${current.count} modèles de ${current.name.toLowerCase()} pour enfant, confectionnés sur mesure à Douala, Cameroun. Tissu wax premium, retouches incluses, livraison internationale.`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Collection Enfant', item: `${SITE_URL}/enfant` },
      { '@type': 'ListItem', position: 3, name: current.name, item: `${SITE_URL}/enfant/${subcategory}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CollectionLayout
        gender="enfant"
        title={current.name}
        subcategories={subcategories}
        selectedCat={subcategory}
        products={products}
        total={total}
        page={page}
        limit={18}
        seoText={seoText}
      />
    </>
  );
}
