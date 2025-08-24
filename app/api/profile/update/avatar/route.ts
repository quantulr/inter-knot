import { NextRequest, NextResponse } from "next/server";
import { Xid } from "xid-ts";
import { put } from "@vercel/blob";
import mime from "mime-types";
import { auth } from "@/auth";
import prisma from "@/app/_lib/prisma";
import { uploadByAliyunOSS } from "@/app/_lib/storage/aliyun-oss";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Not logged in",
      },
      {
        status: 401,
      },
    );
  }
  const curUser = session.user;

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
  let avatarUrl: string;
  if (process.env.STORAGE_TYPE === "oss") {
    const { url } = await uploadByAliyunOSS(file);
    avatarUrl = url;
  } else {
    const { url } = await put(`avatar/${xid}.${ext}`, file, {
      access: "public",
    });
    avatarUrl = url;
  }

  await prisma.users.update({
    where: {
      id: curUser.id,
    },
    data: {
      avatar: avatarUrl,
    },
  });
  return NextResponse.json({
    message: "成功修改头像",
  });
}
