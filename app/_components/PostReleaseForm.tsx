"use client";

import { useState } from "react";
import ImageUpload from "./PostImageUpload";
import request from "../_lib/request";
import { useRouter } from "next/navigation";

export default function PostReleaseForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  return (
    <>
      <div className="flex-[2] rounded-3xl bg-[#323232] p-4 shadow-2xl">
        <ImageUpload
          onUploadCompleted={(files) => {
            setImageUrls(
              files
                .filter((file) => file.uploadURL)
                .map((file) => file.uploadURL!),
            );
          }}
        />
      </div>
      <div className="flex-[6] rounded-3xl bg-[#323232] p-4 shadow-2xl md:ml-10">
        <form className="flex flex-col items-stretch">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">标题</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-white">帖子内容</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder="Bio"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {/* <div className="label text-white">Optional</div> */}
          </fieldset>
          <button
            type="button"
            className="btn btn-secondary btn-wide mt-6 self-center rounded-full"
            onClick={async () => {
              console.log("Image URLs:", imageUrls);
              console.log("Content:", content);
              console.log("Title:", title);
              await request.post("/posts", {
                title,
                content,
                images: imageUrls,
              });
              console.log("Post submitted successfully!");
              router.push("/"); // Redirect to the home page after submission
            }} // Handle form submission logic here
          >
            提交
          </button>
        </form>
      </div>
    </>
  );
}
