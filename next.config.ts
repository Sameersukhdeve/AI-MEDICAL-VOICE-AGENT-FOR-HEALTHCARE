/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "",
          },
        ],
      },
    ];
  },
};

export default nextConfig;