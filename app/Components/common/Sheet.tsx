import type { ReactNode } from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet as UISheet,
} from "~/Components/ui/sheet";
import { cn } from "~/lib/utils";

export default function Sheet({
  trigger,
  title,
  children,
  className,
}: {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <UISheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent className="p-0 !max-w-[17rem] bg-transparent border-transparent">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <div className={cn("h-screen w-full !mt-0", className)}>
            {children}
          </div>
        </SheetHeader>
      </SheetContent>
    </UISheet>
  );
}
