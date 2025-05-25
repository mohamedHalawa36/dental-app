import { useContext } from "react";
import { AuthContext } from "~/Contexts/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { role, is_admin, name } = user!;

  const isDoctor = role === "doctor";
  const isNurse = role === "nurse";
  const isAdmin = is_admin;
  const userName = name;

  return { ...authContext, isAdmin, isDoctor, isNurse, userName };
};

export default useAuth;
