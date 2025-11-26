"use client";

import { RollupNumber } from "./rollup-number";

type GlobalStatsDisplayProps = {
  totalCitizens: number;
  globalStats: {
    activity: number;
    creativity: number;
    sociability: number;
    curiosity: number;
  };
};

export function GlobalStatsDisplay({
  totalCitizens,
  globalStats,
}: GlobalStatsDisplayProps) {
  return (
    <>
      {/* 総人口 */}
      <div className='text-center mb-8'>
        <div className='text-sm text-gray-500 mb-2'>総人口</div>
        <div className='text-5xl font-bold text-gray-100'>
          <RollupNumber value={totalCitizens} duration={2000} suffix='人' />
        </div>
      </div>

      {/* 世界の平均ステータス */}
      <div className='mt-8 pt-8 border-t-2 border-gray-700'>
        <div className='text-sm text-gray-500 mb-4'>
          🌐 世界の平均ステータス
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {[
            { label: "行動力", value: globalStats.activity, icon: "⚡" },
            { label: "創造力", value: globalStats.creativity, icon: "🎨" },
            { label: "社交性", value: globalStats.sociability, icon: "👥" },
            { label: "好奇心", value: globalStats.curiosity, icon: "🔍" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className='border-2 border-gray-700 bg-gray-800/50 p-4 text-center hover:border-gray-500 hover:scale-105 transition-all cursor-pointer animate-fade-in'
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className='text-2xl mb-1 animate-bounce-slow'>
                {stat.icon}
              </div>
              <div className='text-xs text-gray-500 mb-2'>{stat.label}</div>
              <div className='text-2xl font-bold text-gray-200'>
                <RollupNumber
                  value={stat.value}
                  duration={1500 + index * 200}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
