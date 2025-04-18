import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const Page = () => {
  return (
    <div className={"flex justify-center items-center h-full"}>
      <div
        className={"px-6 pb-6 border-2 w-[480px] border-gray-500 rounded-md"}
      >
        <div className={"ctrl flex"}>
          <button className={"btn"}>X</button>
        </div>
        <form
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
              className={"w-full input input-md"}
              placeholder="用户名"
              name={"username"}
              id={"username"}
            />
          </label>
          <label className="floating-label">
            <span className="label">密码</span>
            <input
              name={"password"}
              id={"password"}
              type="password"
              className={"input w-full input-md"}
              placeholder="用户名"
            />
          </label>
          <button
            className={
              "btn btn-circle w-full btn-neutral border-gray-500 border-2"
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
