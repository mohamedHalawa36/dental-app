import * as Yup from "yup";

export const addPatientSchema = Yup.object({
  name: Yup.string().required("مطلوب"),
  age: Yup.number()
    .typeError("أرقام فقط")
    .required("مطلوب")
    .min(3, "العمر غير صحيح")
    .max(120, "العمر غير صحيح"),
  address: Yup.string(),
  phone1: Yup.string()
    .typeError("أرقام فقط")
    .required("مطلوب")
    .matches(/^01[0-25]\d{8}$/, "رقم غير صحيح"),
  phone1_has_whatsapp: Yup.boolean(),
  phone2: Yup.string()
    .typeError("أرقام فقط")
    .matches(/^01[0-25]\d{8}$/, "رقم غير صحيح"),
  phone2_has_whatsapp: Yup.boolean().nullable(),
});

export const initialPatientValue = {
  name: "",
  age: "",
  address: "",
  phone1: "",
  phone1_has_whatsapp: false,
  phone2: "",
  phone2_has_whatsapp: false,
};
