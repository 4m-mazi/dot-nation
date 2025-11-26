"use client";

import { createCitizen } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
  name: string;
  title: string;
  className: string;
  activity: number;
  creativity: number;
  sociability: number;
  curiosity: number;
  shortBio: string;
  communityId?: string;
};

export default function RegistrationForm({
  nationId,
  nationName,
  defaultCommunityId,
  communities,
}: {
  nationId: string;
  nationSlug?: string;
  nationName: string;
  defaultCommunityId?: string;
  communities: Array<{
    id: string;
    slug: string;
    name: string;
    description: string;
    emoji: string;
    type: string;
  }>;
}) {
  const router = useRouter();

  // defaultCommunityIdがslugまたはidの場合に対応
  const validCommunityId = defaultCommunityId
    ? communities.find(
        (c) => c.id === defaultCommunityId || c.slug === defaultCommunityId,
      )?.id
    : undefined;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    className: "",
    activity: 50,
    creativity: 50,
    sociability: 50,
    curiosity: 50,
    shortBio: "",
    communityId: validCommunityId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const citizen = await createCitizen({
        nationId,
        ...formData,
      });

      // 住民票ページにリダイレクト
      router.push(`/citizens/${citizen.id}`);
    } catch (error) {
      console.error("Failed to create citizen:", error);
      alert("エラーが発生しました。もう一度お試しください。");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("activity") ||
        name.includes("creativity") ||
        name.includes("sociability") ||
        name.includes("curiosity")
          ? Number(value)
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* コミュニティ選択 */}
      <div className="border-4 border-gray-700 bg-gray-900/50 p-6 relative">
        {/* RPG風の装飾 */}
        <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-yellow-400 text-sm">
          ▼ STEP 1
        </div>
        <h2 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
          所属コミュニティ
        </h2>

        <div className="space-y-4">
          <div className="text-sm text-gray-400 mb-3">
            あなたはどのコミュニティから来ましたか?（任意）
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, communityId: undefined }))
              }
              className={`py-3 px-6 border-2 transition-colors text-left ${
                formData.communityId === undefined
                  ? "bg-gray-100 text-gray-900 border-gray-100"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              🌍 コミュニティなし（グローバル）
            </button>
            {communities.map((community) => (
              <button
                key={community.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    communityId: community.id,
                  }))
                }
                className={`py-3 px-6 border-2 transition-colors text-left ${
                  formData.communityId === community.id
                    ? "bg-gray-100 text-gray-900 border-gray-100"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                <div className="font-bold">
                  {community.emoji} {community.name}
                </div>
                <div className="text-xs mt-1 opacity-75">
                  {community.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 基本情報 */}
      <div className="border-4 border-gray-700 bg-gray-900/50 p-6 relative">
        <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-yellow-400 text-sm">
          ▼ STEP 2
        </div>
        <h2 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
          基本情報
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
              ニックネーム <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border-2 border-gray-700 px-4 py-3 text-gray-100 focus:border-gray-500 focus:outline-none"
              placeholder="例: ミッドナイトコーダー"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm text-gray-400 mb-2">
              一言キャッチ
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border-2 border-gray-700 px-4 py-3 text-gray-100 focus:border-gray-500 focus:outline-none"
              placeholder="例: 夜にだけ動き出すエンジニア"
            />
          </div>

          <div>
            <label
              htmlFor="className"
              className="block text-sm text-gray-400 mb-2"
            >
              クラス
            </label>
            <input
              type="text"
              id="className"
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border-2 border-gray-700 px-4 py-3 text-gray-100 focus:border-gray-500 focus:outline-none"
              placeholder="例: 夜型民"
            />
          </div>
        </div>
      </div>

      {/* ステータス */}
      <div className="border-4 border-gray-700 bg-gray-900/50 p-6 relative">
        <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-yellow-400 text-sm">
          ▼ STEP 3
        </div>
        <h2 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
          ステータス（0〜100）
        </h2>

        <div className="space-y-6">
          <StatSlider
            label="行動力"
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
          />
          <StatSlider
            label="創造力"
            name="creativity"
            value={formData.creativity}
            onChange={handleInputChange}
          />
          <StatSlider
            label="社交性"
            name="sociability"
            value={formData.sociability}
            onChange={handleInputChange}
          />
          <StatSlider
            label="好奇心"
            name="curiosity"
            value={formData.curiosity}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* 自己紹介 */}
      <div className="border-4 border-gray-700 bg-gray-900/50 p-6 relative">
        <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-yellow-400 text-sm">
          ▼ STEP 4
        </div>
        <h2 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
          自己紹介
        </h2>

        <div>
          <label
            htmlFor="shortBio"
            className="block text-sm text-gray-400 mb-2"
          >
            あなたについて教えてください（任意）
          </label>
          <textarea
            id="shortBio"
            name="shortBio"
            value={formData.shortBio}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-gray-800 border-2 border-gray-700 px-4 py-3 text-gray-100 focus:border-gray-500 focus:outline-none resize-none"
            placeholder="例: 日が落ちてから本領発揮。静寂の中でコードを書くのが至福の時間。"
          />
        </div>
      </div>

      {/* 送信ボタン - RPG風コマンド */}
      <div className="border-4 border-gray-700 bg-gray-900/80 p-6">
        <div className="text-center mb-4">
          <p className="text-gray-400 text-sm mb-2">準備はいいか？</p>
          <p className="text-xs text-gray-600">
            ここから先は、あなたの新しい世界が始まる...
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-4 px-6 border-2 border-gray-700 hover:bg-gray-800 transition-colors text-gray-300"
            disabled={isSubmitting}
          >
            ▶ 戻る
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed border-4 border-yellow-600"
          >
            {isSubmitting ? "⏳ 作成中..." : `⚡ ${nationName}の民になる`}
          </button>
        </div>
      </div>
    </form>
  );
}

function StatSlider({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-400 mb-3">
        <label htmlFor={name}>{label}</label>
        <span className="text-gray-100 font-bold">{value}</span>
      </div>
      <input
        type="range"
        id={name}
        name={name}
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="w-full h-3 bg-gray-800 border-2 border-gray-700 appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
          [&::-webkit-slider-thumb]:bg-gray-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-700
          [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-gray-400
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-700 [&::-moz-range-thumb]:rounded-none"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
}
