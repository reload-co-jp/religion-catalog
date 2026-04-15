import { ImageResponse } from "next/og"

export const alt = "宗教比較カタログ"
export const dynamic = "force-static"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #fff4dc 0%, #ffe6bb 52%, #ffd09c 100%)",
          color: "#4b3522",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 18,
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "rgba(255,255,255,0.72)",
              border: "2px solid rgba(215,137,60,0.28)",
              borderRadius: 9999,
              display: "flex",
              fontSize: 28,
              height: 72,
              justifyContent: "center",
              width: 72,
            }}
          >
            ✦
          </div>
          <div
            style={{
              color: "#b56f2d",
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Find what to believe
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            宗教比較カタログ
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.5,
              opacity: 0.85,
            }}
          >
            教義、神観、実践、生活への影響を中立的に比較し、
            気になる価値観から信じるものを見つける。
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
          }}
        >
          {["暮らしから比較", "宗派ごとの差が見える", "中立的に整理"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.68)",
                  border: "1px solid rgba(215,137,60,0.22)",
                  borderRadius: 9999,
                  display: "flex",
                  fontSize: 24,
                  padding: "14px 20px",
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  )
}
