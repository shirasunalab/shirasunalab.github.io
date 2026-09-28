import type { MetadataRoute } from "next"
import { getBlogNews, getResearch } from "@/lib/content"
import { getSiteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const now = new Date()

  const staticPaths = [
    "/",
    "/access",
    "/join",
    "/members",
    "/blog-news",
    "/blog",
    "/news",
    "/research",
    "/sentan",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified: now,
  }))

  const blogNewsEntries: MetadataRoute.Sitemap = getBlogNews().map((item) => ({
    url: new URL(`/blog-news/${item.slug}`, baseUrl).toString(),
    lastModified: new Date(item.date),
  }))

  const researchEntries: MetadataRoute.Sitemap = getResearch().map((item) => ({
    url: new URL(`/research/${item.slug}`, baseUrl).toString(),
    lastModified: now,
  }))

  return [...staticEntries, ...blogNewsEntries, ...researchEntries]
}
