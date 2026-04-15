import type { Metadata } from "next"
import { Title } from "components/elements/layout"
import "./reset.css"
import Link from "next/link"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "宗教比較カタログ",
    template: "%s | 宗教比較カタログ",
  },
  description:
    "宗教・宗派の教義、神観、実践、生活への影響を中立的に比較し、価値観に近い特徴を探せるカタログサイト。",
  keywords: [
    "宗教比較",
    "宗派比較",
    "宗教一覧",
    "宗教の違い",
    "宗教 カタログ",
    "宗派 一覧",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "宗教比較カタログ",
    description:
      "宗教・宗派の教義、神観、実践、生活への影響を中立的に比較し、価値観に近い特徴を探せるカタログサイト。",
    locale: "ja_JP",
    siteName: "宗教比較カタログ",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "宗教比較カタログ",
    description:
      "宗教・宗派の教義、神観、実践、生活への影響を中立的に比較し、価値観に近い特徴を探せるカタログサイト。",
  },
  robots: {
    follow: true,
    index: true,
  },
  category: "reference",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header className="siteHeader">
          <div className="shell shellHeader">
            <Link href="/">
              <Title>宗教比較カタログ</Title>
            </Link>
            <p className="siteMeta">
              教義・実践・生活への影響を、同一観点で整理して比較する
            </p>
          </div>
        </header>
        <main className="siteMain">
          <div className="shell">{children}</div>
        </main>
        <footer className="siteFooter">
          <div className="shell">
            <p>
              情報整理を目的とした中立的な比較UIです。優劣評価や勧誘を意図しません。
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
