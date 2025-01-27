/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '/dqssedd6u/image/upload/**',
              port: '',
              search: '',
          },
          {
            protocol: 'https',
            hostname:"api.promiedos.com.ar",
            pathname:"/images/team/**",
            port:"",
            search:"",
          }
      ],
      
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'puppeteer-core': 'puppeteer-core',
        '@sparticuz/chromium': '@sparticuz/chromium'
      })
    }
    return config
  },
};

module.exports = nextConfig;