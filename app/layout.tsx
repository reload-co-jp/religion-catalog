import type { Metadata } from "next"
import Script from "next/script"
import { Title } from "components/elements/layout"
import "./reset.css"
import Link from "next/link"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://religion-catalog.reload.co.jp"
const googleAnalyticsId = "G-7PTQHSDKXN"
const isProduction = process.env.NODE_ENV === "production"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "宗教比較カタログ | 気になる価値観から、信じるものを見つける",
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
    title: "宗教比較カタログ | 気になる価値観から、信じるものを見つける",
    description:
      "宗教・宗派の教義、神観、実践、生活への影響を中立的に比較し、価値観に近い特徴を探せるカタログサイト。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "宗教比較カタログ",
      },
    ],
    locale: "ja_JP",
    siteName: "宗教比較カタログ",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "宗教比較カタログ | 気になる価値観から、信じるものを見つける",
    description:
      "宗教・宗派の教義、神観、実践、生活への影響を中立的に比較し、価値観に近い特徴を探せるカタログサイト。",
    images: ["/opengraph-image"],
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
        {isProduction && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
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
            <p className="footerLinks">
              <Link href="/articles/">解説記事一覧</Link>
              <span>/</span>
              <Link href="/articles/afterlife/">死後観とは</Link>
              <span>/</span>
              <Link href="/articles/salvation/">救済とは</Link>
              <span>/</span>
              <Link href="/articles/practice-burden/">実践負荷とは</Link>
              <span>/</span>
              <Link href="/articles/discipline/">戒律とは</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
