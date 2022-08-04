/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  complier: {
    styledComponents: true,
  },
  async redirects() {
    return [{ source: "/canceled", destination: "/", permanent: true }];
  },
};

module.exports = nextConfig;
