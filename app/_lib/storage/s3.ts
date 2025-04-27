import { Xid } from "xid-ts";
import mime from "mime-types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "process";

export default async function uploadByS3(file: Blob) {
  const ext = mime.extension(file.type);
  const xid = new Xid();
  const filename = `${xid}.${ext}`;

  const client = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: "usa-east-1",
    credentials: {
      accessKeyId: "sEAFRMgAj568LksFlv41",
      secretAccessKey: "IwBvCDgPWIaBgLUNnTOzLcIxGq80BFWDxsFi47oM",
    },
  });
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: "inter-knot",
        Key: `image/${filename}`,
        Body: await file.bytes(),
        // ACL: "public-read",
      }),
    );
    return `${env.S3_ENDPOINT}/image/${filename}`;
  } catch {
    throw new Error("上传失败");
  }
}
