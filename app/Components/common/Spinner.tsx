import { cn } from "~/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-block w-full animate-spin rounded-full border-2 border-primary border-t-transparent",
        className,
      )}
    />
  );
}
