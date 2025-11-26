import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dotgothic",
});

export const metadata: Metadata = {
  title: "ドット国家 - レトロRPG風の住民票サービス",
  description:
    "あなたにぴったりの国を見つけて、レトロRPG風の住民票を作成しよう",
  openGraph: {
    title: "Dot Nation - あなたの生き方を、国として選ぶ",
    description:
      "あなたにぴったりの国を見つけて、レトロRPG風の住民票を作成しよう",
    type: "website",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/og/default`,
        width: 1200,
        height: 630,
        alt: "Dot Nation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dot Nation - あなたの生き方を、国として選ぶ",
    description:
      "あなたにぴったりの国を見つけて、レトロRPG風の住民票を作成しよう",
    images: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/og/default`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={dotGothic.variable}>{children}</body>
    </html>
  );
}
