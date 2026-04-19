import type { MetadataRoute } from "next"
import { articleDefinitions } from "lib/articles"
import { religionRecords } from "lib/religion"

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://religion-catalog.reload.co.jp"
).replace(/\/$/, "")

export const dynamic = "force-static"

const latestReligionUpdate = religionRecords.reduce(
  (latest, record) =>
    record.updatedAt > latest ? record.updatedAt : latest,
  "2026-04-15",
)

const latestArticleUpdate = articleDefinitions.reduce(
  (latest, article) =>
    article.updatedAt > latest ? article.updatedAt : latest,
  "2026-04-16",
)

const siteLastModified =
  latestReligionUpdate > latestArticleUpdate
    ? latestReligionUpdate
    : latestArticleUpdate

const sitemap = (): MetadataRoute.Sitemap => {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/articles/`,
      lastModified: latestArticleUpdate,
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
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...religionRoutes, ...articleRoutes]
}

export default sitemap
