import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev access via 127.0.0.1 or localhost interchangeably
  allowedDevOrigins: ["127.0.0.1:3000", "localhost:3000"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" },
    ],
  },
};

export default nextConfig;
