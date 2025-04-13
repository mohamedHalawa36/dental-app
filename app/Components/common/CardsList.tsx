import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function CardsList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] max-sm:py-0 p-2 gap-5 overflow-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
