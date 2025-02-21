import { useEffect, useRef, type PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
  id: string;
}

function Modal({ isOpen, onClose, id, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleCloseClick = () => {
    onClose?.();
  };

  return (
    <dialog id={id} className="modal" ref={modalRef}>
      <div className="modal-box rounded-none sm:rounded-3xl p-6 w-full max-w-full sm:max-w-[32rem] max-h-[100%] sm:max-h-[80%] overflow-hidden height-[-webkit-fill-available]">
        {children}
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={handleCloseClick}
      ></form>
    </dialog>
  );
}

export default Modal;
