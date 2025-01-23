import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import Sidebar from "~/Components/Sidebar/Sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen overflow-hidden">
        <div className="h-full w-full flex  flex-col ">
          <div className=" flex h-full">
            <Sidebar />
            <main className="bg-background flex-1 max-h-full">{children}</main>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
