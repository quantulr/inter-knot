import { cookies } from "next/headers";
import { getBaseUrlInRSC } from "../_lib/utils";
import { auth } from "@/auth";
import Link from "next/link";
import AvatarLinkPc from "@/app/_components/AvatarLinkPc";
import defaultAvatar from "@/app/_assets/default-avatar.png";

const AvatarAndLevel = async () => {
  const session = await auth();
  if (!session) {
    return (
      <div
        className={
          "flex h-11 items-center rounded-full border border-gray-500 bg-[#262626] shadow-lg"
        }
      >
        <Link href={"/signin"} className="btn btn-circle btn-primary">
          <img
            className="h-full w-full rounded-full"
            src={
              "https://0t76yt9xoib4rvp5.public.blob.vercel-storage.com/avatar/avatarDefaultPc-SQF1ZpK9n9hvVGWWjzKC3LvN3ToVym.png"
            }
          />
        </Link>
      </div>
    );
  }
  const cookieStorage = await cookies();

  const baseUrl = await getBaseUrlInRSC();
  const profileResponse = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      Cookie: cookieStorage.toString(),
    },
  });
  const { nickname, avatar }: ProfileResponse = await profileResponse.json();
  return (
    <>
      {/* 手机端仅显示头像 */}
      <Link href={"/profile"} className="flex md:hidden">
        <div className={"avatar p-[1px]"}>
          <div className={"aspect-square h-[10vw] rounded-full"}>
            <img src={avatar ?? defaultAvatar.src} alt={""} />
          </div>
        </div>
      </Link>
      {/* pc页面显示头像、等级、昵称 */}
      <AvatarLinkPc nickname={nickname} avatar={avatar} />
    </>
  );
};

export default AvatarAndLevel;
