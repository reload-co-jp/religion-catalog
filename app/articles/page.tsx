import Link from "next/link"
import type { Metadata } from "next"
import styles from "components/catalog/catalog-app.module.css"
import { articleDefinitions } from "lib/articles"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://religion-catalog.reload.co.jp"

export const metadata: Metadata = {
  title: "宗教用語の解説記事 | 宗教比較カタログ",
  description:
    "死後観、救済、実践負荷、戒律など、宗教比較で使う観点をやさしく整理した解説記事一覧。",
  alternates: {
    canonical: "/articles/",
  },
  openGraph: {
    title: "宗教用語の解説記事 | 宗教比較カタログ",
    description:
      "死後観、救済、実践負荷、戒律など、宗教比較で使う観点をやさしく整理した解説記事一覧。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "宗教比較カタログ",
      },
    ],
    type: "website",
    url: `${siteUrl}/articles/`,
  },
}

const ArticlesPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Guide Articles</p>
        <h1 className={styles.heroTitle}>宗教比較を読みやすくする解説記事</h1>
        <p className={styles.heroText}>
          死後観、救済、実践負荷、戒律など、比較表で出てくる言葉を先に読めるようにまとめています。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.cards}>
          {articleDefinitions.map((article) => (
            <article className={styles.card} key={article.slug}>
              <div>
                <p className={styles.eyebrow}>Article</p>
                <h2 className={styles.cardTitle}>{article.title}</h2>
              </div>
              <p className={styles.summary}>{article.description}</p>
              <div className={styles.cardActions}>
                <Link className={styles.buttonGhost} href={`/articles/${article.slug}/`}>
                  記事を読む
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ArticlesPage
