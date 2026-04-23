import { redirect } from 'next/navigation';
import { getCollectionSubcategories } from '../../lib/data';

export const metadata = {
  title: 'Collection Femme | PriStyle',
  description: 'Découvrez nos tenues africaines pour femme : robes wax, boubous, jupes, hauts et plus encore. Sur mesure et livrés partout.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app'}/femme`,
  },
};

export default async function FemmePage() {
  const subcategories = await getCollectionSubcategories('femme');
  const first = subcategories[0]?.slug;
  if (first) redirect(`/femme/${first}`);
  redirect('/');
}
