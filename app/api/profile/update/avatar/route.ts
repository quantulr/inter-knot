import { NextRequest, NextResponse } from "next/server";
import { Xid } from "xid-ts";
import { put } from "@vercel/blob";
import mime from "mime-types";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      {
        code: "UNAUTHORIZED",
      },
      {
        status: 401,
        statusText: "UNAUTHORIZED",
      },
    );
  }

  const file = await req.blob();
  const mimetype = file.type;
  const ext = mime.extension(mimetype);
  if (!ext) {
    return NextResponse.json(
      { message: "不支持的文件类型" },
      {
        status: 500,
      },
    );
  }

  const xid = new Xid();
  // let avatarUrl: string;

  const { url } = await put(`avatar/${xid}.${ext}`, file, {
    access: "public",
  });
  const avatarUrl = url;

  const response = await auth.api.updateUser({
    headers: await headers(),
    body: {
      image: avatarUrl,
    },
    asResponse: true,
  });
  return response;
}
