/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "step-strapi.zysk.in",
      },
      {
        protocol: "https",
        hostname: "must-coverings.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "minio.sjcestep.in", // Add this line
      },
    ],
  },
};

module.exports = nextConfig;
