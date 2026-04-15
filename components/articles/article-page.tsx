import Link from "next/link"
import styles from "components/catalog/catalog-app.module.css"
import type { ArticleDefinition } from "lib/articles"

type ArticlePageProps = {
  article: ArticleDefinition
}

export const ArticlePage = ({ article }: ArticlePageProps) => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <nav aria-label="パンくず" className={styles.breadcrumbs}>
          <Link className={styles.breadcrumbLink} href="/">
            ホーム
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <Link className={styles.breadcrumbLink} href="/articles/">
            記事
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </nav>
        <p className={styles.eyebrow}>Guide Article</p>
        <h1 className={styles.heroTitle}>{article.title}</h1>
        <p className={styles.heroText}>{article.description}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.articleBody}>
          <p className={styles.articleLead}>{article.intro}</p>
          <div className={styles.articleSection}>
            <h2 className={styles.sectionTitle}>ポイント</h2>
            <ul className={styles.articleList}>
              {article.points.map((point) => (
                <li className={styles.articleListItem} key={point}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
