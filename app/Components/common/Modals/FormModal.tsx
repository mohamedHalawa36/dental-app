import { Modal } from "~/Components/common/Modal";
import { cn } from "~/lib/utils";
import type { FormModalProps } from "~/types/components";

export default function FormModal({
  isOpen,
  setIsOpen,
  children,
  className,
  trigger,
  title,
}: FormModalProps) {
  return (
    <Modal
      title={title}
      className={cn(
        "w-10/12 max-w-none overflow-hidden rounded-lg max-sm:py-2.5 md:h-fit lg:w-3/4 xl:w-1/2",
        className,
      )}
      isOpen={isOpen}
      toggle={(isOpen) => setIsOpen(isOpen ?? false)}
      trigger={trigger}
    >
      {children}
    </Modal>
  );
}
