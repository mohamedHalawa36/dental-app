import { cn } from "~/lib/utils";

export default function PageLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-5 py-8",
        className,
      )}
    >
      <span className="sr-only">Loading...</span>
      <div className="size-6 animate-bounce rounded-full bg-primary [animation-delay:-0.3s] max-sm:size-5"></div>
      <div className="size-6 animate-bounce rounded-full bg-primary [animation-delay:-0.15s] max-sm:size-5"></div>
      <div className="size-6 animate-bounce rounded-full bg-primary max-sm:size-5"></div>
    </div>
  );
}
