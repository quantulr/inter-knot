import { headers } from "next/headers";

export const getBaseUrlInRSC = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http"; // 处理代理场景
  const host = headersList.get("host");
  return `${protocol}://${host}/`;
};
