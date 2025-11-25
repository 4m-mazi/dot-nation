import { NationIcon } from "@/components/NationIcon";
import RegistrationForm from "@/components/registration-form";
import { getCommunities } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RegisterPage({
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
  const communities = await getCommunities();

  if (!nation) {
    notFound();
  }

  // slugからiconSlugを決定
  const iconSlug =
    nation.slug === "night"
      ? "moon"
      : nation.slug === "silent"
      ? "dove"
      : "flame";

  return (
    <div className='relative min-h-screen'>
      <main className='container mx-auto px-4 py-16 max-w-3xl'>
        {/* 戻るリンク */}
        <Link
          href={`/nations/${slug}`}
          className='inline-block mb-8 text-gray-400 hover:text-gray-200 transition-colors'
        >
          ← {nation.name}に戻る
        </Link>

        {/* ヘッダー - RPG風のダイアログボックス */}
        <div className='border-4 border-gray-700 bg-gray-900/80 p-8 mb-12 relative'>
          {/* ドット装飾 */}
          <div className='absolute top-0 left-0 w-4 h-4 bg-gray-700' />
          <div className='absolute top-0 right-0 w-4 h-4 bg-gray-700' />
          <div className='absolute bottom-0 left-0 w-4 h-4 bg-gray-700' />
          <div className='absolute bottom-0 right-0 w-4 h-4 bg-gray-700' />

          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <NationIcon iconSlug={iconSlug} size={80} />
            </div>
            <h1 className='text-4xl font-bold text-gray-100 mb-4 tracking-wider'>
              {nation.name}の民になる
            </h1>
            <div className='border-2 border-gray-700 bg-gray-950/50 p-4 mb-4'>
              <p className='text-gray-300 mb-3 leading-relaxed'>
                {nation.description}
              </p>
              <div className='border-t-2 border-gray-700 pt-3 mt-3'>
                <p className='text-sm text-gray-500'>
                  あなたの住民票（Citizen Card）を作成しよう
                </p>
                <p className='text-xs text-gray-600 mt-1'>
                  ここでの姿は、あなたの&ldquo;もうひとつの顔&rdquo;
                </p>
              </div>
            </div>
            {/* RPG風の進行テキスト */}
            <div className='text-left text-sm text-gray-500 border-l-4 border-gray-700 pl-4'>
              <p>▶ まずは名前を決めよう...</p>
              <p>▶ ステータスを調整して...</p>
              <p>▶ 自己紹介を書けば完成だ</p>
            </div>
          </div>
        </div>

        {/* フォーム */}
        <RegistrationForm
          nationId={nation.id}
          nationSlug={nation.slug}
          nationName={nation.name}
          defaultCommunityId={community}
          communities={communities}
        />
      </main>
    </div>
  );
}
