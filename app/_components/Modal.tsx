import { ReactNode } from "react";
import CloseButton from "./CloseButton";
import pcPageBg from "@/app/_assets/pc-page-bg.png";
import "@/app/_components/Modal.css";
import Link from "next/link";

const Modal = ({
  children,
  title,
  prevPath,
  showOverlay = true,
}: {
  children: ReactNode;
  title?: ReactNode;
  prevPath?: string;
  showOverlay?: boolean;
}) => {
  return (
    <div
      className={
        "fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center"
      }
    >
      {showOverlay && (
        <Link
          href={prevPath ?? "../"}
          className="modal-overlay absolute z-40 h-full w-full backdrop-blur-md"
        ></Link>
      )}
      <div
        className={"z-50 overflow-hidden rounded-3xl border-2 border-[#2e2e2e]"}
        style={{
          animation: "slideIn 0.3s",
        }}
      >
        <div className={"rounded-3xl border-2 border-black"}>
          <div
            className={
              "title-bar flex h-20 items-center justify-between bg-black px-4"
            }
          >
            <div className={"left-section"}>{title}</div>
            <CloseButton prefPath={prevPath} />
          </div>
          <div
            style={{
              backgroundImage: `url(${pcPageBg.src})`,
            }}
            className={"dialog-content bg-auto bg-top"}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
