"use client";
import bgimg from "@/app/_assets/signin_bg.jpg";
import Modal from "@/app/_components/Modal";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import request from "@/app/_lib/request";

const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(1, "用户名不能为空")
      .min(3, "不能少于3个字符")
      .max(20, "不能多于20个字符"),
    password: z.string().min(1, "密码不能为空").min(12, "不能少于12个字符"),
    email: z.string().email(),
    nickname: z.string(),
    retypePassword: z.string(),
  })
  .superRefine(({ password, retypePassword }, ctx) => {
    if (password != retypePassword) {
      ctx.addIssue({
        code: "custom",
        path: ["retypePassword"],
        message: "密码不匹配",
      });
    }
  });

type SignupInput = z.infer<typeof signupFormSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      nickname: "",
    },
  });
  return (
    <>
      <Toaster />
      <div
        className={
          "flex h-[100dvh] items-center justify-center bg-cover bg-center md:h-screen"
        }
        style={{
          backgroundImage: `url(${bgimg.src})`,
        }}
      >
        <Modal
          showOverlay={false}
          title={<h3 className="text-3xl font-extrabold text-white">注册</h3>}
        >
          <div className={"w-[90dvw] p-8 md:w-96"}>
            <form
              onSubmit={handleSubmit((data) => {
                request
                  .post("/signup", {
                    username: data.username,
                    password: data.password,
                    nickname: data.nickname,
                    email: data.email,
                  })
                  .then(() => {
                    reset();
                    toast.success("账号注册成功");
                  })
                  .catch((e) => {
                    toast.error(e?.response?.data?.error ?? "注册失败");
                  });
              })}
            >
              <label className="floating-label">
                <span className="label">用户名</span>
                <input
                  type="text"
                  className={"input input-md w-full"}
                  placeholder="用户名"
                  id={"username"}
                  {...register("username")}
                />
              </label>
              <div className={"mt-0.5 h-2 text-[#ba240f]"}>
                {errors.username?.message}
              </div>
              <label className="floating-label mt-6">
                <span className="label">昵称</span>
                <input
                  type="text"
                  className={"input input-md w-full"}
                  placeholder="昵称"
                  id={"nickname"}
                  {...register("nickname")}
                />
              </label>
              <div className={"mt-0.5 h-2 text-[#ba240f]"}>
                {errors.nickname?.message}
              </div>
              <label className="floating-label mt-6">
                <span className="label">邮箱</span>
                <input
                  type="text"
                  className={"input input-md w-full"}
                  placeholder="邮箱"
                  id={"email"}
                  {...register("email")}
                />
              </label>
              <div className={"mt-0.5 h-2 text-[#ba240f]"}>
                {errors.email?.message}
              </div>
              <label className="floating-label mt-6">
                <span className="label">密码</span>
                <input
                  id={"password"}
                  type="password"
                  className={"input input-md w-full"}
                  placeholder="密码"
                  {...register("password")}
                />
              </label>
              <div className={"mt-0.5 h-2 text-[#ba240f]"}>
                {errors.password?.message}
              </div>
              <label className="floating-label mt-6">
                <span className="label">确认密码</span>
                <input
                  id={"password"}
                  type="password"
                  className={"input input-md w-full"}
                  placeholder="确认密码"
                  {...register("retypePassword")}
                />
              </label>
              <div className={"mt-0.5 h-2 text-[#ba240f]"}>
                {errors.retypePassword?.message}
              </div>
              <button
                className={
                  "btn btn-circle btn-neutral mt-6 w-full border-2 border-gray-500"
                }
                type={"submit"}
              >
                注册
              </button>
            </form>
            <div className={"mt-3 flex justify-end px-1"}>
              <Link href={"/signin"} className={"text-sm text-[#00c3ff]"}>
                前往登录
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
