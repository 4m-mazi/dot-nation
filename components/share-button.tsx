"use client";

import { useState } from "react";

type ShareButtonProps = {
  url: string;
  title: string;
  text: string;
};

export function ShareButton({ url, title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Web Share API が利用可能な場合
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        // ユーザーがキャンセルした場合などはエラーを無視
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    } else {
      // フォールバック: URLをクリップボードにコピー
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='flex gap-3 items-center'>
      <button
        type='button'
        onClick={handleShare}
        className='px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 border-2 border-gray-600 transition-colors font-bold'
      >
        {copied ? "✓ コピーしました" : "🔗 シェア"}
      </button>

      <button
        type='button'
        onClick={shareToTwitter}
        className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-800 transition-colors font-bold'
      >
        𝕏 でシェア
      </button>
    </div>
  );
}
