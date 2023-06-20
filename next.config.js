/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.ayobandung.com',
          },
        ],
      },
}

module.exports = nextConfig
