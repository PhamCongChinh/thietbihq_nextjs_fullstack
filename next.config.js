/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
