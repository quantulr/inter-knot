import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
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

  try {
    const url = await uploadByVercelBlob(file);
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
