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
