import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // コミュニティを作成
  const communities = [
    {
      slug: "mmmm",
      name: "MMMM Community",
      description: "心地よい居場所を大切にするコミュニティ",
      emoji: "🌊",
      type: "discord",
    },
  ];

  for (const community of communities) {
    await prisma.community.upsert({
      where: { slug: community.slug },
      update: {},
      create: community,
    });
  }

  // 3つの国を作成
  const nations = [
    {
      slug: "night",
      name: "夜の国",
      description:
        "通知は朝まで見ない。深夜2時が一番集中できる。返信は気が向いた時でいい。夜型・非同期・マイペースに生きる人のための国。",
      iconSlug: "moon",
    },
    {
      slug: "silent",
      name: "静寂の国",
      description:
        "話すより聞く方が好き。ROMってるだけで楽しい。考える時間を大切にする。観察者・聞き役・内省的に生きる人のための国。",
      iconSlug: "dove",
    },
    {
      slug: "truth",
      name: "本音の国",
      description:
        "思ったことはすぐ言う。議論は楽しい。遠回しな表現より直球勝負。直球・即レス・ストレートに生きる人のための国。",
      iconSlug: "flame",
    },
  ];

  for (const nation of nations) {
    await prisma.nation.upsert({
      where: { slug: nation.slug },
      update: {},
      create: nation,
    });
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
