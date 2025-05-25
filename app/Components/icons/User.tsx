import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function User({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27px"
      height="27px"
      viewBox="0 0 24 24"
      className={cn("fill-none stroke-foreground stroke-2", className)}
    >
      <circle cx="12" cy="6" r="4" />
      <path
        d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
        strokeLinecap="round"
      />
    </svg>
  );
}
