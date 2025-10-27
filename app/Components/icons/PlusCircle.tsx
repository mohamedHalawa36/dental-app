import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function PlusCircle({ className }: IconProps) {
  return (
    <div
      className={cn(
        "flex size-7 items-center justify-center rounded-full border-2 border-primary text-xl",
        className,
      )}
    >
      +
    </div>
  );
}
