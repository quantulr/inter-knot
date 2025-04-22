"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const myModal = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (myModal.current) {
      myModal.current.showModal();
    }
  }, []);
  return (
    <dialog
      ref={myModal}
      onClose={() => {
        router.back();
      }}
      onKeyDown={(e) => {
        e.preventDefault();
        if (e.key === "Escape") {
          router.back();
        }
      }}
      className="modal"
      id="my-modal-1"
    >
      <div className="modal-box">
        {children}

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
