/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations production
  poweredByHeader: false,
  
  // Images optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Headers sécurisés
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },

  // Compression
  compress: true,

  // Experimental features
  experimental: {
    optimizeCss: true,
  }
}

export default nextConfig