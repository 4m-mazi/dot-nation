// コミュニティの型定義
export type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  type: "discord" | "other";
  createdAt: Date;
};

// 国の型定義
export type Nation = {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconSlug?: "moon" | "dove" | "flame"; // SVGアイコン用
  createdAt: Date;
};

// 住民の型定義
export type Citizen = {
  id: string;
  nationId: string;
  communityId?: string; // コミュニティに所属（任意）
  name: string;
  title?: string;
  className?: string;
  activity: number; // 0-100
  creativity: number; // 0-100
  sociability: number; // 0-100
  curiosity: number; // 0-100
  shortBio?: string;
  createdAt: Date;
};

// コミュニティのモックデータ
export const mockCommunities: Community[] = [
  {
    id: "comm1",
    slug: "mmmm",
    name: "MMMM Community",
    description: "心地よい居場所を大切にするコミュニティ",
    emoji: "🌊",
    type: "discord",
    createdAt: new Date(),
  },
];

// 国のモックデータ
export const mockNations: Nation[] = [
  {
    id: "1",
    slug: "night",
    name: "夜の国",
    description:
      "通知は朝まで見ない。深夜2時が一番集中できる。返信は気が向いた時でいい。夜型・非同期・マイペースに生きる人のための国。",
    iconSlug: "moon",
    createdAt: new Date(),
  },
  {
    id: "3",
    slug: "silent",
    name: "静寂の国",
    description:
      "話すより聞く方が好き。ROMってるだけで楽しい。考える時間を大切にする。観察者・聞き役・内省的に生きる人のための国。",
    iconSlug: "dove",
    createdAt: new Date(),
  },
  {
    id: "2",
    slug: "truth",
    name: "本音の国",
    description:
      "思ったことはすぐ言う。議論は楽しい。遠回しな表現より直球勝負。直球・即レス・ストレートに生きる人のための国。",
    iconSlug: "flame",
    createdAt: new Date(),
  },
];

// 住民のモックデータ
export const mockCitizens: Citizen[] = [
  {
    id: "c1",
    nationId: "1",
    communityId: "comm1", // MMMM Community
    name: "ミッドナイトコーダー",
    title: "夜にだけ動き出すエンジニア",
    className: "夜型民",
    activity: 85,
    creativity: 90,
    sociability: 40,
    curiosity: 75,
    shortBio: "日が落ちてから本領発揮。静寂の中でコードを書くのが至福の時間。",
    createdAt: new Date(),
  },
  {
    id: "c2",
    nationId: "2",
    communityId: "comm1",
    name: "ストレートトーカー",
    title: "思ったことは全部言う",
    className: "本音族",
    activity: 70,
    creativity: 65,
    sociability: 95,
    curiosity: 80,
    shortBio: "遠回しな表現は苦手。ストレートに伝えることを大切にしている。",
    createdAt: new Date(),
  },
  {
    id: "c3",
    nationId: "3",
    communityId: undefined, // グローバル住民
    name: "サイレントクラフター",
    title: "静かに手を動かす職人",
    className: "物思い族",
    activity: 60,
    creativity: 85,
    sociability: 30,
    curiosity: 90,
    shortBio: "一人で黙々と作業するのが好き。深く考えることに時間を使う。",
    createdAt: new Date(),
  },
  // 追加でコミュニティ内の住民を増やす
  {
    id: "c4",
    nationId: "1",
    communityId: "comm1",
    name: "ナイトオウル",
    title: "夜の静寂に生きる",
    className: "夜型民",
    activity: 75,
    creativity: 80,
    sociability: 35,
    curiosity: 85,
    createdAt: new Date(),
  },
  {
    id: "c5",
    nationId: "1",
    communityId: "comm1",
    name: "ダークモードラバー",
    title: "暗闇こそ至高",
    className: "夜型民",
    activity: 90,
    creativity: 70,
    sociability: 45,
    curiosity: 60,
    createdAt: new Date(),
  },
  {
    id: "c6",
    nationId: "3",
    name: "グローバル職人",
    title: "世界中どこでも一人で",
    className: "物思い族",
    activity: 55,
    creativity: 95,
    sociability: 25,
    curiosity: 88,
    createdAt: new Date(),
  },
];

// 国ごとの住民数を取得（全体 or コミュニティ別）
export async function getCitizenCountByNation(
  nationId: string,
  communityId?: string,
): Promise<number> {
  const { prisma } = await import("./prisma");

  return await prisma.citizen.count({
    where: {
      nationId,
      ...(communityId !== undefined && { communityId }),
    },
  });
}

