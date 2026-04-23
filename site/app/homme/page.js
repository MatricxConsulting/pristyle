import { redirect } from 'next/navigation';
import { getCollectionSubcategories } from '../../lib/data';

export const metadata = {
  title: 'Collection Homme | PriStyle',
  description: 'Découvrez nos tenues africaines pour homme : boubous, ensembles, chemises et plus encore. Sur mesure et livrés partout.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app'}/homme`,
  },
};

export default async function HommePage() {
  const subcategories = await getCollectionSubcategories('homme');
  const first = subcategories[0]?.slug;
  if (first) redirect(`/homme/${first}`);
  redirect('/');
}
