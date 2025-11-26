# 🎮 Dot Nation

レトロRPG風の住民票サービス。3つの国から選んで、あなたの"もうひとつの姿"を作ろう。

## 🚀 セットアップ

```bash
# インストール
pnpm install

# 環境変数設定
cp .env.example .env
# .envにDATABASE_URLを設定（Neon Postgres推奨）

# データベース初期化
pnpm exec prisma generate
pnpm exec prisma db push
pnpm exec prisma db seed

# 起動
pnpm dev
```

## 🌙 3つの国

- **夜の国**: 夜型・非同期・マイペースに生きる人のための国
- **静寂の国**: 観察者・聞き役・内省的に生きる人のための国
- **本音の国**: 直球・即レス・ストレートに生きる人のための国

## 🛠️ 技術スタック

Next.js 15 (App Router) / TypeScript / Tailwind CSS 4 / Prisma / PostgreSQL

## 🤖 AI開発について

このプロジェクトはAI(Claude/GitHub Copilot)を活用して開発されています。

---

Made with 🎮 and ☕ by [@4m-mazi](https://github.com/4m-mazi)
