import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";
import type { SimpleOption } from "~/Components/common/Select";
import type { UserRole } from "~/types/apiData";

export const createUsertSchema = Yup.object({
  email: Yup.string().email("البريد الإلكتروني غير صحيح").required(requiredMsg),
  password: Yup.string()
    .min(6, "يجب أن لا تقل كلمة السر عن 6 حروف")
    .required(requiredMsg),
  name: Yup.string().required(requiredMsg),
  is_admin: Yup.boolean().required(requiredMsg),
  role: Yup.string()
    .required(requiredMsg)
    .oneOf(["nurse", "doctor"], "وظيفة غير متاحة"),
});

export const initialUserValue = {
  email: "",
  password: "",
  name: "",
  is_admin: false,
  role: "" as UserRole,
};

export const roleOptions: SimpleOption[] = [
  {
    label: "ممرض",
    value: "nurse",
  },
  {
    label: "طبيب",
    value: "doctor",
  },
];
