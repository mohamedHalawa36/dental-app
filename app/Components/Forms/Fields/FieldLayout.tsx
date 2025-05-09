import { cn } from "~/lib/utils";
import type { FieldProps } from "~/types/components";

export default function FieldLayout({
  id,
  label,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-[0.95rem]">
          {label}
        </label>
      )}

      {children}
      <span className="h-4 text-xs text-red-600">{error}</span>
    </div>
  );
}
