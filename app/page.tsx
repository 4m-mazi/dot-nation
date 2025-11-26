import { GlobalStatsDisplay } from "@/components/global-stats-display";
import { NationCard } from "@/components/nation-card";
import { NationDistribution } from "@/components/nation-distribution";
import { NationIcon } from "@/components/NationIcon";
import { PopularClassesDisplay } from "@/components/popular-classes-display";
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

  // 各国の人口を事前に取得
  const nationsWithPopulation = await Promise.all(
    nations.map(async (nation) => ({
      ...nation,
      iconSlug: nation.iconSlug as "moon" | "dove" | "flame",
      population: await getCitizenCountByNation(nation.id),
    })),
  );

  // 分布データをクライアントコンポーネント用に変換
  const distributionForClient = distribution.map((item) => ({
    nation: {
      id: item.nation.id,
      name: item.nation.name,
      iconSlug: item.nation.iconSlug as "moon" | "dove" | "flame",
    },
    count: item.count,
    percentage: item.percentage,
  }));

  return (
    <div className='relative min-h-screen'>
      <main className='container mx-auto px-4 py-16 max-w-6xl'>
        {/* ヘッダー */}
        <header className='text-center mb-16 animate-fade-in'>
          <h1 className='text-5xl font-bold mb-6 text-gray-100 animate-slide-down'>
            Dot Nation 🎮
          </h1>
          <p
            className='text-lg text-gray-400 mb-3 leading-relaxed max-w-2xl mx-auto animate-slide-up'
            style={{ animationDelay: "0.2s" }}
          >
            あなたの中の&ldquo;もうひとつの姿&rdquo;を
            <br />
            ドットの世界に刻もう。
          </p>
          <p className='text-sm text-gray-500 leading-relaxed max-w-xl mx-auto'>
            住民票をつくって、あなたが属する国を選んで遊べる小さな世界。
            <br />
            現実じゃない、だけど嘘でもない。
            <br />
            ここは、あなたの心の国。
          </p>
        </header>

        {/* グローバル統計 */}
        <div
          className='border-4 border-gray-700 bg-gray-900/50 p-8 mb-12 animate-slide-up'
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className='text-2xl font-bold text-gray-100 mb-6 text-center border-b-2 border-gray-700 pb-2'>
            🌍 グローバル統計
          </h2>

          <GlobalStatsDisplay
            totalCitizens={totalCitizens}
            globalStats={globalStats}
          />

          <NationDistribution distribution={distributionForClient} />

          <PopularClassesDisplay popularClasses={popularClasses} />

          {/* 最新の住民 */}
          {recentCitizens.length > 0 && (
            <div className='mt-8 pt-8 border-t-2 border-gray-700'>
              <div className='text-sm text-gray-500 mb-4'>
                ✨ 新しく加わった住民
              </div>
              <div className='space-y-3'>
                {recentCitizens.map((citizen, index) => (
                  <Link
                    key={citizen.id}
                    href={`/citizens/${citizen.id}`}
                    className='block bg-gray-800/30 p-4 border-2 border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all hover:scale-102 animate-fade-in'
                    style={{ animationDelay: `${1.6 + index * 0.1}s` }}
                  >
                    <div className='flex items-center gap-3'>
                      <div className='text-2xl'>
                        {citizen.nation?.iconSlug && (
                          <NationIcon
                            iconSlug={citizen.nation.iconSlug}
                            size={32}
                          />
                        )}
                      </div>
                      <div className='flex-1'>
                        <div className='text-gray-200 font-bold'>
                          {citizen.name}
                        </div>
                        {citizen.title && (
                          <div className='text-xs text-gray-500'>
                            {citizen.title}
                          </div>
                        )}
                      </div>
                      <div className='text-xs text-gray-600'>
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
        <div className='mt-12'>
          <h2
            className='text-2xl font-bold text-gray-100 mb-6 text-center animate-fade-in'
            style={{ animationDelay: "1.8s" }}
          >
            国を選んで住民票を作ろう
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {nationsWithPopulation.map((nation, index) => (
              <NationCard
                key={nation.id}
                nation={nation}
                population={nation.population}
                animationDelay={2.0 + index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* フッター */}
        <footer className='mt-20 text-center text-gray-500 text-sm space-y-2'>
          <p>🎮 Dot Nation - レトロRPG風住民票サービス</p>
          <div className='flex justify-center gap-4 text-xs'>
            <Link
              href='/terms'
              className='hover:text-gray-300 transition-colors'
            >
              利用規約
            </Link>
            <span>|</span>
            <Link
              href='/privacy'
              className='hover:text-gray-300 transition-colors'
            >
              プライバシーポリシー
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
