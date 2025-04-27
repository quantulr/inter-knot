"use client";
import Uppy, { Meta, UppyFile } from "@uppy/core";
import FileInput from "@uppy/file-input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";

import "@uppy/core/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";
import "@uppy/file-input/dist/style.min.css";
import { useEffect, useRef, useState } from "react";
import "@/app/_components/PostImageUpload.css";
import XHR from "@uppy/xhr-upload";

const ImageUpload = ({
  onUploadCompleted,
}: {
  onUploadCompleted?: (files: UppyFile<Meta, Record<string, never>>[]) => void;
}) => {
  const uppy = useRef<Uppy | null>(null);
  const uppyUploadBtnRef = useRef<HTMLDivElement>(null);
  const [updateKey, setUpdateKey] = useState(0);
  useEffect(() => {
    // let uppy: Uppy | null = null;
    if (uppyUploadBtnRef.current) {
      uppy.current = new Uppy({
        autoProceed: true,
        onBeforeFileAdded(currentFile) {
          setUpdateKey((prev) => prev + 1);
          return currentFile;
        },

        restrictions: {
          maxNumberOfFiles: 9,
          allowedFileTypes: [".jpg", ".jpeg", ".png", ".heic", ".webp"],
        },
      })
        .use(FileInput, {
          target: "#uppy-upload-btn",
          locale: {
            strings: {
              chooseFiles: "添加图片",
            },
          },
        })
        .use(XHR, {
          formData: false,
          endpoint: "/api/file/upload",
          onAfterResponse() {
            // setUpdateKey((prev) => prev + 1);

            setTimeout(() => {
              onUploadCompleted?.(uppy.current?.getFiles() ?? []);
            }, 0);
          },
        });
    }
    return () => {
      uppy.current?.destroy();
      uppy.current = null;
    };
  }, []);

  return (
    <>
      <ul
        key={updateKey}
        className="images-list grid grid-cols-3 justify-items-start gap-1"
      >
        {uppy.current?.getFiles().map((file) => (
          <li
            key={`${file.id}-${file.uploadURL}`}
            className="image relative overflow-hidden rounded-md border-2 border-[#4c4c4c]"
          >
            <div className="overlay absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center">
              {file.uploadURL ? (
                <IoMdCheckmarkCircle className="text-3xl text-[springgreen]" />
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin text-3xl text-[#f43098]" />
              )}
            </div>
            <img
              className="aspect-square w-full rounded-md object-cover"
              src={URL.createObjectURL(file.data)}
            />
          </li>
        ))}
      </ul>
      <div className={`mt-6 flex items-center justify-center`}>
        <div
          ref={uppyUploadBtnRef}
          id="uppy-upload-btn"
          className="font-extrabold transition-all"
        ></div>
      </div>
    </>
  );
};

export default ImageUpload;
