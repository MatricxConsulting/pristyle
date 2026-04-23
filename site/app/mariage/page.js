import { redirect } from 'next/navigation';
import { getCollectionSubcategories } from '../../lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pristyle.vercel.app';

export const metadata = {
  title: 'Tenues Mariage Africain Sur Mesure | PriStyle',
  description: 'Robes de mariée africaines, boubous cérémonie et tenues de mariage sur mesure. PriStyle, couturière à Douala, Cameroun.',
  alternates: { canonical: `${SITE_URL}/mariage` },
};

export default async function MariagePage() {
  const subcategories = await getCollectionSubcategories('tenue-mariage');
  const first = subcategories[0]?.slug;
  if (first) redirect(`/mariage/${first}`);
  redirect('/');
}
