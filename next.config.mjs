/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
    },
    async rewrites() {
        return [
            {
                source: '/graphql',
                destination: 'http://127.0.0.1:9000/graphql',
            },
        ]
    },
};

export default nextConfig;
