// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Don't resolve 'tls' module on the client-side
        config.resolve.fallback = {
          ...config.resolve.fallback,
          tls: false,
          crypto: false,
          stream: false,
          http: false,
          https: false,
          os: false,
          zlib: false,
          path: false,
        };
      }
      return config;
    },
    reactStrictMode: true,
    swcMinify: true,
  };
  
  export default nextConfig;