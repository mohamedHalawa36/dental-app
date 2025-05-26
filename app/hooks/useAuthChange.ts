import { useEffect } from "react";
import { getUserProfile } from "~/API/auth";
import supabase from "~/API/supabase";
import useAuth from "./useAuth";

export default function useAuthChange() {
  const { setUser, user } = useAuth();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") return setUser(null);

        const supabaseUser = session?.user;
        if (!supabaseUser) return;
        if (supabaseUser.id === user?.id) return;
        const { data: userProfile, error } = await getUserProfile(
          supabaseUser.id,
        );
        if (!error) setUser(userProfile);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);
}
