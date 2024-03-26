/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: 'uploads/*',
            },
            {
                protocol: 'https',
                hostname: 'cloudflare-ipfs.com',
                port: '',
                pathname: '/**',
            },
        ],
        domains: ['localhost', 'avatars.githubusercontent.com', 'https://cloudflare-ipfs.com', 'loremflickr.com'],
        
    },
    reactStrictMode: true,
};

export default nextConfig;
