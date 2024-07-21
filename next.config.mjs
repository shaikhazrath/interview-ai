// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Ignore `fs` module
        path: false, // Add other Node.js modules if needed
      };
    }
    return config;
  },
};

export default nextConfig;
