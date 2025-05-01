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
      <div className="w-screen h-screen overflow-hidden lg:p-4">
        <div className="h-full w-full flex  flex-col ">
          <div className=" flex h-full">
            <div className="max-lg:hidden">
              <Sidebar />
            </div>
            <main className=" bg-gradient-to-b to-fuchsia-200/30 from-cyan-200/30 to-70% flex-1 max-h-full rounded-e-2xl">
              {children}
            </main>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
