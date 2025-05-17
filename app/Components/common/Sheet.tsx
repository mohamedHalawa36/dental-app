import { App as CapacitorApp } from "@capacitor/app";
import {
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet as UISheet,
} from "~/Components/ui/sheet";
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
  useEffect(() => {
    const attachListenere = async () => {
      const listener = await CapacitorApp.addListener("backButton", () => {
        if (isOpen) setIsOpen?.(false);
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
    <UISheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent className="!max-w-[17rem] border-transparent bg-transparent p-0">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <div className={cn("!mt-0 h-screen w-full", className)}>
            {children}
          </div>
        </SheetHeader>
      </SheetContent>
    </UISheet>
  );
}
