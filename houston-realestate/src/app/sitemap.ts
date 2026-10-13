import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getNeighborhoods, getPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/buy", "/sell", "/home-value", "/invest", "/lease", "/neighborhoods", "/about", "/blog", "/contact", "/guide", "/privacy", "/terms"];
  return [
    ...staticPaths.map((p) => ({
      url: `${siteUrl}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : ["/privacy", "/terms"].includes(p) ? 0.3 : 0.8,
    })),
    ...getNeighborhoods().map((n) => ({ url: `${siteUrl}/neighborhoods/${n.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getPosts().map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
