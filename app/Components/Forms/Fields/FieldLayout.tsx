import { cn } from "~/lib/utils";
import type { IFieldProps } from "~/types/components";

export default function FieldLayout({
  id,
  label,
  error,
  className,
  children,
}: IFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <label htmlFor={id}>{label}</label>}

      {children}
      <span className="h-4 text-xs text-red-600">{error}</span>
    </div>
  );
}
