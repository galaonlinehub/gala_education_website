// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['source.unsplash.com'],
//       },
// };

// export default nextConfig;






import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable:false,
  disable: process.env.NODE_ENV === 'development',
  sw: '/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com'],
  },
};

// Using the function returned by withPWA
export default pwaConfig(nextConfig);