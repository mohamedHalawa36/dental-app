import type { Session, User, WeakPassword } from "@supabase/supabase-js";
import { createContext, useState, type ReactNode } from "react";
import type { UserProfile } from "~/types/apiData";

type AuthUser = UserProfile & {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};

type AuthContextArgs = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export const AuthContext = createContext<AuthContextArgs>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
