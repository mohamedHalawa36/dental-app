import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { getUserProfile } from "~/API/auth";
import supabase from "~/API/supabase";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import useAuth from "~/hooks/useAuth";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isChecking, setIsChecking, user, setUser } = useAuth();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (user) return;
      setUser(user || null);
      setIsChecking(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user;
        if (!user) return;
        const userProfile = await getUserProfile(user.id);
        console.log(userProfile);
        setUser(userProfile);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  if (isChecking) return <PageLoader />;

  if (!user) {
    return isLoginPage ? children : <Navigate to="/login" replace />;
  }

  if (isLoginPage) return <Navigate to="/" replace />;

  return children;
}
