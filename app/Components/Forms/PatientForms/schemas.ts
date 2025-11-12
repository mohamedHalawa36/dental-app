import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";

const phoneRegex = /^01[0-25]\d{8}$/;

export const addPatientSchema = Yup.object({
  name: Yup.string().required(requiredMsg),
  age: Yup.number()
    .typeError("أرقام فقط")
    .required(requiredMsg)
    .min(3, "العمر غير صحيح")
    .max(120, "العمر غير صحيح"),
  address: Yup.string(),
  phone1: Yup.string()
    .typeError("أرقام فقط")
    .required(requiredMsg)
    .matches(phoneRegex, "رقم غير صحيح"),
  phone1_has_whatsapp: Yup.boolean(),
  phone2: Yup.string()
    .nullable()
    .typeError("أرقام فقط")
    .matches(phoneRegex, "رقم غير صحيح"),
  phone2_has_whatsapp: Yup.boolean().nullable(),
  phone3: Yup.string()
    .nullable()
    .typeError("أرقام فقط")
    .matches(phoneRegex, "رقم غير صحيح"),
  phone3_has_whatsapp: Yup.boolean().nullable(),
});

export const initialPatientValue = {
  name: "",
  age: "",
  address: "",
  phone1: "",
  phone1_has_whatsapp: false,
  phone2: null,
  phone2_has_whatsapp: null,
  phone3: null,
  phone3_has_whatsapp: null,
};
