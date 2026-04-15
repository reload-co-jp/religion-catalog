import { Title } from "components/elements/layout"
import "./reset.css"

export const metadata = {
  title: "宗教比較カタログ",
  description: "宗教・宗派の教義、神観、実践、生活への影響を中立的に比較するカタログサイト",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header className="siteHeader">
          <div className="shell shellHeader">
            <Title>宗教比較カタログ</Title>
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
            <p>情報整理を目的とした中立的な比較UIです。優劣評価や勧誘を意図しません。</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
