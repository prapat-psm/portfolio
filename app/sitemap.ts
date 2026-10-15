import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/libs/site-url";
import { NAV_ITEMS } from "@/libs/site-nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/$/, "");
  return NAV_ITEMS.map((item) => ({
    url: item.href === "/" ? base : `${base}${item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
