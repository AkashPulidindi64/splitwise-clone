import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      message,
      userId,
      expenseId,
    } = await req.json();

    const chat =
      await prisma.chatMessage.create({
        data: {
          message,
          userId,
          expenseId,
        },
      });

    return NextResponse.json(chat);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const expenseId =
      searchParams.get("expenseId");

    const messages =
      await prisma.chatMessage.findMany({
        where: {
          expenseId:
            expenseId || undefined,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}