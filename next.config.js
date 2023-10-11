const withMDX = require('@next/mdx')()

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
           },
           {
            hostname: 'api-mahestore.mahesadev.com',
            protocol: 'https',
           }
        ],
      },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

module.exports = withMDX(nextConfig)
