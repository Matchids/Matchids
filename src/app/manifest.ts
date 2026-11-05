import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Matchids",
    short_name: "Matchids",
    description: "Books, creativity, and care for children and families.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf7",
    theme_color: "#194d3d",
    icons: [
      {
        src: "/logo/matchids-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/matchids-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}