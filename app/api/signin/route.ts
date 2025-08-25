import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const form = formSchema.safeParse(await req.json());
  if (!form.success) {
    return NextResponse.json(
      {
        error: form.error,
      },
      {
        status: 400,
      },
    );
  }
  const formObj = form.data;

  const response = await auth.api.signInUsername({
    body: {
      username: formObj.username,
      password: formObj.password,
    },
    asResponse: true,
  });
  return response;
}
