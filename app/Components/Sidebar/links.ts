import Appointment from "~/Components/icons/Appointment";
import Home from "~/Components/icons/Home";
import Patient from "~/Components/icons/Patient";

export const nurseLinks = [
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
];

export const doctorsLinks = [
  ...nurseLinks,
  {
    id: "availability",
    Icon: Appointment,
    label: "مواعيدك المتاحة",
    href: "/availability",
    addNew: true,
  },
];
