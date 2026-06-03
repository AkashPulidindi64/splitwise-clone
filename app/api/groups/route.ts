import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, creatorId } = await req.json();

    const group = await prisma.group.create({
      data: {
        name,
        creatorId,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}