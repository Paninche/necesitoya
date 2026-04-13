/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.necesitoya.app' }],
        destination: 'https://necesitoya.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;