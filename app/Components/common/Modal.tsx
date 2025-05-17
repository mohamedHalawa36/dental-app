import { App as CapacitorApp } from "@capacitor/app";
import { useEffect } from "react";
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

  useEffect(() => {
    const attachListenere = async () => {
      const listener = await CapacitorApp.addListener("backButton", () => {
        if (isOpen) toggle?.();
      });

      return () => {
        listener.remove();
      };
    };

    const cleanUp = attachListenere();

    return () => {
      cleanUp.then((removeListener) => removeListener && removeListener());
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} modal={forceModal} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent
        forceMount
        className={cn("max-md:max-h-[90%]", className)}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col overflow-hidden">
          <DialogHeader className="[&+button>svg]:max-sm:size-6">
            {title && <DialogTitle className="text-xl">{title}</DialogTitle>}
          </DialogHeader>
          <hr className="my-3 bg-slate-300" />
          <div className="flex-1 overflow-hidden">{children}</div>
          {actions && <DialogFooter>{actions}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
