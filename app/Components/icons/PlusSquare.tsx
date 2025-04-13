import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function PlusSquare({ className }: IconProps) {
  return (
    <svg
      width="27px"
      height="27px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <path
        d="M9 12H15"
        stroke="#323232"
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9L12 15"
        stroke="#323232"
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
        stroke="#323232"
        stroke-width="2"
      />
    </svg>
  );
}
