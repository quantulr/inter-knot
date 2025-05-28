import Modal from "@/app/_components/Modal";
import { cookies } from "next/headers";
import { getBaseUrlInRSC } from "@/app/_lib/utils";

export default async function Page() {
  const cookie = await cookies();
  const baseUrl = await getBaseUrlInRSC();
  const profile: ProfileResponse = await (
    await fetch(`${baseUrl}/api/profile`, {
      headers: {
        cookie: cookie.toString(),
      },
    })
  ).json();
  return (
    <Modal
      prevPath={"/profile"}
      title={<h3 className={"text-xl font-extrabold text-white"}>编辑头像</h3>}
    >
      <div
        className={"h-[60dvh] w-[95dvw] text-white md:h-[500px] md:w-[600px]"}
      >
        <div className={"avatar"}>
          <div className={"w-24 rounded-full"}>
            <img src={profile.avatar}  alt={""}/>
          </div>
        </div>
      </div>
    </Modal>
  );
}
