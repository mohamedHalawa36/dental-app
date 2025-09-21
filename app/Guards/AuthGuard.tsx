import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";
import { getUserProfile, getUserSession } from "~/API/auth";
import { messages } from "~/API/messages";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import useAuth from "~/hooks/useAuth";
import { shouldGoToRoute } from "~/utils/routes";

const { userNotFound } = messages.error.auth;

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);

  const { authData, setAuthData } = useAuth();
  const user = authData?.user;
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await getUserSession();

      //if it couldn't find user session go to login page to get a new one
      if (error) {
        setAuthData(null);
        setIsChecking(false);
        toast.error(userNotFound);
        return;
      }

      const supabaseUser = data?.session?.user;
      const isTheSameUser = supabaseUser?.id === user?.id;
      if (!supabaseUser) {
        setAuthData(null);
      } else {
        if (!isTheSameUser) {
          const { data: userProfile, error } = await getUserProfile(
            supabaseUser.id,
          );
          if (!error)
            setAuthData({
              user: { ...supabaseUser, ...userProfile },
              session: data.session,
            });
        }
      }
      setIsChecking(false);
    };

    fetchSession();
  }, [setAuthData, user?.id]);

  const isLoginPage = pathname === "/login";

  if (isChecking) return <PageLoader className="h-full" />;

  if (!user) {
    return isLoginPage ? children : <Navigate to="/login" replace />;
  }

  if (isLoginPage) return <Navigate to="/" replace />;

  const isResetPasswordPage = pathname === "/reset-password";
  const hasResettedPassword = authData.user?.has_reseted_password;

  if (!hasResettedPassword) {
    return isResetPasswordPage ? (
      children
    ) : (
      <Navigate to="/reset-password" replace />
    );
  }

  if (isResetPasswordPage) return <Navigate to="/" replace />;

  if (shouldGoToRoute(pathname, user.role, user.is_admin)) return children;
  else return <Navigate to="/" replace />;
}
