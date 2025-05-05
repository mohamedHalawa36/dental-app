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
        "grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-5 overflow-auto p-2 max-sm:py-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
