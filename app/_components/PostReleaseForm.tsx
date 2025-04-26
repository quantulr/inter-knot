"use client";

import ImageUpload from "./PostImageUpload";
import request from "../_lib/request";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
const postFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "标题过短")
    .max(72, "标题过长")
    .required("标题不能为空"),
  content: Yup.string()
    .min(1, "内容过短")
    .max(5000, "内容过长")
    .required("内容不能为空"),
  images: Yup.array()
    .of(Yup.string())
    .min(1, "至少上传一张图片")
    .max(9, "最多上传9张图片"),
});

export default function PostReleaseForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      images: [],
    },
    validationSchema: postFormSchema,
    onSubmit: async (values) => {
      await request.post("/posts", values);
      toast.success("发布成功");
      setTimeout(() => {
        router.push("/");
      }, 200);
    },
  });
  return (
    <>
      <Toaster />
      <div className="rounded-3xl bg-[#323232] p-4 shadow-2xl md:flex-[2]">
        <ImageUpload
          onUploadCompleted={(files) => {
            formik.setFieldValue(
              "images",
              files
                .filter((file) => file.uploadURL)
                .map((file) => file.uploadURL!),
            );
          }}
        />
        {formik.errors.images && (
          <div className="mt-1 text-center text-xs text-[tomato]">
            {formik.errors.images}
          </div>
        )}
      </div>
      <div className="mt-4 flex-[6] rounded-3xl bg-[#323232] p-4 shadow-2xl md:mt-0 md:ml-10">
        <form
          className="flex flex-col items-stretch"
          onSubmit={formik.handleSubmit}
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">标题</legend>
            <input
              type="text"
              name="title"
              id="title"
              className="input w-full"
              placeholder="标题"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
          {formik.errors.title && (
            <div className="mt-1 text-xs text-[tomato]">
              {formik.errors.title}
            </div>
          )}
          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-white">内容</legend>
            <textarea
              className="textarea h-48 w-full"
              placeholder="内容"
              name="content"
              id="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            ></textarea>
          </fieldset>
          {formik.errors.content && (
            <div className="mt-1 text-xs text-[tomato]">
              {formik.errors.content}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-accent btn-wide mt-6 self-center rounded-full"
            // onClick={async () => {
            //   await request.post("/posts", {
            //     title,
            //     content,
            //     images: imageUrls,
            //   });
            //   toast.success("发布成功");
            //   setTimeout(() => {
            //     router.push("/");
            //   }, 200);
            // }}
          >
            提交
          </button>
        </form>
      </div>
    </>
  );
}
