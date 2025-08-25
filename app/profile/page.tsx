import pcPageBg from "@/app/_assets/pc-page-bg.png";
import { getBaseUrlInRSC } from "../_lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
      className={`min-h-[100dvh] bg-cover bg-top p-8 md:min-h-[100vh]`}
      style={{
        backgroundImage: `url(${pcPageBg.src})`,
      }}
    >
      <div className={"flex"}>
        <Link href={""} className={`aspect-[136/94] w-16`} style={{}}>
          {/*<img className={"w-16 bg-white"} src={backPng.src} alt={""} />*/}
        </Link>
      </div>
      <div className={"flex"}>
        <Link href={"/profile/avatar/update"}>
          <div
            className={
              "rounded-full border-3 border-gray-300 hover:border-amber-200"
            }
          >
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={profile.avatar} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
