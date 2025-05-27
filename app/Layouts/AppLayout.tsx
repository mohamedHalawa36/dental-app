import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "~/Contexts/AuthContext";
import AuthGuard from "~/Guards/AuthGuard";
import { handleConnectionStatus } from "~/utils/connectivity";

import { App as CapacitorApp } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";
import useAttachBackBtn from "~/hooks/useAttachBackBtn";

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

  useEffect(() => {
    const hideSplashLoader = () => {
      SplashScreen.hide();
    };
    hideSplashLoader();
    document.addEventListener("DOMContentLoaded", hideSplashLoader);
    return () =>
      document.removeEventListener("DOMContentLoaded", hideSplashLoader);
  }, []);

  const navigate = useNavigate();

  useAttachBackBtn(({ canGoBack }) => {
    const body = document.body;

    const isPopoverOpen =
      !!body.querySelector("span[data-radix-focus-guard]") ||
      body.getAttribute("data-scroll-locked") === "1";

    if (isPopoverOpen) return;
    if (canGoBack) navigate(-1);
    else {
      CapacitorApp.minimizeApp();
    }
  }, []);

  return (
    <AuthProvider>
      <AuthGuard>
        <QueryClientProvider client={queryClient}>
          <div className="h-screen w-screen overflow-hidden">{children}</div>
          <Toaster
            richColors={true}
            position="top-left"
            theme="light"
            closeButton
          />
        </QueryClientProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
