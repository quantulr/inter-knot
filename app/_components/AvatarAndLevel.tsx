import { cookies } from "next/headers";
import { getBaseUrlInRSC } from "../_lib/utils";
import { auth } from "@/auth";
import Link from "next/link";

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
          login
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
        <div className={"avatar h-[10vw] p-[1px]"}>
          <div className={"aspect-square rounded-full"}>
            <img src={avatar} className="h-[20px] w-[20px]" alt={""} />
          </div>
        </div>
      </Link>
      {/* pc页面显示头像、等级、昵称 */}
      <Link
        href={"/profile"}
        className={
          "hidden h-11 cursor-pointer rounded-full border-2 border-gray-500 bg-[#262626] pr-4 shadow-lg select-none active:border-amber-100 md:flex"
        }
      >
        <div className={"avatar h-full p-[1px]"}>
          <div className={"aspect-square h-full rounded-full"}>
            <img src={avatar} alt={""} />
          </div>
        </div>
        <div className={"ml-2 flex flex-col justify-center"}>
          <p className={"username leading-none text-white"}>{nickname}</p>
          <progress
            className={"progress progress-secondary mt-2 w-40"}
            value={70}
            max={100}
          />
        </div>
        <div
          className={
            "level ml-2 flex flex-col items-center justify-center text-white"
          }
        >
          <p className={"text-2xl leading-none font-bold"}>56</p>
          <p className={"mt-[1px] text-[8px] leading-none"}>LEVEL</p>
        </div>
      </Link>
    </>
  );
};

export default AvatarAndLevel;
