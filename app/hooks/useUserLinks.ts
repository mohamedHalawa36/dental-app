import {
  adminLinks,
  doctorsLinks,
  nurseLinks,
} from "~/Components/Sidebar/links";
import useAuth from "./useAuth";
import Settings from "~/Components/icons/Settings";

export default function useUserLinks() {
  const { isDoctor, isAdmin } = useAuth();

  const regDoctorLinks = [
    ...[...nurseLinks].map((link) => ({ ...link, addNew: false })),
    ...doctorsLinks,
  ];

  const adminDoctorLinks = [...nurseLinks, ...doctorsLinks, ...adminLinks];
  let links;

  if (isDoctor) {
    if (isAdmin) links = adminDoctorLinks;
    else links = regDoctorLinks;
  } else {
    if (isAdmin) links = [...nurseLinks, ...adminLinks];
    else links = nurseLinks;
  }

  return [
    ...links,
    {
      id: "settings",
      Icon: Settings,
      label: "الاعدادات",
      href: "/settings",
      addNew: false,
      hasSearch: false,
    },
  ];
}
