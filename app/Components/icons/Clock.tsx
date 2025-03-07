import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function Clock({ className }: IconProps) {
  return (
    <svg
      width="27px"
      height="27px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("stroke-black", className)}
    >
      <path
        d="M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
