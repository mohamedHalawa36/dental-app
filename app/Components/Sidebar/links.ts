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
    addNew: false,
  },
  {
    id: "patients",
    Icon: Patient,
    label: "المرضى",
    href: "/patients",
    addNew: true,
  },
  {
    id: "appointments",
    Icon: Appointment,
    label: "المواعيد",
    href: "/appointments",
    addNew: false,
  },
  // {
  //   id: "doctors",
  //   Icon: Doctor,
  //   label: "الأطباء",
  //   href: "/doctors",
  // addNew:false
  // },
];
