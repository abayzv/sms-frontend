const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
    reactStrictMode: true,
    webpack: (config) => {
      // this will override the experiments
      config.experiments = { ...config.experiments, topLevelAwait: true };
      // this will just update topLevelAwait property of config.experiments
      // config.experiments.topLevelAwait = true 
      return config;
    },
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
