import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      amount,
      payerId,
      receiverId,
      groupId,
    } = await req.json();

    const payment =
      await prisma.payment.create({
        data: {
          amount: Number(amount),
          payerId,
          receiverId,
          groupId,
        },
      });

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}