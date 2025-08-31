// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import { useRef, useState } from "react";
import "cropperjs";
import { CropperSelection } from "cropperjs";
import request from "@/app/_lib/request";

const AvatarCropper = () => {
  const cropperRef = useRef<CropperSelection | null>(null);

  const [avatarFile, setAvatarFile] = useState<string>(null);
  return (
    <div className={"h-full w-full"}>
      {avatarFile ? (
        <>
          <cropper-canvas background class={"h-[80%] w-full"}>
            <cropper-image
              src={avatarFile}
              alt="Picture"
              rotatable
              scalable
              skewable
              translatable
            ></cropper-image>
            <cropper-shade hidden></cropper-shade>
            <cropper-handle action="select" plain></cropper-handle>
            <cropper-selection
              ref={cropperRef}
              initial-coverage="1"
              aspect-ratio="1"
              // movable
              // resizable
            >
              <cropper-grid role="grid" covered></cropper-grid>
              <cropper-crosshair centered></cropper-crosshair>
              <cropper-handle
                action="move"
                theme-color="rgba(255, 255, 255, 0.35)"
              ></cropper-handle>
              <cropper-handle action="n-resize"></cropper-handle>
              <cropper-handle action="e-resize"></cropper-handle>
              <cropper-handle action="s-resize"></cropper-handle>
              <cropper-handle action="w-resize"></cropper-handle>
              <cropper-handle action="ne-resize"></cropper-handle>
              <cropper-handle action="nw-resize"></cropper-handle>
              <cropper-handle action="se-resize"></cropper-handle>
              <cropper-handle action="sw-resize"></cropper-handle>
            </cropper-selection>
          </cropper-canvas>
          <div
            className={"mt-4 flex justify-center"}
            onClick={async () => {
              if (cropperRef.current) {
                const croppedCanvas = await cropperRef.current.$toCanvas();
                croppedCanvas.toBlob((blob) => {
                  const dataUrl = URL.createObjectURL(blob);
                  console.log(dataUrl);
                  request
                    .post("/profile/update/avatar", blob, {
                      headers: {
                        "Content-Type": blob?.type,
                      },
                    })
                    .then((res) => {
                      console.log(res);
                    });
                });
              }
            }}
          >
            <button className={"btn btn-primary px-6"}>裁剪</button>
          </div>
        </>
      ) : (
        <div>
          <button
            className={"btn btn-primary px-6"}
            onClick={() => {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/jpeg,image/png,image/gif";
              fileInput.multiple = false;
              fileInput.onchange = () => {
                if (fileInput.files?.length) {
                  const imageFile = URL.createObjectURL(fileInput.files[0]);
                  setAvatarFile(imageFile);
                }
              };
              fileInput.click();
            }}
          >
            上传
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarCropper;
