"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import CloseButton from "./CloseButton";
import pcPageBg from "@/app/_assets/pc-page-bg.png";
const Modal = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: ReactNode;
}) => {
  const router = useRouter();
  return (
    <div
      className={
        "fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-xs"
      }
      onClick={() => {
        router.back();
      }}
    >
      <div
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        className={"overflow-hidden rounded-3xl border-2 border-[#2e2e2e]"}
      >
        <div className={"rounded-3xl border-2 border-black"}>
          <div
            className={
              "title-bar flex h-20 items-center justify-between bg-black px-4"
            }
          >
            <div className={"left-section"}>{title}</div>
            <CloseButton
              onClose={() => {
                router.back();
              }}
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${pcPageBg.src})`,
            }}
            className={"dialog-content h-96 w-[800px] bg-auto bg-top"}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
