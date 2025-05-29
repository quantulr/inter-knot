import OSS from "ali-oss";
import { Xid } from "xid-ts";
import mime from "mime-types";

export async function uploadByAliyunOSS(file: Blob) {
  const ext = mime.extension(file.type);
  const xid = new Xid();

  const client = new OSS({
    accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
    bucket: "inter-knot",
    region: "oss-cn-nanjing",
    endpoint: "https://oss-cn-nanjing.aliyuncs.com",
  });
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await client.put(`${xid}.${ext}`, buffer);
  return result;
}
