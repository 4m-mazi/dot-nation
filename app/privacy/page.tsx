import Link from "next/link";

export default function PrivacyPage() {
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
            プライバシーポリシー
          </h1>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                1. 収集する情報
              </h2>
              <div className="space-y-3 leading-relaxed">
                <p>本サービスでは、以下の情報を収集します：</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    住民票作成時に入力された情報（ニックネーム、キャッチコピー、クラス、ステータス、自己紹介など）
                  </li>
                  <li>選択した国とコミュニティの情報</li>
                  <li>作成日時</li>
                </ul>
                <p className="mt-4">
                  メールアドレスや個人を特定できる情報の収集は行いません。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                2. アクセス解析について
              </h2>
              <p className="leading-relaxed">
                現在、アクセス解析ツール（Google
                Analytics、PostHogなど）は使用していませんが、将来的にサービス改善のため導入する可能性があります。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                3. 情報の利用目的
              </h2>
              <div className="space-y-3 leading-relaxed">
                <p>収集した情報は、以下の目的で利用します：</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>住民票の表示</li>
                  <li>国別・コミュニティ別の統計情報の表示</li>
                  <li>本サービスの運営および改善</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                4. 情報の公開範囲
              </h2>
              <p className="leading-relaxed">
                作成された住民票は、URLを知っている全ての人が閲覧可能です。公開したくない情報は入力しないでください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                5. 情報の第三者提供
              </h2>
              <p className="leading-relaxed">
                収集した情報を第三者に提供することはありません（法令に基づく場合を除く）。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                6. データの削除
              </h2>
              <p className="leading-relaxed">
                現在、利用者自身によるデータ削除機能は実装されていません。削除を希望する場合は、GitHubのIssueよりご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                7. セキュリティ
              </h2>
              <p className="leading-relaxed">
                収集した情報は、適切なセキュリティ対策を講じて管理します。ただし、完全なセキュリティを保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                8. お問い合わせ
              </h2>
              <p className="leading-relaxed">
                本ポリシーに関するお問い合わせは、
                <a
                  href="https://github.com/4m-mazi/dot-nation/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 hover:text-white underline ml-1"
                >
                  GitHubのIssue
                </a>
                よりお願いします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                9. ポリシーの変更
              </h2>
              <p className="leading-relaxed">
                本ポリシーは予告なく変更されることがあります。変更後のポリシーは、本ページに掲載した時点で効力を生じます。
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
