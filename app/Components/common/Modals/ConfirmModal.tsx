import type { ReactNode } from "react";
import { Modal } from "~/Components/common/Modal";
import type { ModalProps } from "~/types/components";

export default function ConfirmModal({
  title,
  trigger,
  confirmCallBack,
  cancelCallBack,
  isActionsDisabled,
  children,
  isOpen,
  toggle,
  confirmLabel,
}: ModalProps & {
  title: string;
  trigger: ReactNode;
  confirmCallBack: () => void;
  cancelCallBack: () => void;
  isActionsDisabled?: boolean;
  children: ReactNode;
  confirmLabel?: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      trigger={trigger}
      title={title}
      className="md:min-w-2/5 h-fit w-11/12 overflow-hidden rounded-lg lg:min-w-[25.5rem]"
    >
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="flex flex-col items-center justify-center gap-3">
          {children}
        </div>
        <div className="flex items-center gap-6">
          <button
            disabled={isActionsDisabled}
            className="h-fit w-20 rounded-xl border border-secondary px-5 py-2 font-medium text-secondary transition hover:bg-secondary hover:text-white"
            onClick={confirmCallBack}
          >
            {confirmLabel ?? "نعم"}
          </button>
          <button
            disabled={isActionsDisabled}
            className="h-fit w-20 rounded-xl border border-foreground px-5 py-2 font-medium text-foreground transition hover:bg-foreground hover:text-white"
            onClick={cancelCallBack}
          >
            لا
          </button>
        </div>
      </div>
    </Modal>
  );
}
