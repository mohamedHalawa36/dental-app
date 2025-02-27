import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function AddNew({ className }: IconProps) {
  return (
    <svg
      width="27px"
      height="27px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <g id="Layer_1" />

      <g id="Layer_2">
        <g>
          <path d="M12,13h-1v-1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h1v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1h1    c0.6,0,1-0.4,1-1S12.6,13,12,13z" />

          <path d="M17,3h-6C8.8,3,7,4.8,7,7c-2.2,0-4,1.8-4,4v6c0,2.2,1.8,4,4,4h6c2.2,0,4-1.8,4-4c2.2,0,4-1.8,4-4V7C21,4.8,19.2,3,17,3z     M15,16v1c0,1.1-0.9,2-2,2H7c-1.1,0-2-0.9-2-2v-6c0-1.1,0.9-2,2-2h1h5c1.1,0,2,0.9,2,2V16z M19,13c0,1.1-0.9,2-2,2v-4    c0-2.2-1.8-4-4-4H9c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2V13z" />
        </g>
      </g>
    </svg>
  );
}
