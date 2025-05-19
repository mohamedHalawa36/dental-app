import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import supabase from "~/API/supabase";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import { useAuth } from "~/Contexts/AuthContext";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isChecking, setIsChecking, user, setUser } = useAuth();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      setUser(user || null);
      setIsChecking(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user;
        setUser(user || null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  if (isChecking) return <PageLoader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoginPage) return <Navigate to="/" replace />;

  return children;
}
