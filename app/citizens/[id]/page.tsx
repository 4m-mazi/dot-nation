import { ShareButton } from "@/components/share-button";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const citizen = await prisma.citizen.findUnique({
    where: { id },
    include: {
      nation: true,
      community: true,
    },
  });

  if (!citizen) {
    return {
      title: "Citizen Not Found",
    };
  }

  const title = `${citizen.name} | ${citizen.nation.name}の住民`;
  const description = citizen.shortBio
    ? citizen.shortBio
    : `${citizen.nation.name}の住民「${citizen.name}」のプロフィール${
        citizen.title ? ` - ${citizen.title}` : ""
      }`;

  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/api/og/citizen/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${citizen.name}の住民カード`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function CitizenPage({ params }: Props) {
  const { id } = await params;

  const citizen = await prisma.citizen.findUnique({
    where: { id },
    include: {
      nation: true,
      community: true,
    },
  });

  if (!citizen) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const citizenUrl = `${baseUrl}/citizens/${id}`;

  return (
    <div className="relative min-h-screen">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 戻るリンク */}
        <Link
          href={`/nations/${citizen.nation.slug}`}
          className="inline-block mb-8 text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← {citizen.nation.name}に戻る
        </Link>

        {/* シェアボタン */}
        <div className="mb-8 flex justify-end">
          <ShareButton
            url={citizenUrl}
            title={`${citizen.name} | ${citizen.nation.name}の住民`}
            text={`私は${citizen.nation.name}の住民「${citizen.name}」です！ #DotNation`}
          />
        </div>

        {/* レトロ住民票カード */}
        <div
          id="citizen-card"
          className="border-8 border-gray-700 bg-linear-to-b from-gray-900 to-gray-800 p-8 mb-8 shadow-2xl"
        >
          {/* ヘッダー */}
          <div className="border-b-4 border-gray-700 pb-6 mb-6 text-center">
            <div className="text-sm text-gray-500 tracking-widest mb-2">
              {citizen.nation.name.toUpperCase()} CITIZEN CARD
            </div>
            <div className="text-xs text-gray-600">
              ID: {citizen.id} • Registered:{" "}
              {new Date(citizen.createdAt).toLocaleDateString("ja-JP")}
            </div>
            {citizen.community && (
              <div className="mt-3 inline-block bg-gray-800/50 border border-gray-700 px-3 py-1 text-xs text-gray-400">
                {citizen.community.emoji} {citizen.community.name}
              </div>
            )}
          </div>

          {/* メイン情報 */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* 左側: 基本情報 */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">NAME</div>
                <div className="text-3xl font-bold text-gray-100 border-b-2 border-gray-700 pb-2">
                  {citizen.name}
                </div>
              </div>

              {citizen.title && (
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">TITLE</div>
                  <div className="text-lg text-gray-300 italic">
                    &quot;{citizen.title}&quot;
                  </div>
                </div>
              )}

              {citizen.className && (
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">CLASS</div>
                  <div className="inline-block bg-gray-800 border-2 border-gray-600 px-4 py-2 text-gray-200">
                    [{citizen.className}]
                  </div>
                </div>
              )}
            </div>

            {/* 右側: ステータス */}
            <div>
              <div className="text-sm text-gray-500 mb-4">STATUS</div>
              <div className="space-y-4">
                <RetroStatBar label="ACT" value={citizen.activity} />
                <RetroStatBar label="CRE" value={citizen.creativity} />
                <RetroStatBar label="SOC" value={citizen.sociability} />
                <RetroStatBar label="CUR" value={citizen.curiosity} />
              </div>
            </div>
          </div>

          {/* 自己紹介 */}
          {citizen.shortBio && (
            <div className="border-t-4 border-gray-700 pt-6 mt-6">
              <div className="text-sm text-gray-500 mb-3">BIO</div>
              <div className="text-gray-300 leading-relaxed bg-gray-800/50 border-2 border-gray-700 p-4 whitespace-pre-wrap">
                {citizen.shortBio}
              </div>
            </div>
          )}

          {/* フッター印章風 */}
          <div className="border-t-4 border-gray-700 pt-6 mt-8 flex justify-between items-center">
            <div className="text-xs text-gray-600">
              Dot Nation Official Certificate
            </div>
            <div className="w-16 h-16 border-4 border-red-900 rounded-full flex items-center justify-center text-red-900 font-bold text-xs transform rotate-12">
              公式
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RetroStatBar({ label, value }: { label: string; value: number }) {
  // 20刻みでブロック表示
  const blocks = Math.floor(value / 20);

  return (
    <div className="flex items-center gap-3">
      <div className="text-xs text-gray-500 w-8 font-bold">{label}</div>
      <div className="flex-1 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: 配列が固定長で順序が変わらないため
            key={`${label}-${i}`}
            className={`flex-1 h-6 border-2 ${
              i < blocks
                ? "bg-gray-400 border-gray-600"
                : "bg-gray-900 border-gray-700"
            }`}
          />
        ))}
      </div>
      <div className="text-sm text-gray-300 w-10 text-right font-bold">
        {value}
      </div>
    </div>
  );
}
