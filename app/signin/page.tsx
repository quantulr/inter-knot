import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bgimg from "@/app/_assets/signin_bg.png";

const Page = () => {
  console.log(bgimg);
  return (
    <div
      className={"flex h-screen items-center justify-center bg-cover bg-center"}
      style={{
        backgroundImage: `url(${bgimg.src})`,
      }}
    >
      <div
        className={
          "w-[480px] rounded-md border-2 border-gray-500 bg-black px-6 pb-6"
        }
      >
        <div className={"ctrl flex"}>
          <button className={"btn"}>X</button>
        </div>
        <form
          className={"mt-4"}
          action={async (formData) => {
            "use server";
            try {
              console.log(formData);
              await signIn("credentials", formData);
              // redirect("/posts")
              // return redirect("/")
            } catch (error) {
              if (error instanceof AuthError) {
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
          <label className="floating-label mt-4">
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
              "btn btn-circle btn-neutral mt-2 w-full border-2 border-gray-500"
            }
            type={"submit"}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
