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
        "静かに灯る民の光が、夜の地平線を染める国。自分のリズムで生きる人のための場所。",
    },
    {
      slug: "silent",
      name: "静寂の国",
      description:
        "風の音が街のBGMになる、穏やかな国。内側の豊かさで生きる人のための場所。",
    },
    {
      slug: "truth",
      name: "本音の国",
      description:
        "言葉が飾りを失い、本心だけが残る国。素直に生きたい人のための場所。",
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
