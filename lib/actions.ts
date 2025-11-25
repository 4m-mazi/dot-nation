"use server";

import { prisma } from "./prisma";

export async function createCitizen(data: {
  nationId: string;
  communityId?: string;
  name: string;
  title?: string;
  className?: string;
  activity: number;
  creativity: number;
  sociability: number;
  curiosity: number;
  shortBio?: string;
}) {
  // 入力バリデーション
  if (!data.name || data.name.length > 50) {
    throw new Error("Invalid name");
  }

  if (data.title && data.title.length > 100) {
    throw new Error("Title too long");
  }

  if (data.className && data.className.length > 50) {
    throw new Error("Class name too long");
  }

  if (data.shortBio && data.shortBio.length > 500) {
    throw new Error("Bio too long");
  }

  // ステータス値チェック
  const stats = [
    data.activity,
    data.creativity,
    data.sociability,
    data.curiosity,
  ];
  if (stats.some((s) => s < 0 || s > 100)) {
    throw new Error("Invalid status values");
  }

  const citizen = await prisma.citizen.create({
    data: {
      nationId: data.nationId,
      communityId: data.communityId ?? null,
      name: data.name,
      title: data.title ?? null,
      className: data.className ?? null,
      activity: data.activity,
      creativity: data.creativity,
      sociability: data.sociability,
      curiosity: data.curiosity,
      shortBio: data.shortBio ?? null,
    },
  });

  return citizen;
}

export async function getCommunities() {
  const communities = await prisma.community.findMany();
  return communities;
}
