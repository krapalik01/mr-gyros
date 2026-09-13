import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Фото блюд, загруженные через админку, лежат в Vercel Blob
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
