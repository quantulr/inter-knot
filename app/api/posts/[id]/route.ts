import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    include: {
      author: {
        omit: {
          id: true,
          // password: true,
          emailVerified: true,
          email: true,
          // createAt: true,
        },
      },
    },
    where: { id: id },
  });
  if (!post) {
    return NextResponse.json(
      {
        error: "not found",
      },
      {
        status: 404,
      },
    );
  }

  await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      views: post.views + 1,
    },
  });

  return NextResponse.json(post);
}
