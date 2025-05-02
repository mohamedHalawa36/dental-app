import { cn } from "~/lib/utils";

type IButton = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};
export default function Button({
  label,
  disabled,
  className,
  variant = "primary",
}: IButton) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={cn(
        "p-3 max-sm:w-full hover:opacity-80 transition font-semibold disabled:bg-gray-400 border border-transparent",
        {
          "bg-primary rounded-xl text-muted": variant === "primary",
          "border-foreground text-foreground bg-transparent":
            variant === "secondary",
        },
        className
      )}
    >
      {label}
    </button>
  );
}
