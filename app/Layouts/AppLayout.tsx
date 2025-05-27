import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { AuthProvider } from "~/Contexts/AuthContext";
import AuthGuard from "~/Guards/AuthGuard";
import { handleConnectionStatus } from "~/utils/connectivity";

import { App as CapacitorApp } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";
import useAttachBackBtn from "~/hooks/useAttachBackBtn";

export default function AppLayout({ children }: { children: ReactNode }) {
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
        <div className="h-screen w-screen overflow-hidden">{children}</div>
      </AuthGuard>
    </AuthProvider>
  );
}
