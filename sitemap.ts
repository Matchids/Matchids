import type { MetadataRoute } from "next";

const staticRoutes = [
  "",
  "/books",
  "/books/free",
  "/books/premium",
  "/kids-art",
  "/give-back",
  "/donations",
  "/about",
  "/contact",
  "/faq",
  "/payment",
  "/privacy-policy",
  "/terms",
  "/child-safety",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
