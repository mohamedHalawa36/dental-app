import type { User } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import supabase from "~/API/supabase";
import PageLoader from "~/Components/common/Loaders/PageLoader";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        setUser(data.user);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <PageLoader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
