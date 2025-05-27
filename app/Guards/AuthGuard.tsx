import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { getUserProfile, getUserSession } from "~/API/auth";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import useAuth from "~/hooks/useAuth";
import useAuthChange from "~/hooks/useAuthChange";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);

  const { user, setUser } = useAuth();

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await getUserSession();

      //if it couldn't find user session go to login page to get a new one
      if (error) {
        setUser(null);
        setIsChecking(false);
        toast.error("لم نستطع العثور على معلومات المستخدم، برجاء تسجيل الدخول");
        return;
      }

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

  useAuthChange();

  const isLoginPage = pathname === "/login";

  if (isChecking) return <PageLoader />;

  if (!user) {
    return isLoginPage ? children : <Navigate to="/login" replace />;
  }

  if (isLoginPage) return <Navigate to="/" replace />;

  return children;
}
