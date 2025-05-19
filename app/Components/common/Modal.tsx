import useAttachBackBtn from "~/hooks/useAttachBackBtn";
import { cn } from "~/lib/utils";
import type { ModalProps } from "~/types/components";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const Modal = ({
  onClose,
  trigger,
  className,
  toggle,
  title,
  isOpen,
  children,
  forceModal,
  actions,
}: ModalProps) => {
  const handleOpenChange = (val: boolean) => {
    toggle?.(val);
    if (!val) {
      onClose?.();
    }
  };

  useAttachBackBtn(() => {
    if (isOpen) toggle?.(false);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} modal={forceModal} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent
        forceMount
        className={cn(
          "flex h-fit flex-col gap-0 !overflow-hidden max-md:max-h-[90%]",
          className,
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* <div className="flex h-full flex-1 flex-col overflow-hidden"> */}
        <DialogHeader className="[&+button>svg]:max-sm:size-6">
          {title && <DialogTitle className="text-xl">{title}</DialogTitle>}
        </DialogHeader>
        <hr className="my-3 bg-slate-300" />
        <div className="flex-1 overflow-auto py-1">{children}</div>
        {actions && <DialogFooter>{actions}</DialogFooter>}
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};
