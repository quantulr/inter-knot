import { getBaseUrlInRSC } from "@/app/_lib/utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import pcPageBg from "@/app/_assets/pc-page-bg.png";

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
  return (
    <div
      className={"flex h-[calc(100dvh_-_72px)] bg-cover bg-top px-12 py-24"}
      style={{ backgroundImage: `url(${pcPageBg.src})` }}
    >
      <div className="flex-[1] rounded-3xl bg-[#323232]">{nickname}</div>
      <div className="ml-12 flex-[4] rounded-3xl bg-[#323232]"></div>
    </div>
  );
}
