import {
  adminLinks,
  doctorsLinks,
  nurseLinks,
} from "~/Components/Sidebar/links";
import useAuth from "./useAuth";

export default function useUserLinks() {
  const { isDoctor, isAdmin } = useAuth();

  const regDoctorLinks = [
    ...[...nurseLinks].map((link) => ({ ...link, addNew: false })),
    ...doctorsLinks,
  ];

  const adminDoctorLinks = [...nurseLinks, ...doctorsLinks];

  if (isDoctor) {
    if (isAdmin) return adminDoctorLinks;
    else return regDoctorLinks;
  } else {
    if (isAdmin) return [...nurseLinks, ...adminLinks];
    else return nurseLinks;
  }
}
