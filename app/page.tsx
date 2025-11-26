import { NationIcon } from "@/components/NationIcon";
import {
  getCitizenCountByNation,
  getGlobalAverageStats,
  getNationDistribution,
  getPopularClasses,
  getRecentCitizens,
  getTotalCitizens,
} from "@/lib/data";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const totalCitizens = await getTotalCitizens();
  const distribution = await getNationDistribution();
  const globalStats = await getGlobalAverageStats();
  const recentCitizens = await getRecentCitizens(3);
  const popularClasses = await getPopularClasses(5);
  const nations = await prisma.nation.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="relative min-h-screen">
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* ヘッダー */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gray-100 animate-slide-down">
            Dot Nation 🎮
          </h1>
          <p
            className="text-lg text-gray-400 mb-3 leading-relaxed max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            あなたの中の&ldquo;もうひとつの姿&rdquo;を
            <br />
            ドットの世界に刻もう。
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            住民票をつくって、あなたが属する国を選んで遊べる小さな世界。
            <br />
            現実じゃない、だけど嘘でもない。
            <br />
            ここは、あなたの心の国。
          </p>
        </header>

        {/* グローバル統計 */}
        <div
          className="border-4 border-gray-700 bg-gray-900/50 p-8 mb-12 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center border-b-2 border-gray-700 pb-2">
            🌍 グローバル統計
          </h2>
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-2">総人口</div>
            <div className="text-5xl font-bold text-gray-100 animate-pulse-slow">
              {totalCitizens.toLocaleString()}人
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-sm text-gray-500 mb-3">国別人口分布</div>
            {distribution.map((item, index) => (
              <div
                key={item.nation.id}
                className="flex items-center gap-4 animate-slide-left"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex-shrink-0 hover:scale-110 transition-transform">
                  <NationIcon iconSlug={item.nation.iconSlug} size={40} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{item.nation.name}</span>
                    <span className="text-gray-400">
                      {item.count}人 ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 h-4 border-2 border-gray-700">
                    <div
                      className="bg-gray-400 h-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 世界の平均ステータス */}
          <div className="mt-8 pt-8 border-t-2 border-gray-700">
            <div className="text-sm text-gray-500 mb-4">
              🌐 世界の平均ステータス
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "行動力", value: globalStats.activity, icon: "⚡" },
                { label: "創造力", value: globalStats.creativity, icon: "🎨" },
                { label: "社交性", value: globalStats.sociability, icon: "👥" },
                { label: "好奇心", value: globalStats.curiosity, icon: "🔍" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="border-2 border-gray-700 bg-gray-800/50 p-4 text-center hover:border-gray-500 hover:scale-105 transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="text-2xl mb-1 animate-bounce-slow">
                    {stat.icon}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{stat.label}</div>
                  <div className="text-2xl font-bold text-gray-200">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 人気のクラス */}
          {popularClasses.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-gray-700">
              <div className="text-sm text-gray-500 mb-4">
                🏆 人気のクラス TOP5
              </div>
              <div className="space-y-2">
                {popularClasses.map((item, index) => (
                  <div
                    key={item.className}
                    className="flex items-center gap-3 bg-gray-800/30 p-3 border-2 border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all animate-slide-right"
                    style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                  >
                    <div
                      className={`text-xl font-bold w-8 text-center ${
                        index === 0
                          ? "text-yellow-400"
                          : index === 1
                            ? "text-gray-300"
                            : index === 2
                              ? "text-orange-400"
                              : "text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 text-gray-300">{item.className}</div>
                    <div className="text-gray-500 text-sm">{item.count}人</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 最新の住民 */}
          {recentCitizens.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-gray-700">
              <div className="text-sm text-gray-500 mb-4">
                ✨ 新しく加わった住民
              </div>
              <div className="space-y-3">
                {recentCitizens.map((citizen, index) => (
                  <Link
                    key={citizen.id}
                    href={`/citizens/${citizen.id}`}
                    className="block bg-gray-800/30 p-4 border-2 border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all hover:scale-102 animate-fade-in"
                    style={{ animationDelay: `${1.6 + index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {citizen.nation?.iconSlug && (
                          <NationIcon
                            iconSlug={citizen.nation.iconSlug}
                            size={32}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-200 font-bold">
                          {citizen.name}
                        </div>
                        {citizen.title && (
                          <div className="text-xs text-gray-500">
                            {citizen.title}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {citizen.nation?.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 国一覧 */}
        <div className="mt-12">
          <h2
            className="text-2xl font-bold text-gray-100 mb-6 text-center animate-fade-in"
            style={{ animationDelay: "1.8s" }}
          >
            国を選んで住民票を作ろう
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {
              await Promise.all(
                nations.map(async (nation, index) => {
                  const population = await getCitizenCountByNation(nation.id);

                  return (
                    <div
                      key={nation.id}
                      className="border-4 border-gray-700 bg-gray-900/50 p-6 hover:border-gray-500 hover:scale-105 transition-all hover:shadow-lg hover:shadow-gray-700/50 animate-fade-in"
                      style={{ animationDelay: `${2.0 + index * 0.2}s` }}
                    >
                      <div className="text-center mb-4">
                        <div className="flex justify-center mb-3 hover:scale-110 transition-transform">
                          <NationIcon iconSlug={nation.iconSlug} size={64} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100 mb-2">
                          {nation.name}
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                          {nation.description}
                        </p>
                        <div className="text-xs text-gray-500 mb-6">
                          👥 人口: {population}人
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Link
                          href={`/nations/${nation.slug}`}
                          className="block text-center py-3 px-4 border-2 border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-all hover:scale-105 text-gray-200"
                        >
                          この国を見る
                        </Link>
                        <Link
                          href={`/register/${nation.slug}`}
                          className="block text-center py-3 px-4 bg-gray-100 text-gray-900 hover:bg-white hover:scale-105 transition-all font-bold"
                        >
                          住民票を作る
                        </Link>
                      </div>
                    </div>
                  );
                }),
              )
            }
          </div>
        </div>

        {/* フッター */}
        <footer className="mt-20 text-center text-gray-500 text-sm space-y-2">
          <p>🎮 Dot Nation - レトロRPG風住民票サービス</p>
          <div className="flex justify-center gap-4 text-xs">
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              利用規約
            </Link>
            <span>|</span>
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              プライバシーポリシー
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
