import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // console.log(req);

  const { id } = await params;
  const post = await prisma.post.findUnique({
    include: {
      author: {
        omit: {
          id: true,
          password: true,
          email: true,
          createAt: true,
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
  return NextResponse.json(post);
}
