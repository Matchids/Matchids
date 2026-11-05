import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-origin";

const routes = [
  "",
  "/books",
  "/learning",
  "/activities",
  "/kids-art",
  "/give-back",
  "/shop",
  "/cart",
  "/about",
  "/parents",
  "/schools",
  "/creators",
  "/help",
  "/contact",
  "/child-safety",
  "/community-guidelines",
  "/trust",
  "/privacy-policy",
  "/terms",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  if (!base) return [];
  return routes.map((route) => ({ url: new URL(route, base).toString() }));
}