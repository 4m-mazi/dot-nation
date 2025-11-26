import { prisma } from "@/lib/prisma";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const citizen = await prisma.citizen.findUnique({
      where: { id },
      include: {
        nation: true,
        community: true,
      },
    });

    if (!citizen) {
      return new Response("Citizen not found", { status: 404 });
    }

    // ステータスのブロック表示用
    const getBlocks = (value: number) => Math.floor(value / 20);

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
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
            width: "100%",
            height: "100%",
            backgroundColor: "#1f2937",
            border: "8px solid #374151",
            padding: "40px 50px",
          }}
        >
          {/* ヘッダー */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "4px solid #374151",
              paddingBottom: "20px",
              marginBottom: "30px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "22px",
                  color: "#6b7280",
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                }}
              >
                <span>{citizen.nation.name.toUpperCase()} CITIZEN</span>
              </div>
            </div>
            {citizen.community && (
              <div style={{ display: "flex", marginTop: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#111827",
                    border: "2px solid #374151",
                    padding: "8px 20px",
                    fontSize: "16px",
                    color: "#9ca3af",
                  }}
                >
                  <span>
                    {citizen.community.emoji} {citizen.community.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* メイン情報 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "50px",
              flex: 1,
            }}
          >
            {/* 左側: 基本情報 */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "20px",
                        color: "#6b7280",
                        marginBottom: "10px",
                      }}
                    >
                      <span>NAME</span>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "42px",
                        fontWeight: "bold",
                        color: "#f3f4f6",
                        borderBottom: "3px solid #374151",
                        paddingBottom: "12px",
                      }}
                    >
                      <span>{citizen.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {citizen.title && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "32px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "20px",
                          color: "#6b7280",
                        }}
                      >
                        <span>TITLE</span>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "24px",
                          color: "#d1d5db",
                          fontStyle: "italic",
                          marginTop: "10px",
                        }}
                      >
                        <span>"{citizen.title}"</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {citizen.className && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "32px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "#1f2937",
                        border: "2px solid #4b5563",
                        padding: "12px 24px",
                        fontSize: "22px",
                        color: "#e5e7eb",
                      }}
                    >
                      <span>[{citizen.className}]</span>
                    </div>
                  </div>
                </div>
              )}

              {citizen.shortBio && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "32px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "20px",
                          color: "#6b7280",
                          marginBottom: "10px",
                        }}
                      >
                        <span>BIO</span>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "18px",
                          color: "#d1d5db",
                          lineHeight: 1.6,
                        }}
                      >
                        <span>{citizen.shortBio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 右側: ステータス */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "20px",
                      color: "#6b7280",
                      marginBottom: "18px",
                    }}
                  >
                    <span>STATUS</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {[
                    { label: "ACT", value: citizen.activity },
                    { label: "CRE", value: citizen.creativity },
                    { label: "SOC", value: citizen.sociability },
                    { label: "CUR", value: citizen.curiosity },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", width: "50px" }}>
                        <div
                          style={{
                            display: "flex",
                            fontSize: "18px",
                            color: "#6b7280",
                            fontWeight: "bold",
                          }}
                        >
                          <span>{stat.label}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={`${stat.label}-${i}`}
                            style={{
                              flex: 1,
                              height: "30px",
                              border: "2px solid",
                              borderColor:
                                i < getBlocks(stat.value)
                                  ? "#4b5563"
                                  : "#374151",
                              backgroundColor:
                                i < getBlocks(stat.value)
                                  ? "#9ca3af"
                                  : "#111827",
                            }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "50px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            fontSize: "20px",
                            color: "#d1d5db",
                            fontWeight: "bold",
                          }}
                        >
                          <span>{stat.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
