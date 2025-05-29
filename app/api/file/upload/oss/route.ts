import { uploadByAliyunOSS } from "@/app/_lib/storage/aliyun-oss";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const file = await req.blob();
  const result = await uploadByAliyunOSS(file);
  return NextResponse.json(result);
}
