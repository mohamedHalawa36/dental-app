import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function ChevronUp({ className }: IconProps) {
  return (
    <svg
      width="27px"
      height="27px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("stroke-primary", className)}
    >
      <path
        d="M6 15L12 9L18 15"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
