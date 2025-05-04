import type { ReactNode } from "react";

export default function ServerErr({ children }: { children: ReactNode }) {
  return (
    <span className="text-secondary font-semibold text-sm text-center bg-secondary/10 border-s-4 border-s-secondary px-2 py-3 max-sm:text-xs">
      {children}
    </span>
  );
}
