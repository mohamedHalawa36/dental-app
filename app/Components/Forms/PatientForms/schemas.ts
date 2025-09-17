import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";

export const addPatientSchema = Yup.object({
  name: Yup.string().required(requiredMsg),
  age: Yup.number()
    .typeError("أرقام فقط")
    .required(requiredMsg)
    .min(3, "العمر غير صحيح")
    .max(120, "العمر غير صحيح"),
  address: Yup.string(),
  phone: Yup.string()
    .typeError("أرقام فقط")
    .required(requiredMsg)
    .matches(/^01[0-25]\d{8}$/, "رقم غير صحيح"),
  phone_has_whatsapp: Yup.boolean(),
});

export const initialPatientValue = {
  name: "",
  age: "",
  address: "",
  phone: "",
  phone_has_whatsapp: false,
};
