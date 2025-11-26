"use client";

import { NationIcon } from "./NationIcon";
import { RollupNumber } from "./rollup-number";

type NationDistributionProps = {
  distribution: {
    nation: {
      id: string;
      name: string;
      iconSlug: "moon" | "dove" | "flame";
    };
    count: number;
    percentage: number;
  }[];
};

export function NationDistribution({ distribution }: NationDistributionProps) {
  return (
    <div className='space-y-4'>
      <div className='text-sm text-gray-500 mb-3'>国別人口分布</div>
      {distribution.map((item, index) => (
        <div
          key={item.nation.id}
          className='flex items-center gap-4 animate-slide-left'
          style={{ animationDelay: `${0.4 + index * 0.1}s` }}
        >
          <div className='shrink-0 hover:scale-110 transition-transform'>
            <NationIcon iconSlug={item.nation.iconSlug} size={40} />
          </div>
          <div className='flex-1'>
            <div className='flex justify-between text-sm mb-2'>
              <span className='text-gray-300'>{item.nation.name}</span>
              <span className='text-gray-400'>
                <RollupNumber value={item.count} duration={1500} suffix='人' />{" "}
                (
                <RollupNumber
                  value={item.percentage}
                  duration={1500}
                  suffix='%'
                />
                )
              </span>
            </div>
            <div className='w-full bg-gray-800 h-4 border-2 border-gray-700'>
              <div
                className='bg-gray-400 h-full transition-all duration-1000'
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
