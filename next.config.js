/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'assets.ayobandung.com',
            protocol: 'https',
          },
          {
            hostname: 'mahesadev.com',
            protocol: 'https',
           }
        ],
      },
}

module.exports = nextConfig
