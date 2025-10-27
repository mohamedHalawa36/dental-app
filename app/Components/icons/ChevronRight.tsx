import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function ChevronRight({ className }: IconProps) {
  return (
    <svg
      width="27px"
      height="27px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <path
        d="M9 19L16 12L9 5"
        stroke="#000000"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
