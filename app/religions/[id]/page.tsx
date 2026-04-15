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

const sectTaglines: Record<string, string> = {
  "christianity-catholic": "秘跡と共同体を通して信仰を深める伝統",
  "christianity-protestant": "聖書理解と個人の信仰を軸に生きる伝統",
  "christianity-eastern-orthodox": "祈りと典礼の積み重ねで聖性を育む伝統",
  "islam-sunni": "日々の礼拝と規律を生活に結びつける伝統",
  "islam-shia": "正義と記憶の継承を大切にする信仰の伝統",
  "buddhism-zen": "修行と瞑想を通して自己を見つめる伝統",
  "buddhism-jodo-shinshu": "念仏と感謝の中で救いを受け取る伝統",
  "hinduism-vaishnavism": "神への献身を日常に織り込む信仰の伝統",
  "hinduism-shaivism": "瞑想と帰依を通して内面を深める伝統",
  "judaism-orthodox": "律法と共同体の実践を日常に生かす伝統",
  "sikhism-khalsa": "祈りと労働と奉仕をひとつにつなぐ伝統",
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
  const heroFeatures = [
    ...record.tags,
    `${record.deityType}の神観`,
    `${record.worshipFrequency}の礼拝`,
    `${record.practiceBurden}めの実践負荷`,
  ].slice(0, 3)
  const sectTagline =
    sectTaglines[record.id] ??
    `${record.sect}をひとことで表すと、${record.tags[0] ?? "特徴ある"}伝統`
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${record.religion} / ${record.sect}`,
      description: `${record.religion} ${record.sect}の教義、神観、実践、生活への影響、他宗派との違いを整理した個別ページ。`,
      inLanguage: "ja",
      mainEntityOfPage: `${siteUrl}/religions/${record.id}/`,
      dateModified: record.updatedAt,
      about: [record.religion, record.sect, ...record.tags],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: record.religion,
          item: `${siteUrl}/religions/${record.id}/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: record.sect,
          item: `${siteUrl}/religions/${record.id}/`,
        },
      ],
    },
  ]

  return (
    <div className={styles.page}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className={styles.hero}>
        <nav aria-label="パンくず" className={styles.breadcrumbs}>
          <Link className={styles.breadcrumbLink} href="/">
            ホーム
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>{record.religion}</span>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>{record.sect}</span>
        </nav>
        <p className={styles.eyebrow}>{record.religion}</p>
        <h1 className={styles.heroTitle}>{record.sect}</h1>
        <p className={styles.heroText}>{sectTagline}</p>
        <div className={styles.heroHighlights}>
          {heroFeatures.map((feature) => (
            <span className={styles.heroPill} key={feature}>
              {feature}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>{record.sect}の特徴</h2>
            <p className={styles.sectionText}>宗派の特徴を整理しています</p>
          </div>
        </div>
        <ReligionDetail comparisonTarget={comparisonTarget} record={record} />
      </section>
    </div>
  )
}

export default ReligionDetailPage
