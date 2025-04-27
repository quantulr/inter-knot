import { Xid } from "xid-ts";
import mime from "mime-types";
import { put } from "@vercel/blob";

export default async function uploadByVercelBlob(file: Blob) {
  const ext = mime.extension(file.type);
  const xid = new Xid();
  try {
    const { url } = await put(`image/${xid}.${ext}`, file, {
      access: "public",
    });
    return url;
  } catch {
    throw new Error("上传失败");
  }
}
