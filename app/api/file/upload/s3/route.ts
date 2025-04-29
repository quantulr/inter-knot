import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "process";
import mime from "mime-types";
import { Xid } from "xid-ts";

export async function POST(req: NextRequest) {
  const file = await req.blob();

  const client = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: "usa-east-1",
    credentials: {
      accessKeyId: "sEAFRMgAj568LksFlv41",
      secretAccessKey: "IwBvCDgPWIaBgLUNnTOzLcIxGq80BFWDxsFi47oM",
    },
  });
  const ext = mime.extension(file.type);
  const xid = new Xid();
  const filename = `${xid}.${ext}`;

  try {
    const resp = await client.send(
      new PutObjectCommand({
        Bucket: "inter-knot",
        Key: `images/${filename}`,
        Body: await file.bytes(),
      }),
    );
    return NextResponse.json({
      data: resp,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
