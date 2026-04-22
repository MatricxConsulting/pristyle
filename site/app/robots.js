export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pristyle.cm';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
