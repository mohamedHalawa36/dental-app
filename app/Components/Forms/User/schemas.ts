import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";
import type { SimpleOption } from "~/Components/common/Select";

export const addPatientSchema = Yup.object({
  email: Yup.string().email().required(requiredMsg),
  password: Yup.string()
    .min(8, "يجب أن لا تقل كلمة السر عن 8 حروف")
    .required(requiredMsg),
  name: Yup.string().required(requiredMsg),
  is_admin: Yup.boolean().required(requiredMsg),
  role: Yup.string()
    .required(requiredMsg)
    .oneOf(["nurse", "doctor"], "وظيفة غير متاحة"),
});

export const initialPatientValue = {
  email: "",
  password: "",
  name: "",
  is_admin: false,
  role: "",
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
