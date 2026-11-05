import type { MetadataRoute } from "next";

const routes = [
  "",
  "/books",
  "/kids-art",
  "/give-back",
  "/shop",
  "/cart",
  "/about",
  "/contact",
  "/child-safety",
  "/privacy-policy",
  "/terms",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return routes.map((route) => ({ url: `${base}${route}` }));
}