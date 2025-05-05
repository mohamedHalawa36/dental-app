import type { ReactNode } from "react";

export default function ServerErr({ children }: { children: ReactNode }) {
  return (
    <span className="border-s-4 border-s-secondary bg-secondary/10 px-2 py-3 text-center text-sm font-semibold text-secondary max-sm:text-xs">
      {children}
    </span>
  );
}
