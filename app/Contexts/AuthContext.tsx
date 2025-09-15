import type { Session, User, WeakPassword } from "@supabase/supabase-js";
import { createContext, useState, type ReactNode } from "react";
import type { UserProfile } from "~/types/apiData";

type AuthData = {
  user: (User & UserProfile) | null;
  session: Session | null;
  weakPassword?: WeakPassword;
};

type AuthContextArgs = {
  authData: AuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>;
};

export const AuthContext = createContext<AuthContextArgs>({
  authData: null,
  setAuthData: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
