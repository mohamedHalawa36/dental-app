import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextArgs = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isChecking: boolean;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextArgs>({
  user: null,
  setUser: () => {},
  isChecking: false,
  setIsChecking: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  console.log(user);

  return (
    <AuthContext.Provider value={{ user, setUser, isChecking, setIsChecking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
