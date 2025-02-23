import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type ModalProps = {
  title?: string | React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  isOpen: boolean;
  toggle: (val?: boolean) => void;
  onClose?: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  forceModal?: boolean;
  container?: HTMLElement;
};

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
    toggle(val);
    if (!val) {
      onClose?.();
    }
  };

  return (
    <Dialog open={isOpen} modal={forceModal} onOpenChange={handleOpenChange}>
      <DialogTrigger>{trigger ? trigger : "Open"}</DialogTrigger>
      <DialogContent forceMount className={className}>
        <div className="flex flex-col overflow-hidden">
          <DialogHeader className="mb-7">
            {title && <DialogTitle className="text-xl">{title}</DialogTitle>}
          </DialogHeader>
          <div className="flex-1 overflow-hidden">{children}</div>
          {actions && <DialogFooter>{actions}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
