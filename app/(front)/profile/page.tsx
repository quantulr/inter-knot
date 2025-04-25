import { getBaseUrlInRSC } from "@/app/_lib/utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return redirect("/signin");
  }
  const baseUrl = await getBaseUrlInRSC();
  const profileResponse = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  const { nickname }: ProfileResponse = await profileResponse.json();
  return <div className={"min-h-[calc(100dvh_-_72px)]"}>{nickname}</div>;
}
