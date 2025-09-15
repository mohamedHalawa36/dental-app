import type { Database } from "~/types/database.types";

export const adminRoutes = ["/users"];
export const doctorRoutes = ["/availability"];

type UserRole = Database["public"]["Tables"]["profiles"]["Row"]["role"];

export const shouldGoToRoute = (
  pathname: string,
  userRole: UserRole,
  isUserAdmin: boolean,
) => {
  if (isUserAdmin) return true;

  const isDoctorRoute = doctorRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.includes(pathname);
  if (!isDoctorRoute && !isAdminRoute) return true;

  const isDoctor = userRole === "doctor";
  if (isDoctorRoute) return isDoctor;
  if (isAdminRoute) return isUserAdmin;
};
