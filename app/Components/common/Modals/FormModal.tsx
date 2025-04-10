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
        "max-w-none lg:w-3/4 xl:w-1/2 w-10/12 md:h-fit overflow-hidden rounded-lg",
        className
      )}
      isOpen={isOpen}
      toggle={(isOpen) => setIsOpen(isOpen ?? false)}
      trigger={trigger}
    >
      {children}
    </Modal>
  );
}
