import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      description,
      amount,
      groupId,
      payerId,
    } = await req.json();

    const expense =
      await prisma.expense.create({
        data: {
          description,
          amount: Number(amount),
          splitType: "EQUAL",
          groupId,
          payerId,
        },
      });

    return NextResponse.json(
      expense
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const groupId = searchParams.get("groupId");

    const expenses = await prisma.expense.findMany({
      where: {
        groupId: groupId || undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}