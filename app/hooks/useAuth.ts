import { useContext } from "react";
import { AuthContext } from "~/Contexts/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const isDoctor = user?.role === "doctor";
  const isNurse = user?.role === "nurse";
  const isAdmin = user?.is_admin;
  const userName = user?.name;

  return { ...authContext, isAdmin, isDoctor, isNurse, userName };
};

export default useAuth;
