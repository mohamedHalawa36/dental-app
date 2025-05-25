import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { getUserProfile } from "~/API/auth";
import supabase from "~/API/supabase";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import useAuth from "~/hooks/useAuth";
import useAuthChange from "~/hooks/useAuthChange";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isChecking, setIsChecking, user, setUser } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      const supabaseUser = data?.session?.user;
      const isTheSameUser = supabaseUser?.id === user?.id;
      if (!supabaseUser) {
        setUser(null);
      } else {
        if (!isTheSameUser) {
          const userProfile = await getUserProfile(supabaseUser.id);
          setUser(userProfile);
        }
      }
      setIsChecking(false);
    };

    fetchSession();
  }, []);

  useAuthChange();

  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  if (isChecking) return <PageLoader />;

  if (!user) {
    return isLoginPage ? children : <Navigate to="/login" replace />;
  }

  if (isLoginPage) return <Navigate to="/" replace />;

  return children;
}
