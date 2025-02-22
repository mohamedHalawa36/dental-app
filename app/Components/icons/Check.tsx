import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function Check({ className }: IconProps) {
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
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
