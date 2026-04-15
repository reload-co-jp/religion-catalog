import type { Metadata } from "next"
import { CatalogApp } from "components/catalog/catalog-app"
import { religionRecords } from "lib/religion"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"

export const metadata: Metadata = {
  title: "信じるものを見つける",
  description:
    "価値観や暮らし方に近い宗教・宗派を、教義、神観、実践、生活への影響から比較できる一覧ページ。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "信じるものを見つける | 宗教比較カタログ",
    description:
      "価値観や暮らし方に近い宗教・宗派を、教義、神観、実践、生活への影響から比較できる一覧ページ。",
    type: "website",
    url: siteUrl,
  },
}

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "宗教比較カタログ",
    description:
      "宗教・宗派の教義、神観、実践、生活への影響を比較できる一覧ページ。",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: religionRecords.map((record, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${record.religion} / ${record.sect}`,
        url: `${siteUrl}/religions/${record.id}/`,
      })),
    },
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <CatalogApp records={religionRecords} />
    </>
  )
}

export default Page
