"use client";

import Link from "next/link";
import { NationIcon } from "./NationIcon";
import { RollupNumber } from "./rollup-number";

type NationCardProps = {
  nation: {
    id: string;
    slug: string;
    name: string;
    description: string;
    iconSlug: "moon" | "dove" | "flame";
  };
  population: number;
  animationDelay: number;
};

export function NationCard({
  nation,
  population,
  animationDelay,
}: NationCardProps) {
  return (
    <div
      className='border-4 border-gray-700 bg-gray-900/50 p-6 hover:border-gray-500 hover:scale-105 transition-all hover:shadow-lg hover:shadow-gray-700/50 animate-fade-in'
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className='text-center mb-4'>
        <div className='flex justify-center mb-3 hover:scale-110 transition-transform'>
          <NationIcon iconSlug={nation.iconSlug} size={64} />
        </div>
        <h2 className='text-2xl font-bold text-gray-100 mb-2'>{nation.name}</h2>
        <p className='text-sm text-gray-400 leading-relaxed mb-4'>
          {nation.description}
        </p>
        <div className='text-xs text-gray-500 mb-6'>
          👥 人口:{" "}
          <RollupNumber value={population} duration={1500} suffix='人' />
        </div>
      </div>

      <div className='space-y-3'>
        <Link
          href={`/nations/${nation.slug}`}
          className='block text-center py-3 px-4 border-2 border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-all hover:scale-105 text-gray-200'
        >
          この国を見る
        </Link>
        <Link
          href={`/register/${nation.slug}`}
          className='block text-center py-3 px-4 bg-gray-100 text-gray-900 hover:bg-white hover:scale-105 transition-all font-bold'
        >
          住民票を作る
        </Link>
      </div>
    </div>
  );
}
