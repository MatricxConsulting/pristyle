import { redirect } from 'next/navigation';
import { getCollectionSubcategories } from '../../lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';

export const metadata = {
  title: 'Tenues Enfant Wax Sur Mesure | PriStyle',
  description: 'Tenues africaines pour enfant en tissu wax, confectionnées sur mesure à Douala, Cameroun. Qualité artisanale, livraison internationale.',
  alternates: { canonical: `${SITE_URL}/enfant` },
};

export default async function EnfantPage() {
  const subcategories = await getCollectionSubcategories('enfant');
  const first = subcategories[0]?.slug;
  if (first) redirect(`/enfant/${first}`);
  redirect('/');
}
