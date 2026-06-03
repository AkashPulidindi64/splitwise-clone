import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      expenseId,
      groupId,
      amount,
    } = await req.json();

    const members =
      await prisma.groupMember.findMany({
        where: { groupId },
      });

    const share =
      amount / members.length;

    const shares =
      await Promise.all(
        members.map((member) =>
          prisma.expenseShare.create({
            data: {
              expenseId,
              userId: member.userId,
              amountOwed: share,
            },
          })
        )
      );

    return NextResponse.json(
      shares
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}