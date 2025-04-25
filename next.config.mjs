
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  sw: "/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com'
      },
      {
        protocol: "https",
        hostname: "galaweb.galahub.org",
      },
    ]
  },
  productionBrowserSourceMaps: false
};

export default pwaConfig(nextConfig);