// 国ごとの住民を取得（全体 or コミュニティ別）
export async function getCitizensByNation(
  nationSlug: string,
  communityId?: string,
): Promise<Citizen[]> {
  const { prisma } = await import("./prisma");

  const nation = await prisma.nation.findUnique({
    where: { slug: nationSlug },
  });

  if (!nation) return [];

  const citizens = await prisma.citizen.findMany({
    where: {
      nationId: nation.id,
      ...(communityId !== undefined && { communityId }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return citizens.map((c) => ({
    ...c,
    communityId: c.communityId ?? undefined,
    title: c.title ?? undefined,
    className: c.className ?? undefined,
    shortBio: c.shortBio ?? undefined,
    createdAt: new Date(c.createdAt),
  }));
}

// 国ごとの平均ステータスを計算（全体 or コミュニティ別）
export async function getAverageStatsByNation(
  nationSlug: string,
  communityId?: string,
) {
  const citizens = await getCitizensByNation(nationSlug, communityId);
  if (citizens.length === 0) {
    return {
      activity: 0,
      creativity: 0,
      sociability: 0,
      curiosity: 0,
    };
  }

  const total = citizens.reduce(
    (acc, citizen) => ({
      activity: acc.activity + citizen.activity,
      creativity: acc.creativity + citizen.creativity,
      sociability: acc.sociability + citizen.sociability,
      curiosity: acc.curiosity + citizen.curiosity,
    }),
    { activity: 0, creativity: 0, sociability: 0, curiosity: 0 },
  );

  return {
    activity: Math.round(total.activity / citizens.length),
    creativity: Math.round(total.creativity / citizens.length),
    sociability: Math.round(total.sociability / citizens.length),
    curiosity: Math.round(total.curiosity / citizens.length),
  };
}

// 全住民数を取得（グローバル統計用）
export async function getTotalCitizens(communityId?: string): Promise<number> {
  const { prisma } = await import("./prisma");

  return await prisma.citizen.count({
    where: {
      ...(communityId !== undefined && { communityId }),
    },
  });
}

// 国別の人口分布を取得（パーセンテージ）
export async function getNationDistribution(communityId?: string) {
  const { prisma } = await import("./prisma");
  const total = await getTotalCitizens(communityId);
  if (total === 0) return [];

  const nations = await prisma.nation.findMany();

  const distribution = await Promise.all(
    nations.map(async (nation) => {
      const count = await getCitizenCountByNation(nation.id, communityId);
      return {
        nation: {
          ...nation,
          createdAt: new Date(nation.createdAt),
          iconSlug:
            nation.slug === "night"
              ? ("moon" as const)
              : nation.slug === "silent"
                ? ("dove" as const)
                : ("flame" as const),
        },
        count,
        percentage: Math.round((count / total) * 100),
      };
    }),
  );

  return distribution.sort((a, b) => b.count - a.count);
}

// グローバル統計: 全体の平均ステータス
export async function getGlobalAverageStats(communityId?: string) {
  const { prisma } = await import("./prisma");

  const citizens = await prisma.citizen.findMany({
    where: {
      ...(communityId !== undefined && { communityId }),
    },
  });

  if (citizens.length === 0) {
    return { activity: 0, creativity: 0, sociability: 0, curiosity: 0 };
  }

  const total = citizens.reduce(
    (acc, citizen) => ({
      activity: acc.activity + citizen.activity,
      creativity: acc.creativity + citizen.creativity,
      sociability: acc.sociability + citizen.sociability,
      curiosity: acc.curiosity + citizen.curiosity,
    }),
    { activity: 0, creativity: 0, sociability: 0, curiosity: 0 },
  );

  return {
    activity: Math.round(total.activity / citizens.length),
    creativity: Math.round(total.creativity / citizens.length),
    sociability: Math.round(total.sociability / citizens.length),
    curiosity: Math.round(total.curiosity / citizens.length),
  };
}

// 最新の住民を取得
export async function getRecentCitizens(limit = 5, communityId?: string) {
  const { prisma } = await import("./prisma");

  const citizens = await prisma.citizen.findMany({
    where: {
      ...(communityId !== undefined && { communityId }),
    },
    include: {
      nation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return citizens.map((citizen) => ({
    ...citizen,
    createdAt: new Date(citizen.createdAt),
    nation: {
      ...citizen.nation,
      createdAt: new Date(citizen.nation.createdAt),
      iconSlug:
        citizen.nation.slug === "night"
          ? ("moon" as const)
          : citizen.nation.slug === "silent"
            ? ("dove" as const)
            : ("flame" as const),
    },
  }));
}

// 最も人気のあるクラス名を取得
export async function getPopularClasses(limit = 5, communityId?: string) {
  const { prisma } = await import("./prisma");

  const citizens = await prisma.citizen.findMany({
    where: {
      ...(communityId !== undefined && { communityId }),
      className: {
        not: null,
      },
    },
    select: {
      className: true,
    },
  });

  const classCount = citizens.reduce(
    (acc, citizen) => {
      if (citizen.className) {
        acc[citizen.className] = (acc[citizen.className] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(classCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([className, count]) => ({ className, count }));
}

// 極端なステータスの住民を取得
export async function getExtremeCitizens(communityId?: string) {
  const { prisma } = await import("./prisma");

  const citizens = await prisma.citizen.findMany({
    where: {
      ...(communityId !== undefined && { communityId }),
    },
    include: {
      nation: true,
    },
  });

  if (citizens.length === 0) return null;

  const mostActive = citizens.reduce((max, c) =>
    c.activity > max.activity ? c : max,
  );
  const mostCreative = citizens.reduce((max, c) =>
    c.creativity > max.creativity ? c : max,
  );
  const mostSocial = citizens.reduce((max, c) =>
    c.sociability > max.sociability ? c : max,
  );
  const mostCurious = citizens.reduce((max, c) =>
    c.curiosity > max.curiosity ? c : max,
  );

  const mapCitizen = (citizen: typeof mostActive) => ({
    ...citizen,
    createdAt: new Date(citizen.createdAt),
    nation: {
      ...citizen.nation,
      createdAt: new Date(citizen.nation.createdAt),
      iconSlug:
        citizen.nation.slug === "night"
          ? ("moon" as const)
          : citizen.nation.slug === "silent"
            ? ("dove" as const)
            : ("flame" as const),
    },
  });

  return {
    mostActive: mapCitizen(mostActive),
    mostCreative: mapCitizen(mostCreative),
    mostSocial: mapCitizen(mostSocial),
    mostCurious: mapCitizen(mostCurious),
  };
}
