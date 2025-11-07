import { useEffect, type ReactNode } from "react";
import LostConnectModal from "~/Components/common/LostConnectModal";
import { AuthProvider } from "~/Contexts/AuthContext";
import AuthGuard from "~/Guards/AuthGuard";
import { handleConnectionStatus } from "~/utils/connectivity";

export default function AppLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.addEventListener("online", handleConnectionStatus);
    window.addEventListener("offline", handleConnectionStatus);
    return () => {
      window.removeEventListener("online", handleConnectionStatus);
      window.removeEventListener("offline", handleConnectionStatus);
    };
  }, []);

  return (
    <AuthProvider>
      <AuthGuard>
        <LostConnectModal />
        <div className="h-screen w-screen overflow-hidden">{children}</div>
      </AuthGuard>
    </AuthProvider>
  );
}
