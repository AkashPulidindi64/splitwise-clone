import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { groupId, userId } = await req.json();

    const member = await prisma.groupMember.create({
      data: {
        groupId,
        userId,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const groupId = searchParams.get("groupId");

    const members = await prisma.groupMember.findMany({
      where: {
        groupId: groupId || undefined,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}