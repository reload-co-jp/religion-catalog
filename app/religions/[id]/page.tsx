import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import styles from "components/catalog/catalog-app.module.css"
import { ReligionDetail } from "components/catalog/religion-detail"
import {
  getComparisonTarget,
  getReligionById,
  religionRecords,
} from "lib/religion"

type ReligionDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return religionRecords.map((record) => ({ id: record.id }))
}

export async function generateMetadata({
  params,
}: ReligionDetailPageProps): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  const { id } = await params
  const record = getReligionById(id)

  if (!record) {
    return {
      title: "宗派が見つかりません",
    }
  }

  return {
    title: `${record.religion} / ${record.sect}`,
    description: `${record.religion} ${record.sect}の教義、神観、実践、生活への影響、他宗派との違いを整理した個別ページ。`,
    alternates: {
      canonical: `/religions/${record.id}/`,
    },
    openGraph: {
      title: `${record.religion} / ${record.sect} | 宗教比較カタログ`,
      description: `${record.religion} ${record.sect}の教義、神観、実践、生活への影響、他宗派との違いを整理した個別ページ。`,
      type: "article",
      url: `${siteUrl}/religions/${record.id}/`,
    },
    twitter: {
      card: "summary",
      title: `${record.religion} / ${record.sect} | 宗教比較カタログ`,
      description: `${record.religion} ${record.sect}の教義、神観、実践、生活への影響、他宗派との違いを整理した個別ページ。`,
    },
  }
}

const ReligionDetailPage = async ({ params }: ReligionDetailPageProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  const { id } = await params
  const record = getReligionById(id)

  if (!record) {
    notFound()
  }

  const comparisonTarget = getComparisonTarget(record, religionRecords)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${record.religion} / ${record.sect}`,
    description: `${record.religion} ${record.sect}の教義、神観、実践、生活への影響、他宗派との違いを整理した個別ページ。`,
    inLanguage: "ja",
    mainEntityOfPage: `${siteUrl}/religions/${record.id}/`,
    dateModified: record.updatedAt,
    about: [
      record.religion,
      record.sect,
      ...record.tags,
    ],
  }

  return (
    <div className={styles.page}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{record.religion}</p>
        <h1 className={styles.heroTitle}>{record.sect}</h1>
        <p className={styles.heroText}>
          この宗派がどんな価値観や暮らし方に近いのかを、
          概要、実践、生活への影響までまとめて、読みやすく確認できます。
        </p>
        <div className={styles.heroHighlights}>
          <span className={styles.heroPill}>はじめてでも読みやすい構成</span>
          <span className={styles.heroPill}>他宗派との違いも確認</span>
        </div>
        <div className={styles.cardActions}>
          <Link className={styles.buttonGhost} href="/">
            一覧へ戻る
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>個別詳細</h2>
            <p className={styles.sectionText}>
              READMEで定義された7つの観点に沿って、この宗派の特徴を整理しています。
            </p>
          </div>
        </div>
        <ReligionDetail comparisonTarget={comparisonTarget} record={record} />
      </section>
    </div>
  )
}

export default ReligionDetailPage
