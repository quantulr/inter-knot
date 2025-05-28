"use client";
import bgimg from "@/app/_assets/signin_bg.jpg";
import Modal from "@/app/_components/Modal";
import { useFormik } from "formik";

export default function Page() {
  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
      retypePassword: "",
    },
    onSubmit(values) {
      console.log(values);
    },
  });
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
        title={<h3 className="text-3xl font-extrabold text-white">注册</h3>}
      >
        <div className={"w-[90dvw] p-8 md:w-96"}>
          <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </label>
            <label className="floating-label mt-6">
              <span className="label">确认密码</span>
              <input
                name={"password"}
                id={"password"}
                type="password"
                className={"input input-md w-full"}
                placeholder="确认密码"
              />
            </label>
            <button
              className={
                "btn btn-circle btn-neutral mt-6 w-full border-2 border-gray-500"
              }
              type={"submit"}
            >
              注册
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
