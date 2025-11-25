import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const citizen = await prisma.citizen.findUnique({
      where: { id },
      include: {
        nation: true,
        community: true,
      },
    });

    if (!citizen) {
      return NextResponse.json({ error: "Citizen not found" }, { status: 404 });
    }

    return NextResponse.json(citizen);
  } catch (error) {
    console.error("Failed to fetch citizen:", error);
    return NextResponse.json(
      { error: "Failed to fetch citizen" },
      { status: 500 },
    );
  }
}
