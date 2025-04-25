"use client";
import Uppy, { Meta, UppyFile } from "@uppy/core";
import FileInput from "@uppy/file-input";

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
            setUpdateKey((prev) => prev + 1);

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
            key={file.id}
            className="image relative overflow-hidden rounded-md border-2 border-[#4c4c4c]"
          >
            {file.uploadURL && (
              <div
                className={
                  "absolute top-0 right-0 z-50 h-2 w-2 animate-pulse rounded-full bg-green-300"
                }
              ></div>
            )}
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
