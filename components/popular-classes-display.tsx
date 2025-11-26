"use client";

import { RollupNumber } from "./rollup-number";

type PopularClassesDisplayProps = {
  popularClasses: {
    className: string;
    count: number;
  }[];
};

export function PopularClassesDisplay({
  popularClasses,
}: PopularClassesDisplayProps) {
  if (popularClasses.length === 0) return null;

  return (
    <div className='mt-8 pt-8 border-t-2 border-gray-700'>
      <div className='text-sm text-gray-500 mb-4'>🏆 人気のクラス TOP5</div>
      <div className='space-y-2'>
        {popularClasses.map((item, index) => (
          <div
            key={item.className}
            className='flex items-center gap-3 bg-gray-800/30 p-3 border-2 border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all animate-slide-right'
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
            <div className='flex-1 text-gray-300'>{item.className}</div>
            <div className='text-gray-500 text-sm'>
              <RollupNumber value={item.count} duration={1500} suffix='人' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
