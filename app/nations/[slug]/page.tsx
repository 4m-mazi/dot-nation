import { NationIcon } from "@/components/NationIcon";
import { getAverageStatsByNation, getCitizensByNation } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NationPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ community?: string }>;
}) {
  const { slug } = await params;
  const { community } = await searchParams;

  const nation = await prisma.nation.findUnique({
    where: { slug },
  });

  if (!nation) {
    notFound();
  }

  // データベースから実際のコミュニティを取得
  const communities = await prisma.community.findMany();

  // slugからiconSlugを決定
  const iconSlug =
    nation.slug === "night"
      ? "moon"
      : nation.slug === "silent"
        ? "dove"
        : "flame";

  const selectedCommunity = community || undefined;
  const citizens = await getCitizensByNation(slug, selectedCommunity);
  const avgStats = await getAverageStatsByNation(slug, selectedCommunity);

  return (
    <div className="relative min-h-screen">
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* 戻るリンク */}
        <Link
          href="/"
          className="inline-block mb-8 text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← 国一覧に戻る
        </Link>

        {/* 国情報 */}
        <div className="border-4 border-gray-700 bg-gray-900/50 p-8 mb-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <NationIcon iconSlug={iconSlug} size={96} />
            </div>
            <h1 className="text-4xl font-bold text-gray-100 mb-4">
              {nation.name}
            </h1>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              {nation.description}
            </p>
            <Link
              href={`/register/${nation.slug}${
                selectedCommunity ? `?community=${selectedCommunity}` : ""
              }`}
              className="inline-block py-3 px-8 bg-gray-100 text-gray-900 hover:bg-white transition-colors font-bold"
            >
              この国の民になる
            </Link>
          </div>
        </div>

        {/* コミュニティ切り替え */}
        <div className="mb-8 border-4 border-gray-700 bg-gray-900/50 p-6">
          <div className="text-sm text-gray-500 mb-3">表示範囲</div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/nations/${slug}`}
              className={`py-2 px-6 border-2 transition-colors ${
                selectedCommunity === undefined
                  ? "bg-gray-100 text-gray-900 border-gray-100"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              🌍 全体(グローバル)
            </Link>
            {communities.map((comm) => (
              <Link
                key={comm.id}
                href={`/nations/${slug}?community=${comm.id}`}
                className={`py-2 px-6 border-2 transition-colors ${
                  selectedCommunity === comm.id
                    ? "bg-gray-100 text-gray-900 border-gray-100"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {comm.emoji} {comm.name}
              </Link>
            ))}
          </div>
          <div className="text-xs text-gray-600 mt-3">
            {selectedCommunity === undefined
              ? "世界中の全住民を表示しています"
              : `${
                  communities.find((c) => c.id === selectedCommunity)?.name
                }のメンバーのみ表示しています`}
          </div>
        </div>

        {/* 統計情報 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
            📊 国の統計
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 人口 */}
            <div className="border-2 border-gray-700 bg-gray-900/30 p-6">
              <div className="text-sm text-gray-500 mb-2">人口</div>
              <div className="text-4xl font-bold text-gray-100">
                {citizens.length}人
              </div>
            </div>

            {/* 平均ステータス */}
            <div className="border-2 border-gray-700 bg-gray-900/30 p-6">
              <div className="text-sm text-gray-500 mb-4">平均ステータス</div>
              <div className="space-y-2">
                <StatBar label="行動力" value={avgStats.activity} />
                <StatBar label="創造力" value={avgStats.creativity} />
                <StatBar label="社交性" value={avgStats.sociability} />
                <StatBar label="好奇心" value={avgStats.curiosity} />
              </div>
            </div>
          </div>
        </div>

        {/* 住民一覧 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
            👥 住民一覧
          </h2>
          {citizens.length === 0 ? (
            <div className="border-2 border-gray-700 bg-gray-900/30 p-12 text-center text-gray-500">
              まだ住民がいません。最初の住民になりませんか?
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {citizens.map((citizen) => (
                <Link
                  key={citizen.id}
                  href={`/citizens/${citizen.id}`}
                  className="border-2 border-gray-700 bg-gray-900/30 p-6 hover:border-gray-500 transition-colors"
                >
                  <div className="mb-4">
                    <div className="text-xl font-bold text-gray-100 mb-1">
                      {citizen.name}
                    </div>
                    {citizen.title && (
                      <div className="text-sm text-gray-400">
                        {citizen.title}
                      </div>
                    )}
                    {citizen.className && (
                      <div className="text-xs text-gray-500 mt-2">
                        [{citizen.className}]
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <MiniStatBar label="行動力" value={citizen.activity} />
                    <MiniStatBar label="創造力" value={citizen.creativity} />
                    <MiniStatBar label="社交性" value={citizen.sociability} />
                    <MiniStatBar label="好奇心" value={citizen.curiosity} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-800 h-3 border border-gray-700">
        <div className="bg-gray-400 h-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniStatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 w-12">{label}</span>
      <div className="flex-1 bg-gray-800 h-2 border border-gray-700">
        <div className="bg-gray-500 h-full" style={{ width: `${value}%` }} />
      </div>
      <span className="text-gray-400 w-6 text-right">{value}</span>
    </div>
  );
}
