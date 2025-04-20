import { cookies, headers } from "next/headers";

const AvatarAndLevel = async () => {
  const cookieStorage = await cookies();
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http"; // 处理代理场景
  const host = headersList.get("host");
  const baseUrl = `${protocol}://${host}`;
  const profileResponse = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      Cookie: cookieStorage.toString(),
    },
  });
  const { nickname, avatar }: ProfileResponse = await profileResponse.json();
  return (
    <div
      className={
        "flex h-11 rounded-full border border-gray-500 bg-[#262626] pr-4 shadow-lg"
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
    </div>
  );
};

export default AvatarAndLevel;
