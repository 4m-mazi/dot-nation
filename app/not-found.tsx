import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🎮</div>
        <div className="text-6xl font-bold text-gray-100 mb-4">404</div>
        <div className="text-xl text-gray-400 mb-8">
          ページが見つかりませんでした
        </div>
        <Link
          href="/"
          className="inline-block py-4 px-8 bg-gray-100 text-gray-900 hover:bg-white transition-colors font-bold border-4 border-gray-700"
        >
          トップに戻る
        </Link>
      </div>
    </div>
  );
}
