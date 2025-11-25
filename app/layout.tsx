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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={dotGothic.variable}>{children}</body>
    </html>
  );
}
