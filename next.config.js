/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/dqssedd6u/image/upload/**",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "api.promiedos.com.ar",
                pathname: "/images/team/**",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "example.com",
                pathname: "/**",
                port: "",
                search: "",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Externalize any module that mentions prisma
            config.externals.push(({ context, request }, callback) => {
                if (
                    request.includes('prisma') ||
                    request.includes('generated/prisma') ||
                    context?.includes('generated/prisma') ||
                    context?.includes('@prisma')
                ) {
                    return callback(null, 'commonjs ' + request);
                }
                callback();
            });
        }
        return config;
    },
};

export default nextConfig;
