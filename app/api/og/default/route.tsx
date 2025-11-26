import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111827",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2937 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* ロゴ/タイトル */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: "bold",
                color: "#f3f4f6",
                letterSpacing: "0.05em",
              }}
            >
              <span>DOT NATION</span>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              <span>あなたの生き方を、国として選ぶ</span>
            </div>
          </div>
        </div>

        {/* 3つの国 */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          {/* 夜の国 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#1f2937",
              border: "3px solid #374151",
              padding: "30px 40px",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "48px",
                }}
              >
                <span>🌙</span>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#e5e7eb",
                }}
              >
                <span>夜の国</span>
              </div>
            </div>
          </div>

          {/* 静寂の国 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#1f2937",
              border: "3px solid #374151",
              padding: "30px 40px",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "48px",
                }}
              >
                <span>🕊️</span>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#e5e7eb",
                }}
              >
                <span>静寂の国</span>
              </div>
            </div>
          </div>

          {/* 本音の国 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#1f2937",
              border: "3px solid #374151",
              padding: "30px 40px",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "48px",
                }}
              >
                <span>🔥</span>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#e5e7eb",
                }}
              >
                <span>本音の国</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
