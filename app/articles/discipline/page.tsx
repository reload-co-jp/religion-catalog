import type { Metadata } from "next"
import { ArticlePage } from "components/articles/article-page"
import { articleMap } from "lib/articles"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://religion-catalog.reload.co.jp"

const article = articleMap.get("discipline")!

export const metadata: Metadata = {
  title: `${article.title} | 宗教比較カタログ`,
  description: article.description,
  alternates: {
    canonical: "/articles/discipline/",
  },
  openGraph: {
    title: `${article.title} | 宗教比較カタログ`,
    description: article.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "宗教比較カタログ",
      },
    ],
    type: "article",
    url: `${siteUrl}/articles/discipline/`,
  },
}

const Page = () => <ArticlePage article={article} />

export default Page
