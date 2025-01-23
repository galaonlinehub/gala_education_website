
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
    domains: ["source.unsplash.com"],
  },
  productionBrowserSourceMaps: true
};

export default pwaConfig(nextConfig);



// import withPWA from "next-pwa";

// const pwaConfig = withPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
//   sw: "/sw.js",
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["source.unsplash.com"],
//   },
//   // Add these to suppress warnings
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   // Suppress TypeScript errors during build
//   typescript: {
//     ignoreBuildErrors: true,
//   }
// };

// export default pwaConfig(nextConfig);