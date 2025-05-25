import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserProfile } from "~/types/apiData";

type AuthContextArgs = {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  return (
    <AuthContext.Provider value={{ user, setUser, isChecking, setIsChecking }}>
      {children}
    </AuthContext.Provider>
  );
};
