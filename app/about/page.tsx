import Link from "next/link"
import type { Metadata } from "next"
import styles from "components/catalog/catalog-app.module.css"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://religion-catalog.reload.co.jp"

const companyProfile = [
  ["社名", "株式会社リロード / Reload, Inc."],
  ["代表者", "山本翔平"],
  ["設立", "2014年8月22日"],
  ["事業内容", "インターネット関連事業"],
  ["資本金", "2,000,000円"],
  ["所在地", "〒101-0046 東京都千代田区神田佐久間町 3-37-1 山茂登ビル 3F"],
] as const

export const metadata: Metadata = {
  title: "このサイトについて | 宗教比較カタログ",
  description:
    "宗教比較カタログの目的、情報整理方針、運営会社である株式会社リロードの情報。",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "このサイトについて | 宗教比較カタログ",
    description:
      "宗教比較カタログの目的、情報整理方針、運営会社である株式会社リロードの情報。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "宗教比較カタログ",
      },
    ],
    type: "website",
    url: `${siteUrl}/about/`,
  },
}

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>About</p>
        <h1 className={styles.heroTitle}>このサイトについて</h1>
        <p className={styles.heroText}>
          宗教比較カタログは、宗教や宗派ごとの教義、神観、実践、生活への影響を同じ観点で整理する情報サイトです。
          特定の宗教への勧誘、優劣評価、信仰判断の代行を目的とせず、思想理解の入口として使える中立的な比較を目指します。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.detailStack}>
          <article className={styles.detailPanel}>
            <h2 className={styles.detailHeading}>掲載情報の方針</h2>
            <p className={styles.articleLead}>
              各宗教・宗派の情報は、百科事典、研究資料、公式資料などを参照し、比較しやすい粒度に要約しています。
              地域、時代、教派、共同体によって実践や解釈に差があるため、詳細ページでは注記も併記しています。
            </p>
          </article>

          <article className={styles.detailPanel} id="company">
            <h2 className={styles.detailHeading}>運営会社</h2>
            <dl className={styles.detailList}>
              {companyProfile.map(([label, value]) => (
                <div className={styles.detailItem} key={label}>
                  <dt className={styles.detailLabel}>{label}</dt>
                  <dd className={styles.detailValue}>{value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.cardActions}>
              <Link
                className={styles.buttonGhost}
                href="https://reload.co.jp/"
                rel="noopener noreferrer"
                target="_blank"
              >
                公式サイト
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
