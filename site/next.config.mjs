// Contourne la vérification SSL (proxy d'entreprise / VPN) — dev uniquement
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // Supprime le warning Node.js pour éviter le bruit dans l'overlay Next.js
  const _emit = process.emit.bind(process);
  process.emit = function (name, warning, ...args) {
    if (
      name === 'warning' &&
      String(warning?.message ?? warning).includes('NODE_TLS_REJECT_UNAUTHORIZED')
    ) {
      return false;
    }
    return _emit(name, warning, ...args);
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hycvllacbcyetrvogpdl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [68, 75],
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache les images optimisées 30 jours côté CDN Next
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Compression gzip/brotli des réponses HTML/JSON
  compress: true,
  // Headers de cache agressifs pour les assets statiques
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
