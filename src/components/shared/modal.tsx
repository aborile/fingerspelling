"use client";

import { useRouter } from "next/navigation";
import { memo, MouseEvent, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function checkOnClickBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      onDismiss();
    }
  }

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog
        ref={dialogRef}
        className="modal"
        onClick={checkOnClickBackdrop}
        onClose={onDismiss}
      >
        {children}

        {/* <form method="dialog" onSubmit={onDismiss}>
          <button>close</button>
        </form> */}
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default memo(Modal);
