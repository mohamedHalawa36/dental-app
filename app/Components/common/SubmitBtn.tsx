import { cn } from "~/lib/utils";

export default function SubmitBtn({
  label,
  disabled,
  className,
}: {
  label: string;
  disabled: boolean;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={cn(
        "w-24 rounded-xl bg-primary p-3 font-semibold text-muted transition hover:opacity-80 disabled:bg-gray-400 max-sm:w-full max-sm:p-2",
        className,
      )}
    >
      {label}
    </button>
  );
}
