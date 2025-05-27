import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { getUserProfile } from "~/API/auth";
import supabase from "~/API/supabase";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import useAuth from "~/hooks/useAuth";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [isChecking, setIsChecking] = useState(false);

  const { user, setUser } = useAuth();

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      setIsChecking(true);

      const { data } = await supabase.auth.getSession();
      const supabaseUser = data?.session?.user;
      const isTheSameUser = supabaseUser?.id === user?.id;
      if (!supabaseUser) {
        setUser(null);
      } else {
        if (!isTheSameUser) {
          const { data: userProfile, error } = await getUserProfile(
            supabaseUser.id,
          );
          if (!error) setUser(userProfile);
        }
      }
      setIsChecking(false);
    };

    fetchSession();
  }, []);

  const isLoginPage = pathname === "/login";

  if (isChecking) return <PageLoader />;

  if (!user) {
    return isLoginPage ? children : <Navigate to="/login" replace />;
  }

  if (isLoginPage) return <Navigate to="/" replace />;

  return children;
}
