import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";

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
          emailVerified: true,
          id: true,
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
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

/* 删除帖子 */
const deleteSchema = z.object({
  posts: z.array(z.string()),
});

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Not authorized" },
      {
        status: 401,
      },
    );
  }
  const body = await req.json();
  const postsResp = deleteSchema.safeParse(body);
  if (!postsResp.success) {
    return Response.json(
      {
        error: postsResp.error,
      },
      {
        status: 400,
      },
    );
  }
  const posts = postsResp.data.posts;
  const willDeletePosts = await prisma.post.findMany({
    where: {
      id: {
        in: posts,
      },
    },
  });
  for (const post of willDeletePosts) {
    if (post.authorId !== session.user.id) {
      return Response.json(
        { error: "没有删除权限" },
        {
          status: 400,
        },
      );
    }
  }
  const { count } = await prisma.post.deleteMany({
    where: {
      id: {
        in: posts,
      },
    },
  });
  return NextResponse.json({
    message: `成功删除了 ${count} 个帖子`,
  });
}
