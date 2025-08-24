import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/app/_lib/prisma";
import argon2 from "@node-rs/argon2";

const signupSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(12),
  email: z.string().email(),
  nickname: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const signupJson = await req.json();
  const signupForm = signupSchema.safeParse(signupJson);
  if (!signupForm.success) {
    return Response.json(
      {
        error: signupForm.error,
      },
      {
        status: 400,
      },
    );
  }

  const hashedPassword = await argon2.hash(signupForm.data.password);
  let res;
  try {
    res = await prisma.users.create({
      data: {
        ...signupForm.data,
        password: hashedPassword,
      },
    });
  } catch {
    const userSearchByUsername = await prisma.users.findUnique({
      where: {
        username: signupForm.data.username,
      },
    });
    if (userSearchByUsername) {
      return Response.json(
        {
          error: "用户名已存在",
        },
        {
          status: 400,
        },
      );
    }
    const userSearchByEmail = await prisma.users.findUnique({
      where: {
        email: signupForm.data.email,
      },
    });
    if (userSearchByEmail) {
      return Response.json(
        {
          error: "邮箱已经被使用",
        },
        {
          status: 400,
        },
      );
    }
  }

  if (res) {
    return Response.json({
      statusCode: 200,
    });
  } else {
    return Response.json({ error: "未知错误" }, { status: 400 });
  }
}
