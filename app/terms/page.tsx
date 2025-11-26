import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← トップに戻る
        </Link>

        <div className="border-4 border-gray-700 bg-gray-900/50 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-8 border-b-2 border-gray-700 pb-4">
            利用規約
          </h1>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                1. サービスについて
              </h2>
              <div className="space-y-3 leading-relaxed">
                <p>
                  Dot
                  Nation（以下「本サービス」）は、レトロRPG風の住民票を作成して楽しむジョークサービスです。本サービスは趣味プロジェクトとして提供されており、継続的な運営や機能追加を保証するものではありません。
                </p>
                <p>
                  本サービスはAI（Claude/GitHub
                  Copilot）を活用して開発されており、予期しないバグや動作不良が発生する可能性があります。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                2. 利用者の責任
              </h2>
              <div className="space-y-3 leading-relaxed">
                <p>
                  本サービスを利用する際は、以下の行為を行わないでください：
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>他者を誹謗中傷する内容の投稿</li>
                  <li>わいせつ、暴力的、差別的な内容の投稿</li>
                  <li>虚偽の情報や誤解を招く内容の投稿</li>
                  <li>スパム行為や過度な連続投稿</li>
                  <li>本サービスの運営を妨害する行為</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                3. コンテンツの削除
              </h2>
              <p className="leading-relaxed">
                運営者は、利用規約に違反する、または不適切と判断したコンテンツを予告なく削除する権利を有します。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                4. サービスの変更・終了
              </h2>
              <p className="leading-relaxed">
                運営者は、予告なく本サービスの内容を変更、または終了する権利を有します。サービス終了時のデータ保証は行いません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                5. 免責事項
              </h2>
              <p className="leading-relaxed">
                本サービスは「現状のまま」提供されます。運営者は、本サービスの利用によって生じたいかなる損害についても責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                6. オープンソース
              </h2>
              <p className="leading-relaxed">
                本サービスのソースコードはオープンソースとして公開されています。詳細は
                <a
                  href="https://github.com/4m-mazi/dot-nation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 hover:text-white underline ml-1"
                >
                  GitHubリポジトリ
                </a>
                をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                7. 規約の変更
              </h2>
              <p className="leading-relaxed">
                運営者は、本規約を予告なく変更することがあります。変更後の規約は、本ページに掲載した時点で効力を生じます。
              </p>
            </section>

            <div className="text-sm text-gray-500 pt-8 border-t-2 border-gray-700">
              最終更新日: 2025年11月26日
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
