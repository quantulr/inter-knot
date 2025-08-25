import { auth } from "@/auth";
import bgimg from "@/app/_assets/signin_bg.jpg";
import Modal from "@/app/_components/Modal";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return (
    <div
      className={
        "flex h-[100dvh] items-center justify-center bg-cover bg-center md:h-screen"
      }
      style={{
        backgroundImage: `url(${bgimg.src})`,
      }}
    >
      <Modal
        prevPath={"/"}
        showOverlay={false}
        title={<h3 className="text-2xl font-extrabold text-white">登录</h3>}
      >
        <div className="w-96 p-8">
          <form
            className={""}
            action={async (formData) => {
              "use server";

              const formJson: {
                username: string;
                password: string;
              } = { username: "", password: "" };

              /*     formData.forEach(
                (value, key) => (formJson[key] = value),
              );
 */
              formJson.username = formData.get("username")?.toString() ?? "";
              formJson.password = formData.get("password")?.toString() ?? "";
              try {
                await auth.api.signInUsername({
                  body: { ...formJson },
                });
                redirect("/");
              } catch (error) {
                if (error) {
                  // TODO: handle error
                  // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                }
                throw error;
              }
            }}
          >
            <label className="floating-label">
              <span className="label">用户名</span>
              <input
                type="text"
                className={"input input-md w-full"}
                placeholder="用户名"
                name={"username"}
                id={"username"}
              />
            </label>
            <label className="floating-label mt-6">
              <span className="label">密码</span>
              <input
                name={"password"}
                id={"password"}
                type="password"
                className={"input input-md w-full"}
                placeholder="密码"
              />
            </label>
            <button
              className={
                "btn btn-circle btn-neutral mt-6 w-full border-2 border-gray-500"
              }
              type={"submit"}
            >
              登录
            </button>
          </form>
          <div className={"mt-3 flex justify-end px-1"}>
            <Link href={"/signup"} className={"text-sm text-[#00c3ff]"}>
              注册账号
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
