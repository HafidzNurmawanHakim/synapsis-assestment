/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   env: {
      TOKEN: process.env.TOKEN,
      BASE_URL: process.env.BASE_URL,
   },
};

module.exports = nextConfig;
