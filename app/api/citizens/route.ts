import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nationId,
      communityId,
      name,
      title,
      className,
      activity,
      creativity,
      sociability,
      curiosity,
      shortBio,
    } = body;

    // 住民を作成
    const citizen = await prisma.citizen.create({
      data: {
        nationId,
        communityId: communityId || null,
        name,
        title: title || null,
        className: className || null,
        activity,
        creativity,
        sociability,
        curiosity,
        shortBio: shortBio || null,
      },
    });

    return NextResponse.json(citizen, { status: 201 });
  } catch (error) {
    console.error("Failed to create citizen:", error);
    return NextResponse.json(
      { error: "Failed to create citizen" },
      { status: 500 },
    );
  }
}
