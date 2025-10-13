import Appointment from "~/Components/icons/Appointment";
import Home from "~/Components/icons/Home";
import Patient from "~/Components/icons/Patient";
import { Users } from "../icons/Users";

export const nurseLinks = [
  {
    id: "home",
    Icon: Home,
    label: "الرئيسية",
    href: "/",
    addNew: false,
    hasSearch: true,
  },
  {
    id: "patients",
    Icon: Patient,
    label: "المرضى",
    href: "/patients",
    addNew: true,
    hasSearch: true,
  },
  {
    id: "appointments",
    Icon: Appointment,
    label: "المواعيد",
    href: "/appointments",
    addNew: false,
    hasSearch: true,
  },
];

export const doctorsLinks = [
  {
    id: "availability",
    Icon: Appointment,
    label: "مواعيدك المتاحة",
    href: "/availability",
    addNew: true,
    hasSearch: false,
  },
];

export const adminLinks = [
  {
    id: "users",
    Icon: Users,
    label: "المستخدمين",
    href: "/users",
    addNew: true,
    hasSearch: false,
  },
];
