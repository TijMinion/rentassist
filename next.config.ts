import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/frontend/:path*",
    //             destination: process.env.HOST_URL + "/frontend/:path*",
    //         }
    //     ]
    // }
    env: {
        HOST_URL: process.env.HOST_URL,
    },
};

export default nextConfig;
