import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
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
    <>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen w-screen overflow-hidden">{children}</div>
        <Toaster
          richColors={true}
          position="top-left"
          theme="light"
          closeButton
        />
      </QueryClientProvider>
    </>
  );
}
