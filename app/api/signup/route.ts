import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";

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
    return NextResponse.json(
      {
        error: signupForm.error,
      },
      {
        status: 400,
      },
    );
  }
  let response: Response;
  try {
    response = await auth.api.signUpEmail({
      body: {
        name: signupForm.data.username,
        email: signupForm.data.email,
        username: signupForm.data.username,
        password: signupForm.data.password,
        displayUsername: signupForm.data.nickname,
      },
      asResponse: true,
    });
  } catch (err) {
    const error = err as {
      body: object;
      statusCode: number;
      status: string;
    };
    response = NextResponse.json(error.body, {
      status: error.statusCode,
      statusText: error.status,
    });
  }

  return response;
}
