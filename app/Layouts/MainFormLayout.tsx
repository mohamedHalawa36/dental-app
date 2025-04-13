import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function MainFormLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-8 overflow-auto ",
        className
      )}
    >
      {children}
    </div>
  );
}
