import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const file = await req.blob();
  const { url } = await put("avatar/avatar.jpg", file, {
    access: "public",
  });
  return NextResponse.json({
    status: "success",
    url,
  });
}
