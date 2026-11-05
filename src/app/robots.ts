import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-origin";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/account", "/cart", "/checkout"] }],
    ...(base ? { sitemap: new URL("/sitemap.xml", base).toString() } : {}),
  };
}