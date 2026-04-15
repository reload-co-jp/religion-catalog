import type { MetadataRoute } from "next"
import { articleDefinitions } from "lib/articles"
import { religionRecords } from "lib/religion"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://religion-catalog.reload.co.jp"

export const dynamic = "force-static"

const sitemap = (): MetadataRoute.Sitemap => {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/articles/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const religionRoutes: MetadataRoute.Sitemap = religionRecords.map((record) => ({
    url: `${siteUrl}/religions/${record.id}/`,
    lastModified: record.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articleDefinitions.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}/`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...religionRoutes, ...articleRoutes]
}

export default sitemap
