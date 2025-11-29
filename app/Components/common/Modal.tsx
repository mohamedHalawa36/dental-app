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
        className={cn("flex max-h-fit flex-col !overflow-hidden", className)}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader
          className={cn("[&+button>svg]:max-sm:size-6", {
            "[&+button>svg]:hidden": onClose === undefined,
          })}
        >
          {title && <DialogTitle className="text-xl">{title}</DialogTitle>}
        </DialogHeader>
        <hr className="my-3 bg-slate-300" />
        <div className="min-h-0 flex-1 basis-auto overflow-auto overflow-y-auto py-1">
          {children}
        </div>
        {actions && <DialogFooter>{actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
