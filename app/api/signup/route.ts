import { PrismaClient } from "@/prisma/prismaClient";
import { NextRequest } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(12),
  email: z.string().email(),
});

const prisma = new PrismaClient();

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
  const res = await prisma.user.create({
    data: signupForm.data,
  });

  if (res) {
    return Response.json({
      statusCode: 200,
    });
  } else {
    return Response.json({ error: "error" }, { status: 401 });
  }
}
