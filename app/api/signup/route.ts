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

  // TODO: hashedPassword
  const hashedPassword = await argon2.hash(signupForm.data.password);

  const res = await prisma.user.create({
    data: {
      ...signupForm.data,
      password: hashedPassword,
    },
  });

  if (res) {
    return Response.json({
      statusCode: 200,
    });
  } else {
    return Response.json({ error: "error" }, { status: 401 });
  }
}
