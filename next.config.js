/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: { appDir: true, serverComponentsExternalPackages: ["mongoose"], mdxRs: true, },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    env: {
        MONGODB_URL: process.env.MONGODB_URL,
        NEXT_PUBLIC_MAIN_DOMAIN: process.env.NEXT_PUBLIC_MAIN_DOMAIN,
        NEXT_PUBLIC_AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        NEXT_PUBLIC_WEBMAIL_DOMAIN: process.env.NEXT_PUBLIC_WEBMAIL_DOMAIN
    }
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);