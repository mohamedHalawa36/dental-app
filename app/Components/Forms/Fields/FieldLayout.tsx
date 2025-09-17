import { cn } from "~/lib/utils";
import type { FieldProps } from "~/types/components";

export default function FieldLayout({
  id,
  label,
  error,
  className,
  children,
  optional,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <div className="flex items-center gap-1">
          <label htmlFor={id} className="text-[0.95rem]">
            {label}
          </label>
          {optional && (
            <span className="text-xs text-slate-500">{`( اختياري )`}</span>
          )}
        </div>
      )}

      {children}
      <span className="h-4 text-xs text-red-600">{error}</span>
    </div>
  );
}
