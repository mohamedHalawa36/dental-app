import { cn } from "~/lib/utils";

type IButton = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
};
export default function Button({
  label,
  disabled,
  className,
  variant = "primary",
  type = "submit",
}: IButton) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "border border-transparent p-3 font-semibold transition hover:opacity-80 disabled:bg-gray-400 max-sm:w-full",
        {
          "rounded-xl bg-primary text-muted": variant === "primary",
          "border-foreground bg-transparent text-foreground":
            variant === "secondary",
        },
        className,
      )}
    >
      {label}
    </button>
  );
}
