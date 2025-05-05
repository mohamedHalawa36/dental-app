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
    <div className={cn("flex flex-col gap-1 ", className)}>
      {label && <label htmlFor={id}>{label}</label>}

      {children}
      <span className="text-red-600 text-xs h-4">{error}</span>
    </div>
  );
}
