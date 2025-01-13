/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '/dqssedd6u/image/upload/**',
              port: ''
          },
      ],
      
  }
};

module.exports = nextConfig;