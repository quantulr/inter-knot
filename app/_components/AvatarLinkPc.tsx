"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import defaultAvatar from "@/app/_assets/default-avatar.png";

const AvatarLinkPc = ({
  avatar,
  nickname,
}: {
  avatar?: string;
  nickname: string;
}) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <div className={"relative"}>
      <Link
        href={"/profile"}
        onMouseOver={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        className={
          "hidden h-11 cursor-pointer rounded-full border-2 border-gray-500 bg-[#262626] pr-4 shadow-lg select-none active:border-amber-100 md:flex"
        }
      >
        <div className={"avatar h-full p-[1px]"}>
          <div className={"aspect-square h-full rounded-full"}>
            <img src={avatar ?? defaultAvatar.src} alt={""} />
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
      <div
        className={`absolute top-11 left-0 z-10 w-full shadow-2xl transition-opacity ${showPopover ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className={"flex flex-col items-end"}>
          <div
            className={"h-2 w-48"}
            onMouseOver={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
          ></div>
          <ul
            onMouseOver={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
            className={"menu bg-base-200 rounded-box w-48"}
          >
            <li>
              <button
                className={"btn btn-wide btn-ghost"}
                type={"submit"}
                onClick={async () => {
                  await signOut();
                }}
              >
                <CiLogout />
                退出登录
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AvatarLinkPc;
