import {
  adminLinks,
  doctorsLinks,
  nurseLinks,
} from "~/Components/Sidebar/links";
import useAuth from "./useAuth";

export default function useUserLinks() {
  const { isDoctor, isAdmin } = useAuth();

  if (isDoctor) {
    if (isAdmin) return [...doctorsLinks, ...adminLinks];
    else return doctorsLinks;
  } else {
    if (isAdmin) return [...nurseLinks, ...adminLinks];
    else return nurseLinks;
  }
}
