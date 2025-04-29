import pcPageBg from "@/app/_assets/pc-page-bg.png";
import { getBaseUrlInRSC } from "../_lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return redirect("/signin");
  }
  const cookie = await cookies();
  const baseUrl = await getBaseUrlInRSC();
  const profileResp = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      cookie: cookie.toString(),
    },
  });
  const profile: ProfileResponse = await profileResp.json();

  return (
    <div
      className="min-h-[100dvh] bg-cover bg-top md:min-h-[100vh]"
      style={{
        backgroundImage: `url(${pcPageBg.src})`,
      }}
    >
      <Link href={"/profile/avatar/update"} className="avatar">
        <div className="w-16 rounded-full">
          <img src={profile.avatar} />
        </div>
      </Link>
    </div>
  );
}
