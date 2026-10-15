import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/libs/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
