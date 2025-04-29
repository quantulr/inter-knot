import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/_lib/prisma";
import { auth } from "@/auth";

const postListParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});

export async function GET(req: NextRequest) {
  const queryObj: {
    page?: number;
    limit?: number;
  } = {};
  queryObj.page = Number(req.nextUrl.searchParams.get("page")) ?? 1;
  queryObj.limit = Number(req.nextUrl.searchParams.get("limit")) ?? 10;
  const query = postListParamsSchema.safeParse(queryObj);

  if (!query.success) {
    return Response.json(
      {
        error: query.error,
      },
      {
        status: 400,
      },
    );
  }
  const total = await prisma.post.count();
  const posts = await prisma.post.findMany({
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
    skip: (query.data.page - 1) * query.data.limit,
    // skip:(1-1) * 2,
    take: query.data.limit,
    // take: 2,
  });
  // return NextResponse.json(query);

  return Response.json({
    hasNext: total > query.data.page * query.data.limit,
    // hasNext: false,
    data: posts,
  });
}

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  images: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: "Not authorized" },
      {
        status: 401,
      },
    );
  }

  const body = await req.json();
  const post = postSchema.safeParse(body);
  if (!post.success) {
    return Response.json(
      {
        error: post.error,
      },
      {
        status: 400,
      },
    );
  }

  const result = await prisma.post.create({
    data: {
      ...post.data,
      authorId: session.user.id,
    },
  });
  return Response.json(result);
}
