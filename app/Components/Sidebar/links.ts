import Appointment from "~/Components/icons/Appointment";
import Doctor from "~/Components/icons/Doctor";
import Home from "~/Components/icons/Home";
import Patient from "~/Components/icons/Patient";

export const links = [
  {
    id: "home",
    Icon: Home,
    label: "الرئيسية",
    href: "/",
  },
  {
    id: "patients",
    Icon: Patient,
    label: "المرضى",
    href: "/patients",
  },
  {
    id: "appointments",
    Icon: Appointment,
    label: "المواعيد",
    href: "/appointments",
  },
  // {
  //   id: "doctors",
  //   Icon: Doctor,
  //   label: "الأطباء",
  //   href: "/doctors",
  // },
];
