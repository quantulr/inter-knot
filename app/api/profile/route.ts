import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        error: "error",
      },
      {
        status: 404,
      },
    );
  }
  const { username, avatar, email, nickname } = user;
  return NextResponse.json({
    username,
    nickname,
    avatar,
    email,
  });
}
