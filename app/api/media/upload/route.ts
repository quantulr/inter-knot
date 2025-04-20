import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { Xid } from "xid-ts";
import mime from "mime-types";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      {
        error: "Not authorized",
      },
      {
        status: 401,
      },
    );
  }
  const file = await req.blob();
  const ext = mime.extension(file.type);
  const xid = new Xid();
  const { url } = await put(`image/${xid}.${ext}`, file, {
    access: "public",
  });
  return NextResponse.json({
    status: "success",
    url,
  });
}
