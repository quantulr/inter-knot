import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import uploadByS3 from "@/app/_lib/storage/s3";
import { env } from "process";
import uploadByVercelBlob from "@/app/_lib/storage/vercel-blob";

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
  // const ext = mime.extension(file.type);
  // const xid = new Xid();
  // const { url } = await put(`image/${xid}.${ext}`, file, {
  //   access: "public",
  // });

  try {
    const uploadProvider = env.STORAGE_PROVIDER;

    const url =
      uploadProvider === "S3"
        ? await uploadByS3(file)
        : await uploadByVercelBlob(file);
    return NextResponse.json({
      status: "success",
      url,
    });
  } catch {
    return NextResponse.json(
      {
        error: "上传失败",
      },
      {
        status: 500,
      },
    );
  }
}
