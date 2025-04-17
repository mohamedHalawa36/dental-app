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
}: ModalProps & {
  title: string;
  trigger: ReactNode;
  confirmCallBack: () => void;
  cancelCallBack: () => void;
  isActionsDisabled?: boolean;
  children: ReactNode;
}) {
  console.log(isOpen);
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      trigger={trigger}
      title={title}
      className=" md:min-w-2/5 lg:min-w-[25.5rem] w-11/12 h-fit overflow-hidden rounded-lg"
    >
      <div className="flex flex-col gap-7 justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          {children}
        </div>
        <div className="flex items-center gap-6">
          <button
            disabled={isActionsDisabled}
            className=" border-secondary font-medium w-20 text-secondary hover:bg-secondary hover:text-white transition rounded-xl h-fit px-5 py-2 border"
            onClick={confirmCallBack}
          >
            نعم
          </button>
          <button
            disabled={isActionsDisabled}
            className=" border-foreground font-medium w-20 text-foreground hover:bg-foreground hover:text-white transition rounded-xl h-fit px-5 py-2 border"
            onClick={cancelCallBack}
          >
            لا
          </button>
        </div>
      </div>
    </Modal>
  );
}
