import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

type IButton = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
};
export default function Button({
  disabled,
  className,
  variant = "primary",
  type = "submit",
  onClick,
  children,
}: IButton) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "rounded-xl border border-transparent p-3 font-semibold transition hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gray-400 max-sm:w-full",
        {
          "bg-primary text-muted": variant === "primary",
          "border-foreground bg-transparent text-foreground disabled:bg-black/10":
            variant === "secondary",
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
