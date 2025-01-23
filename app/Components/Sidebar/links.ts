import Appointment from "~/Components/icons/Appointment";
import Doctor from "~/Components/icons/Doctor";
import Home from "~/Components/icons/Home";
import Patient from "~/Components/icons/Patient";

export const links = [
  {
    Icon: Home,
    label: "الرئيسية",
    href: "/",
  },
  {
    Icon: Patient,
    label: "المرضى",
    href: "/patients",
  },
  {
    Icon: Appointment,
    label: "المواعيد",
    href: "/appointments",
  },
  {
    Icon: Doctor,
    label: "الأطباء",
    href: "/doctors",
  },
];
