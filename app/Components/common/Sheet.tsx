import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet as UISheet,
} from "~/Components/ui/sheet";
import useAttachBackBtn from "~/hooks/useAttachBackBtn";
import { cn } from "~/lib/utils";

type ISheetProps = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sheet({
  trigger,
  title,
  children,
  className,
  isOpen,
  setIsOpen,
}: ISheetProps) {
  useAttachBackBtn(() => {
    if (isOpen) setIsOpen?.(false);
  }, [isOpen]);

  return (
    <UISheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent className="!max-w-[17rem] border-transparent bg-transparent p-0 [&>button]:hidden">
        <SheetHeader className="">
          <SheetTitle>{title}</SheetTitle>
          <div className={cn("!mt-0 h-dvh w-full", className)}>{children}</div>
        </SheetHeader>
      </SheetContent>
    </UISheet>
  );
}
