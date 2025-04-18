import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import Sidebar from "~/Components/Sidebar/Sidebar";
import { handleConnectionStatus } from "~/utils/connectivity";

export default function AppLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    window.addEventListener("online", handleConnectionStatus);
    window.addEventListener("offline", handleConnectionStatus);
    return () => {
      window.removeEventListener("online", handleConnectionStatus);
      window.removeEventListener("offline", handleConnectionStatus);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen overflow-hidden">
        <div className="h-full w-full flex  flex-col ">
          <div className=" flex h-full">
            <div className="max-lg:hidden">
              <Sidebar />
            </div>
            <main className="bg-background flex-1 max-h-full">{children}</main>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
